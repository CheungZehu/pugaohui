<template>
	<div class="people-list">
		<div class="people-item">
			<div class="img">
				<img :src="imgUrl" alt="">
			</div>
			
			<div class="people-title">
				<p>{{name}}</p>
				<p>{{introInfo}}</p>
				<!-- <a href="www.baidu.com"> -->
					<i @click.stop="tel" class="iconfont icon-dianhua" @></i>
				<!-- </a> -->
				<!-- <router-link to="">
					<i class="iconfont icon-dianhua" link="www.baidu.com"></i>
				</router-link> -->
			</div>
		</div>
	</div>
</template>

<script>
	import api from '../../api/api'

	export default {
		props: ['name', 'imgUrl', 'introInfo', 'phone'],
		methods: {
			tel () {
				api.recordRialing({newsId: this.$route.params.id}).then(res => {
					console.log(res.data)
				})
				if (this.phone === '' || this.phone === null || this.phone === undefined) {
					this.showInfo('暂无号码')
				} else {
					window.location.href = `tel: ${this.phone}`
				}
				

			}
		}
	}
</script>

<style lang="less" scopend>
	.people-list {
		background-color: #fff;
		.people-item {
			position: relative;
			display: flex;
			flex-flow: row wrap;
			padding: 20px;
			border-bottom: 1px solid #f2f2f2;
			.img {
				width: 70px;
				height: 70px;
				border-radius: 50%;
				overflow: hidden;
				img {
					width: 100%;
				}
			}
			.people-title {
				width: 60%;
				margin-left: 20px;
				P:nth-of-type(1) {
					font-size: 16px;
				}
				p:nth-of-type(2) {
					font-size: 15px;
					color: #888888;
				}
			}
			.icon-dianhua {
				position: absolute;
				right: 20px;
				top: 20px;
				color: rgb(94, 174, 0);
				z-index: 100000;
				font-size: 20px;
			}
		}
	}
</style>