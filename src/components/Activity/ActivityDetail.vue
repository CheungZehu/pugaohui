<template>
	<div class="activity-detail">
		<div class="activity-title">
			<p>{{titleDetail.title}}</p>
			<p>
				<span class="time">{{titleDetail.showDate}}</span>
				<span class="origin">{{titleDetail.author}}</span>
			</p>
		</div>
		<div class="activity-item">
			<p class="title">活动信息</p>
			<ul>
				<li>
					<span>报名截止</span>
					<span>广州市番禺区青蓝街22</span>
				</li>
				<li>
					<span>活动时间</span>
					<span>2016-09-30 24:00 10-08 08：00至10-10 18:00 广州市番禺区青蓝街22号超谷科技园 超谷展厅</span>
				</li>
				<li>
					<span>活动地点</span>
					<span>2016-09-30 24:00 10-08 08：00至10-10 18:00 广州市番禺区青蓝街22号超谷科技园 超谷展厅</span>
				</li>
				<li>
					<span>活动人数</span>
					<span>2016-09-30 24:00 1科技园 超谷展厅</span>
				</li>
				<li>
					<span>活动状态</span>
					<span>2016-09-30 24:0厅</span>
				</li>
			</ul>
		</div>
		<div class="activity-item">
			<p class="title">活动内容</p>
			<div class="activity-content">
				<img src="../../../static/images/biaotitu_03.png" alt="">
				<p>由广州电子商务行业协会主办、中国电信股 份有限公司中国电信.广州.荔湾.互联网+基地协办 的第三期华南电商大讲堂</p>
				<p>由广州电子商务行业协会主办、中国电信股 份有限公司中国电信.广州.荔湾.互联网+基地协办 的第三期华南电商大讲堂</p>
				<p>由广州电子商务行业协会主办、中国电信股 份有限公司中国电信.广州.荔湾.互联网+基地协办 的第三期华南电商大讲堂</p>
			</div>
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
			<comment></comment>
			<comment></comment>
			<comment></comment>
		</div>
		<div class="send-comment">
			<input type="text" placeholder="评论">
			<!-- <textarea rows="2" cols="50"></textarea> -->
			<span>发送</span>
		</div>
		<span class="enter-icon" @click="getApplicationForm">报名</span>
		<application-form v-if="isApplicationForm"></application-form>
	</div>
</template>

<script>
	import ApplicationForm from '../Common/ApplicationForm'
	import Comment from '../Common/Comment'
	import api from '../../api/api'

	export default {
		components: {
			ApplicationForm, Comment
		},
		data () {
			return {
				isApplicationForm: false,
				activityDetail: [],
				titleDetail: {}
			}
		},
		created () {
			this.setDetail(this.$route.params.id)
		},
		methods: {
			getApplicationForm () {
				this.isApplicationForm = !this.isApplicationForm;
				let body = document.getElementsByTagName('body')[0]
				if (this.isApplicationForm) {
					body.setAttribute('style', 'overflow:hidden;')
				} else {
					body.setAttribute('style', 'overflow:hidden;')
				}
			},
			setDetail (id) {
				api.getDetail({id: id}).then(res => {
					this.titleDetail = res.data
					this.activityDetail = this.titleDetail.content
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.activity-detail {
		.activity-title {
			background-color: #fff;
			padding: 15px 15px 10px 15px;
			border-bottom: 1px solid #f2f2f2;
			p:first-child {
				margin-bottom: 10px;
				font-size: 20px;
				font-weight: bold;
			}
			p:last-child {
				line-height: 25px;
				position: relative;
				span {
					color: #888888;
					font-size: 14px;	
				}
			}
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
			padding: 10px 20px;
			input {
				padding: 5px;
				border-radius: 5px;
				border: 1px solid #f2f2f2;
				font-size: 18px;
				width: 80%;
			}
			span {
				float: right;
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
</style>