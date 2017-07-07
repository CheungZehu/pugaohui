<template>
	<div class="application-form" id="mask" @touchmove="mask">
		<div class="info">
			<div class="title-info">
				<h4>请填写报名信息</h4>
				<img src="../../../static/images/info_03.png" alt="">
			</div>
			<div class="input-info">
				<group>
					<x-input title="姓名" v-model="application.name" placeholder="请填写真实姓名" type="text"></x-input>
					<x-input title="手机" v-model="application.phone" placeholder="请填写您的手机" type="number"></x-input>
					<x-input title="公司" v-model="application.company" placeholder="请填写公司全称"></x-input>
					<x-input title="职务" v-model="application.duties" placeholder="请填写您的职务"></x-input>
				</group>
				<div class="btn">
					<button>取消</button>
					<button>确认</button>
				</div>
			</div>
		</div>
		<div class="mask"></div>
	</div>
</template>

<script>
	import { Group, XInput } from 'vux'

	export default {
		components: {
			Group, XInput
		},
		data () {
			return {
				application: {
					name: '',
					phone: '',
					company: '',
					duties: ''
				}
			}
		},
		methods: {
			mask(e) {
					e.preventDefault()
			}
		}
	}
</script>

<style lang="less">
	.application-form {
		z-index: 1000;
		position: fixed;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		.mask {
			background-color: rgba(0, 0, 0, 0.5);
			height: 100%;
		}
		.info {
			z-index: 1001;
			background-color: #fff;
			width:80%;
			height: 420px;
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			border-radius:10px;
			overflow: hidden;
			.title-info {
				background-color: #00377e;
				display: flex;
				flex-direction: column;
				h4 {
					text-align: center;
					margin: 20px 0;
					color: #fff;
				}
				img {
					width: 50%;
					margin: 0 auto;
					align-self:flex-end;
				}
			}
			.input-info {
				.btn {
					display: flex;
					height: 40px;
					position: absolute;
					width: 100%;
					bottom: 0;
					border-top: 1px solid #ededed;
					button {
						border: 0;
						outline: none;
						width: 50%;
						background-color: #fff;
						font-size: 16px;
						color: #00377e;
						&:first-child {
							border-right: 1px solid #ededed;
							color: #999999;
						}
					}
				}
			}
		}
	}
</style>