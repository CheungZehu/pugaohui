<template>
  <div id="app">
    <!-- <div v-transfer-dom>
      <loading v-model="isLoading"></loading>
    </div>
    <transition :name="'slide-' + (direction === 'forward' ? 'in' : 'out')">
      <router-view class="router-view"></router-view>
    </transition> -->
    <router-view></router-view>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { TransferDom } from 'vux'

export default {
  name: 'app',
  directives: {
    TransferDom
  },
  computed: {
    ...mapState({
      route: state => state.route,
      path: state => state.route.path,
      isLoading: state => state.vux.isLoading,
      direction: state => state.vux.direction,
      demoTop: state => state.vux.demoScrollTop
    })
  }
}
</script>

<style lang="less">
  
  @import '~vux/src/styles/reset.less';
  @import '//at.alicdn.com/t/font_s9uesgqiopw4s4i.css';
  body {
    background-color: #f2f2f2;
  }
  * {
    margin: 0;
    padding: 0;
  }
  a {
    color: #000;
  }
  li {
    list-style: none;
  }
  
  html, body {

    width: 100%;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
  }
  .router-view {
    width: 100%;
    top: 0;
  }

  .slide-out-enter-active,
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
  }
</style>