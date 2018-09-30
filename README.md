本项目基于 [vue-hackernews-2.0](https://github.com/vuejs/vue-hackernews-2.0) 进行修改，测试微信js-sdk分享出现的问题。



访问 `/wechat-test` 路由，跳转`/wechat-redirect`后，重新redirect回`/wechat-test`。


第一次跳转的目的是为了获取openid。

回到`/wechat-test`设置分享URL为当前路由。
**但实际上设置后，分享后路由为`/wechat-redirect`。**


使用前需要修改`const.js`为对应的正确参数。目前本项目可以直接访问 'http://test.m.datahub.net.cn/wechat-test' 查看。