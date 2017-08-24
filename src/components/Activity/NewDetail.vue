<template>
	<div class="new-detail" v-if="!isLoading">
		<div class="new-title">
			<p>{{titleDetail.title}}</p>
			<p>
				<span class="time">{{titleDetail.showDate}}</span>
				<span class="author" v-if="titleDetail.author">{{titleDetail.author}}</span>
				<a class="origin" :href="titleDetail.weixinUrl" v-if="titleDetail.weixinName">{{titleDetail.weixinName}}</a>
			</p>
		</div>
		<!-- <div class="new-text">
			<div v-for="item in newsDetail" :key="item.id">
				<img v-if="/img/.test(item)" :src="item" alt="">
				<p v-html="item" v-else></p>
			</div>
		</div> -->
		<div class="new-text" v-html="newsDetail"></div>
		<div class="bottom">
			<router-link to="/index">
				<span>返回首页</span>
			</router-link>
			<span class="logo">企成 · 互联</span>
		</div>
	</div>
</template>

<script>
	import api from "../../api/api"
	import { mapState, mapActions } from 'vuex'

	export default {
		data () {
			return {
				newsDetail: [],
				titleDetail: {},
				show: false
			}
		},
		computed: {
			...mapState({
				isLoading: state => state.isLoading,
				path: state => state.route.path,
			})
		},
		created () {
			this.setDetail()
		},
		watch: {
			'$route': 'setDetail',
			path (path) {
				console.log(path)
				if (this.$route.path.test('/NewsDetail')) {
					
					let body = document.querySelector('body')
					body.style.background = "#fff"
				} else {
					let body = document.querySelector('body')
					body.style.background = "#f2f2f2"
				}
			}
		},
		methods: {
			...mapActions([
				'updateLoadingStatus'
			]),
			setDetail () {
				this.show = false
				this.updateLoadingStatus(true)
				api.getDetail({id: this.$route.params.id}).then(res => {
					console.log(res.data)
					this.titleDetail = res.data
					this.newsDetail = this.titleDetail.content
					if (/<img style="display:inline;/.test(this.newsDetail)) {
						var strs = this.newsDetail.split('<img style="display:inline;"')
						var text = '<img style="display:inline;width:100%;height:100%;" class="weixin"'
						for (var i = 0; i < strs.length - 1; i++) {
							strs[i] += text
						}
						function append (oVal, nVal) {
							return oVal + nVal
						}
						this.newsDetail = strs.reduce(append)
					}
					setTimeout(() => {
						this.configWxSdk()
					}, 500)
					this.updateLoadingStatus(false)
					this.show = true
				})
			},
			// 微信分享转发
			loadJsapiTicketSign (jsApiList) {
				// let signUrl = location.href.split('#')[0]
				let signUrl = location.href
				api.getWeixin({url: signUrl}).then(res => {
					this.configApiList(res.data, jsApiList)
				})
			},
			configWxSdk() {
				this.$wechat.ready(() => {
					let dataForWeixin = {
						title: this.titleDetail.title,
						desc: this.titleDetail.shortContent || this.titleDetail.title,
						link: `http://wfx.wego168.com/wx7d3c9e2d28015f9c/wechat/newsBase/urlSkipAction!accreditPghNewsDetail.action?id=${this.$route.params.id}&oauthTypeBase=false`,
						imgUrl: `http://s1.wego168.com/imgApp${this.titleDetail.imgUrl}`,
						success: () => {},
						cancel: () => {},
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
			}
		}
	}
</script>

<style lang="less" scoped>
	.new-detail {
		
		.new-title {
			background-color: #fff;
			padding: 15px 15px 10px 15px;
			p:first-child {
				margin-bottom: 10px;
				font-size: 24px;
				color: #3e3e3e;
				line-height: 1.5;
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
			background: #fff;
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
		.bottom {
			height: 60px;
			line-height: 60px;
			text-align: center;
			span {
				color: #999;
				margin-right: 20px;
			}
			.logo {

				border-left: 1px solid #999;
				padding-left: 40px;
				&:before {
					content: '';
					background: url('../../../static/images/qicheng.png') no-repeat;
					background-size: 100%;
					display: inline-block;
					height: 17px;
					width: 17px;
					position: relative;
					top: 4px;
					right: 15px;
				}
			}
		}
	}
</style>