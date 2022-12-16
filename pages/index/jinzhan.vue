<template>
	<view class="index">
		<!-- <view class="top"></view>
		<view class="nav1">
			<u-icon @click='toBack' style='margin-right: 12rpx;' name="arrow-left" color="#000000" size="36"></u-icon>
			<view @click='toBack' class="n1-txt">进展</view>
		</view> -->
		<u-navbar @touchmove="closeMask" @touchstart="closeMask" back-text="进展" back-icon-size='36'></u-navbar>
		<view @click="popover = true;nowIndex=1" class="float-img2">
			<view class="fi2-txt">{{pop_title}}</view>
			<u-icon style='transform: rotate(90deg);' name="play-right-fill" color="#fffbfb" size="14"></u-icon>
		</view>
		<popover v-if="nowIndex != -1" ref='pop' class="popov" @select='changePop' :btnList='popoverList' :modalLeftPos='"-20rpx"' :modalTopPos='"-10rpx"'
			:modalOpacity='"1"' :active="popover"></popover>
		<view @touchmove="closeMask" @touchstart="closeMask" style="margin-top: calc(32rpx);" class="nav2">
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
					<view class="x1">{{item.realname}}</view>
					<view class="x2">
						<view :style="{borderTop:i == 0?'0':''}" class="x2-1">{{item.chattable_num}}</view>
						<view :style="{borderTop:i == 0?'0':''}" class="x2-2">{{item.pending_num}}</view>
					</view>
					<view class="x3">{{item.share_num}}</view>
				</view>
			</view>
		</view>
		<!-- <u-loadmore @touchmove="closeMask" @touchstart="closeMask" :class="{'myloadmore':true}" :status="status"
			:icon-type="iconType" :load-text="loadText" /> -->
	</view>
</template>

<script>
	import popover from '../../components/dean-popover/dean-popover2.vue'
	export default {
		components: {
			popover
		},
		data() {
			return {
				list:[],
				popoverList:['昨天','今天','本周','上周','累计'],
				popover:false,
				pop_title:'昨天',
				maskshow:false,
				post_id:"",
				dingdanPage:0,
				begin_day:"",
				end_day:"",
				nowIndex:-1,
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
			this.end_day = new Date(new Date().setDate(new Date().getDate() - 1)).format('yyyy-MM-dd');
			this.getData()
		},
		onReachBottom() {
			this.dingdanPage++
			this.getData()
		},
		onLoad(option) {
			this.post_id = option.post_id;
		},
		methods: {
			async getData(){
				this.status = 'loading';
				const res = await this.$api.compost_progresslist({
					post_id:this.post_id,
					page: this.dingdanPage,
					pagesize: 30,
					begin_day:this.begin_day,
					end_day:this.end_day,
				})
				if (res.list.length < 30) {
					this.status = 'nomore'
				} else {
					this.status = 'loadmore';
				}
				this.list = this.list.concat(res.list)
			},
			changePop(e) {
				console.log(e.isclose)
				if(e.isclose){
					this.nowIndex = -1
					this.popover = false
					this.isShowPop = false
					return
				}
				this.pop_title = e.val
				if (e.val == '今天') {
					this.timeRadio = 2
				}else if (e.val == '本周') {
					this.timeRadio = 3
				}else if (e.val == '上周') {
					this.timeRadio = 4
				}else if (e.val == '累计') {
					this.timeRadio = 1
				}else if (e.val == '昨天') {
					this.timeRadio = 5
				}
				this.changeTimeRadio()
				this.popover = false
				this.isShowPop = false
				this.nowIndex = -1
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
					this.end_day = new Date(new Date().setDate(new Date().getDate() - 1)).format('yyyy-MM-dd');
				}
				this.list = []
				this.dingdanPage = 1
				this.getData()
			},
			toBack() {
				uni.navigateBack({
					delta: 1
				})
			},
			closeMask() {
				this.maskshow = false;
				console.log(this.$refs.pop,this.$refs.pop1,this.$refs.pop2)
				this.$refs.pop ? this.$refs.pop.closeBtn(this.pop_title,'') : '';
				// this.$refs.pop2 ? this.$refs.pop2.closeBtn('',this.pop_title2) : '';
				// this.$refs.pop3 ? this.$refs.pop3.closeBtn(this.pop_title,this.pop_title2) : '';
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
					width: 34%;
					text-align: center;
					line-height: 120rpx;
					color: #fff;
					border-left: 2rpx solid #88abfc;
				}
			}

			.n2t-n2 {
				&:nth-last-child(1){
					.x2-1{
						border-bottom: 0rpx !important;
					}
					.x2-2{
						border-bottom: 0rpx !important;
					}
				}
				display: flex;
				// height: 70rpx;
				min-height: 70rpx;
				color: #121212;
				border-bottom: 2rpx solid #1362fd;
				.x1 {
					width: 33%;
					display: flex;
					align-items: center;
					justify-content: center;
					// line-height: 70rpx;
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
						height: 100%;
						width: 50%;
						display: flex;
						align-items: center;
						justify-content: center;
						text-align: center;
						// line-height: 70rpx;
						border-right: 2rpx solid #1362fd;
						border-left: 2rpx solid #1362fd;
						border-bottom: 2rpx solid #1362fd;
						border-top: 2rpx solid #1362fd;
						font-size: 26rpx;
						background: #8bb0fb;
					}
					.x2-2{
						height: 100%;
						width: 50%;
						display: flex;
						align-items: center;
						justify-content: center;
						text-align: center;
						// line-height: 70rpx;
						border-right: 2rpx solid #1362fd;
						font-size: 26rpx;
						border-bottom: 2rpx solid #1362fd;
						border-top: 2rpx solid #1362fd;
						background: #e7efff;
					}
				}
				.x3 {
					width: 33%;
					// line-height: 70rpx;
					text-align: center;
					display: flex;
					align-items: center;
					justify-content: center;
					font-size: 26rpx;
					font-family: PingFangSC, PingFangSC-Regular;
					font-weight: 400;
					color: #121212;
				}
			}
		}
	}


</style>
