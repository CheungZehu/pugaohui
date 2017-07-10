<template>
	<div>
		<loading v-model="isLoading"></loading>
		<transition :name="'slide-' + (direction === 'forward' ? 'in' : 'out')">
			<router-view class="router-view"></router-view>
		</transition>

		<!-- <router-view></router-view> -->
		
		<div class="bottom"></div>
		<tabbar class="tabbar">
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
	import { Tabbar, TabbarItem, Loading } from 'vux'
	// import router from 'vue-router'
	import { mapState } from 'vuex'

	export default {
		components: {
			Tabbar, TabbarItem, Loading
		},
		data () {
			return {
				transitionName:'',
				show: true,

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

			...mapState({
				route: state => state.route,
				path: state => state.route.path,
				isLoading: state => state.vux.isLoading,
				direction: state => state.vux.direction
			})
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

	.fade-enter-active, .fade-leave-active {
		transition: opacity .5s;
	}
	.fade-enter, .fade-leave-to {
		opacity: 0
	}

	.router-view {
		width: 100%;
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