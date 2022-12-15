<template>
	<view class="index">
		<u-toast ref="uToast" />
		<u-navbar background='#f8faff' back-text="我的" back-icon-size='36'></u-navbar>
		<view class="flex">
			<view class="nav2">
				<view class="n2-l">
					<image @click="toZiliao" class="n2-l-img" :src="infoObj.userface" mode=""></image>
					<view class="n2-l-r">
						<view @click="login" class="n2-l-r-txt1">{{infoObj.nickname}}</view>
						<view class="n2-l-r-txt2">个人身份：<text @click="toxuanzeshenfen" class="blue">猎头</text>
							<image class="myIcon" @click="toxuanzeshenfen" src="/static/newImage/tabBar/qiehuan.png"
								mode=""></image>
						</view>

					</view>
				</view>
				<view class="n2-r">
					<view @click="torenzheng" :class="{'n2-r-b1':true,'no':infoObj.is_licensestatus == 1}">认证猎企</view>
					<view @click="tojiaru" class="n2-r-b2">加入猎企</view>
				</view>
			</view>
			<view class="nav3">
				<view class="n3-txt1">我的消息</view>
				<scroll-view v-if="list.length != 0" scroll-view scroll-y @scrolltolower="reachBottom" class="items">
					<view class="item" v-for="item in list" :key='item.id'>
						<view class="i-l">
							<view class="i-l-tit1">
								<view class="tit11">{{item.title}}<text v-if="item.is_read == 0" class="dian"></text>
								</view>

							</view>
							<view class="i-l-tit2">受理时间<text style="margin: 0 12rpx;">丨</text>{{item.myAddtime}}</view>
						</view>
						<view class="i-r">
							<view @click="toXiangqin(item)" class="i-r-b1">详情</view>
							<view @click="dell(item)" class="i-r-b2">删除</view>
						</view>
					</view>
				</scroll-view>
				<view v-else class="noData">
					<image class="n-img" src="/static/newImage/tabBar/ziyuan1.png" mode=""></image>
					<u-loadmore @touchmove="closeMask" @touchstart="closeMask" :class="{'myloadmore':true}"
						:status="status" :icon-type="iconType" :load-text="loadText" />
				</view>
			</view>
			<u-tabbar active-color="#121212" icon-size='60' height='120' mid-button-size="156" v-model="current"
				:list="tabbarlist" @change='changeTabbar' :mid-button="true"></u-tabbar>
		</view>
		<u-modal @confirm='del' :show-title='false' :show-cancel-button='true' v-model="modshow1" content="确认删除">
		</u-modal>

	</view>
</template>

<script>
	import {
		mapGetters,
		mapState
	} from "vuex";
	export default {
		computed: {
			...mapGetters(['isLogin']),
			...mapState(['haveDot'])
		},
		data() {
			return {
				infoObj: {},
				modshow1: false,
				tabbarlist: [{
						iconPath: "/static/newImage/tabBarIcon/1-1.png",
						selectedIconPath: "/static/newImage/tabBarIcon/1-2.png",
						text: '首页',
						customIcon: false,
						pagePath: "/pages/tabBar/index"
					},
					{
						iconPath: "/static/newImage/tabBarIcon/2-1.png",
						selectedIconPath: "/static/newImage/tabBarIcon/2-2.png",
						text: '团队',
						customIcon: false,
						pagePath: "/pages/tabBar/tuandui"
					},
					{
						iconPath: "https://rushifu-test.oss-cn-hangzhou.aliyuncs.com/1664157631290.png",
						selectedIconPath: "https://rushifu-test.oss-cn-hangzhou.aliyuncs.com/1664157631290.png",
						// text: '发布',
						midButton: true,
						customIcon: false,
					},
					{
						iconPath: "/static/newImage/tabBarIcon/3-1.png",
						selectedIconPath: "/static/newImage/tabBarIcon/3-2.png",
						text: '导航',
						customIcon: false,
						pagePath: "/pages/tabBar/daohang"
					},
					{
						iconPath: "/static/newImage/tabBarIcon/4-1.png",
						selectedIconPath: "/static/newImage/tabBarIcon/4-2.png",
						text: '我的',
						customIcon: false,
						pagePath: "/pages/tabBar/wode",
						isDot: false,
					},
				],
				current: 1,
				dingdanPage: 1,
				list: [],
				id: "",
				// 加载
				status: 'loadmore',
				iconType: 'flower',
				loadText: {
					loadmore: '上拉加载更多',
					loading: '正在加载...',
					nomore: '没有更多了'
				},
				isGLY:null,
			}
		},
		onShow() {
			this.list = []
			this.dingdanPage = 1
			this.getInfo();
			this.getData()
		},
		methods: {
			toZiliao() {
				uni.navigateTo({
					url: '/pages/wode/ziliao'
				})
			},
			async getInfo() {
				const res = await this.$api.user_info()
				this.infoObj = res
				if (res.result == 1) {
					uni.setStorageSync('userObj', this.infoObj);
				}
				if (res.joincompany.com_ismanage == 1) {
					this.isGLY = true
				} else {
					this.isGLY = false
				}
				if (this.infoObj.notify_num > 0) {
					this.$store.commit('haveDot', true)
				} else {
					this.$store.commit('haveDot', false)
				}
				this.$set(this.tabbarlist[4], 'isDot', this.haveDot)
			},
			async getData() {
				// const res = await this.$api.user_notify()
				// this.dataObj = res
				this.status = 'loading';
				const res = await this.$api.user_notify({
					page: this.dingdanPage,
					pagesize: 20,
				})
				if (res.list.length < 20) {
					this.status = 'nomore'
				} else {
					this.status = 'loadmore';
				}
				this.list = this.list.concat(res.list)
				this.list.forEach(ele => {
					ele.myAddtime = this.filterTime(ele.addtime)
				})
			},
			dell(item) {
				this.modshow1 = true
				this.id = item.id
			},
			async del() {
				const res = await this.$api.user_notifydel({
					id: this.id
				})
				if (res.result == 1) {
					this.$refs.uToast.show({
						title: res.msg,
						callback: () => {
							this.list = []
							this.getData()
						}
					})
				}
			},
			filterTime(time) {
				var now = new Date(parseFloat(time));
				var year = now.getFullYear();
				var month = now.getMonth() + 1;
				var date = now.getDate();
				if (month >= 1 && month <= 9) {
					month = "0" + month;
				}
				if (date >= 0 && date <= 9) {
					date = "0" + date;
				}
				var hour = now.getHours();
				var minute = now.getMinutes();
				var second = now.getSeconds();
				if (hour >= 1 && hour <= 9) {
					hour = "0" + hour;
				}
				if (minute >= 0 && minute <= 9) {
					minute = "0" + minute;
				}
				if (second >= 0 && second <= 9) {
					second = "0" + second;
				}
				return year + "-" + month + "-" + date + " " + hour + ":" + minute + ":" + second;
			},
			reachBottom() {
				this.dingdanPage++
				this.getData()
			},
			toxuanzeshenfen() {
				uni.navigateTo({
					url: '/pages/wode/xuanzeshenfen'
				})
			},
			// changeTabbar(i) {
			// 	if (i == 2) {
			// 		if (!this.isGLY) {
			// 			this.$refs.uToast.show({
			// 				title: '您不是管理员,无法创建岗位',
			// 			})
			// 		} else if (this.noJoin) {
			// 			this.$refs.uToast.show({
			// 				title: '您未加入猎企,无法创建岗位',
			// 			})
			// 		} else {
			// 			uni.navigateTo({
			// 				url: '/pages/gangwei/chuanjiangangwei'
			// 			})
			// 		}
			// 	}
			// },
			changeTabbar(i) {
				if (i == 2) {
					// if (!this.isGLY) {
					// 	this.$refs.uToast.show({
					// 		title: '您不是管理员,无法创建岗位',
					// 	})
					// } else if (this.noJoin) {
					// 	this.$refs.uToast.show({
					// 		title: '您未加入猎企,无法创建岗位',
					// 	})
					// } else {
					// 	uni.navigateTo({
					// 		url: '/pages/gangwei/chuanjiangangwei'
					// 	})
					// }
					uni.navigateTo({
						url: '/pages/gangwei/chuanjiangangwei'
					})
				}
			},
			async toXiangqin(item) {
				// uni.navigateTo({
				// 	url: '/pages/wode/gangweixiangqin'
				// })
				await this.$api.user_notifyread({
					notify_id: item.id
				})
				if (item.category == 2) {
					// 岗位
					uni.navigateTo({
						url: `/pages/wode/gangweixiangqin?id=${item.handle_id}&reason=${item.reason}`
					})
				} else {
					// 认证
					if (item.historic_records) {
						uni.navigateTo({
							url: `/pages/wode/renzhengxiangqin?id=${item.handle_id}&reason=${item.reason}&history=${JSON.stringify(item.historic_records)}`
						})
					} else {
						uni.navigateTo({
							url: `/pages/wode/renzhengxiangqin?id=${item.handle_id}&reason=${item.reason}`
						})
					}

				}
			},
			torenzheng() {
				if(!this.isGLY && this.infoObj.is_joincompany){
					this.$refs.uToast.show({
						title: '您已经加入猎企，需退出猎企后才能重新加入新猎企',
					})
					return
				}
				if (this.infoObj.is_licensestatus == 1) {
					return
				}
				if (this.infoObj.is_licensestatus == 0) {
					uni.navigateTo({
						url: '/pages/wode/renzheng'
					})
				} else {
					uni.navigateTo({
						url: `/pages/wode/renzhengxiangqin?status=${this.infoObj.is_licensestatus}`
					})
				}

			},
			tojiaru() {
				uni.navigateTo({
					url: '/pages/wode/jiaru'
				})
				// if (this.infoObj.is_joincompany == 1) {
				// 	this.$refs.uToast.show({
				// 		title: '您已经加入猎企，需退出猎企后才能重新加入新猎企',
				// 	})
				// } else {
				// 	uni.navigateTo({
				// 		url: '/pages/wode/jiaru'
				// 	})
				// }
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

	/deep/ .u-tabbar__content__circle__border {
		height: 0 !important;
		width: 0 !important;
	}

	/deep/ .u-navbar {
		.u-icon__icon {
			margin-left: 8rpx;
			font-weight: 600 !important;
			color: #000 !important;
			display: none;
		}

		.u-back-text {
			font-size: 36rpx;
			margin-left: 8rpx;
			font-weight: 600;
			color: #000 !important;
		}
	}

	/deep/ .u-tabbar__content__circle__button {
		top: -10rpx !important;
	}

	.noData {
		height: calc(100vh - 140rpx - 544rpx - env(safe-area-inset-bottom));
		display: flex;
		flex-direction: column;
		// margin-top: 400rpx;
		align-items: center;
		justify-content: center;

		.n-img {
			width: 190rpx;
			height: 150rpx;
		}
	}

	::-webkit-scrollbar {
		/*滚动条整体样式*/
		width: 8rpx;
		/*高宽分别对应横竖滚动条的尺寸*/
		height: 2rpx;
	}

	::-webkit-scrollbar-thumb {
		/*滚动条里面小方块*/
		border-radius: 10px;
		box-shadow: inset 0 0 10rpx rgba(97, 184, 179, 0.1);
		background: #78b4b4;
		display: none;
	}

	::-webkit-scrollbar-track {
		/*滚动条里面轨道*/
		box-shadow: inset 0 0 10rpx rgba(87, 175, 187, 0.1);
		border-radius: 20rpx;
		background: #ededed;
		display: none;
	}

	.nav1 {
		font-size: 36rpx;
		font-family: PingFangSC, PingFangSC-Medium;
		font-weight: 600;
		color: #000000;
		margin-top: 108rpx;
		margin-left: 34rpx;
	}

	.flex {
		display: flex;
		flex-direction: column;
	}

	.nav2 {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin: 66rpx 52rpx 50rpx 32rpx;

		.n2-l {
			display: flex;
			align-items: center;

			.n2-l-img {
				width: 120rpx;
				height: 120rpx;
				border-radius: 50%;
				border: 2rpx solid #1362FD;
			}

			.n2-l-r {
				margin-left: 20rpx;

				.n2-l-r-txt1 {
					font-size: 32rpx;
					font-family: PingFangSC, PingFangSC-Medium;
					font-weight: 600;
					color: #121212;
				}

				.n2-l-r-txt2 {
					margin-top: 16rpx;
					font-size: 24rpx;
					font-family: PingFangSC, PingFangSC-Regular;
					font-weight: 400;
					color: #121212;
					display: flex;
					align-items: center;

					.blue {
						color: #1362FD;
					}

					.myIcon {
						width: 36rpx;
						height: 36rpx;
					}
				}
			}
		}

		.n2-r {
			.n2-r-b1 {
				width: 150rpx;
				height: 48rpx;
				background: #1362fd;
				border-radius: 24rpx;
				font-size: 26rpx;
				font-family: PingFangSC, PingFangSC-Regular;
				font-weight: 400;
				text-align: center;
				line-height: 48rpx;
				color: #ffffff;
			}

			.n2-r-b1.no {
				background: #bcbcbc;
			}

			.n2-r-b2 {
				margin-top: 28rpx;
				width: 150rpx;
				height: 48rpx;
				border: 1.2rpx solid #1362fd;
				border-radius: 24rpx;
				font-size: 26rpx;
				font-family: PingFangSC, PingFangSC-Regular;
				font-weight: 400;
				text-align: center;
				line-height: 46rpx;
				color: #1362fd;
			}
		}
	}

	.nav3 {
		flex: 1;
		padding: 24rpx 32rpx;
		margin: 0 auto;
		width: 710rpx;
		background: #ffffff;
		border-radius: 10rpx;

		.n3-txt1 {
			font-size: 36rpx;
			font-family: PingFangSC, PingFangSC-Medium;
			font-weight: 600;
			color: #000000;
			margin-bottom: 22rpx;
		}

		.items {
			overflow-y: scroll;
			// height: 864rpx;
			height: calc(100vh - 140rpx - 544rpx - env(safe-area-inset-bottom));

			.item {
				border-top: 2rpx solid #ececec;
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 22rpx 0;

				.i-l {
					width: 370rpx;

					.i-l-tit1 {
						.tit11 {
							font-size: 28rpx;
							font-family: PingFangSC, PingFangSC-Regular;
							font-weight: 400;
							color: #121212;
							display: inline-block;
						}

						.dian {
							display: inline-block;
							background: #ff5c50;
							width: 15rpx;
							height: 15rpx;
							border-radius: 50%;
							transform: translateY(-8px);
							margin-left: 4rpx;
							// color: #ff5c50;
							// font-size: 92rpx;
							// line-height: 0;
							// margin-top: 6rpx;
						}
					}

					.i-l-tit2 {
						margin-top: 8rpx;
						display: flex;
						align-items: center;
						font-size: 20rpx;
						font-family: PingFangSC, PingFangSC-Regular;
						font-weight: 400;
						color: #707070;
					}
				}

				.i-r {
					display: flex;
					align-items: center;

					.i-r-b1 {
						width: 106rpx;
						height: 48rpx;
						border: 2rpx solid #1362fd;
						border-radius: 26rpx;
						font-size: 26rpx;
						font-family: PingFangSC, PingFangSC-Regular;
						font-weight: 400;
						text-align: center;
						line-height: 46rpx;
						color: #1362fd;
					}

					.i-r-b2 {
						margin-left: 16rpx;
						width: 106rpx;
						height: 48rpx;
						border: 2rpx solid #979797;
						border-radius: 26rpx;
						font-family: PingFangSC, PingFangSC-Regular;
						font-weight: 400;
						text-align: center;
						line-height: 46rpx;
						color: #707070;
					}
				}
			}
		}
	}
</style>
