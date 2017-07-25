<template>
	<div class="application-form" id="mask" @touchmove="mask">
		<div class="info">
			<div class="title-info">
				<h4>请填写报名信息</h4>
				<img src="../../../static/images/info_03.png" alt="">
			</div>
			<div class="input-info">
				<group>

					<div v-for="(item, index) in inputData" :key="item.id">
						<x-input v-if="item.type === 1" :title="item.chnname" v-model="application[index]" :type="item.type | type"></x-input>

						<div v-if="item.type === 2" class="radio">
							<p>请选择{{item.chnname}}：</p>
							<checker v-model="application[index]" default-item-class="item" selected-item-class="item-selected">
								<checker-item v-for="i in item.optionList" :key="item.id" :value="i">{{i}}</checker-item>
							</checker>
						</div>

						<div v-if="item.type === 3" class="checkbox">
							<p>请选择{{item.chnname}}，多选</p>
							<checker v-model="application[index] = aa" type="checkbox" default-item-class="item" selected-item-class="item-selected">
								<checker-item v-for="i in item.optionList" :key="item.id" :value="i">{{i}}</checker-item>
							</checker>
						</div>

						<datetime  v-if="item.type === 4" v-model="application[index]" :title="item.chnname"></datetime>
					</div>
					
					<!-- <input type="file" name=""> -->
				</group>
				<div class="btn">
					<button @click="isShow">取消</button>
					<button @click="saveSignUpInfo">确认</button>
				</div>
			</div>
		</div>
		<div class="mask" @click="isShow"></div>
	</div>
</template>

<script>
	import { Group, XInput, Checker, CheckerItem, Datetime } from 'vux'
	import Btn from './btn'
	import api from '../../api/api'
	import axios from 'axios'
	import qs from 'qs'

	export default {
		components: {
			Group, XInput, Btn, Checker, CheckerItem, Datetime
		},
		props: ['inputData'],
		data () {
			return {
				application: [],
				price: '',
				input: '',
				signUpInfo: {},
				demo: 1,
				aa: [],
				
			}
		},
		// watch: {
		// 	application: {
		// 		handler(v) {
		// 			console.log(v)
		// 		},
		// 		deep: true
		// 	}
		// },
		methods: {
			mask(e) {
				// e.preventDefault()
				if (e.cancelable) {
	        // 判断默认行为是否已经被禁用
	        if (!e.defaultPrevented) {
	            e.preventDefault();
	        }
		    }
			},
			isShow() {
				this.$emit('isShow')
			},
			saveSignUpInfo () {
				let memberId = ''
				api.getInfo().then(res => {
					memberId = res.data.id
				})
				memberId = 'fsdfsf'
				this.signUpInfo = this.inputData.map(item => ({
					activityId: item.activityId,
					settingId: item.id,
					memberId: memberId,
					name: item.chnname,
					sort: item.sort,
					type: item.type
				}))
				this.application.map((item, index) => {
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
					
				})
				// console.log(this.application)
				// console.log(this.signUpInfo)

				let complete = true
				this.signUpInfo.map(item => {
					if (item.value === '' || item.value === undefined || item.value === null) {
						if (item.type === 3) {
							this.showInfo('请至少选择一项' + item.name)
							complete = false
						} else if (item.type === 2 || item.type === 4) {
							this.showInfo('请选择' + item.name)
							complete = false
						} else if (item.type === 5) {
							this.showInfo('请上传图片')
							complete = false
						} else if (item.type === 1) {
							this.showInfo('请填写' + item.name)
							complete = false
						} else {
							complete = true
						}
					}
				})
				// console.log(complete)
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
					axios.post('/newsBase/activity!saveProfileSetting.action', str).then(res => {
						console.log(res.data)
						if (res.data) {
							this.isShow()
							this.showInfo('报名成功')
						}
							
					})
				}

					
				// let activityId = [],
				// 		settingId = [],
				// 		memberId = [],
				// 		name = [],
				// 		sort = [],
				// 		type = []
				// this.inputData.map(item => {
				// 	activityId.push(item.activityId)
				// 	settingId.push(item.id)
				// 	memberId.push(openId)
				// 	name.push(item.chnname)
				// 	sort.push(item.sort)
				// 	type.push(item.type)
				// })
				// console.log(name)
				// console.log(this.application)
				// if (this.application.length !== name.length) {
				// 	for (let i = 0; i < name.length; i++) {
				// 		if (this.application[i] === '' || this.application[i] === undefined || this.application[i].length === 0) {
				// 			if (i === 4) return
				// 			this.showInfo('请填写或选择' + name[i])
				// 		}
				// 	}
				// }
				// this.signUpInfo.activityId = activityId
				// this.signUpInfo.settingId = settingId
				// this.signUpInfo.memberId = memberId
				// this.signUpInfo.name = name
				// this.signUpInfo.sort = sort
				// this.signUpInfo.type = type
				// this.signUpInfo.value = this.application
				// console.log(activityId)
				
				
				// console.log(this.signUpInfo)
				// console.log(this.application)

				// api.saveSignUpInfo(this.signUpInfo).then(res => {
				// 	console.log(res.data)
				// })
				// let str = 
				
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
			}
		}
	}
</script>

<style lang="less">
	.item {
	  border: 1px solid #ececec;
	  padding: 5px 15px;
	}
	.item-selected {
	  border: 1px solid green;
	}
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
				.radio, .checkbox {
					padding: 10px 15px;
					border: 1px solid #f2f2f2;
					p {
						margin-bottom: 5px;
					}
				}
			}
		}
	}
</style>