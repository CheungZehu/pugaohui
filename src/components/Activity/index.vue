<template>
	<div class="main">
		<div class="picture">
			<swiper loop auto :list="imgList" dots-position="center"></swiper>
		</div>
		<div class="new-title">
			<router-link v-for="item in newsData" :key="item.id" :to="{name: 'NewsDetail', params: {id: item.id}}">
				<new-title :title="item.title" :imgUrl="img + item.imgUrl" :showDate="item.showDate"></new-title>
			</router-link>
		</div>
	</div>
</template>

<script>
	import api from '../../api/api'
	import { Swiper, SwiperItem } from 'vux'
	import axios from 'axios'
	import NewTitle from './newTitle'

	export default {
		components: {
			Swiper, SwiperItem, NewTitle
		},
		data () {
			return {
				imgList: [],
				newsData: [],
				img: 'http://s1.wego168.com/imgApp',
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
					if (_this.total <= _this.newsData.length) return
					if (_this.sw === true) {
						_this.sw = false
						_this.getNews()
					}
				}
			})
		},
		methods: {
			getActivityCarousel () {
				let ActivityCarousel = 'ActivityCarousel'
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
				let type = 'News'
				let params = { pageNumber: this.curPage, type: type }
				api.getNews(params).then(res => {
					this.total = res.data.fullListSize
					for (var i = 0; i < res.data.list.length; i++) {
						this.newsData.push(res.data.list[i])
					}
					this.sw = true
				})
			}
		}
	}
</script>

<style>
	.main {
		background-color: #fff;
	}
</style>


