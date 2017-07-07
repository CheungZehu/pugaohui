<template>
	<div class="phone-sign">
		<i>图标</i>
		<p>请输入手机号签到</p>
		<group>
			<x-input title="手机" placeholder="请输入您的手机号"></x-input>
		</group>
		<button>确定</button>
	</div>
</template>

<script>
	import { Group, XInput } from 'vux'

	export default {
		components: {
			Group, XInput
		}
	}
</script>

<style lang="less">
	.phone-sign {
		background-color: #fff;
		position: fixed;
		top: 20px;
		bottom: 20px;
		left: 20px;
		right: 20px;
		padding: 50px 20px;
		p {
			margin-top: 30px;
			color: #666666;
		}
		.weui-cells {
			margin: 5px 0 80px 0;
			border-left: 1px solid #D9D9D9;
			border-right: 1px solid #D9D9D9;
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