<template>
	<view class="index">
		<u-toast ref="uToast" />
		<!-- <view class="top"></view> -->
		<!-- <view class="nav1">
			<u-icon @click='toBack' style='margin-right: 12rpx;' name="arrow-left" color="#000000" size="36"></u-icon>
		</view> -->
		<u-navbar back-icon-size='36'></u-navbar>
		<view style="margin-top: calc(0rpx);" class="nav2">
			<view class="tit1">修改资料</view>
			<view class="tit3">昵称</view>
			<u-input v-model="value1" :clearable='false' placeholder='请输入您的昵称' type="text" :border="false" />
			<view class="tit3">手机号</view>
			<u-input v-model="value2" :clearable='false' placeholder='请输入您的手机号' type="text" :border="false" />
			<view class="tit3">头像</view>
			<view class="imgs">
				<view v-if="pic != ''" :class="{'myImg':true}">
					<image @click="seeImg1" class="myImg-img" :src="pic" mode=""></image>
					<view class="close" @click="delImg1">
						<u-icon name="close-circle-fill" color="#FF414C" size="28"></u-icon>
					</view>
				</view>
				<view v-else class="myImg not" @click="addClick1">
					<view class="add">
						<u-icon name="plus-circle-fill" color="#095bfe" size="50"></u-icon>
					</view>
				</view>
			</view>
			<view @click="onSubmit" class="btn">保存</view>
			<!-- <button open-type="getPhoneNumber" @getphonenumber="onSubmit">提交审核</button> -->
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				modshow: false,
				value1: '',
				value2: '',
				pic: '',
				imgList1: ['https://img0.baidu.com/it/u=1284526633,2834461447&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500'],
				infoObj:null,
			}
		},
		onShow() {

		},
		onLoad() {
			this.getInfo()
		},
		methods: {
			async getInfo() {
				const res = await this.$api.user_info()
				this.infoObj = res
				if (res.result == 1) {
					uni.setStorageSync('userObj', this.infoObj);
				}
				this.value1 = res.nickname;
				this.value2 = res.mobile;
				this.pic = res.userface;
			},
			toYonghuxieyi() {
				uni.navigateTo({
					url: '/pages/wode/yonghuxieyi'
				})
			},
			async addClick1() {
				var img = await this.$OSSUpload('img')
				this.pic = img
			},
			seeImg1() {
				uni.previewImage({
					urls: [this.pic], 
					current:0
				});
			},
			delImg1() {
				this.pic = ''
			},
			conf() {
				uni.navigateBack({
					delta: 1
				})
			},
			async onSubmit(e) {
				if (this.value1 == '') {
					this.$refs.uToast.show({
						title: '请输入昵称',
					})
					return
				}
				if (this.value2 == '') {
					this.$refs.uToast.show({
						title: '请输入手机号',
					})
					return
				}
				if (this.pic == '') {
					this.$refs.uToast.show({
						title: '请上传头像',
					})
					return
				}
				const res = await this.$api.user_edituserinfo({
					nickname:this.value1,
					mobile:this.value2,
					userface:this.pic,
				})
				this.$refs.uToast.show({
					title: res.msg,
					callback:()=>{
						if(res.result == 1){
							uni.navigateBack({
								delta:1
							})
						}
					}
				})

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
	/deep/ .u-navbar-fixed {
		background: #f8faff !important;
	}

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

	.nav2 {
		padding: 0 104rpx;

		.tit1 {
			font-size: 48rpx;
			font-family: PingFangSC, PingFangSC-Medium;
			font-weight: 500;
			color: #000000;
		}

		.tit2 {
			margin-top: 20rpx;
			font-size: 28rpx;
			font-family: PingFangSC, PingFangSC-Regular;
			font-weight: 400;
			color: #ff8941;
		}

		.tit3 {
			margin-top: 48rpx;
			margin-bottom: 12rpx;
			font-size: 24rpx;
			font-family: PingFangSC, PingFangSC-Regular;
			font-weight: 400;
			color: #707070;
		}

		.imgs {
			padding: 14rpx 30rpx;
			background: #ffffff;
			border-radius: 10rpx;
			box-shadow: 0rpx 4rpx 8rpx 0rpx rgba(0, 0, 0, 0.07);
			display: flex;
			align-items: center;

			// &:nth-child()
			.myImg {
				margin-right: 16rpx;
				position: relative;
				width: 100rpx;
				height: 100rpx;
				border-radius: 10rpx;

				.myImg-img {
					width: 100rpx;
					height: 100rpx;
					border-radius: 10rpx;
					z-index: 9;
				}

				.close {
					border: 50%;
					z-index: 99;
					position: absolute;
					right: -10rpx;
					top: -14rpx;
				}
			}

			.myImg.not {
				border: 2rpx dashed #979797;
				display: flex;
				align-items: center;
				justify-content: center;
			}
		}

		.tit4 {
			display: flex;
			align-items: center;
			justify-content: center;
			margin-top: 58rpx;

			.txx {
				margin-left: 8rpx;
				font-size: 26rpx;
				font-family: PingFangSC, PingFangSC-Regular;
				font-weight: 400;
				color: #b2b2b2;
			}
		}

		.btn {
			position: fixed;
			bottom: 112rpx;
			left: 50%;
			transform: translateX(-50%);
			// margin-top: 18rpx;
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

		/deep/ .u-input {
			background: #ffffff;
			border-radius: 10rpx;
			box-shadow: 0rpx 4rpx 8rpx 0rpx rgba(0, 0, 0, 0.07);

			.u-input__input {
				padding: 10rpx 32rpx;
			}
		}
	}
</style>
