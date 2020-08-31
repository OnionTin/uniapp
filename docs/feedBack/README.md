## 及时反馈

#### 1. 同时合并数据的更新
由于小程序的特殊机制，它将视图层和逻辑层隔绝成了两个的进程。

它们两个之间通信是异步的，同时，改变的视图层的数据（同步）。

从setData这个API就可以看出来，它是`异步`的。

如：
```
this.setData({}, res => {
  // 这是异步的
});
```
所以，使用setData更新数据会通知逻辑层，造成一次进程通信，等通信完毕之后，再更新视图层的数据。

多条通信会对手机资源吃紧，也会造成小程序变慢。

可以使用数据合并的方式，让它变成一次通信，从而减少卡顿。

避免一下的情况：
```
this.setData({
  data: {
    a: 1
  }
});
```
你可以将他合并成：
```
this.setData({
  'data.a': 1
});
```
这样就完成了局部的更新了.

或者，写成另一种写法：
```
const updateProp = 'data.a';
this.setData({
  [updateProp]: 1
});
```

#### 2. 避免频繁的更新
在onScroll生命周期中，谨慎更新数据。如果更新数据的话，可以使用`防抖`、或者是`节流`。

防抖(在短时间内触发一次函数):
```
const debounce = function(fn, time) {
  const context = this;
  const args = arguments;
  return function() {
    setTimeout(function() {
      fn.apply(context, args);
    }, time);
  };
};
```
节流(在指定的时间内执行一次):
```
const throttle = function(fn, time) {
  const prev = Date.now();
  const context = this;
  const args = arguments;
  return function() {
    let now = Date.now();
    if (now - prev === time) {
      fn.apply(context, args);
      prev = Date.now();
    }
  };
};
```

#### 3. 使用intersectionObserver代替selectQuery
selectQuery是查询节点信息的对象，它也需要跟逻辑层通信，所以它一定程度上会让小程序“变慢”。
而inersectionObserver是以观察节点的交互情况，并不存在通信的情况。

使用方法如下：
```
uni
  .createIntersectionObserver(this)
  .relativeToViewport()
  .observe('.header', res => {
    console.log('--->', res);
  });
```
其中relativeToViewport是相对于视窗观察的选项。

#### 4. 全局状态
在小程序中，如果你需要在每一个页面中添加使用共有的数据，那么有三种方式能够完美解决。

##### 1. Vue.prototype
如果项目中需要用到一个全局数据或者全局函数的话，那使用Vue.prototype是一个不错的选择。
它的作用是可以挂载到Vue的所有实例上，供所有的页面使用。

用法如下：
```
// main.js
Vue.prototype.$globalVar = 'Hello';
```
然后在pages/index/index中使用：
```
<template>
  <view>{{useGlobalVar}}</view>
</tempalte>
<script>
export default {
  data (){
    return {
      useGlobalVar:$globalVar
    }
  }
}
</script>
```
因为，uni-app的目前能力无法映射到view上，只能够这样写。

##### 2. globalData
```
<!-- App.vue -->
<script>
    export default {
      globalData:{
          data:1
      }
      onShow() {
       // 使用
      getApp().globalData.data;
      // 更新
      getApp().globalData.data = 1;
    }
  };
</script>
```

##### 3. Vuex
Vuex是Vue专用的状态管理模式。他能够集中管理其数据，并且可观测其数据变化，以及流动。

安装如下：
```
// store/index.js
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    counter: 0
  },
  mutaions: {
    addCounter(state) {
      state.counter++;
    }
  }
});
```
```
// main.js
import Vue from 'vue';
import store from './store';

Vue.config.productionTip = false;

App.mpType = 'app';

const app = new Vue({
  store,
  ...App
});
app.$mount();
```
使用&注入到页面中
```
<template>
  <view>{{ counter }}</view>
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState({
      counter: state => state.counter
    })
  }
};
</script>
```



