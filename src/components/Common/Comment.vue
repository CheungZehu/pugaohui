<template>
	<div class="comment">
		<!-- <div class="touxiang"> -->
		<img :src="url" alt="">
		<!-- </div> -->
		<div class="comment-info">
<!-- 			<p class="name">哈妹</p>
			<p class="text">巴拉巴贝拉北京房价爱理不理不仅拉不了仅仅拉不了仅拉不拉不了仅仅拉不了仅拉不了尽量拉拉不了仅仅拉不了仅拉不不了尽量把看尽量把看不拉屎</p>
			<span class="time">刚刚</span>
			<span class="reply">回复</span> -->
			<p class="name">{{nickname}}</p>
			<p class="text">{{content}}</p>
			<!-- <div class="text">{{content}}</div> -->
			<span class="time">{{createDateName + ' ' + createTimeHM}}</span>
			<!-- <span class="reply">回复</span> -->
		</div>
	</div>
</template>

<script>
	export default {
		props: ['nickname', 'content', 'createTimeHM', 'createDateName', 'url'],
		filters: {
			time (val) {
				return val.split(' ')[0]
			}
		}
	}
</script>

<style lang="less">
	.comment {
		background-color: #fff;
		padding: 10px;
		display: flex;
		border-top: 1px solid #f2f2f2;
		img {
		  width: 40px;
		  height: 40px;
		  flex-shrink: 0;
		  margin-top: 5px;
		  border-radius: 50%;
		}
		
		.comment-info {
			position: relative;
			margin-left: 15px;
			width: 100%;
			.name {
				font-size: 16px;
				color: #333333;
			}
			.text {
				color: #666666;
				font-size: 14px;
				white-space: normal;
				word-break: break-all;
			}
			.time {
				position: absolute;
				top: 0;
				right: 0;
				color: #999999;
				font-size: 14px;
			}
			.reply {
				float: right;
				color: #00377e;
			}
		}
	}
</style>