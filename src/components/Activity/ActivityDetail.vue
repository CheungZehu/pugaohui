<template>
	<div class="activity-detail" v-if="show">
		<div class="activity-title">
			<p>{{titleDetail.title}}</p>
			<p>
				<span class="time">{{titleDetail.showDate}}</span>
				<span class="author" v-if="titleDetail.author">{{titleDetail.author}}</span>
				<a class="origin" :href="titleDetail.weixinUrl" v-if="titleDetail.weixinName">{{titleDetail.weixinName}}</a>
			</p>
		</div>
		<!-- <div class="activity-item" v-html=""></div> -->

		<div class="activity-item">
			<p class="title">活动信息</p>
			<ul>
				<li>
					<span>报名截止</span>
					<span>{{titleDetail.signEndTime}}</span>
				</li>
				<li>
					<span>活动时间</span>
					<span>{{titleDetail.endTime}}</span>
				</li>
				<li>
					<span>活动地点</span>
					<span>{{titleDetail.place}}</span>
				</li>
				<li>
					<span>活动人数</span>
					<span>已有3人报名（上限500人）</span>
				</li>
				<li>
					<span>活动状态</span>
					<span>{{titleDetail.signMsg}}</span>
				</li>
			</ul>
		</div>
		<!-- <div class="activity-item">
			<p class="title">活动内容</p>
			<div class="activity-content">
				<img src="../../../static/images/biaotitu_03.png" alt="">
				<p>由广州电子商务行业协会主办、中国电信股 份有限公司中国电信.广州.荔湾.互联网+基地协办 的第三期华南电商大讲堂</p>
				<p>由广州电子商务行业协会主办、中国电信股 份有限公司中国电信.广州.荔湾.互联网+基地协办 的第三期华南电商大讲堂</p>
				<p>由广州电子商务行业协会主办、中国电信股 份有限公司中国电信.广州.荔湾.互联网+基地协办 的第三期华南电商大讲堂</p>
			</div>
		</div> -->
		<div class="activity-item pd" v-html="activityDetail">
		</div>
		<div class="enter-list">
			<p>已有3人报名（上限500人）</p>
			<ul>
				<li>
					<span class="enter-name">小媛</span>
					<span class="phone">136****8596</span>
					<span class="time">08-08 14:35</span>
				</li>
				<li>
					<span class="enter-name">小媛</span>
					<span class="phone">136****8596</span>
					<span class="time">08-08 14:35</span>
				</li>
				<li>
					<span class="enter-name">小媛</span>
					<span class="phone">136****8596</span>
					<span class="time">08-08 14:35</span>
				</li>
			</ul>
			<p class="more">
				查看更多报名 >>
			</p>
		</div>
		<div class="comment-list">
			<comment v-for="(item, key) in commentList" :key="key" :nickname="item.nickname" :content="item.content" :createTime="item.createTime"></comment>
			<!-- <comment></comment>
			<comment></comment> -->
		</div>
		<div style="height: 50px;"></div>
		<div class="send-comment">
		<!-- 	<input type="text" placeholder="评论" v-model="text">
			<span @click="send">发送</span> -->
			<group>
				<x-textarea :max="70" autosize :rows="1" :show-counter="false" v-model="text" placeholder="最多可输入70字"></x-textarea>
			</group>
			<span @click="send">发送</span>
		</div>
		<span class="enter-icon" @click="getApplicationForm" style="display: none;">报名</span>
		<application-form v-if="isApplicationForm" @isShow="getApplicationForm" :inputData='inputData'></application-form>
	</div>
</template>

<script>
	import ApplicationForm from '../Common/ApplicationForm'
	import Comment from '../Common/Comment'
	import api from '../../api/api'
	import { mapActions } from 'vuex'
	import { Group, XTextarea } from 'vux'

	export default {
		components: {
			ApplicationForm, Comment, XTextarea, Group
		},
		data () {
			return {
				isApplicationForm: false,
				activityDetail: [],
				titleDetail: {},
				show: false,
				inputData: [],
				commentList: [],
				text: '',
				row: 3,
			}
		},
		created () {
			this.setDetail()
			this.setInfoSetting()
		},
		watch: {
			'$route': 'setDetail'
		},
		methods: {
			...mapActions([
				'updateLoadingStatus'
			]),
			getApplicationForm () {
				this.isApplicationForm = !this.isApplicationForm;
				this.setInfoSetting()
				let body = document.getElementsByTagName('body')[0]
				if (this.isApplicationForm) {
					body.setAttribute('style', 'overflow:hidden;')
				} else {
					body.setAttribute('style', '')
				}
			},
			setDetail () {
				this.show = false
				this.updateLoadingStatus(true)
				api.ActivityDetail({id: this.$route.params.id}).then(res => {
					this.titleDetail = res.data
					this.activityDetail = this.titleDetail.content
					var strs = this.activityDetail.split('<img style="display:inline;')
					var text = '<img style="display:inline;width:100%;height:100%;'
					for (var i = 0; i < strs.length - 1; i++) {
						strs[i] += text
					}
					function append (oVal, nVal) {
						return oVal + nVal
					}
					this.activityDetail = strs.reduce(append)
					this.updateLoadingStatus(false)
					this.show = true
				})	
			},
			setCommentList () {
				this.show = false
				this.updateLoadingStatus(true)
				api.commentList().then(res => {
					this.commentList = res.data
				})
			},
			setInfoSetting () {
				api.SignUpInfoSetting({id: this.$route.params.id}).then(res => {
					console.log(res.data)
					this.inputData = res.data
				})
			},
			send () {
				if (this.text) {
					let data = {
						content: this.text,
						openId: 'djas234jdgfsdfde35',
						nickname: '放得开',
						headImgUrl: 'http://s1.wego168.com/imgApp/upload/null/img/3b8d19f132be4c0ea053aa4d875ed4bf.png'
					}
					// api.saveComment({content: this.text}).then(res => {
					api.saveComment(data).then(res => {
						console.log(res.data)
					})
					// console.log(this.text)
					// this.text = ''
					// this.row = 1
					// console.log(this.row)
					this.showInfo('评论成功')
					setTimeout(() => {
						// window.location.reload()
					}, 500)
					
				} else {
					this.showInfo('请填写评论')
				}
				
			}
		}
	}
</script>

<style lang="less">
	.activity-detail {
		.activity-title {
			background-color: #fff;
			padding: 15px 15px 10px 15px;
			border-bottom: 1px solid #f2f2f2;
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
				.origin {
					color: #607fa6;
					font-size: 16px;
				}
			}
		}
		.pd {
			padding: 0 10px;
		}
		.activity-item {
			background-color: #fff;
			padding-top: 20px;
			.title {
				font-size: 18px;
				font-weight: bold;
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
						font-weight: bold;
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
				p {
					margin-bottom: 5px;
					text-indent: 2em;
					text-align:justify;
				}
			}
		}
		.enter-list {
			background-color: #fff;
			p {
				border-top: 1px solid #f2f2f2;
				margin: 0 20px;
				text-align:center;
				line-height: 50px;
			}
			ul {
				list-style: none;
				margin: 0 20px;
				li {
					line-height: 40px;
					border-bottom: 1px solid #f2f2f2;
					color: #333333;
					.time {
						float: right;
						color: #999999;
					}
				}	
			}
			.more {
				color: #00377e;
			}
		}
		.comment-list {
			margin-top: 20px;
		}
		.send-comment {
			background-color: #fff;
			border-top: 1px solid #f2f2f2;
			position: fixed;
			bottom: 50px;
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
		.enter-icon {
			color: #fff;
			position: fixed;
			width: 50px;
			height: 50px;
			line-height: 50px;
			background-color: #ffc332;
			border-radius: 50%;
			box-shadow: 0 1px 1px 1px rgba(80, 80, 80, 0.37);
			text-align:center;
			z-index: 1;
			bottom: 60px;
			right: 30px;
			cursor: pointer;
			outline: none;
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
	.weui-cell {
		padding: 5px !important;
	}
</style>
