<template>
	<div class="main" id="demo_list_box">
		<div class="picture" v-if="imgList.length > 0">
			<swiper loop auto :list="imgList" dots-position="center"></swiper>
		</div>

		<div class="index-item">
			<div class="item-title">
				<span class="title iconfont icon-guanyu">关于普高会</span>
				<router-link to="/index/IntroductionList">
					<i class="arrow iconfont icon-fangxiang1"></i>
					<span class="more">更多</span>
				</router-link>
			</div>
			<div class="item-list">
				<router-link v-for="item in Introduction" :key="item.id" :to="{name: 'NewsDetail', params: {id: item.id}}">
					<p>{{item.title}}</p>
				</router-link>
			</div>
		</div>
		<div class="index-item">
			<div class="item-title">
				<span class="title iconfont icon-dongtai">最新动态</span>
				<router-link to="/index/News">
					<i class="arrow iconfont icon-fangxiang1"></i>
					<span class="more">更多</span>
				</router-link>
				
			</div>
			<div class="item-list">
				<router-link v-for="item in newsList" :key="item.id" :to="{name: 'NewsDetail', params: {id: item.id}}">
					<p>{{item.title}}</p>
				</router-link>
			</div>
		</div>
		<div class="index-item">
			<div class="item-title">
				<span class="title iconfont icon-huodong1">精彩活动</span>
				<router-link to="/activity/ActivityList" target="_blank">
					<i class="arrow iconfont icon-fangxiang1"></i>
					<span class="more">更多</span>
				</router-link>
			</div>
			<div class="item-listImg">
					<router-link class="graphic" v-for="item in Activity" :key="item.id" :to="{name: 'ActivityDetail', params: {id: item.id}}">
						<graphic :title="item.title" :imgUrl="img + item.imgUrl" :time="item.startTime" :status="item.signMsg"></graphic>
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
			<router-link tag="li" v-for="item in Coach" :key="item.id" :to="{name: 'CoachDetail', params: {id: item.id}}">
				<people-list :name="item.title" :imgUrl="img + item.imgurl" :introInfo="item.introInfo"  :phone="item.extend1"></people-list>
			</router-link>
			
		</div>
		<div class="index-item">
			<div class="item-title">
				<span class="title iconfont icon-huoban">合作伙伴</span>
				<router-link to="/cooperation">
					<i class="arrow iconfont icon-fangxiang1"></i>
					<span class="more">更多</span>
				</router-link>
			</div>
			<router-link v-for="item in Cooperation" :key="item.id" :to="{name: 'CooperationDetail', params: {id: item.id}}">
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
	import { mapState, mapActions } from 'vuex'

	export default {
		components: {
			Swiper, SwiperItem, Group, PeopleList, Partner, Graphic
		},
		data () {
			return {
				imgList: [],
				allData: {},
				newsList: [],
				Activity: [],
				Introduction: [],
				aboutPugaohui: [],
				Coach: [],
				Cooperation: [],
				img: 'http://s1.wego168.com/imgApp',
			}
		},
		mounted () {
			this.getIndexCarousel()
			this.getIndexNews()
			this.getActivityList()
			this.configWxSdk()
		},

		methods: {
			getIndexCarousel () {
				api.getCarousel().then(res => {
					if (res.data) {
						// console.log(res.data)
						let ImgData = res.data
						this.imgList = ImgData.map(item => ({
						img: this.img + item.path
						}))
						// console.log(this.imgList)
					}
				})
			},
			getIndexNews () {
				api.getIndexNews().then(res => {
					if (res.data) {
						// console.log(res.data)
						let objData = res.data
						// console.log(res.data)
						objData.map(item => {
							switch (item.code) {
								case 'News':
									this.newsList = item.newsList.slice(0, 3)
									break
								case 'Qicheng':
									this.Introduction = item.newsList.slice(0, 3)
									break
								case 'JL':
									this.Coach = item.newsList.slice(0, 3)
									break
								case 'HZ':
									this.Cooperation = item.newsList.slice(0, 3)
									break
								default:
							}
						})
					}
				})
			},
			getActivityList () {
				api.ActivityList({pageNumber: 1}).then(res => {
					if (res.data) {
						console.log(res.data)
						this.Activity = res.data.list.slice(0, 8)
					}
				})
			},
			// 微信转发分享
			loadJsapiTicketSign (jsApiList) {
				let signUrl = location.href.split('#')[0]
				api.getWeixin({url: signUrl}).then(res => {
					this.configApiList(res.data, jsApiList)
				})
			},
			configWxSdk () {
				this.$wechat.ready(() => {
					let dataForWeixin = {
						title: '普高会体育',
						desc: '广东普高会体育发展有限公司，简称普高会“PGH”，一个普及高尔夫文化的商务社交平台。',
						link: `http://wfx.wego168.com/wx7d3c9e2d28015f9c/wechat/newsBase/urlSkipAction!accreditPghIndex.action?oauthTypeBase=false`,
						imgUrl: `http://s1.wego168.com/imgApp/upload/wx7d3c9e2d28015f9c/img/12ed9f835b504311962c2d0b0b4369d3.png`,
						success: () => {

						},
						cancel: () => {

						},
					}
					this.$wechat.onMenuShareTimeline(dataForWeixin)
					this.$wechat.onMenuShareAppMessage(dataForWeixin)
				})
				this.$wechat.error(() => {
					// alert('失败')
				})
				let jsApiList = ['onMenuShareTimeline', 'onMenuShareAppMessage']
				this.loadJsapiTicketSign(jsApiList)
			},
			configApiList (obj, jsApiList) {
				this.$wechat.config({
					debug: false,
					appId: obj.appId,
					timestamp: obj.timestamp,
					nonceStr: obj.nonceStr,
					signature: obj.signature,
					jsApiList: jsApiList
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.demo-list-box {
	  width: 100%;
	  background: #f2f2f2;
	  overflow: scroll;
	  -webkit-overflow-scrolling: touch;
	}
	.main {
		background: #f2f2f2;
	}
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