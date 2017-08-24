<template>
  <div style="height:100%;">
  <!--   <div v-transfer-dom>
      <load-ing v-show="isLoading"></load-ing>
      <loading v-model="isLoading"></loading>
    </div> -->
    <!-- <view-box ref="viewBox" body-padding-bottom="50px"> -->
<!--     <transition :name="'slide-' + (direction === 'forward' ? 'in' : 'out')">
      <router-view class="router-view"></router-view>
    </transition> -->

    <!-- <transition name="rightMove"  mode="in-out"> -->
      <router-view class="router-view"></router-view>
    <!-- </transition> -->
    
    <!-- <router-view></router-view> -->
    <div v-if="showBar">
    <div class="bottom"></div>
    <tabbar class="tabbar" slot="bottom">
      <tabbar-item :selected="isIndex" link="/index">
         <span slot="label" class="iconfont icon" :class="[isIndex ? 'icon-shouye1' : 'icon-shouye']">首页</span>
      </tabbar-item>
      <tabbar-item :selected="isActivity" link="/activity">
         <span slot="label" class="iconfont icon" :class="[isActivity ? 'icon-huodong' : 'icon-huodong2']">活动</span>
      </tabbar-item>
      <tabbar-item :selected="isCooperation" link="/cooperation">
         <span slot="label" class="iconfont icon" :class="[isCooperation ? 'icon-hezuo2' : 'icon-hezuo1']">合作</span>
      </tabbar-item>
      <!-- <tabbar-item :selected="isMy" link="/myInfo"> -->
      <tabbar-item :selected="isMy" link="http://wfx.wego168.com/wx7d3c9e2d28015f9c/wechat/newsBase/urlSkipAction!accreditPghCenter.action?oauthTypeBase=false">
         <span slot="label" class="iconfont icon" :class="[isMy ? 'icon-wode' : 'icon-wode1']">我的</span>
      </tabbar-item>
    </tabbar>
    </div>
      <!-- </view-box> -->
  </div>
</template>

<script>
  import { Tabbar, TabbarItem, Loading, ViewBox, XHeader, TransferDom } from 'vux'
  import LoadIng from './Common/Loading'
  import { mapState, mapActions } from 'vuex'

  export default {
    directives: {
      TransferDom
    },
    components: {
      Tabbar, TabbarItem, Loading, ViewBox, XHeader, LoadIng
    },
    data () {
      return {
        scroll: 0,
        transitionName:'',
        show: true,
        showBar: true,
        status: 0,
        tag: '首页',
        tabBar: [
          {
            tabList: '首页',
            tabIcon: 'icon-shouye1',
            link: '/index'
          },
          {
            tabList: '活动',
            tabIcon: 'icon-huodong2',
            link: '/activity'
          },
          {
            tabList: '合作',
            tabIcon: 'icon-hezuo1',
            link: '/cooperation'
          },
          {
            tabList: '我的',
            tabIcon: 'icon-wode1',
            link: '/my'
          },
        ]
      }
    },
    computed: {
      isIndex () {
        return /index/.test(this.$route.path)
      },
      isActivity () {
        return /activity/.test(this.$route.path)
      },
      isCooperation () {
        return /cooperation/.test(this.$route.path)
      },
      isMy () {
        return /my/.test(this.$route.path)
      },
      isAct () {
        return /ActivityDetail/.test(this.$route.path)
      },
      isBackground () {
        if (/ModifyInfo/.test(this.$route.path) || /CompleteInfo/.test(this.$route.path) || /CoachDetail/.test(this.$route.path) || /CooperationDetail/.test(this.$route.path)) {
          return true
        } else {
          return false
        }
      },

      ...mapState({
        route: state => state.route,
        path: state => state.route.path,
        isLoading: state => state.isLoading,
        // direction: state => state.direction,
        // demoTop: state => state.demoScrollTop
      })
    },
    methods: {
      background () {
        if (this.isBackground) {
          let body = document.querySelector('body')
          body.style.background = "#fff"
        } else {
          let body = document.querySelector('body')
          body.style.background = "#f2f2f2"
        }
      },
    },
    watch: {
      '$route': 'background', 
    },
    
  }
</script>

<style lang="less">
  
  .tabbar {
    position: fixed !important;
  }
  .bottom {
    height: 50px;
  }
  .weui-tabbar__item.vux-tabbar-simple {
    height: 54px !important;
  }
  .weui-tabbar__item.weui-bar__item_on .weui-tabbar__label {
    color: #00377e !important;
  }
  .vux-tabbar-simple .weui-tabbar__label {
    line-height: 36px !important;
    
  }
  .icon {
    font-size: 14px !important;
  }
  .tabbar .iconfont:before {
    height: 24px !important;
    display: block;
    font-size: 20px;
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0
  }


  .rightMove-enter-active,
  .rightMove-leave-active {
    transition: all .3s
  }

  .rightMove-enter,
  .rightMove-leave-to {
    transform: translate3d(100%, 0, 0)
  }

  .router-view {
    width: 100%;
    top: 0;
  }

 
</style>

 <!-- .slide-out-enter-active,
  .slide-out-leave-active,
  .slide-in-enter-active,
  .slide-in-leave-active {
    will-change: transform;
    transition: all 500ms;
    height: 100%;
    position: absolute;
    backface-visibility: hidden;
    perspective: 1000;
  }
  .slide-out-enter {
    opacity: 0;
    transform: translate3d(-100%, 0, 0);
  }
  .slide-out-leave-active {
    opacity: 0;
    transform: translate3d(100%, 0, 0);
  }
  .slide-in-enter {
    opacity: 0;
    transform: translate3d(100%, 0, 0);
  }
  .slide-in-leave-active {
    opacity: 0;
    transform: translate3d(-100%, 0, 0);
  } -->