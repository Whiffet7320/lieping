<template>
	<view class="index">
		<view class="top"></view>
		<view class="nav1">
			<u-icon style='margin-right: 12rpx;' name="arrow-left" color="#000000" size="36"></u-icon>
			<view class="n1-txt">认证猎企详情</view>
		</view>
		<!-- 审核中 -->
		<template v-if="false">
			<view style="margin-top: calc(176rpx + 20rpx);" class="nav2">
				<image class="float-img" src="/static/newImage/wode/bianzu6.png" mode=""></image>
				<view class="title1">基本信息</view>
				<view class="tit1">公司名称</view>
				<view class="tit2">天宇传媒有限公司</view>
				<view style="margin-top: 44rpx;" class="tit1">姓名</view>
				<view class="tit2">张三</view>
				<view style="margin-top: 44rpx;" class="tit1">职务</view>
				<view class="tit2">销售经理</view>
			</view>
			<view style="margin-top: calc(32rpx);" class="nav2">
				<view class="title1">证件信息</view>
				<view style="margin-bottom: 20rpx;" class="tit1">营业执照</view>
				<view class="imgs">
					<image v-for="(item,i) in yyzzImg" :key='i' @click="seeImg(i)" class="imgg" :src="item" mode="">
					</image>
				</view>
				<view style="margin-top: 44rpx;margin-bottom: 20rpx;" class="tit1">人力资源许可证</view>
				<view class="imgs">
					<image v-for="(item,i) in xkzImg" :key='i' @click="seeImg(i)" class="imgg" :src="item" mode="">
					</image>
				</view>
			</view>
		</template>
		<!-- 已通过 -->
		<template v-if="false">
			<view style="margin-top: calc(176rpx + 20rpx);" class="nav2">
				<image class="float-img" src="/static/newImage/wode/bianzu6success.png" mode=""></image>
				<view class="title1">基本信息</view>
				<view class="tit1">公司名称</view>
				<view class="tit2">天宇传媒有限公司</view>
				<view style="margin-top: 44rpx;" class="tit1">姓名</view>
				<view class="tit2">张三</view>
				<view style="margin-top: 44rpx;" class="tit1">职务</view>
				<view class="tit2">销售经理</view>
			</view>
			<view style="margin-top: calc(32rpx);" class="nav2">
				<view class="title1">证件信息</view>
				<view style="margin-bottom: 20rpx;" class="tit1">营业执照</view>
				<view class="imgs">
					<image v-for="(item,i) in yyzzImg" :key='i' @click="seeImg(i)" class="imgg" :src="item" mode="">
					</image>
				</view>
				<view style="margin-top: 44rpx;margin-bottom: 20rpx;" class="tit1">人力资源许可证</view>
				<view class="imgs">
					<image v-for="(item,i) in xkzImg" :key='i' @click="seeImg(i)" class="imgg" :src="item" mode="">
					</image>
				</view>
			</view>
		</template>
		<!-- 未通过 -->
		<template v-if="true">
			<view style="margin-top: calc(176rpx + 20rpx);" class="nav2">
				<view class="title1">基本信息</view>
				<view class="tit1">公司名称</view>
				<view class="tit2">天宇传媒有限公司</view>
				<view style="margin-top: 44rpx;" class="tit1">姓名</view>
				<view class="tit2">张三</view>
				<view style="margin-top: 44rpx;" class="tit1">职务</view>
				<view class="tit2">销售经理</view>
			</view>
			<view style="margin-top: calc(32rpx);" class="nav2">
				<view class="title1">证件信息</view>
				<view style="margin-bottom: 20rpx;" class="tit1">营业执照</view>
				<view class="imgs">
					<image v-for="(item,i) in yyzzImg" :key='i' @click="seeImg(i)" class="imgg" :src="item" mode="">
					</image>
				</view>
				<view style="margin-top: 44rpx;margin-bottom: 20rpx;" class="tit1">人力资源许可证</view>
				<view class="imgs">
					<image v-for="(item,i) in xkzImg" :key='i' @click="seeImg(i)" class="imgg" :src="item" mode="">
					</image>
				</view>
			</view>
			<view class="nav3">
				<u-icon name="info-circle" color="#EB2F2F" size="36"></u-icon>
				<view class="txxx">认证未通过原因：人力资源许可证已过期</view>
			</view>
			<view class="footer">
				<view class="btn">重新创建</view>
			</view>
		</template>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				yyzzImg: ['https://img0.baidu.com/it/u=2891730385,3470273053&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=625',
					'https://img1.baidu.com/it/u=1428986297,3289334505&fm=253&fmt=auto&app=120&f=JPEG?w=800&h=1422'
				],
				xkzImg: ['https://img1.baidu.com/it/u=1428986297,3289334505&fm=253&fmt=auto&app=120&f=JPEG?w=800&h=1422',
					'https://img0.baidu.com/it/u=2891730385,3470273053&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=625'
				]
			}
		},
		onShow() {

		},
		onLoad() {

		},
		methods: {
			seeImg(i) {
				uni.previewImage({
					urls: this.yyzzImg,
					current:i,
					// longPressActions: {
					// 	itemList: ['发送给朋友', '保存图片', '收藏'],
					// 	success: function(data) {
					// 		console.log('选中了第' + (data.tapIndex + 1) + '个按钮,第' + (data.index + 1) + '张图片');
					// 	},
					// 	fail: function(err) {
					// 		console.log(err.errMsg);
					// 	}
					// }
				});
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

	.nav2 {
		margin-left: 20rpx;
		width: 710rpx;
		background: #ffffff;
		border-radius: 20rpx;
		padding: 32rpx 32rpx 48rpx 32rpx;
		position: relative;

		.float-img {
			position: absolute;
			right: 0;
			top: 0;
			width: 372rpx;
			height: 372rpx;
		}

		.imgs {
			display: flex;
			align-items: center;

			.imgg {
				margin-right: 20rpx;
				width: 192rpx;
				height: 192rpx;
				border-radius: 10rpx;
			}
		}


		.title1 {
			// margin-top: 32rpx;
			font-size: 36rpx;
			font-family: PingFangSC, PingFangSC-Medium;
			font-weight: 600;
			color: #000000;
			margin-bottom: 48rpx;
		}

		.tit1 {
			font-size: 28rpx;
			font-family: PingFangSC, PingFangSC-Regular;
			font-weight: 400;
			color: #000000;
		}

		.tit2 {
			font-size: 32rpx;
			font-family: PingFangSC, PingFangSC-Regular;
			font-weight: 400;
			text-align: left;
			color: #b5b6b5;
			margin-top: 20rpx;
		}
	}

	.nav3 {
		display: flex;
		align-items: center;
		width: 710rpx;
		height: 86rpx;
		background: #ffdcd6;
		border-radius: 20rpx;
		margin: 34rpx auto 250rpx auto;
		padding: 26rpx;
		
		.txxx {
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
