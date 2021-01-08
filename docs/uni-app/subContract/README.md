## 分包

#### 1. 分包
分包无法require和import其他包的JS文件，以及template。

分包无法引用其他包的资源文件。

例如:
```
{
  "subPackages": [
    {
      "root": "PageA", // 分包的根路径
      "pages": ["log/log"] // 分包的子路径文件
    }
  ]
}
```
如何跳转?
```
uni.navigateTo({
  url: '/PageA/log/log' // 分包加载需要写全路径
});
```

#### 2. 独立分包
一种特殊的分包，可以独立于主包与其他分包运行。分包依赖于主包，而独立分包却`不依赖其他包`
独立分包有很多种:

1. 添加independent字段就可以直接成为主包
```
{
  "subPackages": [
    {
      "root": "PageA", // 分包的根路径
      "pages": ["log/log"] // 分包的子路径文件
    }
  ],
  "independent": true // 独立分包，
}
```
>因为它可以不从主包中启动，所以无法获得App，因此添加allowDefault这个参数就可以在App启动后，可以重新覆盖到真正的App中

2. 预下载包
```
{
  "preloadRule": {
    "pages/index/about": {
      // 这里必须是在是pages里配置好的
      "network": "all",
      "packages": ["__APP__"] // 所有的包
    }
  }
}
```

