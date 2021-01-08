>当我们在开发过程中，如果上一个数据修改了，那么最上层的数据也需要改变。最常见的业务就是地址的填写，然后支付订单。
>为了解决这个问题，我们封装一个获取和设置上一个页面和下一页面的数据。这样就可以很好地使用了。
```
const getSetFn = page => {
  return {
    setData(data) {
      page.setData(data);
      return this;
    },
    getData: () => page.data
  };
};
/**
 *
 * @param {array} pages 页面传入的值
 */
export const pages = pages => {
  const currentPage = pages[pages.length - 1];
  const prevPage = pages[pages.length - 2];
  return {
    prev: () => getSetFn(prevPage),
    crrent: () => getSetFn(currentPage)
  };
};
```
然后在页面中这样使用就可以设置上一页的数据了

```
const getPage = getCurrentPage();
page(getPage)
  .prev()
  .setPage({ title: 1 });
```