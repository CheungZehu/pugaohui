<template>
	<div>
		<p>评论({{commentLength}})</p>
		<comment v-for="(item, key) in commentList" :key="key" :nickname="item.nickname" :content="item.content" :createTimeHM="item.createTimeHM" :createDateName="item.createDateName" :url="item.headImgUrl"></comment>
		<p v-if="sw" @click="getCommentList">加载更多</p>
		<load-more class="noMore" :show-loading='false' tip="已无更多数据" background-color="#f2f2f2" v-else></load-more>
	</div>
</template>

<script>
	import { LoadMore } from 'vux'
	import Comment from '../Common/Comment'
	import { mapActions } from 'vuex'
	import api from '../../api/api'

	export default {
		components: {
			Comment, LoadMore
		},
		// props: ['commentList'],
		data () {
			return {
				commentList: [],
				commentLength: 0,
				curPage: 0,
				sw: true
			}
		},
		created () {
			this.getCommentList()
		},
		methods: {
			...mapActions([
				'updateLoadingStatus'
			]),
			getCommentList () {
				this.updateLoadingStatus(true)
				this.curPage++
				if (this.sw) {
					api.commentList({activityId: this.$route.params.id, pageNumber: this.curPage}).then(res => {
						console.log(res.data)
						this.commentLength = res.data.fullListSize
						for (var i = 0; i < res.data.list.length; i++) {
							this.commentList.push(res.data.list[i])
							this.updateLoadingStatus(false)
						}
						if (this.commentLength <= this.commentList.length) {
							this.sw = false
						}
					})
				}
			},
		},
	}
</script>

<style lang="less" scoped>
	p {
		padding: 0 20px;
		line-height: 50px;
		background: #fff;
		&:last-child {
			text-align: center;
			border-top: 1px solid #f2f2f2;
			color: #00377e;
		}
	}
	.noMore {
		margin: 1.5em auto .1em auto !important;
	}
</style>