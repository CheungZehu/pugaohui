<template>
	<div class="enter-list">
		<p>已报名({{listLength}})</p>
		<ul>
			<li v-for="item in personList" :key="item.id">
				<img :src="item.headImgUrl" alt="">
				<span class="text">{{item.nickname}}</span>
				<span class="time">{{item.createTimeMDHM}}</span>
			</li>
<!-- 			<li>
				<img src="../../../static/images/touxiang_03.png" alt="">
				<span class="text">哈妹哈妹哈妹哈妹哈妹</span>
				<span class="time">07-31</span>
			</li>
			<li>
				<img src="../../../static/images/touxiang_03.png" alt="">
				<span class="text">哈妹哈妹哈妹哈妹哈妹</span>
				<span class="time">07-31</span>
			</li> -->
		</ul>
		<p @click="getPersonList" v-if="sw">点击加载更多</p>
		<load-more class="noMore" :show-loading='false' tip="已无更多数据" background-color="#f2f2f2" v-else></load-more>
	</div>
</template>

<script>
	import { LoadMore } from 'vux'
	import { mapActions } from 'vuex'
	import api from '../../api/api'

	export default {
		components: {
			LoadMore
		},
		data () {
			return {
				personList: [],
				listLength: 0,
				curPage: 0,
				total: 0,
				sw: true
			}
		},
		created () {
			this.getPersonList()
		},
		methods: {
			...mapActions([
				'updateLoadingStatus'
			]),
			getPersonList () {
				this.updateLoadingStatus(true)
				this.curPage++
				if (this.sw) {
					api.signShow({id: this.$route.params.id, pageNumber: this.curPage}).then(res => {
						console.log(res.data)
						// this.total = rea.data.
						this.listLength = res.data.fullListSize
						for (var i = 0; i < res.data.list.length; i++) {
							this.personList.push(res.data.list[i])
							this.updateLoadingStatus(false)
						}
						if (this.listLength <= this.personList.length) {
							this.sw = false
						}
					})
				}
			},
		},
		filters: {
			time (val) {
				return val.split(' ')[0]
			}
		}
	}
</script>

<style lang="less" scoped>
	.enter-list {
		p {
			background-color: #fff;
			padding: 0 20px;
			line-height: 50px;
			&:last-child {
				text-align: center;
				border-top: 1px solid #f2f2f2;
				color: #00377e;
			}
		}
		ul {
			list-style: none;
			li {
				background-color: #fff;
				border-top: 1px solid #f2f2f2;
				padding: 10px 4%;
				color: #333333;
				display: flex;
				flex-direction: row;
				align-items: center;
				width: 92%;
				img {

					height: 40px;
					margin-right: 10px;
					border-radius: 50%;
					flex-basis: 40px;
				}
				.text {
					font-size: 14px;
					overflow: hidden;
				    text-overflow: ellipsis;
				    white-space: nowrap;
				    width: 100%;
				}
				.time {
					font-size: 14px;
					width: 150px;
					text-align: right;
				}
			}	
		}
		.more {
			color: #00377e;
			text-align: center;
		}
	}
	.noMore {
		margin: 1.5em auto .1em auto !important;
	}
</style>

<!-- .img {
					width: 40px;
					height: 40px;
					margin-right: 10px;
					border-radius: 50%;
					img {
						width: 100%;
					}
				} -->