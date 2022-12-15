<template>
	<view class="index">
		<!-- <view class="top"></view>
		<view class="nav1">
			<u-icon @click='toBack' style='margin-right: 12rpx;' name="arrow-left" color="#000000" size="36"></u-icon>
			<view @click="isGuonei = true" :class="{'n1-txt2':true,'active':isGuonei}">国内</view>
			<view @click="isGuonei = false" :class="{'n1-txt2':true,'active':!isGuonei}">海外</view>
		</view> -->
		<u-navbar back-icon-size='36'>
			<view class="nn">
				<view style="margin: 0 35rpx 0 170rpx;" @click="isGuonei = true" :class="{'n1-txt2':true,'active':isGuonei}">国内</view>
				<view @click="isGuonei = false" :class="{'n1-txt2':true,'active':!isGuonei}">海外</view>
			</view>
		</u-navbar>
		<view style="margin-top: calc(32rpx);" class="nav2">
			<lhSelectCity v-if="isGuonei" :value="value" :windowHeight="windowHeight" :hotCitys="hotCitys"
				@on-select="City"></lhSelectCity>
			<lhSelectCountry v-else :value="value" :windowHeight="windowHeight" :hotCitys="hotCitys" @on-select="City">
			</lhSelectCountry>
		</view>
	</view>
</template>

<script>
	import lhSelectCity from '@/components/lh-select-city/index.nvue'
	import lhSelectCountry from '@/components/lh-select-city/country.nvue'
	export default {
		components: {
			lhSelectCity,
			lhSelectCountry
		},
		data() {
			return {
				isGuonei: true,
				hotCitys: [
					'杭州',
					'天津',
					'北京',
					'上海',
					'深圳',
					'广州',
					'成都',
					'重庆',
					'厦门'
				],
				value: '杭州',
				windowHeight: "",
				city: '',
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
				this.city = city
				this.toBack()
			},
			toBack() {
				let pages = getCurrentPages(); //获取所有页面栈实例列表
				let nowPage = pages[pages.length - 1]; //当前页页面实例
				let prevPage = pages[pages.length - 2]; //上一页页面实例
				prevPage.$vm.cityVal = this.city; //修改上一页data里面的searchVal参数值为1211
				uni.navigateBack({
					delta: 1
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
	.nn{
		display: flex;
		align-items: center;
		.n1-txt2 {
			font-size: 32rpx;
			font-family: PingFangSC, PingFangSC-Regular;
			font-weight: 400;
			color: #000000;
			line-height: 44rpx;
			margin: 0 35rpx;
			// margin-left: 100rpx;
		}
		
		.n1-txt2.active {
			font-weight: 600;
			font-size: 36rpx;
			position: relative;
		
			&::after {
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

		.n1-txt2 {
			font-size: 32rpx;
			font-family: PingFangSC, PingFangSC-Regular;
			font-weight: 400;
			color: #000000;
			line-height: 44rpx;
			margin: 0 35rpx;
			// margin-left: 100rpx;
		}

		.n1-txt2.active {
			font-weight: 600;
			font-size: 36rpx;
			position: relative;

			&::after {
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
