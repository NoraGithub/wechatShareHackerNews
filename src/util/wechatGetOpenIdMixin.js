import {NODE_URL,wechatConfig} from '../../const'
import Vue from 'vue'
import lodash from 'lodash'

const wechatGetOpenIdMixin = (store, router) => {
  // wechat 默认获取 openid
  return (to, from, next) => {
    // beforeCreate 钩子无法访问 computed 属性
    let redirectTo = lodash.cloneDeep(to)
    if (!store.state.openid && to.name !== 'view-wechat-redirect') {
      let STATE = 'STATE'
      let scope = 'snsapi_userinfo' //用户授权
      let redirect_uri = NODE_URL + router.resolve(
        {
          name:'view-wechat-redirect',
          query:{
            redirect: router.resolve(redirectTo).route.fullPath
          }
        }).route.fullPath
      // 模仿 this.redirectURL
      let redirectURL = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${wechatConfig.appid}&redirect_uri=${encodeURIComponent(redirect_uri)}&response_type=code&scope=${scope}&state=${STATE}#wechat_redirect`
      if (typeof window !== 'undefined') {
        // 不继续渲染页面
        window.location.href =redirectURL
        next(false)
      }else {
        let redirectError = new Error()
        redirectError.redirect = {
          statusCode: 302,
          url: redirectURL
        }
        next(redirectError)
      }
    }
    next()
  }
}

export default wechatGetOpenIdMixin
