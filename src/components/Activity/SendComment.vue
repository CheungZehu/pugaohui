<template>
	<div>
		<group gutter="0">
	    <x-textarea :placeholder="placeholder" :max="40" v-model="text"></x-textarea>
	  </group>
	  <!-- <p>{{id}}</p>
	  <p>{{name}}</p> -->
	  <!-- <p>{{headImgUrl}}</p> -->
	  <p @click="sendComment" class="send">发表评论</p>
	</div>
</template>

<script>
	import { Group, XTextarea } from 'vux'
	import api from '../../api/api'

	export default {
		components: {
			Group, XTextarea
		},
		data () {
			return {
				text: '',
				placeholder: '感觉这个活动怎么样？给您什么样的体验？说说您 的感想吧~（40字以内）',
				isBtn: true,
				id: '',
				name: '',
				headImgUrl: '',
			}
		},
		created () {
			this.getInfo()
		},
		methods: {
			getInfo () {
				api.getInfo().then(res => {
					if (res.data) {
						let data = res.data
						this.id = data.id
						this.name = data.name
						this.headImgUrl = data.headImgUrl
					}
				})
			},
			sendComment () {
				if (this.text) {
					let data = {
						activityId: this.$route.params.id,
						content: this.text,
						openId: this.id,
						nickname: this.name,
						headImgUrl: this.headImgUrl
					}
					if (this.isBtn) {
						this.isBtn = false
						api.saveComment(data).then(res => {

							this.showInfo('评论成功')
							setTimeout(() => {
								this.$router.push('/activity/ActivityDetail/' + this.$route.params.id)
							})
						})
					}
				} else {
					this.showInfo('请输入文字')

				}
			}
		},
	}
</script>

<style scoped>
	.send {
		line-height: 50px;
		margin: 50px 20px;
		background: #00377e;
		color: #fff;
		font-size: 18px;
		text-align: center;
	}
</style>