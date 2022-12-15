import {
	mapGetters,
	mapState
} from "vuex";
export default {
	data() {
		return {
			user_id: '',
			shareTitle: "",
		}
	},
	computed: {
		...mapState(['post_id'])
	},
	async created() {
		let curPage = getCurrentPages();
		let route = curPage[curPage.length - 1].route;
		console.log(route)
		if (this.post_id != '') {
			const res = await this.$api.tokentouserid({
				token: uni.getStorageSync('token'),
			})
			this.user_id = res.user_id
			const res2 = await this.$api.share_jobpost({
				post_id: this.post_id,
				share_fromuserid: this.user_id,
			})
			this.$store.commit('post_id', '')
			this.shareTitle = `${res2.job_post.jobs},进来自测匹配度`
			console.log(this.shareTitle)
			uni.setNavigationBarTitle({
				title: this.shareTitle,
			});
		} else {
			uni.setNavigationBarTitle({
				title: '猎头导航让猎头做单更高效',
			});
		}
	},
	onLoad: () => {
		wx.showShareMenu({
			withShareTicket: true,
			menus: ["shareAppMessage", "shareTimeline"]
		})
	},
	onShareAppMessage(res) {
		let that = this;
		let imageUrl = that.shareUrl || '';
		if (res.from === 'button') {
			//这块需要传参，不然链接地址进去获取不到数据
			// let path = `/` + that.$scope.route + `?item=` + that.$scope.options.item;
			// return {
			// 	title: '猎头导航让猎头做单更高效',
			// 	path: path,
			// 	// imageUrl: imageUrl,
			// 	imageUrl: 'https://rushifu-test.oss-cn-hangzhou.aliyuncs.com/1666921393169.png'
			// };
			return {
				title: '猎头导航让猎头做单更高效',
				path: '/pages/tabBar/index',
				// imageUrl: imageUrl,
				imageUrl: 'https://rushifu-test.oss-cn-hangzhou.aliyuncs.com/1668752961132.png'
			};
		}
		if (res.from === 'menu') {
			return {
				title: '猎头导航让猎头做单更高效',
				path: '/pages/tabBar/index',
				// imageUrl: imageUrl,
				imageUrl: 'https://rushifu-test.oss-cn-hangzhou.aliyuncs.com/1668752961132.png'
			};
		}
	},
	// 分享到朋友圈
	async onShareTimeline() {
		// console.log(this.post_id)
		// if (this.post_id != '') {
		// 	const res = await this.$api.tokentouserid({
		// 		token: uni.getStorageSync('token'),
		// 	})
		// 	this.user_id = res.user_id
		// 	const res2 = await this.$api.share_jobpost({
		// 		post_id: this.post_id,
		// 		share_fromuserid: this.user_id,
		// 	})
		// 	this.$store.commit('post_id', '')
		// 	this.shareTitle = `职位-${res2.job_post.jobs}-进来自测匹配度`
		// 	console.log(this.shareTitle)
		// 	uni.setNavigationBarTitle({
		// 		title: this.shareTitle,
		// 		success: () => {
		// 			return {
		// 				title: this.shareTitle,
		// 				path: `/pages/qzz/zhiweixiangqin?scene=${this.post_id}_${this.user_id}`,
		// 				imageUrl: 'https://rushifu-test.oss-cn-hangzhou.aliyuncs.com/1666921393169.png'
		// 			}
		// 		}
		// 	});
		// } else {
		// 	uni.setNavigationBarTitle({
		// 		title: '猎头导航让猎头做单更高效',
		// 		success: () => {
		// 			return {
		// 				title: '猎头导航让猎头做单更高效',
		// 				path: '/pages/tabBar/index',
		// 				imageUrl: 'https://rushifu-test.oss-cn-hangzhou.aliyuncs.com/1666921393169.png'
		// 			}
		// 		}
		// 	});
		// }
		console.log(this.shareTitle)
		if (this.post_id != '') {
			return {
				title: this.shareTitle,
				path: `/pages/qzz/zhiweixiangqin?scene=${this.post_id}_${this.user_id}`,
				imageUrl: 'https://rushifu-test.oss-cn-hangzhou.aliyuncs.com/1666921393169.png'
			}
		} else {
			return {
				title: this.shareTitle,
				path: '/pages/tabBar/index',
				imageUrl: 'https://rushifu-test.oss-cn-hangzhou.aliyuncs.com/1666921393169.png'
			}
		}
		// return {
		// 	title: '猎头导航让猎头做单更高效',
		// 	path: '/pages/tabBar/index',
		// 	imageUrl: 'https://rushifu-test.oss-cn-hangzhou.aliyuncs.com/1666921393169.png'
		// }
	},
	methods: {

	}
}
