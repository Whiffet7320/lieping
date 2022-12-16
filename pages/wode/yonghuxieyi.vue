<template>
	<view class="index">
		<!-- <view class="top"></view>
		<view class="nav1">
			<u-icon @click='toBack' style='margin-right: 12rpx;' name="arrow-left" color="#000000" size="36"></u-icon>
			<view @click='toBack' class="n1-txt">用户协议</view>
		</view> -->
		<u-navbar back-text="用户协议" back-icon-size='36'></u-navbar>
		<view style="margin-top: calc(28rpx);padding: 0 20rpx;" class="nav2">
			<u-parse :html="user_agreement"></u-parse>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				user_agreement:'',
			}
		},
		onShow() {
			this.getData()
		},
		onLoad() {
		
		},
		methods: {
			async getData(){
				const res = await this.$api.user_agreement()
				this.user_agreement = res.user_agreement
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
</style>
