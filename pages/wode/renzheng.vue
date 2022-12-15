<template>
	<view class="index">
		<u-toast ref="uToast" />
		<!-- <view class="top"></view> -->
		<!-- <view class="nav1">
			<u-icon @click='toBack' style='margin-right: 12rpx;' name="arrow-left" color="#000000" size="36"></u-icon>
		</view> -->
		<u-navbar back-icon-size='36'></u-navbar>
		<view style="margin-top: calc(0rpx);" class="nav2">
			<view class="tit1">认证猎企</view>
			<view class="tit2">猎头导航更适用于500强企业招聘标准</view>
			<view class="tit3">公司全称</view>
			<u-input v-model="obj.com_name" :clearable='false' placeholder='请输入您的公司名称' type="text" :border="false" />
			<view class="tit3">姓名</view>
			<u-input v-model="obj.realname" :clearable='false' placeholder='请输入您的姓名' type="text" :border="false" />
			<view class="tit3">手机号</view>
			<u-input v-model="obj.mobile" :clearable='false' placeholder='请输入您的手机号' type="text" :border="false" />
			<view class="tit3">验证码</view>
			<view class="inp2box">
				<u-input v-model="obj.yzm" style='width: 306rpx;' :clearable='false' placeholder='请输入您的验证码' type="text" :border="false" />
				<view @click='getCode' class="txt1">{{tips}}</view>
			</view>
			<view class="tit3">职务</view>
			<u-input v-model="obj.jobs" :clearable='false' placeholder='请输入您的职务' type="text" :border="false" />
			<view class="tit3">营业执照</view>
			<view class="imgs">
				<view class="myImg" v-for="(item,i) in obj.license_pics">
					<image @click="seeImg1(i)" class="myImg-img" :src="item" mode=""></image>
					<view class="close" @click="delImg1(i)">
						<u-icon name="close-circle-fill" color="#FF414C" size="28"></u-icon>
					</view>
				</view>
				<view v-if="imgList1.length != 4" class="myImg not" @click="addClick1">
					<view class="add">
						<u-icon name="plus-circle-fill" color="#095bfe" size="50"></u-icon>
					</view>
				</view>
			</view>
			<view class="tit3">人力资源服务许可证</view>
			<view class="imgs">
				<view class="myImg" v-for="(item,i) in obj.servicelicense_pics">
					<image @click="seeImg2(i)" class="myImg-img" :src="item" mode=""></image>
					<view class="close" @click="delImg2(i)">
						<u-icon name="close-circle-fill" color="#FF414C" size="28"></u-icon>
					</view>
				</view>
				<view v-if="imgList2.length != 4" class="myImg not" @click="addClick2">
					<view class="add">
						<u-icon name="plus-circle-fill" color="#095bfe" size="50"></u-icon>
					</view>
				</view>
			</view>
			<view class="tit4">
				<u-icon @click='isClick = true' v-if='!isClick' name="checkmark-circle" color="#B2B2B2" size="28">
				</u-icon>
				<u-icon @click='isClick = false' v-else name="checkmark-circle-fill" color="#2979ff" size="28"></u-icon>
				<view class="txx"><text @click='isClick = !isClick'>我已阅读并同意</text><text @click="toYonghuxieyi"
						style="color:#1362FD">用户协议</text></view>
			</view>
			<view @click="onSubmit" class="btn">提交审核</view>
			<view style="width: 2rpx;height: 110rpx;"></view>
			<!-- <button open-type="getPhoneNumber" @getphonenumber="onSubmit">提交审核</button> -->
		</view>
		<u-modal @confirm='conf' :show-title='false' :content-style='modStyle' v-model="modshow"
			content="一天内审核完成，请在我的消息中查看"></u-modal>
		<u-verification-code seconds="60" ref="uCode" @change="codeChange">
		</u-verification-code>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tips:"",
				modshow: false,
				obj: {
					yzm:"",
					com_name: '',
					realname: "",
					mobile:"",
					jobs: "",
					license_pics: [],
					servicelicense_pics: []
				},
				value1: '',
				value2: '',
				value3: '',
				isClick: false,
				modStyle: {
					'font-size': '32rpx',
					"color": '#121212'
				},
				imgList1: ['https://img0.baidu.com/it/u=1284526633,2834461447&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500'],
				imgList2: ['https://img0.baidu.com/it/u=1284526633,2834461447&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500'],
			}
		},
		onShow() {

		},
		onLoad() {

		},
		methods: {
			codeChange(text) {
				this.tips = text;
			},
			async getCode() {
				if (this.$refs.uCode.canGetCode) {
					// 模拟向后端请求验证码
					uni.showLoading({
						title: '正在获取验证码'
					})
					const res = await this.$api.sendsms({
						mobile: this.obj.mobile,
						type:1
					})
					if (res.result == 1) {
						uni.hideLoading();
						this.$u.toast('验证码已发送');
						this.$refs.uCode.start();
					} else {
						this.$u.toast(res.msg);
					}
			
				} else {
					this.$u.toast('倒计时结束后再发送');
				}
			},
			toYonghuxieyi() {
				uni.navigateTo({
					url: '/pages/wode/yonghuxieyi'
				})
			},
			async addClick2() {
				var img = await this.$OSSUpload('img')
				this.obj.servicelicense_pics.push(img)
			},
			async addClick1() {
				var img = await this.$OSSUpload('img')
				this.obj.license_pics.push(img)
			},
			seeImg1(i) {
				uni.previewImage({
					urls: this.obj.license_pics,
					current: i
				});
			},
			seeImg2(i) {
				uni.previewImage({
					urls: this.obj.servicelicense_pics,
					current: i
				});
			},
			delImg1(i) {
				this.obj.license_pics.splice(i, 1)
			},
			delImg2(i) {
				this.obj.servicelicense_pics.splice(i, 1)
			},
			conf() {
				uni.navigateBack({
					delta: 1
				})
			},
			async onSubmit(e) {
				// console.log(e)
				// if (e.detail.errMsg == "getPhoneNumber:ok") { // 用户允许或去手机号
				// 	uni.request({
				// 		url: "http://192.168.0.93:6042/login/miniProgramLogin",
				// 		method: "POST",
				// 		data: {
				// 			data: {
				// 				encryptedData: e.detail.encryptedData,
				// 				iv: e.detail.iv,
				// 				sessionKey: this.session_key,
				// 				openId: this.openId,
				// 			}
				// 		},
				// 		success: (res) => {
				// 			if (res.data.errorinfo == null) {
				// 				console.log(res.data,'phone') // 这个里面就有手机号了

				// 			}
				// 		}
				// 	})
				// } 
				if (this.obj.com_name == '') {
					this.$refs.uToast.show({
						title: '请输入公司全称',
					})
					return
				}
				if (this.obj.realname == '') {
					this.$refs.uToast.show({
						title: '请输入姓名',
					})
					return
				}
				if (this.obj.mobile == '') {
					this.$refs.uToast.show({
						title: '请输入手机号',
					})
					return
				}
				if (this.obj.yzm == '') {
					this.$refs.uToast.show({
						title: '请输入验证码',
					})
					return
				}
				if (this.obj.jobs == '') {
					this.$refs.uToast.show({
						title: '请输入职务',
					})
					return
				}
				if (!this.isClick) {
					this.$refs.uToast.show({
						title: '请阅读并同意用户协议',
					})
					return
				}
				const res = await this.$api.authentication_enterprise({
					...this.obj,
					code:this.obj.yzm,
					license_pics: this.obj.license_pics.toString(),
					servicelicense_pics: this.obj.servicelicense_pics.toString(),
				})
				if (res.result == 1) {
					this.modshow = true
				} else {
					this.$refs.uToast.show({
						title: res.msg,
					})
				}
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
	.inp2box {
		display: flex;
		align-items: center;
		justify-content: space-between;
		.inp2 {
			width: 300rpx;
			border-radius: 10rpx;
			background: #FFFFFF;
		}
	
		.txt1 {
			font-size: 24rpx;
			color: #ffffff;
			padding: 6rpx 10rpx;
			background: #19be6b;
			border-radius: 10rpx;
		}
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
			margin-top: 18rpx;
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
