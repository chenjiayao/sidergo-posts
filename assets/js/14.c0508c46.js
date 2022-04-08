(window.webpackJsonp=window.webpackJsonp||[]).push([[14],{577:function(s,t,a){"use strict";a.r(t);var n=a(16),e=Object(n.a)({},(function(){var s=this,t=s.$createElement,a=s._self._c||t;return a("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[a("blockquote",[a("p",[s._v("本篇重点关注以下 2 点：")]),s._v(" "),a("ol",[a("li",[s._v("skipList 的实现")]),s._v(" "),a("li",[s._v("redis 中对于 skipList 的扩展")])])]),s._v(" "),a("p",[s._v("⚠️ 本篇属于纯纯的数据结构，如果你对数据结构感到恐惧可以跳过本篇，直接使用 GitHub 上的代码，不会对后续的学习产生影响。"),a("em",[s._v("不过我还是建议你直面恐惧😃")]),s._v("。")]),s._v(" "),a("h2",{attrs:{id:"👨‍🏫-skiplist-介绍"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#👨‍🏫-skiplist-介绍"}},[s._v("#")]),s._v(" 👨‍🏫 skiplist 介绍")]),s._v(" "),a("p",[s._v("redis 中 sortedset 的底层数据结构就是使用 skiplist，所以在实现 sortedset 相关命令之前，我们有必要了解并且实现 skiplist。")]),s._v(" "),a("p",[s._v("skiplist 的目的是为了快速查找，它本质上是一个「有序链表」，但是为了更快的查找，在有序链表上做了一些改进。下面用几张图示来展示 skiplist 工作原理。")]),s._v(" "),a("p",[s._v("对于一个有序链表：查找效率是 "),a("code",[s._v("O(n)")]),s._v("，同样对有序链表的增删改都要先进行查找，所以增删改的效率也是 "),a("code",[s._v("O(n)")]),s._v("。这个效率是比较慢的，它的好处在于元素已经有序，这样对 "),a("code",[s._v("zrank")]),s._v(" 之类的命令直接顺序读取链表数据就行。")]),s._v(" "),a("p",[a("img",{attrs:{src:"https://raw.githubusercontent.com/chenjiayao/sidergo-posts/master/docs/images/20220402093329.png",alt:""}})]),s._v(" "),a("p",[s._v("在代码中，通常会这么设计有序链表")]),s._v(" "),a("div",{staticClass:"language-go line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-go"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("type")]),s._v(" Node "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("struct")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    Element     "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("//保存元素")]),s._v("\n    backward "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("*")]),s._v("Node "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("//前一个节点")]),s._v("\n    forward "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("*")]),s._v("Node "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("//下一个节点")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br")])]),a("p",[s._v("如果，我们要提高有序链表的查找效率，"),a("strong",[s._v("可以取间隔节点，对节点新增一个指针，指向下下个节点")]),s._v("：")]),s._v(" "),a("p",[a("img",{attrs:{src:"https://raw.githubusercontent.com/chenjiayao/sidergo-posts/master/docs/images/20220402103927.png",alt:""}})]),s._v(" "),a("p",[s._v("这种情况下，有一些节点（比如节点 3）会有多个 forward 指针，所以 Node 的结构体变成下面这样：")]),s._v(" "),a("div",{staticClass:"language-go line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-go"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("type")]),s._v(" Node "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("struct")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    Element\n    forwards   "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("*")]),s._v("Node "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("//  多个下一个节点")]),s._v("\n    backward "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("*")]),s._v("Node    "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("//  最底层的前一个节点")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br")])]),a("p",[s._v("这样有序链表就进化了，现在假设我们要查找 19，查找思路如下：")]),s._v(" "),a("ol",[a("li",[s._v("从 3 的两个 forward 指针遍历，第一个 foward 指向的下一个元素的值为 12，12 < 19，那么 12 之前的节点都就不用遍历了。在上面的图示中，节点 8 在查找过程中就被跳过了，这也是 skiplist 名字的由来。")]),s._v(" "),a("li",[s._v("同样，遍历 12 的两个 forward 指针，第一个指针指向的节点为 23，23 > 19，那么接着查看第二个 forward 指针，第二个指针指向 19，就是我们要找的元素。")])]),s._v(" "),a("p",[s._v("和有序列表对比查找效率，有序列表需要遍历 "),a("code",[s._v("3-8-12-19")]),s._v("，而现在只要遍历 "),a("code",[s._v("3-12-19")]),s._v("，如果链表长度够长，那么效率提高会更明显。")]),s._v(" "),a("p",[s._v("这种形态距离真正的 skiplist 已经很接近了，真正的 skiplist 对于哪些节点要增加指针是随机的。")]),s._v(" "),a("p",[a("img",{attrs:{src:"https://raw.githubusercontent.com/chenjiayao/sidergo-posts/master/docs/images/20220402151753.png",alt:""}})]),s._v(" "),a("p",[s._v("上面的图示就是一个 skiplist，对于哪个节点需要增加指针，增加多少个指针是随机的。可以看到 node 的层级越多，能跳过的 node 就有可能越多，查找速度有可能越快，但是也不能任凭层级无限制的增长，通常一个 skiplist 会设置一个 "),a("code",[s._v("MAX_LEVEL")]),s._v(" 来限制最大的层级（代码中用 level 表示）。skiplist 的时间复杂度是 "),a("code",[s._v("O(log n)")]),s._v("，和树的时间复杂度一样，效率很高。")]),s._v(" "),a("h2",{attrs:{id:"👨‍💻-代码实现"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#👨‍💻-代码实现"}},[s._v("#")]),s._v(" 👨‍💻 代码实现")]),s._v(" "),a("p",[s._v("现在我们已经知道 skiplist 的形态和查找思路，接下来就可以尝试实现了。")]),s._v(" "),a("p",[s._v("首先 Node 的结构体上面已经提到了")]),s._v(" "),a("div",{staticClass:"language-go line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-go"}},[a("code",[s._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("type")]),s._v(" Element "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("struct")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n\tScore  "),a("span",{pre:!0,attrs:{class:"token builtin"}},[s._v("float64")]),s._v("\n\tMember "),a("span",{pre:!0,attrs:{class:"token builtin"}},[s._v("string")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("type")]),s._v(" Level "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("struct")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    forward "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("*")]),s._v("Node "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("//同层的下一个节点")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("type")]),s._v(" Node "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("struct")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    Element\n    forwards   "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("*")]),s._v("Level "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("//  下一个节点，")]),s._v("\n    backward "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("*")]),s._v("Node    "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("//  最底层的前一个节点")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br"),a("span",{staticClass:"line-number"},[s._v("8")]),a("br"),a("span",{staticClass:"line-number"},[s._v("9")]),a("br"),a("span",{staticClass:"line-number"},[s._v("10")]),a("br"),a("span",{staticClass:"line-number"},[s._v("11")]),a("br"),a("span",{staticClass:"line-number"},[s._v("12")]),a("br"),a("span",{staticClass:"line-number"},[s._v("13")]),a("br"),a("span",{staticClass:"line-number"},[s._v("14")]),a("br"),a("span",{staticClass:"line-number"},[s._v("15")]),a("br")])]),a("p",[s._v("下图用来展示下 Node 各个属性所表示的含义")]),s._v(" "),a("p",[a("img",{attrs:{src:"https://raw.githubusercontent.com/chenjiayao/sidergo-posts/master/docs/images/20220404222606.png",alt:""}})]),s._v(" "),a("p",[s._v("除了 Node，还需要一个结构体来表示 skiplist")]),s._v(" "),a("div",{staticClass:"language-go line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-go"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("type")]),s._v(" SkipList "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("struct")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    tail   "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("*")]),s._v("Node\n    header "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("*")]),s._v("Node\n    level  "),a("span",{pre:!0,attrs:{class:"token builtin"}},[s._v("int")]),s._v("    "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 最高 level 层数，上面图示中为 4，(最高为节点 8，有 4 层)")]),s._v("\n    length "),a("span",{pre:!0,attrs:{class:"token builtin"}},[s._v("int64")]),s._v("  "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// skiplist 长度")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br")])]),a("p",[s._v("现在，Element、Node 和 SkipList 结构体都有了，我们可以尝试实现 skiplist 的增删改查，不过在此之前需要实现 "),a("code",[s._v("MakeSkipList")]),s._v(" 和 "),a("code",[s._v("MakeNode")]),s._v(" 两个函数。")]),s._v(" "),a("p",[s._v("创建一个 Node 需要 3 个属性：")]),s._v(" "),a("ol",[a("li",[s._v("score")]),s._v(" "),a("li",[s._v("member")]),s._v(" "),a("li",[s._v("level")])]),s._v(" "),a("p",[s._v("前两个为 redis zset 需要的，第三个参数 level 可以设定当前 Node 的层数。有了这 3 个属性，我们可以实现 "),a("code",[s._v("MakeNode")])]),s._v(" "),a("div",{staticClass:"language-go line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-go"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("func")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("MakeNode")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("level "),a("span",{pre:!0,attrs:{class:"token builtin"}},[s._v("int")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" score "),a("span",{pre:!0,attrs:{class:"token builtin"}},[s._v("float64")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" member "),a("span",{pre:!0,attrs:{class:"token builtin"}},[s._v("string")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("*")]),s._v("Node "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n\n    node "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":=")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("&")]),s._v("Node"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n        Element"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" Element"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n            Score"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("  score"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n            Member"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" member"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n        "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n        levels"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("make")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("*")]),s._v("Level"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" level"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("for")]),s._v(" i "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":=")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("0")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v(" i "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("<")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("len")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("node"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("levels"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v(" i"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("++")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n        node"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("levels"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),s._v("i"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("&")]),s._v("Level"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n            forward"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token boolean"}},[s._v("nil")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n        "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("return")]),s._v(" node\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br"),a("span",{staticClass:"line-number"},[s._v("8")]),a("br"),a("span",{staticClass:"line-number"},[s._v("9")]),a("br"),a("span",{staticClass:"line-number"},[s._v("10")]),a("br"),a("span",{staticClass:"line-number"},[s._v("11")]),a("br"),a("span",{staticClass:"line-number"},[s._v("12")]),a("br"),a("span",{staticClass:"line-number"},[s._v("13")]),a("br"),a("span",{staticClass:"line-number"},[s._v("14")]),a("br"),a("span",{staticClass:"line-number"},[s._v("15")]),a("br"),a("span",{staticClass:"line-number"},[s._v("16")]),a("br"),a("span",{staticClass:"line-number"},[s._v("17")]),a("br")])]),a("p",[a("code",[s._v("MakeSkipList")]),s._v(" 会创建一个 skiplist，为了代码逻辑比较清楚，通常会为 skiplist 创建一个 node，这个 node 不保存 Element，把这个空 Node 当作 skiplist 的 header。")]),s._v(" "),a("div",{staticClass:"language-go line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-go"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("const")]),s._v(" MAX_LEVEL "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("6")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("//限制 skiplist 最高层级不能超过 6 层")]),s._v("\n\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("func")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("MakeSkipList")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("*")]),s._v("SkipList "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("return")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("&")]),s._v("SkipList"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n        tail"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("   "),a("span",{pre:!0,attrs:{class:"token boolean"}},[s._v("nil")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n        header"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("MakeNode")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("MAX_LEVEL"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("0")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('""')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("//空元素节点作为 header，header 拥有最高层级")]),s._v("\n        level"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("  "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("1")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n        length"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("0")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br"),a("span",{staticClass:"line-number"},[s._v("8")]),a("br"),a("span",{staticClass:"line-number"},[s._v("9")]),a("br"),a("span",{staticClass:"line-number"},[s._v("10")]),a("br")])]),a("p",[s._v("现在，我们已经实现了创建 "),a("code",[s._v("MakeSkipList")]),s._v(" 和 "),a("code",[s._v("MakeNode")]),s._v(" 方法，现在只要再实现 skiplist 的增删改方法就可以了。")]),s._v(" "),a("h3",{attrs:{id:"remove"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#remove"}},[s._v("#")]),s._v(" Remove")]),s._v(" "),a("p",[s._v("有序链表的增删改都需要先找到该节点，所以实现 remove 之前，我们需要先理解 skiplist 如何查找。")]),s._v(" "),a("p",[s._v("前面提到 skiplist 是有序链表，"),a("strong",[s._v("这里要注意，这里的顺序是按照 score 排序的，如果 score 一样再根据 member 排序，类似 sql 中的 "),a("code",[s._v("order by score acs, member acs")]),s._v("。")])]),s._v(" "),a("p",[s._v("假设我们要查找 score=12 的 element，当前节点为 "),a("code",[s._v("currentNode")]),s._v("，遍历 "),a("code",[s._v("currentNode.levels")]),s._v("，遍历会有 3 种情况(每个图示中黄色线条为查找示例)：")]),s._v(" "),a("ol",[a("li",[a("p",[s._v("第一种 "),a("code",[s._v("currentNode.levels[i] == nil")]),s._v("，这种情况下说明该层级指向的下一个节点已经到达 skiplist tail 了，继续查找下一层 level。\n"),a("img",{attrs:{src:"https://raw.githubusercontent.com/chenjiayao/sidergo-posts/master/docs/images/20220402151428.png",alt:""}})])]),s._v(" "),a("li",[a("p",[s._v("第二种情况 "),a("code",[s._v("currentNode.levels[i].Element.score > score")]),s._v("，这种情况说明这个层级的下一个节点 score 已经超出了我们给定的 score。继续查找下一层 level。\n"),a("img",{attrs:{src:"https://raw.githubusercontent.com/chenjiayao/sidergo-posts/master/docs/images/20220402151512.png",alt:""}})])]),s._v(" "),a("li",[a("p",[s._v("第三种情况 "),a("code",[s._v("curretNode.levesl[i].Element.score <= score")]),s._v("，这种情况说明这个层级的下一个节点 score 小于(或等于)我们给定的 score，这个情况下，currentNode 可以直接跳到该 node："),a("code",[s._v("currentNode = currentNode.levels[i]")]),s._v("。\n"),a("img",{attrs:{src:"https://raw.githubusercontent.com/chenjiayao/sidergo-posts/master/docs/images/20220402151547.png",alt:""}})])])]),s._v(" "),a("p",[s._v("理清楚查找的 3 个情况，我们就可以实现 remove 方法了 👏")]),s._v(" "),a("div",{staticClass:"language-go line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-go"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("func")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("skipList "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("*")]),s._v("SkipList"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("remove")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("score "),a("span",{pre:!0,attrs:{class:"token builtin"}},[s._v("float64")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" member "),a("span",{pre:!0,attrs:{class:"token builtin"}},[s._v("string")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("*")]),s._v("Node "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    currentNode "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":=")]),s._v(" skipList"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("header\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("for")]),s._v(" i "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":=")]),s._v(" MAX_LEVEL "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("-")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("1")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v(" i "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(">=")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("0")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v(" i"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("--")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("//这里的 for 为 true 相当于情况 3，但是是用「不是 情况 1」 && 「不是情况 2 」来表示")]),s._v("\n\t"),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("for")]),s._v(" \n            currentNode"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("levels"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),s._v("i"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("forward "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("!=")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token boolean"}},[s._v("nil")]),s._v("\n             "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("&&")]),s._v("\n            "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("currentNode"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("levels"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),s._v("i"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("forward"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("Score "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("<")]),s._v(" score "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("||")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("currentNode"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("levels"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),s._v("i"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("forward"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("Score "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("==")]),s._v(" score "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("&&")]),s._v(" currentNode"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("levels"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),s._v("i"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("forward"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("Member "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("<")]),s._v(" member"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n\t\tcurrentNode "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" currentNode"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("levels"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),s._v("i"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("forward\n\t    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n\t"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n\n    "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("//现在 currentNode 的下一个节点就是要删除的节点")]),s._v("\n    \n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br"),a("span",{staticClass:"line-number"},[s._v("8")]),a("br"),a("span",{staticClass:"line-number"},[s._v("9")]),a("br"),a("span",{staticClass:"line-number"},[s._v("10")]),a("br"),a("span",{staticClass:"line-number"},[s._v("11")]),a("br"),a("span",{staticClass:"line-number"},[s._v("12")]),a("br"),a("span",{staticClass:"line-number"},[s._v("13")]),a("br"),a("span",{staticClass:"line-number"},[s._v("14")]),a("br"),a("span",{staticClass:"line-number"},[s._v("15")]),a("br")])]),a("p",[s._v("注意看代码中的注释，这是理解查找的关键。")]),s._v(" "),a("p",[s._v("执行完 for 的代码之后，"),a("code",[s._v("currentNode")]),s._v(" 的下一个节点就是要删除的节点。假设我们要删除 19，那么 currentNode 现在指向 12 节点，现在我们要考虑删除 19 之后要更新哪些数据？")]),s._v(" "),a("ol",[a("li",[s._v("节点 23 的 backward 指针")]),s._v(" "),a("li",[s._v("指向 19 的 fowards 指针，在这里应该是"),a("code",[s._v("节点 8 的 levels[1].forward")]),s._v("和"),a("code",[s._v("节点 12 的 levels[0].forward")]),s._v("。")])]),s._v(" "),a("p",[s._v("上面的情况 2 是针对删除节点 19 的情况，但是实际会有其他的情况，比如要删除的节点是 23，那么要更新的 forwards 指针就不一样了，所以情况 2 需要有一个更加通用的描述。")]),s._v(" "),a("p",[s._v("为了方便描述，假设要删除的节点是 delNode，delNode 的前一个节点是 backwardDelNode，那么更新 forwards 指针应该是")]),s._v(" "),a("ol",[a("li",[a("p",[s._v("如果 "),a("code",[s._v("len(delNode.levels) <= len(backwardDelNode.levels)")]),s._v("，那么只要更新 backwardDelNode 中 "),a("code",[s._v("levels[0:len(delNode.levels) - 1]")]),s._v(" 的 forward 指针。（如下图黄色线条部分\n"),a("img",{attrs:{src:"https://raw.githubusercontent.com/chenjiayao/sidergo-posts/master/docs/images/20220408115042.png",alt:""}})])]),s._v(" "),a("li",[a("p",[s._v("如果 "),a("code",[s._v("len(delNode.levels) > len(backwardDelNode.levels)")]),s._v("，那么要更新的 forwards 分成了两个部分")]),s._v(" "),a("ol",[a("li",[s._v("backwardDelNode 中 "),a("code",[s._v("levels[0:len(backwardDelNode.levels) - 1]")]),s._v(" "),a("img",{attrs:{src:"https://raw.githubusercontent.com/chenjiayao/sidergo-posts/master/docs/images/20220408115749.png",alt:""}})]),s._v(" "),a("li",[s._v("其他节点的 "),a("code",[s._v("levels[len(backwardDelNode.levels):len(delNode.levels) - 1]")]),s._v(" "),a("img",{attrs:{src:"https://raw.githubusercontent.com/chenjiayao/sidergo-posts/master/docs/images/20220408115911.png",alt:""}})])])])])])}),[],!1,null,null,null);t.default=e.exports}}]);