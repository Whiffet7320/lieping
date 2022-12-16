<template>
	<view class="index">
		<u-toast ref="uToast" />
		<!-- <u-mask :show="maskshow" @click="closeMask" @touchmove="closeMask" @touchstart="closeMask"></u-mask> -->
		<!-- <view class="top"></view>
		<view class="nav1">
			<u-icon @click='toBack' style='margin-right: 12rpx;' name="arrow-left" color="#000000" size="36"></u-icon>
			<view @click='toBack' class="n1-txt">统计</view>
		</view> -->
		<u-navbar @touchmove="closeMask" @touchstart="closeMask" back-text="统计" back-icon-size='36'></u-navbar>
		<view @click="clickPop" class="float-img2">
			<view class="fi2-txt">{{pop_title}}</view>
			<u-icon style='transform: rotate(90deg);' name="play-right-fill" color="#fffbfb" size="14"></u-icon>
			<popover ref='pop' v-if="isShowPop" class="popov1" @select='changePop' :btnList='popoverList'
				:modalLeftPos='"-20rpx"' :modalTopPos='"42rpx"' :modalOpacity='"1"' :active="popover"></popover>
		</view>
		<!-- 		<popover ref='pop' v-if="isShowPop" class="popov1" @select='changePop' :btnList='popoverList' :modalLeftPos='"-20rpx"'
			:modalTopPos='"672rpx"' :modalOpacity='"1"' :active="popover"></popover> -->
		<view @click="clickPop2" class="float-img3">
			<view class="fi2-txt">{{pop_title2}}</view>
			<u-icon style='transform: rotate(90deg);' name="play-right-fill" color="#fffbfb" size="14"></u-icon>
			<popover ref='pop2' v-if="isShowPop2" class="popov1" @select='changePop2' :btnList='popoverList2'
				:modalLeftPos='"-20rpx"' :modalTopPos='"42rpx"' :modalOpacity='"1"' :active="popover2"></popover>
		</view>
		<!-- <popover ref='pop2' v-if="isShowPop2" class="popov1" @select='changePop2' :btnList='popoverList2' :modalLeftPos='"-20rpx"'
			:modalTopPos='"774rpx"' :modalOpacity='"1"' :active="popover2"></popover> -->
		<!-- 	<popover v-if="isShowPop" class="popov1" @select='changePop' :btnList='popoverList' :modalLeftPos='"-20rpx"'
			:modalTopPos='"888rpx"' :modalOpacity='"1"' :active="popover"></popover>
		<popover v-if="isShowPop2" class="popov1" @select='changePop2' :btnList='popoverList2' :modalLeftPos='"-20rpx"'
			:modalTopPos='"756rpx"' :modalOpacity='"1"' :active="popover2"></popover> -->
		<view @touchmove="closeMask" @touchstart="closeMask" style="margin-top: calc(32rpx);" class="nav2">
			<view class="table">
				<view class="n2t-n1">
					<view class="left1">岗位</view>
					<view class="left2">投入人数</view>
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
					<view :style="{width:pop_title2 == '在招'?'90rpx':'180rpx'}" class="right1">应聘</view>
					<view v-if="pop_title2 == '在招'" class="right2">状态</view>
				</view>
				<view class="n2t-n2" :style="{borderBottom:item.id == list[list.length-1].id?'0':''}"
					v-for="(item,i) in list" :key='item.id'>
					<view class="x1">{{item.jobs}}</view>
					<view class="x11">{{item.job_num}}</view>
					<view class="x2">
						<view :style="{borderTop:i == 0?'0':''}" class="x2-1">{{item.chattable_num}}</view>
						<view :style="{borderTop:i == 0?'0':''}" class="x2-2">{{item.pending_num}}</view>
					</view>
					<view
						:style="{width:pop_title2 == '在招'?'90rpx':'182rpx',borderRight:pop_title2 == '在招'?'2rpx solid #1362fd':'0rpx'}"
						class="x3">{{item.candidate_num}}</view>
					<view v-if="pop_title2 == '在招'" class="x33" @click="clickJJ(i,item)">
						<view
							:class="{'tttx':true,'red':item.jobs_status == 2,'blue':item.jobs_status == 1,'yellow':item.jobs_status == 0}">
							{{item.job_tt}}
						</view>
						<!-- 管理员 -->
						<u-icon v-if='isGLY' style='transform: rotate(90deg);' name="play-right-fill"
							:color="item.jobs_status == 2?'#FF5C50':item.jobs_status == 1?'#1362FD':'#E59604'"
							size="16"></u-icon>
						<popover33 ref='pop3' v-if="nowIndex == i" class="popov" @select='changePop1'
							:btnList='popoverList1' :modalTopPos='"32rpx"' :modalOpacity='"1"' :active="popover1">
						</popover33>
					</view>

				</view>
			</view>
		</view>
		<!-- <u-loadmore @touchmove="closeMask" @touchstart="closeMask" :class="{'myloadmore':true}" :status="status"
			:icon-type="iconType" :load-text="loadText" /> -->
	</view>
</template>

<script>
	import popover from '../../components/dean-popover/dean-popover2.vue'
	import popover33 from '../../components/dean-popover/dean-popover33.vue'
	export default {
		components: {
			popover,
			popover33
		},
		data() {
			return {
				jjIndex: '1',
				isGLY: true,
				isShowPop: false,
				isShowPop2: false,
				nowIndex: -1,
				list: [],
				popoverList: ['昨天', '今天', '本周', '上周', '累计'],
				popoverList1: ['紧急', '正常', '一般'],
				popoverList2: ['在招', '下架'],
				popover: false,
				popover1: false,
				popover2: false,
				pop_title: '昨天',
				pop_title2: '在招',
				maskshow: false,
				begin_day: "",
				end_day: "",
				dingdanPage: 0,
				timeRadio: '',
				is_status: "1",
				item: {},
				// 加载
				status: 'loadmore',
				iconType: 'flower',
				loadText: {
					loadmore: '上拉加载更多',
					loading: '正在加载...',
					nomore: '没有更多了'
				},
			}
		},
		onShow() {
			this.list = []
			this.dingdanPage = 1
			var day = new Date();
			this.begin_day = new Date(new Date().setDate(new Date().getDate() - 1)).format('yyyy-MM-dd');
			this.end_day = new Date(new Date().setDate(new Date().getDate() - 1)).format('yyyy-MM-dd')
			this.getData()
		},
		onLoad() {
			var obj = uni.getStorageSync('userObj')
			console.log(obj)
			if (obj.joincompany.com_ismanage == 1) {
				this.isGLY = true
			} else {
				this.isGLY = false
			}
		},
		onReachBottom() {
			this.dingdanPage++
			this.getData()
		},
		methods: {
			async getData() {
				this.status = 'loading';
				const res = await this.$api.positionstatistics_list({
					page: this.dingdanPage,
					pagesize: 30,
					begin_day: this.begin_day,
					end_day: this.end_day,
					is_status: this.is_status,
				})
				if (res.list.length < 30) {
					this.status = 'nomore'
				} else {
					this.status = 'loadmore';
				}
				res.list.forEach(ele => {
					ele.job_tt = ele.jobs_status == 0 ? '一般' : ele.jobs_status == 1 ? '正常' : '紧急'
				})
				this.list = this.list.concat(res.list)
			},
			changeTimeRadio() {
				var day = new Date();
				var weekday = new Date().getDay() || 7;
				if (this.timeRadio == 1) {
					this.begin_day = ''
					this.end_day = ''
				} else if (this.timeRadio == 2) {
					this.begin_day = day.format('yyyy-MM-dd')
					this.end_day = day.format('yyyy-MM-dd')
				} else if (this.timeRadio == 3) {
					this.begin_day = new Date(new Date().setDate(new Date().getDate() - weekday + 1)).format('yyyy-MM-dd');
					this.end_day = new Date(new Date().setDate(new Date().getDate() - weekday + 7)).format('yyyy-MM-dd')
				} else if (this.timeRadio == 4) {
					this.begin_day = new Date(new Date().setDate(new Date().getDate() - weekday - 6)).format('yyyy-MM-dd');
					this.end_day = new Date(new Date().setDate(new Date().getDate() - weekday)).format('yyyy-MM-dd')
				} else if (this.timeRadio == 5) {
					this.begin_day = new Date(new Date().setDate(new Date().getDate() - 1)).format('yyyy-MM-dd');
					this.end_day = new Date(new Date().setDate(new Date().getDate() - 1)).format('yyyy-MM-dd')
				}
				this.list = []
				this.dingdanPage = 1
				this.getData()
			},
			clickPop() {
				if (this.popover) {
					this.maskshow = false;
					this.isShowPop = false
					this.popover = false
				} else {
					this.maskshow = true;
					this.isShowPop = true
					this.popover = true
				}

			},
			clickPop2() {
				if (this.popover2) {
					this.maskshow = false;
					this.isShowPop2 = false
					this.popover2 = false
				} else {
					this.maskshow = true;
					this.isShowPop2 = true
					this.popover2 = true
				}
			},
			clickJJ(i, item) {
				if (this.isGLY) {
					if (this.popover1) {
						this.nowIndex = -1;
						this.item = item
						this.popover1 = false
					} else {
						this.nowIndex = i;
						this.item = item
						this.popover1 = true
					}

				}
			},
			closeMask() {
				this.maskshow = false;
				console.log(this.$refs.pop, this.$refs.pop1, this.$refs.pop2)
				this.$refs.pop ? this.$refs.pop.closeBtn(this.pop_title, '') : '';
				this.$refs.pop2 ? this.$refs.pop2.closeBtn('', this.pop_title2) : '';
				// this.$refs.pop3 ? this.$refs.pop3.closeBtn(this.pop_title,this.pop_title2) : '';
			},
			async changePop1(e) {
				console.log(e)
				this.$set(this.list[this.nowIndex], 'job_tt', e.val)
				var job_status = ''
				if (e.val == '紧急') {
					this.$set(this.list[this.nowIndex], 'jobs_status', 2)
					job_status = 2
				} else if (e.val == '正常') {
					this.$set(this.list[this.nowIndex], 'jobs_status', 1)
					job_status = 1
				} else if (e.val == '一般') {
					this.$set(this.list[this.nowIndex], 'jobs_status', 0)
					job_status = 0
				}
				const res = await this.$api.positionstatistics_statusset({
					post_id: this.item.id,
					job_status,
				})
				this.$refs.uToast.show({
					title: res.msg,
				})
				this.list = []
				this.dingdanPage = 1
				this.getData()
				this.popover1 = false
				this.nowIndex = -1;
			},
			changePop(e) {
				this.pop_title = e.val
				if (e.val == '今天') {
					this.timeRadio = 2
				} else if (e.val == '本周') {
					this.timeRadio = 3
				} else if (e.val == '上周') {
					this.timeRadio = 4
				} else if (e.val == '累计') {
					this.timeRadio = 1
				} else if (e.val == '昨天') {
					this.timeRadio = 5
				}
				this.changeTimeRadio()
				this.popover = false
				this.isShowPop = false
				this.maskshow = false;
			},
			changePop2(e) {
				if (e.val == '在招') {
					this.is_status = 1
				} else {
					this.is_status = 0
				}
				this.list = []
				this.dingdanPage = 1
				this.getData()
				this.maskshow = false;
				this.pop_title2 = e.val
				this.popover2 = false
				this.isShowPop2 = false
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

	/deep/ .u-mask {
		background-color: rgba(0, 0, 0, 0) !important;
	}

	/deep/ .u-navbar {
		.u-icon__icon {
			margin-left: 8rpx;
			font-weight: 600 !important;
			color: #000 !important;
		}

		.u-back-text {
			font-size: 36rpx;
			margin-left: 8rpx;
			font-weight: 600;
			color: #000 !important;
		}
	}

	.top {
		position: fixed;
		top: 0rpx;
		z-index: 1000;
		height: 88rpx;
		width: 100%;
		background: #ffffff;
	}

	.popov1 {
		/deep/ .compos {
			position: fixed !important;
			z-index: 99999 !important;
		}
	}

	/deep/ .compos {
		// position: fixed !important;
		position: absolute !important;
		z-index: 9;
		// bottom: 516rpx;
		right: 20rpx;
		width: 200rpx;

		.modal-item {
			padding: 18rpx 50rpx !important;
		}
	}

	.nav1 {
		z-index: 1000;
		position: fixed;
		top: 188rpx;
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

	.float-img2 {
		position: fixed;
		right: 42rpx;
		bottom: 534rpx;
		width: 88rpx;
		height: 88rpx;
		background: linear-gradient(180deg, #f0e1b9, #f39f47);
		border-radius: 50%;
		box-shadow: 0rpx 8rpx 8rpx 0rpx rgba(241, 203, 105, 0.40);
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 1;

		.fi2-txt {
			font-size: 24rpx;
			font-family: PingFangSC, PingFangSC-Medium;
			font-weight: 500;
			color: #ffffff;
			margin-right: 6rpx;
		}
	}

	.float-img3 {
		position: fixed;
		right: 42rpx;
		bottom: 664rpx;
		width: 88rpx;
		height: 88rpx;
		background: linear-gradient(180deg, #B9D0FF, #1362FD);
		border-radius: 50%;
		box-shadow: 0rpx 8rpx 8rpx 0rpx rgba(25, 102, 253, 0.45);
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 1;

		.fi2-txt {
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
				font-size: 26rpx;

				.left1 {
					width: 227rpx;
					text-align: center;
					line-height: 120rpx;
					color: #fff;
					border-right: 2rpx solid #88abfc;
				}

				.left2 {
					padding: 0 16rpx;
					width: 88rpx;
					display: flex;
					align-items: center;
					justify-content: center;
					text-align: center;
					height: 100%;
					// line-height: 120rpx;
					color: #fff;
					border-right: 2rpx solid #88abfc;
				}

				.center {
					width: 184rpx;
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

				.right1 {
					width: 90rpx;
					text-align: center;
					line-height: 120rpx;
					color: #fff;
					border-left: 2rpx solid #88abfc;
				}

				.right2 {
					width: 90rpx;
					text-align: center;
					line-height: 120rpx;
					color: #fff;
					border-left: 2rpx solid #88abfc;
				}
			}

			.n2t-n2 {
				display: flex;
				// height: 70rpx;
				min-height: 70rpx;
				color: #121212;
				border-bottom: 2rpx solid #1362fd;

				&:nth-last-child(1) {
					.x2-1 {
						border-bottom: 0rpx !important;
					}

					.x2-2 {
						border-bottom: 0rpx !important;
					}
				}

				.x1 {
					width: 225rpx;
					// line-height: 70rpx;
					text-align: center;
					display: flex;
					align-items: center;
					justify-content: center;
					font-size: 26rpx;
					font-family: PingFangSC, PingFangSC-Regular;
					font-weight: 400;
					color: #1362fd;
				}

				.x11 {
					width: 88rpx;
					// line-height: 70rpx;
					text-align: center;
					display: flex;
					align-items: center;
					justify-content: center;
					font-size: 26rpx;
					font-family: PingFangSC, PingFangSC-Regular;
					font-weight: 400;
					color: #121212;
					border-left: 2rpx solid #1362fd;
				}

				.x2 {
					display: flex;
					align-items: center;
					width: 188rpx;

					// height: 100%;
					.x2-1 {
						width: 50%;
						height: 100%;
						text-align: center;
						// line-height: 70rpx;
						display: flex;
						align-items: center;
						justify-content: center;
						border-right: 2rpx solid #1362fd;
						border-left: 2rpx solid #1362fd;
						// border-bottom: 2rpx solid #1362fd;
						// border-top: 2rpx solid #1362fd;
						font-size: 26rpx;
						background: #8bb0fb;
					}

					.x2-2 {
						width: 50%;
						height: 100%;
						text-align: center;
						// line-height: 70rpx;
						display: flex;
						align-items: center;
						justify-content: center;
						border-right: 2rpx solid #1362fd;
						font-size: 26rpx;
						// border-bottom: 2rpx solid #1362fd;
						// border-top: 2rpx solid #1362fd;
						background: #e7efff;
					}
				}

				.x3 {
					width: 90rpx;
					// line-height: 70rpx;
					text-align: center;
					display: flex;
					align-items: center;
					justify-content: center;
					font-size: 26rpx;
					font-family: PingFangSC, PingFangSC-Regular;
					font-weight: 400;
					color: #121212;
					border-right: 2rpx solid #1362fd;
				}

				.x33 {
					width: 90rpx;
					// line-height: 70rpx;
					text-align: center;
					font-size: 26rpx;
					font-family: PingFangSC, PingFangSC-Regular;
					font-weight: 400;
					color: #121212;
					display: flex;
					align-items: center;
					justify-content: center;
					position: relative;

					// z-index: -1;
					.tttx {
						margin-right: 2rpx;
						font-size: 24rpx;
					}

					.tttx.red {
						color: #FF5C50;
					}

					.tttx.blue {
						color: #1362FD;
					}

					.tttx.yellow {
						color: #E59604;
					}
				}
			}
		}
	}
</style>
