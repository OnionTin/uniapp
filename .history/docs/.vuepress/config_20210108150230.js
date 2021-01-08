module.exports = {
  title: 'uniapp爬坑总结',
  description: '来自掘金:https://juejin.im/post/6844904103345127438#heading-8',
  head: [ // 注入到当前页面的 HTML <head> 中的标签
    [ 'link',
      { rel: 'icon', href: '/logo.jpg' } // 增加一个自定义的 favicon(网页标签的图标)
    ]
  ],
  base: '/', // 这是部署到github相关的配置
  markdown: {
    lineNumbers: false // 代码块显示行号
  },
  themeConfig: {
    nav:[ // 导航栏配置
      { text: '掘金原文', link: 'https://juejin.im/post/6844904103345127438#heading-8' },
      { text: 'uni-app开发搜索文档', link: 'https://www.kancloud.cn/zengqs1976/uni-app/1176108' },
      { text: 'knobe', link: 'https://wechat-miniprogram.github.io/kbone/docs/' }
    ],
    sidebarDepth: 2, // 侧边栏显示2级
    sidebar: [
      {
        title: 'uni-app篇',
        collapsable: false,
        children: [
          {
            title: '获取数据',
            collapsable: false,
            children: [{
              title: '获取上一页和当前页的数据',
              path: '/uni-app/getLastPageDate/'}
            ]
          },
          // {
          //   title: '获取数据',
          //   collapsable: false,
          //   children: [{
          //     title: '获取上一页和当前页的数据',
          //     path: '/uni-app/getLastPageDate/'}
          //   ]
          // },
          // {
          //   title: 'HTTP请求',
          //   collapsable: false,
          //   children: [{
          //     title: 'Axios拦截',
          //     path: '/httpAxios/'}
          //   ]
          // },
          // {
          //   title: '生命周期',
          //   collapsable: false,
          //   children: [
          //     {
          //       title: '小程序生命周期',
          //       path: '/wechatLifeCycles/'
          //     },
          //     {
          //       title: '页面的生命周期',
          //       path: '/pageLifeCycles/'
          //     }
          //   ]
          // },
          // {
          //   title: '小程序架构',
          //   collapsable: false,
          //   path:'/frameWork/',
          //   children: [
          //     {
          //       title: '视图层',
          //       path: '/viewModule/'
          //     },
          //     {
          //       title: '逻辑层',
          //       path: '/logicModule/'
          //     }
          //   ]
          // },
          // {
          //   title: '小程序启动机制',
          //   collapsable: false,
          //   path:'/startUp/'
          // },
          // {
          //   title: '性能优化',
          //   collapsable: false,
          //   children: [
          //     {
          //       title: '上传代码时自动压缩',
          //       path: '/codeCompress/'
          //     },
          //     {
          //       title: '清理无用代码和资源',
          //       path: '/cleanUseless/'
          //     },
          //     {
          //       title: '使用CDN来分担资源请求',
          //       path: '/useCDN/'
          //     },
          //     {
          //       title: '分包',
          //       path: '/subContract/'
          //     },
          //     {
          //       title: '预请求',
          //       path: '/preRequest/'
          //     },
          //     {
          //       title: '使用骨架屏',
          //       path: '/useSkeletonScreen/'
          //     },
          //     {
          //       title: '及时反馈',
          //       path: '/feedBack/'
          //     }
          //   ]
          // },
          // {
          //   title: '尺寸单位',
          //   collapsable: false,
          //   path:'/startUp/',
          //   children: [
          //     {
          //       title: 'rem&rpx',
          //       path: '/wxssRpx&Rem/'
          //     },
          //     {
          //       title: 'em',
          //       path: '/wxssEm/'
          //     },
          //     {
          //       title: 'vh&vw',
          //       path: '/vh&vw/'
          //     }
          //   ]
          // },
          // {
          //   title: '作者参考文档',
          //   collapsable: false,
          //   path:'/resources/'
          // }
        ]
      }
    ]
  }
}