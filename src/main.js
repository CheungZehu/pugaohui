// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'
import { sync } from 'vuex-router-sync'
import axios from 'axios'
import { ToastPlugin, LoadingPlugin } from 'vux'

Vue.use(ToastPlugin)
Vue.use(LoadingPlugin)

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
		demoScrollTop: 100,
		direction: 'forward',
		isLoading: false
	},
	mutations: {
		updateDemoPosition (state, payload) {
			state.demoScrollTop = payload.top
		},
		updateDirection (state, payload) {
			state.direction = payload.direction
		},
		updateLoadingStatus (state, payload) {
			state.isLoading = payload.isLoading
		}
	},
	actions: {
		updateDemoPosition ({commit}, top) {
			commit({type: 'updateDemoPosition', top: top})
		},
		updateLoadingStatus ({commit}, status) {
			commit({type: 'updateLoadingStatus', status: status})
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

/* eslint-disable no-new */
// new Vue({
//   el: '#app',
//   store,
//   router,
//   template: '<App/>',
//   components: { App }
// })
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
