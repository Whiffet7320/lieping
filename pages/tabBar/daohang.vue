<template>
	<view class="index">
		<u-toast ref="uToast" />
		<!-- <view class="top"></view>
		<view class="nav1">
			<view class="n1-txt">导航介绍</view>
		</view> -->
		<u-navbar background='#f8faff' back-text="导航介绍" back-icon-size='36'></u-navbar>
		<view style="margin-top: calc(24rpx);" class="nav2">
			<image class="n2-img" src="/static/newImage/tabBar/weitu.png" mode=""></image>
			<view class="n2-right">
				<view class="txt1">猎头导航</view>
				<view class="txt2">简历匹配分析插件</view>
				<view class="txt3">注：建议谷歌Chrome和360极速</view>
			</view>
		</view>
		<view class="nav3">
			<view class="n3-l">链接：<text :class="{'mohu':userObj.is_joincompany == 0}">{{url2}}</text></view>
			<view v-if="true" class="n3-r" @click="fuzhi">
				<image class="immg" src="/static/newImage/tabBar/bianzu12.png" mode=""></image>
				<view class="txx">复制</view>
			</view>
			<view v-else class="n3-r">
				<image class="immg" src="/static/newImage/tabBar/zu1013.png" mode=""></image>
				<view class="txx" style="color: #cac8c8;">复制</view>
			</view>
		</view>
		<view class="nav4">
			<view class="n4-tit1">1.猎头导航全流程指南</view>
			<view class="n4-tit2">
				<view class="b1">管理员</view>
				<view class="b2">团队</view>
			</view>
		</view>
		<view class="nav5">
			<image class="n5-img" src="/static/newImage/tabBar/weitu2.png" mode=""></image>
			<view class="txt5-1" style="top: 60rpx;left: 88rpx;">创建岗位</view>
			<view class="txt5-1" style="top: 60rpx;left: 376rpx;">理解岗位</view>
			<view class="txt5-1" style="top: 204rpx;left: 88rpx;">设置导航</view>
			<view class="txt5-1" style="top: 204rpx;left: 404rpx;">做单</view>
			<view class="txt5-1" style="top: 374rpx;left: 168rpx;">参照</view>
			<view class="txt5-1" style="top: 350rpx;left: 376rpx;">招聘网站</view>
			<view class="txt5-1" style="top: 418rpx;left: 346rpx;">填写搜索条件</view>
			<view class="txt5-1" style="top: 558rpx;left: 376rpx;">猎头导航</view>
			<view class="txt5-1" style="top: 626rpx;left: 346rpx;">智能分析简历</view>
			<view class="txt5-1" style="top: 766rpx;left: 62rpx;">发布到求职端</view>
			<view class="txt5-1" style="top: 766rpx;left: 404rpx;">转发</view>
			<view class="txt5-1" style="top: 910rpx;left: 404rpx;">应聘</view>
			<view class="txt5-1" style="top: 978rpx;left: 332rpx;">智能分析匹配度</view>
			<view class="txt5-1" style="top: 420rpx;left: 652rpx;width: 26rpx;">统计分析提高</view>
		</view>
		<view class="nav4">
			<view class="n4-tit1">2.电脑软件效果展示</view>
		</view>
		<view class="nav6">
			<image class="n6-left" src="/static/newImage/tabBar/zu1000.png" mode=""></image>
			<image class="n6-left" src="/static/newImage/tabBar/zu1001.png" mode=""></image>
		</view>
		<view class="nav4">
			<view class="n4-tit1">3.电脑软件安装及使用流程</view>
		</view>
		<view class="nav5 nav7">
			<image class="n5-img" src="/static/newImage/tabBar/zu1002.png" mode=""></image>
			<view class="txt5-1" style="top: 58rpx;left: 90rpx;">复制下载链接</view>
			<view class="txt5-1" style="top: 40rpx;left: 486rpx;width: 196rpx;text-align: center;">小程序选岗位点做单</view>
			<view class="txt5-1" style="top: 198rpx;left: 90rpx;width: 168rpx;">电脑端浏览器输入下载链接</view>
			<view class="txt5-1" style="top: 214rpx;left: 510rpx;">打开猎聘网</view>
			<view class="txt5-1" style="top: 284rpx;left: 462rpx;font-size: 26rpx;">目前仅服务猎聘用户</view>
			<view class="txt5-1" style="top: 387rpx;left: 90rpx;">下载安装文件</view>
			<view class="txt5-1" style="top: 420rpx;left: 522rpx;">打开简历</view>
			<view class="txt5-1" style="top: 516rpx;left: 92rpx;">双击完成安装</view>
			<view class="txt5-1" style="top: 586rpx;left: 42rpx;font-size: 26rpx;">安装后不要点桌面图标</view>
			<view class="txt5-1" style="top: 558rpx;left: 480rpx;width: 196rpx;">右侧浮窗插件显示简历分析结果</view>
		</view>
		<u-tabbar active-color="#121212" icon-size='60' height='120' mid-button-size="156" v-model="current"
			:list="tabbarlist" @change='changeTabbar' :mid-button="true"></u-tabbar>
	</view>
</template>

<script>
	import {
		mapGetters,
		mapState
	} from "vuex";
	export default {
		computed: {
			...mapGetters(['isLogin']),
			...mapState(['haveDot'])
		},
		data() {
			return {
				url: 'd.lietoudaohang.com/Setup.exe',
				url2: 'd.lietoudaohang.com/Setup.exe',
				logo: "",
				tabbarlist: [{
						iconPath: "/static/newImage/tabBarIcon/1-1.png",
						selectedIconPath: "/static/newImage/tabBarIcon/1-2.png",
						text: '首页',
						customIcon: false,
						pagePath: "/pages/tabBar/index"
					},
					{
						iconPath: "/static/newImage/tabBarIcon/2-1.png",
						selectedIconPath: "/static/newImage/tabBarIcon/2-2.png",
						text: '团队',
						customIcon: false,
						pagePath: "/pages/tabBar/tuandui"
					},
					{
						iconPath: "https://rushifu-test.oss-cn-hangzhou.aliyuncs.com/1664157631290.png",
						selectedIconPath: "https://rushifu-test.oss-cn-hangzhou.aliyuncs.com/1664157631290.png",
						// text: '发布',
						midButton: true,
						customIcon: false,
						// pagePath: "/pages/tabBar/daohang"
					},
					{
						iconPath: "/static/newImage/tabBarIcon/3-1.png",
						selectedIconPath: "/static/newImage/tabBarIcon/3-2.png",
						text: '导航',
						customIcon: false,
						pagePath: "/pages/tabBar/daohang"
					},
					{
						iconPath: "/static/newImage/tabBarIcon/4-1.png",
						selectedIconPath: "/static/newImage/tabBarIcon/4-2.png",
						text: '我的',
						customIcon: false,
						pagePath: "/pages/tabBar/wode",
						isDot: false,
					},
				],
				current: 2,
				isGLY: null,
				userObj: {},
			}
		},
		onShow() {
			this.$set(this.tabbarlist[4], 'isDot', this.haveDot)
			this.getLogo();
			this.getUserInfo()
		},
		methods: {
			async getUserInfo() {
				const res = await this.$api.user_info()
				this.userObj = res
				if (res.result == 1) {
					uni.setStorageSync('userObj', this.userObj);
				}
				if (this.userObj.joincompany.com_ismanage == 1) {
					this.isGLY = true
				} else {
					this.isGLY = false
				}
				if (this.userObj.notify_num > 0) {
					this.$store.commit('haveDot', true)
				} else {
					this.$store.commit('haveDot', false)
				}
				this.$set(this.tabbarlist[4], 'isDot', this.haveDot)
				console.log(this.isGLY)
			},
			async getLogo() {
				const res = await this.$api.headhunt_logo()
				this.logo = res.logopic_url
			},
			// changeTabbar(i) {
			// 	if (i == 2) {
			// 		if (!this.isGLY) {
			// 			this.$refs.uToast.show({
			// 				title: '您不是管理员,无法创建岗位',
			// 			})
			// 		} else if (this.noJoin) {
			// 			this.$refs.uToast.show({
			// 				title: '您未加入猎企,无法创建岗位',
			// 			})
			// 		} else {
			// 			uni.navigateTo({
			// 				url: '/pages/gangwei/chuanjiangangwei'
			// 			})
			// 		}
			// 	}
			// },
			changeTabbar(i) {
				if (i == 2) {
					// if (!this.isGLY) {
					// 	this.$refs.uToast.show({
					// 		title: '您不是管理员,无法创建岗位',
					// 	})
					// } else if (this.noJoin) {
					// 	this.$refs.uToast.show({
					// 		title: '您未加入猎企,无法创建岗位',
					// 	})
					// } else {
					// 	uni.navigateTo({
					// 		url: '/pages/gangwei/chuanjiangangwei'
					// 	})
					// }
					uni.navigateTo({
						url: '/pages/gangwei/chuanjiangangwei'
					})
				}
			},
			fuzhi() {
				if (this.userObj.is_joincompany == 0) {
					uni.navigateTo({
						url: '/pages/wode/jiaru'
					})
				} else {
					uni.setClipboardData({
						data: this.url,
						showToast: false,
						success: () => {
							uni.hideToast();
							uni.showToast({
								title: "已复制，请到电脑端下载",
								icon: "success"
							})
						}
					});
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
	/deep/ .u-navbar-fixed {
		background: #fff !important;
	}

	/deep/ .u-position-center {
		width: 412rpx;
	}

	.index {
		position: relative;
	}

	/deep/ .u-tabbar__content__circle__button {
		top: -10rpx !important;
	}

	/deep/ .u-tabbar__content__circle__border {
		height: 0 !important;
		width: 0 !important;
	}

	/deep/ .u-navbar {
		.u-icon__icon {
			margin-left: 8rpx;
			font-weight: 600 !important;
			color: #000 !important;
			display: none;
		}

		.u-back-text {
			font-size: 36rpx;
			margin-left: 8rpx;
			font-weight: 600;
			color: #000 !important;
		}
	}

	.top {
		position: fixed;
		top: 0rpx;
		z-index: 1000;
		height: 88rpx;
		width: 100%;
		background: #fff;
	}

	.nav1 {
		z-index: 1000;
		position: fixed;
		top: 88rpx;
		background: #fff;
		width: 100%;
		height: 88rpx;
		display: flex;
		align-items: center;
		font-size: 36rpx;
		font-family: PingFangSC, PingFangSC-Medium;
		font-weight: 600;
		color: #000000;
		// padding-top: 128rpx;
		// padding-left: 34rpx;
		padding: 20rpx 32rpx 20rpx 32rpx;

		/deep/ .uicon-arrow-left {
			font-weight: 800 !important;
		}
	}

	.nav2 {
		display: flex;
		align-items: center;
		padding: 0 20rpx;

		.n2-img {
			width: 170rpx;
			height: 170rpx;
		}

		.n2-right {
			margin-left: 50rpx;

			.txt1 {
				font-size: 48rpx;
				font-family: PingFangSC, PingFangSC-Semibold;
				font-weight: 600;
				color: #121212;
			}

			.txt2 {
				font-size: 32rpx;
				font-family: PingFangSC, PingFangSC-Regular;
				font-weight: 400;
				color: #121212;
				margin: 12rpx 0;
			}

			.txt3 {
				font-size: 26rpx;
				font-family: PingFangSC, PingFangSC-Regular;
				font-weight: 400;
				color: #707070;
			}
		}
	}

	.nav3 {
		width: 710rpx;
		height: 80rpx;
		background: #ffffff;
		border: 2rpx solid #ffffff;
		border-radius: 10rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 32rpx 0 48rpx;
		margin-top: 52rpx;
		margin-left: 20rpx;

		.n3-l {
			font-size: 28rpx;
			font-family: PingFangSC, PingFangSC-Regular;
			font-weight: 400;
			color: #6c6c6c;

			.mohu {
				filter: blur(4rpx);
			}
		}

		.n3-r {
			display: flex;
			align-items: center;

			.immg {
				width: 32rpx;
				height: 32rpx;
			}

			.txx {
				margin-left: 4rpx;
				font-size: 26rpx;
				font-family: PingFangSC, PingFangSC-Regular;
				font-weight: 400;
				color: #1362fd;
			}
		}
	}

	.nav4 {
		margin-top: 48rpx;
		padding: 0 20rpx;

		.n4-tit1 {
			font-size: 32rpx;
			font-family: PingFangSC, PingFangSC-Regular;
			font-weight: 400;
			color: #121212;
		}

		.n4-tit2 {
			display: flex;
			align-items: center;
			justify-content: space-between;
			margin-top: 40rpx;

			.b1 {
				width: 252rpx;
				height: 80rpx;
				background: #1362fd;
				font-size: 28rpx;
				font-family: PingFangSC, PingFangSC-Medium;
				font-weight: 500;
				text-align: center;
				color: #ffffff;
				line-height: 80rpx;
			}

			.b2 {
				width: 414rpx;
				height: 80rpx;
				background: #1362fd;
				font-size: 28rpx;
				font-family: PingFangSC, PingFangSC-Medium;
				font-weight: 500;
				text-align: center;
				color: #ffffff;
				line-height: 80rpx;
			}
		}
	}

	.nav5 {
		margin-top: 12rpx;
		position: relative;
		width: 750rpx;
		height: 1088rpx;

		.n5-img {
			position: absolute;
			width: 750rpx;
			height: 1088rpx;
			left: 0;
			top: 0;
		}

		.txt5-1 {
			position: absolute;
			font-size: 28rpx;
			font-family: PingFangSC, PingFangSC-Medium;
			font-weight: 500;
			color: #616161;
		}
	}

	.nav6 {
		padding: 0 20rpx;
		margin-top: 36rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;

		.n6-left {
			width: 346rpx;
			height: 602rpx;
		}
	}

	.nav7 {
		width: 750rpx;
		height: 674rpx;

		.n5-img {
			position: absolute;
			width: 750rpx;
			height: 674rpx;
			left: 0;
			top: 0;
		}
	}
</style>
