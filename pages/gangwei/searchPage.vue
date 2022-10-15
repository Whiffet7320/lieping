<template>
	<view class="index">
		<view class="top"></view>
		<view class="nav1">
			<u-icon @click='toBack' style='margin-right: 12rpx;' name="arrow-left" color="#000000" size="36"></u-icon>
			<!-- <view class="n1-txt">设置导航</view> -->
			<view @click="isGuonei = true" :class="{'n1-txt2':true,'active':isGuonei}">国内</view>
			<view @click="isGuonei = false" :class="{'n1-txt2':true,'active':!isGuonei}">海外</view>
		</view>
		<view style="margin-top: calc(176rpx);" class="nav2">
			<searchPage :isGuonei='isGuonei' @on-select="City"></searchPage>
		</view>
	</view>
</template>

<script>
	import searchPage from '@/components/lh-select-city/searchPage.vue'
	export default {
		components: {
			searchPage,
		},
		data() {
			return {
				isGuonei:true,
				city:'',
			}
		},
		onShow() {

		},
		onLoad() {
			// 计算出可用高度
			this.windowHeight = uni.getSystemInfoSync().windowHeight - 100 + "px";
		},
		methods: {
			// 选中事件
			City(city) {
				console.log(city)
				this.city = city
				this.toBack()
			},
			toBack() {
				let pages = getCurrentPages();  //获取所有页面栈实例列表
				let prevPage = pages[ pages.length - 3 ];  //上上一页页面实例
				prevPage.$vm.cityVal = this.city;   //修改上一页data里面的searchVal参数值为1211
				uni.navigateBack({
					delta: 2
				})
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
			margin-right: 146rpx;
		}
		.n1-txt2{
			font-size: 32rpx;
			font-family: PingFangSC, PingFangSC-Regular;
			font-weight: 400;
			color: #000000;
			line-height: 44rpx;
			margin: 0 35rpx;
			// margin-left: 100rpx;
		}
		.n1-txt2.active{
			font-weight: 600;
			font-size: 36rpx;
			position: relative;
			&::after{
				content: '';
				width: 32rpx;
				height: 4rpx;
				background: #1362FD;
				position: absolute;
				top: 66rpx;
				left: 50%;
				transform: translateX(-50%);
			}
		}
	}
</style>
