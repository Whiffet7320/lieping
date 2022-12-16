<template>
	<view class="index">
		<!-- <view class="top"></view>
		<view class="nav1">
			<u-icon @click='toBack' style='margin-right: 12rpx;' name="arrow-left" color="#000000" size="36"></u-icon>
			<view @click='toBack' class="n1-txt">应聘</view>
		</view> -->
		<u-navbar back-text="应聘" back-icon-size='36'></u-navbar>
		<view style="margin-top: calc(20rpx);margin-bottom: 70rpx;" class="nav2">
			<template v-if="list.length != 0">
				<view class="item" @click="toXiangqin(item)" v-for="item in list" :key='item.id'>
					<view v-if="item.is_read == 0" class="float">最新</view>
					<view v-else class="float2">已阅</view>
					<view class="i-tit1">
						<view class="i1-txt1">{{item.realname.slice(0,-2)}}{{item.is_sex == 2 ? '女士':'先生'}}</view>
						<view class="i1-txt2">{{item.mobile}}</view>
					</view>
					<view class="i-tit2">
						<view class="left">
							<view class="i2-txt1">匹配结果：</view>
							<view class="i2-txt2">
								{{item.match_status == 0 ? '不建议应聘' :item.match_status == 1 ? '可以应聘' : item.match_status == 2 ? '有要求' : "待定" }}
							</view>
						</view>
						<view v-if="item.share_realname != ''" class="right">转发者：{{item.share_realname}}</view>
					</view>
				</view>
			</template>

			<view v-else class="noData">
				<image class="n-img" src="/static/newImage/tabBar/ziyuan1.png" mode=""></image>
				<u-loadmore @touchmove="closeMask" @touchstart="closeMask" :class="{'myloadmore':true}" :status="status"
					:icon-type="iconType" :load-text="loadText" />
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id: "",
				post_id:"",
				dingdanPage: 1,
				list: [],
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
			if (this.id != '') {
				this.getData()
			}
		},
		onReachBottom() {
			if (this.id != '') {
				this.dingdanPage++
				this.getData()
			}
		},
		onLoad(option) {
			this.id = option.post_id;
			console.log(this.id)
		},
		methods: {
			async getData() {
				this.status = 'loading';
				const res = await this.$api.compost_candidate({
					post_id: this.id,
					page: this.dingdanPage,
					pagesize: 30,
				})
				if (res.list.length < 30) {
					this.status = 'nomore'
				} else {
					this.status = 'loadmore';
				}
				this.list = this.list.concat(res.list)
			},
			toXiangqin(item) {
				uni.navigateTo({
					url: `/pages/index/yinpinXiangqin?id=${item.id}&post_id=${this.id}`
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
	.index {
		position: relative;
	}

	.noData {
		display: flex;
		flex-direction: column;
		margin-top: 400rpx;
		align-items: center;
		justify-content: center;

		.n-img {
			width: 190rpx;
			height: 150rpx;
		}
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
		padding: 0 20rpx;

		.item {
			width: 710rpx;
			height: 192rpx;
			background: #ffffff;
			border-radius: 20rpx;
			padding: 32rpx 32rpx 40rpx 32rpx;
			position: relative;
			margin-bottom: 24rpx;

			.float {
				position: absolute;
				right: 0;
				top: 0;
				width: 212rpx;
				height: 48rpx;
				background: #095bfe;
				border-radius: 0rpx 20rpx 0rpx 20rpx;
				font-size: 28rpx;
				font-family: PingFangSC, PingFangSC-Regular;
				font-weight: 400;
				text-align: center;
				color: #ffffff;
				line-height: 48rpx;
			}

			.float2 {
				position: absolute;
				right: 0;
				top: 0;
				width: 212rpx;
				height: 48rpx;
				background: #ececec;
				border-radius: 0rpx 20rpx 0rpx 20rpx;
				font-size: 28rpx;
				font-family: PingFangSC, PingFangSC-Regular;
				font-weight: 400;
				text-align: center;
				color: #b4b4b4;
				line-height: 48rpx;
			}

			.i-tit1 {
				display: flex;
				align-items: center;

				.i1-txt1 {
					font-size: 32rpx;
					font-family: PingFangSC, PingFangSC-Semibold;
					font-weight: 600;
					color: #000000;
				}

				.i1-txt2 {
					margin-left: 22rpx;
					font-size: 26rpx;
					font-family: PingFangSC, PingFangSC-Regular;
					font-weight: 400;
					color: #333333;
				}
			}

			.i-tit2 {
				margin-top: 36rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;

				.left {
					display: flex;
					align-items: center;

					.i2-txt1 {
						font-size: 28rpx;
						font-family: PingFangSC, PingFangSC-Regular;
						font-weight: 400;
						color: #000000;
					}

					.i2-txt2 {
						font-size: 28rpx;
						font-family: PingFangSC, PingFangSC-Regular;
						font-weight: 400;
						color: #095BFE;
					}
				}

				.right {
					font-size: 28rpx;
					font-family: PingFangSC, PingFangSC-Regular;
					font-weight: 400;
					color: #000000;
				}
			}
		}
	}
</style>
