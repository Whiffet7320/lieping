<template>
	<view class="index">
		<u-toast ref="uToast" />
		<image class="img1" src="/static/newImage/tabBar/weitu.png" mode=""></image>
		<view class="tit1">猎头导航</view>
		<view class="tit2">扫码登录确认</view>
		<view class="footer">
			<view @click="onSubmit" class="btn">确认登录</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				isClick: false
			}
		},
		onLoad(options) {
			if (options.scene) {
				this.logincode = options.scene
				this.getData()
			}
		},
		methods: {
			async getData() {
				const res = await this.$api.view_qrcode({
					logincode: this.logincode
				})
				if (res.is_expire == 1) {
					this.$refs.uToast.show({
						title: '二维码已过期',
						back: true,
					})
				}
			},
			toYonghuxieyi() {
				uni.navigateTo({
					url: '/pages/wode/yonghuxieyi'
				})
			},
			async onSubmit() {
				const res = await this.$api.check_qrcode({
					logincode: this.logincode
				})

				if (res.result == 1) {
					this.$refs.uToast.show({
						title: res.msg,
						url: '/pages/tabBar/index',
						isTab: true,
					})
				} else {
					this.$refs.uToast.show({
						title: res.msg,
					})
				}
			},
		}
	}
</script>

<style lang="scss">
	page {
		background: #fff;
	}
</style>
<style lang="scss" scoped>
	.index {
		position: relative;
	}

	.img1 {
		width: 170rpx;
		height: 170rpx;
		margin: 300rpx 290rpx 0 290rpx;
	}

	.tit1 {
		margin-top: 48rpx;
		font-size: 48rpx;
		font-family: PingFangSC, PingFangSC-Semibold;
		font-weight: 600;
		text-align: center;
		color: #121212;
	}

	.tit2 {
		font-size: 32rpx;
		font-family: PingFangSC, PingFangSC-Regular;
		font-weight: 400;
		text-align: center;
		margin-top: 16rpx;
		color: #121212;
	}

	.footer {
		position: fixed;
		bottom: 160rpx;
		left: 50%;
		transform: translateX(-50%);
	}

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
</style>
