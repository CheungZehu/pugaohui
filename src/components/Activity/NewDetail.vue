<template>
	<div class="new-detail">
		<div class="new-title">
			<p>{{titleDetail.title}}</p>
			<p>
				<span class="time">{{titleDetail.showDate}}</span>
				<span class="origin">{{titleDetail.author}}</span>
				<!-- <span class="read">123</span> -->
			</p>
		</div>
		<!-- <div class="new-text">
			<div v-for="item in newsDetail" :key="item.id">
				<img v-if="/img/.test(item)" :src="item" alt="">
				<p v-html="item" v-else></p>
			</div>
		</div> -->
		<div class="new-text" v-html=""></div>
	</div>
</template>

<script>
	import api from "../../api/api"

	export default {
		data () {
			return {
				newsDetail: [],
				titleDetail: {}
			}
		},
		created () {
			this.setDetail(this.$route.params.id)
		},
		methods: {
			setDetail (id) {
				api.getDetail({id: id}).then(res => {
					this.titleDetail = res.data
					this.newsDetail = this.titleDetail.content
					
					// let strs = this.titleDetail.content.split('<p>')
					// let total = strs.reduce(function (sum, n) {
					// 	return sum + n
					// })
					// this.newsDetail = total.split('</p>')
					// this.newsDetail.splice(-1, 1)
					// for (var i = 0; i < this.newsDetail.length; i++) {
					// 	if (this.newsDetail[i] === '<br/>') {
					// 		this.newsDetail.splice(i, 1)
					// 	}
					// 	if (/img/.test(this.newsDetail[i])) {
					// 		var imgs = this.newsDetail[i].split('"')
					// 		this.newsDetail[i] = imgs[3]
					// 	}
					// }
					// console.log(this.newsDetail)
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.new-detail {
		.new-title {
			background-color: #fff;
			padding: 15px 15px 10px 15px;
			border-bottom: 1px solid #f2f2f2;
			p:first-child {
				margin-bottom: 10px;
				font-size: 20px;
				font-weight: bold;
			}
			p:last-child {
				line-height: 25px;
				position: relative;
				span {
					color: #888888;
					font-size: 14px;
				}
				.read {
					position: absolute;
					right: 0;
					top: 1px;
				}
			}
		}
		.new-text {
			padding: 10px;
			p {
				margin-bottom: 5px;
				text-indent: 2em;
				text-align:justify;
			}
			img {
				width: 100%;
				margin: 5px 0;
			}
		}
	}
</style>