<template></template>

<script>
import axios from 'axios'
import {NODE_URL,wechatConfig} from '../../const'
export default {
  name: 'view-wechat-redirect',
  asyncData({store, route, context}) {
    if (typeof window === 'undefined') {
      // 只在服务端执行
      // 微信回调地址query的参数
      let code = route.query.code
      // 请求openid
      // https://ssr.vuejs.org/zh/guide/head.html
      // 从context上下文获取
      // 由于客户端不使用，所以不使用vuex
      const { wechatConfig } = context
      return axios({
        method: 'get',
        url:'https://api.weixin.qq.com/sns/oauth2/access_token',
        params: {
          appid: wechatConfig.appid,
          secret: wechatConfig.partnerKey,
          code,
          grant_type: 'authorization_code',
        }
      }).then((resAccessToken)=> {
        let openid = resAccessToken.data.openid
        let access_token = resAccessToken.data.access_token

        store.commit('SET_OPENID', openid)
      })
    }
  },

  mounted () {
    // 只在客户端执行
    // 获取用户失败返回'/'
    let redirect = decodeURIComponent(this.$route.query.redirect)
    this.$store.commit('SET_REDIRECT_URL', redirect)
    this.$router.replace({ path: redirect })
  },
}
</script>
