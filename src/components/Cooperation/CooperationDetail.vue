<template>
	<div class="cooperation-detail" v-if="show">
		<div class="cooperation-title">
			<p>{{titleDetail.title}}</p>
			<p>
				<span class="time">{{titleDetail.showDate}}</span>
				<span class="author" v-if="titleDetail.author">{{titleDetail.author}}</span>
				<a class="origin" :href="titleDetail.weixinUrl" v-if="titleDetail.weixinName">{{titleDetail.weixinName}}</a>
				<!-- <span class="read">123</span> -->
			</p>
		</div>
<!-- 		<div class="contact">
			<div class="border-contact">
				<p class="contact-title">-联系我们-</p>
				<div class="info">
					<p>联系人：李先生</p>
					<p>联系电话： 13430769711</p>
					<p>E-mail：jdhsd@163.com</p>
					<p>联系地址：广州市天河区棠东路金豪广州市天河区棠东路金豪</p>
				</div>
			</div>
		</div> -->
		<div class="cooperation-text" v-html="cooperationDetail">
		<!-- 	<div v-for="item in cooperationDetail" :key="item.id">
				<img v-if="/img/.test(item)" :src="item" alt="">
				<p v-html="item" v-else></p>
			</div> -->
		</div>
	</div>
</template>

<script>
	import api from '../../api/api'
	import { mapActions } from 'vuex'

	export default {
		data () {
			return {
				cooperationDetail: [],
				titleDetail: {},
				show: false
			}
		},
		created () {
			this.setDetail()
		},
		watch: {
			'$route': 'setDetail'
		},
		methods: {
			...mapActions([
				'updateLoadingStatus'
			]),
			setDetail () {
				this.show = false
				this.updateLoadingStatus(true)
				api.getDetail({id: this.$route.params.id}).then(res => {
					this.titleDetail = res.data
					this.cooperationDetail = this.titleDetail.content
					var strs = this.cooperationDetail.split('<img style="display:inline;')
					var text = '<img style="display:inline;width:100%;height:100%;'
					for (var i = 0; i < strs.length - 1; i++) {
						strs[i] += text
					}
					function append (oVal, nVal) {
						return oVal + nVal
					}
					this.cooperationDetail = strs.reduce(append)
					this.updateLoadingStatus(false)
					this.show = true
				})
			}
		}
	}
</script>

<style lang="less">
	.cooperation-detail {
		.cooperation-title {
			background-color: #fff;
			padding: 15px 15px 10px 15px;
			border-bottom: 1px solid #f2f2f2;
			p:first-child {
				margin-bottom: 10px;
				font-size: 24px;
				font-weight: bold;
				color: #3e3e3e;
			}
			p:last-child {
				line-height: 25px;
				position: relative;
				span {
					color: #888888;
					font-size: 16px;
					margin-right: 5px;
				}
				.read {
					position: absolute;
					right: 0;
					top: 1px;
				}
				.origin {
					color: #607fa6;
					font-size: 16px;
				}
			}
		}
		.contact {
			background-color: #fff;
			padding: 20px;
			.border-contact {
				border: 1px solid #000;
				.contact-title {
					text-align:center;
					line-height: 50px;
					background-color: #f7f7f7;
					position: relative;
					&:after {
						content: '';
						width: 0;
						height: 0;
						border-left: 10px solid transparent;
						border-right: 10px solid transparent;
						border-top: 8px solid #cccccc;
						position: absolute;
						bottom: 5px;
						left: 50%;
						transform: translate(-50%, 0);
					}
				}
				.info {
					background-color: #fff;
					margin: 10px 0;
					p {
						line-height: 30px;
						text-align:center;
						color: #888888;
					}
				}
			}
		}
		.cooperation-text {
			margin-top:15px;
			background-color: #fff;
			padding:20px;
			
			img {
				width: 100%;
				margin: 5px 0;
			}
		}
	}
</style>
<!-- p {
	margin-bottom: 5px;
	text-indent: 2em;
	text-align:justify;
} -->