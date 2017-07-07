<template>
	<div class="comment">
		<div class="touxiang">
			<img src="../../../static/images/touxiang_03.png" alt="">
		</div>
		<div class="comment-info">
			<p class="name">哈妹</p>
			<p class="text">巴拉巴贝拉北京房价爱理不理不仅拉不了仅仅拉不了仅拉不拉不了仅仅拉不了仅拉不了尽量拉拉不了仅仅拉不了仅拉不不了尽量把看尽量把看不拉屎</p>
			<span class="time">刚刚</span>
			<span class="reply">回复</span>
		</div>
	</div>
</template>

<style lang="less">
	.comment {
		background-color: #fff;
		padding: 10px;
		display: flex;
		border-bottom: 1px solid #f2f2f2;
		img {
		  width: 60px;
		  height: 60px;
		  flex-shrink:0
		}
		.touxiang {
			width: 60px;
			height: 60px;
			img {
				width: 10
			}
		}
		.comment-info {
			position: relative;
			margin-left: 15px;
			.name {
				font-size: 18px;
				color: #333333;
			}
			.text {
				color: #666666;
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