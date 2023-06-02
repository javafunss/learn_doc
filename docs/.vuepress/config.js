// docs/.vuepress/config.js
module.exports = {
    title: "LIP",
    description: "个人学习总结文档",
    base: '/learn_doc/',
    markdown: {
        lineNumbers: true,
    },
    theme: 'reco',
    themeConfig: {
        // 假定 GitHub。也可以是一个完整的 GitLab 网址
        repo: 'vuejs/vuepress',
        
        // 可选，默认为 master
        docsBranch: 'main',
        // 默认为 true，设置为 false 来禁用
        editLinks: true,
        nav: [
            { text: '首页', link: '/' },
            {
                text: 'javafunss博客',
                items: [
                    { text: 'Github', link: 'https://github.com/javafunss' },
                    { text: '掘金', link: 'https://juejin.cn/user/3397935183443671/posts' }
                ]
            }
        ],

        sidebar: [
            {
                title: '工具安装配置',
                collapsable: false,
                children: [
                    ['/docker', 'docker'],
                    
                ]
            },
            {
                title: '后端',
                collapsable: false,
                children: [
                    ['/网络编程', '网络编程'],
                    ['/flink','flink']
                ]
            }

            
            
        ] 
    },
};