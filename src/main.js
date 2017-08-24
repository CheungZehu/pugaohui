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
		time: 500
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

// const store = new Vuex.Store({})

const store = new Vuex.Store({
  state: {
    demoScrollTop: 0,
    isLoading: false,
    direction: 'forward',
    isScroll: false,
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
    },
    updateisScroll (state, payload) {
      state.isScroll = payload.isScroll
    }
  },
  actions: {
    updateDemoPosition ({commit}, top) {
      commit({type: 'updateDemoPosition', top: top})
    },
    updateLoadingStatus({commit}, isLoading) {
      commit({type: 'updateLoadingStatus', isLoading: isLoading})
    },
    updateisScroll ({commit}, isScroll) {
      commit({type: 'updateisScroll', isScroll: isScroll})
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
  // console.log(/SendComment/.test(from.path))
  // console.log(/ActivityDetail/.test(to.path) && /SendComment/.test(from.path)) 
  if (/ActivityDetail/.test(to.path) && /SendComment/.test(from.path)) {
    store.commit('updateisScroll', {isScroll: true})
  } else {
    store.commit('updateisScroll', {isScroll: false})
  }
  setTimeout(() => {
    next()
  }, 500)
  
	// const toIndex = history.getItem(to.path)
	// const fromIndex = history.getItem(from.path)

	// if (toIndex) {
 //    if (!fromIndex || parseInt(toIndex, 10) > parseInt(fromIndex, 10) || (toIndex === '0' && fromIndex === '0')) {
 //      store.commit('updateDirection', {direction: 'forward'})
 //    } else {
 //      store.commit('updateDirection', {direction: 'reverse'})
 //    }
 //  } else {
 //    ++historyCount
 //    history.setItem('count', historyCount)
 //    to.path !== '/' && history.setItem(to.path, historyCount)
 //    store.commit('updateDirection', {direction: 'forward'})
 //  }

	// if (/\/http/.test(to.path)) {
 //    let url = to.path.split('http')[1]
 //    window.location.href = `http${url}`
 //  } else {
 //    next()
 //  }
})

router.afterEach(function (to) {
	store.commit('updateLoadingStatus', {isLoading: false})
})

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
