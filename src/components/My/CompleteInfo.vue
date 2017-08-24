<template>
	<div class="complete-info">
		<!-- <div class="bg"></div> -->
		<div class="title">
			<p>请完善您的个人资料</p>
			<div class="info">
				<group>
					<!-- <x-input title="姓名" v-model="userInfo['vo.name']" placeholder="请填写您的真实姓名"> -->
					<x-input title="姓名" v-model="userInfo.name" placeholder="请填写您的真实姓名">
						<i slot="label" class="iconfont icon-wode1" style="padding-right:10px;display:block;" width="30" height="30"></i>
					</x-input>
					<!-- <x-input title="手机"  v-model="userInfo['vo.mobile']" placeholder="请填写您的手机" type="number">disabled -->
					<x-input title="手机" disabled v-model="userInfo.mobile" placeholder="请填写您的手机" type="number">
						<i slot="label" class="iconfont icon-shouji" style="padding-right:10px;display:block;" width="30" height="30"></i>
					</x-input>
					<!-- <x-input title="公司" v-model="userInfo['vo.department']" placeholder="请填写公司全称"> -->
					<x-input title="公司" v-model="userInfo.department" placeholder="请填写公司全称">
						<i slot="label" class="iconfont icon-gongsi" style="padding-right:10px;display:block;" width="30" height="30"></i>
					</x-input>
					<!-- <x-input title="职务" v-model="userInfo['vo.position']" placeholder="请填写您的职务"> -->
					<x-input title="职务" v-model="userInfo.position" placeholder="请填写您的职务">
						<i slot="label" class="iconfont icon-zhiwei" style="padding-right:10px;display:block;" width="30" height="30"></i>
					</x-input>
				</group>
				<!-- <input type="hidden" name="vo.company"> -->
			</div>
			<button @click="addInfo">提交</button>
			<p class="tiaoguo">
				<span @click="tiaoguo" class="tiaoguo">跳过</span>
			</p>
			
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
					position: ''
				},
				user: {
					name: '',
					mobile: '',
					department: '',
					position: ''
				},
				isBtn: true,
			}
		},
		created () {
			let mobile = localStorage.getItem('mobile')
			console.log(mobile)
			// this.userInfo['vo.mobile'] = mobile
			this.userInfo.mobile = mobile
		},
		methods: {
			addInfo () {
				// this.isBtn = false
				// console.log(11)
				if (this.userInfo.name === '') {
				// if (this.userInfo['vo.name'] === '') {
					this.showInfo('请填写姓名')
				} else if (this.userInfo.mobile === '') {
				// } else if (this.userInfo['vo.mobile'] === '') {
					this.showInfo('请填写手机')
				} else if (this.userInfo.department === '') {
				// } else if (this.userInfo['vo.department'] === '') {
					this.showInfo('请填写公司')
				} else if (this.userInfo.position === '') {
				// } else if (this.userInfo['vo.position'] === '') {
					this.showInfo('请填写职务')
				} else {
					// this.showInfo('提交中')
					if (this.isBtn) {
						this.isBtn = false
						// this.util.debounce(this.setScroll(), 5000, false)
						api.addInfo(this.userInfo).then(res => {
							// this.isBtn = false
							console.log(res.data)
							if (res.data) {
								if (/html/.test(res.data)) {
									this.showInfo('保存失败，请重新提交')
									this.isBtn = true
								} else {
									localStorage.clear()
									setTimeout(() => {
										this.showInfo('保存成功')
									}, 200)
									
									console.log(res.data)
									setTimeout(() => {
										this.$router.push('/myInfo')
										// this.isBtn = true
									}, 800)
									
								}
							} else {
								this.showInfo('保存失败，请重新提交')
								this.isBtn = true
							}
						})
					}
				}
			},
			tiaoguo () {
				// alert(2)
				api.addInfo({mobile: this.userInfo.mobile}).then(res => {
					if (res.data) {
						if (/html/.test(res.data)) {
							this.showInfo('跳过失败，请重新点击')
							this.isBtn = true
						} else {
							localStorage.clear()
							// setTimeout(() => {
							// 	this.showInfo('保存成功')
							// }, 200)
							
							// console.log(res.data)
							setTimeout(() => {
								this.$router.push('/myInfo')
								// this.isBtn = true
							}, 500)
						}
					} else {
						this.showInfo('跳过失败，请重新点击')
						this.isBtn = true
					}
				})
			},
		}
	}
</script>

<style lang="less">
	.complete-info {

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
			.tiaoguo {
				text-align: right;
				margin-top: 20px;
			}
		}
	}
</style>