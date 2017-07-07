<template>
	<div class="activity-pay">
		<div class="title-text">
			<div class="title">
				<h3>支付详情</h3>
				<p class="time">2016-25-65 54.65</p>
			</div>
			<div class="money">
				<p>活动费用： <span>￥</span><span>800</span></p>
			</div>
		</div>
		<div class="activity-item">
			<ul>
				<li>
					<span>活动名称：</span>
					<span>广州市番禺区青蓝街22</span>
				</li>
				<li>
					<span>活动日期：</span>
					<span>2016-09-30 24:00</span>
				</li>
				<li>
					<span>活动地点：</span>
					<span>广州市番禺区青蓝街22号超谷科技园 超谷展厅</span>
				</li>
				<li>
					<span>收费方式：</span>
					<span>微信支付</span>
				</li>
			</ul>
			<button>微信支付</button>
		</div>
	</div>
</template>

<style lang="less">
	.activity-pay {
		background-color: #fff;
		position: fixed;
		top: 20px;
		bottom: 150px;
		left: 20px;
		right: 20px;
		.title-text {
			border-bottom: 1px solid #f2f2f2;
			padding: 10px 20px;
			.title {
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
						color: #00377e;
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
					padding: 3px 0;
					display: flex;
					span:first-child {
						flex-basis: 110px;
					}
					span:last-child {
						width: 100%;
						text-align:right;
					}
				}
			}
			button {
				margin-top: 50px;
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