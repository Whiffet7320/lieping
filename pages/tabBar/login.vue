<template>
	<view class="index">
		<u-toast ref="uToast" />
		<image class="img1" src="/static/newImage/tabBar/weitu.png" mode=""></image>
		<view class="tit1">猎头导航</view>
		<view class="tit2">简历匹配分析插件</view>
		<view class="footer">
			<view class="tit4">
				<u-icon @click='isClick = true' v-if='!isClick' name="checkmark-circle" color="#B2B2B2" size="28">
				</u-icon>
				<u-icon @click='isClick = false' v-else name="checkmark-circle-fill" color="#2979ff" size="28"></u-icon>
				<view class="txx"><text @click='isClick = !isClick'>我已阅读并同意</text><text @click="toYonghuxieyi"
						style="color:#1362FD">用户协议</text></view>
			</view>
			<view @click="onSubmit" class="btn">登录</view>
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
		methods: {
			toYonghuxieyi() {
				uni.navigateTo({
					url: '/pages/wode/yonghuxieyi'
				})
			},
			onSubmit() {
				if (!this.isClick) {
					this.$refs.uToast.show({
						title: '请勾选用户协议',
					})
					return
				}
				var that = this
				uni.getUserProfile({
					desc: '登录',
					success: function(infoResss) {
						console.log(infoResss, 'cycy')
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
											success: async () => {
												that.$refs.uToast
													.show({
														title: res
															.msg,
													})
												console.log(res)
												if (res
													.user_category ==
													0) {
													uni.navigateTo({
														url: '/pages/wode/xuanzeshenfen'
													})
												} else if(res.user_category == 1) {
													const res33 = await that.$api.user_info()
													console.log(res33,'3333')
													if(res33.is_joincompany == 1 || res33.is_licensestatus == 2){
														uni.switchTab({
															url: '/pages/tabBar/index'
														})
													}else{
														uni.navigateTo({
															url:'/pages/tabBar/wode'
														})
													}
												} else if(res.user_category == 2) {
													uni.navigateTo({
														url: '/pages/tabBar/qzz_sy'
													})
												}else{
													uni.navigateBack({
														delta: 1
													})
												}
											}
										})
									} else {
										that.$refs.uToast.show({
											title: res.msg,
											type: 'error',
										})
									}
								} catch (err) {
									console.log(err, 'err')
								}
							}
						})
					}
				});

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
