<template>
	<view class="index">
		<!-- <view class="top"></view>
		<view class="nav1">
			<u-icon @click='toBack' style='margin-right: 12rpx;' name="arrow-left" color="#000000" size="36"></u-icon>
			<view @click='toBack' class="n1-txt">岗位详情</view>
		</view> -->
		<u-navbar back-text="岗位详情" back-icon-size='36'></u-navbar>
		<view style="margin-top: calc(16rpx);" class="nav2 nav3 nav4">
			<view class="n2-box">
				<view class="n2b-tit1">招聘企业</view>
				<view class="n2b-tit22">{{objData.com_name}}</view>
				<view style="margin-top: 44rpx;" class="n2b-tit1">内部识别名称</view>
				<view class="n2b-tit22">{{objData.internal_name}}</view>
				<view style="margin-top: 44rpx;" class="n2b-tit1">工作地点</view>
				<view class="n2b-tit22">{{objData.work_place}}</view>
				<view style="margin-top: 44rpx;" class="n2b-tit1">薪酬</view>
				<view class="n2b-tit22">{{objData.salary_range}}</view>
				
				<view style="display: flex;align-items: center;margin-top: 46rpx;justify-content: space-between;"
					class="flex">
					<view class="n2b-tit1">理解岗位<text class="red">*仅团队成员可见</text></view>
					<view class="xxx"><text style="color: #095bfe;">{{nowIndex+1}}</text>/{{wtTotal}}</view>
				</view>
				<view class="bbx">
					<view class="b-l">{{nowIndex+1}}.{{wtList[nowIndex].question}}？</view>
					<view class="b-r" v-if="voiceList[nowIndex].src !=''">
						<!-- <image @click="delAudio" class="iconImg" src="/static/newImage/tabBar/shanchu.png" mode="">
						</image> -->
						<view class="br-b" @click="playAudio">
							<view class="txxt">{{voiceList[nowIndex].time}}″</view>
							<image :style="{'opacity':(isDisplay ? 0 : 1)}" class="iconImg2"
								src="/static/newImage/tabBar/yuyin.png" mode=""></image>
						</view>
					</view>
				</view>
				<view class="btns2">
					<view @click="beforeWt" :class="{'b2-1':true,'no':nowIndex == 0}">上一个</view>
					<view @click="nextWt" :class="{'b2-1':true,'no':nowIndex == wtTotal - 1}">下一个</view>
				</view>
			</view>
		</view>
<!-- 		<view class="footer">
			<view @click="onSubmit" class="f-btn">完成</view>
		</view> -->

	</view>
</template>

<script>
	const recorderManager = uni.getRecorderManager();
	const innerAudioContext = uni.createInnerAudioContext();
	export default {
		watch:{
			cityVal(){
				if(this.cityVal != ''){
					this.isOnsubmit2 = false
				}
			},
			sele4_1_val(){
				if(this.sele4_1_val != ''){
					this.isOnsubmit = false
				}
			},
		},
		data() {
			return {
				num: 1,
				seleShow4_1: false,
				sele4_1: [
					[{
							value: '1',
							label: '2K'
						},
						{
							value: '2',
							label: '3K'
						},
						{
							value: '2',
							label: '4K'
						},
						{
							value: '2',
							label: '5K'
						},
						{
							value: '2',
							label: '6K'
						},
						{
							value: '2',
							label: '7K'
						},
						{
							value: '2',
							label: '8K'
						},
						{
							value: '2',
							label: '9K'
						},
						{
							value: '2',
							label: '10K'
						},
						{
							value: '2',
							label: '11K'
						},
						{
							value: '2',
							label: '12K'
						}
					],
					[{
						value: '1',
						label: '~'
					}],
					[{
							value: '1',
							label: '2K'
						},
						{
							value: '2',
							label: '3K'
						},
						{
							value: '2',
							label: '4K'
						},
						{
							value: '2',
							label: '5K'
						},
						{
							value: '2',
							label: '6K'
						},
						{
							value: '2',
							label: '7K'
						},
						{
							value: '2',
							label: '8K'
						},
						{
							value: '2',
							label: '9K'
						},
						{
							value: '2',
							label: '10K'
						},
						{
							value: '2',
							label: '11K'
						},
						{
							value: '2',
							label: '12K'
						}
					],
					[{
						value: '1',
						label: '×'
					}],
					[{
							value: '3',
							label: '12'
						},
						{
							value: '4',
							label: '13'
						},
						{
							value: '4',
							label: '14'
						},
						{
							value: '4',
							label: '15'
						},
						{
							value: '4',
							label: '16'
						}
					],
					[{
						value: '1',
						label: '月'
					}],
				],
				sele4_1_val: '',
				cityVal: '',
				time: 0,
				timer: null,
				voicePath: null,
				isOnsubmit:false,
				isOnsubmit2:false,
				post_id:"",
				isGLY:"",
				objData:{},
				wtList:[],
				wtTotal:0,
				nowIndex:0,
				voiceList:[],
				isDisplay: false,
				timer2:null,
			}
		},
		onShow() {
			this.getData()
		},
		async onLoad(option) {
			recorderManager.onStop(res=> {
				console.log('recorder stop1' + JSON.stringify(res));
				this.voicePath = res.tempFilePath;
			});
			this.post_id = option.post_id
			this.isGLY = option.isGLY
			if (this.post_id) {
				this.getGWXQData()
			}
			if (this.post_id != '') {
				const res = await this.$api.tokentouserid({
					token: uni.getStorageSync('token'),
				})
				this.user_id = res.user_id
				const res2 = await this.$api.share_jobpost({
					post_id: this.post_id,
					share_fromuserid: this.user_id,
				})
				this.$store.commit('post_id', '')
				this.shareTitle = `${res2.job_post.jobs},进来自测匹配度`
				console.log(this.shareTitle)
				uni.setNavigationBarTitle({
					title: this.shareTitle,
				});
				this.scene = `scene=${this.post_id}_${this.user_id}_yyy`
			} else {
				uni.setNavigationBarTitle({
					title: '猎头导航让猎头做单更高效',
				});
			}
		},
		methods: {
			async getData() {
				const res = await this.$api.problem_list({
					page: 1,
					pagesize: 1000
				})
				this.wtList = res.list
				this.wtTotal = res.total
				this.wtList.forEach(() => {
					if (this.voiceList.length < this.wtList.length) {
						this.voiceList.push({
							id: '',
							src: '',
							time: 0,
						})
					}
				})
			},
			async getGWXQData() {
				const res = await this.$api.position_view({
					id: this.post_id,
				})
				this.objData = res.position_view
				this.voiceList = res.position_view.understand_position
			},
			playAudio() {
				console.log('123456')
				clearInterval(this.timer2)
				this.timer2 = null;
				this.timer2 = setInterval(() => {
					this.isDisplay = !this.isDisplay
				}, 500)
				innerAudioContext.src = this.voiceList[this.nowIndex].src;
				innerAudioContext.play();
				innerAudioContext.onEnded(() => {
					clearInterval(this.timer2)
					this.isDisplay = false;
				})
			},
			beforeWt() {
				if (this.nowIndex == 0) {
					this.nowIndex = 0
				} else {
					this.nowIndex--
				}
			},
			nextWt() {
				if (this.nowIndex == this.wtTotal - 1) {
					this.nowIndex = this.wtTotal - 1
				} else {
					this.nowIndex++
				}
			},
			onSubmit(){
				if(this.sele4_1_val == ''){
					this.isOnsubmit = true
				}else{
					this.isOnsubmit = false
				}
				if(this.cityVal == ''){
					this.isOnsubmit2 = true
				}else{
					this.isOnsubmit2 = false
				}
			},
			start() {
				console.log('start')
				recorderManager.start({
					duration: 500000,
				})
				recorderManager.onStart(() => {
					this.time = 0
					console.log('hah')
					this.timer = setInterval(() => {
						this.time++
					}, 1000)
				})
			},
			move() {
				console.log('move')
			},
			end() {
				console.log('end')
				recorderManager.stop();
				recorderManager.onStop(res => {
					console.log('recorder stop2' + JSON.stringify(res));
					this.voicePath = res.tempFilePath;
					clearInterval(this.timer)
				})
				
			},
			delAudio(){
				this.voicePath = null;
				this.time = 0
			},
			toCity() {
				uni.navigateTo({
					url: '/pages/gangwei/xuanzechengshi'
				})
			},
			confirm4_1(e) {
				// console.log(e)
				this.sele4_1_val = `${e[0].label}~${e[2].label}*${e[4].label}薪`
			},
			toBack() {
				uni.switchTab({
					url:'/page'
				})
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

	.nav4 {
		margin-top: 32rpx;
		padding-bottom: 300rpx;

		.n2-tit1 {
			font-size: 36rpx;
			font-family: PingFangSC, PingFangSC-Medium;
			font-weight: 600;
			color: #000000;
			margin-left: 52rpx;
			margin-bottom: 32rpx;
		}

		.n2-box {
			width: 710rpx;
			margin: 0 auto;
			background: #ffffff;
			border-radius: 20rpx;
			padding: 48rpx 30rpx;

			.n2b-tit1 {
				font-size: 28rpx;
				font-family: PingFangSC, PingFangSC-Medium;
				font-weight: 500;
				color: #000000;
				margin-bottom: 20rpx;

				.red {
					font-size: 20rpx;
					font-family: PingFangSC, PingFangSC-Regular;
					font-weight: 400;
					color: #ff5c50;
					margin-left: 16rpx;
				}
			}
			.n2b-tit22{
				font-size: 32rpx;
				font-family: PingFangSC, PingFangSC-Regular;
				font-weight: 400;
				color: #b5b6b5;
			}

			.xxx {
				font-size: 26rpx;
				font-family: PingFangSC, PingFangSC-Regular;
				font-weight: 400;
				text-align: left;
				color: #000000;
			}

			.bbx {
				margin-top: 12rpx;
				width: 648rpx;
				height: 276rpx;
				background: #f8faff;
				border: 1.6rpx solid #eeeeee;
				border-radius: 24rpx;
				padding: 40rpx 32rpx;

				.b-l {
					width: 504rpx;
					// height: 86rpx;
					background: #e5eeff;
					border-radius: 16rpx;
					font-size: 28rpx;
					font-family: PingFangSC, PingFangSC-Medium;
					font-weight: 500;
					// text-align: center;
					padding: 28rpx 24rpx;
					color: #000000;
					line-height: 34rpx;
				}

				.b-r {
					margin-top: 24rpx;
					display: flex;
					align-items: center;
					justify-content: flex-end;

					.iconImg {
						width: 40rpx;
						height: 40rpx;
					}

					.br-b {
						margin-left: 24rpx;
						display: flex;
						align-items: center;
						justify-content: flex-end;
						width: 344rpx;
						height: 86rpx;
						background: #1362fd;
						border-radius: 16rpx;
						padding: 0 30rpx;

						.txxt {
							font-size: 28rpx;
							font-family: PingFangSC, PingFangSC-Medium;
							font-weight: 500;
							color: #ffffff;
							line-height: 86rpx;
						}

						.iconImg2 {
							transition: all 0.5s;
							margin-left: 12rpx;
							width: 42rpx;
							height: 42rpx;
						}
					}
				}
			}

			.btns2 {
				margin-top: 32rpx;
				display: flex;
				align-items: center;
				justify-content: center;

				.b2-1 {
					width: 142rpx;
					height: 50rpx;
					border: 2rpx solid #095bfe;
					border-radius: 8rpx;
					font-size: 26rpx;
					font-family: PingFangSC, PingFangSC-Regular;
					font-weight: 400;
					text-align: center;
					color: #095bfe;
					line-height: 48rpx;
					margin-right: 40rpx;
				}

				.b2-1.no {
					background: #ededed;
					border: 2rpx solid #f9f9f9;
					color: #b4b4b4;
				}
				.b2-3.no {
					background: #ededed;
					border: 2rpx solid #f9f9f9;
					color: #b4b4b4;
				}
				.b2-3 {
					width: 168rpx;
					height: 52rpx;
					background: linear-gradient(90deg, #84aef3, #0256ff);
					border-radius: 8rpx;
					font-size: 26rpx;
					font-family: PingFangSC, PingFangSC-Regular;
					font-weight: 400;
					text-align: center;
					color: #ffffff;
					line-height: 52rpx;
				}
			}

			.n2b-tit2 {
				display: flex;
				align-items: center;
				justify-content: space-between;

				.l-txt1 {
					line-height: 70rpx;
					width: 560rpx;
					font-size: 24rpx;
					font-family: PingFangSC, PingFangSC-Regular;
					font-weight: 400;
					color: #000000;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap; // 默认不换行；
				}

				.l-txt1.gray {
					color: #bcbcbc;
				}
				.l-txt1.red{
					color: #FF5C50;
				}
			}

			.heng {
				// margin-top: 8rpx;
				height: 4rpx;
				background: #ececec;
			}

			.n2b-tit3 {
				font-size: 26rpx;
				font-family: PingFangSC, PingFangSC-Regular;
				font-weight: 400;
				color: #707070;
				margin-top: 20rpx;
			}

			.n2b-btns {
				display: flex;
				align-items: center;
				justify-content: center;
				margin-top: 32rpx;

				.b1 {
					width: 198rpx;
					height: 52rpx;
					background: #f8faff;
					border-radius: 26rpx;
					display: flex;
					align-items: center;
					justify-content: center;

					.b1-txt1 {
						font-size: 28rpx;
						font-family: PingFangSC, PingFangSC-Medium;
						font-weight: 600;
						color: #121212;
						margin-right: 16rpx;
					}

					.circle {
						width: 24rpx;
						height: 24rpx;
						border: 2rpx solid #979797;
						border-radius: 50%;
					}
				}
			}
		}
	}

	.nav2.nav3 {
		.n2b-tit3 {
			display: flex;
			align-items: center;

			.lt2-txt {
				font-size: 28rpx;
				font-family: PingFangSC, PingFangSC-Regular;
				font-weight: 400;
				color: #121212;
			}

			.shu {
				width: 4rpx;
				height: 48rpx;
				background: #979797;
				margin: 0 18rpx;
			}

			/deep/ .u-input__input {
				width: 552rpx;
				font-size: 24rpx;
			}
		}
	}

	.nav2.nav3.nav4 {
		/deep/ .u-input__input {
			width: 522rpx;
			font-size: 24rpx;
		}

		.age-box {
			display: flex;
			align-items: center;
			justify-content: space-between;

			.a-left {
				width: 268rpx;
				display: flex;
				flex-direction: column;

				.al-t {
					width: 268rpx;
					display: flex;
					align-items: center;

					.txt {
						width: 560rpx;
						font-size: 28rpx;
						font-family: PingFangSC, PingFangSC-Regular;
						font-weight: 400;
						color: #000000;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap; // 默认不换行；
					}

					.txt.gray {
						color: #bcbcbc;
					}
				}

				.hengg {
					margin-top: 8rpx;
					width: 268rpx;
					height: 4rpx;
					background: #ececec;
				}
			}

			.heng2 {
				width: 66rpx;
				height: 2rpx;
				background: #121212;
			}

			.a-right {
				.ar-t {
					width: 268rpx;
					display: flex;
					align-items: center;

					.txt {
						width: 560rpx;
						font-size: 28rpx;
						font-family: PingFangSC, PingFangSC-Regular;
						font-weight: 400;
						color: #000000;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap; // 默认不换行；
					}

					.txt.gray {
						color: #bcbcbc;
					}
				}

				.hengg {
					margin-top: 8rpx;
					width: 268rpx;
					height: 4rpx;
					background: #ececec;
				}
			}
		}
	}

	.footer {
		position: fixed;
		bottom: 0;
		width: 750rpx;
		height: 250rpx;
		background: #ffffff;
		box-shadow: 0rpx -4rpx 8rpx 0rpx rgba(0, 0, 0, 0.03);

		.f-btn {
			margin: 38rpx auto;
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
