<template>
	<view class="index">
		<view class="top"></view>
		<view class="nav1">
			<u-icon @click='toBack' style='margin-right: 12rpx;' name="arrow-left" color="#000000" size="36"></u-icon>
			<!-- <view class="n1-txt">设置导航</view> -->
		</view>
		<view style="margin-top: calc(176rpx + 0rpx);" class="nav2">
			<view class="tit1">加入猎企</view>
			<view class="tit2">猎头导航更适用于500强企业招聘标准</view>
			<view class="tit3">邀请码</view>
			<u-input v-model="value1" :clearable='false' placeholder='请输入您的邀请码' type="text" :border="false" />
			<view class="tit3">姓名</view>
			<u-input v-model="value1" :clearable='false' placeholder='请输入您的姓名' type="text" :border="false" />
			<view class="tit3">职务</view>
			<u-input v-model="value1" :clearable='false' placeholder='请输入您的职务' type="text" :border="false" />
		</view>
		<view class="footer">
			<view class="tit4" @click="isClick=!isClick">
				<u-icon v-if='!isClick' name="checkmark-circle" color="#B2B2B2" size="28">
				</u-icon>
				<u-icon v-else name="checkmark-circle-fill" color="#2979ff" size="28"></u-icon>
				<view class="txx">我已阅读并同意<text style="color:#1362FD">用户协议</text></view>
			</view>
			<view @click="jiaru" class="btn">加入</view>
			<view @click="toRenzheng" class="btn2">去认证猎企</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				value1: '',
				isClick: false,
			}
		},
		onShow() {

		},
		onLoad() {

		},
		methods: {
			toBack() {
				uni.navigateBack({
					delta: 1
				}) 
			},
			jiaru(){
				uni.showToast({
					title: '您已成功加入',
					duration: 1500,
					success: (res) => {
						console.log(res)
					}
				});
			},
			toRenzheng(){
				uni.navigateTo({ 
					url:'/pages/wode/renzheng'
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
		height: calc(100vh - 176rpx);
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
		padding: 0 104rpx;

		.tit1 {
			font-size: 48rpx;
			font-family: PingFangSC, PingFangSC-Medium;
			font-weight: 500;
			color: #000000;
		}

		.tit2 {
			margin-top: 20rpx;
			font-size: 28rpx;
			font-family: PingFangSC, PingFangSC-Regular;
			font-weight: 400;
			color: #ff8941;
		}

		.tit3 {
			margin-top: 48rpx;
			margin-bottom: 12rpx;
			font-size: 24rpx;
			font-family: PingFangSC, PingFangSC-Regular;
			font-weight: 400;
			color: #707070;
		}

		.imgs {
			padding: 14rpx 30rpx;
			background: #ffffff;
			border-radius: 10rpx;
			box-shadow: 0rpx 4rpx 8rpx 0rpx rgba(0, 0, 0, 0.07);
			display: flex;
			align-items: center;

			// &:nth-child()
			.myImg {
				margin-right: 16rpx;
				position: relative;
				width: 100rpx;
				height: 100rpx;
				border-radius: 10rpx;

				.myImg-img {
					width: 100rpx;
					height: 100rpx;
					border-radius: 10rpx;
					z-index: 9;
				}

				.close {
					border: 50%;
					z-index: 99;
					position: absolute;
					right: -10rpx;
					top: -14rpx;
				}
			}

			.myImg.not {
				border: 2rpx dashed #979797;
				display: flex;
				align-items: center;
				justify-content: center;
			}
		}


		/deep/ .u-input {
			background: #ffffff;
			border-radius: 10rpx;
			box-shadow: 0rpx 4rpx 8rpx 0rpx rgba(0, 0, 0, 0.07);

			.u-input__input {
				padding: 10rpx 32rpx;
			}
		}
	}
	.footer{
		position: absolute;
		bottom: 202rpx;
		left: 50%;
		transform: translateX(-50%);
		.tit4 {
			display: flex;
			align-items: center;
			justify-content: center;
			margin-top: 58rpx;
		
			.txx {
				margin-left: 8rpx;
				font-size: 26rpx;
				font-family: PingFangSC, PingFangSC-Regular;
				font-weight: 400;
				color: #b2b2b2;
			}
		}
		
		.btn {
			margin-top: 18rpx;
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
		.btn2{
			margin-top: 32rpx;
			width: 570rpx;
			height: 96rpx;
			background: #ffffff;
			border: 2rpx solid #1362fd;
			border-radius: 50rpx;
			font-size: 32rpx;
			font-family: PingFangSC, PingFangSC-Medium;
			font-weight: 500;
			text-align: center;
			color: #1362fd;
			line-height: 92rpx;
		}
	}
</style>
