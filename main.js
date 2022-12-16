import Vue from 'vue'
import App from './App'
import uView from "uview-ui";
import api from 'api/index.js';
import md5 from 'static/md5.min.js'
import store from './store';
// import OSS from 'ali-oss';
import {
	Base64
} from 'js-base64/base64.js';
import crypto from 'crypto-js';
import share from './static/share.js'

Vue.use(uView);
Date.prototype.format = function (format) {
  var o = {
    "M+": this.getMonth() + 1, //month
    "d+": this.getDate(),    //day
    "h+": this.getHours(),   //hour
    "m+": this.getMinutes(), //minute
    "s+": this.getSeconds(), //second
    "q+": Math.floor((this.getMonth() + 3) / 3),  //quarter
    "S": this.getMilliseconds() //millisecond
  }
  if (/(y+)/.test(format)) format = format.replace(RegExp.$1,
    (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o) if (new RegExp("(" + k + ")").test(format))
    format = format.replace(RegExp.$1,
      RegExp.$1.length == 1 ? o[k] :
        ("00" + o[k]).substr(("" + o[k]).length));
  return format;
}
// 阿里云上传oss图片
function ossUpload(val, tempFilePath = '') {
	const that = this;
	return new Promise(async (resolve, reject) => {
		const date = new Date();
		date.setHours(date.getHours() + 1);
		const policyText = {
			expiration: date.toISOString(), // 设置policy过期时间。
			conditions: [
				// 限制上传大小。
				["content-length-range", 0, 1024 * 1024 * 1024],
			],
		};

		let tiemr = new Date();
		let address = tiemr.getFullYear() + '' + (tiemr.getMonth() + 1) + '' + tiemr
			.getDate();
		const policy = Base64.encode(JSON.stringify(policyText));
		const res1 = await that.$api.uploadToken();
		const signature = crypto.enc.Base64.stringify(crypto.HmacSHA1(
			policy, res1.accessKeySecret));
		signature
		if (val == 'img') {
			// 上传图片
			uni.chooseImage({
				count: 1,
				success: async function(res) {
					var imageSrc = res.tempFilePaths[0];
					console.log(imageSrc)
					let str = res.tempFilePaths[0].substr(res.tempFilePaths[0].lastIndexOf(
						'.'));
					let nameStr = address + tiemr.getTime() + str;
					uni.uploadFile({	
						url: `https://${res1.bucket}.${res1.url}`, //输入你的bucketname.endpoint
						filePath: imageSrc,
						name: 'file',
						formData: {
							key: nameStr,
							policy: policy, // 输入你获取的的policy
							OSSAccessKeyId: res1.accessKeyId, // 输入你的AccessKeyId
							signature: signature, // 输入你获取的的signature
							'x-oss-security-token': res1.stsToken
						},
						success: res => {
							if (res.statusCode == '204') {
								return resolve(
									`https://${res1.bucket}.${res1.url}/${nameStr}`
								)
							} else {
								console.log(res);
							}
						}
					})
				}
			});

		} else if (val == 'voice') {
			// 上传音频
			let str = tempFilePath.substr(tempFilePath.lastIndexOf(
				'.'));
			let nameStr = address + tiemr.getTime() + str;
			uni.uploadFile({
				url: `https://${res1.bucket}.${res1.url}`, //输入你的bucketname.endpoint
				filePath: tempFilePath,
				name: 'file',
				formData: {
					key: nameStr,
					policy: policy, // 输入你获取的的policy
					OSSAccessKeyId: res1.accessKeyId, // 输入你的AccessKeyId
					signature: signature, // 输入你获取的的signature
					'x-oss-security-token': res1.stsToken
				},
				success: res => {
					if (res.statusCode == '204') {
						return resolve(
							`https://${res1.bucket}.${res1.url}/${nameStr}`)
					} else {
						console.log(res);
					}
				}
			})
		}

	})

}

Vue.prototype.$OSSUpload = ossUpload;
Vue.prototype.$Base64 = Base64;
Vue.config.productionTip = false
Vue.prototype.$OSS = md5
Vue.prototype.$apikey = "2AA881310EF08E68659107D9D70D40A1";
Vue.prototype.$api = api
Vue.prototype.$md5 = md5
Vue.mixin(share)
App.mpType = 'app'


const app = new Vue({
	...App,
	store,
})
app.$mount()
