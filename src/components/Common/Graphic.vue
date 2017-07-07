<template>
	<!-- <div class=""> -->
		<div>
			<img :src="imgUrl" alt="">
			<p>{{title}}</p>
			<span class="time">{{startTime}}</span>
			<span class="status sign-up">报名中</span>
		</div>
</template>

<script>
	export default {
		props: ['title', 'imgUrl', 'time'],
		computed: {
			startTime () {
				return this.time.split(" ")[0]
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
		img {
			width: 100%;
		}
		p {
			padding: 0 5px 50px 5px;
			text-align: justify;
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