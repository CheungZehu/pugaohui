<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="less">
  @import '~vux/src/styles/reset.less';
  @import '//at.alicdn.com/t/font_s9uesgqiopw4s4i.css';
  body {
    background-color: #f2f2f2;
  }
  a {
  	color: #000;
  }
  li {
    list-style: none;
  }
</style>
