<template>
	<view class="index">
		<view class="top"></view>
		<view class="nav1">
			<u-icon @click="toBack" style='margin-right: 12rpx;' name="arrow-left" color="#000000" size="36"></u-icon>
			<view @click="toBack" class="n1-txt">选择语言</view>
		</view>
		<view style="margin-top: calc(176rpx + 20rpx);margin-left: 20rpx;" class="nav2">
			<view class="item" @click="onSubmit(item)" v-for="item in list" :key='item.id'>
				<view class="txt">{{item.title}}</view>
				<view class="heng"></view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				list:[]
			}
		},
		onShow() {
			this.getData()
		},
		onLoad() {
			
		},
		methods:{
			async getData(){
				const res = await this.$api.foreignlanguage({
					page:1,
					pagesize:1000,
				})
				this.list = res.list
			},
			toBack(){
				uni.navigateBack({
					delta: 1
				})
			},
			onSubmit(item){
				let pages = getCurrentPages()
				let prevPage = pages[pages.length - 2]
				prevPage.$vm.getWaiyuData(item)
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
	.top{
		position: fixed;
		top: 0rpx;
		z-index: 1000;
		height: 88rpx;
		width: 100%;
		background: #ffffff;
	}
	.nav1 {
		z-index: 1000;
		position: fixed;
		top: 88rpx;
		background: #ffffff;
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
	.nav2{
		margin-bottom: 40rpx;
		width: 710rpx;
		background: #ffffff;
		border-radius: 20rpx;
		padding: 0 30rpx 30rpx 30rpx;
		.item{
			padding-top: 40rpx;
			.txt{
				font-size: 30rpx;
				font-family: PingFangSC, PingFangSC-Regular;
				font-weight: 400;
				color: #121212;
			}
			.heng{
				margin-top: 18rpx;
				width: 648rpx;
				height: 1.6rpx;
				background: #ececec;
			}
		}
	}
</style>
