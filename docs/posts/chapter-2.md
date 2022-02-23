---
title: Redis 通信协议
author: 新自助
date: '2022-02-17'
---

> 本篇重点关注以下 2 点：
> 1. 理解 & 解析 Redis 通信协议
> 2. interface 在单元测试中的作用


想要实现一个 redis-server，能够使用 redis-cli 进行操作，那么必须理解 Redis 的通信协议，并且使用 Redis 的通信协议来进行网络编程。幸运的是，Redis 的通信协议：[RESP](https://redis.io/topics/protocol) 很简单，并且可读性很高。


### Redis 通信协议