<template>
	<div class="complete-info">
		<div class="bg"></div>
		<div class="title">
			<h4>请完善您的个人资料</h4>
			<div class="info">
				<group>
					<x-input title="姓名" v-model="userInfo['vo.name']" placeholder="请填写您的真实姓名">
						<i slot="label" class="iconfont icon-wode1" style="padding-right:10px;display:block;" width="30" height="30"></i>
					</x-input>
					<x-input title="手机" v-model="userInfo['vo.mobile']" placeholder="请填写您的手机" type="number">
						<i slot="label" class="iconfont icon-shouji" style="padding-right:10px;display:block;" width="30" height="30"></i>
					</x-input>
					<x-input title="公司" v-model="userInfo['vo.department']" placeholder="请填写公司全称">
						<i slot="label" class="iconfont icon-gongsi" style="padding-right:10px;display:block;" width="30" height="30"></i>
					</x-input>
					<x-input title="职务" v-model="userInfo['vo.position']" placeholder="请填写您的职务">
						<i slot="label" class="iconfont icon-zhiwei" style="padding-right:10px;display:block;" width="30" height="30"></i>
					</x-input>
				</group>
			</div>
			<button @click="addInfo">提交</button>
		</div>
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
				userInfo: {
					'vo.name': '',
					'vo.mobile': '',
					'vo.department': '',
					'vo.position': ''
				}
			}
		},
		methods: {
			addInfo () {
				if (this.userInfo['vo.name'] === '') {
					this.showInfo('请填写姓名')
				} else if (this.userInfo['vo.mobile'] === '') {
					this.showInfo('请填写手机')
				} else if (this.userInfo['vo.department'] === '') {
					this.showInfo('请填写公司')
				} else if (this.userInfo['vo.position'] === '') {
					this.showInfo('请填写职务')
				} else {
					api.addInfo(this.userInfo).then(res => {
						if (/html/.test(res.data)) {
							this.showInfo('保存失败，请重新提交')
						}
						if (res.data) {
							this.showInfo('保存成功')
							console.log(res.data)
						}
					})
				}
			}
		}
	}
</script>

<style lang="less">
	.complete-info {
		margin: 0 20px;
		.bg {
			position: fixed;
			top: 0;
			bottom: 0;
			left: 0;
			right: 0;
			background-color: #fff;
			z-index: -1;
		}
		.title {
			margin-top: 60px;
			h4 {
				text-align: center;
				color: #333333;
			}
			.info {
				border-left: 1px solid #f2f2f2;
				border-right: 1px solid #f2f2f2;
				margin: 20px 0;
				.iconfont:before {
					font-size: 24px;
				}
			}
			button {
				width: 100%;
				background-color: #00377e;
				border: none;
				outline: none;
				color: #fff;
				line-height: 40px;
				font-size: 20px;
				margin-top: 40px;
			}
		}
	}
</style>