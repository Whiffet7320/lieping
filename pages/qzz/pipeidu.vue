<template>
	<view class="index">
		<view class="top"></view>
		<view class="nav1">
			<u-icon @click='toBack' style='margin-right: 12rpx;' name="arrow-left" color="#000000" size="36"></u-icon>
			<view @click='toBack' class="n1-txt">匹配度报告</view>
		</view>
		<view style="margin-top: calc(176rpx + 24rpx);" class="nav2">
			<view class="n2-tit1">
				<view class="l">
					<view class="box1"></view>
					<view class="txx1">有要求</view>
				</view>
				<view class="c">
					<view class="box1">
						<u-icon name="checkmark" color="#fff" size="20"></u-icon>
					</view>
					<view class="txx1">匹配</view>
				</view>
				<view class="r">
					<view class="box1">
						<u-icon name="close" color="#fff" size="18"></u-icon>
					</view>
					<view class="txx1">不匹配</view>
				</view>
			</view>
		</view>
		<view class="nav3">
			<view class="tit1">基本条件</view>
			<view class="n3-table">
				<view class="t1">
					<view class="t1-1">第一学历</view>
					<view class="t1-2">
						<u-icon name="checkmark" color="#fff" size="40"></u-icon>
					</view>
				</view>
				<view class="t1">
					<view class="t1-1">外语</view>
					<view class="t1-2">
						<u-icon name="close" color="#fff" size="36"></u-icon>
					</view>
				</view>
				<view class="t1">
					<view class="t1-1">其他技能</view>
					<view class="t1-2">
						<u-icon name="checkmark" color="#fff" size="40"></u-icon>
					</view>
				</view>
				<view class="t1">
					<view class="t1-1">年龄</view>
					<view class="t1-2">
						<u-icon name="checkmark" color="#fff" size="40"></u-icon>
					</view>
				</view>
				<view class="t1">
					<view class="t1-1">薪酬</view>
					<view class="t1-2">
						<u-icon name="close" color="#fff" size="36"></u-icon>
					</view>
				</view>
			</view>
			<view style="margin-top: 48rpx;" class="tit1">工作经历</view>
			<view class="n3-table2">
				<view class="t1">
					<view class="t1-1">
						<view class="t-top">模型</view>
						<view class="t-top">3-1-2</view>
					</view>
					<view class="t1-2">行业</view>
					<view class="t1-2">公司</view>
					<view class="t1-2">专业</view>
					<view class="t1-2">职级</view>
				</view>
				<view class="t1">
					<view class="t2-1">第一段</view>
					<view :class="{'t2-2':true,'active':isHave}">
						<u-icon name="checkmark" color="#fff" size="40"></u-icon>
					</view>
					<view :class="{'t2-2':true,'active':false}"></view>
					<view :class="{'t2-2':true,'active':isHave}">
						<u-icon name="checkmark" color="#fff" size="40"></u-icon>
					</view>
					<view :class="{'t2-2':true,'active':isHave}">
						<u-icon name="close" color="#fff" size="36"></u-icon>
					</view>
				</view>
				<view class="t1">
					<view class="t2-1">第二段</view>
					<view :class="{'t2-2':true,'active':isHave}">
						<u-icon name="checkmark" color="#fff" size="40"></u-icon>
					</view>
					<view :class="{'t2-2':true,'active':false}"></view>
					<view :class="{'t2-2':true,'active':isHave}">
						<u-icon name="checkmark" color="#fff" size="40"></u-icon>
					</view>
					<view :class="{'t2-2':true,'active':isHave}">
						<u-icon name="close" color="#fff" size="36"></u-icon>
					</view>
				</view>
				<view class="t1">
					<view class="t2-1">第三段</view>
					<view :class="{'t2-2':true,'active':isHave}">
						<u-icon name="checkmark" color="#fff" size="40"></u-icon>
					</view>
					<view :class="{'t2-2':true,'active':false}"></view>
					<view :class="{'t2-2':true,'active':isHave}">
						<u-icon name="checkmark" color="#fff" size="40"></u-icon>
					</view>
					<view :class="{'t2-2':true,'active':isHave}">
						<u-icon name="close" color="#fff" size="36"></u-icon>
					</view>
				</view>
				<view class="t1">
					<view class="t2-1">第四段</view>
					<view :class="{'t2-2':true,'active':isHave}">
						<u-icon name="checkmark" color="#fff" size="40"></u-icon>
					</view>
					<view :class="{'t2-2':true,'active':false}"></view>
					<view :class="{'t2-2':true,'active':isHave}">
						<u-icon name="checkmark" color="#fff" size="40"></u-icon>
					</view>
					<view :class="{'t2-2':true,'active':isHave}">
						<u-icon name="close" color="#fff" size="36"></u-icon>
					</view>
				</view>
			</view>
		</view>

		<view class="nav4">匹配结果：不建议应聘</view>
		<view class="nav5">我已阅读并同意<text style="color: #1362FD;">用户协议</text></view>
		<view @click="onSubmit" :class="{'btn':true,'no':isYPed}">应聘</view>
		<u-popup border-radius='32' width='676' height='410' closeable mode='center' v-model="pop1">
			<view class="pop1">
				<view class="p1-tit1">您的称呼</view>
				<view class="p1-tit2">
					<u-input :clearable='false' style='width: 200rpx;' v-model="name" placeholder='请输入您的姓名' type="text" :border="false" />
					<view class="flex">
						<view v-if="isXS" @click="isXS = false" class="circle"></view>
						<u-icon @click="isXS = false" v-else style="transform: translateY(2rpx);" name="checkmark-circle-fill" color="#1362FD" size="24"></u-icon>
						<view @click="isXS = false" class="c-txt">先生</view>
						<view @click="isXS = true" v-if="!isXS" style="margin-left: 40rpx;" class="circle"></view>
						<u-icon @click="isXS = true" v-else style="margin-left: 40rpx;transform: translateY(2rpx);" name="checkmark-circle-fill" color="#1362FD" size="24"></u-icon>
						<view @click="isXS = true" class="c-txt">女士</view>
					</view>
				</view>
				<view @click="onSubmit2" class="p1-btn">应聘</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isYPed:false,
				isHave: true,
				pop1: false,
				name: "",
				isXS:true,
			}
		},
		onShow() {

		},
		onLoad() {

		},
		methods: {
			toBack(){
				uni.navigateBack({
					delta:1
				})
			},
			onSubmit(){
				this.pop1 = true
			},
			onSubmit2(){
				uni.showToast({
					title: '已发送应聘申请',
					duration: 1500,
					success: (res) => {
						console.log(res)
						this.pop1 = false
						this.isYPed = true;
					}
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

	/deep/ .u-icon__icon {
		font-weight: 800 !important;
	}

	.nav2 {
		padding: 0 52rpx;

		.n2-tit1 {
			display: flex;
			align-items: center;
			justify-content: space-between;

			.l {
				display: flex;
				align-items: center;

				.box1 {
					width: 82rpx;
					height: 28rpx;
					background: #3db682;
				}

				.txx1 {
					margin-left: 20rpx;
					font-size: 26rpx;
					font-family: PingFangSC, PingFangSC-Regular;
					font-weight: 400;
					color: #707070;
				}
			}

			.c {
				display: flex;
				align-items: center;

				.box1 {
					width: 82rpx;
					height: 28rpx;
					background: #3db682;
					display: flex;
					align-items: center;
					justify-content: center;
				}

				.txx1 {
					margin-left: 20rpx;
					font-size: 26rpx;
					font-family: PingFangSC, PingFangSC-Regular;
					font-weight: 400;
					color: #707070;
				}
			}

			.r {
				display: flex;
				align-items: center;

				.box1 {
					width: 82rpx;
					height: 28rpx;
					background: #3db682;
					display: flex;
					align-items: center;
					justify-content: center;
				}

				.txx1 {
					margin-left: 20rpx;
					font-size: 26rpx;
					font-family: PingFangSC, PingFangSC-Regular;
					font-weight: 400;
					color: #707070;
				}
			}
		}
	}

	.nav3 {
		width: 710rpx;
		// height: 1020rpx;
		background: #ffffff;
		border-radius: 20rpx;
		margin: 20rpx auto 0 auto;
		padding: 48rpx 32rpx;

		.tit1 {
			font-size: 36rpx;
			font-family: PingFangSC, PingFangSC-Medium;
			font-weight: 600;
			color: #000000;
		}

		.n3-table {
			margin-top: 24rpx;

			.t1 {
				height: 74rpx;
				display: flex;
				align-items: center;
				border-top: 2rpx solid #c6c6c6;
				border-left: 2rpx solid #c6c6c6;
				border-right: 2rpx solid #c6c6c6;

				&:nth-child(5) {
					border-bottom: 2rpx solid #c6c6c6;
				}

				.t1-1 {
					width: 50%;
					font-size: 26rpx;
					font-family: PingFangSC, PingFangSC-Regular;
					font-weight: 400;
					text-align: center;
					color: #707070;
					line-height: 74rpx;
					border-right: 2rpx solid #c6c6c6;
				}

				.t1-2 {
					height: 72rpx;
					width: 50%;
					font-size: 26rpx;
					font-family: PingFangSC, PingFangSC-Regular;
					font-weight: 400;
					text-align: center;
					color: #707070;
					line-height: 74rpx;
					background: #3db682;
				}
			}
		}

		.n3-table2 {
			margin-top: 24rpx;

			.t1 {
				display: flex;
				align-items: center;
				border-top: 2rpx solid #c6c6c6;
				border-left: 2rpx solid #c6c6c6;
				border-right: 2rpx solid #c6c6c6;

				&:nth-child(5) {
					border-bottom: 2rpx solid #c6c6c6;
				}

				.t1-1 {
					width: 20%;
					height: 88rpx;
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: center;
					border-right: 2rpx solid #c6c6c6;

					.t-top {
						font-size: 26rpx;
						font-family: PingFangSC, PingFangSC-Regular;
						font-weight: 400;
						text-align: center;
						color: #707070;
					}
				}

				.t1-2 {
					width: 20%;
					font-size: 26rpx;
					font-family: PingFangSC, PingFangSC-Regular;
					font-weight: 400;
					text-align: center;
					color: #707070;
					line-height: 88rpx;
					border-right: 2rpx solid #c6c6c6;

					&:nth-child(5) {
						border-right: 0;
					}
				}

				.t2-1 {
					height: 74rpx;
					width: 20%;
					font-size: 26rpx;
					font-family: PingFangSC, PingFangSC-Regular;
					font-weight: 400;
					text-align: center;
					color: #707070;
					line-height: 74rpx;
					border-right: 2rpx solid #c6c6c6;
				}

				.t2-2 {
					width: 20%;
					display: flex;
					align-items: center;
					justify-content: center;
					border-right: 2rpx solid #c6c6c6;

					&:nth-child(5) {
						border-right: 0;
					}
				}

				.t2-2.active {
					transform: translateY(-0rpx);
					height: 74rpx;
					text-align: center;
					background: #3db682;
				}
			}
		}
	}

	.nav4 {
		margin-top: 54rpx;
		font-size: 32rpx;
		font-family: PingFangSC, PingFangSC-Regular;
		font-weight: 400;
		text-align: center;
		color: #ff5c50;
	}

	.nav5 {
		font-size: 28rpx;
		font-family: PingFangSC, PingFangSC-Regular;
		font-weight: 400;
		text-align: center;
		color: #b2b2b2;
		line-height: 40rpx;
		margin-top: 20rpx;
	}

	.btn {
		margin: 20rpx auto 0 auto;
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
	.btn.no{
		background: #bcbcbc;
	}
	.pop1 {
		padding: 0 80rpx;

		.p1-tit1 {
			padding-top: 108rpx;
			font-size: 32rpx;
			font-family: PingFangSC, PingFangSC-Regular;
			font-weight: 400;
			color: #454545;
		}

		.p1-tit2 {
			margin-top: 30rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			.flex {
				display: flex;
				align-items: center;

				.circle {
					width: 24rpx;
					height: 24rpx;
					border: 2rpx solid #979797;
					border-radius: 50%;
				}

				.c-txt {
					margin-left: 16rpx;
					font-size: 28rpx;
					font-family: PingFangSC, PingFangSC-Regular;
					font-weight: 400;
					color: #454545;
				}
			}

		}
		.p1-btn{
			width: 254rpx;
			height: 64rpx;
			background: #1362fd;
			border-radius: 48rpx;
			margin: 52rpx auto 0 auto;
			font-size: 32rpx;
			font-family: PingFangSC, PingFangSC-Medium;
			font-weight: 500;
			text-align: center;
			color: #ffffff;
			line-height: 64rpx;
		}
	}
</style>
