<template>
	<div class="activity-list">
		<div class="picture">
			<swiper loop auto :list="imgList" dots-position="center"></swiper>
		</div>
		<div class="listImg">
			<router-link class="graphic" v-for="item in ActivityData" :key="item.id" :to="{name: 'ActivityDetail', params: {id: item.id}}">
				<graphic :title="item.title" :imgUrl="img + item.imgUrl" :time="item.createTime"></graphic>
			</router-link>
		</div>
	</div>
</template>

<script>
	import api from '../../api/api'
	import { Swiper, SwiperItem } from 'vux'
	import Graphic from '../Common/Graphic'

	export default {
		components: {
			Swiper, SwiperItem, Graphic
		},
		data () {
			return {
				imgList: [],
				img: 'http://s1.wego168.com/imgApp',
				ActivityData: [],
				curPage: 0,
				size: 5,
				total: 0,
				sw: true
			}
		},
		created () {
			this.getActivityCarousel()
		},
		mounted () {
			let _this = this
			this.getNews()
			window.addEventListener('scroll', function () {
				if (document.body.scrollTop + window.innerHeight >= document.body.offsetHeight - 100) {
					if (_this.total <= _this.ActivityData.length) return
					if (_this.sw === true) {
						_this.sw = false
						_this.getNews()
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
			getNews () {
				let data = []
				this.curPage++
				let type = 'Activity'
				let params = { pageNumber: this.curPage, type: type }
				api.getNews(params).then(res => {
					this.total = res.data.fullListSize
					for (var i = 0; i < res.data.list.length; i++) {
						this.ActivityData.push(res.data.list[i])
					}
					this.sw = true
					console.log(this.ActivityData)
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
</style>

