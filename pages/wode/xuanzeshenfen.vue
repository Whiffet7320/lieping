<template>
	<view class="index">
		<u-toast ref="uToast" />
		<view class="top"></view>
		<view class="nav1">
			<!-- <u-icon style='margin-right: 12rpx;' name="arrow-left" color="#000000" size="36"></u-icon> -->
			<view @click="toBack" class="n1-txt">猎头导航</view>
		</view>
		<view style="margin-top: calc(176rpx + 78rpx);" class="nav2">
			<view class="tit1">选择身份标签</view>
			<view style="margin-top: 36rpx;" class="tit2">认证身份标签</view>
			<view class="tit2">从不同的方向提供职业指引</view>
			<view @click="isLT = true" class="box1">
				<image class="b-img" src="/static/newImage/wode/bianzu8.png" mode=""></image>
				<view class="b-txt1">猎头</view>
				<view class="b-txt2">Headhunter</view>
				<view class="circle"></view>
				<image v-if="isLT" class="gou" src="/static/newImage/wode/lujin11.png" mode=""></image>
			</view>
			<view @click="isLT = false" class="box2">
				<image class="b-img" src="/static/newImage/wode/bianzu7.png" mode=""></image>
				<view class="b-txt1">求职者</view>
				<view class="b-txt2">Job Seeker</view>
				<view class="circle"></view>
				<image v-if="!isLT" class="gou" src="/static/newImage/wode/lujin12.png" mode=""></image>
			</view>
		</view>
		<view style="width:100vw;height: 300rpx;"></view>
		<view @click="toShouye" class="btn">完成</view>
		<view style="width:100vw;height: 80rpx;"></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isLT: true,
			}
		},
		async onShow() {
			const res = await this.$api.user_info()
			this.userObj = res
			console.log(res, 'res')
		},
		onLoad() {

		},
		methods: {
			async toShouye() {
				const res = await this.$api.user_upinfo({
					category: this.isLT ? 1 : 2
				})
				this.$refs.uToast.show({
					title: res.msg,
					duration:700,
					callback: () => {
						if (this.isLT) {
							uni.switchTab({
								url: '/pages/tabBar/index'
							})
						} else {
							uni.navigateTo({
								url: '/pages/tabBar/qzz_sy'
							})
						}
					}
				})
			},
			toBack() {
				uni.navigateBack({
					delta: 1
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
		height: 88rpx;
		width: 100%;
		background: #f8faff;
	}

	.nav1 {
		z-index: 1000;
		position: fixed;
		top: 88rpx;
		background: #f8faff;
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
		margin-left: 52rpx;
		margin-right: 52rpx;

		.tit1 {
			font-size: 56rpx;
			font-family: PingFangSC, PingFangSC-Regular;
			font-weight: 400;
			color: #000000;
		}

		.tit2 {
			font-size: 32rpx;
			font-family: PingFangSC, PingFangSC-Regular;
			font-weight: 400;
			color: #707070;
			line-height: 44rpx;
		}

		.box1 {
			margin-top: 158rpx;
			position: relative;
			width: 632rpx;
			height: 234rpx;

			.b-img {
				position: absolute;
				top: 0;
				left: 0;
				width: 632rpx;
				height: 234rpx;
			}

			.b-txt1 {
				position: absolute;
				top: 60rpx;
				left: 68rpx;
				font-size: 40rpx;
				font-family: PingFangSC, PingFangSC-Medium;
				font-weight: 500;
				color: #ffffff;
			}

			.b-txt2 {
				position: absolute;
				top: 132rpx;
				left: 68rpx;
				font-size: 32rpx;
				font-family: PingFangSC, PingFangSC-Thin;
				font-weight: 200;
				color: #ffffff;
			}

			.circle {
				position: absolute;
				top: 78rpx;
				right: 68rpx;
				width: 80rpx;
				height: 80rpx;
				background: #ffffff;
				border-radius: 50%;
			}

			.gou {
				position: absolute;
				top: 60rpx;
				right: 48rpx;
				width: 98rpx;
				height: 80rpx;
			}
		}

		.box2 {
			margin-top: 64rpx;
			position: relative;
			width: 632rpx;
			height: 234rpx;

			.b-img {
				position: absolute;
				top: 0;
				left: 0;
				width: 632rpx;
				height: 234rpx;
			}

			.b-txt1 {
				position: absolute;
				top: 60rpx;
				left: 68rpx;
				font-size: 40rpx;
				font-family: PingFangSC, PingFangSC-Medium;
				font-weight: 500;
				color: #ffffff;
			}

			.b-txt2 {
				position: absolute;
				top: 132rpx;
				left: 68rpx;
				font-size: 32rpx;
				font-family: PingFangSC, PingFangSC-Thin;
				font-weight: 200;
				color: #ffffff;
			}

			.circle {
				position: absolute;
				top: 78rpx;
				right: 68rpx;
				width: 80rpx;
				height: 80rpx;
				background: #ffffff;
				border-radius: 50%;
			}

			.gou {
				position: absolute;
				top: 60rpx;
				right: 48rpx;
				width: 98rpx;
				height: 80rpx;
			}
		}
	}

	.btn {
		// position: fixed;
		// bottom: 72rpx;
		margin-left: 90rpx;
		width: 570rpx;
		height: 96rpx;
		background: #1362fd;
		border-radius: 48rpx;
		font-size: 32rpx;
		font-family: PingFangSC, PingFangSC-Medium;
		font-weight: 500;
		text-align: center;
		color: #ffffff;
		line-height: 96rpx;
	}
</style>
