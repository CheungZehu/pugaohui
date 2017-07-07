<template>
	<div class="rigister">
		<img src="../../../static/images/logo.png" alt="">
		<group>
			<x-input v-model="form.tel" title="手机" placeholder="请输入手机号" required>
				<i slot="label" class="iconfont icon-shouji" style="padding-right:10px;display:block;" width="30" height="30"></i>
			</x-input>
			
		</group>
		<group>
			<x-input v-model="form.vcode" title="验证码" placeholder="请输入验证码" required>
				<i slot="label" class="iconfont icon-mima" style="padding-right:10px;display:block;" width="30" height="30"></i>
				<x-button class="vcode_btn" v-show="showBtn" slot="right" type="primary" mini @click.native="getVcode">获取</x-button>
				<x-button class="vcode_btn" v-show="!showBtn" slot="right" mini plain type="primary" style="margin-top: 0;" @click.native="getVcode">{{number}}</x-button>
			</x-input>
		</group>
		<button class="btn" @click="register">注册</button>
	</div>
</template>

<script>
	import { Group, XInput, XButton } from 'vux'
	import api from '../../api/api'

	export default {
		components: {
			Group, XInput, XButton
		},
		data () {
			return {
				form: {
					tel: '',
					vcode: ''
				},
				number: 60,
				showBtn: true,
			}
		},
		methods: {
			// 获取验证码
			getVcode () {
				var reg = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
				if (!reg.test(this.form.tel)) {
					this.$vux.toast.show({
						text: '请输入正确的手机号码',
						type: 'text'
					})
					return false
				}
				this.showBtn = false
				var interval = setInterval(function () {
					if (this.number > 0) {
						this.number--
					} else {
						clearInterval(interval)
						this.showBtn = true
						this.number = 60
					}
				}.bind(this), 1000)
			},
			// 注册
			register () {
				if (this.form.tel === '') {
					this.$vux.toast.show({
						text: '请输入手机号码',
						type: 'text'
					})
				} else if (this.form.vcode === '') {
					this.$vux.toast.show({
						text: '请输入验证码',
						type: 'text'
					})
				} else {
					alert('注册')
				}
			}
		}
	}
</script>

<style lang="less">
	.vcode_btn {
		background-color: #00377e;
		font-size: 15px !important;
		height: 25px;
		line-height: 25px !important;
		margin-top: 0;
		width: 70px !important;
	}
	.rigister {
		background-color: #f2f2f2;
		padding: 70px 40px;
		img {
			margin: 0 30% 40px 30%;
			width: 40%;
		}

		.btn {
			width: 100%;
			margin-top: 80px;
			background-color: #00377e;
			border: none;
			outline: none;
			color: #fff;
			line-height: 40px;
			font-size: 18px;
		}
	}
	.weui-btn_plain-primary {
		color: #000 !important;
    border: 1px solid #00377e !important;
	}
	.weui-btn_primary:not(.weui-btn_disabled):active {
		background-color: #00377e !important;
	}
	.weui-cells {
		border-left: 1px solid #d9d9d9;
		border-right: 1px solid #d9d9d9;
	}
</style>

<!-- 	.weui-btn_plain-primary {
		color: #00377e !important;
    border: 1px solid #00377e !important;
	} -->