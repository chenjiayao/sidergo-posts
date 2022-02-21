---
title: 一切开始于网络编程
author: 新自助
date: '2022-02-17'
---
> 本篇重点关注以下 3 点：
> 1. Golang 基础网络编程
> 2. 所谓 「TCP 粘包问题」
> 3. 如何解决「TCP 粘包问题」

## 基础网络编程

这是 sidergo 系列教程的第一篇，但是开篇不涉及 sidergo 相关的内容，但是这章的内容相当重要，因为这部分内容时网络编程的基础，也是 sidergo 一开始就会碰到的内容。

sidergo/redis-cli 之间的通信通过是 TCP 协议，所以我们从一个简单的 Golang 网络编程代码开始。

```go
// client/main.go
func main() {
	conn, _ := net.Dial("tcp", ":8081")
	content := "hello\nworld\nand\ngoodbye\n"
	n, err := conn.Write([]byte(content))
	fmt.Println(n, err)
}

//server/main.go
func main() {
	listener, _ := net.Listen("tcp", ":8081")
	for {
		conn, _ := listener.Accept()
		go func(conn net.Conn) {
			buf := bufio.NewReader(conn)
			for {
				buffer, err := buf.ReadBytes('\n')
				time.Sleep(time.Second)  // 注意这里的 sleep
				if err != io.EOF {
					fmt.Print(string(buffer))
				}
			}
		}(conn)
	}
}
```
分别运行 client 和 server，server 端会每隔 1s 输出：
```bash
➜  sidergo git:(master) ✗ go run example/server/main.go
hello
world
and
goodbye
```
上面的代码可以很容易的从网上找到并且有详细的解释，这里不做过多的说明。这边我们重点要弄清 一个问题：
1. client 是一次性发送整个 content，但是 server 却每次只读到部分内容？（不是一次性输出 content，而是间隔 1s 输出部分内容，所以说 server 每次只读只到部分内容）

这个问题可以很简单的回答：因为 ` buf.ReadBytes('\n')`  会逐个字节的读取 client 发送过来的内容，直到读取到 `\n` 之后返回。如果 client 发送过来的内容全部读取完毕，那么就返回 `io.EOF` 表示内容读取完毕。而就是这个简单代码就解决了大名鼎鼎的「TCP 粘包问题」。

## 所谓「TCP 粘包问题」
> 首先要指出：「TCP 粘包问题」本身就不是一个正确的描述，但是在很多地方甚至包括面试给你挖坑都会碰到这个名词，所以这里也不正确的使用这个词
那什么是粘包问题：**A 端在接收到 B 端传递过来的数据，无法正确的解析数据。更具体点说，无法区分数据的边界。**如果无法理解这段解释，那么我们从 TCP 协议讲讲。

可能你不是很熟悉 TCP/IP 协议、三次握手/四次挥手等网络相关内容，没关系，我们也可以屏蔽那些细节，从高一点的角度理解 TCP 粘包问题。

TCP 是一个基于「字节流」的传输层通信协议，这里重点在「字节流」。基于字节流的意思是：不管传输的数据是文本、图片、还是视频，在 TCP 层都是将数据变成字节流发送给对方，所以上面 `hello\nworld\nand\ngoodbye\n` 在 TCP 层是这样传递的：

![](https://raw.githubusercontent.com/chenjiayao/sidergo-posts/master/docs/images/chapter-1-1.jpg)

而 server 端从到 TCP 读取到字节数据之后，内心会有一个疑问：**client 给我发送了这么些个字节数据，我要怎么看？**

client 希望发给 server 的信息是：「hello\nworld\nand\ngoodbye」。但是由于数据在 TCP 层传输中都是以字节的形式传输，所以 server 端只会收到字节数据，而 server 端依靠自己无法将字节数据正确解析，server 可能会解析成 `hel lo\nwo rld\n and\ng oodb ye\n` 等任意形式，好像 TCP 在传输数据过程中将数据都粘合到一起了。

现在来解释「TCP 粘包问题」这个描述为什么不正确：**因为 TCP 本身设计只将数据以字节流的形式发送给对方，而如何解析收到的字节流数据是应用本身的事情**。无法正确解析字节流数据是应用的责任，这个锅 TCP 不背。

那 server 要如何正确解析从 TCP 层读取到的字节流数据？

## 数据解析
所有语言涉及到网络编程都需要处理「TCP 数据解析」，这个问题有两个通用的解决方式：
1. 固定分隔符分割数据
2. 固定 header + 数据包长度

下面来详细介绍下这两种解析方式

固定分隔符分割数据：客户端和服务端约定使用某一个符号来区分每一段数据。上面的 `hello\nworld\nand\ngood\nbye` 就使用了这种方式，客户端和服务端约定使用 「`\n`」区分每段数据，这样接收方从 TCP 读取字节流数据时，假设读取到 `\n` ，就表明这段数据已经读取完毕。

```go
//server/main.go
go func(conn net.Conn) {
    buf := bufio.NewReader(conn)
    for {
        buffer, err := buf.ReadBytes('\n') //这里每次读取到 \n 之后就返回数据
        ....
    }
}(conn)
```
这种解析方式简单明了，但是这种解析方式存在一个缺点：**如果数据包中的内容无意包含了 `\n`，那么接收端就无法正常解析数据。** 比如，如果客户端和服务端 约定使用 `\n` 作为分隔符，但是客户端想服务端发送 `he\no world`，那么加上 `\n` 之后，服务端接收到的数据就是 `he\no\nworld`，由于 `he\no` 这个正常数据也包含了 `\n`，服务端会把数据解析成 `he o world`。这个缺点在聊天软件中时无法接受的：因为发送的内容是用户输入的，用户输入的内容千奇百怪，很容易在发送内容中包含了分隔符，这样就会导致服务端解析出错。这种情况下需要使用「固定 header + 数据包长度」来处理。　

固定 header + 数据包长度：使用这种方式，在发送内容之前，客户端会先发送一段 header 给服务端，header 中包含内容的长度，服务端根据 header 中的提供的包内容长度信息，可以准确的读取到后续内容信息。 举个例子
1. 客户端和服务端约定一个 header 结构体：`{content-length: 内容长度}`
2. 客户端要发送「hello world」给服务端，那么会先发送一个 header 给服务端：`{coontent-length: 11}` (注意空格）
3. 服务端接收到 header ，知道后续客户端要发送的内容有 11 个字节，做好准备接收后续的 11 个字节数据
4. 客户端发送真正的内容：「hello world」
5. 服务端接收客户端发送的 11 个字节

使用这种方式，就不会出现第一种方式的问题，header 中已经告知了服务端后续的数据包的长度，服务端可以准确的读取数据。
「固定 header + 数据包长度」这种方法 不止出现在网络编程范畴中，如果你观察过 HTTP 的 header ，会发现 HTTP 的 header 中也有 `Content-Length` 字段，这个字段的作用也是为了告知 浏览器这个 HTTP 请求的 body 具体数据长度是多少。浏览器 根据这个值来读取 body 的内容。

![](https://raw.githubusercontent.com/chenjiayao/sidergo-posts/master/docs/images/chapter1-2.jpg)

这种数据包中包含任意字符，服务端都能正确解析的协议，可以称为「二进制安全」的协议。什么是「二进制安全」？
>  二进制安全是针对字符串而言的，如果一个字符串可以包含任意字符，那么就是二进制安全的，比如 C 语言规定了，字符串都是以 `\0` 结尾，那么一个字符串中就不能出现 `\0`，所以 C 语言中的字符串不是二进制安全的。而 Go 中的字符串可以出现任意的字符，所以  Go 中的字符串是二进制安全的。

## 总结


