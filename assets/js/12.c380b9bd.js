(window.webpackJsonp=window.webpackJsonp||[]).push([[12],{575:function(s,e,a){"use strict";a.r(e);var n=a(16),t=Object(n.a)({},(function(){var s=this,e=s.$createElement,a=s._self._c||e;return a("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[a("blockquote",[a("p",[s._v("本篇重点关注以下 2 点：")]),s._v(" "),a("ol",[a("li",[s._v("理解 & 解析 Redis 通信协议")]),s._v(" "),a("li",[s._v("interface 在单元测试中的作用")])])]),s._v(" "),a("p",[s._v("想要实现一个 redis-server，能够使用 redis-cli 进行操作，那么必须理解 Redis 的通信协议，并且使用 Redis 的通信协议来进行网络编程。幸运的是，Redis 的通信协议："),a("a",{attrs:{href:"https://redis.io/topics/protocol",target:"_blank",rel:"noopener noreferrer"}},[s._v("RESP"),a("OutboundLink")],1),s._v(" 非常简单。redis 作为一个高性能服务器，通信协议上没有设计的很高深，而是直接使用文本传输。下面我们来尝试下解析 Redis 的通信协议。")]),s._v(" "),a("h2",{attrs:{id:"理解-redis-通信协议"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#理解-redis-通信协议"}},[s._v("#")]),s._v(" 理解 Redis 通信协议")]),s._v(" "),a("p",[s._v("Redis 通信协议将数据类型分为 5 种：")]),s._v(" "),a("ol",[a("li",[s._v("单行字符串")]),s._v(" "),a("li",[s._v("多行字符串")]),s._v(" "),a("li",[s._v("整数")]),s._v(" "),a("li",[s._v("错误消息")]),s._v(" "),a("li",[s._v("数组")])]),s._v(" "),a("p",[s._v("redis-cli 向 redis-server 发送命令和 redis-server 返回的数据都是由这 5 种基本的数据类型组成的，下面来看看这 5 种数据类型在什么时候会用到：")]),s._v(" "),a("p",[s._v("单行字符串")]),s._v(" "),a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[s._v("127.0.0.1:6379> set key value\nOK   // redis-server 返回 OK 就是单行字符串\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br")])]),a("p",[s._v('多行字符串，注意单行字符串和多行字符串在展示的区别：单行字符串没有「""」')]),s._v(" "),a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[s._v('127.0.0.1:6379> get key\n"value"  // get key 命令返回多行字符串\n')])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br")])]),a("p",[s._v("整数")]),s._v(" "),a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[s._v("127.0.0.1:6379> ttl key\n(integer) -1   // ttl 命令返回整数\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br")])]),a("p",[s._v("错误消息")]),s._v(" "),a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[s._v("127.0.0.1:6379> zadd key score memeber\n(error) ERR value is not a valid float  //返回一个错误消息\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br")])]),a("p",[s._v("数组")]),s._v(" "),a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[s._v('127.0.0.1:6379> smembers set1\n1) "member2"\n2) "member1"   //返回一个数组\n')])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br")])]),a("p",[s._v("现在，我们已经知道 redis 通信协议有 5 种基本的数据类型以及这 5 种数据类型的使用场景，现在我们来具体看看这 5 种数据类型在网络编程中具体以什么样的格式传递。")]),s._v(" "),a("p",[s._v("在开始之前，有一个点需要提一下：在每个数据类型之后，统一加上 "),a("code",[s._v("\\r\\n")]),s._v(" 表示结束。这里的作用就是上一篇提到的「固定分隔符分割数据」。")]),s._v(" "),a("p",[s._v("单行字符串：在数据之前加上 "),a("code",[s._v("+")])]),s._v(" "),a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[s._v("127.0.0.1:6379> set key value\nOK    // +OK\\r\\n\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br")])]),a("p",[s._v("多行字符串：在数据之前加上 "),a("code",[s._v("$")]),s._v("，后面跟字符串长度")]),s._v(" "),a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[s._v('127.0.0.1:6379> get key\n"value"  //$5\\r\\nvalue\\r\\n\n')])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br")])]),a("p",[s._v("单行字符串和多行字符串很类似，他们的区别在于：多行字符串是「二进制安全」的字符串。上面我们提到会使用 "),a("code",[s._v("\\r\\n")]),s._v(" 来分割数据，但是 string 的 key 和 value 可以包含 "),a("code",[s._v("\\r\\n")]),s._v(" 的："),a("code",[s._v("set key va\\r\\nlue")]),s._v("。如果使用单行字符串表示 string 的 value，那么如果 value 中包含 "),a("code",[s._v("\\r\\n")]),s._v(" 就会导致 redis 解析错误。多行字符串中在 "),a("code",[s._v("$")]),s._v(" 后面加上字符串长度，那么就可以根据这个值正确读取到字符串内容。这里品一下多行字符串的设计， 融入了上一篇提到的两个解决 TCP 数据解析的方案：「固定分隔符分割数据」和「固定 header + 数据包长度」。")]),s._v(" "),a("p",[s._v("注意，null 也是用多行字符串表示，使用 -1 表示长度")]),s._v(" "),a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[s._v("127.0.0.1:6379> get key1\n(nil)  // $-1\\r\\n\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br")])]),a("p",[s._v("整数：在数据之前加上 "),a("code",[s._v(":")])]),s._v(" "),a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[s._v("127.0.0.1:6379> ttl key\n(integer) -1   // :-1\\r\\n\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br")])]),a("p",[s._v("错误消息：在数据之前加上 "),a("code",[s._v("-")])]),s._v(" "),a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[s._v("127.0.0.1:6379> zadd key score memeber\n(error) ERR value is not a valid float  //-ERR value is not a valid float\\r\\n\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br")])]),a("p",[s._v("数组：以 "),a("code",[s._v("*")]),s._v(" 开头，后面跟上数组长度")]),s._v(" "),a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[s._v('127.0.0.1:6379> smembers set1\n1) "member"\n2) "member1"   //*2\\r\\n$6\\r\\n\\member\\r\\n$7\\r\\nmember1\\r\\n\n')])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br")])]),a("p",[s._v("数组长度比较复杂，我们把  "),a("code",[s._v("\\r\\n")]),s._v("  换行处理，这样阅读比较直观")]),s._v(" "),a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[s._v("*2\n$6\nmember\n$7\nmember1\n\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br")])]),a("h2",{attrs:{id:"代码解析-redis-协议"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#代码解析-redis-协议"}},[s._v("#")]),s._v(" 代码解析 redis 协议")]),s._v(" "),a("p",[s._v("虽然有 5 种数据类型，但是 client 发送给 server 的数据类型只有一个数组形式。这对我们实现 sidergo 是个好消息，因为我们只要解析数组就可以。假设执行命令："),a("code",[s._v("set key value")]),s._v("，那么服务端收到的数据为 "),a("code",[s._v("*3\\r\\n$3\\r\\nset\\r\\n$3\\r\\nkey\\r\\n$5\\r\\nvalue\\r\\n")]),s._v("，现在我们尝试解析下这段文本：")]),s._v(" "),a("ol",[a("li",[s._v("根据首字符是不是 "),a("code",[s._v("*")]),s._v(" 判断协议格式是否正确")]),s._v(" "),a("li",[s._v("获取 "),a("code",[s._v("*")]),s._v(" 后面的数组长度，可以遍历整个命令内容，数组的每个元素是一个多行字符串")]),s._v(" "),a("li",[s._v("读取 "),a("code",[s._v("$")]),s._v(" 后面的数字，获取到字符串长度，读取指定长度内容，可以获取到完整字符串内容。")])]),s._v(" "),a("p",[s._v("现在我们根据上面的思路写一个 server 来尝试解析协议，在实战中理解理解 Redis 的通信协议，代码最终要实现："),a("strong",[s._v("redis-cli 可以直接连接到我们写的 server，server 会返回redis-cli 发送的命令")]),s._v("。")]),s._v(" "),a("p",[s._v("完整可直接运行的代码在"),a("a",{attrs:{href:"https://github.com/chenjiayao/sidergo/blob/master/examples/chapter2/main.go",target:"_blank",rel:"noopener noreferrer"}},[s._v("这里"),a("OutboundLink")],1),s._v("，下面是从中截取出部分进行分析，建议各位亲自打一遍代码加深理解，毕竟我们现在才开始，后续代码会越来越多。")]),s._v(" "),a("div",{staticClass:"language-go line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-go"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("func")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("ReadCommand")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("reader net"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("Conn"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("chan")]),s._v(" RedisRequet "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n\tch "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":=")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("make")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("chan")]),s._v(" RedisRequet"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n\t"),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("go")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("ParseFromSocket")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("reader"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" ch"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n\t"),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("return")]),s._v(" ch\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br")])]),a("p",[s._v("这里真正解析 redis 命令的逻辑放在 "),a("code",[s._v("ParseFromSocket")]),s._v(" 函数中，并且解析逻辑额外启动了一个 goroutine，用 channel 来传递解析结果。这么没有额外的考虑，只是为了这段代码后续可以直接集成到 sidergo 项目中。")]),s._v(" "),a("p",[s._v("在 "),a("code",[s._v("ParseFromSocket")]),s._v(" 函数中有一段逻辑：")]),s._v(" "),a("div",{staticClass:"language-go line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-go"}},[a("code",[a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("...")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("省略部分代码，具体请看 GitHub\n\ncmdLen"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" err "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":=")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("parseOneCmdArgsLen")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("argsWithDelimiter"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("if")]),s._v(" err "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("!=")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token boolean"}},[s._v("nil")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    ch "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("<-")]),s._v(" PROTOCOL_ERROR_REQUEST\n    readArgsFail "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token boolean"}},[s._v("true")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("break")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n\ncmd "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":=")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("make")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),a("span",{pre:!0,attrs:{class:"token builtin"}},[s._v("byte")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" cmdLen"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("+")]),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("2")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("//这里 +2 的原因是需要一并读取 \\r\\n : $3\\r\\nset\\r\\n")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token boolean"}},[s._v("_")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" err "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" io"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("ReadFull")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("buf"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" cmd"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("if")]),s._v(" err "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("!=")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token boolean"}},[s._v("nil")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    ch "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("<-")]),s._v(" PROTOCOL_ERROR_REQUEST\n    readArgsFail "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token boolean"}},[s._v("true")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("break")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\ncmds "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("append")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("cmds"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" cmd"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("len")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("cmd"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("-")]),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("2")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("//去掉读取到  \\r\\n")]),s._v("\n\n"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("...")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br"),a("span",{staticClass:"line-number"},[s._v("8")]),a("br"),a("span",{staticClass:"line-number"},[s._v("9")]),a("br"),a("span",{staticClass:"line-number"},[s._v("10")]),a("br"),a("span",{staticClass:"line-number"},[s._v("11")]),a("br"),a("span",{staticClass:"line-number"},[s._v("12")]),a("br"),a("span",{staticClass:"line-number"},[s._v("13")]),a("br"),a("span",{staticClass:"line-number"},[s._v("14")]),a("br"),a("span",{staticClass:"line-number"},[s._v("15")]),a("br"),a("span",{staticClass:"line-number"},[s._v("16")]),a("br"),a("span",{staticClass:"line-number"},[s._v("17")]),a("br"),a("span",{staticClass:"line-number"},[s._v("18")]),a("br"),a("span",{staticClass:"line-number"},[s._v("19")]),a("br")])]),a("p",[s._v("稍微解释下代码逻辑：")]),s._v(" "),a("ol",[a("li",[a("p",[a("code",[s._v("argsWithDelimiter")]),s._v(" 变量代表数组中的一个元素，比如 "),a("code",[s._v("*3\\r\\n$3\\r\\nset\\r\\n$3\\r\\nkey\\r\\n$5\\r\\nvalue\\r\\n")]),s._v("，那么 "),a("code",[s._v("argsWithDelimiter")]),s._v(" 就是 "),a("code",[s._v("$3\\r\\nset\\r\\n")]),s._v("、"),a("code",[s._v("$3\\r\\nkey\\r\\n")]),s._v(" 和 "),a("code",[s._v("$5\\r\\nvalue\\r\\n")]),s._v("。")])]),s._v(" "),a("li",[a("p",[a("code",[s._v("parseOneCmdArgsLen")]),s._v(" 函数会读取每个字符串的长度，"),a("code",[s._v("$3\\r\\nkey\\r\\n")]),s._v(" 最终得到 3。")])]),s._v(" "),a("li",[a("p",[s._v("使用 "),a("code",[s._v("io.ReadFull")]),s._v(" 函数读取字符串内容，因为需要一并读取 "),a("code",[s._v("\\r\\n")]),s._v("，所以需要对 "),a("code",[s._v("cmd")]),s._v(" 的长度 +2："),a("code",[s._v("cmd := make([]byte, cmdLen+2)")]),s._v("。")])]),s._v(" "),a("li",[a("p",[s._v("最终的命令不需要包含 "),a("code",[s._v("\\r\\n")]),s._v("，所以最后要去掉尾部的 "),a("code",[s._v("\\r\\n")]),s._v("："),a("code",[s._v("cmds = append(cmds, cmd[:len(cmd)-2])")]),s._v("。")])])]),s._v(" "),a("p",[s._v("理解上面的代码逻辑之后，我们可以尝试运行下代码："),a("code",[s._v("go run examples/chapter2/main.go")]),s._v("，运行成功之后，可以使用 redis-cli 连接到我们写的服务端："),a("code",[s._v("redis-cli -p 3101")]),s._v("，如果顺利，我们可以成功连接到服务端，尝试输入任何命令：")]),s._v(" "),a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[s._v('➜  ~ redis-cli -p 3101\n127.0.0.1:3101> set key value\n1) "set"\n2) "key"\n3) "value"\n')])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br")])]),a("p",[s._v("服务端会把 redis-cli 发送的命令直接 echo 回去。\n到这里，整个解析的逻辑已经完成了，不过由于整个解析的逻辑还算比较复杂，我们可以尝试对 "),a("code",[s._v("ParseFromSocket")]),s._v(" 写单元测试。")]),s._v(" "),a("h2",{attrs:{id:"接口和单元测试"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#接口和单元测试"}},[s._v("#")]),s._v(" 接口和单元测试")]),s._v(" "),a("p",[s._v("Golang 设计之初就考虑到单元测试，所以使用 Golang 写单元测试代码会简单一点。关于 Golang 单元测试的基本使用网上已经有很丰富的教程，这里不做过多描述，如果不熟悉的同学可以先去大概了解下，毕竟我们后续还会编写单元测试代码。")]),s._v(" "),a("p",[s._v("虽然 Golang 编写单元测试很友好，但是具体到 "),a("code",[s._v("ParseFromSocket")]),s._v(" 函数可能无法正确编写单元测试，很大的原因是："),a("strong",[s._v("在单元测试中我们需要去调用 "),a("code",[s._v("ParseFromSocket")]),s._v(" 函数，但是这个函数的第一个参数 reader 是 "),a("code",[s._v("net.Conn")]),s._v(" 类型，那我们要如何构造一个 "),a("code",[s._v("net.Conn")]),s._v(" 类型的变量？")])]),s._v(" "),a("div",{staticClass:"language-golang line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[s._v('\nch := make(chan request.RedisRequet)\ngo ParseFromSocket(???, ch)\n\nr := <-ch\nwant := "SET key value"\ngot := r.ToStrings()\nif want != got {\n    t.Errorf("err: %s", r.ToStrings())\n}\n')])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br"),a("span",{staticClass:"line-number"},[s._v("8")]),a("br"),a("span",{staticClass:"line-number"},[s._v("9")]),a("br"),a("span",{staticClass:"line-number"},[s._v("10")]),a("br")])]),a("p",[s._v("如果你也碰到过类似的问题，并且因此放弃了单元测试，那么可以尝试把 "),a("code",[s._v("ParseFromSocket(reader net.Conn, ch chan RedisRequet)")]),s._v(" 改成 "),a("code",[s._v("ParseFromSocket(reader io.Reader, ch chan RedisRequet)")]),s._v("，这样 "),a("code",[s._v("ParseFromSocket")]),s._v(" 函数的逻辑不用做更改，对其编写单元测试代码也很方便：")]),s._v(" "),a("div",{staticClass:"language-golang line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[s._v('func TestParseFromSocket(t *testing.T) {\n\n\tvar buf bytes.Buffer\n\tbuf.Write([]byte("*3\\r\\n$3\\r\\nSET\\r\\n$3\\r\\nkey\\r\\n$5\\r\\nvalue\\r\\n"))\n\tch := make(chan request.RedisRequet)\n\tgo ParseFromSocket(&buf, ch)\n\n\tr := <-ch\n\tif r.ToStrings() != "SET key value" {\n\t\tt.Errorf("err: %s", r.ToStrings())\n\t}\n}\n')])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br"),a("span",{staticClass:"line-number"},[s._v("8")]),a("br"),a("span",{staticClass:"line-number"},[s._v("9")]),a("br"),a("span",{staticClass:"line-number"},[s._v("10")]),a("br"),a("span",{staticClass:"line-number"},[s._v("11")]),a("br"),a("span",{staticClass:"line-number"},[s._v("12")]),a("br")])]),a("p",[s._v("这个编程思想其实是：「面向接口编程」。"),a("strong",[s._v("函数的参数不是一个具体的结构体/对象，而是一个抽象的接口。这样我们在对这个函数测试，只要传递一个实现了这个接口的简单结构体即可")]),s._v("。放到我们这个例子中就是："),a("code",[s._v("ParseFromSocket")]),s._v(" 函数的参数不是具体的 "),a("code",[s._v("net.Conn")]),s._v("，而是改成抽象的 "),a("code",[s._v("io.Reader")]),s._v(" 接口，这样我们对 "),a("code",[s._v("ParseFromSocket")]),s._v(" 进行单元测试，只要传递 "),a("code",[s._v("bytes.Buffer")]),s._v(" 结构体就行，因为 "),a("code",[s._v("bytes.Buffer")]),s._v(" 也实现 "),a("code",[s._v("io.Reader")]),s._v(" 接口，但是创建一个 "),a("code",[s._v("bytes.Buffer")]),s._v(" 结构体简单很多。")]),s._v(" "),a("p",[s._v("你可以在网上找到很多关于面相接口编程的优点：解耦、依赖抽象不依赖具体等等。。。我们这边关注 sidergo 的实现，所以不展开说明，只是在单元测试中碰到了，并且确实是一个比较常用的技巧，所以这里花了一点篇幅描述。")]),s._v(" "),a("p",[s._v("这里再补充一点我关于对单元测试的看法，单元测试的难度不在单元测试，而是在单元测试之外。单元测试代码是否好写，更多考验的是代码结构、编程思想等软件工程能力，如果代码本身耦合度良好，那么单元测试就很好写（上面的例子也算是一个佐证。所以要实践单元测试，提高代码可读性、编写耦合度良好的代码才是根本。")]),s._v(" "),a("p",[s._v("到这里，我们前期的基础知识已经都准备完毕了，下一篇我们就要正式进入 sidergo 的代码实现了，敬请期待。😃")]),s._v(" "),a("h2",{attrs:{id:"总结"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#总结"}},[s._v("#")]),s._v(" 总结")]),s._v(" "),a("p",[s._v("回顾一下，本章的几个重点：")]),s._v(" "),a("ol",[a("li",[s._v("解析 redis 的通信协议")]),s._v(" "),a("li",[s._v("面相接口编程在单元测试中的实践")])]),s._v(" "),a("hr"),s._v(" "),a("p",[a("a",{attrs:{rel:"license",href:"http://creativecommons.org/licenses/by-nc-nd/4.0/"}},[a("img",{staticStyle:{"border-width":"0"},attrs:{alt:"知识共享许可协议",src:"https://i.creativecommons.org/l/by-nc-nd/4.0/88x31.png"}})]),a("br"),s._v("本作品采用"),a("a",{attrs:{rel:"license",href:"http://creativecommons.org/licenses/by-nc-nd/4.0/"}},[s._v("知识共享署名-非商业性使用-禁止演绎 4.0 国际许可协议")]),s._v("进行许可。")]),s._v(" "),a("Vssue")],1)}),[],!1,null,null,null);e.default=t.exports}}]);