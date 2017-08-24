<template>
	<div class="coach-detail" v-if="show">
		<div class="coach-item">
			<div class="coach-head">
				<img :src="img + titleDetail.imgUrl" alt="">
				<div class="coach-user">
					<p class="coach-name">{{titleDetail.title}}</p>
					<p>{{titleDetail.shortContent}}</p>
					<i @click="tel" class="iconfont icon-dianhua"></i>
				</div>
			</div>
		</div>

		<!-- <div class="coach-title">
			<p>{{titleDetail.title}}</p>
			<p>
				<span class="time">{{titleDetail.showDate}}</span>
				<span class="author" v-if="titleDetail.author">{{titleDetail.author}}</span>
				<a class="origin" :href="titleDetail.weixinUrl" v-if="titleDetail.weixinName">{{titleDetail.weixinName}}</a>
			</p>
		</div> -->

		<div class="coach-item content" v-html="coachDetail"></div>
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
	import { mapActions } from 'vuex'

	export default {
		data () {
			return {
				coachDetail: [],
				titleDetail: {},
				img: 'http://s1.wego168.com/imgApp',
				show: false,
				phone: '',
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
			tel () {
				api.recordRialing({newsId: this.$route.params.id}).then(res => {
					console.log(res.data)
				})
				if (this.phone === '' || this.phone === null || this.phone === undefined) {
					this.showInfo('暂无号码')
				} else {
					window.location.href = 	`tel: ${this.phone}`
				}
			},
			setDetail () {
				this.show = false
				this.updateLoadingStatus(true)
				api.getDetail({id: this.$route.params.id}).then(res => {
					console.log(res.data)
					this.titleDetail = res.data
					this.phone = this.titleDetail.label
					// this.phone = '15220036344'
					this.coachDetail = this.titleDetail.content
					if (/<img style="display:inline;/.test(this.coachDetail)) {
						var strs = this.coachDetail.split('<img style="display:inline;')
						var text = '<img style="display:inline;width:100%;height:100%;'
						for (var i = 0; i < strs.length - 1; i++) {
							strs[i] += text
						}
						function append (oVal, nVal) {
							return oVal + nVal
						}
						this.coachDetail = strs.reduce(append)
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
						link: `http://wfx.wego168.com/wx7d3c9e2d28015f9c/wechat/newsBase/urlSkipAction!accreditPghCoachDetail.action?id=${this.$route.params.id}&oauthTypeBase=false`,
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
	.content {
		padding: 10px 20px;
	}
	.coach-detail {
		.coach-item {
			&:last-child {
				margin-bottom: 0;
			}

			background-color: #fff;
			.coach-head {	
				height: 140px;
				padding: 0 20px;
				display: flex;
				align-items: center;
				img {
					width: 80px;
					
					border-radius: 50%;
					flex-basis: 80px;
					
				}
				.coach-user {
					margin-left: 20px;
					.coach-name {
						color: #454545;
						font-size: 20px;
						margin-bottom: 5px;
					}
					p:not(:first-child) {
						color: #888888;
					}
					.icon-dianhua {
						position: absolute;
						right: 20px;
						top: 25px;
						color: rgb(94, 174, 0);
						z-index: 100000;
						font-size: 20px;
					}
				}
			}
			.coach-introduction {
				padding: 20px;
				.introduction-item:first-child {
					margin-bottom: 30px;
				}
				.introduction-item {
					h4 {
						text-align: center;
						color: #454545;
						margin-bottom: 20px;
					}
					p {
						color: #666666;
						text-align: justify;
						margin-bottom: 5px;
						text-indent: 2em;
					}
				}
			}
			.coach-pic {
				padding: 20px;
				h4 {
					text-align: center;
					color: #454545;
					margin-bottom: 20px;
				}
				img {
					width: 100%;
					&:not(:last-child) {
						margin-bottom: 20px;
					}
				}
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