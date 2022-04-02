---
title: skipList 实现
author: 新自助
date: '2022-02-17'
---

> 本篇重点关注以下 2 点：
> 1. skipList 的实现
> 2. redis 中对于 skipList 的扩展

⚠️ 本篇属于纯纯的数据结构，如果你对数据结构感到恐惧可以跳过本篇，直接使用 GitHub 上的代码，不会对后续的学习产生影响。*不过我还是建议你直面恐惧😃*。

## 👨‍🏫 skiplist 介绍

redis 中 sortedset 的底层数据结构就是使用 skiplist，所以在实现 sortedset 相关命令之前，我们有必要了解并且实现 skiplist。

skiplist 的目的是为了快速查找，它本质上是一个「有序链表」，但是为了更快的查找，在有序链表上做了一些改进。下面用几张图示来展示 skiplist 工作原理。

对于一个有序链表：查找效率是 `O(n)`，同样对有序链表的增删改都要先进行查找，所以增删改的效率也是 `O(n)`。这个效率是比较慢的，它的好处在于元素已经有序，这样对 `zrank` 之类的命令直接顺序读取链表数据就行。

![](https://raw.githubusercontent.com/chenjiayao/sidergo-posts/master/docs/images/20220402093329.png)

在代码中，通常会这么设计有序链表

```golang
type Node struct {
    Element     //保存元素
    backward *Node //前一个节点
    forward *Node //下一个节点
}
```

如果，我们要提高有序链表的查找效率，**取间隔节点，对节点新增一个指针，指向下下个节点**：

![](https://raw.githubusercontent.com/chenjiayao/sidergo-posts/master/docs/images/20220402103927.png)


这样有序链表就进化了，现在假设我们要查找 19，查找思路如下：

1. 从 3 的两个 forward 指针遍历，第一个 foward 指向的下一个元素的值为 12，12 < 19，那么 12 之前的节点都就不用遍历了。在上面的图示中，节点 8 在查找过程中就被跳过了，这也是 skiplist 名字的由来。
2. 同样，遍历 12 的两个 forward 指针，第一个指针指向的节点为 23，23 > 19，那么接着查看第二个 forward 指针，第二个指针指向 19，就是我们要找的元素。


和有序列表对比查找效率，有序列表需要遍历 `3-8-12-19`，而现在只要遍历 `3-12-19`，如果链表长度够长，那么效率提高会更明显。

这种情况下，Node 结构体可以设计成这样

```golang
type Node struct {
    Element
    forwards   []*Node //  下一个节点，
    backward *Node    //  最底层的前一个节点
}
```

这种形态距离真正的 skiplist 已经很接近了，真正的 skiplist 对于哪些节点要增加指针是随机的。

![](https://raw.githubusercontent.com/chenjiayao/sidergo-posts/master/docs/images/20220402110046.png)

上面的图示就是一个 skiplist，对于哪个节点需要增加指针，增加多少个指针是随机的。这样，skiplist 的时间复杂度是 `O(log n)`，和树的时间复杂度一样，效率很高。


## 👨‍💻 代码实现

现在我们已经知道 skiplist 的形态和查找思路，接下来就可以尝试实现了。

首先 Node 的结构体上面已经提到了

```golang

type Element struct {
	Score  float64
	Member string
}

type Level struct {
    forward *Node //同层的下一个节点
}

type Node struct {
    Element
    forwards   []*Level //  下一个节点，
    backward *Node    //  最底层的前一个节点
}
```

以节点 8 为例子来展示下 Node 各个属性所表示的含义

![](https://raw.githubusercontent.com/chenjiayao/sidergo-posts/master/docs/images/20220402114625.png)

除了 Node，还需要一个结构体来表示 skiplist

```golang
type SkipList struct {
    tail   *Node
    header *Node
    level  int    // 最高 level 层数，上面图示中为 4，(最高为节点 8，有 4 层)
    length int64  // skiplist 长度
}
```
现在，Element、Node 和 SkipList 结构体都有了，我们可以尝试实现 skiplist 的增删改查，不过在此之前需要实现 `MakeSkipList` 和 `MakeNode` 两个函数。


创建一个 Node 需要 3 个属性：
1. score
2. member
3. level

前两个为 redis zset 需要的，第三个 level 可以设定当前 Node 的层数。有了这 3 个属性，我们可以实现 `MakeNode`

```golang
func MakeNode(level int, score float64, member string) *Node {

    node := &Node{
        Element: Element{
            Score:  score,
            Member: member,
        },
        levels: make([]*Level, level),
    }

    for i := 0; i < len(node.levels); i++ {
        node.levels[i] = &Level{
            forward: nil,
        }
    }
    return node
}
```


`MakeSkipList` 会创建一个 skiplist，为了代码逻辑比较清楚，通常会为 skiplist 创建一个 node，这个 node 不保存 Element，把这个空 Node 当作 skiplist 的 header。

```golang
func MakeSkipList() *SkipList {
	return &SkipList{
		tail:   nil,
		header: MakeNode(MAX_LEVEL, 0, ""),
		level:  1,
		length: 0,
	}
}

```