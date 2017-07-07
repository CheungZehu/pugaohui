<template>
	<div>
		<!-- <transition name="slide-fade slide-left"> -->
			<router-view></router-view>
		<!-- </transition> -->
		
		<div class="bottom"></div>
		<tabbar class="tabbar">
						<!-- <tabbar-item v-for="item in tabBar" :key="item.id" :selected="tag === item.tabList" :link="item.link" @click="setRouter">
               <span slot="label" class="iconfont" :class="item.tabIcon">{{item.tabList}}</span>
            </tabbar-item>
 -->

            <tabbar-item :selected="isIndex" link="/index">
               <span slot="label" class="iconfont" :class="[isIndex ? 'icon-shouye1' : 'icon-shouye']">首页</span>
            </tabbar-item>
            <tabbar-item :selected="isActivity" link="/activity">
               <span slot="label" class="iconfont" :class="[isActivity ? 'icon-huodong' : 'icon-huodong2']">活动</span>
            </tabbar-item>
            <tabbar-item :selected="isCooperation" link="/cooperation">
               <span slot="label" class="iconfont" :class="[isCooperation ? 'icon-hezuo2' : 'icon-hezuo1']">合作</span>
            </tabbar-item>
            <tabbar-item :selected="isMy" link="/my">
               <span slot="label" class="iconfont" :class="[isMy ? 'icon-wode' : 'icon-wode1']">我的</span>
            </tabbar-item>
        </tabbar>
	</div>
</template>

<script>
	import { Tabbar, TabbarItem } from 'vux'
	import router from 'vue-router'

	export default {
		components: {
			Tabbar, TabbarItem
		},
		data () {
			return {
				transitionName:'',
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
				// tabList: [
				// 	'首页', '活动', '合作', '我的'
				// ],
				// tabIcon: [
				// 	'icon-shouye1', 'icon-huodong2', 'icon-hezuo1', 'icon-wode1'
				// ]
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
			}
		},
		watch: {
  		'$route' (to, from) {
    		const toDepth = to.path.split('/').length
    		const fromDepth = from.path.split('/').length
    		this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
  		},
  		transitionName(){
    		console.log(this.transitionName)
  		}
		}
	}
</script>

<style lang="less">
	.tabbar {
		position: fixed !important;
	}
	.bottom {
		height: 50px;
	}
	.weui-tabbar__item.weui-bar__item_on .weui-tabbar__label {
    color: #00377e !important;
	}
	.vux-tabbar-simple .weui-tabbar__label {
    line-height: 30px !important;
	}
	.tabbar .iconfont:before {
		height: 20px !important;
		display: block;
	}
	.slide-fade-enter-active {
		transition: all .3s ease;
	}
	.slide-fade-leave-active {
		transition: all .1s cubic-bezier(1.0, 0.5, 0.8, 1.0);
	}
	.slide-fade-enter, .slide-fade-leave-active {
		opacity: 0;
	}
</style>