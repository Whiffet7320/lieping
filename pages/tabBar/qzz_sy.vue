<template>
	<view class="index">
		<u-toast ref="uToast" />
		<u-mask :show="maskshow" @click="closeMask"></u-mask>
		<popover ref='pop' v-if="popover" class="popov" @select='changePop' :btnList='popoverList'
			:modalLeftPos='"-20rpx"' :modalTopPos='"-10rpx"' :modalOpacity='"1"' :active="popover"></popover>
		<view class="top"></view>
		<view class="nav1">
			<view class="n1-txt">猎头导航</view>
		</view>
		<view style="margin-top: calc(172rpx);" class="nav2">
			<view class="n2-tit1">
				<view class="nav1-1">
					<u-icon name="search" color="#BCBCBC" size="28"></u-icon>
					<u-input @confirm='search' v-model="keyword" type="text" placeholder='请输入岗位名称关键词' />
					<u-button @click='search' style='margin-left: 12rpx;' size="mini" type="primary">搜索</u-button>
				</view>
				<image @click="clickPop" class="n2t1-img" src="/static/newImage/qzz/bianzu5.png" mode=""></image>
				<view class="n2t1-txt">{{pop_title}}</view>
			</view>
		</view>
		<view class="nav3">
			<image class="n3-img" :src="gglist[0].pic" mode=""></image>
			<view class="n3-txt1 rtx"></view>
			<view class="n3-txt2 rtx"></view>
			<view class="n3-txt3 rtx"></view>
			<!-- <view class="n3-txt1 rtx">名企招聘算法模型测匹配度</view>
			<view class="n3-txt2 rtx">提高应聘成功率</view>
			<view class="n3-txt3 rtx">指引职业发展方向</view> -->
		</view>
		<view class="nav4">
			<template v-if="list.length !=0">
				<view class="item" @click="toXiangqin(item)" v-for="item in list" :key='item.post_id'>
					<view class="i-tit1">
						<view class="txx1">{{item.jobs}}</view>
						<view class="txx2">{{item.salary_range}}</view>
					</view>
					<view class="i-tit2">
						<view class="txx1">{{item.com_name}}</view>
						<view class="txx1">{{item.work_place}}</view>
					</view>
				</view>
			</template>
			<view v-else class="noData">
				<image class="n-img" src="/static/newImage/tabBar/ziyuan1.png" mode=""></image>
			</view>
		</view>
		<u-loadmore  @touchmove="closeMask" @touchstart="closeMask" :class="{'myloadmore':true}"
			:status="status" :icon-type="iconType" :load-text="loadText" />
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
				isGLY: false,
				keyword: '',
				popoverList: ['求职者', '猎头'],
				popover: false,
				pop_title: '求职者',
				maskshow: false,
				list: [],
				dingdanPage: 0,
				gglist: [],
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
			this.getUserInfo()
			this.getGG()
			this.list = []
			this.dingdanPage = 1
			this.getData()
		},
		onLoad() {

		},
		onReachBottom() {
			this.dingdanPage++
			this.getData()
		},
		methods: {
			async getGG() {
				const res = await this.$api.swiper_list({
					category: 2
				})
				this.gglist = res.list
			},
			async getUserInfo() {
				const res = await this.$api.user_info()
				this.userObj = res
				if (res.usercategory == 1) {
					uni.switchTab({
						url: '/pages/tabBar/index'
					})
				}
				if (res.result == 1) {
					uni.setStorageSync('userObj', this.userObj);
				}
				if (this.userObj.joincompany.com_ismanage == 1) {
					this.isGLY = true
				} else {
					this.isGLY = false
				}
			},
			search() {
				this.list = []
				this.dingdanPage = 1
				this.getData()
			},
			async getData() {
				this.status = 'loading';
				const res = await this.$api.jobpost_list({
					page: this.dingdanPage,
					pagesize: 20,
					keyword: this.keyword
				})
				if (res.list.length < 20) {
					this.status = 'nomore'
				} else {
					this.status = 'loadmore';
				}
				this.list = this.list.concat(res.list)
			},
			closeMask() {
				this.maskshow = false;
				this.$refs.pop ? this.$refs.pop.closeBtn(this.pop_title, '') : '';
			},
			toXiangqin(item) {
				uni.navigateTo({
					url: `/pages/qzz/zhiweixiangqin?post_id=${item.post_id}`
				})
			},
			clickPop() {
				this.maskshow = true;
				this.popover = true
			},
			async changePop(e) {
				this.popover = false
				this.maskshow = false
				if (e.val == '猎头') {
					const res = await this.$api.user_upinfo({
						category: 1
					})
					this.$refs.uToast.show({
						title: res.msg,
						duration:700,
						callback: () => {
							if (res.result == 1) {
								uni.switchTab({
									url: '/pages/tabBar/index'
								})
							}
						}
					})

				}
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

	.noData {
		display: flex;
		flex-direction: column;
		margin-top: 300rpx;
		align-items: center;
		justify-content: center;

		.n-img {
			width: 190rpx;
			height: 150rpx;
		}
	}

	/deep/ .u-mask {
		background-color: rgba(0, 0, 0, 0) !important;
	}

	.popov {
		/deep/ .compos {
			position: fixed !important;
			z-index: 99999 !important;
		}
	}

	/deep/ .compos {
		position: fixed !important;
		top: 280rpx;
		right: 20rpx;
		width: 200rpx;
		z-index: 99;

		.modal-item {
			padding: 18rpx 50rpx !important;
		}
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
		padding: 32rpx 0;
		position: fixed;
		top: 0;
		z-index: 9999;
		background: #f8faff;

		.n2-tit1 {
			display: flex;
			align-items: center;
			padding: 0 20rpx;

			.nav1-1 {
				background: #ffffff !important;
				display: flex;
				align-items: center;
				border-radius: 30rpx;
				padding: 0 32rpx !important;
			}

			/deep/ .u-input {
				background: #ffffff !important;
				border-radius: 30rpx;
				width: 320rpx;
				margin-left: 20rpx;
				// padding: 0 30rpx !important;
			}

			.n2t1-img {
				width: 64rpx;
				margin: 0 8rpx 0 24rpx;
				height: 64rpx;
			}

			.n2t1-txt {
				font-size: 26rpx;
				font-family: PingFangSC, PingFangSC-Regular;
				font-weight: 400;
				color: #1362fd;
			}
		}

	}

	.nav3 {
		margin-top: 306rpx;
		padding: 0 32rpx;
		position: fixed;
		top: 0;
		// margin-top: 32rpx;
		width: 708rpx;
		height: 292rpx;

		.n3-img {
			position: absolute;
			left: 22rpx;
			top: -4rpx;
			width: 708rpx;
			height: 292rpx;
		}

		.rtx {
			position: absolute;
			font-size: 28rpx;
			font-family: PingFangSC, PingFangSC-Regular;
			font-weight: 400;
			color: #ffffff;
		}

		.n3-txt1 {
			top: 78rpx;
			right: 20rpx;
		}

		.n3-txt2 {
			top: 126rpx;
			right: 20rpx;
		}

		.n3-txt3 {
			top: 174rpx;
			right: 20rpx;
		}
	}

	.nav4 {
		padding: 598rpx 20rpx 40rpx 20rpx;

		.item {
			margin-top: 32rpx;
			padding: 36rpx 32rpx;
			background: #ffffff;

			.i-tit1 {
				display: flex;
				align-items: center;
				justify-content: space-between;

				.txx1 {
					font-size: 30rpx;
					font-family: PingFangSC, PingFangSC-Semibold;
					font-weight: 600;
					color: #000000;
					width: 420rpx;
					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 2;
				}

				.txx2 {
					font-size: 28rpx;
					font-family: PingFangSC, PingFangSC-Semibold;
					font-weight: 600;
					color: #4281f8;
				}
			}

			.i-tit2 {
				margin-top: 32rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;

				.txx1 {
					font-size: 26rpx;
					font-family: PingFangSC, PingFangSC-Regular;
					font-weight: 400;
					color: #333333;
					line-height: 36rpx;
				}
			}
		}
	}
</style>
