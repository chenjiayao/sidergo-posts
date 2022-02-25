---
title: Redis 通信协议
author: 新自助
date: '2022-02-17'
---

> 本篇重点关注以下 2 点：
> 1. 理解 & 解析 Redis 通信协议
> 2. interface 在单元测试中的作用


想要实现一个 redis-server，能够使用 redis-cli 进行操作，那么必须理解 Redis 的通信协议，并且使用 Redis 的通信协议来进行网络编程。幸运的是，Redis 的通信协议：[RESP](https://redis.io/topics/protocol) 非常简单。redis 作为一个高性能服务器，通信协议上没有设计的很高深，而是直接使用文本传输。下面我们来尝试下解析 Redis 的通信协议。


### Redis 通信协议

Redis 通信协议将数据类型分为 5 种：

1. 单行字符串
2. 多行字符串
3. 整数
4. 错误消息
5. 数组

redis-cli 向 redis-server 发送命令和 redis-server 返回的数据都是由这 5 种基本的数据类型组成的，下面我们来看看这 5 种数据类型在 redis-cli/redis-server 交互中的基本使用

单行字符串
```
127.0.0.1:6379> set key value
OK   // redis-server 返回 OK 就是单行字符串
```


多行字符串，注意单行字符串和多行字符串在展示的区别：单行字符串没有「""」
```
127.0.0.1:6379> get key
"value"  // get key 命令返回多行字符串
```

整数
```
127.0.0.1:6379> ttl key
(integer) -1   // ttl 命令返回整数
```

错误消息
```
127.0.0.1:6379> zadd key score memeber
(error) ERR value is not a valid float  //返回一个错误消息
```

数组
```
127.0.0.1:6379> smembers set1
1) "member2"
2) "member1"   //返回一个数组
```

现在，我们已经知道 redis 通信协议有 5 种基本的数据类型以及这 5 种数据类型的基本使用，现在我们来具体看看这 5 种数据类型在网络编程中具体以什么样的格式传递。

在开始之前，有一个点需要提一下：在每个数据类型之后，统一加上 `\r\n` 表示结束。这里的作用就是上一篇提到的「固定分隔符分割数据」。

单行字符串：在数据之前加上 `+` 
```
127.0.0.1:6379> set key value
OK    // +OK\r\n
```

多行字符串：在数据之前加上 `$`，后面跟字符串长度
```
127.0.0.1:6379> get key
"value"  //$5\r\nvalue\r\n
```

单行字符串和多行字符串很类似，他们的区别在于：多行字符串是「二进制安全」的字符串。上面我们提到会使用 `\r\n` 来分割数据，但是 string 的 key 和 value 可以包含 `\r\n` 的：`set key va\r\nlue`。如果使用单行字符串表示 string 的 value，那么如果 value 中包含 `\r\n` 就会导致 redis 解析错误。多行字符串中在 `$` 后面加上字符串长度，那么就可以根据这个值正确读取到字符串内容。这里品一下多行字符串的设计， 融入了上一篇提到的两个解决 TCP 数据解析的方案：「固定分隔符分割数据」和「固定 header + 数据包长度」。

注意，null 也是用多行字符串表示，使用 -1 表示长度
```
127.0.0.1:6379> get key1
(nil)  // $-1\r\n
```

整数：在数据之前加上 `:`
```
127.0.0.1:6379> ttl key
(integer) -1   // :-1\r\n
```

错误消息：在数据之前加上 `-`
```
127.0.0.1:6379> zadd key score memeber
(error) ERR value is not a valid float  //-ERR value is not a valid float\r\n
```

数组：以 `*` 开头，后面跟上数组长度

```
127.0.0.1:6379> smembers set1
1) "member"
2) "member1"   //*2\r\n$6\r\n\member\r\n$7\r\nmember1\r\n
```
数组长度比较复杂，我们把  `\r\n`  换行处理，这样阅读比较直观

```
*2
$6
member
$7
member1

```

虽然有 5 种数据类型，但是 client 发送给 server 的数据类型只有一个数组形式。这对我们实现 sidergo 是个好消息，因为我们只要解析数组就可以。假设执行命令：`set key value`，那么服务端收到的数据为 `*3\r\n$3\r\nset\r\n$3\r\nkey\r\n$5\r\nvalue\r\n`，现在我们尝试解析下这段文本：

1. 根据首字符是不是 `*` 判断协议格式是否正确
2. 获取 `*` 后面的数组长度，可以遍历整个命令内容，数组的每个元素是一个多行字符串
3. 读取 `$` 后面的数字，获取到字符串长度，读取指定长度内容，可以获取到完整字符串内容。





---

<a rel="license" href="http://creativecommons.org/licenses/by-nc-nd/4.0/"><img alt="知识共享许可协议" style="border-width:0" src="https://i.creativecommons.org/l/by-nc-nd/4.0/88x31.png" /></a><br />本作品采用<a rel="license" href="http://creativecommons.org/licenses/by-nc-nd/4.0/">知识共享署名-非商业性使用-禁止演绎 4.0 国际许可协议</a>进行许可。

<Vssue/>