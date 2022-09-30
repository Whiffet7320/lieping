<template>
	<view class="index">
		<u-toast ref="uToast" />
		<u-mask :show="maskshow" @click="closeMask"></u-mask>
		<image @click="toTongji" class="float-img" src="/static/newImage/tabBar/zu28.png" mode=""></image>
		<image class="img1" src="/static/newImage/tabBar/zu21.png" mode=""></image>
		<view class="nav1">
			<view class="tit1">
				<view @click="changeIndex(1)" :class="{'t1-1':true,'active1':isIndex == 1,'active2':isIndex == 2}">在招
				</view>
				<view @click="changeIndex(2)" :class="{'t1-2':true,'active1':isIndex == 1,'active2':isIndex == 2}">下架
				</view>
				<view class="float-n1"></view>
			</view>
			<view class="tit2">
				<view class="item" v-for="(item,i) in 6" :key='i'>
					<view class="t2-1">
						<view class="t2-1-left">销售经理</view>
						<view class="t2-1-right">
							<view class="t2-1-r-txt1">10-20K*15薪</view>
							<image @click="closeBtn(item)" style="width: 40rpx;height: 40rpx;" src="/static/newImage/tabBar/zu11.png" mode="">
							</image>
						</view>
					</view>
					<view class="t2-2">
						<view class="t2-2-txt1">天宇传媒有限公司</view>
						<view class="t2-2-txt2">哈萨克斯坦</view>
					</view>
					<view class="t2-3">
						<view @click="toshezhidaohang" class="t3-b1">设置导航</view>
						<view @click="zuodan" class="t3-b2">做单</view>
						<view @click="tojinzhan" class="t3-b3">进展</view>
						<view @click="openPop(i)" :class="{'t3-b4':true}">更多<u-icon
								style='margin-left: 6rpx;transform: translateY(2rpx);' name="play-right-fill"
								color="#095bfe" size="18"></u-icon>
						</view>
						<mypopover ref='pop' v-if="i == openIndex" class="popov1" @select='changePop'
							:modalLeftPos='"-244rpx"' :modalTopPos='modalTopPos' :modalOpacity='"1"' :active="popover">
						</mypopover>
					</view>
					<view class="heng"></view>
				</view>
			</view>
		</view>
		<u-modal :show-title='false' :show-cancel-button='true' v-model="modshow1" content="确认删除"></u-modal>
		<u-tabbar active-color="#121212" icon-size='60' height='120' mid-button-size="150" v-model="current"
			:list="tabbarlist" :mid-button="true"></u-tabbar>

	</view>
</template>

<script>
	import mypopover from "@/components/my-popover/dean-popover.vue"
	import {
		mapGetters,
		mapState
	} from "vuex";
	export default {
		components: {
			mypopover
		},
		computed: {
			...mapGetters(['isLogin'])
		},
		data() {
			return {
				modshow1:false,
				modalTopPos: '26rpx',
				maskshow: false,
				openIndex: -1,
				popover: false,
				isIndex: 2,
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
						pagePath: "/pages/tabBar/wode"
					},
				],
				current: 0
			}
		},
		onShow() {
			// this.getData();
		},
		// async onLoad(options) {
		// 	if (options.scene) {
		// 		const arr = options.scene.split('_');
		// 		this.scencLid = arr[0];
		// 		uni.setStorageSync('scencLid',this.scencLid);
		// 	}
		// },
		methods: {
			closeBtn(item){
				console.log(item)
				this.modshow1 = true
			},
			zuodan() {
				this.$refs.uToast.show({
					title: '请先设置导航',
				})
			},
			closeMask() {
				this.maskshow = false;
				this.$refs.pop[0].closeBtn();
			},
			calc(dom) {
				const query = uni.createSelectorQuery().in(this);
				query.select(dom).boundingClientRect(data => {
					console.log(data.top)
				}).exec();
			},
			openPop(i) {
				this.maskshow = true;
				this.openIndex = i
				this.modalTopPos = '26rpx'
				setTimeout(() => {
					// console.log(this.$refs.pop[0])
					this.$refs.pop[0].getTop();
					// this.popover = true
				}, 100)
			},
			changePop(e) {
				console.log(e, e.scollTop, 123)
				this.modalTopPos = e.scollTop > 570 ? '-380rpx' : '26rpx'
				this.maskshow = e.isclose ? false : true
				if (e.val == '应聘') {
					uni.navigateTo({
						url: '/pages/index/yinpin'
					})
					// this.popover = false
				}
			},
			changeIndex(i) {
				this.isIndex = i
			},
			toshezhidaohang() {
				uni.navigateTo({
					url: '/pages/index/shezhidaohang'
				})
			},
			tojinzhan() {
				uni.navigateTo({
					url: '/pages/index/jinzhan'
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

	.float-img {
		width: 104rpx;
		height: 104rpx;
		position: fixed;
		right: 36rpx;
		bottom: 224rpx;
		z-index: 99;
	}

	.img1 {
		width: 750rpx;
		height: 392rpx;
	}

	.nav1 {
		position: absolute;
		top: 340rpx;
		margin: 0 20rpx;

		.tit1 {
			position: relative;
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
			background: #FFFFFF;
			width: 710rpx;
			overflow-y: scroll;
			height: 1098rpx;
			padding-bottom: 140rpx;

			.item {
				padding: 22rpx 32rpx 0rpx 32rpx;

				.t2-1 {
					display: flex;
					align-items: center;
					justify-content: space-between;

					.t2-1-left {
						font-size: 32rpx;
						font-family: PingFangSC, PingFangSC-Semibold;
						font-weight: 600;
						color: #000000;
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
					margin-top: 52rpx;

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

					.t3-b3 {
						width: 114rpx;
						height: 52rpx;
						border: 2rpx solid #095bfe;
						border-radius: 8rpx;
						font-size: 26rpx;
						font-family: PingFangSC, PingFangSC-Regular;
						font-weight: 400;
						text-align: center;
						line-height: 48rpx;
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
						line-height: 48rpx;
						color: #095bfe;
						display: flex;
						align-items: center;
						justify-content: center;
					}
				}

				.heng {
					margin-top: 30rpx;
					width: 648rpx;
					height: 2rpx;
					background: #ececec;
				}
			}
		}
	}
</style>
