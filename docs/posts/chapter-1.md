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

这个问题可以很简单的回答：因为 ` buf.ReadBytes('\n')`  会逐个字节的读取 client 发送过来的内容，直到读取到 `\n` 之后返回。如果 client 发送过来的内容全部读取完毕，那么就返回 `io.EOF` 表示内容读取完毕。


## 所谓「TCP 粘包问题」
> 首先要指出：「TCP 粘包问题」本身就不是一个正确的描述，但是在很多地方甚至包括面试给你挖坑都会碰到这个名词，所以这里也不正确的使用这个词

可能你不是很熟悉 TCP/IP 协议、三次握手/四次挥手等网络相关内容，没关系，我们也可以屏蔽那些细节，从高一点的角度理解 TCP 粘包问题。

TCP 是一个基于「字节流」的传输层通信协议，这里重点在「字节流」，意味着 client 给 server 发送的数据，在 TCP 层是以「字节」为最小单位，可以配合下面的图理解。

