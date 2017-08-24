<template>
	<div class="activity-list">
		<div class="picture"  v-if="imgList.length > 0">
			<swiper loop auto :list="imgList" dots-position="center"></swiper>
		</div>
		<div class="listImg">
			<router-link class="graphic" v-for="item in ActivityData" :key="item.id" :to="{name: 'ActivityDetail', params: {id: item.id}}">
				<graphic :title="item.title" :imgUrl="img + item.imgUrl" :time="item.startTime" :status="item.signMsg"></graphic>
			</router-link>
			
		</div>
		<load-more class="Loading" :tip="Loading" background-color="#f2f2f2" v-if="!show"></load-more>
		<load-more class="noMore" :show-loading='false' :tip="noMore" background-color="#f2f2f2" v-if="show"></load-more>
	</div>
</template>

<script>
	import api from '../../api/api'
	import { Swiper, SwiperItem, LoadMore } from 'vux'
	import Graphic from '../Common/Graphic'

	export default {
		components: {
			Swiper, SwiperItem, Graphic, LoadMore
		},
		data () {
			return {
				imgList: [],
				img: 'http://s1.wego168.com/imgApp',
				ActivityData: [],
				curPage: 0,
				size: 5,
				total: 0,
				sw: true,
				show: false,
				Loading: '正在加载',
				noMore: '已无更多数据'
			}
		},
		created () {
			this.getActivityCarousel()
			this.configWxSdk()
		},
		mounted () {
			let _this = this
			this.getActivityList()

			if (this.$route.path === '/activity') {
				window.onscroll = this.util.debounce(this.setScroll, 500, false)
			}
			
		},
		methods: {
			loadJsapiTicketSign (jsApiList) {
				let signUrl = location.href.split('#')[0]
				api.getWeixin({url: signUrl}).then(res => {
					this.configApiList(res.data, jsApiList)
				})
			},
			configWxSdk () {
				this.$wechat.ready(() => {
					let dataForWeixin = {
						title: '普高会体育精彩活动',
						desc: '广东普高会体育发展有限公司，简称普高会“PGH”，一个普及高尔夫文化的商务社交平台。',
						link: `http://wfx.wego168.com/wx7d3c9e2d28015f9c/wechat/newsBase/urlSkipAction!accreditPghActivityList.action?oauthTypeBase=false`,
						imgUrl: `http://s1.wego168.com/imgApp/upload/wx7d3c9e2d28015f9c/img/12ed9f835b504311962c2d0b0b4369d3.png`,
						success: () => {

						},
						cancel: () => {

						},
					}
					this.$wechat.onMenuShareTimeline(dataForWeixin)
					this.$wechat.onMenuShareAppMessage(dataForWeixin)
				})
				this.$wechat.error(() => {
					// alert('失败')
				})
				let jsApiList = ['onMenuShareTimeline', 'onMenuShareAppMessage']
				this.loadJsapiTicketSign(jsApiList)
			},
			configApiList (obj, jsApiList) {
				this.$wechat.config({
					debug: false,
					appId: obj.appId,
					timestamp: obj.timestamp,
					nonceStr: obj.nonceStr,
					signature: obj.signature,
					jsApiList: jsApiList
				})
			},

			getActivityCarousel () {
				let params = { categoryId: 'activityImg' }
				api.getCarousel(params).then(res => {
					let ImgData = res.data
					this.imgList = ImgData.map(item => ({
						img: this.img + item.path
					}))
				})
			},
			getActivityList () {
				let data = []
				this.curPage++
				let params = { pageNumber: this.curPage}
				api.ActivityList(params).then(res => {
					if (res.data) {
						// console.log(res.data)
						this.total = res.data.fullListSize
						for (var i = 0; i < res.data.list.length; i++) {
							this.ActivityData.push(res.data.list[i])
						}
						if (this.total <= this.ActivityData.length) this.show = true
						this.sw = true
						this.loading(false)
					} else {
						this.loading(true)
					}
				})
			},
			setScroll () {
				// console.log(document.body.scrollTop)
				// console.log(document.body.scrollHeight)
				// console.log(document.body.offsetHeight)
				if (document.body.scrollHeight - window.innerHeight - 200 <= document.body.scrollTop) {
					if (this.total <= this.ActivityData.length) {
						this.show = true
					} else {
						if (this.sw === true) {
							this.sw = false
							this.show = false
							this.getActivityList()
						}
					}
				}
			},
		}
	}
</script>

<style>
	.listImg {
		display: flex;
		flex-flow: row wrap;
		background-color: #fff;
	}
	.noMore {
		margin: 1.5em auto .1em auto !important;
	}
	.Loading {
		margin: .1em auto .1em auto !important;
	}
</style>

