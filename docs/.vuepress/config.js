module.exports = {
  title: '📚 sidergo 系列教程',
    base: '/sidergo-posts/',
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
        sidebar:[
              { title: "开篇说明", path: "/posts/chapter-1" },
              { title: "一切开始于网络编程", path: "/posts/chapter-2" },
        ]
    },
    locales: {
        '/': {
            lang: 'zh-CN'
        }
    },
    theme:'reco'
}