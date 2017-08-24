<template>
  <div id="app">
    <div v-transfer-dom>
      <loading v-model="isLoading"></loading>
      <!-- <load-ing v-show="isLoading"></load-ing> -->
    </div>
<!--     <transition :name="'slide-' + (direction === 'forward' ? 'in' : 'out')">
      <router-view class="router-view"></router-view>
    </transition> -->
    <router-view></router-view>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { TransferDom, Loading } from 'vux'
import LoadIng from './components/Common/Loading'

export default {
  name: 'app',
  directives: {
    TransferDom
  },
  components: {
    Loading, LoadIng
  },
  computed: {
    ...mapState({
      route: state => state.route,
      path: state => state.route.path,
      isLoading: state => state.isLoading,
      // direction: state => state.vux.direction,
      // demoTop: state => state.vux.demoScrollTop
    }),
    isAct () {
      return /ActivityDetail/.test(this.$route.path)
    }
  },
  methods: {
    reload () {
      if (this.isAct) {
        // alert(3)
        window.location.reload()
      } else {
        return
      }
    }
  },
  watch: {
    // '$route' (to, from) {
    //       console.log(to)
    //   }
  }
}
</script>

<style lang="less">
  
  @import '~vux/src/styles/reset.less';
  @import '//at.alicdn.com/t/font_ymbhpfy9o83erk9.css';

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
  div, h1, p, ul, li, label, textarea, input, span {
    word-break: break-all;
  }

  html, body {
    height: 100%;
    width: 100%;
    background: #f2f2f2;
    -webkit-overflow-scrolling: touch;
  }

  
  .rightMove-enter-active,
  .rightMove-leave-active {
  transition: all .3s
  }

  .rightMove-enter,
  .rightMove-leave-to {
  transform: translate3d(100%, 0, 0)
  }
</style>

<!-- 
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
  } -->