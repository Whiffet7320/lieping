import axios from 'axios';
import Vue from 'vue';
import urls from './url.js';
import qs from 'qs'
const vue = new Vue()
let myPost = axios.create({
	baseURL: urls.baseUrl,
	method: 'post',
	// timeout: 1000,
})
let myUploadImg = axios.create({
	baseURL: urls.baseUrl,
	method: 'post',
	// timeout: 1000,
})
let myGet = axios.create({
	baseURL: urls.baseUrl,
	method: 'get',
	// timeout: 1000,
})
let myDelete = axios.create({
	baseURL: urls.baseUrl,
	method: 'delete',
	// timeout: 1000,
})
let myPut = axios.create({
	baseURL: urls.baseUrl,
	method: 'put',
	// timeout: 1000,
})
let dzpMyPost = axios.create({
	baseURL: urls.dzpBaseUrl,
	method: 'post',
	// timeout: 1000,
})
let dzpMyGet = axios.create({
	baseURL: urls.dzpBaseUrl,
	method: 'get',
	// timeout: 1000,
})
let dzpMyDelete = axios.create({
	baseURL: urls.dzpBaseUrl,
	method: 'delete',
	// timeout: 1000,
})
let dzpMyPut = axios.create({
	baseURL: urls.dzpBaseUrl,
	method: 'put',
	// timeout: 1000,
})
axios.defaults.adapter = function(config) { //自己定义个适配器，用来适配uniapp的语法
	return new Promise((resolve, reject) => {
		var settle = require('axios/lib/core/settle');
		var buildURL = require('axios/lib/helpers/buildURL');
		uni.request({
			method: config.method.toUpperCase(),
			url: config.baseURL + buildURL(config.url, config.params, config.paramsSerializer),
			header: config.headers,
			data: config.data,
			dataType: config.dataType,
			responseType: config.responseType,
			sslVerify: config.sslVerify,
			complete: function complete(response) {
				response = {
					data: response.data,
					status: response.statusCode,
					errMsg: response.errMsg,
					header: response.header,
					config: config
				};

				settle(resolve, reject, response);
			}
		})
	})
}
myPut.interceptors.request.use(config => {
	if (uni.getStorageSync('token')) {
		config.headers = {
			'Accept': 'application/json',
			'Authorization': `Bearer ${uni.getStorageSync('token')}`
			// 'token':  uni.getStorageSync('token'),
			// 'Access-Control-Allow-Origin': '*',
			// "access-control-allow-credentials": "true"
		}
		// config.headers.token = uni.getStorageSync('token');
	}
	console.log(config)
	return config;
}, error => {
	console.log(error);
	return Promise.reject();
})
myDelete.interceptors.request.use(config => {
	if (uni.getStorageSync('token')) {
		config.headers = {
			'Accept': 'application/json',
			'Authorization': `Bearer ${uni.getStorageSync('token')}`
			// 'token':  uni.getStorageSync('token'),
			// 'Access-Control-Allow-Origin': '*',
			// "access-control-allow-credentials": "true"
		}
		// config.headers.token = uni.getStorageSync('token');
	}
	console.log(config)
	return config;
}, error => {
	console.log(error);
	return Promise.reject();
})
myPost.interceptors.request.use(config => {
	config.headers = {
		'token': '',
		'Content-Type': 'application/x-www-form-urlencoded'
	}
	if (uni.getStorageSync('token')) {
		// config.headers = {
		// 	'token':  uni.getStorageSync('token'),
		// 	// 'Access-Control-Allow-Origin': '*',
		// 	// "access-control-allow-credentials": "true"
		// }
		config.headers.token = uni.getStorageSync('token');
	}
	console.log(config)
	return config;
}, error => {
	console.log(error);
	return Promise.reject();
})
myUploadImg.interceptors.request.use(config => {
	if (uni.getStorageSync('token')) {
		config.headers = {
			"Content-Type": "multipart/form-data;charse=UTF-8",
			'Authorization': `Bearer ${uni.getStorageSync('token')}`,
		}
		// config.headers.token = uni.getStorageSync('token');
	}
	console.log(config)
	return config;
}, error => {
	console.log(error);
	return Promise.reject();
})
myDelete.interceptors.response.use(response => {
	// console.log(response)
	if (response.status === 200) {
		if (response.data.code == 401) {
			uni.navigateTo({
				url: '/pages/wode/xuanzeshenfen'
			})
		} else {
			return response.data
		}
	}
	// if (response.status === 200 && response.data.code == '200') {
	//     vue.$message({
	//         message: response.data.msg,
	//         type: "success",
	//     });
	//     return response.data;
	// }
	else {
		vue.$message.error(response.data.info);
		Promise.reject();
	}
}, error => {
	//错误跳转
	console.log(error)
	if (error.response.status === 500) {
		console.log(vue)
		if (error.response.data.info != '参数错误') {
			vue.$message.error(error.response.data.info);
		}
	} else if (error.response.status === 401) {
		// sessionStorage.setItem("isLogin", false);
		// console.log(sessionStorage.getItem("isLogin"));
		uni.login({
			provider: 'weixin',
			success: async function(loginRes) {
				try {
					var code = loginRes.code;
					const res = await vue.$api.wx_login({
						logincode: code,
						nickname: '微信用户',
						userface: 'https://thirdwx.qlogo.cn/mmopen/vi_32/POgEwh4mIHO4nibH0KlMECNjjGxQUq24ZEaGT4poC6icRiccVGKSyXwibcPq4BWmiaIGuG1icwxaQX6grC9VemZoJ8rg/132',
					})
					console.log(res, '授权')
					if (res.result == 1) {
						uni.setStorage({
							key: 'token',
							data: res.token,
							success: async () => {
								if (res
									.user_category ==
									0) {
									uni.navigateTo({
										url: '/pages/wode/xuanzeshenfen'
									})
								} else if (res.user_category == 1) {
									const res33 = await vue.$api.user_info()
									console.log(res33, '3333')
									if (res33.is_joincompany == 1 || res33
										.is_licensestatus == 2) {
										uni.switchTab({
											url: '/pages/tabBar/index'
										})
									} else {
										uni.navigateTo({
											url: '/pages/tabBar/wode'
										})
									}
								} else if (res.user_category == 2) {
									uni.navigateTo({
										url: '/pages/tabBar/qzz_sy'
									})
								} else {
									uni.navigateBack({
										delta: 1
									})
								}
							}
						})
					} else {
						vue.$refs.uToast.show({
							title: res.msg,
							type: 'error',
						})
					}
				} catch (err) {
					console.log(err, 'err')
				}
			}
		})
		// router.push({ path: "/" })
		// router.go(0)
		return Promise.reject();
	} else if (error.response.status === 404) {
		vue.$alert('页面不存在', '404错误', {
			confirmButtonText: '确定',
		});
		return Promise.reject();
	} else if (error.response.status === 402) {
		vue.$alert('请求次数限制', '402错误', {
			confirmButtonText: '确定',
		});
		return Promise.reject();
	} else {
		if (error.response.data.info != '参数错误') {
			vue.$message.error(error.response.data.info);
		}
	}
})
myUploadImg.interceptors.response.use(response => {
	// console.log(response)
	if (response.status === 200) {
		if (response.data.code == 401) {
			uni.navigateTo({
				url: '/pages/wode/xuanzeshenfen'
			})
		} else {
			return response.data
		}
	}
	// if (response.status === 200 && response.data.code == '200') {
	//     vue.$message({
	//         message: response.data.msg,
	//         type: "success",
	//     });
	//     return response.data;
	// }
	else {
		vue.$message.error(response.data.info);
		Promise.reject();
	}
}, error => {
	//错误跳转
	console.log(error)
	if (error.response.status === 500) {
		console.log(vue)
		if (error.response.data.info != '参数错误') {
			vue.$message.error(error.response.data.info);
		}
	} else if (error.response.status === 401) {
		// sessionStorage.setItem("isLogin", false);
		// console.log(sessionStorage.getItem("isLogin"));
		uni.login({
			provider: 'weixin',
			success: async function(loginRes) {
				try {
					var code = loginRes.code;
					const res = await vue.$api.wx_login({
						logincode: code,
						nickname: '微信用户',
						userface: 'https://thirdwx.qlogo.cn/mmopen/vi_32/POgEwh4mIHO4nibH0KlMECNjjGxQUq24ZEaGT4poC6icRiccVGKSyXwibcPq4BWmiaIGuG1icwxaQX6grC9VemZoJ8rg/132',
					})
					console.log(res, '授权')
					if (res.result == 1) {
						uni.setStorage({
							key: 'token',
							data: res.token,
							success: async () => {
								if (res
									.user_category ==
									0) {
									uni.navigateTo({
										url: '/pages/wode/xuanzeshenfen'
									})
								} else if (res.user_category == 1) {
									const res33 = await vue.$api.user_info()
									console.log(res33, '3333')
									if (res33.is_joincompany == 1 || res33
										.is_licensestatus == 2) {
										uni.switchTab({
											url: '/pages/tabBar/index'
										})
									} else {
										uni.navigateTo({
											url: '/pages/tabBar/wode'
										})
									}
								} else if (res.user_category == 2) {
									uni.navigateTo({
										url: '/pages/tabBar/qzz_sy'
									})
								} else {
									uni.navigateBack({
										delta: 1
									})
								}
							}
						})
					} else {
						vue.$refs.uToast.show({
							title: res.msg,
							type: 'error',
						})
					}
				} catch (err) {
					console.log(err, 'err')
				}
			}
		})
		// router.push({ path: "/" })
		// router.go(0)
		return Promise.reject();
	} else if (error.response.status === 404) {
		vue.$alert('页面不存在', '404错误', {
			confirmButtonText: '确定',
		});
		return Promise.reject();
	} else if (error.response.status === 402) {
		vue.$alert('请求次数限制', '402错误', {
			confirmButtonText: '确定',
		});
		return Promise.reject();
	} else {
		if (error.response.data.info != '参数错误') {
			vue.$message.error(error.response.data.info);
		}
	}
})
myGet.interceptors.request.use(config => {
	config.headers = {
		'token': '',
		'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
	}
	if (uni.getStorageSync('token')) {
		// config.headers = {
		// 	'Accept': 'application/json',
		// 	// 'token': sessionStorage.token,
		// 	'Authorization': `Bearer ${uni.getStorageSync('token')}`,
		// 	'Access-Control-Allow-Origin': '*',
		// 	"access-control-allow-credentials": "true"
		// }
		config.headers.token = uni.getStorageSync('token');
	}
	return config;
}, error => {
	console.log(error);
	return Promise.reject();
})
myPut.interceptors.response.use(response => {
	// console.log(response)
	if (response.status === 200) {
		if (response.data.code == 401) {
			uni.navigateTo({
				url: '/pages/wode/xuanzeshenfen'
			})
		} else {
			return response.data
		}
	}
	// if (response.status === 200 && response.data.code == '200') {
	//     vue.$message({
	//         message: response.data.msg,
	//         type: "success",
	//     });
	//     return response.data;
	// }
	else {
		vue.$message.error(response.data.info);
		Promise.reject();
	}
}, error => {
	//错误跳转
	console.log(error)
	if (error.response.status === 500) {
		console.log(vue)
		if (error.response.data.info != '参数错误') {
			vue.$message.error(error.response.data.info);
		}
	} else if (error.response.status === 401) {
		// sessionStorage.setItem("isLogin", false);
		// console.log(sessionStorage.getItem("isLogin"));
		uni.login({
			provider: 'weixin',
			success: async function(loginRes) {
				try {		
					var code = loginRes.code;
					const res = await vue.$api.wx_login({
						logincode: code,
						nickname: '微信用户',
						userface: 'https://thirdwx.qlogo.cn/mmopen/vi_32/POgEwh4mIHO4nibH0KlMECNjjGxQUq24ZEaGT4poC6icRiccVGKSyXwibcPq4BWmiaIGuG1icwxaQX6grC9VemZoJ8rg/132',
					})
					console.log(res, '授权')
					if (res.result == 1) {
						uni.setStorage({
							key: 'token',
							data: res.token,
							success: async () => {
								if (res
									.user_category ==
									0) {
									uni.navigateTo({
										url: '/pages/wode/xuanzeshenfen'
									})
								} else if (res.user_category == 1) {
									const res33 = await vue.$api.user_info()
									console.log(res33, '3333')
									if (res33.is_joincompany == 1 || res33
										.is_licensestatus == 2) {
										uni.switchTab({
											url: '/pages/tabBar/index'
										})
									} else {
										uni.navigateTo({
											url: '/pages/tabBar/wode'
										})
									}
								} else if (res.user_category == 2) {
									uni.navigateTo({
										url: '/pages/tabBar/qzz_sy'
									})
								} else {
									uni.navigateBack({
										delta: 1
									})
								}
							}
						})
					} else {
						vue.$refs.uToast.show({
							title: res.msg,
							type: 'error',
						})
					}
				} catch (err) {
					console.log(err, 'err')
				}
			}
		})
		// router.push({ path: "/" })
		// router.go(0)
		return Promise.reject();
	} else if (error.response.status === 404) {
		vue.$alert('页面不存在', '404错误', {
			confirmButtonText: '确定',
		});
		return Promise.reject();
	} else if (error.response.status === 402) {
		vue.$alert('请求次数限制', '402错误', {
			confirmButtonText: '确定',
		});
		return Promise.reject();
	} else {
		if (error.response.data.info != '参数错误') {
			vue.$message.error(error.response.data.info);
		}
	}
})
myPost.interceptors.response.use(response => {
	// console.log(response)
	if (response.status === 200) {
		if (response.data.code == 401) {
			uni.navigateTo({
				url: '/pages/wode/xuanzeshenfen'
			})
		} else {
			return response.data
		}
	}
	// if (response.status === 200 && response.data.code == '200') {
	//     vue.$message({
	//         message: response.data.msg,
	//         type: "success",
	//     });
	//     return response.data;
	// }
	else {
		vue.$message.error(response.data.info);
		Promise.reject();
	}
}, error => {
	//错误跳转
	console.log(error.response.status)
	if (error.response.status === 500) {
		console.log(vue)
		if (error.response.data.info != '参数错误') {
			vue.$message.error(error.response.data.info);
		}
	} else if (error.response.status === 401) {
		// sessionStorage.setItem("isLogin", false);
		// console.log(sessionStorage.getItem("isLogin"));
		uni.login({
			provider: 'weixin',
			success: async function(loginRes) {
				try {
					var code = loginRes.code;
					const res = await vue.$api.wx_login({
						logincode: code,
						nickname: '微信用户',
						userface: 'https://thirdwx.qlogo.cn/mmopen/vi_32/POgEwh4mIHO4nibH0KlMECNjjGxQUq24ZEaGT4poC6icRiccVGKSyXwibcPq4BWmiaIGuG1icwxaQX6grC9VemZoJ8rg/132',
					})
					console.log(res, '授权')
					if (res.result == 1) {
						uni.setStorage({
							key: 'token',
							data: res.token,
							success: async () => {
								if (res
									.user_category ==
									0) {
									uni.navigateTo({
										url: '/pages/wode/xuanzeshenfen'
									})
								} else if (res.user_category == 1) {
									const res33 = await vue.$api.user_info()
									console.log(res33, '3333')
									if (res33.is_joincompany == 1 || res33
										.is_licensestatus == 2) {
										uni.switchTab({
											url: '/pages/tabBar/index'
										})
									} else {
										uni.navigateTo({
											url: '/pages/tabBar/wode'
										})
									}
								} else if (res.user_category == 2) {
									uni.navigateTo({
										url: '/pages/tabBar/qzz_sy'
									})
								} else {
									uni.navigateBack({
										delta: 1
									})
								}
							}
						})
					} else {
						vue.$refs.uToast.show({
							title: res.msg,
							type: 'error',
						})
					}
				} catch (err) {
					console.log(err, 'err')
				}
			}
		})
		// router.push({ path: "/" })
		// router.go(0)
		return Promise.reject();
	} else if (error.response.status === 404) {
		vue.$alert('页面不存在', '404错误', {
			confirmButtonText: '确定',
		});
		return Promise.reject();
	} else if (error.response.status === 402) {
		vue.$alert('请求次数限制', '402错误', {
			confirmButtonText: '确定',
		});
		return Promise.reject();
	} else {
		if (error.response.data.info != '参数错误') {
			vue.$message.error(error.response.data.info);
		}
	}
})
myGet.interceptors.response.use(response => {
	if (response.status === 200) {
		if (response.data.code == 401) {
			uni.navigateTo({
				url: '/pages/wode/xuanzeshenfen'
			})
		} else {
			return response.data
		}
	}
	// if (response.status === 200 && response.data.code == '200') {
	//     vue.$message({
	//         message: response.data.msg,
	//         type: "success",
	//     });
	//     return response.data;
	// }
	else {
		vue.$message.error(response.data.info);
		Promise.reject();
	}
}, error => {
	//错误跳转
	console.log(error.response.status, 123456);
	if (error.response.status === 500) {
		if (error.response.data.info != '参数错误') {
			vue.$message.error(error.response.data.info);
		}
	} else if (error.response.status === 401) {
		// sessionStorage.setItem("isLogin", false);
		// console.log(sessionStorage.getItem("isLogin"));
		uni.login({
			provider: 'weixin',
			success: async function(loginRes) {
				try {
					var code = loginRes.code;
					const res = await vue.$api.wx_login({
						logincode: code,
						nickname: '微信用户',
						userface: 'https://thirdwx.qlogo.cn/mmopen/vi_32/POgEwh4mIHO4nibH0KlMECNjjGxQUq24ZEaGT4poC6icRiccVGKSyXwibcPq4BWmiaIGuG1icwxaQX6grC9VemZoJ8rg/132',
					})
					console.log(res, '授权')
					if (res.result == 1) {
						uni.setStorage({
							key: 'token',
							data: res.token,
							success: async () => {
								if (res
									.user_category ==
									0) {
									uni.navigateTo({
										url: '/pages/wode/xuanzeshenfen'
									})
								} else if (res.user_category == 1) {
									const res33 = await vue.$api.user_info()
									console.log(res33, '3333')
									if (res33.is_joincompany == 1 || res33
										.is_licensestatus == 2) {
										uni.switchTab({
											url: '/pages/tabBar/index'
										})
									} else {
										uni.navigateTo({
											url: '/pages/tabBar/wode'
										})
									}
								} else if (res.user_category == 2) {
									uni.navigateTo({
										url: '/pages/tabBar/qzz_sy'
									})
								} else {
									uni.navigateBack({
										delta: 1
									})
								}
							}
						})
					} else {
						vue.$refs.uToast.show({
							title: res.msg,
							type: 'error',
						})
					}
				} catch (err) {
					console.log(err, 'err')
				}
			}
		})
		// });
		// router.push({ path: "/" })
		// router.go(0)
		return Promise.reject();
	} else if (error.response.status === 404) {
		vue.$alert('页面不存在', '404错误', {
			confirmButtonText: '确定',
		});
		return Promise.reject();
	} else if (error.response.status === 402) {
		vue.$alert('请求次数限制', '402错误', {
			confirmButtonText: '确定',
		});
		return Promise.reject();
	} else {
		if (error.response.data.info != '参数错误') {
			vue.$message.error(error.response.data.info);
		}
	}
})

dzpMyPut.interceptors.request.use(config => {
	if (uni.getStorageSync('token')) {
		config.headers = {
			'Accept': 'application/json',
			'Authorization': `Bearer ${uni.getStorageSync('token')}`
			// 'token':  uni.getStorageSync('token'),
			// 'Access-Control-Allow-Origin': '*',
			// "access-control-allow-credentials": "true"
		}
		// config.headers.token = uni.getStorageSync('token');
	}
	console.log(config)
	return config;
}, error => {
	console.log(error);
	return Promise.reject();
})
dzpMyPost.interceptors.request.use(config => {
	if (uni.getStorageSync('token')) {
		config.headers = {
			'Accept': 'application/json',
			'Authorization': `Bearer ${uni.getStorageSync('token')}`
			// 'token':  uni.getStorageSync('token'),
			// 'Access-Control-Allow-Origin': '*',
			// "access-control-allow-credentials": "true"
		}
		// config.headers.token = uni.getStorageSync('token');
	}
	console.log(config)
	return config;
}, error => {
	console.log(error);
	return Promise.reject();
})
dzpMyGet.interceptors.request.use(config => {
	if (uni.getStorageSync('token')) {
		config.headers = {
			'Accept': 'application/json',
			// 'token': sessionStorage.token,
			'Authorization': `Bearer ${uni.getStorageSync('token')}`,
			'Access-Control-Allow-Origin': '*',
			"access-control-allow-credentials": "true"
		}
		config.headers.token = uni.getStorageSync('token');
	}
	return config;
}, error => {
	console.log(error);
	return Promise.reject();
})
dzpMyPut.interceptors.response.use(response => {
	// console.log(response)
	if (response.status === 200) {
		if (response.data.code == 401) {
			uni.navigateTo({
				url: '/pages/wode/xuanzeshenfen'
			})
		} else {
			return response.data
		}
	}
	// if (response.status === 200 && response.data.code == '200') {
	//     vue.$message({
	//         message: response.data.msg,
	//         type: "success",
	//     });
	//     return response.data;
	// }
	else {
		vue.$message.error(response.data.info);
		Promise.reject();
	}
}, error => {
	//错误跳转
	console.log(error)
	if (error.response.status === 500) {
		console.log(vue)
		if (error.response.data.info != '参数错误') {
			vue.$message.error(error.response.data.info);
		}
	} else if (error.response.status === 401) {
		// sessionStorage.setItem("isLogin", false);
		// console.log(sessionStorage.getItem("isLogin"));

		uni.login({
			provider: 'weixin',
			success: async function(loginRes) {
				try {
					var code = loginRes.code;
					const res = await vue.$api.wx_login({
						logincode: code,
						nickname: '微信用户',
						userface: 'https://thirdwx.qlogo.cn/mmopen/vi_32/POgEwh4mIHO4nibH0KlMECNjjGxQUq24ZEaGT4poC6icRiccVGKSyXwibcPq4BWmiaIGuG1icwxaQX6grC9VemZoJ8rg/132',
					})
					console.log(res, '授权')
					if (res.result == 1) {
						uni.setStorage({
							key: 'token',
							data: res.token,
							success: async () => {
								if (res
									.user_category ==
									0) {
									uni.navigateTo({
										url: '/pages/wode/xuanzeshenfen'
									})
								} else if (res.user_category == 1) {
									const res33 = await vue.$api.user_info()
									console.log(res33, '3333')
									if (res33.is_joincompany == 1 || res33
										.is_licensestatus == 2) {
										uni.switchTab({
											url: '/pages/tabBar/index'
										})
									} else {
										uni.navigateTo({
											url: '/pages/tabBar/wode'
										})
									}
								} else if (res.user_category == 2) {
									uni.navigateTo({
										url: '/pages/tabBar/qzz_sy'
									})
								} else {
									uni.navigateBack({
										delta: 1
									})
								}
							}
						})
					} else {
						vue.$refs.uToast.show({
							title: res.msg,
							type: 'error',
						})
					}
				} catch (err) {
					console.log(err, 'err')
				}
			}
		})
		// router.push({ path: "/" })
		// router.go(0)
		return Promise.reject();
	} else if (error.response.status === 404) {
		vue.$alert('页面不存在', '404错误', {
			confirmButtonText: '确定',
		});
		return Promise.reject();
	} else if (error.response.status === 402) {
		vue.$alert('请求次数限制', '402错误', {
			confirmButtonText: '确定',
		});
		return Promise.reject();
	} else {
		if (error.response.data.info != '参数错误') {
			vue.$message.error(error.response.data.info);
		}
	}
})
dzpMyPost.interceptors.response.use(response => {
	// console.log(response)
	if (response.status === 200) {
		if (response.data.code == 401) {
			uni.navigateTo({
				url: '/pages/wode/xuanzeshenfen'
			})
		} else {
			return response.data
		}
	}
	// if (response.status === 200 && response.data.code == '200') {
	//     vue.$message({
	//         message: response.data.msg,
	//         type: "success",
	//     });
	//     return response.data;
	// }
	else {
		vue.$message.error(response.data.info);
		Promise.reject();
	}
}, error => {
	//错误跳转
	console.log(error)
	if (error.response.status === 500) {
		console.log(vue)
		if (error.response.data.info != '参数错误') {
			vue.$message.error(error.response.data.info);
		}
	} else if (error.response.status === 401) {
		// sessionStorage.setItem("isLogin", false);
		// console.log(sessionStorage.getItem("isLogin"));
		uni.login({
			provider: 'weixin',
			success: async function(loginRes) {
				try {
					var code = loginRes.code;
					const res = await vue.$api.wx_login({
						logincode: code,
						nickname: '微信用户',
						userface: 'https://thirdwx.qlogo.cn/mmopen/vi_32/POgEwh4mIHO4nibH0KlMECNjjGxQUq24ZEaGT4poC6icRiccVGKSyXwibcPq4BWmiaIGuG1icwxaQX6grC9VemZoJ8rg/132',
					})
					console.log(res, '授权')
					if (res.result == 1) {
						uni.setStorage({
							key: 'token',
							data: res.token,
							success: async () => {
								if (res
									.user_category ==
									0) {
									uni.navigateTo({
										url: '/pages/wode/xuanzeshenfen'
									})
								} else if (res.user_category == 1) {
									const res33 = await vue.$api.user_info()
									console.log(res33, '3333')
									if (res33.is_joincompany == 1 || res33
										.is_licensestatus == 2) {
										uni.switchTab({
											url: '/pages/tabBar/index'
										})
									} else {
										uni.navigateTo({
											url: '/pages/tabBar/wode'
										})
									}
								} else if (res.user_category == 2) {
									uni.navigateTo({
										url: '/pages/tabBar/qzz_sy'
									})
								} else {
									uni.navigateBack({
										delta: 1
									})
								}
							}
						})
					} else {
						vue.$refs.uToast.show({
							title: res.msg,
							type: 'error',
						})
					}
				} catch (err) {
					console.log(err, 'err')
				}
			}
		})
		// router.push({ path: "/" })
		// router.go(0)
		return Promise.reject();
	} else if (error.response.status === 404) {
		vue.$alert('页面不存在', '404错误', {
			confirmButtonText: '确定',
		});
		return Promise.reject();
	} else if (error.response.status === 402) {
		vue.$alert('请求次数限制', '402错误', {
			confirmButtonText: '确定',
		});
		return Promise.reject();
	} else {
		if (error.response.data.info != '参数错误') {
			vue.$message.error(error.response.data.info);
		}
	}
})
dzpMyGet.interceptors.response.use(response => {
	if (response.status === 200) {
		if (response.data.code == 401) {
			uni.navigateTo({
				url: '/pages/wode/xuanzeshenfen'
			})
		} else {
			return response.data
		}
	}
	// if (response.status === 200 && response.data.code == '200') {
	//     vue.$message({
	//         message: response.data.msg,
	//         type: "success",
	//     });
	//     return response.data;
	// }
	else {
		vue.$message.error(response.data.info);
		Promise.reject();
	}
}, error => {
	//错误跳转
	console.log(error);
	if (error.response.status === 500) {
		if (error.response.data.info != '参数错误') {
			vue.$message.error(error.response.data.info);
		}
	} else if (error.response.status === 401) {
		// sessionStorage.setItem("isLogin", false);
		// console.log(sessionStorage.getItem("isLogin"));
		uni.login({
			provider: 'weixin',
			success: async function(loginRes) {
				try {
					var code = loginRes.code;
					const res = await vue.$api.wx_login({
						logincode: code,
						nickname: '微信用户',
						userface: 'https://thirdwx.qlogo.cn/mmopen/vi_32/POgEwh4mIHO4nibH0KlMECNjjGxQUq24ZEaGT4poC6icRiccVGKSyXwibcPq4BWmiaIGuG1icwxaQX6grC9VemZoJ8rg/132',
					})
					console.log(res, '授权')
					if (res.result == 1) {
						uni.setStorage({
							key: 'token',
							data: res.token,
							success: async () => {
								if (res
									.user_category ==
									0) {
									uni.navigateTo({
										url: '/pages/wode/xuanzeshenfen'
									})
								} else if (res.user_category == 1) {
									const res33 = await vue.$api.user_info()
									console.log(res33, '3333')
									if (res33.is_joincompany == 1 || res33
										.is_licensestatus == 2) {
										uni.switchTab({
											url: '/pages/tabBar/index'
										})
									} else {
										uni.navigateTo({
											url: '/pages/tabBar/wode'
										})
									}
								} else if (res.user_category == 2) {
									uni.navigateTo({
										url: '/pages/tabBar/qzz_sy'
									})
								} else {
									uni.navigateBack({
										delta: 1
									})
								}
							}
						})
					} else {
						vue.$refs.uToast.show({
							title: res.msg,
							type: 'error',
						})
					}
				} catch (err) {
					console.log(err, 'err')
				}
			}
		})
		// router.push({ path: "/" })
		// router.go(0)
		return Promise.reject();
	} else if (error.response.status === 404) {
		vue.$alert('页面不存在', '404错误', {
			confirmButtonText: '确定',
		});
		return Promise.reject();
	} else if (error.response.status === 402) {
		vue.$alert('请求次数限制', '402错误', {
			confirmButtonText: '确定',
		});
		return Promise.reject();
	} else {
		if (error.response.data.info != '参数错误') {
			vue.$message.error(error.response.data.info);
		}
	}
})

export default {
	wx_login(obj) {
		obj = qs.stringify(obj)
		return myPost({
			url: urls.wx_login,
			data: obj
		})
	},
	user_upinfo(obj) {
		obj = qs.stringify(obj)
		return myPost({
			url: urls.user_upinfo,
			data: obj
		})
	},
	user_agreement(obj) {
		obj = qs.stringify(obj)
		return myGet({
			url: urls.user_agreement,
			data: obj
		})
	},
	user_info(obj) {
		obj = qs.stringify(obj)
		return myGet({
			url: urls.user_info,
			data: obj
		})
	},
	join_enterprise(obj) {
		obj = qs.stringify(obj)
		return myPost({
			url: urls.join_enterprise,
			data: obj
		})
	},
	user_edituserinfo(obj) {
		obj = qs.stringify(obj)
		return myPost({
			url: urls.user_edituserinfo,
			data: obj
		})
	},
	position_checkview(obj) {
		obj = qs.stringify(obj)
		return myGet({
			url: urls.position_checkview,
			data: obj
		})
	},
	authentication_enterprise(obj) {
		obj = qs.stringify(obj)
		return myPost({
			url: urls.authentication_enterprise,
			data: obj
		})
	},
	user_team(obj) {
		obj = qs.stringify(obj)
		return myPost({
			url: urls.user_team,
			data: obj
		})
	},
	team_operation(obj) {
		obj = qs.stringify(obj)
		return myPost({
			url: urls.team_operation,
			data: obj
		})
	},
	uploadToken() {
		return myGet({
			url: urls.uploadToken,
		})
	},
	authentication_enterpriseview(obj) {
		obj = qs.stringify(obj)
		return myGet({
			url: urls.authentication_enterpriseview,
			data: obj
		})
	},
	delTeam_operation(obj) {
		// obj = qs.stringify(obj)
		return myGet({
			url: urls.team_operation,
			params: {
				...obj
			}
		})
	},
	user_notify(obj) {
		obj = qs.stringify(obj)
		return myPost({
			url: urls.user_notify,
			data: obj
		})
	},
	user_notifyread(obj) {
		obj = qs.stringify(obj)
		return myPost({
			url: urls.user_notifyread,
			data: obj
		})
	},
	user_notifydel(obj) {
		obj = qs.stringify(obj)
		return myPost({
			url: urls.user_notifydel,
			data: obj
		})
	},
	problem_list(obj) {
		obj = qs.stringify(obj)
		return myPost({
			url: urls.problem_list,
			data: obj
		})
	},
	sendsms(obj) {
		obj = qs.stringify(obj)
		return myPost({
			url: urls.sendsms,
			data: obj
		})
	},
	create_position(obj) {
		obj = qs.stringify(obj)
		return myPost({
			url: urls.create_position,
			data: obj
		})
	},
	position_list(obj) {
		obj = qs.stringify(obj)
		return myPost({
			url: urls.position_list,
			data: obj
		})
	},
	position_making(obj) {
		obj = qs.stringify(obj)
		return myPost({
			url: urls.position_making,
			data: obj
		})
	},
	industryscategory(obj) {
		obj = qs.stringify(obj)
		return myPost({
			url: urls.industryscategory,
			data: obj
		})
	},
	jobpost_candidateview(obj) {
		obj = qs.stringify(obj)
		return myPost({
			url: urls.jobpost_candidateview,
			data: obj
		})
	},
	set_postnavigation(obj) {
		obj = qs.stringify(obj)
		return myPost({
			url: urls.set_postnavigation,
			data: obj
		})
	},
	jobcategory(obj) {
		obj = qs.stringify(obj)
		return myPost({
			url: urls.jobcategory,
			data: obj
		})
	},
	foreignlanguage(obj) {
		obj = qs.stringify(obj)
		return myPost({
			url: urls.foreignlanguage,
			data: obj
		})
	},
	position_userdel(obj) {
		obj = qs.stringify(obj)
		return myPost({
			url: urls.position_userdel,
			data: obj
		})
	},
	postnavigation_view(obj) {
		obj = qs.stringify(obj)
		return myPost({
			url: urls.postnavigation_view,
			data: obj
		})
	},
	position_useroperation(obj) {
		obj = qs.stringify(obj)
		return myPost({
			url: urls.position_useroperation,
			data: obj
		})
	},
	compost_jobpost(obj) {
		obj = qs.stringify(obj)
		return myPost({
			url: urls.compost_jobpost,
			data: obj
		})
	},
	headhunt_logo(obj) {
		obj = qs.stringify(obj)
		return myGet({
			url: urls.headhunt_logo,
			data: obj
		})
	},
	compost_progresslist(obj) {
		obj = qs.stringify(obj)
		return myPost({
			url: urls.compost_progresslist,
			data: obj
		})
	},
	positionstatistics_list(obj) {
		obj = qs.stringify(obj)
		return myPost({
			url: urls.positionstatistics_list,
			data: obj
		})
	},
	positionstatistics_statusset(obj) {
		obj = qs.stringify(obj)
		return myPost({
			url: urls.positionstatistics_statusset,
			data: obj
		})
	},
	jobpost_view(obj) {
		obj = qs.stringify(obj)
		return myPost({
			url: urls.jobpost_view,
			data: obj
		})
	},
	position_view(obj) {
		obj = qs.stringify(obj)
		return myPost({
			url: urls.position_view,
			data: obj
		})
	},
	teamstatistics_list(obj) {
		obj = qs.stringify(obj)
		return myPost({
			url: urls.teamstatistics_list,
			data: obj
		})
	},
	jobpost_list(obj) {
		obj = qs.stringify(obj)
		return myPost({
			url: urls.jobpost_list,
			data: obj
		})
	},
	compost_candidate(obj) {
		obj = qs.stringify(obj)
		return myPost({
			url: urls.compost_candidate,
			data: obj
		})
	},
	compost_candidateview(obj) {
		obj = qs.stringify(obj)
		return myPost({
			url: urls.compost_candidateview,
			data: obj
		})
	},
	jobpost_candidate(obj) {
		obj = qs.stringify(obj)
		return myPost({
			url: urls.jobpost_candidate,
			data: obj
		})
	},
	share_jobpost(obj) {
		obj = qs.stringify(obj)
		return myPost({
			url: urls.share_jobpost,
			data: obj
		})
	},
	tokentouserid(obj) {
		obj = qs.stringify(obj)
		return myGet({
			url: urls.tokentouserid,
			data: obj
		})
	},
	jobpost_candidateanalysis(obj) {
		obj = qs.stringify(obj)
		return myPost({
			url: urls.jobpost_candidateanalysis,
			data: obj
		})
	},
	acceptjobs_operation(obj) {
		obj = qs.stringify(obj)
		return myPost({
			url: urls.acceptjobs_operation,
			data: obj
		})
	},
	acceptjobs_view(obj) {
		obj = qs.stringify(obj)
		return myPost({
			url: urls.acceptjobs_view,
			data: obj
		})
	},
	swiper_list(obj) {
		obj = qs.stringify(obj)
		return myPost({
			url: urls.swiper_list,
			data: obj
		})
	},
	view_qrcode(obj) {
		obj = qs.stringify(obj)
		return myPost({
			url: urls.view_qrcode,
			data: obj
		})
	},
	check_qrcode(obj) {
		obj = qs.stringify(obj)
		return myPost({
			url: urls.check_qrcode,
			data: obj
		})
	},
	upload_pic(file, type) {
		return new Promise(async (resolve, reject) => {
			uni.uploadFile({
				url: `${urls.baseUrl}${urls.upload_pic}`,
				filePath: file.path,
				header: {
					"Content-Type": "multipart/form-data;charse=UTF-8",
					'Authorization': `Bearer ${uni.getStorageSync('token')}`,
				},
				name: 'image',
				formData: {
					token: uni.getStorageSync('token'),
					type,
				},
				success: (res) => {
					if (JSON.parse(res.data).code == 401) {
						uni.navigateTo({
							url: '/pages/wode/xuanzeshenfen'
						})
					}
					return resolve(JSON.parse(res.data))
				}
			})
		})
	},
}
