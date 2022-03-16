---
title: sidergo 结构设计
author: 新自助
date: '2022-03-02'
---

> 本篇重点关注以下 1 点：
> 1. sidergo 整体结构设计


终于，我们开始 sidergo 开发了，但是不要急着吭哧吭哧写代码，这种工程量比较大的项目一开始还是需要耐心设计整体结构，这样才能走得长久。那么，在项目开始的整体结构设计，我们具体应该做些什么？大概可以有这些：

1. 一些抽象接口设计和确定性的结构体设计
2. 清晰明了的包划分

有了具体的思路，下面就可以开始尝试对 sidergo 搭建一个整体的框架了。

1. 我们可以有一个 interface 目录，来保存所有的 interface
2. 我们需要解析 redis.conf 内容，所以新建一个 config 目录来存放解析配置的逻辑
3. 我们需要解析 redis 的通信协议，所以新建一个 parse 目录来存放解析 redis 通信协议的逻辑
4. sidergo 会依赖一些 library，比如 sortedSet，这些 library 我们会自己实现，所以需要新建一个 lib 的目录
5. 开发过程中，我们会需要一些辅助函数，所以我们可以新建一个 helper 目录来存放这些辅助函数
6. 需要一个 redis 目录来保存 redis 逻辑，比如 redis 各种命令的实现


```bash
sidergo
    - interface
    - helper
    - config
    - parse
    - lib
    - redis
```

现在我们有了一个大概的目录结构，本着自顶向下的原则，我们现在可以尝试设计一些 interface。

1. 在第二篇中，我们提到 redis 通信协议中设计了 5 个返回类型，那么我们可以设计一个 response 的抽象接口。
2. redis-cli 发送的命令，比如：`set key value`，我们会封装成一个结构体，所以也设计一个 request 的 interface，然后由结构体来实现 request interface。
3. 在 Golang 中，通常使用 `net.Conn` 表示一个连接，不过 `net.Conn` 不满足我们的需求，所以我们会自行封装一个 conn 结构体，和 2 的想法一样，我们也设计一个 conn 的 interface。
4. 在 redis 中，会有很多 db，在 db 中保存各种数据，所以我们会有一个 RedisDB 的结构体。同样，我们也创建一个 DB 的 interface。
5. 我们需要一个 server 的结构体代表 redis-server，所以我们也创建一个 server 的 interface。

这样的目录结构变成下面的样子:
```
interface
├── conn
│   └── conn.go
├── db
│   └── db.go
├── request
│   └── request.go
├── response
│   └── response.go
└── server
    └── server.go
```

到这里你可能会有一个疑问：为什么好像需要创建一个结构体的时候，就创建一个对应的 interface 🤔️
