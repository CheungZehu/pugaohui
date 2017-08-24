<template>
	<div class="partivipate">
		<router-link v-for="item in activityList" :key="item.id" :to="{name: 'ActivityDetail', params: {id: item.id}}">
			<activity-template :title="item.title" :imgUrl="img + item.imgUrl" :time="item.startTime" :status="item.signMsg"></activity-template>
		</router-link>
		<p class="more" v-if="sw" @click="getMyActivityList">加载更多</p>
		<load-more class="noMore" :show-loading='false' tip="已无更多数据" background-color="#f2f2f2" v-else></load-more>
		<!-- <p>{{activityList}}</p> -->
	</div>
</template>

<script>
	import ActivityTemplate from '../Common/ActivityTemplate'
	import { LoadMore } from 'vux'
	import { mapActions } from 'vuex'
	import api from '../../api/api'

	export default {
		components: {
			ActivityTemplate, LoadMore
		},
		data () {
			return {
				activityList: [],
				img: 'http://s1.wego168.com/imgApp',
				activityLength: 0,
				curPage: 0,
				sw: true
			}
		},
		created () {
			this.getMyActivityList()
		},
		methods: {
			...mapActions([
				'updateLoadingStatus'
			]),
			getMyActivityList () {
				// this.updateLoadingStatus(true)
				this.curPage++
				if (this.sw) {
					api.getMyActivityList({pageNumber: this.curPage}).then(res => {
						if (res.data.list) {
							console.log(res.data)
							this.activityLength = res.data.fullListSize
							for (var i = 0; i < res.data.list.length; i++) {
								this.activityList.push(res.data.list[i])
								// this.updateLoadingStatus(false)
							}
							if (this.activityLength <= this.activityList.length) {
								this.sw = false
							}
						} else {
							this.sw = false
						}
					})
				}
					
			}
		}
	}
</script>

<style>
	.more {
		line-height: 60px;
		text-align: center;
		background: #fff;
		color: #00377e;
	}
	.noMore {
		margin: 1.5em auto .1em auto !important;
	}
</style>
