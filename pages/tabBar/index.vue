<template>
	<view class="index">
		<u-toast ref="uToast" />
		<u-mask :show="maskshow" @click="closeMask"></u-mask>
		<image @click="toTongji" class="float-img" src="/static/newImage/tabBar/zu28.png" mode=""></image>
		<view class="flexf">

		</view>
		<image class="img1" :src="gglist[0].pic" mode=""></image>
		<view class="nav1">
			<view class="tit1">
				<view @click="changeIndex(1)" :class="{'t1-1':true,'active1':isIndex == 1,'active2':isIndex == 2}">在招
				</view>
				<view @click="changeIndex(2)" :class="{'t1-2':true,'active1':isIndex == 1,'active2':isIndex == 2}">下架
				</view>
				<view class="float-n1"></view>
			</view>
			<!-- <scroll-view scroll-view scroll-y @scrolltolower="reachBottom" class="tit2"> -->
			<view class="tit2">
				<template v-if="list.length!=0">
					<view class="item" v-for="(item,i) in list" :key='item.id'>
						<view class="t2-1" @click="toXiangqin(item)">
							<view class="t2-1-left">{{item.jobs}}</view>
							<view class="t2-1-right">
								<view class="t2-1-r-txt1">{{item.salary_range}}</view>
								<image v-if='isGLY' @click.stop="closeBtn(item)" style="width: 40rpx;height: 40rpx;"
									src="/static/newImage/tabBar/zu11.png" mode="">
								</image>
							</view>
						</view>
						<view class="t2-2" @click="toXiangqin(item)">
							<view class="t2-2-txt1">{{item.com_name}}</view>
							<view class="t2-2-txt2">{{item.work_place}}</view>
						</view>
						<!-- <u-mask v-if="i == openIndex" :show="maskshow" @click="closeMask"></u-mask> -->
						<view class="t2-3">
							<view @click.stop="toshezhidaohang(item)" class="t3-b1">{{isGLY?'设置':'查看'}}导航</view>
							<view v-if="item.is_navigation == 0" @click.stop="zuodan(item)"
								:class="{'t3-b2':true,'no':false}">做单</view>
							<view v-else-if="item.is_making == 1" @click.stop="zuodan(item)"
								:class="{'t3-b2':true,'ing':true}">做单中</view>
							<view v-else="item.is_making == 0" @click.stop="zuodan(item)"
								:class="{'t3-b2':true,'no':true}">
								做单</view>
							<!-- <view @click.stop="zuodan(item)" :class="{'t3-b2':true,'no':item.is_making == 1}">做单中</view>
						<view @click.stop="zuodan(item)" :class="{'t3-b2':true,'no':item.is_navigation == 0}">做单</view> -->
							<!-- <view v-else @click="zuodan" :class="{'t3-b2':true,'no':false}">做单</view> -->
							<view @click.stop="tojinzhan(item)" class="t3-b3">进展</view>
							<view style="position: relative;" @click.stop="openPop(i,item)" :class="{'t3-b4':true}">更多<text v-if="item.candidate_num > 0" style="width: 12rpx;height: 12rpx;background: #f40;border-radius: 50%;position: absolute;right: 40rpx;top: 8rpx;"></text><u-icon
									style='margin-left: 6rpx;transform: translateY(2rpx);' name="play-right-fill"
									color="#095bfe" size="18"></u-icon>
							</view>
							<!-- <u-mask :show="maskshow" @click="closeMask"></u-mask> -->
							<!-- 管理员 -->
							<template v-if="isGLY && isIndex == 1">
								<mypopover :num='item_num' ref='pop' v-if="i == openIndex" class="popov1"
									@select2='changePop2' @select='changePop' :modalLeftPos='"-244rpx"'
									:modalTopPos='modalTopPos' :modalOpacity='"1"' :active="popover"
									:post_ids='item.id ? item.id:""' :isFabu='item.is_publishjob == 0 ? false:true'
									:isshow="isGLY">
								</mypopover>
							</template>
							<template v-if="isGLY && isIndex == 2">
								<mypopover3 :num='item_num' ref='pop' v-if="i == openIndex" class="popov1" @select='changePop'
									:modalLeftPos='"-244rpx"' :modalTopPos='modalTopPos3' :modalOpacity='"1"'
									:active="popover">
								</mypopover3>
							</template>
							<!-- 非管理员 -->
							<template v-if="!isGLY && isIndex == 1">
								<mypopover2 :num='item_num' ref='pop' v-if="i == openIndex" class="popov1"
									@select='changePop' :modalLeftPos='"-244rpx"' :modalTopPos='modalTopPos'
									:modalOpacity='"1"' :active="popover" :haveZf='item.is_publishjob == 0 ? false:true'>
								</mypopover2>
							</template>
							<template v-if="!isGLY && isIndex == 2">
								<mypopover6 :num='item_num' ref='pop' v-if="i == openIndex" class="popov1" @select='changePop'
									:modalLeftPos='"-244rpx"' :modalTopPos='modalTopPos3' :modalOpacity='"1"'
									:active="popover">
								</mypopover6>
							</template>
						</view>
						<view :style="{background:i==list.length-1?'#fff':'#ececec'}" class="heng"></view>
					</view>
					<!-- <u-loadmore @touchmove="closeMask" @touchstart="closeMask" :class="{'myloadmore':true}"
						:status="status" :icon-type="iconType" :load-text="loadText" /> -->
				</template>

				<view v-else class="noData">
					<image class="n-img" src="/static/newImage/tabBar/ziyuan1.png" mode=""></image>
					<u-loadmore @touchmove="closeMask" @touchstart="closeMask" :class="{'myloadmore':true}"
						:status="status" :icon-type="iconType" :load-text="loadText" />
				</view>
			</view>
			<!-- </scroll-view> -->
			<u-tabbar class='myTabber' active-color="#121212" icon-size='60' height='120' mid-button-size="156"
				v-model="current" :list="tabbarlist" @change='changeTabbar' :mid-button="true"></u-tabbar>
		</view>
		<u-modal @confirm='del' :show-title='false' :show-cancel-button='true' v-model="modshow1" content="确认删除">
		</u-modal>
		<!-- <u-tabbar class='myTabber' active-color="#121212" icon-size='60' height='120' mid-button-size="156"
			v-model="current" :list="tabbarlist" @change='changeTabbar' :mid-button="true"></u-tabbar> -->

	</view>
</template>

<script>
	import mypopover from "@/components/my-popover/dean-popover.vue"
	import mypopover2 from "@/components/my-popover/dean-popover2.vue"
	import mypopover3 from "@/components/my-popover/dean-popover3.vue"
	import mypopover6 from "@/components/my-popover/dean-popover6.vue"
	import {
		mapGetters,
		mapState
	} from "vuex";
	export default {
		components: {
			mypopover,
			mypopover2,
			mypopover3,
			mypopover6
		},
		computed: {
			...mapGetters(['isLogin']),
			...mapState(['haveDot'])
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
				post_id: this.item.id,
				share_fromuserid: this.user_id
			})
			if (res2.result == 1) {
				this.shareTitle = `职位-${res2.job_post.jobs}-${res2.job_post.salary_range}`
				// this.$refs.pop[0].closeBtn();
				var title = ''
				title = this.shareTitle; //data，return 数据title
				console.log(this.shareTitle)
				return {
					title: title == '' ? '猎头导航让猎头做单更高效' : title,
					path: `/pages/qzz/zhiweixiangqin?scene=${this.item.id}_${this.user_id}`,
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
				post_id: this.item.id,
				share_fromuserid: this.user_id
			})
			if (res2.result == 1) {
				this.shareTitle = `职位-${res2.job_post.jobs}-${res2.job_post.salary_range}`
				this.$refs.pop[0].closeBtn();
				var title = ''
				title = this.shareTitle; //data，return 数据title
				console.log(this.shareTitle)
				return {
					title: title == '' ? '猎头导航让猎头做单更高效' : title,
					path: `/pages/qzz/zhiweixiangqin?scene=${this.item.id}_${this.user_id}`,
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
				pop2HaveZf: null,
				isGLY: null,
				modshow1: false,
				modalTopPos: '26rpx',
				modalTopPos3:'0rpx',
				maskshow: false,
				openIndex: -1,
				popover: false,
				isIndex: 1,
				tabbarlist: [{
						iconPath: "/static/newImage/tabBarIcon/1-1.png",
						selectedIconPath: "/static/newImage/tabBarIcon/1-2.png",
						text: '首页',
						customIcon: false,
						pagePath: "/pages/tabBar/index",
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
						// pagePath: "/pages/gangwei/chuanjiangangwei"
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
						isDot: false
					},

				],
				current: 0,
				list: [],
				item: {},
				userObj: {},
				dingdanPage: 0,
				item_num: '0',
				gglist: [],
				shareTitle: "",
				noShare: false,
				flagIndex: 0,
				flag: true,
				noJoin: null,
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
		created() {
			// this.tabbarlist[4].isDot = this.haveDot
		},
		onShow() {
			this.getUserInfo()
			this.getGG()
			this.list = []
			this.dingdanPage = 1
			this.getData()
		},
		onReachBottom() {
			this.dingdanPage++
			this.getData()
		},
		onLoad(options) {
			if (options.scene) {
				uni.navigateTo({
					url: `/pages/tabBar/saoma?logincode=${options.scene}`
				})
			}
		},
		methods: {
			async getGG() {
				const res = await this.$api.swiper_list({
					category: 1
				})
				this.gglist = res.list
			},
			async getUserInfo() {
				const res = await this.$api.user_info()
				this.userObj = res
				if (res.usercategory == 2) {
					uni.navigateTo({
						url: '/pages/tabBar/qzz_sy'
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
				if (this.userObj.is_joincompany == 0) {
					this.noJoin = true
					this.pop2HaveZf = false
				} else {
					this.noJoin = false
					this.pop2HaveZf = true
				}
				if (this.userObj.notify_num > 0) {
					this.$store.commit('haveDot', true)
				} else {
					this.$store.commit('haveDot', false)
				}
				this.$set(this.tabbarlist[4], 'isDot', this.haveDot)
				console.log(this.isGLY)
			},
			async getData() {
				this.status = 'loading';
				const res = await this.$api.position_list({
					page: this.dingdanPage,
					pagesize: 20,
					is_status: this.isIndex == 1 ? '1' : '0'
				})
				if (res.list.length < 20) {
					this.status = 'nomore'
				} else {
					this.status = 'loadmore';
				}
				this.list = this.list.concat(res.list)
			},
			toXiangqin(item) {
				if (!this.isGLY) {
					uni.navigateTo({
						url: `/pages/gangwei/chakangangwei?post_id=${item.id}&isGLY=${this.isGLY}`
					})
				} else {
					uni.navigateTo({
						url: `/pages/gangwei/chuanjiangangwei?post_id=${item.id}&jump=no&isGLY=${this.isGLY}`
					})
				}

			},
			reachBottom() {
				this.dingdanPage++
				this.getData()
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
			closeBtn(item) {
				console.log(item)
				this.item = item
				this.modshow1 = true
			},
			async del() {
				const res = await this.$api.position_userdel({
					post_id: this.item.id
				})
				this.$refs.uToast.show({
					title: res.msg,
				})
				if (res.result == 1) {
					this.dingdanPage = 1
					this.list = []
					this.getData()
				}
			},
			async zuodan(item) {
				// if (item.is_making == 0) {
				// 	this.$refs.uToast.show({
				// 		title: '请先设置导航',
				// 	})
				// }else{
				const res = await this.$api.position_making({
					post_id: item.id
				})
				this.$refs.uToast.show({
					title: res.msg,
				})
				if (res.result == 1) {
					this.dingdanPage = 1
					this.list = []
					this.getData()
				}
				// }

			},
			closeMask() {
				this.openIndex = -1
				this.maskshow = false;
				this.$refs.pop[0].closeBtn();
			},
			calc(dom) {
				const query = uni.createSelectorQuery().in(this);
				query.select(dom).boundingClientRect(data => {
					console.log(data.top)
				}).exec();
			},
			openPop(i, item) {
				this.item = item
				this.pop2HaveZf = item.is_navigation == 0 ? false : true;
				this.item_num = item.candidate_num.toString()
				this.maskshow = true;
				this.openIndex = i
				this.modalTopPos = '26rpx'
				setTimeout(() => {
					this.$refs.pop[0].getTop();
				}, 100)
			},
			changePop2(e) {
				console.log(e)
				this.shareTitle = e
			},
			async changePop(e) {
				console.log(e, e.scollTop, 123)
				if (this.flag) {
					if (this.isGLY) {
						this.modalTopPos = e.scollTop > 570 ? '-380rpx' : '26rpx'
						this.modalTopPos3 = e.scollTop > 570 ? '-244rpx' : '26rpx'
					} else {
						this.modalTopPos = e.scollTop > 640 ? '-246rpx' : '26rpx'
						this.modalTopPos3 = e.scollTop > 640 ? '-164rpx' : '26rpx'
					}
					if(e.isclose){
						this.maskshow = false
						this.openIndex = -1
						this.flag = true
					}
					if (e.val == '应聘') {
						this.flag = false
						this.$refs.pop[0].closeBtn();
						this.maskshow = false
						uni.navigateTo({
							url: `/pages/index/yinpin?post_id=${this.item.id}`
						})
						this.openIndex = -1
						this.flag = true
					} else if (e.val == '下架') {
						this.flag = false
						const res = await this.$api.position_useroperation({
							post_id: this.item.id,
							is_status: 1
						})
						this.$refs.uToast.show({
							title: res.msg,
							callback: () => {
								this.openIndex = -1
								if (res.result == 1) {
									this.dingdanPage = 1
									this.list = []
									this.getData()
									this.maskshow = false
									this.flag = true
								}
							}
						})
					} else if (e.val == '重启') {
						this.flag = false
						const res = await this.$api.position_useroperation({
							post_id: this.item.id,
							is_status: 2
						})
						this.$refs.uToast.show({
							title: res.msg,
							callback: () => {
								this.openIndex = -1
								this.$refs.pop[0].closeBtn();
								if (res.result == 1) {
									this.dingdanPage = 1
									this.list = []
									this.getData()
									this.maskshow = false
									this.flag = true
								}
							}
						})
					} else if (e.val == '发布到求职端') {
						this.flag = false
						const res = await this.$api.compost_jobpost({
							post_id: this.item.id,
							status:this.item.is_publishjob == 0?1:2
						})
						this.$refs.pop[0].closeBtn();
						this.$refs.uToast.show({
							title: res.msg,
							callback: () => {
								this.openIndex = -1
								this.maskshow = false
								this.flag = true
								if (res.result == 1) {
									this.dingdanPage = 1
									this.list = []
									this.getData()
								}
							}
						})
					} else if (e.val == '转发') {
						this.flag = false
						if (this.item.is_publishjob == 0) {
							this.noShare = true
						} else {
							this.noShare = false
						}
						this.maskshow = false
						this.openIndex = -1
						this.$refs.pop[0].closeBtn();
						this.flag = true
					}
				}

			},
			changeIndex(i) {
				this.isIndex = i
				this.dingdanPage = 1
				this.list = []
				this.getData()
			},
			toshezhidaohang(item) {
				if (this.isGLY) {
					uni.navigateTo({
						url: `/pages/index/shezhidaohang?post_id=${item.id}`
					})
				} else {
					if (item.is_navigation == 0) {
						this.$refs.uToast.show({
							title: '请先设置导航',
						})
					} else {
						uni.navigateTo({
							url: `/pages/index/chakandaohang?post_id=${item.id}`
						})
					}

				}

			},
			tojinzhan(item) {
				uni.navigateTo({
					url: `/pages/index/jinzhan?post_id=${item.id}`
				})
			},
			toTongji() {
				uni.navigateTo({
					url: '/pages/index/tongji'
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

	.popov1 {
		position: relative;
		z-index: 99999999 !important;
	}

	.myloadmore {
		padding: 16rpx 0 190rpx 0;
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

	// .myTabber{
	// 	// margin-top: -40rpx;
	// 	background: transparent !important
	// }
	// ios底部安全距离-padding
	// .myTabber{
	//     padding-bottom: constant(safe-area-inset-bottom);  
	//     padding-bottom: env(safe-area-inset-bottom); 
	//     box-sizing: content-box;
	// }
	/deep/ .u-mask {
		// z-index: 30000 !important;
		// background-color: rgba(0, 0, 0, 0) !important;
	}

	/deep/ .u-tabbar__content__circle__border {
		height: 0 !important;
		width: 0 !important;
	}

	/deep/ .u-tabbar__content__circle__button {
		top: -10rpx !important;
		background: transparent !important
	}

	.float-img {
		width: 104rpx;
		height: 104rpx;
		position: fixed;
		right: 36rpx;
		bottom: 224rpx;
		z-index: 99;
	}

	.img1 {
		position: fixed;
		top: 0;
		width: 750rpx;
		height: 392rpx;
		z-index: 99;
	}

	.nav1 {
		position: absolute;
		// position: fixed;
		top: 340rpx;
		margin: 0 20rpx;
		display: flex;
		flex-direction: column;
		height: calc(100vh - 342rpx);

		.tit1 {
			position: fixed;
			z-index: 99;
			top: 332rpx;
			display: flex;
			align-items: center;
			justify-content: center;

			.float-n1 {
				position: absolute;
				bottom: 0;
				width: 50rpx;
				height: 50rpx;
				left: 50%;
				transform: translateX(-50%);
				background: #FFFFFF;
				z-index: -1;
			}

			.t1-1.active1 {
				background: #ffffff;
				border-radius: 20rpx 20rpx 0rpx 20rpx;
				box-shadow: 0rpx 0rpx 0rpx 0rpx rgba(0, 0, 0, 0.16);
				color: #121212;
			}

			.t1-2.active1 {
				border-radius: 20rpx 20rpx 0rpx 20rpx;
				box-shadow: 0rpx 0rpx 0rpx 0rpx rgba(0, 0, 0, 0.16);
			}

			.t1-1.active2 {
				// background: #ffffff;
				border-radius: 20rpx 20rpx 20rpx 0rpx;
				box-shadow: 0rpx 0rpx 0rpx 0rpx rgba(0, 0, 0, 0.16);
				// color: #121212;
			}

			.t1-2.active2 {
				background: #ffffff;
				color: #121212;
				border-radius: 20rpx 20rpx 0rpx 20rpx;
				box-shadow: 0rpx 0rpx 0rpx 0rpx rgba(0, 0, 0, 0.16);
			}

			.t1-1 {
				width: 356rpx;
				height: 80rpx;
				background: #ececec;
				border-radius: 20rpx 20rpx 0rpx 0rpx;
				box-shadow: 0rpx 0rpx 0rpx 0rpx rgba(0, 0, 0, 0.16);
				font-size: 28rpx;
				font-family: PingFangSC, PingFangSC-Medium;
				font-weight: 500;
				text-align: center;
				line-height: 80rpx;
				color: #b4b4b4;
			}

			.t1-2 {
				width: 356rpx;
				height: 80rpx;
				background: #ececec;
				border-radius: 20rpx 20rpx 0rpx 0rpx;
				box-shadow: 0rpx 0rpx 0rpx 0rpx rgba(0, 0, 0, 0.16);
				font-size: 28rpx;
				font-family: PingFangSC, PingFangSC-Medium;
				font-weight: 500;
				text-align: center;
				line-height: 80rpx;
				color: #b4b4b4;
			}
		}

		.tit2 {
			padding-bottom: 236rpx;
			margin-top: 68rpx;
			flex: 1;
			background: #FFFFFF;
			width: 710rpx;
			// overflow-y: scroll;

			.item {
				padding: 22rpx 32rpx 0rpx 32rpx;
				position: relative;

				.t2-1 {
					display: flex;
					align-items: flex-start;
					justify-content: space-between;

					.t2-1-left {
						font-size: 32rpx;
						font-family: PingFangSC, PingFangSC-Semibold;
						font-weight: 600;
						color: #000000;
						width: 360rpx;
						overflow: hidden;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-box-orient: vertical;
						-webkit-line-clamp: 2;
					}

					.t2-1-right {
						display: flex;
						align-items: center;

						.t2-1-r-txt1 {
							font-size: 30rpx;
							font-family: PingFangSC, PingFangSC-Semibold;
							font-weight: 600;
							color: #4281f8;
							margin-right: 16rpx;
						}
					}
				}

				.t2-2 {
					display: flex;
					align-items: center;
					justify-content: space-between;
					padding-top: 52rpx;

					.t2-2-txt1 {
						color: #666666;
						font-size: 26rpx;
						font-family: PingFangSC, PingFangSC-Regular;
						font-weight: 400;
					}

					.t2-2-txt2 {
						color: #bcbcbc;
						font-size: 26rpx;
						font-family: PingFangSC, PingFangSC-Regular;
						font-weight: 400;
					}
				}

				.t2-3 {
					position: relative;
					display: flex;
					align-items: center;
					justify-content: center;
					margin-top: 32rpx;

					.t3-b1 {
						width: 168rpx;
						height: 54rpx;
						background: linear-gradient(90deg, #7ea9f2, #0256ff);
						border-radius: 8rpx;
						font-size: 26rpx;
						font-family: PingFangSC, PingFangSC-Regular;
						font-weight: 400;
						text-align: center;
						line-height: 54rpx;
						color: #ffffff;
						margin-right: 38rpx;
					}

					.t3-b2 {
						width: 114rpx;
						height: 54rpx;
						background: #ededed;
						border-radius: 8rpx;
						font-size: 26rpx;
						font-family: PingFangSC, PingFangSC-Regular;
						font-weight: 400;
						text-align: center;
						line-height: 54rpx;
						color: #b4b4b4;
						margin-right: 38rpx;
					}

					.t3-b2.no {
						color: #095bfe;
						border: 2rpx solid #095bfe;
						background: #fff;
						line-height: 50rpx;
					}

					.t3-b2.ing {
						background: #e5eeff;
						color: #095bfe;
						line-height: 50rpx;
					}

					.t3-b3 {
						width: 114rpx;
						height: 52rpx;
						border: 2rpx solid #095bfe;
						border-radius: 8rpx;
						font-size: 26rpx;
						font-family: PingFangSC, PingFangSC-Regular;
						font-weight: 400;
						text-align: center;
						line-height: 50rpx;
						color: #095bfe;
						margin-right: 40rpx;
					}

					.t3-b4 {
						width: 132rpx;
						height: 52rpx;
						border: 2rpx solid #095bfe;
						border-radius: 8rpx;
						font-size: 26rpx;
						font-family: PingFangSC, PingFangSC-Regular;
						font-weight: 400;
						line-height: 50rpx;
						color: #095bfe;
						display: flex;
						align-items: center;
						justify-content: center;
					}
				}

				.heng {
					margin-top: 30rpx;
					width: 648rpx;
					height: 1.6rpx;
					background: #ececec;
				}
			}
		}
	}
</style>
