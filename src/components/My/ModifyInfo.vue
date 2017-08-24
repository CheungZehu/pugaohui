<template>
	<div class="modify-info">
		<!-- <div class="bg"></div> -->
		<div class="title">
			<p>您可以点击修改您的个人资料</p>
			<div class="info">
				<group>
					<x-input title="姓名" v-model="userInfo.name" placeholder="请填写您的真实姓名">
						<i slot="label" class="iconfont icon-wode1" style="padding-right:10px;display:block;" width="30" height="30"></i>
					</x-input>
					<x-input title="手机" v-model="userInfo.mobile" placeholder="请填写您的手机" type="number">
						<i slot="label" class="iconfont icon-shouji" style="padding-right:10px;display:block;" width="30" height="30"></i>
					</x-input>
					<x-input title="公司" v-model="userInfo.department" placeholder="请填写公司全称">
						<i slot="label" class="iconfont icon-gongsi" style="padding-right:10px;display:block;" width="30" height="30"></i>
					</x-input>
					<x-input title="职务" v-model="userInfo.position" placeholder="请填写您的职务">
						<i slot="label" class="iconfont icon-zhiwei" style="padding-right:10px;display:block;" width="30" height="30"></i>
					</x-input>
				</group>
			</div>
			<button @click="modifyInfo">确定</button>
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
					name: '',
					mobile: '',
					department: '',
					position: '',
					id: ''
				},
				isBtn: true
			}
		},
		created () {
			// let id = '4817d9aa4dd74914a070045ce51858f4'
			// this.loading(true)
			this.setInfo()
		},
		methods: {
			setInfo () {
				// let ids = {id:id}
				api.getInfo().then(res => {
					// if (!res.data) {
					// 	// this.loading(true)
					// } 
					if (res.data) {
						// this.loading(false)
						// console.log(res.data)
						let data = res.data
						this.userInfo.name = data.name
						this.userInfo.mobile = data.mobile
						this.userInfo.department = data.department
						this.userInfo.position = data.position
						this.userInfo.id = data.id
					}
				})
			},
			modifyInfo () {
				if (this.userInfo.name === '') {
					this.showInfo('请填写姓名')
				} else if (this.userInfo.mobile === '') {
					this.showInfo('请填写手机')
				} else if (this.userInfo.department === '') {
					this.showInfo('请填写公司')
				} else if (this.userInfo.position === '') {
					this.showInfo('请填写职务')
				} else {
					if (this.isBtn) {
						api.addInfo(this.userInfo).then(res => {
							this.isBtn = false
							if (/html/.test(res.data)) {
								this.showInfo('修改失败，请重新提交')
								this.isBtn = true
							}
							if (res.data) {
								this.showInfo('修改成功')

								setTimeout(() => {
									this.$router.push('/myInfo')
								}, 500)
							} else {
								this.showInfo('修改失败，请重新提交')
								this.isBtn = true
							}
						})
					}
				}
			}
		}
	}
</script>

<style lang="less">
	.modify-info {

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
			padding: 30px 20px 0 20px;
			p {
				text-align: center;
				color: #333333;
			}
			.info {
				border-left: 1px solid #f2f2f2;
				border-right: 1px solid #f2f2f2;
				margin: 20px 0;
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