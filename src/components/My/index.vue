<template>
	<div class="my">
		<div class="my-head">
			<img src="../../../static/images/touxiang_03.png" alt="">
			<div class="user">
				<p class="user-name">{{user.name}}</p>
				<p>{{user.position}}</p>
				<p>{{user.department}}</p>
			</div>
		</div>
		<div class="my-list">
			<group>
				<cell title="我参加的活动" :link="{path: '/my/Participate'}">
					<i slot="icon" class="iconfont icon-canjia" style="padding-right:10px;display:block;" width="30" height="30"></i>
				</cell>
				<cell title="我发布的活动" is-link>
					<i slot="icon" class="iconfont icon-fabu" style="padding-right:10px;display:block;" width="30" height="30"></i>
				</cell>
				</cell>
			</group>
			<group>
				<cell title="完善资料" :link="{path: '/my/CompleteInfo'}">
					<i slot="icon" class="iconfont icon-canjia" style="padding-right:10px;display:block;" width="30" height="30"></i>
				</cell>
				<cell title="修改资料" :link="{path: '/my/ModifyInfo'}">
					<i slot="icon" class="iconfont icon-fabu" style="padding-right:10px;display:block;" width="30" height="30"></i>
				</cell>
			</group>
		</div>
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
				user: {
					name: '哈妹',
					img: '',
					position: '会计',
					department: '广州企成信息科技有限公司'
				}
			}
		},
		created () {
			// this.getUser()
		},
		methods: {
			getUser () {
				api.getInfo(id).then(res => {
					console.log(res.data)
				})
			}
		}
	}
</script>

<style lang="less">
	.my {
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
</style>