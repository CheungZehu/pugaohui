<template>
	<!-- <div class=""> -->
		<div>
			<div class="img">
				<img :src="imgUrl" alt="">
			</div>
			
			<div class="text">
				<p>{{title}}</p>
			</div>
			
			<span class="time">{{startTime}}</span>
			<span class="status sign-up">{{Status}}</span>
		</div>
</template>

<script>
	export default {
		props: ['title', 'imgUrl', 'time', 'status'],
		computed: {
			startTime () {
				return this.time.split(" ")[0]
			},
			Status () {
				return this.status.split('活动')[1]
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
			padding: 0 5px 50px 5px;
			p {
				
				text-align: justify;
				display: -webkit-box;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: 3;
				overflow: hidden;
			}
		}
		
		.time {
			color: #888888;
			position: absolute;
			bottom: 5px;
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
			padding: 0 5px;
			margin-bottom: 5px;
			position: absolute;
			right: 0;
			bottom: 0;
			font-size: 12px;
			&:before {
				content: '';
				width: 0;
				height: 0;
				position: absolute;
				left: -15px;
				border-top: 12px solid transparent;
				border-bottom: 12px solid transparent;
			}
		}
		.sign-up {
			background-color: #be0000;
			&:before {
				border-right: 15px solid #be0000;
			}
		}
		.start {
			background-color: #5eae00;
			&:before {
				border-right: 15px solid #5eae00;
			}
		}
		.end {
			background-color: #666666;
			&:before {
				border-right: 15px solid #666666;
			}
		}
	}
</style>