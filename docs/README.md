```bash
           __        __                                         
          |  \      |  \                                        
  _______  \$$  ____| $$  ______    ______    ______    ______  
 /       \|  \ /      $$ /      \  /      \  /      \  /      \ 
|  $$$$$$$| $$|  $$$$$$$|  $$$$$$\|  $$$$$$\|  $$$$$$\|  $$$$$$\
 \$$    \ | $$| $$  | $$| $$    $$| $$   \$$| $$  | $$| $$  | $$
 _\$$$$$$\| $$| $$__| $$| $$$$$$$$| $$      | $$__| $$| $$__/ $$
|       $$| $$ \$$    $$ \$$     \| $$       \$$    $$ \$$    $$
 \$$$$$$$  \$$  \$$$$$$$  \$$$$$$$ \$$       _\$$$$$$$  \$$$$$$ 
                                            |  \__| $$          
                                             \$$    $$          
                                              \$$$$$$      

```

![example workflow](https://github.com/chenjiayao/sidergo-posts/actions/workflows/master.yml/badge.svg)
[![License: GPL v3](https://img.shields.io/badge/License-GPL%20v3-brightgreen.svg)](https://www.gnu.org/licenses/gpl-3.0)
[![License: CC BY-NC-ND 4.0](https://img.shields.io/badge/License-CC%20BY--NC--ND%204.0-lightgrey.svg)](https://creativecommons.org/licenses/by-nc-nd/4.0/)

> 「sidergo」sider 的回文为 redis。

本仓库为 [sidergo](https://github.com/chenjiayao/sidergo) 系列教程文章。 sidergo 使用 Golang 实现 redis server 大部分功能：
- [x] string、set、list、hash、zset 等数据结构
- [x] multi 事务，支持 watch、discard 等操作
- [x] 实现并发安全的 map 作为 redis db 存储数据
- [x] 实现 list 中 blpush、lpop 等阻塞命令
- [x] AOF 持久化
- [x] 支持 key 自动过期 
- [x] 实现 unboundChan 用于 AOF channel
- [x] msetnx、incr 等命令原子操作实现
- [x] 核心逻辑的单元测试 
- [x] skipList 数据结构实现，用于 redis zset 数据结构的底层存储
- [x] 集群模式 
- [ ] sentinel 模式



**sidergo 不是一个用于生产环境的项目，旨在通过该项目学习 Golang 开发。** 通过该项目你可以接触到以下内容
1. Golang 中的锁、sync.Map、单元测试、channel、goroutine 等相关组件使用，以及 Golang 的开发模式。
2. Golang debug、性能分析。
3. TCP 网络编程，通过解析 redis 通信协议学习网络编程。
4. 分布式相关知识，包括一致性哈希算法、Raft 协议。
5. skipList 等数据结构的实现。
6. 部分 redis 设计与实现。

从现在开始 (2022-02-17)，本系列教程会持续更新，如果喜欢[请给个 star ](https://github.com/chenjiayao/sidergo)或者留言，你们的留言就是我的「[奶头乐](https://baike.baidu.com/item/%E5%A5%B6%E5%A4%B4%E4%B9%90%E7%90%86%E8%AE%BA/24573214)」😝。


---

<a rel="license" href="http://creativecommons.org/licenses/by-nc-nd/4.0/"><img alt="知识共享许可协议" style="border-width:0" src="https://i.creativecommons.org/l/by-nc-nd/4.0/88x31.png" /></a><br />本作品采用<a rel="license" href="http://creativecommons.org/licenses/by-nc-nd/4.0/">知识共享署名-非商业性使用-禁止演绎 4.0 国际许可协议</a>进行许可。

<Vssue/>
