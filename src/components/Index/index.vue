<template>
	<div class="main" id="main">
		<div class="picture">
			<swiper loop auto :list="imgList" dots-position="center"></swiper>
		</div>

		<div class="index-item">
			<div class="item-title">
				<!-- <i class="icon iconfont icon-guanyu"></i> -->
				<span class="title iconfont icon-guanyu">关于普高会</span>
				<!-- <router-link ></router-link> -->
				<i class="arrow iconfont icon-fangxiang1"></i>
				<span class="more">更多</span>
				
			</div>
			<div class="item-list">
				<!-- <p v-for="item in allData[0]" :key="item.id">
					{{item.title}}
				</p> -->
				<router-link v-for="item in allData[0]" :key="item.id" :to="{name: 'NewsDetail', params: {id: item.id}}">
					<p>{{item.title}}</p>
				</router-link>
			</div>
		</div>
		<div class="index-item">
			<div class="item-title">
				<span class="title iconfont icon-dongtai">最新动态</span>
				<router-link to="/activity">
					<i class="arrow iconfont icon-fangxiang1"></i>
					<span class="more">更多</span>
				</router-link>
				
			</div>
			<div class="item-list">
				<router-link v-for="item in allData[4]" :key="item.id" :to="{name: 'NewsDetail', params: {id: item.id}}">
					<p>{{item.title}}</p>
				</router-link>
			</div>
		</div>
		<div class="index-item">
			<div class="item-title">
				<span class="title iconfont icon-huodong1">各种活动</span>
				<router-link to="/activity/ActivityList">
					<i class="arrow iconfont icon-fangxiang1"></i>
					<span class="more">更多</span>
				</router-link>
			</div>
			<div class="item-listImg">
				<router-link class="graphic" v-for="item in allData[1]" :key="item.id" :to="{name: 'ActivityDetail', params: {id: item.id}}">
					<graphic :title="item.title" :imgUrl="img + item.imgurl" :time="item.createTime"></graphic>
				</router-link>
				
			</div>
		</div>
		<div class="index-item">
			<div class="item-title">
				<span class="title iconfont icon-jiaolian">我们的教练</span>
				<router-link to="/index/Coach">
					<i class="arrow iconfont icon-fangxiang1"></i>
					<span class="more">更多</span>
				</router-link>
			</div>
			<router-link tag="li" v-for="item in allData[2]" :key="item.id" :to="{name: 'CoachDetail', params: {id: item.id}}">
				<people-list :name="item.title" :imgUrl="img + item.imgurl" :introInfo="item.introInfo"></people-list>
			</router-link>
			
		</div>
		<div class="index-item">
			<div class="item-title">
				<span class="title iconfont icon-hezuo">合作伙伴</span>
				<router-link to="/cooperation">
					<i class="arrow iconfont icon-fangxiang1"></i>
					<span class="more">更多</span>
				</router-link>
			</div>
			<router-link v-for="item in allData[3]" :key="item.id" :to="{name: 'CooperationDetail', params: {id: item.id}}">
				<partner :name="item.title" :imgUrl="img + item.imgurl"></partner>
			</router-link>
			
		</div>
	</div>
</template>

<script>
	import api from '../../api/api'
	import { Swiper, SwiperItem, Group } from 'vux'
	import Graphic from '../Common/Graphic'
	import PeopleList from '../Common/PeopleList'
	import Partner from '../Common/Partner'

	export default {
		components: {
			Swiper, SwiperItem, Group, PeopleList, Partner, Graphic
		},
		data () {
			return {
				imgList: [],
				allData: {},
				aboutPugaohui: [],
				img: 'http://s1.wego168.com/imgApp'
			}
		},
		created () {
			this.getIndexGarousel()
			this.getIndexNews()
		},
		methods: {
			getMore () {
				this.$router.push('/activity/ActivityList')
			},
			getIndexGarousel () {
				api.getCarousel().then(res => {
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
			getIndexNews () {
				api.getIndexNews().then(res => {
					if (res.data) {
						let objData = res.data
						this.allData = objData.map((item, key) => {
							if (key == 1) {
								var list = item.newsList
							} else {
								list = item.newsList.slice(0, 3)
							}
							return list
						})
						this.loading(false)
					} else {
						this.loading(true)
					}
				})
			}
		}
	}
</script>

<style lang="less">
	.index-item {
		margin-bottom: 15px;
		background-color: #fff;
		.item-title {
			border-bottom: 1px solid #f2f2f2;
			padding: 0 20px;
			position: relative;
			.title {
				font-size: 18px;
				line-height: 50px;
				color: #00377e;
				font-weight: bold;
				padding-left: 30px;
				&:before {
					margin-right: 5px;
					font-size: 25px;
					position: absolute;
					left: 20px;
				}
			}
			.more {
				color: #888888;
				font-size: 16px;
				line-height: 50px;
				float: right;
			}
			.arrow {
				color: #888888;
				font-size: 16px;
				line-height: 50px;
				float: right;
				margin-left: 3px;
			}
		}
		.item-list {
			a:not(:last-child) {
				border-bottom: 1px solid #f2f2f2;
				display: block;
			}
			p {
				padding: 10px 0;
				line-height: 25px;
				margin: 0 20px;
				overflow: hidden;
				text-overflow:ellipsis;
				white-space: nowrap;
				&:not(:last-child) {
					border-bottom: 1px solid #f2f2f2;

				}
			}
		}
		.item-listImg {
			display: flex;
			flex-flow: row wrap;
			background-color: #fff;
		}
	}
	.index-item:last-child {
		margin-bottom: 0;
	}
</style>