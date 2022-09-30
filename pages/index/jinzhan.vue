<template>
	<view class="index">
		<view class="top"></view>
		<view class="nav1">
			<u-icon @click='toBack' style='margin-right: 12rpx;' name="arrow-left" color="#000000" size="36"></u-icon>
			<view @click='toBack' class="n1-txt">进展</view>
		</view>
		<view @click="popover = true" class="float-img2">
			<view class="fi2-txt">{{pop_title}}</view>
			<u-icon style='transform: rotate(90deg);' name="play-right-fill" color="#fffbfb" size="14"></u-icon>
		</view>
		<popover class="popov" @select='changePop' :btnList='popoverList' :modalLeftPos='"-20rpx"' :modalTopPos='"-10rpx"'
			:modalOpacity='"1"' :active="popover"></popover>
		<view style="margin-top: calc(176rpx + 32rpx);" class="nav2">
			<view class="table">
				<view class="n2t-n1">
					<view class="left">成员</view>
					<view class="center">
						<view class="c-top">网搜</view>
						<view class="c-bottom">
							<view class="b-l">
								<u-icon name="checkmark" color="#1362FD" size="32"></u-icon>
							</view>
							<view class="b-r">
								<u-icon name="question" color="#1362FD" size="32"></u-icon>
							</view>
						</view>
					</view>
					<view class="right">转发应聘</view>
				</view>
				<view class="n2t-n2" :style="{borderBottom:item.id == list[list.length-1].id?'0':''}" v-for="(item,i) in list" :key='item.id'>
					<view class="x1">刘树昌</view>
					<view class="x2">
						<view :style="{borderTop:i == 0?'0':''}" class="x2-1">18</view>
						<view :style="{borderTop:i == 0?'0':''}" class="x2-2">16</view>
					</view>
					<view class="x3">8</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import popover from '../../components/dean-popover/dean-popover.vue'
	export default {
		components: {
			popover
		},
		data() {
			return {
				list:[],
				popoverList:['今天','本周','上周','累计'],
				popover:false,
				pop_title:'今天',
			}
		},
		onShow() {
			for(let i = 0;i<50;i++){
				this.list.push({
					val:`name${i}`,
					id:i
				})
			}
		},
		onLoad() {

		},
		methods: {
			changePop(e) {
				console.log(e)
				this.pop_title = e
				this.popover = false
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
		background: #ffffff;
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
		background: #ffffff;
	}
	/deep/ .compos{
		position: fixed !important;
		bottom: 516rpx;
		right: 20rpx;
		width: 200rpx;
		.modal-item {
			padding: 18rpx 50rpx !important;
		}
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
	.float-img2{
		position: fixed;
		right: 42rpx;
		bottom: 534rpx;
		width: 88rpx;
		height: 88rpx;
		background: linear-gradient(180deg,#f0e1b9, #f39f47);
		border-radius: 50%;
		box-shadow: 0rpx 8rpx 8rpx 0rpx rgba(241,203,105,0.40); 
		display: flex;
		align-items: center;
		justify-content: center;
		.fi2-txt{
			font-size: 24rpx;
			font-family: PingFangSC, PingFangSC-Medium;
			font-weight: 500;
			color: #ffffff;
			margin-right: 6rpx;
		}
	}
	.nav2 {
		padding: 0 32rpx 60rpx 32rpx;

		.table {
			width: 686rpx;
			// height: 1214rpx;
			border: 2rpx solid #1362fd;
			border-radius: 10rpx;

			.n2t-n1 {
				display: flex;
				align-items: center;
				background: #1362fd;
				height: 120rpx;
				border-radius: 8rpx;

				.left {
					width: 33%;
					text-align: center;
					line-height: 120rpx;
					color: #fff;
					border-right: 2rpx solid #88abfc;
				}

				.center {
					width: 33%;
					height: 100%;

					.c-top {
						height: 60rpx;
						line-height: 60rpx;
						text-align: center;
						color: #fff;
					}

					.c-bottom {
						display: flex;
						align-items: center;

						.b-l {
							height: 60rpx;
							width: 50%;
							background: #e7efff;
							text-align: center;
							line-height: 60rpx;

							/deep/ .u-icon__icon {
								font-weight: 800 !important;
							}
						}

						.b-r {
							height: 60rpx;
							width: 50%;
							background: #e7efff;
							text-align: center;
							line-height: 60rpx;

							/deep/ .u-icon__icon {
								font-weight: 800 !important;
							}
						}
					}
				}

				.right {
					width: 33%;
					text-align: center;
					line-height: 120rpx;
					color: #fff;
					border-left: 2rpx solid #88abfc;
				}
			}

			.n2t-n2 {
				display: flex;
				height: 70rpx;
				color: #121212;
				border-bottom: 2rpx solid #1362fd;
				.x1 {
					width: 33%;
					line-height: 70rpx;
					text-align: center;
					font-size: 26rpx;
					font-family: PingFangSC, PingFangSC-Regular;
					font-weight: 400;
					color: #1362fd;
				}
				.x2 {
					display: flex;
					align-items: center;
					width: 33%;
					.x2-1{
						width: 50%;
						text-align: center;
						line-height: 70rpx;
						border: 2rpx solid #1362fd;
						font-size: 26rpx;
						background: #8bb0fb;
					}
					.x2-2{
						width: 50%;
						text-align: center;
						line-height: 70rpx;
						border-right: 2rpx solid #1362fd;
						font-size: 26rpx;
						border-bottom: 2rpx solid #1362fd;
						border-top: 2rpx solid #1362fd;
						background: #e7efff;
					}
				}
				.x3 {
					width: 33%;
					line-height: 70rpx;
					text-align: center;
					font-size: 26rpx;
					font-family: PingFangSC, PingFangSC-Regular;
					font-weight: 400;
					color: #121212;
				}
			}
		}
	}
</style>
