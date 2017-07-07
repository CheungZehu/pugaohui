<template>
	<div class="people-list">
		<div class="people-item">
			<img :src="imgUrl" alt="">
			<div class="people-title">
				<p>{{name}}</p>
				<p>{{introInfo}}</p>
				<i class="iconfont icon-dianhua"></i>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		props: ['name', 'imgUrl', 'introInfo']
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
			img {
				width: 90px;
				height: 90px;
				border-radius: 50%;
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
				font-size: 20px;
			}
		}
	}
</style>