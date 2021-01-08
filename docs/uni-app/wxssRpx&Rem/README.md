#### rpx
rpx是微信独有的一套单位，可以进行宽度和高度自适应，他叫做响应式像素。例如手机是iPhon 6型号，那么它的手机宽度是 375 个像素。换算成rpx就是750rpx，而且所有的手机尺寸都是由750为基准进行换算的。

#### rem
这个单位是根的font-size大小变化而变化的一种单位。常见的开发可以手动设置html的字体大小，也可以动态地设置html的字体大小。
通常情况下，浏览器的默认字体font-size是16px，那么1rem=16rem
我们先试试不设置任何"根"尺寸，对比看看：
```
<div class="default-rem-unit">Hello World</div>
<div class="default-px-unit">Hello World</div>
<!-- 样式 -->
<style>
  .default-rem-unit {
    font-size: 1rem;
  }
  .default-px-unit {
    font-size: 16px;
  }
</style>
```
打开后，你会发现字体大小是一样的：

<img :src="$withBase('/rem-16')" alt="rem默认是16px">

这也说明了1rem的默认大小是16px。

现在，我们来改造一下它，让它变成1rem=20px。只需要添加如下代码就可以了：
```
html {
  font-size: 20px !important;
}
```
此时，上面的Hello World，很明显变大了：

<img :src="$withBase('/rem-20')" alt="rem变为20px">

### 通常，为了兼容各种移动端的不同屏幕尺寸。开发者会兼容性的CSS，下面两种写法会让开发者采用：

#### 1. 使用css3的calc来计算html
```
html {
  /* iPhone 6标准尺寸 */
  font-size: calc(100vw / 3.75);
}
```
#### 2. 引入lib-flexible库 [gitHub地址](https://github.com/amfe/lib-flexible)
至于移动端的适配，不在此文的讨论范围内。