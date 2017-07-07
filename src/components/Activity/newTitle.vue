<template>
	<div class="item">
		<div class="title">
			<p class="title-text">{{title}}</p>
			<p class="title-time">{{showDate}}</p>
		</div>
		<div class="img">
			<img :src="imgUrl" alt="">
		</div>
	</div>
</template>

<script>
	export default {
		props: ['title', 'imgUrl', 'showDate']
	}

</script>

<style lang="less" scopend>
	.item {
		display: flex;
		padding: 20px;
		position: relative;
		overflow: auto;
		border-top: 1px solid #f2f2f2;
		background-color: #fff;
		.title {
			width: 100%;
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
			}
		}

		.img {
			flex-shrink: 0;
			margin-left: 15px;
			line-height: 0;
			width: 125px;
			height: 80px;
			float: right;
			overflow: hidden;
			img {
				width: 100%;
			}
		}
	}
</style>