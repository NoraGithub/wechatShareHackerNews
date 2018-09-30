<template>
  <div id="app">
    <header class="header">
      <nav class="inner">
        <router-link to="/" exact>
          <img class="logo" src="~public/logo-48.png" alt="logo">
        </router-link>
        <router-link to="/top">Top</router-link>
        <router-link to="/new">New</router-link>
        <router-link to="/show">Show</router-link>
        <router-link to="/ask">Ask</router-link>
        <router-link to="/job">Jobs</router-link>
        <a class="github" href="https://github.com/vuejs/vue-hackernews-2.0" target="_blank" rel="noopener">
          Built with Vue.js
        </a>
      </nav>
    </header>
    <transition name="fade" mode="out-in">
      <router-view class="view"></router-view>
    </transition>
  </div>
</template>
<script>
import {wechatConfig, NODE_URL} from '../const'
import axios from 'axios'

export default {
  methods: {
    setWechatConfig (newVal) {
      // 自定义“分享给朋友”及“分享到QQ”按钮的分享内容
      alert(`当前设置的分享URL为${newVal.link}`)
      wx.onMenuShareAppMessage({
        title: newVal.title, // 分享标题
        desc: newVal.desc, // 分享描述
        link: newVal.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        imgUrl: newVal.img, // 分享图标
        type: 'link',
        dataUrl: '',
      })
      // 自定义“分享到朋友圈”及“分享到QQ空间”按钮的分享内容
      wx.onMenuShareTimeline({
        title: newVal.title, // 分享标题
        link: newVal.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        imgUrl: newVal.img, // 分享图标
      })
    },
    loadScript(src, callback) {
      if (!(typeof callback === 'function')) {
        callback = function() {}
      }
      var check = document.querySelectorAll(`script[src="${src}"]`)
      if (check.length > 0) {
        check[0].addEventListener('load', function() {
          callback()
        })
        callback()
        return
      }
      var script = document.createElement('script')
      var head = document.getElementsByTagName('head')[0]
      script.type = 'text/javascript'
      script.charset = 'UTF-8'
      script.src = src
      if (script.addEventListener) {
        script.addEventListener('load', function() {
          callback()
        }, false)
      } else if (script.attachEvent) {
        script.attachEvent('onreadystatechange', function() {
          var target = window.event.srcElement
          if (target.readyState === 'loaded') {
            callback()
          }
        })
      }
      head.appendChild(script)
    }
  },
  mounted() {
    this.loadScript('http://res.wx.qq.com/open/js/jweixin-1.4.0.js', () => {
      let url = `${NODE_URL}${this.$route.fullPath}`
      axios({
        method: 'post',
        url:'http://test.m.datahub.net.cn/wechat-test',
        data: {
          'url': url
        }
      }).then(res => {
          wx.config({
            debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: wechatConfig.appid, // 必填，公众号的唯一标识
            timestamp: res.data.timestamp, // 必填，生成签名的时间戳
            nonceStr: res.data.noncestr, // 必填，生成签名的随机串
            signature: res.data.signature,// 必填，签名
            jsApiList: ['updateAppMessageShareData', 'updateTimelineShareData','onMenuShareTimeline', 'onMenuShareAppMessage'] // 必填，需要使用的JS接口列表
          })
          wx.ready(()=>{
            this.setWechatConfig({
              title:'test',
              desc: 'xxxx',
              img:'',
              img_title:'test',
              link:`${NODE_URL}${this.$route.fullPath}`,
            })
          })
        })
      })
  }
}
</script>
<style lang="stylus">
body
  font-family -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
  font-size 15px
  background-color lighten(#eceef1, 30%)
  margin 0
  padding-top 55px
  color #34495e
  overflow-y scroll

a
  color #34495e
  text-decoration none

.header
  background-color #ff6600
  position fixed
  z-index 999
  height 55px
  top 0
  left 0
  right 0
  .inner
    max-width 800px
    box-sizing border-box
    margin 0px auto
    padding 15px 5px
  a
    color rgba(255, 255, 255, .8)
    line-height 24px
    transition color .15s ease
    display inline-block
    vertical-align middle
    font-weight 300
    letter-spacing .075em
    margin-right 1.8em
    &:hover
      color #fff
    &.router-link-active
      color #fff
      font-weight 400
    &:nth-child(6)
      margin-right 0
  .github
    color #fff
    font-size .9em
    margin 0
    float right

.logo
  width 24px
  margin-right 10px
  display inline-block
  vertical-align middle

.view
  max-width 800px
  margin 0 auto
  position relative

.fade-enter-active, .fade-leave-active
  transition all .2s ease

.fade-enter, .fade-leave-active
  opacity 0

@media (max-width 860px)
  .header .inner
    padding 15px 30px

@media (max-width 600px)
  .header
    .inner
      padding 15px
    a
      margin-right 1em
    .github
      display none
</style>
