<template>
	<view class="index">
		<view class="nav1">猎头导航-做单更高效</view>
		<view class="nav2">
			<view class="n2-l">
				<image class="n2-l-img" src="/static/Group.png" mode=""></image>
				<view class="n2-l-r">
					<view class="n2-l-r-txt1">奇哒巴哒</view>
					<view class="n2-l-r-txt2">个人身份：<text @click="toxuanzeshenfen" class="blue">猎头</text>
						<image class="myIcon" @click="toxuanzeshenfen" src="/static/newImage/tabBar/qiehuan.png"
							mode=""></image>
					</view>

				</view>
			</view>
			<view class="n2-r">
				<view @click="torenzheng" class="n2-r-b1">认证猎企</view>
				<view @click="tojiaru" class="n2-r-b2">加入猎企</view>
			</view>
		</view>
		<view class="nav3">
			<view class="n3-txt1">我的消息</view>
			<view class="items">
				<view class="item" v-for="item in 10">
					<view class="i-l">
						<view class="i-l-tit1">
							<view class="tit11">天宇传媒有限公司销售经理岗位已强制下架<text class="dian">·</text></view>
							
						</view>
						<view class="i-l-tit2">受理时间<text style="margin: 0 12rpx;">丨</text>2022-08-22 09:45:41</view>
					</view>
					<view class="i-r">
						<view @click="toXiangqin" class="i-r-b1">详情</view>
						<view class="i-r-b2">删除</view>
					</view>
				</view>
			</view>
		</view>
		<u-tabbar active-color="#121212" icon-size='60' height='120' mid-button-size="150" v-model="current"
			:list="tabbarlist" @change='changeTabbar' :mid-button="true"></u-tabbar>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tabbarlist: [{
						iconPath: "/static/newImage/tabBarIcon/1-1.png",
						selectedIconPath: "/static/newImage/tabBarIcon/1-2.png",
						text: '首页',
						customIcon: false,
						pagePath: "/pages/tabBar/index"
					},
					{
						iconPath: "/static/newImage/tabBarIcon/2-1.png",
						selectedIconPath: "/static/newImage/tabBarIcon/2-2.png",
						text: '团队',
						customIcon: false,
						pagePath: "/pages/tabBar/tuandui"
					},
					{
						iconPath: "https://rushifu-test.oss-cn-hangzhou.aliyuncs.com/1664157631290.png",
						selectedIconPath: "https://rushifu-test.oss-cn-hangzhou.aliyuncs.com/1664157631290.png",
						// text: '发布',
						midButton: true,
						customIcon: false,
					},
					{
						iconPath: "/static/newImage/tabBarIcon/3-1.png",
						selectedIconPath: "/static/newImage/tabBarIcon/3-2.png",
						text: '导航',
						customIcon: false,
						pagePath: "/pages/tabBar/daohang"
					},
					{
						iconPath: "/static/newImage/tabBarIcon/4-1.png",
						selectedIconPath: "/static/newImage/tabBarIcon/4-2.png",
						text: '我的',
						customIcon: false,
						pagePath: "/pages/tabBar/wode"
					},
				],
				current: 1
			}
		},
		methods: {
			toxuanzeshenfen() {
				uni.navigateTo({
					url: '/pages/wode/xuanzeshenfen'
				})
			},
			changeTabbar(i) {
				if (i == 2) {
					uni.navigateTo({
						url: '/pages/gangwei/chuanjiangangwei'
					})
				}
			},
			toXiangqin() {
				uni.navigateTo({
					url: '/pages/wode/gangweixiangqin'
				})
			},
			torenzheng() {
				uni.navigateTo({
					url: '/pages/wode/renzheng'
				})
			},
			tojiaru() {
				uni.navigateTo({
					url: '/pages/wode/jiaru'
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

	.nav1 {
		font-size: 36rpx;
		font-family: PingFangSC, PingFangSC-Medium;
		font-weight: 600;
		color: #000000;
		margin-top: 108rpx;
		margin-left: 34rpx;
	}

	.nav2 {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin: 66rpx 52rpx 50rpx 32rpx;

		.n2-l {
			display: flex;
			align-items: center;

			.n2-l-img {
				width: 120rpx;
				height: 120rpx;
				border-radius: 50%;
				border: 2rpx solid #1362FD;
			}

			.n2-l-r {
				margin-left: 20rpx;

				.n2-l-r-txt1 {
					font-size: 32rpx;
					font-family: PingFangSC, PingFangSC-Medium;
					font-weight: 600;
					color: #121212;
				}

				.n2-l-r-txt2 {
					margin-top: 16rpx;
					font-size: 24rpx;
					font-family: PingFangSC, PingFangSC-Regular;
					font-weight: 400;
					color: #121212;
					display: flex;
					align-items: center;

					.blue {
						color: #1362FD;
					}

					.myIcon {
						width: 36rpx;
						height: 36rpx;
					}
				}
			}
		}

		.n2-r {
			.n2-r-b1 {
				width: 150rpx;
				height: 48rpx;
				background: #1362fd;
				border-radius: 24rpx;
				font-size: 26rpx;
				font-family: PingFangSC, PingFangSC-Regular;
				font-weight: 400;
				text-align: center;
				line-height: 48rpx;
				color: #ffffff;
			}

			.n2-r-b2 {
				margin-top: 28rpx;
				width: 150rpx;
				height: 48rpx;
				border: 1.2rpx solid #1362fd;
				border-radius: 24rpx;
				font-size: 26rpx;
				font-family: PingFangSC, PingFangSC-Regular;
				font-weight: 400;
				text-align: center;
				line-height: 46rpx;
				color: #1362fd;
			}
		}
	}

	.nav3 {
		padding: 24rpx 32rpx;
		margin: 0 auto;
		width: 710rpx;
		background: #ffffff;
		border-radius: 10rpx;

		.n3-txt1 {
			font-size: 36rpx;
			font-family: PingFangSC, PingFangSC-Medium;
			font-weight: 600;
			color: #000000;
			margin-bottom: 22rpx;
		}

		.items {
			overflow-y: scroll;
			height: 864rpx;

			.item {
				border-top: 2rpx solid #ececec;
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 22rpx 0;

				.i-l {
					width: 364rpx;

					.i-l-tit1 {
						.tit11 {
							font-size: 28rpx;
							font-family: PingFangSC, PingFangSC-Regular;
							font-weight: 400;
							color: #121212;
							display: inline-block;
						}

						.dian {
							color: #ff5c50;
							font-size: 52rpx;
							line-height: 0;
							font-weight: 800;
						}
					}

					.i-l-tit2 {
						margin-top: 8rpx;
						display: flex;
						align-items: center;
						font-size: 20rpx;
						font-family: PingFangSC, PingFangSC-Regular;
						font-weight: 400;
						color: #707070;
					}
				}

				.i-r {
					display: flex;
					align-items: center;

					.i-r-b1 {
						width: 106rpx;
						height: 48rpx;
						border: 1.2rpx solid #1362fd;
						border-radius: 25.2rpx;
						font-size: 26rpx;
						font-family: PingFangSC, PingFangSC-Regular;
						font-weight: 400;
						text-align: center;
						line-height: 46rpx;
						color: #1362fd;
					}

					.i-r-b2 {
						margin-left: 16rpx;
						width: 106rpx;
						height: 48rpx;
						border: 1.2rpx solid #979797;
						border-radius: 25.2rpx;
						font-family: PingFangSC, PingFangSC-Regular;
						font-weight: 400;
						text-align: center;
						line-height: 46rpx;
						color: #707070;
					}
				}
			}
		}
	}
</style>
