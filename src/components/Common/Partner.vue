<template>
	<div class="partner">
		<div class="partner-item">
			<img :src="imgUrl" alt="">
			<p>{{name}}</p>
		</div>
	</div>
</template>

<script>
	export default {
		props: ['name', 'imgUrl']
	}
</script>

<style lang="less" scoped>
	.partner {
		background: #fff;
		.partner-item {
			padding: 20px;
			border-bottom: 1px solid #f2f2f2;
			img {
				width: 100%;
			}
			p {
				margin-top: 10px;
				overflow: hidden;
				text-overflow:ellipsis;
				white-space: nowrap;
			}
		}
	}
</style>