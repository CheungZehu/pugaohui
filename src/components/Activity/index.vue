<template>
	<div class="main">
		<div class="picture">
			<swiper loop auto :list="imgList" dots-position="center"></swiper>
		</div>
		<div class="new-title">
			<router-link v-for="item in newsData" :key="item.id" :to="{name: 'NewsDetail', params: {id: item.id}}">
				<new-title :title="item.title" :imgUrl="img + item.imgUrl" :showDate="item.showDate"></new-title>
			</router-link>
			<load-more class="Loading" :tip="Loading" background-color="#000" v-if="!show"></load-more>
			<load-more class="noMore" :show-loading='false' :tip="noMore" background-color="#f2f2f2" v-if="show"></load-more>
		</div>
		
	</div>
</template>

<script>
	import api from '../../api/api'
	import { Swiper, SwiperItem, LoadMore } from 'vux'
	import axios from 'axios'
	import NewTitle from './newTitle'

	export default {
		components: {
			Swiper, SwiperItem, NewTitle, LoadMore
		},
		data () {
			return {
				imgList: [],
				newsData: [],
				img: 'http://s1.wego168.com/imgApp',
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
			this.getNews()
			let beforeScrollTop = document.body.scrollTop
			window.addEventListener('scroll', function () {
				// console.log(document.body.scrollTop)
				if (document.body.scrollTop + window.innerHeight >= document.body.offsetHeight - 100) {
					if (_this.total <= _this.newsData.length) {
						// if (document.body.scrollTop + document.body.clientHeight === document.body.scrollHeight) {
						// 	_this.show = true			
						// }
						_this.show = true
					}
					if (_this.sw === true) {
						_this.sw = false
						setTimeout(() => {
							_this.getNews()
						}, 0)
						// _this.getNews()
					}
				}
			})
		},
		methods: {
			getActivityCarousel () {
				let ActivityCarousel = 'ActivityCarousel'
				let params = { categoryId: ActivityCarousel }
				api.getCarousel(params).then(res => {
					if (res.data) {
						let ImgData = res.data
						this.imgList = ImgData.map(item => ({
							img: this.img + item.path
						}))
						this.loading(false)
					} else {
						this.loading(true)
					}	
				})
			},
			getNews () {
				let data = []
				this.curPage++
				let type = 'News'
				let params = { pageNumber: this.curPage, type: type }
				api.getNews(params).then(res => {
					if (res.data) {
						this.total = res.data.fullListSize
						for (var i = 0; i < res.data.list.length; i++) {
							this.newsData.push(res.data.list[i])
							// console.log(this.newsData)
						}
						this.sw = true
						this.loading(false)
					} else {
						this.loading(true)
					}
						
				})
			}
		}
	}
</script>

<style>
	/*.weui-loadmore {
		margin: 1.5em auto .1em auto !important;
	}*/
	.noMore {
		margin: 1.5em auto .1em auto !important;
	}
	.Loading {
		margin: .8em auto .8em auto !important;
	}
</style>




