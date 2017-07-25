<template>
	<div class="coach-detail" v-if="show">
		<div class="coach-item">
			<div class="coach-head">
				<img src="../../../static/images/touxiang_03.png" alt="">
				<div class="coach-user">
					<p class="coach-name">{{titleDetail.title}}</p>
					<p>{{titleDetail.shortContent}}</p>
					<!-- <p>职业教练</p> -->
				</div>
			</div>
		</div>
		<div class="coach-item text" v-html="coachDetail"></div>
		<!-- <div class="coach-item">
			<div class="coach-introduction">
				<div class="introduction-item">
					<h4>— 简介 —</h4>
					<p>加拿大高尔夫球教师协会(CGTF)职业教练曾就农曾就农业系Turfgrass management专业, 200</p>
					<p>加拿大高尔夫球教师协会(CGTF)职业教练曾就学于UBC农业系Turfgrass management专业, 200</p>
				</div>
				<div class="introduction-item">
					<h4>— 教学理念 —</h4>
					<p>加拿大高尔夫球教师协会(CGTF)职业教练曾就学于UBC农业系Turfgrass management专业, 200</p>
					<p>加拿大高尔夫球教师协会(CGTF)职业教练曾就学于UBC农业系Turfgrass management专业, 200</p>
				</div>
			</div>
		</div>
		<div class="coach-item">
			<div class="coach-pic">
				<h4>— 教学图片 —</h4>
				<img src="../../../static/images/biaotitu_03.png" alt="">
				<img src="../../../static/images/biaotitu_03.png" alt="">
				<img src="../../../static/images/biaotitu_03.png" alt="">
				<img src="../../../static/images/biaotitu_03.png" alt="">		
			</div>
		</div> -->
	</div>
</template>

<script>
	import api from "../../api/api"
	import { mapActions } from 'vuex'

	export default {
		data () {
			return {
				coachDetail: [],
				titleDetail: {},
				img: 'http://s1.wego168.com/imgApp',
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
					this.coachDetail = this.titleDetail.content
					var strs = this.coachDetail.split('<img style="display:inline;')
					var text = '<img style="display:inline;width:100%;height:100%;'
					for (var i = 0; i < strs.length - 1; i++) {
						strs[i] += text
					}
					function append (oVal, nVal) {
						return oVal + nVal
					}
					this.coachDetail = strs.reduce(append)
					this.updateLoadingStatus(false)
					this.show = true
				})
			}
		}
	}
</script>

<style lang="less">
	.text {
		padding: 10px 20px;
	}
	.coach-detail {
		.coach-item {
			&:last-child {
				margin-bottom: 0;
			}
			margin-bottom: 20px;
			background-color: #fff;
			.coach-head {	
				height: 140px;
				padding: 0 20px;
				display: flex;
				align-items: center;
				img {
					width: 80px;
					height: 80px;
					border-radius: 50%;
					
				}
				.coach-user {
					margin-left: 20px;
					.coach-name {
						color: #454545;
						font-size: 20px;
						margin-bottom: 5px;
					}
					p:not(:first-child) {
						color: #888888;
					}
				}
			}
			.coach-introduction {
				padding: 20px;
				.introduction-item:first-child {
					margin-bottom: 30px;
				}
				.introduction-item {
					h4 {
						text-align: center;
						color: #454545;
						margin-bottom: 20px;
					}
					p {
						color: #666666;
						text-align: justify;
						margin-bottom: 5px;
						text-indent: 2em;
					}
				}
			}
			.coach-pic {
				padding: 20px;
				h4 {
					text-align: center;
					color: #454545;
					margin-bottom: 20px;
				}
				img {
					width: 100%;
					&:not(:last-child) {
						margin-bottom: 20px;
					}
				}
			}
		}
		
	}
</style>