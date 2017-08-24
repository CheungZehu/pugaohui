<template>
	<div class="cooperation-detail" v-if="show">
		<div class="cooperation-title">
			<p>{{titleDetail.title}}</p>
			<p>
				<span class="time">{{titleDetail.showDate}}</span>
				<span class="author" v-if="titleDetail.author">{{titleDetail.author}}</span>
				<a class="origin" :href="titleDetail.weixinUrl" v-if="titleDetail.weixinName">{{titleDetail.weixinName}}</a>
				<!-- <span class="read">123</span> -->
			</p>
		</div>

		<div class="cooperation-text" v-html="cooperationDetail"></div>
		<div class="bottom">
			<router-link to="/index">
				<span>返回首页</span>
			</router-link>
			<span class="logo">企成 · 互联</span>
		</div>
	</div>
</template>

<script>
	import api from '../../api/api'
	import { mapActions } from 'vuex'

	export default {
		data () {
			return {
				cooperationDetail: [],
				titleDetail: {},
				show: false
			}
		},
		created () {
			this.setDetail()
		},
		watch: {
			'$route': 'setDetail'
		},
		methods: {
			...mapActions([
				'updateLoadingStatus'
			]),
			setDetail () {
				this.show = false
				this.updateLoadingStatus(true)
				api.getDetail({id: this.$route.params.id}).then(res => {
					this.titleDetail = res.data
					this.cooperationDetail = this.titleDetail.content
					if (/<img style="display:inline;/.test(this.cooperationDetail)) {
						var strs = this.cooperationDetail.split('<img style="display:inline;')
						var text = '<img style="display:inline;width:100%;height:100%;'
						for (var i = 0; i < strs.length - 1; i++) {
							strs[i] += text
						}
						function append (oVal, nVal) {
							return oVal + nVal
						}
						this.cooperationDetail = strs.reduce(append)
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
						link: `http://wfx.wego168.com/wx7d3c9e2d28015f9c/wechat/newsBase/urlSkipAction!accreditPghCommentDetail.action?id=${this.$route.params.id}&oauthTypeBase=false`,
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

<style lang="less">
	.cooperation-detail {
		.cooperation-title {
			background-color: #fff;
			padding: 15px 15px 10px 15px;

			p:first-child {
				margin-bottom: 10px;
				font-size: 24px;
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
		.contact {
			background-color: #fff;
			padding: 20px;
			.border-contact {
				border: 1px solid #000;
				.contact-title {
					text-align:center;
					line-height: 50px;
					background-color: #f7f7f7;
					position: relative;
					&:after {
						content: '';
						width: 0;
						height: 0;
						border-left: 10px solid transparent;
						border-right: 10px solid transparent;
						border-top: 8px solid #cccccc;
						position: absolute;
						bottom: 5px;
						left: 50%;
						transform: translate(-50%, 0);
					}
				}
				.info {
					background-color: #fff;
					margin: 10px 0;
					p {
						line-height: 30px;
						text-align:center;
						color: #888888;
					}
				}
			}
		}
		.cooperation-text {
		
			background-color: #fff;
			padding:20px;
			
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
<!-- p {
	margin-bottom: 5px;
	text-indent: 2em;
	text-align:justify;
} -->