# HTTP拦截器
参考：[从源码分析Axios](https://juejin.im/post/6844904101738708999)

## API 解析
>在Axios中，可以使用多种方法请求数据，这让Axios变得及其简单易用。
>它既可以传字符串进 axios 中，也可以使用对象传入。
#### 使用 Axios 请求
```
axios({
  url: 'localhost:3000',
  data: {
    firstName: 1,
    lastName: 2
  }
}).then(res => {
  console.log(res);
});

// 这是使用字符串的请求方式

axios('localhost:3000').then(res => {
  console.log(res);
});

```
#### 使用 HTTP 的请求方法
```
axios.get('localhost:3000').then(res => {
  console.log(res);
});

```
两种使用方法都可以使Axios正常运行，而它用的是实例化对象，然后修改上下文的方法，可以让它正常运转。
## 创建 Axios 对象
在axios的入口文件处，axios用到了许多方法，包括实例的绑定，以及属性和方法的继承
#### 绑定函数
```
function bind(fn, thisArg) {
  // 闭包函数，返回已经修改好的作用域
  return function wrap() {
    var args = new Array(arguments.length);

    for (var i = 0; i < args.length; i++) {
      // 将参数拷贝到args上
      args[i] = arguments[i];
    }
    // 执行一次函数
    return fn.apply(thisArg, args);
  };
}
```
#### 继承属性
```
function extend(a, b, thisArg) {
  forEach(b, function assignValue(val, key) {
    if (thisArg && typeof val === 'function') {
      a[key] = bind(val, thisArg);
    } else {
      a[key] = val;
    }
  });
  return a;
}
```
#### 实例化 Axios
```new __Axios__  {
    constructor(config) {
        this.config = config;
    }
    request(config = this.config){
        return config ? config : 'config'
    }
}

// 实例化对象
const context = new __Axios__();

// 使用bind方法将原型链上的`request`指向是__Axios__上下文

const instance =  bind(__Axios__.prototype.request,context);

// 将Axios的所有方法合并instance上去
extend(instance,Axios.prototype,context);
// 将Axios的所有属性都合并到instance上去
extend(instance,context);
```
这样，Axios既可以用get,post等方法获取数据，又能使用Axios()获取数据
## 拦截器
首先，写一个拦截管理器的类
```
class InterceptorManager {
  constructor() {
    this.handlers = [];
  }
  // 接收拦截或请求的方法
  use(fulfilled, rejected) {
    this.handlers.push({ fulfilled, rejected });
  }
  // 清除掉接收或请求的方法
  reject(id) {
    this.handlers[id] && this.handlers[id] = null;
  }
  // 将所有拦截器遍历一次
  forEach(fn) {
    this.handlers.forEach(item => {
      item && fn(item);
    });
  }
}
```
#### 实例化拦截器
接着，我们将拦截器实例化，类似下面的样子：
```
class Axios {
  constructor() {
    this.interceptor = {
      request: new InterceptorManager(),
      response: new InterceptorManager()
    };
  }
}
```
#### 合成拦截器链
既然有了拦截器，那么我们可以直接地发送请求了

>思路是：
>1. ResquestInterceptorFulfilled ---> ResquestInterceptorReject // 请求拦截器链
>2. dispatchRequest ----> undefined // 分发请求
>3. ResponseInterceptorFulfilled ---> ResponseInterceptorReject // 响应拦截器链
```
class Axios {
  constructor() {
    this.interceptor = {
      request: new InterceptorManager(),
      response: new InterceptorManager()
    };
  }
  request() {
    // dispatchRequest是指，分发的请求
    const china = [dispathRequest, undefined];
    const promise = Promise.resolve(config);

    // 将请求拦截器推入链中
    this.interceptor.request.forEach(interceptor => {
      china.unshift(interceptor.fulfilled, interceptor.rejected);
    });
    // 将相应拦截器推入链中
    this.interceptor.response.forEach(interceptor => {
      china.push(interceptor.fulfilled, interceptor.rejected);
    });

    while (china.length) {
      // 逐个遍历，然后执行
      promise = promise.then(chain.shift(), chain.shift());
    }
    return promise;
  }
}
```

