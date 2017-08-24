<template>
<div>
	<div style="height: 20px;"></div>
	<div class="activity-pay">
		<div class="title-text">
			<div class="title">
				<p>支付详情</p>
				<!-- <p class="time">2016-25-65 54.65</p> -->
			</div>
			<div class="money">
				<p>活动费用： <span>￥</span><span>{{payInfo.fee}}</span></p>
			</div>
		</div>
		<div class="activity-item">
			<ul>
				<li>
					<span>活动名称：</span>
					<span>{{payInfo.title}}</span>
				</li>
				<li>
					<span>活动日期：</span>
					<span>{{payInfo.startTime}}</span>
				</li>
				<li>
					<span>活动地点：</span>
					<span>{{payInfo.place}}</span>
				</li>
				<li>
					<span>收费方式：</span>
					<span>微信支付</span>
				</li>
			</ul>
			<button @click="getPay">微信支付</button>
		</div>
	</div>
</div>
</template>

<script>
	import api from '../../api/api'

	export default {
		data () {
			return {
				payInfo: {},
				openId: '',
			}
		},
		created () {
			this.getPayInfo()
			this.getOpenId()
		},
		methods: {
			getPayInfo () {
				api.payInfo({id: this.$route.params.id}).then(res => {
					console.log(res.data)
					this.payInfo = res.data
				})
			},
			getOpenId () {
				api.getInfo().then(res => {
					this.openId = res.data.openId
				})
			},
			getPay () {
				let data = {
					orderId: this.util.getNewId(),
					num: this.payInfo.fee.toFixed(2),
					remark: this.$route.params.id,
					body: this.openId
				}
				console.log(data)
				api.payInterface(data).then(res => {
					console.log(res.data)
				})
			}
		}
	}
</script>

<style lang="less">
	.activity-pay {
		background-color: #fff;
		margin: 0 20px 20px 20px;
		.title-text {
			border-bottom: 1px solid #f2f2f2;
			padding: 10px 20px;
			.title {
				p {
					font-size: 24px;
				}
				.time {
					color: #6a6a6a;
					font-size: 14px;
				}
			}
			.money {
				margin: 30px 0;
				text-align: center;
				p {
					color: #6a6a6a;
					span:first-child {
						color: #000;
						font-size: 26px;
					}
					span:last-child {
						color: rgb(237, 153, 2);
						font-size: 44px;
					}
				}
			}
		}
		.activity-item {
			background-color: #fff;
			padding-top: 20px;
			padding: 0 20px;
			ul {
				padding: 10px 0;
				list-style: none;
				li {
					padding: 10px 0;
					display: flex;
					span:first-child {
						flex-basis: 130px;
					}
					span:last-child {
						width: 100%;
						text-align:right;
					}
				}
			}
			button {
				margin: 50px 0;
				width: 100%;
				background-color: #00377e;
				border: none;
				outline: none;
				color: #fff;
				line-height: 40px;
				font-size: 18px;
			}
		}
	}
</style>