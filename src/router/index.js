import Vue from 'vue'
import Router from 'vue-router'
// import Home from '@/App'

Vue.use(Router)

export default new Router({
  // history: true,
  routes: [
    {
      path: '/',
      redirect: '/index',
      name: 'Home',
      component: resolve => require(['@/components/index'], resolve),
      children: [
        { path: '/index', component: resolve => require(['@/components/Index/index'], resolve) },
        { path: '/index/News', component: resolve => require(['@/components/Activity/index'], resolve) },
        // { path: '/index/NewsDetail/:id', name: 'NewsDetail', component: resolve => require(['@/components/Activity/NewDetail'], resolve) },
        { path: '/index/Coach', component: resolve => require(['@/components/Index/Coach'], resolve) },
        // { path: '/index/CoachDetail/:id', name: 'CoachDetail', component: resolve => require(['@/components/Index/CoachDetail'], resolve) },
        { path: '/index/IntroductionList', component: resolve => require(['@/components/Index/IntroductionList'], resolve) },

        { path: '/activity', component: resolve => require(['@/components/Activity/ActivityList'], resolve) },
        // { path: '/activity/NewsDetail/:id', name: 'NewsDetail', component: resolve => require(['@/components/Activity/NewDetail'], resolve) },
        { path: '/activity/ActivityList', component: resolve => require(['@/components/Activity/ActivityList'], resolve) },
        
        { path: '/cooperation', component: resolve => require(['@/components/Cooperation/index'], resolve) },
        // { path: '/cooperation/CooperationDetail/:id', name: 'CooperationDetail', component: resolve => require(['@/components/Cooperation/CooperationDetail'], resolve) },

        { path: '/myInfo', component: resolve => require(['@/components/My/index'], resolve) },
        { path: '/my/Participate/', component: resolve => require(['@/components/My/Participate'], resolve) },
        { path: '/my/ModifyInfo', component: resolve => require(['@/components/My/ModifyInfo'], resolve) },
        { path: '/my/CompleteInfo', component: resolve => require(['@/components/My/CompleteInfo'], resolve) },
      ]
    },
    // { path: '/cooperation', component: resolve => require(['@/components/Cooperation/index'], resolve) },
    { path: '/activity/CompletePay', component: resolve => require(['@/components/Activity/CompletePay'], resolve) },
    { path: '/activity/SignSuccess', component: resolve => require(['@/components/Activity/SignSuccess'], resolve) },
    { path: '/activity/PhoneSign', component: resolve => require(['@/components/Activity/PhoneSign'], resolve) },
    { path: '/activity/ActivityPay/:id', component: resolve => require(['@/components/Activity/ActivityPay'], resolve) },
    { path: '/activity/NewsDetail2/:id', name: 'NewsDetail2', component: resolve => require(['@/components/Activity/NewDetail2'], resolve) },

    { path: '/login', component: resolve => require(['@/components/Login/Login'], resolve) },
    { path: '/register', component: resolve => require(['@/components/Login/Register'], resolve) },

    // { path: '/activity/ActivityDetail2/:id', name: 'ActivityDetail2', redirect: '/activity/ActivityDetail/:id', component: resolve => require(['@/components/Activity/ActivityDetail2'], resolve) },
    { path: '/activity/ActivityDetail/:id', name: 'ActivityDetail', component: resolve => require(['@/components/Activity/ActivityDetail'], resolve) },
    { path: '/activity/PersonList/:id', name: 'PersonList', component: resolve => require(['@/components/Activity/PersonList'], resolve) },
    { path: '/activity/CommentList/:id', name: 'CommentList', component: resolve => require(['@/components/Activity/CommentList'], resolve) },
    { path: '/activity/ApplicationForm/:id', name: 'ApplicationForm', component: resolve => require(['@/components/Common/ApplicationForm'], resolve) },
    { path: '/activity/SendComment/:id', name: 'SendComment', component: resolve => require(['@/components/Activity/SendComment'], resolve) },

    { path: '/index/NewsDetail/:id', name: 'NewsDetail', component: resolve => require(['@/components/Activity/NewDetail'], resolve) },
    { path: '/index/CoachDetail/:id', name: 'CoachDetail', component: resolve => require(['@/components/Index/CoachDetail'], resolve) },
    { path: '/cooperation/CooperationDetail/:id', name: 'CooperationDetail', component: resolve => require(['@/components/Cooperation/CooperationDetail'], resolve) },
  ]
})