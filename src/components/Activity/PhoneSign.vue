<template>
	<div class="phone-sign">
		<img src="../../../static/images/logo.png" alt="">
		<!-- <p>请输入手机号签到</p> -->
		<group>
			<x-input title="手机" placeholder="请输入您的手机号签到" v-model="mobile" type="number">
				<i slot="label" class="iconfont icon-shouji" style="padding-right:10px;display:block;" width="30" height="30"></i>
			</x-input>
		</group>
		<button @click="sign">确定</button>
	</div>
</template>

<script>
	import { Group, XInput } from 'vux'
	import api from '../../api/api'

	export default {
		components: {
			Group, XInput
		},
		data () {
			return {
				mobile: '',
				status: true,
			}
		},
		methods: {
			sign () {
				if (this.mobile) {
					api.PhoneCheck({mobile: this.mobile}).then(res => {
						if (res.data) {
							if (this.status) {
								console.log(res.data) 
								this.showInfo(res.data)
								this.status = false
							} else {
								this.showInfo('请勿重复点击')
							}					
						} else {
							this.status = true
						}
						
					})
				} else {
					this.showInfo('请输入手机号')
				}
			}
		},
		watch: {
			mobile (nVal, oVal) {
				if (nVal !== oVal) {
					this.status = true
				}
			}
		}
	}
</script>

<style lang="less">
	.phone-sign {
		padding: 50px 20px;
		img {
			margin: 0 30% 40px 30%;
			width: 40%;
		}
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