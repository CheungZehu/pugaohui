<template>
	<div class="my">
		<div class="my-head">
			<!-- <img src="../../../static/images/touxiang_03.png" alt=""> -->
			<img :src="userInfo.headImgUrl" alt="">
			<div class="user">
				<p class="user-name">{{userInfo.name}}</p>
				<p>{{userInfo.position}}</p>
				<p>{{userInfo.department}}</p>
			</div>
		</div>
		<div class="my-list">
			<group>
				<cell title="我参加的活动" :link="{path: '/my/Participate'}">
					<i slot="icon" class="iconfont icon-canjia" style="padding-right:10px;display:block;" width="30" height="30"></i>
				</cell>
<!-- 				<cell title="我发布的活动" is-link>
					<i slot="icon" class="iconfont icon-fabu" style="padding-right:10px;display:block;" width="30" height="30"></i>
				</cell> -->
			</group>
			<group>
				<!-- <cell title="完善资料" :link="{path: '/my/CompleteInfo'}">
					<i slot="icon" class="iconfont icon-canjia" style="padding-right:10px;display:block;" width="30" height="30"></i>
				</cell> -->
				<cell title="修改资料" :link="{path: '/my/ModifyInfo'}">
					<i slot="icon" class="iconfont icon-fabu" style="padding-right:10px;display:block;" width="30" height="30"></i>
				</cell>
			</group>
		</div>
		<!-- <p>{{userInfo}}</p> -->
		<!-- <p class="out">退出登录</p> -->
	</div>
</template>

<script>
	import { Group, Cell } from 'vux'
	import api from '../../api/api'

	export default {
		components: {
			Group, Cell
		},
		data () {
			return {
				userInfo: {},
				user: {
					name: '',
					img: '',
					position: '',
					department: ''
				}
			}
		},
		created () {
			this.getUser()
			this.configWxSdk()
		},
		methods: {
			loadJsapiTicketSign (jsApiList) {
				let signUrl = location.href.split('#')[0]
				api.getWeixin({url: signUrl}).then(res => {
					this.configApiList(res.data, jsApiList)
				})
			},
			configWxSdk () {
				this.$wechat.ready(() => {
					let dataForWeixin = {
						title: '普高会体育个人中心',
						desc: '广东普高会体育发展有限公司，简称普高会“PGH”，一个普及高尔夫文化的商务社交平台。',
						link: `http://wfx.wego168.com/wx7d3c9e2d28015f9c/wechat/newsBase/urlSkipAction!accreditPghCenter.action?oauthTypeBase=false`,
						imgUrl: `http://s1.wego168.com/imgApp/upload/wx7d3c9e2d28015f9c/img/12ed9f835b504311962c2d0b0b4369d3.png`,
						success: () => {

						},
						cancel: () => {

						},
					}
					this.$wechat.onMenuShareTimeline(dataForWeixin)
					this.$wechat.onMenuShareAppMessage(dataForWeixin)
				})
				this.$wechat.error(() => {
					// alert('失败')
				})
				let jsApiList = ['onMenuShareTimeline', 'onMenuShareAppMessage']
				this.loadJsapiTicketSign(jsApiList)
			},
			configApiList (obj, jsApiList) {
				this.$wechat.config({
					debug: false,
					appId: obj.appId,
					timestamp: obj.timestamp,
					nonceStr: obj.nonceStr,
					signature: obj.signature,
					jsApiList: jsApiList
				})
			},
			getUser () {
				api.getInfo().then(res => {
					console.log(res.data)
					// alert('调用')

					this.userInfo = res.data
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.my {
		height: 100%;
		.my-head {
			background: url('../../../static/images/user_02.png') no-repeat;
			height: 140px;
			padding: 0 20px;
			display: flex;
			align-items: center;
			img {
				width: 80px;
				height: 80px;
				border-radius: 50%;
				
			}
			.user {
				margin-left: 20px;
				color:#fff;
				.user-name {
					font-size: 20px;
					margin-bottom: 5px;
				}
			}
		}
	}
	.out {
		line-height: 50px;
		margin: 50px 20px;
		background: #00377e;
		color: #fff;
		text-align: center;
		font-size: 18px;
	}
</style>