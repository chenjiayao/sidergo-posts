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

这是 sidergo 系列教程的第一篇，但是开篇不涉及 sidergo 相关的内容，而是把重点放在网络编程，因为 sidergo 的实现第一步就是 C/S 网络编程。

sidergo/redis-cli 之间的通信通过是 TCP 协议，所以我们从一个简单的 Golang 网络编程代码开始。

```golang
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

