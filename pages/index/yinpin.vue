<template>
	<view class="index">
		<view class="top"></view>
		<view class="nav1">
			<u-icon @click='toBack' style='margin-right: 12rpx;' name="arrow-left" color="#000000" size="36"></u-icon>
			<view @click='toBack' class="n1-txt">应聘</view>
		</view>
		<view style="margin-top: calc(176rpx + 20rpx);margin-bottom: 70rpx;" class="nav2">
			<view class="item" v-for="item in 10" :key='item'>
				<!-- <view class="float">最新</view> -->
				<view class="float2">已阅</view>
				<view class="i-tit1">
					<view class="i1-txt1">张先生</view>
					<view class="i1-txt2">15242600601</view>
				</view>
				<view class="i-tit2">
					<view class="left">
						<view class="i2-txt1">匹配结果：</view>
						<view class="i2-txt2">不建议应聘</view>
					</view>
					<view class="right">转发者：刘树昌</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				
			}
		},
		onShow() {
			
		},
		onLoad() {
			
		},
		methods:{
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
	.nav2{
		padding: 0 20rpx;
		.item{
			width: 710rpx;
			height: 192rpx;
			background: #ffffff;
			border-radius: 20rpx;
			padding: 32rpx 32rpx 40rpx 32rpx;
			position: relative;
			margin-bottom: 24rpx;
			.float{
				position: absolute;
				right: 0;
				top: 0;
				width: 212rpx;
				height: 48rpx;
				background: #095bfe;
				border-radius: 0rpx 20rpx 0rpx 20rpx;
				font-size: 28rpx;
				font-family: PingFangSC, PingFangSC-Regular;
				font-weight: 400;
				text-align: center;
				color: #ffffff;
				line-height: 48rpx;
			}
			.float2{
				position: absolute;
				right: 0;
				top: 0;
				width: 212rpx;
				height: 48rpx;
				background: #ececec;
				border-radius: 0rpx 20rpx 0rpx 20rpx;
				font-size: 28rpx;
				font-family: PingFangSC, PingFangSC-Regular;
				font-weight: 400;
				text-align: center;
				color: #b4b4b4;
				line-height: 48rpx;
			}
			.i-tit1{
				display: flex;
				align-items: center;
				.i1-txt1{
					font-size: 32rpx;
					font-family: PingFangSC, PingFangSC-Semibold;
					font-weight: 600;
					color: #000000;
				}
				.i1-txt2{
					margin-left: 22rpx;
					font-size: 26rpx;
					font-family: PingFangSC, PingFangSC-Regular;
					font-weight: 400;
					color: #333333;
				}
			}
			.i-tit2{
				margin-top: 36rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;
				.left{
					display: flex;
					align-items: center;
					.i2-txt1{
						font-size: 28rpx;
						font-family: PingFangSC, PingFangSC-Regular;
						font-weight: 400;
						color: #000000;
					}
					.i2-txt2{
						font-size: 28rpx;
						font-family: PingFangSC, PingFangSC-Regular;
						font-weight: 400;
						color: #095BFE;
					}
				}
				.right{
					font-size: 28rpx;
					font-family: PingFangSC, PingFangSC-Regular;
					font-weight: 400;
					color: #000000;
				}
			}
		}
	}
</style>
