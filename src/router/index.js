import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// route-level code splitting
const createListView = id => () => import('../views/CreateListView').then(m => m.default(id))
const ItemView = () => import('../views/ItemView.vue')
const UserView = () => import('../views/UserView.vue')
const wechatRedirect = () => import('../views/view-wechat-redirect.vue')
const wechatTest = () => import('../views/view-wechat-test.vue')


export function createRouter () {
  return new Router({
    mode: 'history',
    fallback: false,
    scrollBehavior: () => ({ y: 0 }),
    routes: [
      { path: '/top/:page(\\d+)?', component: createListView('top') },
      { path: '/new/:page(\\d+)?', component: createListView('new') },
      { path: '/show/:page(\\d+)?', component: createListView('show') },
      { path: '/ask/:page(\\d+)?', component: createListView('ask') },
      { path: '/job/:page(\\d+)?', component: createListView('job') },
      { path: '/item/:id(\\d+)', component: ItemView },
      { path: '/user/:id', component: UserView },
      { path: '/', redirect: '/top' },
      // 跳转路由，用来获取openid
      { path: '/wechat-redirect', name:'view-wechat-redirect', component:wechatRedirect  },
      // test 路由
      { path: '/wechat-test', name:'view-wechat-test', component:wechatTest  }
    ]
  })
}
