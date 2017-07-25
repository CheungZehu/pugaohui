<template>
	<div class="activity-list">
		<div class="picture">
			<swiper loop auto :list="imgList" dots-position="center"></swiper>
		</div>
		<div class="listImg">
			<router-link class="graphic" v-for="item in ActivityData" :key="item.id" :to="{name: 'ActivityDetail', params: {id: item.id}}">
				<graphic :title="item.title" :imgUrl="img + item.imgUrl" :time="item.startTime" :status="item.signMsg"></graphic>
			</router-link>
			<load-more class="Loading" :tip="Loading" background-color="#000" v-if="!show"></load-more>
			<load-more class="noMore" :show-loading='false' :tip="noMore" background-color="#f2f2f2" v-if="show"></load-more>
		</div>
	</div>
</template>

<script>
	import api from '../../api/api'
	import { Swiper, SwiperItem, LoadMore } from 'vux'
	import Graphic from '../Common/Graphic'

	export default {
		components: {
			Swiper, SwiperItem, Graphic, LoadMore
		},
		data () {
			return {
				imgList: [],
				img: 'http://s1.wego168.com/imgApp',
				ActivityData: [],
				curPage: 0,
				size: 5,
				total: 0,
				sw: true,
				show: false,
				Loading: '正在加载',
				noMore: '已无更多数据'
			}
		},
		created () {
			this.getActivityCarousel()
		},
		mounted () {
			let _this = this
			this.getActivityList()
			window.addEventListener('scroll', function () {
				if (document.body.scrollTop + window.innerHeight >= document.body.offsetHeight - 100) {
					if (_this.total <= _this.ActivityData.length) {
						// if (document.body.scrollTop + document.body.clientHeight == document.body.scrollHeight) {
						// 	_this.show = true
						// }
						_this.show = true
					}
					if (_this.sw === true) {
						_this.sw = false
						_this.getActivityList()
					}
				}
			})
		},
		methods: {
			getActivityCarousel () {
				let ActivityCarousel = "ActivityCarousel"
				let params = { categoryId: ActivityCarousel }
				api.getCarousel(params).then(res => {
					let ImgData = res.data
					this.imgList = ImgData.map(item => ({
						img: this.img + item.path
					}))
				})
			},
			getActivityList () {
				let data = []
				this.curPage++
				let params = { pageNumber: this.curPage}
				api.ActivityList(params).then(res => {
					this.total = res.data.fullListSize
					for (var i = 0; i < res.data.list.length; i++) {
						this.ActivityData.push(res.data.list[i])
					}
					this.sw = true
					// console.log(this.ActivityData)
				})
			}
		}
	}
</script>

<style>
	.listImg {
		display: flex;
		flex-flow: row wrap;
		background-color: #fff;
	}
	.noMore {
		margin: 1.5em auto .1em auto !important;
	}
	.Loading {
		margin: .1em auto .1em auto !important;
	}
</style>

