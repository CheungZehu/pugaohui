import axios from 'axios'
import qs from 'qs'
import Vue from 'vue'

axios.defaults.timeout = 60000;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
axios.defaults.baseURL = '/api'

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
		return getData('/newIndex!getRoundPlayImg.action', params)
	},

	// 图文首页
	getIndexNews (params) {
		return getData('/newIndex!getDefaultNews.action', params)
	},

	// 新闻
	getNews (params) {
		return getData('/newIndex!getNewsList.action', params)
	},

	// 详情
	getDetail (params) {
		// return getData('/newIndex!getNewsDetail.action?id=' + params)
		return getData('/newIndex!getNewsDetail.action', params)
	},

	// 完善or修改资料
	addInfo (params) {
		return postData('/user!saveUser.action', params)
	},

	// 根据ID获取个人信息
	getInfo (params) {
		// return postData('/newsBase/user!getUserByOpenId.action', params)
		return postData('/user!getUserByUserId.action', params)
	},

	// 根据会员ID获取会员信息
	getUserByUserId (params) {
		return postData('/user!getUserByUserId.action', params)
	},

	// 获取验证码
	getValidateCode (params) {
		return postData('/Sms!sendValidateCode.action', params)
	},
}