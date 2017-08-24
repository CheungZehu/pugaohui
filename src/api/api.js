import axios from 'axios'
import qs from 'qs'
import Vue from 'vue'

axios.defaults.timeout = 60000;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
// axios.defaults.baseURL = '/api'
axios.defaults.baseURL = 'http://wfx.wego168.com/wx7d3c9e2d28015f9c/wechat/'
// axios.defaults.baseURL = 'http://wfx.wego168.com/wx4cafbb33aff562d3/wechat/'
// axios.defaults.baseURL = 'http://192.168.1.67:8081/wechat/mba/wechat/'

// axios.interceptors.response.use(res => {
// 	if (res.data.session) {
// 		return res
// 	} else {
// 		Vue.$vux.toast.showInfo('会话已过期')
// 	}
// }, error => {
// 	Vue.$vux.toast.showInfo('请求超时，请稍后尝试')
// 	return Promise.reject(error)
// })

// post请求
function postData(url, params) {
	return new Promise((resolve, reject) => {
		axios.post(url, qs.stringify(params))
			.then(res => {
				// setTimeout(() => {
				// 	this.$store.dispatch(updateLoadingStatus, false)
				// })
				resolve(res)
			}, err => {
				reject(err)
			})
			.catch(error => {
				reject(error)
			})
	})
}

// get请求
function getData(url, params) {
	return new Promise((resolve, reject) => {
		axios.get(url, {params: params})
			.then(res => {
				resolve(res)
			}, err => {
				reject(err)
			})
			.catch(error => {
				reject(error)
			})
	})
}


// api请求
export default {
	// 轮播图
	getCarousel (params) {
		return getData('/newsBase/newIndex!getRoundPlayImg.action', params)
	},

	// 图文首页
	getIndexNews (params) {
		return getData('/newsBase/newIndex!getDefaultNews.action', params)
	},

	// 新闻
	getNews (params) {
		return getData('/newsBase/newIndex!getNewsList.action', params)
	},

	// 详情
	getDetail (params) {
		return getData('/newsBase/newIndex!getNewsDetail.action', params)
	},

	// 完善or修改资料
	addInfo (params) {
		return postData('/newsBase/user!saveUser.action', params)
	},

	// 根据ID获取个人信息
	getInfo (params) {
		return postData('/newsBase/user!getUserByOpenId.action', params)
		// return postData('/newsBase/user!getUserByUserId.action', params)
	},

	// 根据会员ID获取会员信息
	getUserByUserId (params) {
		return postData('/newsBase/user!getUserByUserId.action', params)
	},

	// 获取验证码
	getValidateCode (params) {
		return postData('/Sms!sendValidateCode.action', params)
	},

	// 验证验证码
	verifyValidateCode (params) {
		return postData('/newsBase/user!validateCode.action', params)
	},

	// 微信sdk
	getWeixin (params) {
		return postData('/Member!loadJsapiTicketSign.action', params)
	},

	// 手机签到
	PhoneCheck (params) {
		return postData('/newsBase/activity!mobileSign.action', params)
	},

	// 默认活动列表8条
	DefaultActivityList (params) {
		return postData('/newsBase/activity!getDefaultActivity.action', params)
	},

	// 活动列表
	ActivityList (params) {
		return postData('/newsBase/activity!getActivityList.action', params)
	},

	// 活动详情
	ActivityDetail (params) {
		return postData('/newsBase/activity!getActivityDetail.action', params)
	},

	// 报名简介
	signShow (params) {
		return postData('/newsBase/activity!signShow.action', params)
	},

	// 报名资料输入项获取
	SignUpInfoSetting (params) {
		return postData('/newsBase/activity!getProfileSetting.action', params)
	},

	// 保存报名资料
	saveSignUpInfo (params) {
		return postData('/newsBase/activity!saveProfileSetting.action', params)
	},

	// 支付信息
	payInfo (params) {
		return postData('/newsBase/activity!showPayInfo.action', params)
	},

	// 支付接口
	payInterface (params) {
		// return postData('/SwiftpassPay!pay.action', params)
		return postData('/SwiftpassPay!activityPay.action', params)
	},

	// 评论列表
	commentList (params) {
		return postData('/newsBase/activityCommentAction!activityCommentList.action', params)
	},

	// 保存评论
	saveComment (params) {
		return postData('/newsBase/activityCommentAction!saveComment.action', params)
	},

	// 我的活动
	getMyActivityList (params) {
		return postData('/newsBase/activity!getMyActivityList.action', params)
	},

	// 跳转到注册页或会员中心页
	jumpPage (params) {
		return postData('/newsBase/user!accredit.action', params)
	},

	// 拨号记录
	recordRialing (params) {
		return postData('/newsBase/newIndex!recordRialing.action', params)
	}
}

// http://wfx.wego168.com/wx7d3c9e2d28015f9c/wechat/Member!loadJsapiTicketSign.action