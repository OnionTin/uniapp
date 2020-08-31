## em

em，一种相对长度单位，继承于父级元素的字体大小，和rem一样的默认px单位，是16px。

一个小例子：
```
<div class="default-em-unit">Hello World</div>
<div class="default-px-unit">Hello World</div>
<!-- 样式 -->
<style>
  .default-rem-unit {
    font-size: 1em;
  }
  .default-px-unit {
    font-size: 16px;
  }
</style>
```
<img :src="$withBase('/em-16')" alt="em默认是16px">
可见，em的默认大小也是16px。

如果要改某一个元素的字体大小，只需要修改父元素的大小，即可改变子元素的大小：
```
<!-- 父元素 -->
<div class="root-em">
  <div class="default-rem-unit">Hello World</div>
  <div class="default-px-unit">Hello World</div>
</div>

<style>
  .em-root {
    font-size: 20px;
  }
  .default-rem-unit {
    font-size: 1em;
  }
  .default-px-unit {
    font-size: 16px;
  }
</style>
```
<img :src="$withBase('/em-16')" alt="em变为20px">