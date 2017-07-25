<template>
	<div class="coach">
		<router-link v-for="item in coachData" :key="item.id" :to="{name: 'CoachDetail', params: {id: item.id}}">
			<people-list :name="item.title" :imgUrl="img + item.imgUrl" :introInfo="item.shortContent"></people-list>
		</router-link>
		<load-more class="Loading" :tip="Loading" background-color="#000" v-if="!show"></load-more>
		<load-more class="noMore" :show-loading='false' :tip="noMore" background-color="#f2f2f2" v-if="show"></load-more>
	</div>
</template>

<script>
	import PeopleList from '../Common/PeopleList'
	import api from '../../api/api'
	import { LoadMore } from 'vux'

	export default {
		components: {
			PeopleList, LoadMore
		},
		data () {
			return {
				coachData: [],
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
		mounted () {
			let _this = this
			this.getNews()
			window.addEventListener('scroll', function () {
				if (document.body.scrollTop + window.innerHeight >= document.body.offsetHeight - 100) {
					if (_this.total <= _this.coachData.length) {
						_this.show = true
					}
					if (_this.sw === true) {
						_this.sw = false
						_this.getNews()
					}
				}
			})
		},
		methods: {
			getNews () {
				let data = []
				this.curPage++
				let type = 'Coach'
				let params = { pageNumber: this.curPage, type: type }
				api.getNews(params).then(res => {
					if (res.data) {
						this.total = res.data.fullListSize
						for (var i = 0; i < res.data.list.length; i++) {
							this.coachData.push(res.data.list[i])
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
	.weui-loadmore {
		margin: 1.5em auto .1em auto !important;
	}
	.noMore {
		margin: 1.5em auto .1em auto !important;
	}
	.Loading {
		margin: .8em auto .8em auto !important;
	}
</style>