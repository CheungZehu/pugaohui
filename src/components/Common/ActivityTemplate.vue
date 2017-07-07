<template>
	<div class="activity-item">
		<div class="img">
			<img src="../../../static/images/biaotitu_03.png" alt="">
		</div>
		<div class="title">
			<p class="title-text">北美唯一18洞正反皆北美唯一18洞正反皆北美唯一18洞正反皆北美唯一18洞正反皆北美唯一18洞正反皆</p>
			<p class="title-time">2017-07-01<span class="status start">报名中</span></p>
		</div>
	</div>
</template>

<style lang="less" scoped>
	.activity-item {
		padding: 20px;
		position: relative;
		overflow: auto;
		border-top: 1px solid #f2f2f2;
		background-color: #fff;
		.title {
			float: right;
			display: inline-block;
			width: 60%;
			.title-text {
				display: -webkit-box;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: 2;
				overflow: hidden;
			}
			.title-time {
				color: #9ea09f;
				font-size: 14px;
				position: absolute;
				bottom: 20px;
				.status {
					padding: 1px 5px;
					color: #fff;
					margin-left: 5px;
					border-radius: 2px;
				}
				.sign-up {
					background-color: #be0000;
				}
				.start {
					background-color: #5eae00;
				}
				.end {
					background-color: #666666;
				}
			}
		}

		.img {
			display: inline-block;
			line-height: 0;
			width: 35%;
			img {
				width: 100%;
			}
		}
	}
</style>