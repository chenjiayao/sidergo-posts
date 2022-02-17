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
              { title: "开篇", path: "/posts/chapter-1" },
        ]
    },
    locales: {
        '/': {
            lang: 'zh-CN'
        }
    },
    theme:'reco'
}