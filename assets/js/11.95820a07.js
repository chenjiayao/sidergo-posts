(window.webpackJsonp=window.webpackJsonp||[]).push([[11],{574:function(t,s,n){"use strict";n.r(s);var a=n(16),e=Object(a.a)({},(function(){var t=this,s=t.$createElement,n=t._self._c||s;return n("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[n("blockquote",[n("p",[t._v("本篇重点关注以下 3 点：")]),t._v(" "),n("ol",[n("li",[t._v("Golang 基础网络编程")]),t._v(" "),n("li",[t._v("所谓 「TCP 粘包问题」")]),t._v(" "),n("li",[t._v("如何解决「TCP 粘包问题」")])])]),t._v(" "),n("h2",{attrs:{id:"基础网络编程"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#基础网络编程"}},[t._v("#")]),t._v(" 基础网络编程")]),t._v(" "),n("p",[t._v("这是 sidergo 系列教程的第一篇，但是开篇不涉及 sidergo 相关的内容，但是这章的内容相当重要，因为这部分内容时网络编程的基础，也是 sidergo 一开始就会碰到的内容。")]),t._v(" "),n("p",[t._v("sidergo/redis-cli 之间的通信通过是 TCP 协议，所以我们从一个简单的 Golang 网络编程代码开始。")]),t._v(" "),n("div",{staticClass:"language-go line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-go"}},[n("code",[n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// client/main.go")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("func")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("main")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\tconn"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("_")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":=")]),t._v(" net"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("Dial")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token string"}},[t._v('"tcp"')]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token string"}},[t._v('":8081"')]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\tcontent "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":=")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token string"}},[t._v('"hello\\nworld\\nand\\ngoodbye\\n"')]),t._v("\n\tn"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" err "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":=")]),t._v(" conn"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("Write")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("byte")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("content"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\tfmt"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("Println")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("n"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" err"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n"),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//server/main.go")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("func")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("main")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\tlistener"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("_")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":=")]),t._v(" net"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("Listen")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token string"}},[t._v('"tcp"')]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token string"}},[t._v('":8081"')]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\t"),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("for")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\t\tconn"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("_")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":=")]),t._v(" listener"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("Accept")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\t\t"),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("go")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("func")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("conn net"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("Conn"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\t\t\tbuf "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":=")]),t._v(" bufio"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("NewReader")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("conn"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\t\t\t"),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("for")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\t\t\t\tbuffer"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" err "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":=")]),t._v(" buf"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("ReadBytes")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token char"}},[t._v("'\\n'")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\t\t\t\ttime"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("Sleep")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("time"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("Second"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("  "),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 注意这里的 sleep")]),t._v("\n\t\t\t\t"),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" err "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("!=")]),t._v(" io"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("EOF "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\t\t\t\t\tfmt"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("Print")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("string")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("buffer"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\t\t\t\t"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\t\t\t"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\t\t"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("conn"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\t"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])]),t._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[t._v("1")]),n("br"),n("span",{staticClass:"line-number"},[t._v("2")]),n("br"),n("span",{staticClass:"line-number"},[t._v("3")]),n("br"),n("span",{staticClass:"line-number"},[t._v("4")]),n("br"),n("span",{staticClass:"line-number"},[t._v("5")]),n("br"),n("span",{staticClass:"line-number"},[t._v("6")]),n("br"),n("span",{staticClass:"line-number"},[t._v("7")]),n("br"),n("span",{staticClass:"line-number"},[t._v("8")]),n("br"),n("span",{staticClass:"line-number"},[t._v("9")]),n("br"),n("span",{staticClass:"line-number"},[t._v("10")]),n("br"),n("span",{staticClass:"line-number"},[t._v("11")]),n("br"),n("span",{staticClass:"line-number"},[t._v("12")]),n("br"),n("span",{staticClass:"line-number"},[t._v("13")]),n("br"),n("span",{staticClass:"line-number"},[t._v("14")]),n("br"),n("span",{staticClass:"line-number"},[t._v("15")]),n("br"),n("span",{staticClass:"line-number"},[t._v("16")]),n("br"),n("span",{staticClass:"line-number"},[t._v("17")]),n("br"),n("span",{staticClass:"line-number"},[t._v("18")]),n("br"),n("span",{staticClass:"line-number"},[t._v("19")]),n("br"),n("span",{staticClass:"line-number"},[t._v("20")]),n("br"),n("span",{staticClass:"line-number"},[t._v("21")]),n("br"),n("span",{staticClass:"line-number"},[t._v("22")]),n("br"),n("span",{staticClass:"line-number"},[t._v("23")]),n("br"),n("span",{staticClass:"line-number"},[t._v("24")]),n("br"),n("span",{staticClass:"line-number"},[t._v("25")]),n("br")])]),n("p",[t._v("分别运行 client 和 server，server 端会每隔 1s 输出：")]),t._v(" "),n("div",{staticClass:"language-bash line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-bash"}},[n("code",[t._v("➜  sidergo git:"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("master"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" ✗ go run example/server/main.go\nhello\nworld\nand\ngoodbye\n")])]),t._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[t._v("1")]),n("br"),n("span",{staticClass:"line-number"},[t._v("2")]),n("br"),n("span",{staticClass:"line-number"},[t._v("3")]),n("br"),n("span",{staticClass:"line-number"},[t._v("4")]),n("br"),n("span",{staticClass:"line-number"},[t._v("5")]),n("br")])]),n("p",[t._v("上面的代码可以很容易的从网上找到并且有详细的解释，这里不做过多的说明。这边我们重点要弄清 一个问题：")]),t._v(" "),n("ol",[n("li",[t._v("client 是一次性发送整个 content，但是 server 却每次只读到部分内容？（不是一次性输出 content，而是间隔 1s 输出部分内容，所以说 server 每次只读只到部分内容）")])]),t._v(" "),n("p",[t._v("这个问题可以很简单的回答：因为 "),n("code",[t._v("buf.ReadBytes('\\n')")]),t._v("  会逐个字节的读取 client 发送过来的内容，直到读取到 "),n("code",[t._v("\\n")]),t._v(" 之后返回。如果 client 发送过来的内容全部读取完毕，那么就返回 "),n("code",[t._v("io.EOF")]),t._v(" 表示内容读取完毕。而就是这个简单代码就解决了大名鼎鼎的「TCP 粘包问题」。")]),t._v(" "),n("h2",{attrs:{id:"所谓「tcp-粘包问题」"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#所谓「tcp-粘包问题」"}},[t._v("#")]),t._v(" 所谓「TCP 粘包问题」")]),t._v(" "),n("blockquote",[n("p",[t._v("首先要指出：「TCP 粘包问题」本身就不是一个正确的描述，但是在很多地方甚至包括面试给你挖坑都会碰到这个名词，所以这里也不正确的使用这个词\n那什么是粘包问题：**A 端在接收到 B 端传递过来的数据，无法正确的解析数据。更具体点说，无法区分数据的边界。**如果无法理解这段解释，那么我们从 TCP 协议讲讲。")])]),t._v(" "),n("p",[t._v("可能你不是很熟悉 TCP/IP 协议、三次握手/四次挥手等网络相关内容，没关系，我们也可以屏蔽那些细节，从高一点的角度理解 TCP 粘包问题。")]),t._v(" "),n("p",[t._v("TCP 是一个基于「字节流」的传输层通信协议，这里重点在「字节流」。基于字节流的意思是：不管传输的数据是文本、图片、还是视频，在 TCP 层都是将数据变成字节流发送给对方，所以上面 "),n("code",[t._v("hello\\nworld\\nand\\ngoodbye\\n")]),t._v(" 在 TCP 层是这样传递的：")]),t._v(" "),n("p",[n("img",{attrs:{src:"https://raw.githubusercontent.com/chenjiayao/sidergo-posts/master/docs/images/chapter-1-1.jpg",alt:""}})]),t._v(" "),n("p",[t._v("而 server 端从到 TCP 读取到字节数据之后，内心会有一个疑问："),n("strong",[t._v("client 给我发送了这么些个字节数据，我要怎么看？")])]),t._v(" "),n("p",[t._v("client 希望发给 server 的信息是：「hello\\nworld\\nand\\ngoodbye」。但是由于数据在 TCP 层传输中都是以字节的形式传输，所以 server 端只会收到字节数据，而 server 端依靠自己无法将字节数据正确解析，server 可能会解析成 "),n("code",[t._v("hel lo\\nwo rld\\n and\\ng oodb ye\\n")]),t._v(" 等任意形式，好像 TCP 在传输数据过程中将数据都粘合到一起了。")]),t._v(" "),n("p",[t._v("现在来解释「TCP 粘包问题」这个描述为什么不正确："),n("strong",[t._v("因为 TCP 本身设计只将数据以字节流的形式发送给对方，而如何解析收到的字节流数据是应用本身的事情")]),t._v("。无法正确解析字节流数据是应用的责任，这个锅 TCP 不背。")]),t._v(" "),n("p",[t._v("那 server 要如何正确解析从 TCP 层读取到的字节流数据？")]),t._v(" "),n("h2",{attrs:{id:"数据解析"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#数据解析"}},[t._v("#")]),t._v(" 数据解析")]),t._v(" "),n("p",[t._v("所有语言涉及到网络编程都需要处理「TCP 数据解析」，这个问题有两个通用的解决方式：")]),t._v(" "),n("ol",[n("li",[t._v("固定分隔符分割数据")]),t._v(" "),n("li",[t._v("固定 header + 数据包长度")])]),t._v(" "),n("p",[t._v("下面来详细介绍下这两种解析方式")]),t._v(" "),n("p",[t._v("固定分隔符分割数据：客户端和服务端约定使用某一个符号来区分每一段数据。上面的 "),n("code",[t._v("hello\\nworld\\nand\\ngood\\nbye")]),t._v(" 就使用了这种方式，客户端和服务端约定使用 「"),n("code",[t._v("\\n")]),t._v("」区分每段数据，这样接收方从 TCP 读取字节流数据时，假设读取到 "),n("code",[t._v("\\n")]),t._v(" ，就表明这段数据已经读取完毕。")]),t._v(" "),n("div",{staticClass:"language-go line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-go"}},[n("code",[n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//server/main.go")]),t._v("\n    "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("go")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("func")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("conn net"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("Conn"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        buf "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":=")]),t._v(" bufio"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("NewReader")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("conn"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n        "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("for")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n            buffer"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" err "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":=")]),t._v(" buf"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("ReadBytes")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token char"}},[t._v("'\\n'")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//这里每次读取到 \\n 之后就返回数据")]),t._v("\n            "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("...")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("\n        "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n    "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("conn"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])]),t._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[t._v("1")]),n("br"),n("span",{staticClass:"line-number"},[t._v("2")]),n("br"),n("span",{staticClass:"line-number"},[t._v("3")]),n("br"),n("span",{staticClass:"line-number"},[t._v("4")]),n("br"),n("span",{staticClass:"line-number"},[t._v("5")]),n("br"),n("span",{staticClass:"line-number"},[t._v("6")]),n("br"),n("span",{staticClass:"line-number"},[t._v("7")]),n("br"),n("span",{staticClass:"line-number"},[t._v("8")]),n("br")])]),n("p",[t._v("这种解析方式简单明了，但是这种解析方式存在一个缺点："),n("strong",[t._v("如果数据包中的内容无意包含了 "),n("code",[t._v("\\n")]),t._v("，那么接收端就无法正常解析数据。")]),t._v(" 比如，如果客户端和服务端 约定使用 "),n("code",[t._v("\\n")]),t._v(" 作为分隔符，但是客户端想服务端发送 "),n("code",[t._v("he\\no world")]),t._v("，那么加上 "),n("code",[t._v("\\n")]),t._v(" 之后，服务端接收到的数据就是 "),n("code",[t._v("he\\no\\nworld")]),t._v("，由于 "),n("code",[t._v("he\\no")]),t._v(" 这个正常数据也包含了 "),n("code",[t._v("\\n")]),t._v("，服务端会把数据解析成 "),n("code",[t._v("he o world")]),t._v("。这个缺点在聊天软件中时无法接受的，因为发送的内容是用户输入的，用户输入的内容千奇百怪，很容易在发送内容中包含了分隔符，这样就会导致服务端解析出错，这种情况下需要使用「固定 header + 数据包长度」来处理。")])])}),[],!1,null,null,null);s.default=e.exports}}]);