<template>
	<view class="index">
		<!-- <view class="top"></view>
		<view class="nav1">
			<u-icon @click='toBack' style='margin-right: 12rpx;' name="arrow-left" color="#000000" size="36"></u-icon>
			<view @click='toBack' class="n1-txt">岗位详情</view>
		</view> -->
		<u-navbar back-text="岗位详情" back-icon-size='36'></u-navbar>
		<view style="margin-top: calc(20rpx);" class="nav2">
			<view class="tit1">招聘企业</view>
			<view class="tit2">{{dataObj.position_view.com_name}}</view>
			<view style="margin-top: 44rpx;" class="tit1">内部识别名称</view>
			<view class="tit2">{{dataObj.position_view.internal_name}}</view>
			<view style="margin-top: 44rpx;" class="tit1">岗位</view>
			<view class="tit2">{{dataObj.position_view.jobs}}</view>
			<view style="margin-top: 44rpx;" class="tit1">工作地点</view>
			<view class="tit2">{{dataObj.position_view.work_place}}</view>
			<view style="margin-top: 44rpx;" class="tit1">薪酬</view>
			<view class="tit2">{{dataObj.position_view.salary_range}}</view>
		</view>
		<view class="nav3">
			<u-icon name="info-circle" color="#EB2F2F" size="36"></u-icon>
			<view class="txxx">下架原因：{{reason}}</view>
		</view>
		<view class="footer">
			<view @click="toGangwei" class="btn">重新创建</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				id:"",
				reason:"",
				dataObj:{},
			}
		},
		onShow() {
			this.getData()
		},
		onLoad(option) {
			this.id = option.id;
			this.reason = option.reason
		},
		methods:{
			async getData(){
				const res = await this.$api.position_view({
					id:this.id
				})
				this.dataObj = res
			},
			toGangwei(){
				uni.navigateTo({
					url:'/pages/gangwei/chuanjiangangwei'
				})
			},
			toBack(){
				uni.navigateBack({
					delta:1
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
	.nav2{
		margin-left: 20rpx;
		width: 710rpx;
		height: 656rpx;
		background: #ffffff;
		border-radius: 20rpx;
		padding: 50rpx 32rpx;
		.tit1{
			font-size: 28rpx;
			font-family: PingFangSC, PingFangSC-Regular;
			font-weight: 400;
			color: #000000;
		}
		.tit2{
			font-size: 32rpx;
			font-family: PingFangSC, PingFangSC-Regular;
			font-weight: 400;
			text-align: left;
			color: #b5b6b5;
			margin-top: 20rpx;
		}
	}
	.nav3{
		display: flex;
		align-items: center;
		width: 710rpx;
		height: 86rpx;
		background: #ffdcd6;
		border-radius: 20rpx;
		margin: 34rpx auto 0 auto;
		padding: 26rpx;
		.txxx{
			margin-left: 16rpx;
			color: #EB2F2F;
		}
	}
	.footer{
		position: fixed;
		bottom: 0;
		width: 750rpx;
		height: 206rpx;
		background: #ffffff;
		box-shadow: 0rpx -4rpx 8rpx 0rpx rgba(0,0,0,0.03); 
		.btn{
			margin: 38rpx auto 0 auto;
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
	}
</style>

