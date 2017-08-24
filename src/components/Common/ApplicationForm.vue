<template>
	<div class="application-form">
		<div class="info">
		<!-- 	<div class="title-info">
				<h4>请填写报名信息</h4>
				<img src="../../../static/images/info_03.png" alt="">
			</div> -->
			<div class="input-info">
				<group gutter="0">
					<div v-for="(item, index) in inputData" :key="item.id">
						<!-- <div v-if="item.type === 1">
						<x-input :title="item.chnname" v-model="application[index]" :type="item.type | type" class="xinput"></x-input>
						</div> -->
						<div v-if="item.type === 1 && item.chnname === '手机'">
							<x-input :title="item.chnname" v-model="application[index]" type="number" class="xinput"></x-input>
						</div>
						<div v-else-if="item.type === 1">
							<x-input :title="item.chnname" v-model="application[index]" :type="item.type | type" class="xinput"></x-input>
						</div>

						<div v-if="item.type === 2 || item.type === 7" class="radio">
							<!-- <p>请选择{{item.chnname}}：</p> -->
							<p>{{item.chnname}}</p>
							<checker v-model="application[index]" default-item-class="radio-item" selected-item-class="radio-item-selected">
								<checker-item v-for="i in item.optionList" :key="item.id" :value="i">{{i}}</checker-item>
							</checker>

						</div>

						<div v-if="item.type === 3" class="checkbox">
							<p>{{item.chnname}}，多选</p>
							<checker v-model="application[index] = aa" type="checkbox" default-item-class="item" selected-item-class="item-selected">
								<checker-item v-for="i in item.optionList" :key="item.id" :value="i">{{i}}</checker-item>
							</checker>
						</div>

						<datetime  v-if="item.type === 4" v-model="application[index]" :title="item.chnname" class="time"></datetime>
					</div>
					
					<!-- <input type="file" name=""> -->
				</group>
				<group>
					<cell title="活动费用" :value="fee | pay" v-if="fee"></cell>
				</group>
				<!-- <p>{{aaa}}</p> -->
		<!-- 		<p>{{user.name}}</p>
				<p>{{user.mobile}}</p> -->
				<div class="btn">
					<!-- <button @click="isShow">取消</button> -->
					<button @click="saveSignUpInfo" v-if="fee">确认并支付</button>
					<button @click="saveSignUpInfo" v-else>确认</button>
				</div>
			</div>
		</div>	
		<!-- <div class="mask" @click="isShow"></div> -->
	</div>
</template>

<script>
	import { Group, XInput, Checker, CheckerItem, Datetime, Cell } from 'vux'
	import { mapActions, mapState } from 'vuex'
	import Btn from './btn'
	import api from '../../api/api'
	import axios from 'axios'
	import qs from 'qs'

	export default {
		components: {
			Group, XInput, Btn, Checker, CheckerItem, Datetime, Cell
		},
		// props: ['inputData'],
		data () {
			return {
				application: [],
				price: '',
				input: '',
				signUpInfo: {},
				demo: 1,
				aa: [],
				inputData: [],
				fee: '',
				isBtn: true,
				memberId: '',
				aaa: {},
				bbb: {},
				user: {},
				userName: '',
				userMobile: '',
			}
		},
		watch: {
			application: {
				handler (nVal, oVal) {
					console.log(this.application)
				},
				deep: true
			}
		},
		created () {
			this.getInfo()
			// this.setInfoSetting()
			this.getFee()
			setTimeout(() => {
				this.setInfoSetting()
			}, 300)
			
		},
		mounted () {

		},
		methods: {
			...mapActions([
				'updateLoadingStatus'
			]),
			// getUser () {
			// 	api.getInfo().then(res => {
			// 		console.log(res.data)
			// 		// alert('调用')

			// 		this.userInfo = res.data
			// 	})
			// },
			// 获取报名输入项
			setInfoSetting () {
				// alert(this.userName)
				this.updateLoadingStatus(true)
				api.SignUpInfoSetting({id: this.$route.params.id}).then(res => {
					console.log('活动报名输入项')
					console.log(res.data)
					this.inputData = res.data
					// let user = {}
					// api.getInfo().then(res => {
					// 	if (res.data) {
					// 		console.log('aaaaaaa')
					// 		user = res.data
					// 	}
					// })
					this.inputData.map((item, index) => {
						if (/姓名/.test(item.chnname) && this.userName) {
							// alert(this.userName)
							this.application[index] = this.userName
						} else if (/手机/.test(item.chnname) && this.userMobile) {
							// alert(this.userMobile)
							this.application[index] = this.userMobile
						} else {
							this.application[index] = null
						}
						// this.application[index] = null	
					})
					// this.huixian()
					console.log(this.application)
					this.updateLoadingStatus(false)
				})
				
			},
			huixian () {
				// console.log(this.user)
				if (this.inputData) {
					this.inputData.map((item, index) => {
						if (/姓名/.test(item.chnname) && this.userName) {
							// alert(this.userName)
							this.application[index] = this.userName
						} else if (/手机/.test(item.chnname) && this.userMobile) {
							// alert(this.userMobile)
							this.application[index] = this.userMobile
						} else {
							this.application[index] = null
						}
						// this.application[index] = null	
					})
				}
			},
			// 获取金额
			getFee () {
				this.updateLoadingStatus(true)
				api.ActivityDetail({id: this.$route.params.id}).then(res => {
					// console.log(res.data)
					this.fee = res.data.fee
					this.updateLoadingStatus(false)
				})
			},
			// 个人信息
			getInfo () {
				api.getInfo().then(res => {
					if (res.data) {
						this.memberId = res.data.id
						// this.user = res.data
						this.userName = res.data.name
						this.userMobile = res.data.mobile
					}
				})
			},
			// 保存报名资料
			saveSignUpInfo () {
				// let memberId = ''
				// api.getInfo().then(res => {
				// 	memberId = res.data.id
				// })
				// memberId = 'fsdffdfdsf'
				this.signUpInfo = this.inputData.map(item => ({
					activityId: item.activityId,
					settingId: item.id,
					memberId: this.memberId,
					name: item.chnname,
					sort: item.sort,
					type: item.type
				}))
				
				this.application.map((item, index) => {
					if (this.signUpInfo[index].type === 3) {
						if (item.constructor === Array) {
							let str = ''
							for (let i = 0; i < item.length; i++) {
								str += item[i] + ','
							}
							// let str2 = str.slice(0, -1)
							this.signUpInfo[index].value = str.slice(0, -1)
						} else {
							this.signUpInfo[index].value = item
						}
					} else {
						this.signUpInfo[index].value = item
					}
				})

				let complete = true
				for (let i = this.application.length; i >= 0; i--) {
					if (this.application[i] === '' || this.application[i] === null) {
						if (this.signUpInfo[i].type === 1) {
							this.showInfo('请填写' + this.signUpInfo[i].name)
							complete = false
						} else if (this.signUpInfo[i].type === 3) {
							this.showInfo('请至少选择一项' + this.signUpInfo[i].name)
							complete = false
						} else if (this.signUpInfo[i].type === 2 || this.signUpInfo[i].type === 4 || this.signUpInfo[i].type === 7) {
							this.showInfo('请选择' + this.signUpInfo[i].name)
							complete = false
						} else if (this.signUpInfo[i].type === 5) {
							this.showInfo('请上传图片')
							complete = false
						} else {
							complete = true
						}
					}
				}
				console.log(this.signUpInfo)

				if (complete) {
					let str = ''
					this.signUpInfo.map(item => {
						let data = {
							activityId: item.activityId,
							settingId: item.settingId,
							memberId: item.memberId,
							name: item.name,
							sort: item.sort,
							type: item.type,
							value: item.value
						}
						str += '&' + qs.stringify(data)
					})
					if (this.fee) {
						str += '&charge=true'
					} else {
						str += '&charge=false'
					}
					if (this.isBtn) {
						this.isBtn = false
						this.showInfo('资料正在提交 ，请稍等...')
						axios.post('/newsBase/activity!saveProfileSetting.action', str).then(res => {
							// let data = {
							// 	['vo.orderId']: this.util.getNewId(),
							// 	['vo.num']: this.fee * 100,
							// 	['vo.remark']: this.$route.params.id,
							// 	['vo.body']: this.memberId,
							// 	// orderType: 'pgh',
							// 	// payWay: 'Swiftpass',
							// }
							// this.aaa = data
							// console.log(data)
							// api.payInterface(data).then(res => {
							// 	alert(res.data)

							// })
							if (res.data) {
								// alert(res.data)
								if (/<html>/.test(res.data)) {
									this.showInfo('报名失败，请重新报名')
									this.isBtn = true
								} else if (res.data.successMsg == 0) {
									this.showInfo('报名成功')
									// alert(this.fee)
									if (this.fee) {
										this.showInfo('正在前往支付...')
										setTimeout(() => {
											// this.$router.push('/activity/ActivityPay/' + this.$route.params.id)
											
											let data = {
												['vo.orderId']: this.util.getNewId(),
												['vo.num']: this.fee * 100,
												['vo.remark']: this.$route.params.id,
												['vo.body']: this.memberId,
												['vo.orderType']: 'pgh',
												['vo.payWay']: 'Swiftpass',
												callBackUrl: "http://wfx.wego168.com/pgh/#/activity/ActivityDetail/" + this.$route.params.id,
											}
											this.aaa = data
											console.log(data)
											api.payInterface(data).then(res => {
												// alert(res.data)
												this.bbb = res.data.successMsg
												if (res.data.successMsg) {

													location.href = res.data.successMsg
												}
											})
										}, 300)
											
									} else {
										setTimeout(() => {
											this.$router.push('/activity/ActivityDetail/' + this.$route.params.id)
										}, 500)
									}
								}
							} else {
								this.showInfo('报名失败，请重新报名')
								this.isBtn = true
							}
						})
					}
				}	
			}
		},
		filters: {
			type (val) {
				switch (val) {
					case 1:
						return 'text'
						break
					case 2:
						return 'radio'
						break
					case 3:
						return 'checkbox'
						break
					case 4:
						return 'date'
						break
					case 5:
						return 'file'
						break
					default:
						return 'text'
				}
			},
			trim (val) {
				if (val.length > 0) {
					let str = val
					// let str = str.split('"')
					return str.split('"')
				}
				// let str = val.split('"')
				// return str
			},
			pay (val) {
				if (val) {
					return '￥' + val.toFixed(2)
				}
			},
		}
	}
</script>

<style lang="less">

  .vux-checker-box {
  	display: inherit;
  }
	.radio-item {
		display: inline-flex !important;
		align-items: center;
		margin-left: 25px;
		&:before {
			content: '';
			width: 15px;
			height: 15px;
			border-radius: 50%;
			background: #fff;
			border: 2px solid #999;
			display: inline-block;
			vertical-align: middle;
			margin-right: 5px;
		}
	}
	.radio-item-selected {
		display: inline-flex !important;
		align-items: center;
		&:before {
			width: 9px;
			height: 9px;
			border: 5px solid #00377e;
			vertical-align: middle;
		}
	}
	.item {
	  border: 1px solid #ececec;
	  padding: 5px 15px;
	  margin-right: 5px;
	}
	.item-selected {
	  border: 1px solid green;
	}
	.application-form {

		.info {

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
				.xinput {
					border-bottom: 1px solid #f2f2f2;
				}
				input {
					text-align: right;
				}
				.btn {
					display: flex;
					height: 40px;
					width: 100%;
					bottom: 0;
					border-top: 1px solid #ededed;
					margin-top: 50px;
					button {
						border: 0;
						outline: none;
						width: 100%;
						background-color: #00377e;
						font-size: 18px;
						color: #fff;
						margin: 0 15px;
					}
					.active {
						background: #6b6b6b;
					}
				}
				.radio, .checkbox {
					padding: 10px 15px;
					border-bottom: 1px solid #f2f2f2;
					p {
						margin-bottom: 5px;
					}
				}
				.radio {
					display: flex;
    			justify-content: space-between;
    			align-items: center;
				}
				.time {
					border-bottom: 1px solid #f2f2f2;
				}
			}
		}
	}
	
	
</style>