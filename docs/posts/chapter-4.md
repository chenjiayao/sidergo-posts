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

```go
type Node struct {
    Element     //保存元素
    backward *Node //前一个节点
    forward *Node //下一个节点
}
```

如果，我们要提高有序链表的查找效率，**可以取间隔节点，对节点新增一个指针，指向下下个节点**：

![](https://raw.githubusercontent.com/chenjiayao/sidergo-posts/master/docs/images/20220402103927.png)


这种情况下，有一些节点（比如节点 3）会有多个 forward 指针，所以 Node 的结构体变成下面这样：

```go
type Node struct {
    Element
    forwards   []*Node //  多个下一个节点
    backward *Node    //  最底层的前一个节点
}
```

这样有序链表就进化了，现在假设我们要查找 19，查找思路如下：

1. 从 3 的两个 forward 指针遍历，第一个 foward 指向的下一个元素的值为 12，12 < 19，那么 12 之前的节点都就不用遍历了。在上面的图示中，节点 8 在查找过程中就被跳过了，这也是 skiplist 名字的由来。
2. 同样，遍历 12 的两个 forward 指针，第一个指针指向的节点为 23，23 > 19，那么接着查看第二个 forward 指针，第二个指针指向 19，就是我们要找的元素。


和有序列表对比查找效率，有序列表需要遍历 `3-8-12-19`，而现在只要遍历 `3-12-19`，如果链表长度够长，那么效率提高会更明显。



这种形态距离真正的 skiplist 已经很接近了，真正的 skiplist 对于哪些节点要增加指针是随机的。

![](https://raw.githubusercontent.com/chenjiayao/sidergo-posts/master/docs/images/20220402151753.png)

上面的图示就是一个 skiplist，对于哪个节点需要增加指针，增加多少个指针是随机的。可以看到 node 的层级越多，能跳过的 node 就有可能越多，查找速度有可能越快，但是也不能任凭层级无限制的增长，通常一个 skiplist 会设置一个 `MAX_LEVEL` 来限制最大的层级（代码中用 level 表示）。skiplist 的时间复杂度是 `O(log n)`，和树的时间复杂度一样，效率很高。


## 👨‍💻 代码实现

现在我们已经知道 skiplist 的形态和查找思路，接下来就可以尝试实现了。

首先 Node 的结构体上面已经提到了，不同的是，这里定义了一个 Level 的结构体，为什么这么做后面会解释。

```go

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

下图用来展示下 Node 各个属性所表示的含义

![](https://raw.githubusercontent.com/chenjiayao/sidergo-posts/master/docs/images/20220404222606.png)

除了 Node，还需要一个结构体来表示 skiplist

```go
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

前两个为 redis zset 需要的，第三个参数 level 可以设定当前 Node 的层数。有了这 3 个属性，我们可以实现 `MakeNode`

```go
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

```go
const MAX_LEVEL = 6 //限制 skiplist 最高层级不能超过 6 层

func MakeSkipList() *SkipList {
    return &SkipList{
        tail:   nil,
        header: MakeNode(MAX_LEVEL, 0, ""), //空元素节点作为 header，header 拥有最高层级
        level:  1,
        length: 0,
    }
}
```

现在，我们已经实现了创建 `MakeSkipList` 和 `MakeNode` 方法，现在只要再实现 skiplist 的增删改方法就可以了。

### Remove



有序链表的增删改都需要先找到该节点，所以实现 remove 之前，我们需要先理解 skiplist 如何查找。

前面提到 skiplist 是有序链表，**这里要注意，这里的顺序是按照 score 排序的，如果 score 一样再根据 member 排序，类似 sql 中的 `order by score acs, member acs`。**



假设我们要查找 score=12 的 element，当前节点为 `currentNode`，遍历 `currentNode.levels`，遍历会有 3 种情况(每个图示中黄色线条为查找示例)：

1. 第一种 `currentNode.levels[i] == nil`，这种情况下说明该层级指向的下一个节点已经到达 skiplist tail 了，继续查找下一层 level。
![](https://raw.githubusercontent.com/chenjiayao/sidergo-posts/master/docs/images/20220402151428.png)

2. 第二种情况 `currentNode.levels[i].Element.score > score`，这种情况说明这个层级的下一个节点 score 已经超出了我们给定的 score。继续查找下一层 level。
![](https://raw.githubusercontent.com/chenjiayao/sidergo-posts/master/docs/images/20220402151512.png)

3. 第三种情况 `curretNode.levesl[i].Element.score <= score`，这种情况说明这个层级的下一个节点 score 小于(或等于)我们给定的 score，这个情况下，currentNode 可以直接跳到该 node：`currentNode = currentNode.levels[i]`。
![](https://raw.githubusercontent.com/chenjiayao/sidergo-posts/master/docs/images/20220402151547.png)

理清楚查找的 3 个情况，我们就可以实现 remove 方法了 👏

```go
func (skipList *SkipList) remove(score float64, member string) *Node {
    currentNode := skipList.header
    for i := MAX_LEVEL - 1; i >= 0; i-- {
    //这里的 for 为 true 相当于情况 3，但是是用「不是 情况 1」 && 「不是情况 2 」来表示
	for 
            currentNode.levels[i].forward != nil
             &&
            (currentNode.levels[i].forward.Score < score || (currentNode.levels[i].forward.Score == score && currentNode.levels[i].forward.Member < member)) {
		currentNode = currentNode.levels[i].forward
	    }
	}

    //现在 currentNode 的下一个节点就是要删除的节点
    
}
```
注意看代码中的注释，这是理解查找的关键。

执行完 for 的代码之后，`currentNode` 的下一个节点就是要删除的节点。假设我们要删除 19，那么 currentNode 现在指向 12 节点，现在我们要考虑删除 19 之后要更新哪些数据？

1. 节点 23 的 backward 指针
2. 指向 19 的 fowards 指针，在这里应该是`节点 8 的 levels[1].forward `和`节点 12 的 levels[0].forward`。


上面的情况 2 是针对删除节点 19 的情况，但是实际会有其他的情况，比如要删除的节点是 23，那么要更新的 forwards 指针就不一样了，所以情况 2 需要有一个更加通用的描述。

为了方便描述，假设要删除的节点是 delNode，delNode 的前一个节点是 backwardDelNode，那么更新 forwards 指针应该是

1. 如果 `len(delNode.levels) <= len(backwardDelNode.levels)`，那么只要更新 backwardDelNode 中 `levels[0:len(delNode.levels) - 1]` 的 forward 指针。（如下图黄色线条部分
![](https://raw.githubusercontent.com/chenjiayao/sidergo-posts/master/docs/images/20220408115042.png)
   
2. 如果 `len(delNode.levels) > len(backwardDelNode.levels)`，那么要更新的 forwards 分成了两个部分
   1. backwardDelNode 中 `levels[0:len(backwardDelNode.levels) - 1]`
    ![](https://raw.githubusercontent.com/chenjiayao/sidergo-posts/master/docs/images/20220408115749.png)
   2. 其他节点的 `levels[len(backwardDelNode.levels):len(delNode.levels) - 1]`
   ![](https://raw.githubusercontent.com/chenjiayao/sidergo-posts/master/docs/images/20220408115911.png)

上面的情况，「1」和「2.1」比较好处理，但是「2.2」的情况比较麻烦一些，因为 2.2 情况要更新 forward 指针的可以是任意节点。