// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import { ToastPlugin, LoadingPlugin } from 'vux'

Vue.use(ToastPlugin)
Vue.use(LoadingPlugin)

router.beforeEach((to, from, next) => {
	if (to.path == '/my') {
		console.log(123)
		// next('/login')
	}
	next()
})


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



/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
// new Vue({
//   router,
//   render: h => h(App)
// }).$mount('#app')
