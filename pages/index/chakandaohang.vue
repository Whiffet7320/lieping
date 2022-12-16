<template>
	<view class="index">
		<!-- <view class="top"></view>
		<view class="nav1">
			<u-icon @click='toBack' style='margin-right: 12rpx;' name="arrow-left" color="#000000" size="36"></u-icon>
			<view @click='toBack' class="n1-txt">查看导航</view>
		</view> -->
		<u-navbar back-text="查看导航" back-icon-size='36'></u-navbar>
		<view style="margin-top: calc(16rpx);" class="nav2">
			<view class="n2-tit1">行业背景</view>
			<view class="n2-box">
				<view class="n2b-tit1">行业分类<text class="red">*不限</text></view>
				<view class="n2b-tit2">
					<view class="l-txt1">{{dataObj.industry_name}}</view>
				</view>
				<view v-if="dataObj.is_industrysegmentation == 1" style="margin-top: 44rpx;" class="n2b-tit1">细节行业</view>
				<view v-if="dataObj.is_industrysegmentation == 1" class="n2b-tit2">
					<view class="l-txt1">{{dataObj.industrysegmentation_name}}</view>
				</view>
				<view style="margin-top: 44rpx;" class="n2b-tit1">行业关键词</view>
				<view class="n2b-tit2">
					<view class="l-txt1">{{dataObj.industry_keywords}}</view>
				</view>
			</view>
		</view>
		<view class="nav2 nav3">
			<view class="n2-tit1">公司背景</view>
			<view class="n2-box">
				<view class="n2b-tit1">公司规模</view>
				<view class="n2b-tit2">
					<view class="l-txt1">{{dataObj.company_size}}</view>
				</view>
				<view style="margin-top: 44rpx;" class="n2b-tit1">目标公司</view>
				<view class="n2b-tit2">
					<view class="l-txt1">{{dataObj.target_company}}</view>
				</view>
			</view>
		</view>
		<view class="nav2 nav3 nav4">
			<view class="n2-tit1">岗位背景</view>
			<view class="n2-box">
				<view class="n2b-tit1">岗位名称中专业方向关键词</view>
				<view class="n2b-tit2">
					<view class="l-txt1">{{dataObj.postname_keywords}}</view>
				</view>
				<view style="margin-top: 44rpx;" class="n2b-tit1">岗位职级</view>
				<view class="n2b-tit2">
					<view class="l-txt1">{{dataObj.jobtitle_keywords}}</view>
				</view>
				<view style="margin-top: 44rpx;" class="n2b-tit1">职责范围关键词</view>
				<view class="n2b-tit2">
					<view class="l-txt1">{{dataObj.scope1_keywords}}</view>
				</view>
				<view style="margin-top: 44rpx;" class="n2b-tit1">职责范围关键词</view>
				<view class="n2b-tit2">
					<view class="l-txt1">{{dataObj.scope2_keywords}}</view>
				</view>
				<view style="margin-top: 44rpx;" class="n2b-tit1">职责范围关键词</view>
				<view class="n2b-tit2">
					<view class="l-txt1">{{dataObj.scope3_keywords}}</view>
				</view>
				<view style="margin-top: 44rpx;" class="n2b-tit1">岗位分类</view>
				<view class="n2b-tit2">
					<view class="l-txt1">{{dataObj.position_classification}}</view>
				</view>
			</view>
		</view>


		<view style="padding-bottom: 40rpx;" class="nav2 nav3 nav4">
			<view class="n2-tit1">基本条件</view>
			<view class="n2-box">
				<view class="n2b-tit1">第一学历</view>
				<view class="n2b-tit2">
					<view class="l-txt1">{{dataObj.first_degree}}</view>
				</view>
				<view style="margin-top: 44rpx;" class="n2b-tit1">硕博要求</view>
				<view class="n2b-tit2">
					<view class="l-txt1">{{dataObj.shuobo_requirements}}</view>
				</view>
				<view style="margin-top: 44rpx;" class="n2b-tit1">学科专业</view>
				<view class="n2b-tit2">
					<view class="l-txt1">{{dataObj.discipline}}</view>
				</view>
				<view style="margin-top: 44rpx;" class="n2b-tit1">外语</view>
				<view class="n2b-tit2">
					<view class="l-txt1">{{dataObj.foreignlanguage_name}}</view>
				</view>
				<view style="margin-top: 44rpx;" class="n2b-tit1">熟练程度</view>
				<view class="n2b-tit2">
					<view class="l-txt1">{{dataObj.proficiency}}</view>
				</view>
				<view style="margin-top: 44rpx;" class="n2b-tit1">必备技能</view>
				<view class="n2b-tit2">
					<view class="l-txt1">{{dataObj.essentialskills_keywords}}</view>
				</view>
				<view style="margin-top: 44rpx;" class="n2b-tit1">年龄</view>
				<view class="n2b-tit2">
					<view class="l-txt1">{{dataObj.min_age}}-{{dataObj.max_age}}岁</view>
				</view>
				<view style="margin-top: 44rpx;" class="n2b-tit1">薪酬</view>
				<view class="n2b-tit2">
					<view style="width: 350rpx;" class="l-txt1">{{dataObj.salary_range}}</view>
					<view class="l-txt2">*年薪：{{dataObj.years_salaries}}万</view>
				</view>
			</view>
		</view>
		<!-- <view class="footer">
			<view class="btn">完成</view>
		</view> -->
		<u-popup mode='bottom' closeable border-radius='32' height='552' v-model="pop1Show">
			<view class="pop1">
				<view class="txx">
					接待客户，打印文件，整理会议资，接待客户，打印文件，整理会议资，接待客户，打印文件，整理会议资，接待客户，打印文件，整理会议资，接待客户，打印文件，整理会议资，接待客户，打印文件，整理会议资，接待客户，打印文件，整理会议资，接待客户，打印文件，整理会议资，接待客户，打印文件，整理会议资，接待客户，打印文件，整理会议资，接待客户，打印文件，整理会议资，接待客户，打印文件，整理会议资，
				</view>
			</view>
		</u-popup>
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
				pop1Show:false,
				gangweiValue: '',
				gangweiList: [],
				popoverList1: ['任意', '全部'],
				isYes: true,
				value: '',
				popover1: false,
				pop1_title: '任意',
				popover2: false,
				pop2_title: '任意',
				popover3: false,
				pop3_title: '任意',
				popover4: false,
				pop4_title: '任意',
				seleShow4_1: false,
				sele4_1: [{
						value: '1',
						label: '大专'
					},
					{
						value: '2',
						label: '本科'
					}
				],
				sele4_1_val: '',
				seleShow4_2: false,
				sele4_2: [{
						value: '1',
						label: '硕士'
					},
					{
						value: '2',
						label: '博士'
					},
					{
						value: '3',
						label: '—'
					}
				],
				sele4_2_val: '',
				seleShow4_3: false,
				sele4_3: [{
						value: '1',
						label: '读写精通'
					},
					{
						value: '2',
						label: '听说读写精通'
					}
				],
				sele4_3_val: '',
				seleShow5_1: false,
				sele5_1: [],
				sele5_1_val: '',
				seleShow5_2: false,
				sele5_2: [],
				sele5_2_val: '',
				seleShow2_1: false,
				sele2_1: [{
						value: '1',
						label: '1000人以上'
					},
					{
						value: '2',
						label: '2000人以上'
					},
					{
						value: '3',
						label: '5000人以上'
					},
					{
						value: '4',
						label: '10000人以上'
					},
					{
						value: '5',
						label: '不限'
					}
				],
				sele2_1_val: '',
				hangyeValue:"",
				hangyeList:[],
				dataObj:{},
				post_id:"",
			}
		},
		onShow() {
			this.sele5_1 = []
			this.sele5_2 = []
			for (let i = 16; i < 60; i++) {
				this.sele5_1.push({
					value: i,
					label: i
				})
				this.sele5_2.push({
					value: i,
					label: i
				})
			}
		},
		onLoad(option) {
			this.post_id = option.post_id;
			this.getData()
		},
		methods: {
			async getData(){
				const res = await this.$api.postnavigation_view({
					post_id:this.post_id
				})
				this.dataObj = res.postnavigation
			},
			clickZk(i) {
				this.pop1Show = true;
			},
			getHangyeData(e) {
				console.log(e)
				var arr = []
				this.hangyeList = e;
				this.hangyeList.forEach(ele => {
					arr.push(ele.name)
				})
				this.hangyeValue = arr.toString()
			},
			getGangweiData(e) {
				console.log(e)
				var arr = []
				this.gangweiList = e;
				this.gangweiList.forEach(ele => {
					arr.push(ele.name)
				})
				this.gangweiValue = arr.toString()
			},
			toBack() {
				uni.navigateBack({
					delta: 1
				})
				// uni.switchTab({
				// 	url:'/pages/tabBar/daohang'
				// })
			},
			toHangye() {
				uni.navigateTo({
					url: '/pages/index/xuanzefenlei'
				})
			},
			toGangwei() {
				uni.navigateTo({
					url: '/pages/index/xuanzegangwei'
				})
			},
			toWaiyu() {
				uni.navigateTo({
					url: '/pages/index/waiyu'
				})
			},
			changePop1(e) {
				console.log(e)
				this.pop1_title = e
				this.popover1 = false
			},
			changePop2(e) {
				console.log(e)
				this.pop2_title = e
				this.popover2 = false
			},
			changePop3(e) {
				console.log(e)
				this.pop3_title = e
				this.popover3 = false
			},
			changePop4(e) {
				console.log(e)
				this.pop4_title = e
				this.popover4 = false
			},
			confirm4_1(e) {
				console.log(e[0])
				this.sele4_1_val = e[0].label
			},
			confirm4_2(e) {
				console.log(e[0])
				this.sele4_2_val = e[0].label
			},
			confirm4_3(e) {
				console.log(e[0])
				this.sele4_3_val = e[0].label
			},
			confirm5_1(e) {
				console.log(e[0])
				this.sele5_1_val = e[0].label
			},
			confirm5_2(e) {
				console.log(e[0])
				this.sele5_2_val = e[0].label
			},
			confirm2_1(e) {
				console.log(e[0])
				this.sele2_1_val = e[0].label
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
		margin-top: 32rpx;

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
				color: #6C6C6C;
				margin-bottom: 20rpx;

				.red {
					font-size: 20rpx;
					font-family: PingFangSC, PingFangSC-Regular;
					font-weight: 400;
					color: #ff5c50;
					margin-left: 16rpx;
				}
			}

			.n2b-tit2 {
				display: flex;
				align-items: center;
				justify-content: space-between;

				.l-txt1 {
					width: 640rpx;
					font-size: 32rpx;
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
				.l-txt2{
					font-size: 28rpx;
					font-family: PingFangSC, PingFangSC-Regular;
					font-weight: 400;
					color: #ff5c50;
				}
			}

			.heng {
				margin-top: 8rpx;
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
				// width: 478rpx;
				font-size: 24rpx;
			}

			.zk {
				font-size: 24rpx;
				font-family: PingFangSC, PingFangSC-Regular;
				color: #1362fd;
				margin-left: 12rpx;
			}
		}
	}

	.nav2.nav3.nav4 {
		/deep/ .u-input__input {
			width: 466rpx;
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
		width: 100%;
		position: fixed;
		bottom: 0;
		height: 200rpx;
		z-index: 99;
		background: #ffffff;
		box-shadow: 0rpx -4rpx 8rpx 0rpx rgba(0, 0, 0, 0.03);

		.btn {
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

	/deep/ .u-select__header__title {
		font-size: 32rpx;
	}

	/deep/ .u-select__body__picker-view__item {
		.u-line-1 {
			font-size: 36rpx;
		}
	}
	.pop1{
		.txx{
			transform: translateY(110rpx);
			margin: 0 auto 0 auto;
			width: 632rpx;
			font-size: 28rpx;
			font-family: PingFangSC, PingFangSC-Regular;
			font-weight: 400;
			color: #121212;
			line-height: 40rpx;
		}
	}
</style>
