<template>
	<div class="login">
		<img src="../../../static/images/logo.png" alt="">
		<group>
			<x-input title="手机" placeholder="请输入手机号码" type="number" v-model="form.tel">
				<i slot="label" class="iconfont icon-shouji" style="padding-right:10px;display:block;" width="30" height="30"></i>
			</x-input>
			
		</group>
		<group>
			<x-input title="密码" placeholder="请输入密码" type="text" v-model="form.pwd"  @keyup.native="form.pwd = form.pwd.replace(/[^\w\.\/]/ig,'')">
				<i slot="label" class="iconfont icon-mima" style="padding-right:10px;display:block;" width="30" height="30"></i>
				<!-- <x-button class="vcode_btn" v-show="showBtn" slot="right" type="primary" mini @click.native="getVcode">获取</x-button>
				<x-button class="vcode_btn" v-show="!showBtn" slot="right" mini plain type="primary" style="margin-top: 0;" @click.native="getVcode">60</x-button> -->
			</x-input>
		</group>
		<button class="btn" @click="login">登录</button>
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
					pwd: ''
				}
			}
		},
		// watch: {
		// 	this.form.pwd
		// },
		methods: {
			show: function (ev) {
				console.log(2)
			},
			getVcode () {
				var reg = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
				// reg.test(ValidateCode) 
				// this.showBtn = !this.showBtn;
				this.showBtn = reg.test(this.phone) ? false : true
			},
			judgment (val) {
				val=val.replace(/[^\w\.\/]/ig,'')
			},
			login () {
				var reg = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
				if (this.form.tel === '') {
					this.$vux.toast.show({
						text: '请输入手机号码',
						type: 'text'
					})
				} else if (!reg.test(this.form.tel)) {
					this.$vux.toast.show({
						text: '请输入正确的手机号码',
						type: 'text'
					})
				} else if (this.form.pwd === '') {
					this.$vux.toast.show({
						text: '请输入密码',
						type: 'text'
					})
				} else {
					alert('登陆')
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
	.login {
		background-color: #f2f2f2;
		padding: 70px 40px;
		img {
			margin: 0 30% 40px 30%;
			width: 40%;
		}
		.weui-cells {
			border-left: 1px solid #D9D9D9;
			border-right: 1px solid #D9D9D9;
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
		color: #00377e !important;
    border: 1px solid #00377e !important;
	}
	
</style>