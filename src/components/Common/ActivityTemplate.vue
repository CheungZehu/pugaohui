<template>
	<div class="activity-item">
		<div class="img">
			<img :src="imgUrl" alt="">
		</div>
		<div class="title">
			<p class="title-text">{{title}}</p>
			<p class="title-time">{{startTime}}<span class="status" :class="statusCode === 0 ? 'sign-up' : statusCode === 1 ? 'start' : statusCode === 2 ? 'end' : statusCode === 3 ? 'full' : ''">{{Status}}</span></p>
		</div>
	</div>
</template>

<script>
	export default {
		props: ['title', 'imgUrl', 'time', 'status'],
		data () {
			return {
				statusCode: 0,
			}
		},
		created () {
			this.getStatusCode()
		},
		computed: {
			startTime () {
				return this.time.split(" ")[0]
			},
			Status () {
				switch (this.status) {
					case '火热报名中':
						return '报名中'
						// this.statusCode = 0
						break
					case '报名已截止':
						return '即将开始'
						// this.statusCode = 1
						break
					case '活动已结束':
						return '已结束'
						// this.statusCode = 2
						break
					case '报名人数已满':
						return '人数已满'
						// this.statusCode = 3
						break
				}
			}
		},
		methods: {
			getStatusCode () {
				switch (this.status) {
					case '火热报名中':
						this.statusCode = 0
						break
					case '报名已截止':
						this.statusCode = 1
						break
					case '活动已结束':
						this.statusCode = 2
						break
					case '报名人数已满':
						this.statusCode = 3
						break
				}
			}
		}
	}
</script>

<style lang="less" scoped>
	.activity-item {
		padding: 20px;
		position: relative;
		overflow: auto;
		border-bottom: 1px solid #f2f2f2;
		background-color: #fff;
		display: flex;
		.title {
			float: right;
			display: inline-block;
			width: 60%;
			.title-text {
				display: -webkit-box;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: 2;
				overflow: hidden;
			}
			.title-time {
				color: #9ea09f;
				font-size: 14px;
				position: absolute;
				bottom: 20px;
				.status {
					padding: 1px 5px 0 5px;
					color: #fff;
					margin-left: 5px;
					border-radius: 2px;
					line-height: 0;
				}
				.sign-up {
					background-color: #be0000;
				}
				.start {
					background-color: #5eae00;
				}
				.end {
					background-color: #666666;
				}
				.full {
					background-color: #000;
				}
			}
		}
		.img {
			height: 90px;
			width: 150px;
			flex-shrink: 1;
			overflow: hidden;
			margin-right: 15px;
			img {
				width: 100%;
			}
		}

	}
</style>

<!-- .img {
			display: inline-block;
			line-height: 0;
			width: 35%;
			
		} -->