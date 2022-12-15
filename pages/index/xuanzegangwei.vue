<template>
	<view class="index">
		<!-- <view class="top"></view>
		<view class="nav1">
			<u-icon @click='toBack' style='margin-right: 12rpx;' name="arrow-left" color="#000000" size="36"></u-icon>
			<view @click='toBack' class="n1-txt">选择岗位</view>
		</view> -->
		<u-navbar back-text="选择岗位" back-icon-size='36'></u-navbar>
		<view style="margin-top: calc(0rpx);" class="nav2">
			<view class="nav1-1">
				<u-icon name="search" color="#BCBCBC" size="28"></u-icon>
				<u-input v-model="keyword" type="text" placeholder='请输入岗位名称' />
			</view>
		</view>
		<view class="u-menu-wrap">
			<scroll-view scroll-y scroll-with-animation class="u-tab-view menu-scroll-view" :scroll-top="scrollTop">
				<view v-for="(item,index) in tabbar" :key="index" class="u-tab-item"
					:class="[current==index ? 'u-tab-item-active' : '',current==index+1&&current!=0?'i_jian1':'',current==index-1?'i_jia1':'']"
					:data-current="index" @tap.stop="swichMenu(index)">
					<text class="u-line-1">{{item.title}}</text>
					<view v-if="item.checkNum>0" class="numBox">{{item.checkNum}}</view>
					<view class="after"></view>
				</view>
			</scroll-view>
			<block v-for="(item,index) in tabbar" :key="index">
				<scroll-view scroll-y class="right-box" v-if="current==index">
					<view class="page-view">
						<view class="class-item" v-for="item2 in item.child" :key="item2.id">
							<view class="item-title2">
								<text>{{item2.title}}</text>
							</view>
							<view class="item-container">
								<view class="thumb-box2" v-for="item3 in item2.child" :key="item3.id">
									<view @click="changeBox(item3)" :class="{'box-right':true,'blue':item3.checked}">
										<view class="txt1">{{item3.title}}</view>
									</view>
								</view>
							</view>
						</view>
					</view>
				</scroll-view>
			</block>
		</view>

		<view v-if="footer_show" class="footer">
			<view @click="quxiao" class="b1">取消</view>
			<view @click="onSubmit" class="b2">确认</view>
		</view>
	</view>
</template>

<script>
	export default {
		watch: {
			tabbar: {
				handler() {
					var i = 0;
					this.chooseList = []
					this.tabbar.forEach(ele => {
						ele.checkNum = 0
						ele.child.forEach(ele3 => {
							ele3.checkNum = ele3.child.filter(ele4 => {
								console.log(this.idList, 'idList')
								if (this.idList.indexOf(ele4.id.toString()) > -1) {
									this.$set(ele4, 'checked', true)
								}
								if (ele4.checked) {
									this.chooseList.push(ele4)
								}
								return ele4.checked
							}).length
							ele.checkNum += ele3.checkNum
						})
						var arr = ele.child.filter(ele2 => {
							return ele2.checked
						})
						// arr.forEach(arr_item => {
						// 	this.chooseList.push(arr_item)
						// })
						// ele.checkNum = arr.length
						// console.log(ele.checkNum)
						i += ele.checkNum
						if (i > 0) {
							this.footer_show = true
						} else {
							this.footer_show = false
						}
					})
					this.idList = []
					console.log(this.chooseList)
				},
				deep: true,
				// immediate: true
			}
		},
		data() {
			return {
				keyword: "",
				footer_show: false,
				chooseList: [],
				idList:[],
				// 
				scrollTop: 0, //tab标题的滚动条位置
				current: 0, // 预设当前项的值
				menuHeight: 0, // 左边菜单的高度
				menuItemHeight: 0, // 左边菜单item的高度
				tabbar: [{
						name: '后端开发带我去多',
						items: [{
							name: 'a1-1'
						}, {
							name: 'a1-2'
						}, {
							name: 'a1-3'
						}, {
							name: 'a1-4'
						}, {
							name: 'a1-5'
						}, {
							name: 'a1-6'
						}, {
							name: 'a1-7'
						}, {
							name: 'a1-8'
						}, {
							name: 'a1-9'
						}, {
							name: 'a1-10'
						}]
					},
					{
						name: 'a2',
						items: [{
							name: 'a2-1'
						}]
					},
					{
						name: 'a3',
						items: [{
							name: 'a3-1'
						}]
					},
					{
						name: 'a4',
						items: [{
							name: 'a4-1',
							name: 'a4-2',
							name: 'a4-3',
							name: 'a4-4',
							name: 'a4-5',
							name: 'a4-6',
						}]
					}, {
						name: '后端开发带我去多',
						items: [{
							name: 'a1-1'
						}, {
							name: 'a1-1'
						}, {
							name: 'a1-1'
						}, {
							name: 'a1-1'
						}, {
							name: 'a1-1'
						}, {
							name: 'a1-1'
						}, {
							name: 'a1-1'
						}, {
							name: 'a1-1'
						}, {
							name: 'a1-1'
						}]
					},
					{
						name: 'a2',
						items: [{
							name: 'a2-1'
						}]
					},
					{
						name: 'a3',
						items: [{
							name: 'a3-1'
						}]
					},
					{
						name: 'a4',
						items: [{
							name: 'a4-1',
							name: 'a4-1',
							name: 'a4-1',
							name: 'a4-1',
							name: 'a4-1',
							name: 'a4-1',
						}]
					},
					{
						name: 'a3',
						items: [{
							name: 'a3-1'
						}]
					},
					{
						name: 'a3',
						items: [{
							name: 'a3-1'
						}]
					},
					{
						name: 'a3',
						items: [{
							name: 'a3-1'
						}]
					},
					{
						name: 'a3',
						items: [{
							name: 'a3-1'
						}]
					},
					{
						name: 'a3',
						items: [{
							name: 'a3-1'
						}]
					},
					{
						name: 'a3',
						items: [{
							name: 'a3-1'
						}]
					},
					{
						name: 'a3',
						items: [{
							name: 'a3-1'
						}]
					},
					{
						name: 'a3',
						items: [{
							name: 'a3-1'
						}]
					},
					{
						name: 'a3',
						items: [{
							name: 'a3-1'
						}]
					}
				]

			}
		},
		onShow() {
			// this.tabbar.forEach(ele => {
			// 	ele.items.forEach(ele2 => {
			// 		this.$set(ele2, 'checked', false)
			// 	})
			// })
			this.getData()
		},
		onLoad(option) {
			this.idList = option.idList.split(',')
			console.log(this.idList)
		},
		methods: {
			async getData() {
				const res = await this.$api.jobcategory({
					page: 1,
					pagesize: 1000
				})
				res.list.forEach(ele => {
					ele.child.forEach(ele2 => {
						this.$set(ele2, 'checked', false)
					})
				})
				this.tabbar = res.list
			},
			onSubmit() {
				// console.log(this.chooseList)
				let pages = getCurrentPages()
				let prevPage = pages[pages.length - 2]
				prevPage.$vm.getGangweiData(this.chooseList)
				uni.navigateBack({
					delta: 1
				})
			},
			quxiao() {
				this.tabbar.forEach(ele => {
					ele.items.forEach(ele2 => {
						this.$set(ele2, 'checked', false)
					})
				})
			},
			toBack() {
				uni.navigateBack({
					delta: 1
				})
			},
			changeBox(item) {
				console.log(item.name)
				this.$set(item, 'checked', !item.checked)
			},
			// 点击左边的栏目切换
			async swichMenu(index) {
				if (index == this.current) return;
				this.current = index;
				// 如果为0，意味着尚未初始化
				if (this.menuHeight == 0 || this.menuItemHeight == 0) {
					await this.getElRect('menu-scroll-view', 'menuHeight');
					await this.getElRect('u-tab-item', 'menuItemHeight');
				}
				// 将菜单菜单活动item垂直居中
				this.scrollTop = index * this.menuItemHeight + this.menuItemHeight / 2 - this.menuHeight / 2;
			},
			// 获取一个目标元素的高度
			getElRect(elClass, dataVal) {
				new Promise((resolve, reject) => {
					const query = uni.createSelectorQuery().in(this);
					query.select('.' + elClass).fields({
						size: true
					}, res => {
						// 如果节点尚未生成，res值为null，循环调用执行
						if (!res) {
							setTimeout(() => {
								this.getElRect(elClass);
							}, 10);
							return;
						}
						this[dataVal] = res.height;
					}).exec();
				})
			}
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
		display: flex;
		align-items: center;
		justify-content: center;
		background: #FFFFFF;

		.nav1-1 {
			background: #f4f4f5 !important;
			display: flex;
			align-items: center;
			border-radius: 30rpx;
			padding: 0 32rpx !important;
		}

		/deep/ .u-input {
			background: #f4f4f5 !important;
			border-radius: 30rpx;
			width: 578rpx;
			margin-left: 20rpx;
			// padding: 0 30rpx !important;
		}
	}

	//
	.u-wrap {
		height: calc(100vh);
		display: flex;
		flex-direction: column;
	}

	.u-search-box {
		padding: 18rpx 30rpx;
	}

	.u-menu-wrap {
		flex: 1;
		display: flex;
		overflow: hidden;
		height: calc(100vh - 248rpx - env(safe-area-inset-bottom) - env(safe-area-inset-bottom)) !important;
	}

	.u-search-inner {
		background-color: rgb(234, 234, 234);
		border-radius: 100rpx;
		display: flex;
		align-items: center;
		padding: 10rpx 16rpx;
	}

	.u-search-text {
		font-size: 26rpx;
		margin-left: 10rpx;
	}

	.u-tab-view {
		width: 218rpx;
		height: calc(100vh - 148rpx) !important;
		overflow-y: scroll;
		// background: #f8faff;
		background: #fff;
	}

	.u-tab-item {
		position: relative;
		height: 110rpx;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 28rpx;
		color: #000;
		font-weight: 400;
		line-height: 40rpx;
		background: #f8faff;

		.numBox {
			position: absolute;
			right: 10rpx;
			top: 50%;
			width: 30rpx;
			height: 30rpx;
			transform: translateY(-50%);
			background: #095bfe;
			border-radius: 50%;
			font-size: 20rpx;
			font-family: PingFangSC, PingFangSC-Regular;
			font-weight: 400;
			text-align: center;
			line-height: 30rpx;
			color: #ffffff;
		}
	}

	.u-tab-item.i_jian1 {
		background: #f8faff;
		border-radius: 0rpx 0rpx 20rpx 0rpx;
	}

	.u-tab-item.i_jia1 {
		background: #f8faff;
		border-radius: 0rpx 20rpx 0rpx 0rpx;
	}

	.u-tab-item-active {
		position: relative;
		color: #dd6161;
		background: #fff;
		font-size: 28rpx;
		font-family: PingFangSC, PingFangSC-Medium;
		font-weight: 600;
		color: #000000;

		.after {
			position: absolute;
			left: 0;
			top: 50%;
			transform: translateY(-50%);
			width: 4rpx;
			height: 32rpx;
			background: #1362fd;
		}
	}

	.u-line-1 {
		width: 156rpx;
		white-space: pre-wrap;
	}


	.u-tab-view {
		height: 100%;
	}

	.right-box {
		width: 546rpx;
		height: calc(100vh - 248rpx - env(safe-area-inset-bottom) - env(safe-area-inset-bottom));
		border-radius: 16rpx;
		background-color: #fff;
	}

	.page-view {
		// padding: 16rpx;
		padding-bottom: 20rpx;
	}

	.class-item {
		background-color: #fff;
		padding: 0 24rpx;
		border-radius: 8rpx;
	}

	.item-title {
		padding-top: 26rpx;
		font-size: 26rpx;
		font-weight: bold;
		margin-bottom: 42rpx;
		margin-left: 14rpx;
	}

	.item-title2 {
		padding-top: 26rpx;
		margin-bottom: 32rpx;
		font-size: 34rpx;
		font-family: PingFangSC, PingFangSC-Medium;
		font-weight: 600;
		color: #000000;
	}

	.item-menu-name {
		font-weight: normal;
		font-size: 24rpx;
	}

	.item-container {
		display: flex;
		flex-wrap: wrap;
		// justify-content: space-between;
	}

	.thumb-box {
		width: 33.333333%;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		// margin-top: 20rpx;
		margin-bottom: 42rpx;
	}

	.thumb-box2 {
		// width: 100%;
		display: flex;
		margin-bottom: 42rpx;

		&:nth-child(2n) {
			margin-left: 20rpx;
		}

		.item-menu-image2 {
			width: 174rpx;
			height: 124rpx;
		}

		.box-right.blue {
			background: #1362fd;

			.txt1 {
				color: #ffffff !important;
			}
		}

		.box-right {
			width: 228rpx;
			height: 64rpx;
			background: #f8faff;
			border-radius: 4rpx;

			.txt1 {
				line-height: 64rpx;
				text-align: center;
				font-size: 26rpx;
				font-family: PingFangSC, PingFangSC-Regular;
				font-weight: 400;
				color: #121212;
			}

			.txt2 {
				font-size: 20rpx;
				font-family: Segoe UI;
				font-weight: 400;
				line-height: 28rpx;
				color: #666666;
			}

			.txt3 {
				font-size: 24rpx;
				font-family: Segoe UI;
				font-weight: 400;
				line-height: 38rpx;

				color: #dd6161;
			}
		}
	}

	.item-menu-image {
		width: 125rpx;
		height: 125rpx;
		margin-bottom: 6rpx;
	}

	// 
	.footer {
		position: fixed;
		bottom: 0;
		width: 750rpx;
		height: 184rpx;
		background: #ffffff;
		box-shadow: 0rpx -4rpx 8rpx 0rpx rgba(0, 0, 0, 0.03);
		display: flex;

		.b1 {
			width: 308rpx;
			height: 72rpx;
			border: 2rpx solid #1362fd;
			border-radius: 48rpx;
			font-size: 32rpx;
			font-family: PingFangSC, PingFangSC-Medium;
			font-weight: 500;
			text-align: center;
			color: #1362fd;
			line-height: 68rpx;
			margin: 38rpx 32rpx 0 52rpx;
		}

		.b2 {
			width: 306rpx;
			height: 72rpx;
			background: #1362fd;
			border-radius: 48rpx;
			font-size: 32rpx;
			font-family: PingFangSC, PingFangSC-Medium;
			font-weight: 500;
			text-align: center;
			color: #fff;
			line-height: 72rpx;
			margin-top: 38rpx;
		}
	}
</style>
