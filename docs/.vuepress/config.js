module.exports = {
    title: '📚 sidergo 系列教程',
    base: '/',
    markdown: {
        lineNumbers: true, // 该行与本文无关，用以使代码行增加行号
        extendMarkdown: md => {
            // 使用更多的 markdown-it 插件!
            md.use(require('markdown-it-task-lists'))
        }
    },
    plugins: {
        '@vssue/vuepress-plugin-vssue': {
            type: "vssue",
            // 设置 `platform` 而不是 `api`
            platform: "github",
            autoCreateIssue: true,//自动创建评论
            // 其他的 Vssue 配置
            owner: "chenjiayao",
            repo: "sidergo-posts",
            clientId: "d5dfd16c4b027f346fc5",
            clientSecret: "39633947cdcd03cdbfe6fcad142a0fc1cb9d8b49",
        },
    },
    themeConfig: {
        nav: [
            { text: '首页', link: '/' },
            {
                text: 'JayChen\'s story', link: 'https://blog.jaychen.fun'
            },
            {
                text: 'Github', link: 'https://github.com/chenjiayao'
            }
        ],
        subSidebar: 'auto',
        sidebar: [
            { title: "首页", path: "/" },
            { title: "一切开始于网络编程", path: "/posts/chapter-1" },
            { title: "Redis 通信协议", path: "/posts/chapter-2" },
            { title: "sidergo 整体结构设计", path: "/posts/chapter-3" },
            { title: "skiplist 实现", path: "/posts/chapter-4" },
            { title: "AOF 实现", path: "/posts/chapter-5" },
        ]
    },
    locales: {
        '/': {
            lang: 'zh-CN'
        }
    },
    theme: 'reco'
}