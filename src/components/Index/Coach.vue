<template>
	<div class="coach">
		<router-link v-for="item in coachData" :key="item.id" :to="{name: 'CoachDetail', params: {id: item.id}}">
			<people-list :name="item.title" :imgUrl="img + item.imgUrl" :introInfo="item.shortContent"></people-list>
		</router-link>
		
	</div>
</template>

<script>
	import PeopleList from '../Common/PeopleList'
	import api from '../../api/api'

	export default {
		components: {
			PeopleList
		},
		data () {
			return {
				coachData: [],
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
					if (_this.total <= _this.coachData.length) return
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
					this.total = res.data.fullListSize
					for (var i = 0; i < res.data.list.length; i++) {
						this.coachData.push(res.data.list[i])
					}
					this.sw = true
					// console.log(this.coachData)
				})
			}
		}
	}
</script>