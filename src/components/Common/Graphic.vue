<template>
	<!-- <div class=""> -->
		<div class="gra">
			<div class="img">
				<img :src="imgUrl" alt="">
			</div>
			
			<div class="text">
				<p>{{title}}</p>
			</div>
			<!-- <div class="bot"> -->
				<span class="time">{{startTime}}</span>
				<span class="status" :class="statusCode === 0 ? 'sign-up' : statusCode === 1 ? 'start' : statusCode === 2 ? 'end' : statusCode === 3 ? 'full' : ''">{{Status}}</span>
			<!-- </div> -->
		</div>
</template>

<script>
	export default {
		props: ['title', 'imgUrl', 'time', 'status'],
		data () {
			return {
				statusCode: 0
			}
		},
		created () {
			this.getStatusCode()
		},
		computed: {
			startTime () {
				// let time = this.time.split(" ")[0]
				return this.time.split(" ")[0]
			},
			Status () {
				switch (this.status) {
					case '火热报名中':
						return '报名中'
						// this.statusCode = 0
						break
					case '报名已截止':
						if (this.isDate(this.time)) {
							return '进行中'
						} else {
							return '即将开始'
						}
						// this.statusCode = 1
						break
					case '活动已结束':
						return '已结束'
						// this.statusCode = 2
						break
					case '活动人数已满':
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
			},
			isDate (val) {
				let date = new Date(),
					year = date.getFullYear(),
					month = date.getMonth() + 1,
					day = date.getDate(),
					hours = date.getHours(),
					mintes = date.getMinutes(),

					str = val.split(' '),
					start = str[0],
					startTime = str[1],
					startYear = start.split('-')[0],
					startMonth = start.split('-')[1],
					startDay = start.split('-')[2],
					startHours = startTime.split(':')[0],
					startMintes = startTime.split(':')[1]

				if (year > startYear) {
					return true
				} else if (year == startYear && month > startMonth) {
					return true
				} else if (year == startYear && month == startMonth && day > startDay) {
					return true
				} else if (year == startYear && month == startMonth && day == startDay && hours > startHours) {
					return true
				} else if (year == startYear && month == startMonth && day == startDay && hours == startHours && mintes > startMintes) {
					return true
				} else {
					return false
				}
			}
		}

	}
</script>

<style lang="less">
	.pic {
		display: flex;
		flex-flow: row wrap;
		background-color: #fff;
	}
	.graphic:first-child, .graphic:nth-child(2) {
		margin-top: 4%;
	}

	.graphic {
		box-sizing: border-box;
		border: 1px solid #f2f2f2;
		border-radius: 2px;
		overflow: hidden;
		width: 44%;
		margin: 0 4% 4% 4%;
		position: relative;
		&:nth-child(even) {
			margin-left: 0;
		}
		.img {
			height: 110px;
			overflow: hidden;
			img {
				width: 100%;
			}
		}
		
		.text {
			padding: 0 5px;
			height: 65px;
			p {
				line-height: 1.5;
				text-align: justify;
				display: -webkit-box;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: 2;
				overflow: hidden;
			}
		}
		
		.time {
			color: #888888;
			position: relative;
			bottom: 5px;
			left: 5px;
		}
		i {
			width: 0;
			height: 0;
			position: absolute;
			right: 0;
			border-top: 12px solid transparent;
			border-bottom: 12px solid transparent;
			border-right: 15px solid #be0000;
		}
		.status {
			float: right;
			color: #fff;
			line-height: 24px;
			padding: 0 5px 0 3px;
			margin-bottom: 5px;
			position: absolute;
			right: 0;
			bottom: 0;
			font-size: 12px;
			border-top-left-radius: 2px;
			border-bottom-left-radius: 2px;
			&:before {
				content: '';
				width: 0;
				height: 0;
				position: absolute;
				left: -9px;
				top: 0px;
				border-top: 12px solid transparent;
				border-bottom: 12px solid transparent;
			}
		}
		.sign-up {
			background-color: #be0000;
			&:before {
				border-right: 10px solid #be0000;
			}
		}
		.start {
			background-color: #5eae00;
			&:before {
				border-right: 10px solid #5eae00;
			}
		}
		.end {
			background-color: #666666;
			&:before {
				border-right: 10px solid #666666;
			}
		}
		.full {
			background-color: #000;
			&:before {
				border-right: 10px solid #000;
			}
		}
	}
</style>