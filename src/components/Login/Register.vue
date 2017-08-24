<template>
	<div class="rigister">
		<img src="../../../static/images/logo.png" alt="">
		<group>
			<x-input class="left" v-model="form.mobile" title="手机" placeholder="请输入手机号" required>
				<i slot="label" class="iconfont icon-shouji" style="padding-right:10px;display:block;" width="30" height="30"></i>
			</x-input>
			
		</group>
		<group>
			<x-input v-model="form.validateCode" title="验证码" placeholder="请输入验证码" required class="left" type="number">
				<i slot="label" class="iconfont icon-mima" style="padding-right:10px;display:block;" width="30" height="30"></i>
				<x-button class="vcode_btn" v-show="showBtn" slot="right" type="primary" mini @click.native="getVcode">获取</x-button>
				<x-button class="vcode_btn" v-show="!showBtn" slot="right" mini plain type="primary" style="margin-top: 0;" >{{number}}</x-button>
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
					mobile: '',
					validateCode: ''
				},
				'vo.mobile': '',
				number: 60,
				showBtn: true,
				isBtn: true
			}
		},
		methods: {
			// 获取验证码
			getVcode () {
				// var reg = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
				// if (!reg.test(this.form.mobile)) {
				// 	this.$vux.toast.show({
				// 		text: '请输入正确的手机号码',
				// 		type: 'text'
				// 	})
				// 	return false
				// }
				console.log(this.form)
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
				api.getValidateCode({'vo.phone': this.form.mobile}).then(res => {
					console.log(res.data)
				})
			},
			// 注册
			register () {
				if (this.form.mobile === '') {
					this.$vux.toast.show({
						text: '请输入手机号码',
						type: 'text'
					})
				} else if (this.form.validateCode === '') {
					this.$vux.toast.show({
						text: '请输入验证码',
						type: 'text'
					})
				} else {
					if (this.isBtn) {
						this.isBtn = false
						localStorage.setItem('mobile', this.form.mobile)
						// this.$router.push('/my/CompleteInfo')
						api.verifyValidateCode(this.form).then(res => {
							if (res.data) {
								console.log(res.data)
								if (res.data.successMsg === '验证码正确') {
									localStorage.setItem('mobile', this.form.mobile)
									this.$router.push('/my/CompleteInfo')
								} else if (res.data.errorMsg === '验证码错误或超时') {
									this.showInfo('验证码错误或超时，请重新获取')
									this.isBtn = true
								}
								
								// this.$router.push('/my/CompleteInfo')
							}
						})
					}
				}
			}
		}
	}
</script>

<style lang="less" scoped>
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
		color: #fff !important;
		background: #999;
    	border: 1px solid #999 !important;
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