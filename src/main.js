// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'
import { sync } from 'vuex-router-sync'
import axios from 'axios'
import { ToastPlugin, LoadingPlugin, WechatPlugin } from 'vux'
import util from './assets/js/util'

Vue.prototype.util = util

Vue.use(ToastPlugin)
Vue.use(LoadingPlugin)
Vue.use(WechatPlugin)

Vue.use(Vuex)

Vue.prototype.showInfo = function (text) {
	this.$vux.toast.show({
		text: text,
		type: 'text',
		time: 2000
	})
}
Vue.prototype.loading = function (type) {
	if (type) {
		this.$vux.loading.show({
			text: '数据加载中'
		})
	} else {
		this.$vux.loading.hide()
	}
} 

Vue.config.productionTip = false

const store = new Vuex.Store({})

store.registerModule('vux', {
  state: {
    demoScrollTop: 0,
    isLoading: false,
    direction: 'forward'
  },
  mutations: {
    updateDemoPosition (state, payload) {
      state.demoScrollTop = payload.top
    },
    updateLoadingStatus (state, payload) {
      state.isLoading = payload.isLoading
    },
    updateDirection (state, payload) {
      state.direction = payload.direction
    }
  },
  actions: {
    updateDemoPosition ({commit}, top) {
      commit({type: 'updateDemoPosition', top: top})
    },
    updateLoadingStatus({commit}, isLoading) {
      commit({type: 'updateLoadingStatus', isLoading: isLoading})
    }
  }
})

Vue.use(store)

sync(store, router)

const history = window.sessionStorage
history.clear()
let historyCount = history.getItem('count') * 1 || 0
history.setItem('/', 0)

router.beforeEach(function (to, from, next) {
	store.commit('updateLoadingStatus', {isLoading: true})

	const toIndex = history.getItem(to.path)
	const fromIndex = history.getItem(from.path)

	if (toIndex) {
    if (!fromIndex || parseInt(toIndex, 10) > parseInt(fromIndex, 10) || (toIndex === '0' && fromIndex === '0')) {
      store.commit('updateDirection', {direction: 'forward'})
    } else {
      store.commit('updateDirection', {direction: 'reverse'})
    }
  } else {
    ++historyCount
    history.setItem('count', historyCount)
    to.path !== '/' && history.setItem(to.path, historyCount)
    store.commit('updateDirection', {direction: 'forward'})
  }

	if (/\/http/.test(to.path)) {
    let url = to.path.split('http')[1]
    window.location.href = `http${url}`
  } else {
    next()
  }
})

router.afterEach(function (to) {
	store.commit('updateLoadingStatus', {isLoading: false})
})

/*
  微信分享
 */
// import wx from 'weixin-js-sdk'

// wx.ready(() => {
//   console.log('wechat ready')
//   wx.onMenuShareAppMessage({
//     title: '普高会体育',
//     desc: '普高会简介',
//     link: '',
//     imgUrl: 'http://s1.wego168.com/imgApp/upload/wx7d3c9e2d28015f9c/20170710/943b7687e1fd4fddb2ea21d785ffef40.jpg'
//   })

//   wx.onMenuShareTimeline({
//     title: '普高会体育',
//     desc: '普高会简介',
//     link: '',
//     imgUrl: 'http://s1.wego168.com/imgApp/upload/wx7d3c9e2d28015f9c/20170710/943b7687e1fd4fddb2ea21d785ffef40.jpg'
//   })
// })

// const permissions = JSON.stringify(['onMenuShareAppMessage', 'onMenuShareTimeline'])
// const url = document.location.href
// axios.post('https://vux.li/jssdk?url=' + encodeURIComponent(url.split('#')[0]) + '&jsApiList=' + permissions).then(res => {
//     wx.config(res.data.data)
//   })

/* eslint-disable no-new */
// new Vue({
//   el: '#app',
//   store,
//   router,
//   template: '<App/>',
//   components: { App }
// })

const FastClick = require('fastclick')
FastClick.attach(document.body)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
