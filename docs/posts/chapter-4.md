---
title: skipList 实现
author: 新自助
date: '2022-02-17'
---

> 本篇重点关注以下 2 点：
> 1. skipList 的实现
> 2. redis 中对于 skipList 的扩展

⚠️ 本篇属于纯纯的数据结构，如果你对数据结构感到恐惧可以跳过本篇，直接使用 GitHub 上的代码，不会对后续的学习产生影响。*不过我还是建议你直面恐惧 😃*。

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

![](https://raw.githubusercontent.com/chenjiayao/sidergo-posts/master/docs/images/20220424112630.png)

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

### Find



虽然 skiplist 中不会有 Find 函数，但是增删改都需要先查找到节点，所以在实现增删改之前，我们需要先理解 skiplist 如何查找。

前面提到 skiplist 是有序链表，**这里要注意，这里的顺序是按照 score 排序的，如果 score 一样再根据 member 排序，类似 sql 中的 `order by score acs, member acs`。**



假设我们要查找 score=12 的 element，当前节点为 `currentNode`，遍历 `currentNode.levels`，遍历会有 3 种情况(每个图示中黄色线条为查找示例)：

1. 第一种 `currentNode.levels[i] == nil`，这种情况下说明该层级指向的下一个节点已经到达 skiplist tail 了，继续查找下一层 level。
![](https://raw.githubusercontent.com/chenjiayao/sidergo-posts/master/docs/images/20220424112707.png)

2. 第二种情况 `currentNode.levels[i].Element.score > score`，这种情况说明这个层级的下一个节点 score 已经超出了我们给定的 score。继续查找下一层 level。
![](https://raw.githubusercontent.com/chenjiayao/sidergo-posts/master/docs/images/20220424112735.png)

3. 第三种情况 `curretNode.levesl[i].Element.score <= score`，这种情况说明这个层级的下一个节点 score 小于(或等于)我们给定的 score，这个情况下，currentNode 可以直接跳到该 node：`currentNode = currentNode.levels[i]`。
![](https://raw.githubusercontent.com/chenjiayao/sidergo-posts/master/docs/images/20220424112804.png)


### Remove

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

为了方便描述，假设要删除的节点是 delNode，delNode 的前一个节点是 currentNode，那么更新 forwards 指针应该是

1. 如果 `len(delNode.levels) <= len(currentNode.levels)`，那么只要更新 currentNode 中 `levels[0:len(delNode.levels) - 1]` 的 forward 指针。（如下图黄色线条部分
![](https://raw.githubusercontent.com/chenjiayao/sidergo-posts/master/docs/images/20220408115042.png)
   
1. 如果 `len(delNode.levels) > len(currentNode.levels)`，那么要更新的 forwards 分成了两个部分
   1. currentNode 中 `levels[0:len(currentNode.levels) - 1]`
    ![](https://raw.githubusercontent.com/chenjiayao/sidergo-posts/master/docs/images/20220424112848.png)
   2. 其他节点的 `levels[len(currentNode.levels):len(delNode.levels) - 1]`
   ![](https://raw.githubusercontent.com/chenjiayao/sidergo-posts/master/docs/images/20220424112932.png)

上面的情况，「1」和「2.1」比较好处理，但是「2.2」的情况比较麻烦一些，因为 2.2 情况要更新 forward 指针的可以是任意节点。

为了处理 2.2 的情况，我们在查找的过程中需要一个 slice 来保存「在查找过程中 level 下降的 node」。这句话可能不好理解，这里举个例子：在查找 19 过程中，currentNode 为 3、8 节点时，会下降层级查找。

```go
func (skipList *SkipList) remove(score float64, member string) *Node {

    updateNodes := make([]*Node, MAX_LEVEL)  //1
    currentNode := skipList.header
    for i := MAX_LEVEL - 1; i >= 0; i-- {
    //这里的 for 为 true 相当于情况 3，但是是用「不是 情况 1」 && 「不是情况 2 」来表示

	for i := MAX_LEVEL - 1; i >= 0; i-- {
		for currentNode.levels[i].forward != nil && (currentNode.levels[i].forward.Score < score || (currentNode.levels[i].forward.Score == score && currentNode.levels[i].forward.Member < member)) {
			currentNode = currentNode.levels[i].forward
		}
		updateNodes[i] = currentNode  // 2
	}

    //现在 currentNode 的下一个节点就是要删除的节点 
}
```

![](https://raw.githubusercontent.com/chenjiayao/sidergo-posts/master/docs/images/20220424122838.png)

这里要注意 `updateNodes` 中保存了两次 8 节点。

现在有了 updateNodes 中保存的数据，我们就可以更新 forward 指针了，更新 forward 指针的代码如下：

```go
if len(currentNode.levels) >= len(removeNode.levels) {
    // remove 情况 1
    for i := 0; i < len(removeNode.levels); i++ {
        currentNode.levels[i].forward = removeNode.levels[i].forward
    }
} else {
    // remove 情况 2.1
    for i := 0; i < len(currentNode.levels); i++ {
        currentNode.levels[i].forward = removeNode.levels[i].forward
    }

    // remove 情况 2.2
    for i := len(currentNode.levels); i < len(removeNode.levels)-1; i++ {
        updateNodes[i].levels[i].forward = removeNode.levels[i].forward
    }
}
```
remove 的逻辑差不多已经完成了，主要的难点有 2 个：
1. 如何找到被删除节点的位置
2. 删除之后更新 forward 指针


### insert

insert 的逻辑和 remove 差不多：
1. 找到要插入节点的位置
2. 插入之后更新 forward 指针

整个代码思路和 remove 差不多，这里不再赘述，有些细节问题可以参考 GitHub 的源码。



### redis 中的 skiplist

最开始提到 redis 中的 zset 结构是基于 skiplist 实现的，不过由于 zset 支持 zrank 操作，所以 redis 对于 skiplist 做了一点改进。


![](https://raw.githubusercontent.com/chenjiayao/sidergo-posts/master/docs/images/20220424112630.png)

zrank 可以返回 score 的排名，比如节点 3 的排名是 0，节点 36 的排名是 6。如果要获取一个 member 的排名，在现在的 skiplist 中，我们需要遍历 skiplist 最底层的双向链表才能获取到，这样时间复杂度就退化成 `O(n)` 了。

为了 zrank 的效率，redis 对 skiplist 做了一点优化：在 Level 增加 span 属性，代表**当前指针跨越了多少个节点**。

```go
type Level struct {
    forward *Node // 同层的下一个节点
    span    int64 // 跳过多少个元素，如果两个元素相邻，那么 span 为 0
}
```
下图展示了节点 8 每个 level.span 的值
![](https://raw.githubusercontent.com/chenjiayao/sidergo-posts/master/docs/images/20220424151708.png)

引入 span 之后，rank 就不必遍历链表了：只要在每次跳跃过程中，累计 span 的值，就可以以 `log(n)` 的时间复杂度获取到 rank 值了。

```go
func (skipList *SkipList) GetRank(member string, score float64) int64 {
    span := int64(0)
    currentNode := skipList.header

    for i := MAX_LEVEL - 1; i >= 0; i-- {
        for currentNode.levels[i].forward != nil && (currentNode.levels[i].forward.Score < score || (currentNode.levels[i].forward.Score == score && currentNode.levels[i].forward.Member < member)) {
            span += currentNode.levels[i].span + 1
            currentNode = currentNode.levels[i].forward
        }

        if currentNode.levels[i].forward != nil && currentNode.levels[i].forward.Member == member {
            span += currentNode.levels[i].span
            return span
        }
    }
    return span
}
```

引入 span 之后，对于 insert 和 remove 操作，我们同样也需要更新 span 的值，幸运的是更新 span 和更新 forward 的逻辑一样，这里同样不赘述，建议查看 GitHub 上源码了解更多。


### 调试

作为一个算法菜鸡，实现 skiplist 过程很痛苦，主要原因在于运行过程中无法「看到」skiplit 的结构，整个调试过程中很抓瞎，索性实现了一个 print 函数，可以将 skiplist 友好的打印出来，具体代码在[这里](https://github.com/chenjiayao/sidergo/blob/master/lib/sortedset/skip_list.go)，希望可以帮到你。

输出的效果如下：

```
+---------+---------+---------+----------+----------+----------+----------+
| 0.0 : 5 | nil     | nil     | nil      | nil      | nil      | 36.0 : 0 |
| 0.0 : 5 | nil     | nil     | nil      | nil      | nil      | 36.0 : 0 |
| 0.0 : 1 | nil     | 8.0 : 2 | nil      | nil      | 23.0 : 0 | 36.0 : 0 |
| 0.0 : 1 | nil     | 8.0 : 1 | nil      | 19.0 : 0 | 23.0 : 0 | 36.0 : 0 |
| 0.0 : 0 | 3.0 : 0 | 8.0 : 0 | 12.0 : 0 | 19.0 : 0 | 23.0 : 0 | 36.0 : 0 |
| 0.0 : 0 | 3.0 : 0 | 8.0 : 0 | 12.0 : 0 | 19.0 : 0 | 23.0 : 0 | 36.0 : 0 |
+---------+---------+---------+----------+----------+----------+----------+
```
简单解释下：
1. cell 中以 `:` 区隔 score 和 span 两个值 ，所以每列 `:` 前面的值都是一样的
2. 第一列为 header，不代表节点
3. nil 表示不存在该 level


## 总结

回顾一下，本章的几个重点：
1. skiplist 的实现
2. redis 为了实现 rank 对 skiplist 做的改进


---

<a rel="license" href="http://creativecommons.org/licenses/by-nc-nd/4.0/"><img alt="知识共享许可协议" style="border-width:0" src="https://i.creativecommons.org/l/by-nc-nd/4.0/88x31.png" /></a><br />本作品采用<a rel="license" href="http://creativecommons.org/licenses/by-nc-nd/4.0/">知识共享署名-非商业性使用-禁止演绎 4.0 国际许可协议</a>进行许可。


<Vssue/>