## 预请求

>在单页面应用中，为了提高应用可视性和性能，让其他页面能够更好展示资源和其他数据。
>于是首页提前加载好资源，以便其他页面可以使用，这种方法叫做预加载。

预加载分为两种：

### 1. App 预加载
App 预加载的思想非常简单，就是进入应用的时候存储一些页面的数据
```
export default {
  globalData: {
    PreLoadData: null
  },
  onShow() {
    const that = this;
    fetch('/preload').then(res => {
      that.PreLoadData = res;
    });
  }
};
```
### 2. 页面预请求

小程序与单页面程序相似，主包下载所有的页面，下载完毕之后，分别推入页面栈。

并不是传统的当`A`页面跳转到`B`页面时，会自动加载`B`页面的资源页面。而真正的加载类似于`webpack`的加载，待进入某一个页面时，会将页面置于顶层。

加载页面方式为：
```
Loading A page.
        |
        |
        |
A page load done ---> Loading A page.
        |
        |
        |
B page load done ---> All pages load complete.
------------------------------------------

Then,render entierty page.
```
因为如此是，那么我们可以在onLoad之前，接收来自上一个页面内容。

由于，uni-app的特殊性，所以我们可以使用`mixin`代码，混入到每一个页面中
```
export default {
  data() {
    return {
      PreLoad: []
    };
  }
};
```
但是它有一个弊端，那就是每次进入页面后，会自动地初始化为一个空数组

首先创建一个存储PreLoad的数组，方便日后的管理
```
const storePreLoda = [];
export default {
  data() {
    return {
      PreLoad: [...PreLoad]
    };
  }
};
```
接着向需要预加载的页面传递数据：
```
const storePreLoad = [];
export default {
  data() {
    return {
      PreLoad: [...PreLoad]
    };
  },
  methods: {
    __put(data, page) {
      const __page = page ? page : '';
      storePreLoad.push({
        page: __page,
        data
      });
    }
  }
};
```
但是这样写有一个弊端，那就是如果一个页面有多个动作的话，需要向页面传递多个数据的话，那么就会出现多page.

所以，我们改造一下：
```
const storePreLoad = [];
const __put = (data, page) => {
  const __page = page ? page : '';
  const hasPage = storePreLoad.some(el => el.page === page);
  if (hasPage) {
    storePreLoad.find(el => el.page === page).data.push(data);
    return data;
  }
  storePreLoad.push({
    page: __page,
    data
  });
  return data;
};
export default {
  data() {
    return {
      PreLoad: [...PreLoad]
    };
  },
  methods: {
    __put
  }
};
```
既然传递了数据，那么获取数据就变得简单许多了
```
const storePreLoad = [];
export default {
  data() {
    return {
      PreLoda: [...storePreLoad]
    };
  },
  methods: {
    getRoute() {
      const pages = getCurrentPages();
      const { route } = pages[pages.length - 1];
      return route;
    },
    __take(isOnce = '', page = '') {
      const getRoute = page !== '' ? page : this.getRoute(); // 找到某一个页面的预处理数据
      const { data } = this.PreLoadData.find(el => el.page === getRoute);
      if (isOnce == 'once') {
        const index = this.PreLoadData.findIndex(el => el.page === getRoute);
        this.PreLoadData.splice(index, 1);
      }
      return isObject(data) ? Object.freeze(data) : data;
    }
  }
};
```
上面的`__take`方法有两个参数，分别是：

once:只拉取一次预加载数据，然后删除数据。

page:找到某一个页面，然后返回某一个注册了预加载页面的数据。