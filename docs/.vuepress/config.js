module.exports = {
    title: '📚 sidergo 系列教程',
    base: '/sidergo-posts/',
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
                text: 'JayChen\'s story',
                items: [
                    { text: 'Github', link: 'https://github.com/chenjiayao' },
                ]
            }
        ],
        subSidebar: 'auto',
        sidebar: [
            { title: "开篇说明", path: "/posts/chapter-1" },
            { title: "一切开始于网络编程", path: "/posts/chapter-2" },
        ]
    },
    locales: {
        '/': {
            lang: 'zh-CN'
        }
    },
    theme: 'reco'
}