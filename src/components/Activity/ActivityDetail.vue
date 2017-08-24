<template>
	<div class="activity">
	<div class="act">
	<div class="activity-detail" v-if="show">
		<div class="activity-title">
			<p>{{titleDetail.title}}</p>
			<p>
				<span class="time">{{titleDetail.showDate}}</span>
				<span class="author" v-if="titleDetail.author">{{titleDetail.author}}</span>
				<a class="origin" :href="titleDetail.weixinUrl" v-if="titleDetail.weixinName">{{titleDetail.weixinName}}</a>
			</p>
		</div>

		<div class="activity-item">
			<p class="title">活动信息</p>
			<ul>
				<li>
					<span>报名截止</span>
					<span>{{titleDetail.signEndTime}}</span>
				</li>
				<li>
					<span>活动时间</span>
					<span>{{titleDetail.startTime}}</span>
				</li>
				<li>
					<span>活动地点</span>
					<span>{{titleDetail.place}}</span>
				</li>
				<li>
					<span>活动人数</span>
					<span>已有{{this.personLength}}人报名（上限{{titleDetail.maxNum}}人）</span>
				</li>
				<li>
					<span>活动状态</span>
					<!-- <span>火热报名中<span> (已报名)</span></span> -->
					<span>{{titleDetail.signMsg}}<span v-if="this.userStatus"> (已报名)</span></span>
				</li>
				<li v-if="titleDetail.fee">
					<span>活动费用</span>
					<span>{{titleDetail.fee | pay}}</span>
				</li>
			</ul>
		</div>
		<div class="activity-item">
			<p class="title">活动内容</p>
			<div class="activity-content" v-html="activityDetail">
			</div>
		</div>

		<div class="enter-list">
			<p>已报名({{this.personLength}})</p>
			<ul>
				<li v-for="(item, index) in personList" :key='item.id' :style="{ 'marginLeft': index !== 0 ? 'calc((100% - 280px)/6)' : '0' }">
					<img :src="item.headImgUrl" alt="">
					<span>{{item.nickname}}</span>
				</li>
				
			</ul>
			<p class="more" @click="getPersonList" v-if="personLength > 7">
				查看更多报名
			</p>
			
		</div>
		<div class="comment-list">
			<p>
				<span>评论({{commentLength}})</span>
				<span @click="sendComment">我要评论</span>
			</p>
			<comment v-for="(item, key) in commentList" :key="key" :url="item.headImgUrl" :nickname="item.nickname" :content="item.content" :createTimeHM="item.createTimeHM" :createDateName="item.createDateName"></comment>
			<p @click="getCommentList" class="more-commentList" v-if="commentLength > 10">查看更多评论</p>
		</div>
		<div class="bottom">
			<router-link to="/index">
				<span>返回首页</span>
			</router-link>
			<span class="logo">企成 · 互联</span>
		</div>
		
		<span v-if="status" class="enter-icon enter-icon-default" :class="{active: active}" @click="getApplicationForm">报名</span>
		<span v-else class="enter-icon enter-icon-active" :class="{active: active}" @click="getStop">报名</span>
	</div>
	</div>
	</div>
</template>

<script>
	import ApplicationForm from '../Common/ApplicationForm'
	import Comment from '../Common/Comment'
	import CommentList from '../Activity/CommentList'
	// import PersonList from '../Activity/PersonList'
	import api from '../../api/api'
	import { mapActions, mapState } from 'vuex'
	import { Group, XTextarea, Loading } from 'vux'

	export default {
		components: {
			ApplicationForm, Comment, XTextarea, Group, Loading, CommentList
		},
		data () {
			return {
				isApplicationForm: false,
				activityDetail: [],
				titleDetail: {},
				show: false,
				inputData: [],
				commentList: [],
				personList: [],
				text: '',
				topValue: 0,
				interval: null,
				active: true,
				personLength: 0,
				oHeight: 0,
				commentLength: 0,
				personListLength: 0,
				userStatus: false,
				status: true,
				// scroll: 0,
			}
		},
		mounted () {
			this.setDetail()
			this.setCommentList()
			this.scroll()
			
			// 滚动停止
			document.onscroll = () => {
				this.active = false
				if (this.interval === null) {
					this.interval = setInterval(() => {
						this.btnHide()
					}, 500)
					this.topValue = document.body.scrollTop
				}
			}
		},
		computed: {
			...mapState({
				isScroll: state => state.isScroll
			})
		},
		methods: {
			...mapActions([
				'updateLoadingStatus'
			]),
			btnHide () {
				if (document.body.scrollTop === this.topValue) {
					this.active = true
					clearInterval(this.interval)
					this.interval = null
				} else {
					this.topValue = document.body.scrollTop
				}
			},
			getPersonList () {
				this.$router.push('/activity/PersonList/' + this.$route.params.id)
			},
			getApplicationForm () {
				// alert(this.userStatus)
				if (this.userStatus === true) {
					this.showInfo('您已报名，请勿重复报名')
				} else {
					this.$router.push('/activity/ApplicationForm/' + this.$route.params.id)
				}
				
			},
			getStop () {
				this.showInfo(this.titleDetail.signMsg)
			},
			getCommentList () {
				this.$router.push('/activity/CommentList/' + this.$route.params.id)
			},
			sendComment () {
				this.$router.push('/activity/SendComment/' + this.$route.params.id)
				let scrollTop = document.body.scrollTop
				localStorage.setItem('scrollTop', scrollTop)
			},
			scroll () {
				let scrollTop = localStorage.getItem('scrollTop')
				if (scrollTop && this.isScroll) {
					setTimeout(() => {
						document.body.scrollTop = scrollTop
					}, 800)
					
				}
			},
			setDetail () {
				this.show = false
				this.updateLoadingStatus(true)
				api.ActivityDetail({id: this.$route.params.id}).then(res => {
					if (res.data) {
						// console.log('活动详情')
						// console.log(res.data)
						this.titleDetail = res.data
						if (res.data.userStatus !== null) {
							this.userStatus = res.data.userStatus
						}

						if (this.titleDetail.signMsg) {
							if (this.titleDetail.signMsg === '报名已截止' || this.titleDetail.signMsg === '活动人数已满' || this.titleDetail.signMsg === '活动已结束') {
								this.status =  false
							} else {
								this.status =  true
							}
						}
						this.activityDetail = this.titleDetail.content
						if (/<img style="display:inline;/.test(this.activityDetail)) {
							var strs = this.activityDetail.split('<img style="display:inline;')
							var text = '<img style="display:inline;width:100%;height:100%;'
							for (var i = 0; i < strs.length - 1; i++) {
								strs[i] += text
							}
							function append (oVal, nVal) {
								return oVal + nVal
							}
							this.activityDetail = strs.reduce(append)
						}
						setTimeout(() => {
							this.configWxSdk()
						}, 500)
						
							
						this.updateLoadingStatus(false)
						this.show = true
					}
				})
				api.signShow({id: this.$route.params.id}).then(res => {
					// console.log('报名人信息')
					// console.log(res.data)
					this.personLength = res.data.fullListSize
					let data = res.data.list
					this.personList = data.slice(0, 7)
					// this.personList = [0,0,0,0,0]
					this.show = true
				})
			},
			setCommentList () {
				this.show = false
				this.updateLoadingStatus(true)
				api.commentList({activityId: this.$route.params.id, pageNumber: 1}).then(res => {
					this.commentLength = res.data.fullListSize
					this.commentList = res.data.list
					// console.log('评论')
					// console.log(res.data)
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
						link: `http://wfx.wego168.com/wx7d3c9e2d28015f9c/wechat/newsBase/urlSkipAction!accreditPghActivityDetail.action?id=${this.$route.params.id}&oauthTypeBase=false`,
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
		},
		filters: {
			numberHide (val) {
				var str = val.toString()
				return str.substr(0, 3) + '****' + str.substr(7)
				// return val.substr(0, 3) + '****' + val.substr(7)
			},
			time (val) {
				if (val)
				return val.split(' ')[0]
			},
			pay (val) {
				if (val) {
					return '￥' + val.toFixed(2)
				}
			}
		}
	}
</script>

<style lang="less" scoped>
	.activity-detail {

		.activity-title {
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
				.origin {
					color: #607fa6;
					font-size: 16px;
				}
			}
		}
		.pd {
			padding: 0 10px 10px 10px;
		}
		.activity-item {
			background-color: #fff;
			padding-top: 20px;
			.title {
				font-size: 18px;
				line-height: 40px;
				height: 40px;
				background-color: #daeeff;
				padding: 0 20px;
			}
			ul {
				padding: 10px 20px;
				list-style: none;
				li {
					padding: 3px 0;
					display: flex;
					span:first-child {
						flex-basis: 110px;
					}
					span:last-child {
						width: 100%;
						text-align:justify;
					}
				}
			}
			.activity-content {
				padding: 20px;
				img {
					width: 100%;
				}
			}
		}
		.enter-list {
			margin-top: 20px;
			background-color: #fff;
			p {
				margin: 0 20px;
				line-height: 50px;
			}
			ul {
				list-style: none;
				display: flex;
				overflow: hidden;
				border-top: 1px solid #f2f2f2;
		    	border-bottom: 1px solid #f2f2f2;
		    	padding: 10px 20px;
		    	clear: both;
				li {
					color: #333333;
					float: left;
					width: 40px;
					overflow: hidden;
				  text-overflow: ellipsis;
				  text-align: center;
					img {
						width: 36px;
						height: 36px;
						border-radius: 50%;
					}
					span {
						font-size: 12px;
						overflow: hidden;
				    text-overflow: ellipsis;
				    white-space: nowrap;
				    width: 45px;
				    text-align: center;
					}
					&:first-child {
						margin-left: 0;
					}
				}	
			}
			.more {
				color: #00377e;
				text-align: center;
			}
		}
		.comment-list {
			margin-top: 20px;
			p {
				padding: 0 20px;
				line-height: 50px;
				background: #fff;
				clear: both;
				span:last-child {
					float: right;
					color: #00377e;
				}
			}
			.more-commentList {
				text-align: center;
				border-top: 1px solid #f2f2f2;
				color: #00377e;
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
		.enter-icon {
			color: #fff;
			position: fixed;
			width: 50px;
			height: 50px;
			line-height: 50px;
			
			border-radius: 50%;
			box-shadow: 2px 2px 10px 1px rgba(80, 80, 80, 0.20);
			outline: none;
			text-align:center;
			z-index: 1;
			bottom: -50px;
			right: 30px;
			cursor: pointer;
			outline: none;
			transition: all .3s;
		}
		.enter-icon-default {
			background-color: #ffc332;
		}
		.enter-icon-active {
			background-color: #848484;
		}
		.active {
			bottom: 20px;
		}
	}
	.weui-cells {
		margin-top: 0 !important;
		border-left: 1px solid #D9D9D9;
		border-right: 1px solid #D9D9D9;
		border-radius: 5px;
	}
	.vux-no-group-title {
		margin-top: 0 !important;
	}
	.text {
		padding: 5px !important;
	}
	.activity {

	}
	.send-comment {
		background-color: #fff;
		border-top: 1px solid #f2f2f2;
		position: fixed;
		bottom: 0;
		width: 94%;
		padding: 10px 3%;
		display: flex;
		align-items: center;
		justify-content: space-between;
		input {
			padding: 5px;
			border-radius: 5px;
			border: 1px solid #f2f2f2;
			font-size: 18px;
			width: 100%;
		}
		span {
			flex-basis: 40px;
			margin-left: 10px;
		}
	}

</style>
