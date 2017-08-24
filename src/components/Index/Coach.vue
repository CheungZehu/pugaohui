<template>
	<div class="coach">
		<router-link tag="li" v-for="item in coachData" :key="item.id" :to="{name: 'CoachDetail', params: {id: item.id}}">
			<people-list :name="item.title" :imgUrl="img + item.imgUrl" :introInfo="item.shortContent"  :phone="item.label"></people-list>
		</router-link>
		<load-more class="Loading" :tip="Loading" background-color="#000" v-if="!show"></load-more>
		<load-more class="noMore" :show-loading='false' :tip="noMore" background-color="#f2f2f2" v-if="show"></load-more>
	</div>
</template>

<script>
	import PeopleList from '../Common/PeopleList'
	import api from '../../api/api'
	import { LoadMore } from 'vux'

	export default {
		components: {
			PeopleList, LoadMore
		},
		data () {
			return {
				coachData: [],
				img: 'http://s1.wego168.com/imgApp',
				curPage: 0,
				total: 0,
				sw: true,
				show: false,
				Loading: '正在加载',
				noMore: '已无更多数据'
			}
		},
		created () {
			this.configWxSdk()
		},
		mounted () {
			let _this = this
			this.getNews()
			window.onscroll = this.util.debounce(this.setScroll, 500, false)
		},
		methods: {
			getNews () {
				let data = []
				this.curPage++
				let type = 'JL'
				let params = { pageNumber: this.curPage, type: type }
				api.getNews(params).then(res => {
					if (res.data) {
						console.log(res.data)
						this.total = res.data.fullListSize
						for (var i = 0; i < res.data.list.length; i++) {
							this.coachData.push(res.data.list[i])
						}
						if (this.total <= this.coachData.length) this.show = true
						this.sw = true
						// this.loading(false)
					} else {
						// this.loading(true)
					}
						
				})
			},
			setScroll () {
				if (document.body.scrollHeight - window.innerHeight - 200 <= document.body.scrollTop) {
					if (this.total <= this.coachData.length) {
						this.show = true
					} else {
						if (this.sw === true) {
							this.sw = false
							this.show = false
							this.getNews()
						}
					}
				}
			},
			loadJsapiTicketSign (jsApiList) {
				let signUrl = location.href.split('#')[0]
				api.getWeixin({url: signUrl}).then(res => {
					this.configApiList(res.data, jsApiList)
				})
			},
			configWxSdk () {
				this.$wechat.ready(() => {
					let dataForWeixin = {
						title: '普高会体育高球教练',
						desc: '广东普高会体育发展有限公司，简称普高会“PGH”，一个普及高尔夫文化的商务社交平台。',
						link: `http://wfx.wego168.com/wx7d3c9e2d28015f9c/wechat/newsBase/urlSkipAction!accreditPghCoachList.action?oauthTypeBase=false`,
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
		}
	}
</script>

<style>
	.weui-loadmore {
		margin: 1.5em auto .1em auto !important;
	}
	.noMore {
		margin: 1.5em auto .1em auto !important;
	}
	.Loading {
		margin: .8em auto .8em auto !important;
	}
</style>