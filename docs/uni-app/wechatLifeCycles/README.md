## 小程序的生命周期
>小程序的生命周期分为以下几种，
>启动周期：onLaunch--->onShow--->onHide
>其他周期： onError,onPageNotFounds
1. onLaunch
它是由网络首次请求微信小程序包，待手机下载完毕之后，便触发该生命周期。

2. onShow
它是当逻辑层初始化完毕之后，进入前台之后，触发该生命周期。

3. onHide
它是当小程序切换到后台，触发的声明周期。

##### 用法如下：
```
App({
  onError(error) {
    console.log(error);
  }
});
```
1. ##### onError
它是当小程序发生错误时，会触发此生命周期。
传入的是一个<em>`callback`</em>，可以监听小程序的所有错误。

2. ##### onPageNotFounds
它和<em>`wx.onPageNotFound`</em>的行为是一致的，是指当路由未找到页面时，会触发此生命周期。
```
App({
  onPageNotFound(notFound) {
    wx.redirectTo({
      url: 'pages/..'
    });
  }
});
```
