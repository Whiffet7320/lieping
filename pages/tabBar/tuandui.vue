<template>
	<view class="index">
		<u-toast ref="uToast" />
		<!-- <u-mask :show="maskshow" @click="closeMask"></u-mask> -->
		<image @click="toTongji" class="float-img" src="/static/newImage/tabBar/zu28.png" mode=""></image>
		<view @click="clickPop" class="float-img2">
			<view class="fi2-txt">{{pop_title}}</view>
			<u-icon style='transform: rotate(90deg);' name="play-right-fill" color="#fffbfb" size="14"></u-icon>
		</view>
		<popover ref='pop' v-if="isShowPop" class="popov" @select='changePop' :btnList='popoverList'
			:modalLeftPos='"510rpx"' :modalTopPos='"828rpx"' :modalOpacity='"1"' :active="popover"></popover>
		<!-- <view class="nav1">猎头导航</view> -->
		<u-navbar @touchmove="closeMask" @touchstart="closeMask" back-text="团队" back-icon-size='36'></u-navbar>
		<view class="flex"
			style="display: flex;flex-direction: column;position: relative;height: calc(100vh - 184rpx);padding-bottom: 236rpx">
			<view class="n2" @touchmove="closeMask" @touchstart="	closeMask">
				<view class="nav2">
					<view class="n2-l">
						<u-icon name="bell" color="#707070" size="32"></u-icon>
						<view class="n2-l-txt1">仅您的公司管理员有权限</view>
					</view>
					<!-- 管理员 -->
					<view v-if="isGly" class="n2-r" @click="yaoqing">
						<view class="n2-r-txt1">邀请成员</view>
						<u-icon name="man-add" color="#121212" size="28"></u-icon>
					</view>
					<!-- 非管理员 -->
					<view v-if="!isGly" class="n2-r no" @click="yaoqing2">
						<view class="n2-r-txt1">邀请成员</view>
						<u-icon name="man-add" color="#ffffff" size="28"></u-icon>
					</view>
				</view>
			</view>

			<view v-if="list.length != 0" class="items">
				<view class="item" v-for="(item,i) in list" :key='item.id'>
					<view class="i-nav1">
						<view class="i-l" @touchmove="closeMask" @touchstart="closeMask">
							<template v-if="isGly">
								<image @click="xialaClick(item)" class="i-l-img" :src="item.userface" mode=""></image>
								<view @click="xialaClick(item)" class="i-l-txt1">{{item.realname}}</view>
							</template>
							<template v-else-if="!isGly && item.is_manage == 0">
								<image @click="xialaClick(item)" class="i-l-img" :src="item.userface" mode=""></image>
								<view @click="xialaClick(item)" class="i-l-txt1">{{item.realname}}</view>
							</template>
							<template v-else>
								<image class="i-l-img" :src="item.userface" mode=""></image>
								<view class="i-l-txt1">{{item.realname}}</view>
							</template>
							<!-- 非管理员 -->
							<template v-if="!isGly">
								<view class="yuan"></view>
								<view class="y-txt">{{item.is_manage == 1 ? '管理员' : '成员'}}</view>
							</template>
						</view>
						<view class="i-r">
							<!-- 管理员 -->
							<template v-if="isGly">
								<view class="i-r-b1" @touchstart.stop="clickggl(item,i)">
									<view class="i-r-b1-txt">{{item.is_manage == 1 ? '管理员' : '成员'}}</view>
									<u-icon style='transform: rotate(90deg);' name="play-right-fill" color="#fffbfb"
										size="18">
									</u-icon>
								</view>
								<popover ref='pop2' v-if="i == nowIndex" @select.stop='changePop1'
									:btnList='popoverList1' :modalLeftPos='"-166rpx"' :modalTopPos='"26rpx"'
									:modalOpacity='"1"' :active="popover1">
								</popover>
								<view class="i-r-b2" @click="del(item)">删除</view>
							</template>
							<!-- 管理员 -->
							<template v-if="isGly">
								<image @click="xialaClick(item)"
									:style="{transform:!item.isClick?'rotate(0deg)':'rotate(180deg)'}" class="i-r-b3"
									src="/static/newImage/tabBar/zu2.png" mode="">
								</image>
							</template>
							<!-- 非管理员 -->
							<template v-if="!isGly">
								<image v-if="item.is_manage == 0" @click="xialaClick(item)"
									:style="{transform:!item.isClick?'rotate(0deg)':'rotate(180deg)'}" class="i-r-b3"
									src="/static/newImage/tabBar/zu2.png" mode="">
								</image>
							</template>
						</view>
					</view>
					<!-- v-if="item.isClick"  -->
					<view @touchmove="closeMask" @touchstart="closeMask" class="i-bottom"
						:style="{height:!item.isClick?'0rpx':itemHeight,marginTop:!item.isClick?'0rpx':'22rpx'}">
						<view class="heng"></view>
						<view style="margin-top: calc(20rpx);" :class="{'i-bb':true}">
							<view class="table">
								<view class="n2t-n1">
									<view class="left">岗位</view>
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
								<view class="n2t-n2"
									:style="{borderBottom:item2.post_id == item.post[item.post.length-1].post_id?'0':''}"
									v-for="(item2,i) in item.post" :key='item2.post_id'>
									<view class="x1">{{item2.jobs}}</view>
									<view class="x2">
										<view :style="{borderTop:i == 0?'0':''}" class="x2-1">{{item2.chattable_num}}
										</view>
										<view :style="{borderTop:i == 0?'0':''}" class="x2-2">{{item2.pending_num}}
										</view>
									</view>
									<view class="x3">{{item2.share_num}}</view>
								</view>
							</view>
						</view>

					</view>
				</view>

				<!-- <u-loadmore @touchmove="closeMask" @touchstart="closeMask" :class="{'myloadmore':true}" :status="status"
					:icon-type="iconType" :load-text="loadText" /> -->
			</view>
			<view v-else class="noData">
				<image class="n-img" src="/static/newImage/tabBar/ziyuan1.png" mode=""></image>
				<u-loadmore @touchmove="closeMask" @touchstart="closeMask" :class="{'myloadmore':true}" :status="status"
					:icon-type="iconType" :load-text="loadText" />
			</view>
			<u-tabbar active-color="#121212" icon-size='60' height='120' mid-button-size="156" v-model="current"
				:list="tabbarlist" @change='changeTabbar' :mid-button="true"></u-tabbar>
		</view>

		<u-popup v-model="pop1show" mode='center' border-radius='10' :closeable='true'>
			<view class="pop1">
				<view class="p1-tit1">邀请成员</view>
				<image class="p1-img" :src="userObj.userface" mode=""></image>
				<view class="p1-box">
					<view class="txtx1">{{userObj.nickname}}</view>
					<view class="txtx2">
						<view class="xx1">邀请码：</view>
						<view class="xx2">{{yqm}}</view>
						<image @click="fuzhi" class="myicon" src="/static/newImage/tabBar/bz.png" mode=""></image>
					</view>
				</view>
				<button @click="fenxiang" open-type="share" class="p1-tit2">
					<image class="myicon2" src="/static/newImage/tabBar/zf.png" mode=""></image>
					<view class="p1-txt2">一键分享</view>
				</button>
			</view>
		</u-popup>
		<u-modal @confirm='onDel' :show-title='false' :show-cancel-button='true' v-model="modshow1" content="确认删除">
		</u-modal>

	</view>
</template>

<script>
	import popover from '../../components/dean-popover/dean-popover3.vue'
	import {
		mapGetters,
		mapState
	} from "vuex";
	export default {
		components: {
			popover
		},
		computed: {
			...mapGetters(['isLogin']),
			...mapState(['haveDot'])
		},
		data() {
			return {
				maskshow: false,
				isShowPop: false,
				popover: false,
				pop_title: '昨天',
				popoverList: ['昨天', '今天', '本周', '上周', '本月', '上月'],
				yqm: "735048",
				isGly: true,
				modshow1: false,
				pop1show: false,
				nowIndex: '',
				popoverList1: ['管理员', '成员'],
				popover1: false,
				pop1_title: '管理员',
				itemHeight: '',
				dataList: [],
				list: [],
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
				dingdanPage: 0,
				item: null,
				nowIndex: 0,
				timeRadio: "",
				begin_day: "",
				end_day: "",
				userObj: {},
				nowIndex2: -1,
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
		// 用户点击右上角分享转发
		onShareAppMessage: async function() {
			return {
				title: '邀请你加入',
				path: `/pages/wode/jiaru?yqm=${this.yqm}`,
				imageUrl: 'https://rushifu-test.oss-cn-hangzhou.aliyuncs.com/1668752961132.png'
			}
		},
		onReachBottom() {
			this.dingdanPage++
			this.getData()
		},
		onShow() {
			this.getUserInfo()
			this.$set(this.tabbarlist[4], 'isDot', this.haveDot)
			for (let i = 0; i < 10; i++) {
				this.dataList.push({
					val: `name${i}`,
					id: i,
					isClick: false
				})
			}
			this.list = []
			this.dingdanPage = 1
			var day = new Date();
			this.begin_day = new Date(new Date().setDate(new Date().getDate() - 1)).format('yyyy-MM-dd');
			this.end_day = new Date(new Date().setDate(new Date().getDate() - 1)).format('yyyy-MM-dd');
			this.getData()
		},
		methods: {
			getUserInfo() {
				this.userObj = uni.getStorageSync('userObj')
				this.yqm = this.userObj.invitation_code
				if (this.userObj.joincompany.com_ismanage == 1) {
					this.isGly = true
				} else {
					this.isGly = false
				}
				if (this.userObj.notify_num > 0) {
					this.$store.commit('haveDot', true)
				} else {
					this.$store.commit('haveDot', false)
				}
				this.$set(this.tabbarlist[4], 'isDot', this.haveDot)
			},
			async getData() {
				this.status = 'loading';
				const res = await this.$api.user_team({
					page: this.dingdanPage,
					pagesize: 10,
					begin_day: this.begin_day,
					end_day: this.end_day,
				})
				if (res.list.length < 10) {
					this.status = 'nomore'
				} else {
					this.status = 'loadmore';
				}
				this.list = this.list.concat(res.list)
			},
			changePop(e) {
				if (e.isclose) {
					this.popover = false
					this.isShowPop = false
					return
				}
				this.pop_title = e.val
				if (e.val == '今天') {
					this.timeRadio = 2
				} else if (e.val == '本周') {
					this.timeRadio = 3
				} else if (e.val == '上周') {
					this.timeRadio = 4
				} else if (e.val == '昨天') {
					this.timeRadio = 5
				} else if (e.val == '本月') {
					this.timeRadio = 6
				} else if (e.val == '上月') {
					this.timeRadio = 7
				}
				this.changeTimeRadio()
				this.popover = false
				this.isShowPop = false
			},
			fenxiang() {

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
					this.end_day = day.format('yyyy-MM-dd')
				} else if (this.timeRadio == 6) {
					this.begin_day = new Date(new Date().setDate(1)).format('yyyy-MM-dd');
					this.end_day = new Date(new Date(new Date().setMonth(new Date().getMonth() + 1)).setDate(0)).format(
						'yyyy-MM-dd');
				} else if (this.timeRadio == 7) {
					this.begin_day = new Date(new Date(new Date().setMonth(new Date().getMonth() - 1)).setDate(1)).format(
						'yyyy-MM-dd');
					this.end_day = new Date(new Date().setDate(0)).format('yyyy-MM-dd');
				} else if (this.timeRadio == 8) {
					this.begin_day = new Date(new Date(new Date().setMonth(0)).setDate(1)).format('yyyy-MM-dd')
					this.end_day = new Date(new Date(new Date().setMonth(12)).setDate(0)).format('yyyy-MM-dd')
				}
				this.list = []
				this.dingdanPage = 1
				this.getData()
			},
			async onDel() {
				const res = await this.$api.delTeam_operation({
					id: this.item.id
				})
				this.$refs.uToast.show({
					title: res.msg,
					callback: () => {
						if (res.result == 1) {
							this.dingdanPage = 1
							this.getData()
						}
					}
				})
			},
			clickPop() {
				// this.maskshow = true;
				// this.isShowPop = true
				// this.popover = true
				this.isShowPop = !this.isShowPop
				this.popover = !this.popover
			},
			fuzhi() {
				uni.setClipboardData({
					data: this.yqm,
				});
			},
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
			toTongji() {
				uni.navigateTo({
					url: '/pages/tuandui/tongji'
				})
			},
			closeMask() {
				this.maskshow = false;
				this.nowIndex = -1
				console.log(this.$refs.pop, this.$refs.pop2)
				this.$refs.pop ? this.$refs.pop.closeBtn(this.pop_title, '') : '';
				// this.$refs.pop2[0] ? this.$refs.pop2[0].closeBtn('', this.pop1_title) : '';
				// this.$refs.pop3 ? this.$refs.pop3.closeBtn(this.pop_title,this.pop_title2) : '';
			},
			yaoqing() {
				this.pop1show = true
			},
			yaoqing2() {
				if (this.userObj.is_joincompany == 0) {
					this.$refs.uToast.show({
						title: '您不是公司管理员,无法邀请成员,请先加入猎企',
						callback: () => {
							uni.navigateTo({
								url: '/pages/wode/jiaru'
							})
						}
					})
				} else {
					this.$refs.uToast.show({
						title: '您不是公司管理员,无法邀请成员',
					})
				}

			},
			async del(item) {
				this.item = item
				this.modshow1 = true;
			},
			clickggl(item, i) {
				console.log(item, 1231231231)
				this.item = item
				// this.maskshow = true
				if (this.popover1) {
					this.nowIndex = -1
					this.popover1 = false
				} else {
					this.nowIndex = i
					this.popover1 = true
				}

			},
			xialaClick(item) {
				// this.list.push({
				// 	val: `name${111}`,
				// 	id: 111
				// })
				uni.getSystemInfo({
					success: (res) => { // res - 各种参数
						let info = uni.createSelectorQuery().selectAll(".i-bb");
						info.boundingClientRect((data) => { //data - 各种参数
							console.log(data)
							this.itemHeight = `${data.height*2 + 24}rpx`
							this.$set(item, 'isClick', !item.isClick)
							console.log(this.itemHeight)
						}).exec()
					}
				})
			},
			async changePop1(e, ee) {
				console.log(e, ee)
				if (!this.popover1) {
					return
				}
				console.log(123121, this.item, e.val)
				var val = e.val
				const res = await this.$api.team_operation({
					id: this.item ? this.item.id : '',
					is_manage: e.val == '成员' ? 0 : 1
				})
				this.$refs.uToast.show({
					title: res.msg,
				})
				if (res.result == 1) {
					console.log(val)
					this.$set(this.list[this.nowIndex], 'is_manage', val == '成员' ? 0 : 1)
				}
				console.log(this.list[this.nowIndex])
				this.popover1 = false
				this.nowIndex = -1
				// this.maskshow = false;
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
	// /deep/ .u-mask{
	// 	    background-color: rgba(0, 0, 0, 0) !important;
	// }
	.myloadmore {
		padding: 16rpx 0 190rpx 0;
	}

	/deep/ .u-navbar {
		// z-index: 100000 !important;
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

	/deep/ .u-tabbar {
		height: 0 !important;
	}

	/deep/ .u-tabbar__content__circle__border {
		height: 0 !important;
		width: 0 !important;
	}

	button::after {
		border: none;
	}

	button {
		position: relative;
		display: block;
		margin-left: 0;
		margin-right: 0;
		padding-left: 0px;
		padding-right: 0px;
		box-sizing: border-box;
		// font-size: 18px;
		text-align: center;
		text-decoration: none;
		// line-height: 1;
		line-height: 1.35;
		// border-radius: 5px;
		-webkit-tap-highlight-color: transparent;
		overflow: hidden;
		color: #000000;
		background: #dee9ff;
	}

	.index {
		position: relative;
	}

	/deep/ .u-tabbar__content__circle__button {
		top: -10rpx !important;
	}

	.popov {
		/deep/ .compos {
			position: fixed !important;
			z-index: 99999;
		}
	}



	.float-img {
		width: 104rpx;
		height: 104rpx;
		position: fixed;
		right: 36rpx;
		// bottom: 224rpx;
		top: 860rpx;
		z-index: 99;
	}

	.float-img2 {
		z-index: 9;
		position: fixed;
		right: 42rpx;
		// bottom: 354rpx;
		top: 748rpx;
		width: 88rpx;
		height: 88rpx;
		background: linear-gradient(180deg, #f0e1b9, #f39f47);
		border-radius: 50%;
		box-shadow: 0rpx 8rpx 8rpx 0rpx rgba(241, 203, 105, 0.40);
		display: flex;
		align-items: center;
		justify-content: center;

		.fi2-txt {
			font-size: 24rpx;
			font-family: PingFangSC, PingFangSC-Medium;
			font-weight: 500;
			color: #ffffff;
			margin-right: 6rpx;
		}
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
		position: relative !important;
	}

	.n2 {
		background: #f8faff;
		position: fixed;
		z-index: 999;
		// z-index: 100000;
		// top: calc(120rpx + env(safe-area-inset-top));
		left: 50%;
		transform: translate(-50%, -4rpx);
	}

	.nav2 {
		margin: 34rpx auto 20rpx auto;
		width: 710rpx;
		height: 64rpx;
		padding: 0 32rpx 0 42rpx;
		background: #F8eff3;
		border-radius: 10rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;

		.n2-l {
			display: flex;
			align-items: center;

			.n2-l-txt1 {
				font-size: 24rpx;
				font-family: PingFangSC, PingFangSC-Regular;
				font-weight: 400;
				color: #707070;
				margin-left: 14rpx;
			}
		}

		.n2-r {
			width: 190rpx;
			height: 48rpx;
			background: #f1c85d;
			border-radius: 26rpx;
			display: flex;
			align-items: center;
			justify-content: center;

			.n2-r-txt1 {
				font-size: 24rpx;
				font-family: PingFangSC, PingFangSC-Medium;
				font-weight: 500;
				color: #121212;
				margin-right: 4rpx;
			}
		}

		.n2-r.no {
			background: #999999;

			.n2-r-txt1 {
				color: #ffffff;
			}
		}
	}

	.items {
		// margin-top: ;
		overflow-y: scroll;
		// height: 1110rpx;
		width: 710rpx;
		margin: 120rpx auto 0 auto;
		flex: 1;

		// height:calc(100vh - var(--window-top) - 266rpx - 140rpx);
		.item {
			border-radius: 10rpx;
			padding: 24rpx 32rpx;
			background: #ffffff;
			// display: flex;
			// align-items: center;
			// justify-content: space-between;
			margin-bottom: 20rpx;

			&:nth-last-child(1) {
				margin-bottom: 0rpx;
			}

			.i-nav1 {
				display: flex;
				align-items: center;
				justify-content: space-between;
				flex: 1;

				.i-l {
					display: flex;
					align-items: center;

					.i-l-img {
						width: 72rpx;
						height: 72rpx;
						border-radius: 50%;
					}

					.i-l-txt1 {
						margin-left: 12rpx;
						font-size: 30rpx;
						font-family: PingFangSC, PingFangSC-Regular;
						font-weight: 400;
						color: #121212;
						flex: 1;
					}

					.yuan {
						margin-left: 16rpx;
						width: 12rpx;
						height: 12rpx;
						background: #7ca8f4;
						border-radius: 50%;
					}

					.y-txt {
						margin-left: 8rpx;
						font-size: 24rpx;
						font-family: PingFangSC, PingFangSC-Regular;
						font-weight: 400;
						color: #7ca8f4;
					}
				}

				.i-r {
					display: flex;
					align-items: center;

					.i-r-b1 {
						display: flex;
						justify-content: center;
						align-items: center;
						width: 164rpx;
						height: 52rpx;
						background: linear-gradient(90deg, #84aef3, #0256ff);
						border-radius: 8rpx;

						.i-r-b1-txt {
							font-size: 26rpx;
							font-family: PingFangSC, PingFangSC-Regular;
							font-weight: 400;
							color: #ffffff;
							margin-right: 8rpx;
						}
					}

					.i-r-b2 {
						width: 114rpx;
						height: 52rpx;
						border: 2rpx solid #0558ff;
						border-radius: 8rpx;
						display: flex;
						align-items: center;
						justify-content: center;
						font-size: 26rpx;
						font-family: PingFangSC, PingFangSC-Regular;
						font-weight: 400;
						color: #0256ff;
						margin-left: 32rpx;
					}

					.i-r-b3 {
						// transform: rotate(0deg);
						transition: all 0.5s;
						margin-left: 32rpx;
						width: 40rpx;
						height: 40rpx;
					}
				}

			}

			.i-bottom {
				// margin-top: 22rpx;
				transition: all 0.5s;
				overflow: hidden;

				.heng {
					width: 648rpx;
					height: 1.6rpx;
					background: #ececec;
				}

				.i-bb {

					// padding: 0 32rpx 60rpx 32rpx;
					// transition: all 1s 1s ease-out;
					.table {
						width: 644rpx;
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
								width: 33%;
								text-align: center;
								line-height: 120rpx;
								color: #fff;
								border-left: 2rpx solid #88abfc;
							}
						}

						.n2t-n2 {
							&:nth-last-child(1) {
								.x2-1 {
									border-bottom: 0rpx !important;
								}

								.x2-2 {
									border-bottom: 0rpx !important;
								}
							}

							min-height: 70rpx;
							display: flex;
							// height: 70rpx;
							color: #121212;
							border-bottom: 2rpx solid #1362fd;

							.x1 {
								width: 33%;
								line-height: 32rpx;
								display: flex;
								align-items: center;
								justify-content: center;
								font-size: 26rpx;
								font-family: PingFangSC, PingFangSC-Regular;
								font-weight: 400;
								color: #1362fd;
								text-align: center;
							}

							.x2 {
								display: flex;
								align-items: center;
								width: 33%;

								.x2-1 {
									width: 50%;
									text-align: center;
									display: flex;
									align-items: center;
									justify-content: center;
									border: 2rpx solid #1362fd;
									font-size: 26rpx;
									background: #8bb0fb;
									height: 100%;
								}

								.x2-2 {
									height: 100%;
									width: 50%;
									text-align: center;
									display: flex;
									align-items: center;
									justify-content: center;
									border-right: 2rpx solid #1362fd;
									font-size: 26rpx;
									border-bottom: 2rpx solid #1362fd;
									border-top: 2rpx solid #1362fd;
									background: #e7efff;
								}
							}

							.x3 {
								width: 33%;
								display: flex;
								text-align: center;
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

			}
		}
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

	.pop1 {
		position: relative;
		width: 624rpx;
		height: 638rpx;
		background: #dee9ff;

		// display: flex;
		// flex-direction: column;
		// align-items: center;
		.p1-tit1 {
			font-size: 36rpx;
			font-family: PingFangSC, PingFangSC-Medium;
			font-weight: 600;
			text-align: center;
			color: #121212;
			padding-top: 48rpx;
		}

		.p1-img {
			position: absolute;
			width: 132rpx;
			height: 132rpx;
			margin-top: 32rpx;
			margin-left: 246rpx;
			z-index: 9;
			border: 4rpx solid #fff;
			border-radius: 50%;
		}

		.p1-box {
			z-index: 1;
			position: absolute;
			left: 32rpx;
			top: 196rpx;
			width: 560rpx;
			height: 314rpx;
			background: #ffffff;
			border-radius: 24rpx;
			display: flex;
			flex-direction: column;
			align-items: center;

			.txtx1 {
				font-size: 30rpx;
				font-family: PingFangSC, PingFangSC-Regular;
				font-weight: 400;
				text-align: left;
				color: #0b0b0b;
				padding-top: 78rpx;
				margin-bottom: 52rpx;
			}

			.txtx2 {
				display: flex;
				align-items: center;

				.xx1 {
					font-size: 28rpx;
					font-family: PingFangSC, PingFangSC-Regular;
					font-weight: 400;
					color: #666666;
				}

				.xx2 {
					font-size: 48rpx;
					font-family: PingFangSC, PingFangSC-Regular;
					font-weight: 400;
					text-align: left;
					color: #121212;
					// text-decoration: underline;
					border-bottom: 2rpx solid #ececec;
				}

				.myicon {
					margin-left: 6rpx;
					width: 34rpx;
					height: 34rpx;
				}
			}
		}

		.p1-tit2 {
			position: absolute;
			top: 500rpx;
			left: 222rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			margin-top: 42rpx;

			.myicon2 {
				width: 48rpx;
				height: 48rpx;
				margin-right: 16rpx;
			}

			.p1-txt2 {
				font-size: 30rpx;
				font-family: PingFangSC, PingFangSC-Regular;
				font-weight: 400;
				color: #121212;
			}
		}
	}

	/deep/ .modal {
		width: 170rpx !important;
	}
</style>
