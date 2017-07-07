import Vue from 'vue'
import Router from 'vue-router'
// import Hello from '@/components/Hello'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/index',
      name: 'Home',
      component: resolve => require(['@/components/index'], resolve),
      children: [
      	{ path: '/index', component: resolve => require(['@/components/Index/index'], resolve) },
        { path: '/index/Coach', component: resolve => require(['@/components/Index/Coach'], resolve) },
        { path: '/index/CoachDetail/:id', name: 'CoachDetail', component: resolve => require(['@/components/Index/CoachDetail'], resolve) },

      	{ path: '/activity', component: resolve => require(['@/components/Activity/index'], resolve) },
        { path: '/activity/NewsDetail/:id', name: 'NewsDetail', component: resolve => require(['@/components/Activity/NewDetail'], resolve) },
        { path: '/activity/ActivityList', component: resolve => require(['@/components/Activity/ActivityList'], resolve) },
        { path: '/activity/ActivityDetail/:id', name: 'ActivityDetail', component: resolve => require(['@/components/Activity/ActivityDetail'], resolve) },
        
        
        { path: '/cooperation', component: resolve => require(['@/components/Cooperation/index'], resolve) },
      	{ path: '/cooperation/CooperationDetail/:id', name: 'CooperationDetail', component: resolve => require(['@/components/Cooperation/CooperationDetail'], resolve) },

        { path: '/my', component: resolve => require(['@/components/My/index'], resolve) },
        { path: '/my/Participate', component: resolve => require(['@/components/My/Participate'], resolve) },
        { path: '/my/ModifyInfo', component: resolve => require(['@/components/My/ModifyInfo'], resolve) },
      	{ path: '/my/CompleteInfo', component: resolve => require(['@/components/My/CompleteInfo'], resolve) },
      ]
    },
    { path: '/activity/CompletePay', component: resolve => require(['@/components/Activity/CompletePay'], resolve) },
    { path: '/activity/SignSuccess', component: resolve => require(['@/components/Activity/SignSuccess'], resolve) },
    { path: '/activity/PhoneSign', component: resolve => require(['@/components/Activity/PhoneSign'], resolve) },
    { path: '/activity/ActivityPay', component: resolve => require(['@/components/Activity/ActivityPay'], resolve) },

    { path: '/login', component: resolve => require(['@/components/Login/Login'], resolve) },
    { path: '/register', component: resolve => require(['@/components/Login/Register'], resolve) },
  ]
})
