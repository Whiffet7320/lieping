<template>
	<view class="index">
		<u-top-tips ref="uTips"></u-top-tips>
		<u-toast ref="uToast" />
		<!-- <view class="top"></view>
		<view class="nav1">
			<u-icon @click='toBack' style='margin-right: 12rpx;' name="arrow-left" color="#000000" size="36"></u-icon>
			<view @click='toBack' class="n1-txt">创建岗位</view>
		</view> -->
		<u-navbar back-text="创建岗位" back-icon-size='36'></u-navbar>
		<view style="margin-top: calc(16rpx);" class="nav2 nav3 nav4">
			<view class="n2-box">
				<view :class="{'n2b-tit1':true,'red':isOnsubmit3}">招聘企业<text class="red">*保护猎企权益，严禁实名制</text></view>
				<view class="n2b-tit2">
					<u-input maxlength='12' :placeholder-style="isOnsubmit3?'color: #ff5c50;':'color: #c0c4cc;'"
						:clearable='false' :placeholder='!isOnsubmit3?"请输入对外显示名称":"*请输入对外显示名称"' v-model="value1"
						type="text" />
					<!-- <u-icon name="play-right-fill" color="#000000" size="20"></u-icon> -->
				</view>
				<view style="margin-top: 0;" class="heng"></view>
				<view style="margin-top: 46rpx;" :class="{'n2b-tit1':true,'red':isOnsubmit4}">内部识别名称</view>
				<view class="n2b-tit2">
					<u-input maxlength='12' :placeholder-style="isOnsubmit4?'color: #ff5c50;':'color: #c0c4cc;'"
						:clearable='false' :placeholder='!isOnsubmit4?"仅内部可见":"*请输入内部识别名称"' v-model="value2"
						type="text" />
					<!-- <u-icon name="play-right-fill" color="#000000" size="20"></u-icon> -->
				</view>
				<view style="margin-top: 0;" class="heng"></view>
				<view style="margin-top: 46rpx;" :class="{'n2b-tit1':true,'red':isOnsubmit5}">岗位名称</view>
				<view class="n2b-tit2">
					<u-input maxlength='12' :placeholder-style="isOnsubmit5?'color: #ff5c50;':'color: #c0c4cc;'"
						:clearable='false' :placeholder='!isOnsubmit5?"岗位名称":"*请输入岗位名称"' v-model="value3" type="text" />
					<!-- <u-icon name="play-right-fill" color="#000000" size="20"></u-icon> -->
				</view>
				<view style="margin-top: 0;" class="heng"></view>
				<view style="margin-top: 46rpx;" :class="{'n2b-tit1':true,'red':isOnsubmit2}">工作地点</view>
				<view @click="toCity" class="n2b-tit2">
					<view :class="{'l-txt1':true,'gray':cityVal == '','red':isOnsubmit2}">
						{{cityVal == '' ? '*请选择工作地点' : cityVal}}
					</view>
					<u-icon name="play-right-fill" color="#000000" size="20"></u-icon>
				</view>
				<view class="heng"></view>
				<view style="margin-top: 46rpx;" :class="{'n2b-tit1':true,'red':isOnsubmit}">薪酬</view>
				<view class="n2b-tit2" @click='seleShow4_1 = true'>
					<view :class="{'l-txt1':true,'gray':sele4_1_val == '','red':isOnsubmit}">
						{{sele4_1_val == '' ? '*请选择薪酬范围' : sele4_1_val}}
					</view>
					<u-select title='期望薪资' v-model="seleShow4_1" mode="mutil-column-auto" :list="xinziList"
						@confirm="confirm4_1"></u-select>
					<!-- <u-select v-model="seleShow4_1" mode="mutil-column" :default-value='defaultSelector' value-name='id' label-name='cateName' :list="pick4_1" @confirm="changePick4_1"></u-select> -->
					<!-- <u-picker @columnchange="changePick4_1" :range='pick4_1' range-key="cateName" mode="multiSelector"
						title='期望薪资' v-model="seleShow4_1" :default-selector='defaultSelector'></u-picker> -->
					<u-icon name="play-right-fill" color="#000000" size="20"></u-icon>
				</view>
				<view class="heng"></view>
				<view style="display: flex;align-items: center;margin-top: 46rpx;justify-content: space-between;"
					class="flex">
					<view class="n2b-tit1">理解岗位<text class="red">*仅团队成员可见</text></view>
					<view class="xxx"><text style="color: #095bfe;">{{nowIndex+1}}</text>/{{wtTotal}}</view>
				</view>
				<view class="bbx">
					<view class="b-l">{{nowIndex+1}}.{{wtList[nowIndex].question}}？</view>
					<view class="b-r" v-if="voiceList[nowIndex].src !=''">
						<image @click="delAudio" class="iconImg" src="/static/newImage/tabBar/shanchu.png" mode="">
						</image>
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
					<view @touchstart="start" @touchmove="move" @touchend="end" class="b2-3">按住说话</view>
				</view>
			</view>
		</view>
		<view class="footer">
			<template v-if="isGLY">
				<view @click="onSubmit" class="f-btn">完成</view>
				<!-- <view v-if="post_id == ''" @click="onSubmit" class="f-btn">完成</view>
				<view v-else style="display: flex;align-items: center;justify-content: center;">
					<view @click="onSubmit" class="f-btn2">完成</view>
					<view @click="zf" class="f-btn3">转发</view>
				</view> -->
			</template>
			<template v-else>
				<view @click="onSubmit2" style="background: #bcbcbc;" class="f-btn">完成</view>
				<view
					style="margin-top: -16rpx;font-size: 24rpx;font-family: PingFangSC, PingFangSC-Regular;font-weight: 400;text-align: center;color: #ff5c50;">
					*仅您的公司管理员有权限创建</view>
			</template>
		</view>

		<u-modal @confirm='delA' show-cancel-button v-model="modShow" content="确认删除？"></u-modal>

	</view>
</template>

<script>
	const recorderManager = uni.getRecorderManager();
	const innerAudioContext = uni.createInnerAudioContext();
	import xinziList from '../../static/xinziList.js'
	export default {
		watch: {
			value1() {
				if (this.value1 != '') {
					this.isOnsubmit3 = false
				}
			},
			value2() {
				if (this.value2 != '') {
					this.isOnsubmit4 = false
				}
			},
			cityVal() {
				if (this.cityVal != '') {
					this.isOnsubmit2 = false
				}
			},
			sele4_1_val() {
				if (this.sele4_1_val != '') {
					this.isOnsubmit = false
				}
			},
		},
		// 用户点击右上角分享转发
		onShareAppMessage: async function() {
			if (this.noShare) {
				this.noShare = false
				return
			}
			const res = await this.$api.tokentouserid({
				token: uni.getStorageSync('token'),
			})
			this.user_id = res.user_id
			const res2 = await this.$api.share_jobpost({
				post_id: this.post_id,
				share_fromuserid: this.user_id
			})
			if (res2.result == 1) {
				this.shareTitle = `职位-${res2.job_post.jobs}-${res2.job_post.salary_range}`
				var title = ''
				title = this.shareTitle; //data，return 数据title
				console.log(this.shareTitle)
				return {
					title: title == '' ? '猎头导航让猎头做单更高效' : title,
					path: `/pages/qzz/zhiweixiangqin?scene=${this.post_id}_${this.user_id}_yyy`,
					imageUrl: 'https://rushifu-test.oss-cn-hangzhou.aliyuncs.com/1668752961132.png'
				}
			} else {
				return {
					title: '猎头导航让猎头做单更高效',
					path: `/pages/tabBar/index`,
					imageUrl: 'https://rushifu-test.oss-cn-hangzhou.aliyuncs.com/1668752961132.png'
				}
			}
		},
		//用户点击右上角分享朋友圈
		onShareTimeline: async function() {
			if (this.noShare) {
				this.noShare = false
				return
			}
			const res = await this.$api.tokentouserid({
				token: uni.getStorageSync('token'),
			})
			this.user_id = res.user_id
			const res2 = await this.$api.share_jobpost({
				post_id: this.post_id,
				share_fromuserid: this.user_id
			})
			if (res2.result == 1) {
				this.shareTitle = `职位-${res2.job_post.jobs}-${res2.job_post.salary_range}`
				var title = ''
				title = this.shareTitle; //data，return 数据title
				console.log(this.shareTitle, `scene=${this.post_id}_${this.user_id}_yyy`)
				return {
					title: title == '' ? '猎头导航让猎头做单更高效' : title,
					query: this.scene,
					imageUrl: 'https://rushifu-test.oss-cn-hangzhou.aliyuncs.com/1666921393169.png'
				}
			} else {
				return {
					title: '猎头导航让猎头做单更高效',
					path: `/pages/tabBar/index`,
					imageUrl: 'https://rushifu-test.oss-cn-hangzhou.aliyuncs.com/1666921393169.png'
				}
			}
		},
		data() {
			return {
				isGLY: null,
				scene: '',
				haveVoice: false,
				num: 1,
				seleShow4_1: false,
				sele4_1: [],
				sele4_1_val: '',
				pick4_1: [],
				defaultSelector: [0, 0, 0, 0, 0, 0],
				cityVal: '',
				time: 0,
				timer: null,
				value1: '',
				value2: '',
				value3: "",
				voicePath: null,
				isOnsubmit: false,
				isOnsubmit2: false,
				isOnsubmit3: false,
				isOnsubmit4: false,
				isOnsubmit5: false,
				arr1: [],
				arr1_old: [],
				arr2: [],
				arr3: [],
				arr3_old: [],
				arr4: [],
				arr5: [],
				arr5_old: [],
				arr6: [],
				val1: '',
				val3: '', 
				val5: '',
				xcList: [],
				xinziList,
				wtList: [],
				nowIndex: 0,
				wtTotal: 0,
				voiceList: [],
				post_id: '',
				user_id: "",
				isDisplay: false,
				timer2: null,
				modShow: false,
				def4_1:[],
			}
		},
		async onLoad(option) {
			console.log(option, 'opti')
			this.isGLY = option.isGLY
			this.getUserInfo()
			recorderManager.onStop(res => {
				console.log('recorder stop1' + JSON.stringify(res));
				this.voicePath = res.tempFilePath;
			});
			this.post_id = option.post_id;
			if (this.post_id) {
				this.getGWXQData()
			}else{
				this.getData2()
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
			if (option.jump != 'no') {
				uni.reLaunch({
					url: `/pages/qzz/zhiweixiangqin?scene=${this.post_id}_${this.user_id}`
				})
			}
		},
		onShow() {
			console.log(this.xinziList)
			this.getData()
		},
		methods: {
			async getData2() {
				const res = await this.$api.position_checkview()
				this.value1 = res.position_view.com_name;
				this.value2 = res.position_view.internal_name;
			},
			async getUserInfo() {
				const res = await this.$api.user_info()
				this.userObj = res
				if (res.result == 1) {
					uni.setStorageSync('userObj', this.userObj);
				}
				if (this.userObj.joincompany.com_ismanage == 1) {
					this.isGLY = true
				} else {
					this.isGLY = false
				}
			},
			async getGWXQData() {
				const res = await this.$api.position_view({
					id: this.post_id,
				})
				this.value1 = res.position_view.com_name
				this.value2 = res.position_view.internal_name
				this.value3 = res.position_view.jobs
				this.cityVal = res.position_view.work_place
				this.sele4_1_val = res.position_view.salary_range
				this.voiceList = res.position_view.understand_position
				console.log(res, 'res', this.post_id)
			},
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
			zf() {
				// this.$refs.uTips.show({
				// 	title: '点击右上角三个小圆点按钮进行分享',
				// 	type: 'success',
				// 	duration: '2300'
				// })
				this.$refs.uToast.show({
					title: '点击右上角三个小圆点按钮进行分享',
					duration: '3300'
				})
			},
			onSubmit2(){
				if(this.userObj.is_joincompany == 0){
					uni.navigateTo({
						url:'/pages/wode/jiaru'
					})
				}else{
					this.$refs.uToast.show({
						title: '您不是管理员不能创建',
					})
				}
			},
			async onSubmit() {
				console.log(this.voiceList)
				if (this.sele4_1_val == '') {
					this.isOnsubmit = true
				} else {
					this.isOnsubmit = false
				}
				if (this.cityVal == '') {
					this.isOnsubmit2 = true
				} else {
					this.isOnsubmit2 = false
				}
				if (this.value1 == '') {
					this.isOnsubmit3 = true
				} else {
					this.isOnsubmit3 = false
				}
				if (this.value2 == '') {
					this.isOnsubmit4 = true
				} else {
					this.isOnsubmit4 = false
				}
				if (this.value3 == '') {
					this.isOnsubmit5 = true
				} else {
					this.isOnsubmit5 = false
				}
				if (this.isOnsubmit || this.isOnsubmit2 || this.isOnsubmit3 || this.isOnsubmit4 || this.isOnsubmit5) {
					return
				}
				const res = await this.$api.create_position({
					com_name: this.value1,
					internal_name: this.value2,
					work_place: this.cityVal,
					salary_range: this.sele4_1_val,
					jobs_name: this.value3,
					understand_position: JSON.stringify(this.voiceList),
					id: this.post_id
				})
				if (res.result == 1) {
					this.$refs.uToast.show({
						title: res.msg, 
						back: true
					})
				}else{
					this.$refs.uToast.show({
						title: res.msg,
					})
				}
			},
			start() {
				if (this.voiceList[this.nowIndex].src != '') {
					this.$refs.uToast.show({
						title: '需要删除录音后才能点击录音',
						duration: '2300'
					})
					return
				}
				recorderManager.start({
					duration: 500000,
				})
				recorderManager.onStart(() => {
					this.voiceList[this.nowIndex].time = 0
					console.log('hah')
					this.timer = setInterval(() => {
						this.voiceList[this.nowIndex].time++
					}, 1000)
				})
				uni.showLoading({
					title: '正在录音'
				});
			},
			move() {
				console.log('move')
			},
			end() {
				console.log('end')
				recorderManager.stop();
				recorderManager.onStop(async res => {
					console.log('recorder stop2' + JSON.stringify(res));
					this.voicePath = await this.$OSSUpload('voice', res.tempFilePath);
					console.log(this.voicePath, 'vvv')
					this.$set(this.voiceList, [this.nowIndex], {
						id: this.wtList[this.nowIndex].id,
						src: this.voicePath,
						time: this.voiceList[this.nowIndex].time,
					})
					clearInterval(this.timer)
					this.haveVoice = true
					uni.hideLoading();
				})
			},
			delAudio() {
				this.modShow = true;
			},
			delA() {
				this.$set(this.voiceList, [this.nowIndex], {
					id: '',
					src: '',
					time: 0,
				})
				this.haveVoice = false
				this.modShow = false;
			},
			playAudio() {
				// if (this.voicePath) {
				// 	innerAudioContext.src = this.voicePath;
				// 	innerAudioContext.play();
				// }
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
			toCity() {
				uni.navigateTo({
					url: '/pages/gangwei/xuanzechengshi'
				})
			},
			confirm4_1(e) {
				// console.log(e)
				this.sele4_1.forEach((ele,i)=>{
					if(ele.value == e[0].value){
						this.def4_1 = [i]
					}
				})
				this.sele4_1_val = `${e[0].label}~${e[2].label}*${e[4].label.substring(0,e[4].label.length-1)}薪`
			},
			change4_1(e) {
				console.log(e)
			},
			toBack() {
				uni.switchTab({
					url: '/page'
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
	/deep/ .u-select__header {
		font-size: 30rpx;
	}

	/deep/ .u-line-1 {
		font-size: 30rpx;
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
				font-size: 32rpx;
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

				.l-txt1.red {
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

		.f-btn2 {
			margin: 38rpx 0 0 0;
			width: 270rpx;
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

		.f-btn3 {
			margin: 38rpx 0 0 32rpx;
			width: 270rpx;
			height: 96rpx;
			// background: #1362fd;
			border: 2rpx solid #1362fd;
			border-radius: 48rpx;
			font-size: 32rpx;
			font-family: PingFangSC, PingFangSC-Medium;
			font-weight: 500;
			text-align: center;
			color: #1362fd;
			line-height: 96rpx;
		}
	}
</style>
