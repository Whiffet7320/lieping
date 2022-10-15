<template>
	<view class="index">
		<view class="top"></view>
		<view class="nav1">
			<u-icon @click='toBack' style='margin-right: 12rpx;' name="arrow-left" color="#fff" size="36"></u-icon>
			<view @click='toBack' class="n1-txt">职位详情</view>
		</view>
		<view style="margin-top: calc(176rpx + 100rpx);" class="nav2">
			<view class="item">
				<view class="i-tit1">
					<view class="txx1">销售经理</view>
					<view class="txx2">10-20K*15薪</view>
				</view>
				<view class="i-tit2">
					<view class="txx1">天宇传媒有限公司</view>
					<view class="txx1">哈萨克斯坦</view>
				</view>
			</view>
			<view @click="toPipeidu" class="nav3">测试匹配度</view>
			<view class="nav4">算法模型测匹配度 指引职业发展方向</view>
			<!-- <button open-type="share" type="default" >123</button> -->
			<view class="nav5" @click="pop1Show = true">
				<image class="n5-img" src="/static/newImage/tabBar/zf.png" mode=""></image>
			</view>
			<u-popup v-model="pop1Show" height='408' border-radius="16" closeable mode="bottom">
				<view class="pop1">
					<view class="p1-txt1">分享</view>
					<view class="p1-txt2">
						<button open-type="share" class="b1">
							<u-icon name="weixin-fill" color="#07c167" size="60"></u-icon>
							<view class="down">微信好友</view>
						</button>
						<button open-type="share" style="margin-left: 66rpx;" class="b1">
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
	export default {
		data() {
			return {
				pop1Show: false,
			}
		},
		onShow() {

		},
		// 用户点击右上角分享转发
		onShareAppMessage: async function() {
			// const res = await this.$api.userShare({
			// 	way: 2,
			// 	product_id: this.product_id
			// });
			// // console.log(res)

			// var title = '分销商城app'; //data，return 数据title
			// return {
			// 	title: title || '',
			// 	path: `/pages/index/index?scene=0_${res.share_userid}`,
			// }
			return {
				title: '123546',
				path: `/pages/index/index?scene=0_${1}`,
			}
		},
		//用户点击右上角分享朋友圈
		onShareTimeline: async function() {
			const res = await this.$api.userShare({
				way: 2,
				product_id: this.product_id
			});
			var title = '分销商城app'; //data，return 数据title
			return {
				title: title || '',
				path: `/pages/index/index?scene=0_${res.share_userid}`,
			}
		},
		onLoad() {

		},
		methods: {
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
			toPipeidu() {
				uni.navigateTo({
					url: '/pages/qzz/ceshipipeidu'
				})
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

	.top {
		position: fixed;
		top: 0rpx;
		z-index: 1000;
		width: 100%;
		background: #f8faff;
		height: 536rpx;
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
		position: fixed;
		z-index: 9999;
		padding: 0 20rpx;

		.item {
			margin-top: 32rpx;
			padding: 36rpx 48rpx;
			background: #ffffff;
			width: 710rpx;
			height: 268rpx;
			background: #ffffff;
			border-radius: 20rpx;

			.i-tit1 {
				margin-top: 32rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;

				.txx1 {
					font-size: 36rpx;
					font-family: PingFangSC, PingFangSC-Semibold;
					font-weight: 600;
					color: #000000;
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
		margin: 422rpx auto 0 auto;
		width: 268rpx;
		height: 268rpx;
		background: linear-gradient(180deg, #96bfff, #1362fd);
		border-radius: 50%;
		box-shadow: 0rpx 8rpx 8rpx 0rpx rgba(95, 128, 253, 0.41);
		font-size: 36rpx;
		font-family: PingFangSC, PingFangSC-Medium;
		font-weight: 500;
		text-align: center;
		color: #ffffff;
		line-height: 268rpx;
	}

	.nav4 {
		font-size: 24rpx;
		font-family: PingFangSC, PingFangSC-Regular;
		font-weight: 400;
		text-align: center;
		color: #333333;
		margin-top: 32rpx;
	}

	.nav5 {
		display: flex;
		align-items: center;
		justify-content: center;
		margin: 92rpx auto 0 auto;
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
