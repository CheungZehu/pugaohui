<template>
	<div>
	<loading v-if="!show"></loading>
	<div class="new-detail" v-else>
		<div class="new-title">
			<p>{{titleDetail.title}}</p>
			<p>
				<span class="time">{{titleDetail.showDate}}</span>
				<span class="author" v-if="titleDetail.author">{{titleDetail.author}}</span>
				<!-- <span class="author">袁日袁</span> -->
				<a class="origin" :href="titleDetail.weixinUrl" v-if="titleDetail.weixinName">{{titleDetail.weixinName}}</a>
				<!-- <span class="read">123</span> -->
			</p>
		</div>
		<!-- <div class="new-text">
			<div v-for="item in newsDetail" :key="item.id">
				<img v-if="/img/.test(item)" :src="item" alt="">
				<p v-html="item" v-else></p>
			</div>
		</div> -->
		<div class="new-text" v-html="newsDetail"></div>
	</div>
	</div>
</template>

<script>
	import api from "../../api/api"
	import wx from 'weixin-js-sdk'
	import { Loading } from 'vux'
	import axios from 'axios'
	import qs from 'qs'

// 	function postData(url, params) {
// 	return new Promise((resolve, reject) => {
// 		axios.post(url, qs.stringify(params))
// 			.then(res => {
// 				resolve(res)
// 			}, err => {
// 				reject(err)
// 			})
// 			.catch(error => {
// 				reject(error)
// 			})
// 	})
// }

	export default {
		components: {
			Loading
		},
		data () {
			return {
				newsDetail: [],
				titleDetail: {},
				show: false
			}
		},
		created () {
			this.setDetail()
			this.configWxSdk()
		},
		watch: {
			'$route': 'setDetail'
		},
		methods: {
			setDetail () {
				this.loading(true)
				// this.updateLoadingStatus(true)
				api.getDetail({id: this.$route.params.id}).then(res => {
					this.titleDetail = res.data
					console.log(res.data)
					this.newsDetail = this.titleDetail.content
					var strs = this.newsDetail.split('<img style="display:inline;')
					var text = '<img style="display:inline;width:100%;height:100%;'
					for (var i = 0; i < strs.length - 1; i++) {
						strs[i] += text
					}
					function append (oVal, nVal) {
						return oVal + nVal
					}
					this.newsDetail = strs.reduce(append)
					// this.updateLoadingStatus(false)
					this.show = true
					this.loading(false)
				})
			},
			loadJsapiTicketSign (jsApiList) {
				let signUrl = location.href.split('#')[0]
				api.getWeixin({'url': signUrl}).then(res => {
					this.configApiList(res.data, jsApiList)
				})
			},
			configWxSdk() {
				wx.ready(() => {
					console.log('wechat ready')

					let dataForWeixin = {
						title: this.titleDetail.title,
						desc: this.titleDetail.shortContent || this.titleDetail.title,
						link: window.location.href,
						imgUrl: 'http://s1.wego168.com/imgApp' + this.titleDetail.imgUrl,
						success: () => {
							// alert('成功')
						},
						cancel: () => {
							// alert('取消')
						}
					}

					wx.onMenuShareAppMessage(dataForWeixin)
					wx.onMenuShareTimeline(dataForWeixin)
				})
				wx.error(() => {
					alert('失败')
				})
				let jsApiList = ['onMenuShareAppMessage', 'onMenuShareTimeline']
				this.loadJsapiTicketSign(jsApiList)
			},
			configApiList(obj, jsApiList) {
				wx.config({
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

<style lang="less" scoped>
	.new-detail {
		background-color: #fff;
		.new-title {
			background-color: #fff;
			padding: 15px 15px 10px 15px;
			p:first-child {
				margin-bottom: 10px;
				font-size: 24px;
				font-weight: bold;
				color: #3e3e3e;
			}
			p:last-child {
				line-height: 25px;
				position: relative;
				span {
					color: #888888;
					font-size: 16px;
					margin-right: 5px;
				}
				.read {
					position: absolute;
					right: 0;
					top: 1px;
				}
				.origin {
					color: #607fa6;
					font-size: 16px;
				}
			}
		}
		.new-text {
			padding: 10px;
			p {
				margin-bottom: 5px;
				text-indent: 2em;
				text-align:justify;
			}
			img {
				width: 100%;
				margin: 5px 0;
			}
		}
	}
</style>