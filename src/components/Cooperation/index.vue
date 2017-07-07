<template>
	<div class="cooperation">
		<router-link v-for="item in cooperationData" :key="item.id" :to="{name: 'CooperationDetail', params: {id: item.id}}">
			<partner :name="item.title" :imgUrl="img + item.imgUrl"></partner>
		</router-link>
		
	</div>
</template>

<script>
	import Partner from '../Common/Partner'
	import api from '../../api/api'
	import axios from 'axios'

	export default {
		components: {
			Partner
		},
		data () {
			return {
				cooperationData: [],
				img: 'http://s1.wego168.com/imgApp',
				curPage: 0,
				size: 5,
				total: 0,
				sw: true
			}
		},
		mounted () {
			let _this = this
			this.getNews()
			window.addEventListener('scroll', function () {
				if (document.body.scrollTop + window.innerHeight >= document.body.offsetHeight - 100) {
					if (_this.total <= _this.cooperationData.length) return
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
				let type = 'Cooperation'
				let params = { pageNumber: this.curPage, type: type }
				api.getNews(params).then(res => {
					this.total = res.data.fullListSize
					for (var i = 0; i < res.data.list.length; i++) {
						this.cooperationData.push(res.data.list[i])
					}
					this.sw = true
				})
			}
		}
	}
</script>

<style lang="less">
	.cooperation {
		background-color: #fff;
	}
</style>