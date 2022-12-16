<template>
	<view class="index">
		<view class="top"></view>
		<!-- <view class="nav1">
			<u-icon @click='toBack' style='margin-right: 12rpx;' name="arrow-left" color="#fff" size="36"></u-icon>
			<view @click='toBack' class="n1-txt">职位详情</view>
		</view> -->
		<u-navbar v-if='!noBack' back-text="职位详情" back-icon-size='36'></u-navbar>
		<view v-else @click='toshouye'>
			<u-navbar back-text="职位详情" back-icon-size='36'></u-navbar>
		</view>
		<mypopover ref='pop' class="popov1" @select='changePop' :modalLeftPos='"20rpx"' :modalTopPos='"40rpx"'
			:modalOpacity='"1"' :active="popover">
		</mypopover>
		<view style="margin-top: calc(100rpx);" class="nav2">
			<view class="item" v-if="!noJob">
				<view class="i-tit1">
					<view class="txx1">{{obj.jobs}}</view>
					<view class="txx2">{{obj.salary_range}}</view>
				</view>
				<view class="i-tit2">
					<view class="txx1">{{obj.com_name}}</view>
					<view class="txx1">{{obj.work_place}}</view>
				</view>
			</view>
			<view class="item" v-else>
				<view class="noJ">岗位已下架</view>
			</view>
			<view v-if="!noJob" style="background: #FFF;padding-top: 196rpx;" class="nav33">
				<view @click="toPipeidu" class="nav3">测试匹配度</view>
			</view>
			<view v-else style="background: #FFF;padding-top: 196rpx;" class="nav33">
				<view class="nav3 no">测试匹配度</view>
			</view>

			<view class="nav4">算法模型测匹配度 指引职业发展方向</view>
			<!-- <button open-type="share" type="default" >123</button> -->
			<view v-if="!noJob" style="background: #FFF;padding-top: 92rpx;">
				<view class="nav5" @click="pop1Show = true">
					<image class="n5-img" src="/static/newImage/tabBar/zf.png" mode=""></image>
				</view>
			</view>
			<view v-else style="background: #FFF;padding-top: 92rpx;">
				<view class="nav5">
					<image class="n5-img" src="/static/newImage/tabBar/zf.png" mode=""></image>
				</view>
			</view>
			<view style="width: 100vw;height: 90rpx;background: #fff;"></view>
			<u-popup @close='close' v-model="pop1Show" height='408' border-radius="16" closeable mode="bottom">
				<view class="pop1">
					<view class="p1-txt1">分享</view>
					<view class="p1-txt2">
						<button @click="yaoqin" open-type="share" data-name='shareBtn' class="b1">
							<u-icon name="weixin-fill" color="#07c167" size="60"></u-icon>
							<view class="down">微信好友</view>
						</button>
						<button @click="pyq" style="margin-left: 66rpx;" class="b1">
							<u-icon name="moments" color="#65cf21" size="60"></u-icon>
							<view class="down">朋友圈</view>
						</button>
					</view>
				</view>
			</u-popup>
		</view>

	</view>
</template>

<script>
	import mypopover from "@/components/my-popover/dean-popover5.vue"
	export default {
		data() {
			return {
				pop1Show: false,
				obj: {},
				shareTitle: "",
				user_id: "",
				post_id: "",
				noBack: false,
				popover: false,
				arr: [],
				noJob:false,
			}
		},
		components: {
			mypopover,
		},
		onShow() {

		},
		// 用户点击右上角分享转发
		onShareAppMessage: async function() {
			console.log('111')
			const res = await this.$api.tokentouserid({
				token: uni.getStorageSync('token'),
			})
			this.user_id = res.user_id
			const res2 = await this.$api.share_jobpost({
				post_id: this.post_id,
				share_fromuserid: this.user_id,
			})
			this.shareTitle = `职位-${res2.job_post.jobs}-${res2.job_post.salary_range}`
			console.log(this.shareTitle)
			return {
				title: this.shareTitle,
				path: `/pages/qzz/zhiweixiangqin?scene=${this.post_id}_${this.user_id}`,
				imageUrl: 'https://rushifu-test.oss-cn-hangzhou.aliyuncs.com/1668752961132.png'
			}
		},
		// //用户点击右上角分享朋友圈
		// onShareTimeline: async function() {
		// 	const res = await this.$api.tokentouserid({
		// 		token: uni.getStorageSync('token'),
		// 	})
		// 	this.user_id = res.user_id
		// 	const res2 = await this.$api.share_jobpost({
		// 		post_id: this.post_id,
		// 		share_fromuserid: this.user_id,
		// 	})
		// 	this.shareTitle = `职位-${res2.job_post.jobs}-${res2.job_post.salary_range}`
		// 	console.log(this.shareTitle)
		// 	return {
		// 		title: this.shareTitle,
		// 		path: `/pages/qzz/zhiweixiangqin?scene=${this.post_id}_${this.user_id}`,
		// 	}
		// },
		async onLoad(option) {
			const that = this
			console.log(option, 'op')
			if (option.post_id) {
				this.post_id = option.post_id;
				this.$store.commit('post_id', this.post_id)
			}
			console.log(option.scene, 'opsc')
			if (option.scene) {
				this.noBack = true;
				this.arr = option.scene.split('_');
				console.log(this.arr, 'arr')
				this.post_id = this.arr[0];
				uni.login({
					provider: 'weixin',
					success: async function(loginRes) {
						try {
							var code = loginRes.code;
							const res = await that.$api.wx_login({
								logincode: code,
								nickname: '微信用户',
								userface: 'https://thirdwx.qlogo.cn/mmopen/vi_32/POgEwh4mIHO4nibH0KlMECNjjGxQUq24ZEaGT4poC6icRiccVGKSyXwibcPq4BWmiaIGuG1icwxaQX6grC9VemZoJ8rg/132',
							})
							console.log(res, '授权')
							if (res.result == 1) {
								uni.setStorage({
									key: 'token',
									data: res.token,
								})
							}
						} catch (err) {
							console.log(err, 'err')
						}
					}
				})

				// const res = await this.$api.tokentouserid({
				// 	token: uni.getStorageSync('token'),
				// })
				// const res2 = await this.$api.share_jobpost({
				// 	post_id: this.post_id,
				// 	share_fromuserid: arr[1],
				// 	share_touserid: res.user_id
				// })
			}
			this.getData()
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
			// 	this.shareTitle = `${res2.job_post.jobs},进来自测匹配度`
			// 	console.log(this.shareTitle)
			// 	uni.setNavigationBarTitle({
			// 		title: this.shareTitle,
			// 	});
			// } else {
			// 	uni.setNavigationBarTitle({
			// 		title: '猎头导航让猎头做单更高效',
			// 	});
			// }
		},
		methods: {
			close() {
				this.popover = false;
			},
			async changePop() {
				this.popover = false;
				console.log(this.popover)
			},
			toshouye() {
				uni.reLaunch({
					url: "/pages/tabBar/qzz_sy"
				});
			},
			async getData() {
				const res = await this.$api.jobpost_view({
					post_id: this.post_id
				})
				this.obj = res.job_post
				if(!this.obj.jobs){
					this.noJob = true;
				}else{
					this.noJob = false;
				}
			},
			pyq() {
				this.popover = true;
			},
			async yaoqin() {
				const res = await this.$api.tokentouserid({
					token: uni.getStorageSync('token'),
				})
				this.user_id = res.user_id
				const res2 = await this.$api.share_jobpost({
					post_id: this.post_id,
					share_fromuserid: this.user_id,
				})
				this.shareTitle = `职位-${res2.job_post.jobs}-${res2.job_post.salary_range}`
				this.$store.commit('shareTitle', this.shareTitle)
			},
			fenxiang() {
				// uni.share({
				// 	provider: "weixin",
				// 	scene: "WXSceneSession",
				// 	type: 0,
				// 	href: "http://uniapp.dcloud.io/",
				// 	title: "uni-app分享",
				// 	summary: "我正在使用HBuilderX开发uni-app，赶紧跟我一起来体验！",
				// 	imageUrl: "https://bjetxgzv.cdn.bspapp.com/VKCEYUGU-uni-app-doc/d8590190-4f28-11eb-b680-7980c8a877b8.png",
				// 	success: function (res) {
				// 		console.log("success:" + JSON.stringify(res));
				// 	},
				// 	fail: function (err) {
				// 		console.log("fail:" + JSON.stringify(err));
				// 	}
				// });
			},
			toBack() {
				uni.navigateBack({
					delta: 1
				})
			},
			async toPipeidu() {
				// uni.navigateTo({
				// 	url: `/pages/qzz/ceshipipeidu?post_id=${this.obj.id}`
				// })
				const res = await this.$api.tokentouserid({
					token: uni.getStorageSync('token'),
				})
				const res2 = await this.$api.share_jobpost({
					post_id: this.post_id,
					share_fromuserid: this.arr[1],
					share_touserid: res.user_id
				})
				if (res2.result == 1) {
					uni.navigateTo({
						url: `/pages/qzz/ceshipipeidu?post_id=${this.obj.id}`
					})
				}

			},
		}
	}
</script>

<style lang="scss">
	page {
		background: #f8faff;
	}
</style>
<style lang="scss" scoped>
	.index {
		position: relative;
	}

	/deep/ .u-navbar-fixed {
		background: transparent !important;
		z-index: 99999 !important;
	}

	/deep/ .u-navbar .u-back-text {
		color: #fff !important;
	}

	/deep/ .u-navbar .u-icon__icon {
		color: #fff !important;
	}

	.top {
		position: fixed;
		top: 0rpx;
		z-index: 1000;
		width: 100%;
		background: #f8faff;
		// height: 536rpx;
		height: calc(constant(safe-area-inset-top) + 448rpx);
		height: calc(env(safe-area-inset-top) + 448rpx);
		background: linear-gradient(136deg, #94bdff, #1664fd 98%);
		border: 2rpx solid #979797;
		border-bottom-right-radius: 124rpx;
		border-bottom-left-radius: 124rpx;
	}

	.nav1 {
		z-index: 1000;
		position: fixed;
		top: 88rpx;
		// background: #f8faff;
		width: 100%;
		height: 88rpx;
		display: flex;
		align-items: center;
		font-size: 36rpx;
		font-family: PingFangSC, PingFangSC-Medium;
		font-weight: 600;
		color: #fff;
		// padding-top: 128rpx;
		// padding-left: 34rpx;
		padding: 20rpx 32rpx 20rpx 32rpx;

		/deep/ .uicon-arrow-left {
			font-weight: 800 !important;
		}
	}

	.nav2 {
		position: relative;
		z-index: 9999;
		padding: 0 20rpx;

		.item {
			margin-top: 32rpx;
			padding: 36rpx 48rpx 66rpx 48rpx;
			background: #ffffff;
			width: 710rpx;
			// height: 268rpx;
			background: #ffffff;
			border-top-left-radius: 20rpx;
			border-top-right-radius: 20rpx;
			.noJ{
				font-size: 40rpx;
			}
			.i-tit1 {
				padding-top: 32rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;

				.txx1 {
					font-size: 36rpx;
					font-family: PingFangSC, PingFangSC-Semibold;
					font-weight: 600;
					color: #000000;
					width: 330rpx;
					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 2;
				}

				.txx2 {
					font-size: 36rpx;
					font-family: PingFangSC, PingFangSC-Semibold;
					font-weight: 600;
					color: #4281f8;
				}
			}

			.i-tit2 {
				margin-top: 48rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;

				.txx1 {
					font-size: 32rpx;
					font-family: PingFangSC, PingFangSC-Regular;
					font-weight: 400;
					color: #333333;
					line-height: 36rpx;
				}
			}
		}
	}

	.nav3 {
		margin: 0 auto 0 auto;
		width: 268rpx;
		height: 268rpx;
		background: linear-gradient(180deg, #96bfff, #1362fd);
		border-radius: 50%;
		// box-shadow: 0rpx 8rpx 8rpx 0rpx rgba(95, 128, 253, 0.41);
		font-size: 36rpx;
		font-family: PingFangSC, PingFangSC-Medium;
		font-weight: 500;
		text-align: center;
		color: #ffffff;
		line-height: 268rpx;
	}
	.nav3.no{
		background: #888888;
	}

	.nav4 {
		font-size: 24rpx;
		font-family: PingFangSC, PingFangSC-Regular;
		font-weight: 400;
		text-align: center;
		color: #333333;
		padding-top: 32rpx;
		background: #fff;
	}

	.nav5 {
		display: flex;
		align-items: center;
		justify-content: center;
		margin: 0rpx auto 0 auto;
		width: 76rpx;
		height: 76rpx;
		border: 2rpx solid #1362fd;
		border-radius: 50%;

		.n5-img {
			width: 48rpx;
			height: 48rpx;
		}
	}

	.pop1 {
		padding: 30rpx 40rpx;

		.p1-txt1 {
			font-size: 28rpx;
			font-family: PingFangSC, PingFangSC-Regular;
			font-weight: 400;
			color: #121212;
		}

		.p1-txt2 {
			display: flex;
			align-items: center;
			margin-top: 74rpx;

			button::after {
				border: none;
			}

			button {
				position: relative;
				display: block;
				margin-left: 0;
				margin-right: 0;
				padding-left: 0px;
				padding-right: 0px;
				box-sizing: border-box;
				// font-size: 18px;
				text-align: center;
				text-decoration: none;
				// line-height: 1;
				line-height: 1.35;
				// border-radius: 5px;
				-webkit-tap-highlight-color: transparent;
				overflow: hidden;
				color: #000000;
				background-color: #fff;
				height: 100%;
			}

			.b1 {
				display: flex;
				flex-direction: column;
				align-items: center;

				.down {
					margin-top: 20rpx;
					font-size: 24rpx;
					font-family: PingFangSC, PingFangSC-Regular;
					font-weight: 400;
					color: #707070;
				}
			}
		}
	}
</style>
