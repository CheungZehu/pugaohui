<template>
	<div class="sign-success">
		<i>图标</i>
		<h4>签到成功</h4>
		<div class="text">
			<p>您已经成功签到,欢迎您的到来,赶快入座吧~</p>
		</div>
		<button>好的</button>
	</div>
</template>

<style lang="less">
	.sign-success {
		background-color: #fff;
		position: fixed;
		top: 20px;
		bottom: 20px;
		left: 20px;
		right: 20px;
		padding: 50px 20px;
		text-align: center;
		h4 {
			line-height: 40px;
		}
		.text {
			margin: 50px 30px;
			color: #666666;
		}
		button {
			width: 100%;
			background-color: #00377e;
			border: none;
			outline: none;
			color: #fff;
			line-height: 40px;
			font-size: 18px;
		}
	}
</style>