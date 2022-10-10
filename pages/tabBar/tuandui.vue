<template>
	<view class="index">
		<image @click="toTongji" class="float-img" src="/static/newImage/tabBar/zu28.png" mode=""></image>
		<view class="float-img2">
			<view class="fi2-txt">昨天</view>
			<u-icon style='transform: rotate(90deg);' name="play-right-fill" color="#fffbfb" size="14"></u-icon>
		</view>
		<view class="nav1">猎头导航</view>
		<view class="nav2">
			<view class="n2-l">
				<u-icon name="bell" color="#707070" size="32"></u-icon>
				<view class="n2-l-txt1">仅您的公司管理员有权限</view>
			</view>
			<view class="n2-r" @click="yaoqing">
				<view class="n2-r-txt1">邀请成员</view>
				<u-icon name="man-add" color="#121212" size="28"></u-icon>
			</view>
		</view>
		<view class="items">
			<view class="item" v-for="(item,i) in dataList" :key='item.id'>
				<view class="i-nav1">
					<view class="i-l">
						<image class="i-l-img"
							src="https://img0.baidu.com/it/u=2067542421,2346290285&fm=253&fmt=auto&app=138&f=JPEG?w=450&h=450"
							mode=""></image>
						<view class="i-l-txt1">陈冠希</view>
					</view>
					<view class="i-r">
						<view class="i-r-b1" @click="clickggl(i)">
							<view class="i-r-b1-txt">{{pop1_title}}</view>
							<u-icon style='transform: rotate(90deg);' name="play-right-fill" color="#fffbfb" size="18">
							</u-icon>
						</view>
						<popover v-if="i == nowIndex" @select='changePop1' :btnList='popoverList1'
							:modalLeftPos='"-166rpx"' :modalTopPos='"26rpx"' :modalOpacity='"1"' :active="popover1">
						</popover>
						<view class="i-r-b2" @click="del(item)">删除</view>
						<image @click="xialaClick(item)"
							:style="{transform:!item.isClick?'rotate(0deg)':'rotate(180deg)'}" class="i-r-b3"
							src="/static/newImage/tabBar/zu2.png" mode="">
						</image>
					</view>
				</view>
				<!-- v-if="item.isClick"  -->
				<view class="i-bottom"
					:style="{height:!item.isClick?'0rpx':itemHeight,marginTop:!item.isClick?'0rpx':'22rpx'}">
					<view class="heng"></view>
					<view style="margin-top: calc(20rpx);" class="i-bb">
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
							<view class="n2t-n2" :style="{borderBottom:item2.id == list[list.length-1].id?'0':''}"
								v-for="(item2,i) in list" :key='item2.id'>
								<view class="x1">刘树昌</view>
								<view class="x2">
									<view :style="{borderTop:i == 0?'0':''}" class="x2-1">18</view>
									<view :style="{borderTop:i == 0?'0':''}" class="x2-2">16</view>
								</view>
								<view class="x3">8</view>
							</view>
						</view>
					</view>

				</view>
			</view>
		</view>
		<u-popup v-model="pop1show" mode='center' border-radius='10' :closeable='true'>
			<view class="pop1">
				<view class="p1-tit1">邀请成员</view>
				<image class="p1-img" src="https://img0.baidu.com/it/u=2067542421,2346290285&fm=253&fmt=auto&app=138&f=JPEG?w=450&h=450" mode=""></image>
				<view class="p1-box">
					<view class="txtx1">陈冠希</view>
					<view class="txtx2">
						<view class="xx1">邀请码：</view>
						<view class="xx2">234543</view>
						<image class="myicon" src="/static/newImage/tabBar/bz.png" mode=""></image>
					</view>
				</view>
				<view class="p1-tit2">
					<image class="myicon2" src="/static/newImage/tabBar/zf.png" mode=""></image>
					<view class="p1-txt2">一键分享</view>
				</view>
			</view>
		</u-popup>
		<u-modal :show-title='false' :show-cancel-button='true' v-model="modshow1" content="确认删除"></u-modal>
		<u-tabbar active-color="#121212" icon-size='60' height='120' mid-button-size="150" v-model="current"
			:list="tabbarlist" :mid-button="true"></u-tabbar>
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
				modshow1:false,
				pop1show:false,
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
						pagePath: "/pages/tabBar/wode"
					},
				],
				current: 1
			}
		},
		onShow() {
			for (let i = 0; i < 5; i++) {
				this.list.push({
					val: `name${i}`,
					id: i
				})
			}
			for (let i = 0; i < 10; i++) {
				this.dataList.push({
					val: `name${i}`,
					id: i,
					isClick: false
				})
			}
		},
		methods: {
			toTongji(){
				uni.navigateTo({
					url:'/pages/tuandui/tongji'
				})
			},
			yaoqing() {
				this.pop1show = true
			},
			del(item){
				console.log(item)
				this.modshow1 = true;
			},
			clickggl(i) {
				this.nowIndex = i
				this.popover1 = true
			},
			xialaClick(item) {
				// this.list.push({
				// 	val: `name${111}`,
				// 	id: 111
				// })
				uni.getSystemInfo({
					success: (res) => { // res - 各种参数
						let info = uni.createSelectorQuery().select(".i-bb");
						info.boundingClientRect((data) => { //data - 各种参数
							this.itemHeight = `${data.height*2 + 24}rpx`
							this.$set(item, 'isClick', !item.isClick)
						}).exec()
					}
				})
			},
			changePop1(e) {
				console.log(e)
				this.pop1_title = e
				this.popover1 = false
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

	.float-img2 {
		z-index: 9;
		position: fixed;
		right: 42rpx;
		bottom: 354rpx;
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

	.nav2 {
		margin: 34rpx auto 20rpx auto;
		width: 710rpx;
		height: 64rpx;
		padding: 0 32rpx 0 42rpx;
		background: rgba(255, 161, 149, 0.11);
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
	}

	.items {
		overflow-y: scroll;
		height: 1110rpx;
		width: 710rpx;
		margin: 0 auto;

		.item {
			border-radius: 10rpx;
			padding: 24rpx 32rpx;
			background: #ffffff;
			// display: flex;
			// align-items: center;
			// justify-content: space-between;
			margin-bottom: 20rpx;

			.i-nav1 {
				display: flex;
				align-items: center;
				justify-content: space-between;

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
					height: 4rpx;
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
							display: flex;
							height: 70rpx;
							color: #121212;
							border-bottom: 2rpx solid #1362fd;

							.x1 {
								width: 33%;
								line-height: 70rpx;
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

								.x2-1 {
									width: 50%;
									text-align: center;
									line-height: 70rpx;
									border: 2rpx solid #1362fd;
									font-size: 26rpx;
									background: #8bb0fb;
								}

								.x2-2 {
									width: 50%;
									text-align: center;
									line-height: 70rpx;
									border-right: 2rpx solid #1362fd;
									font-size: 26rpx;
									border-bottom: 2rpx solid #1362fd;
									border-top: 2rpx solid #1362fd;
									background: #e7efff;
								}
							}

							.x3 {
								width: 33%;
								line-height: 70rpx;
								text-align: center;
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
	.pop1{
		position: relative;
		width: 624rpx;
		height: 638rpx;
		background: #dee9ff;
		// display: flex;
		// flex-direction: column;
		// align-items: center;
		.p1-tit1{
			font-size: 36rpx;
			font-family: PingFangSC, PingFangSC-Medium;
			font-weight: 600;
			text-align: center;
			color: #121212;
			padding-top: 48rpx;
		}
		.p1-img{
			position: absolute;
			width: 132rpx;
			height: 132rpx;
			margin-top: 32rpx;
			margin-left: 246rpx;
			z-index: 9;
			border: 4rpx solid #fff;
			border-radius: 50%;
		}
		.p1-box{
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
			.txtx1{
				font-size: 30rpx;
				font-family: PingFangSC, PingFangSC-Regular;
				font-weight: 400;
				text-align: left;
				color: #0b0b0b;
				padding-top: 78rpx;
				margin-bottom: 52rpx;
			}
			.txtx2{
				display: flex;
				align-items: center;
				.xx1{
					font-size: 28rpx;
					font-family: PingFangSC, PingFangSC-Regular;
					font-weight: 400;
					color: #666666;
				}
				.xx2{
					font-size: 48rpx;
					font-family: PingFangSC, PingFangSC-Regular;
					font-weight: 400;
					text-align: left;
					color: #121212;
					// text-decoration: underline;
					border-bottom: 2rpx solid #ececec;
				}
				.myicon{
					margin-left: 6rpx;
					width: 34rpx;
					height: 34rpx;
				}
			}
		}
		.p1-tit2{
			position: absolute;
			top: 500rpx;
			left: 222rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			margin-top: 42rpx;
			.myicon2{
				width: 48rpx;
				height: 48rpx;
				margin-right: 16rpx;
			}
			.p1-txt2{
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
