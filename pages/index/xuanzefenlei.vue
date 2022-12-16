<template>
	<view class="index">
		<!-- <view class="top"></view>
		<view class="nav1">
			<u-icon @click='toBack' style='margin-right: 12rpx;' name="arrow-left" color="#000000" size="36"></u-icon>
			<view @click='toBack' class="n1-txt">选择行业</view>
		</view> -->
		<u-navbar back-text="选择行业" back-icon-size='36'></u-navbar>
		<!-- <view style="margin-top: calc(0rpx);" class="nav2">
			<view class="nav1-1">
				<u-icon name="search" color="#BCBCBC" size="28"></u-icon>
				<u-input v-model="keyword" type="text" placeholder='请输入岗位名称' />
			</view>
		</view> -->
		<view class="u-menu-wrap">
			<scroll-view scroll-y scroll-with-animation class="u-tab-view menu-scroll-view" :scroll-top="scrollTop">
				<view v-for="(item,index) in tabbar" :key="index" class="u-tab-item"
					:class="[current==index ? 'u-tab-item-active' : '',current==index+1&&current!=0?'i_jian1':'',current==index-1?'i_jia1':'']"
					:data-current="index" @tap.stop="swichMenu(index)">
					<text class="u-line-1">{{item.title}}</text>
					<view v-if="item.checkNum>0" class="numBox">{{item.checkNum}}</view>
					<view class="after"></view>
				</view>
				<view style="width: 100%;height: 220rpx;background-color: #f8faff;">

				</view>
			</scroll-view>
			<block v-for="(item,index) in tabbar" :key="index">
				<scroll-view scroll-y class="right-box" v-if="current==index">
					<view class="page-view">
						<view class="class-item" v-for="(item2,index2) in item.items" :key="index2">
							<view class="item-title2">
								<text>{{item2.title}}</text>
							</view>
							<view class="item-container">
								<view class="thumb-box2">
									<view @click="quanxuan(item2)" :class="{'box-right':true}">
										<!-- <view class="txt1">全部{{item2.title}}</view> -->
										<view class="txt1">全部</view>
										<!-- <u-icon style='margin-left: 8rpx;' v-if='item3.list && item3.list.length>0'
											name="arrow-down-fill" color="#000000" size="18"></u-icon>
										<view v-if="item3.checkNum>0" class="numBox">{{item3.checkNum}}</view> -->
									</view>
								</view>
								<view class="thumb-box2" v-for="(item3,index3) in item2.child" :key="item3.id">
									<view @click="changeBox(item3,index3,index2,index)"
										:class="{'box-right':true,'blue':item3.checked}">
										<view class="txt1">{{item3.title}}</view>
										<u-icon style='margin-left: 8rpx;' v-if='item3.child && item3.child.length>0'
											:name="item3.isDK ? 'arrow-up-fill':'arrow-down-fill'" color="#000000"
											size="18"></u-icon>
										<view v-if="item3.checkNum>0" class="numBox">{{item3.checkNum}}</view>
									</view>
								</view>
							</view>
						</view>
						<view style="height: 184rpx;width: 100rpx;"></view>
					</view>
				</scroll-view>
			</block>
		</view>

		<view v-if="footer_show" class="footer">
			<view @click="quxiao" class="b1">取消</view>
			<view @click="onSubmit" class="b2">确认</view>
		</view>
		<u-popup @close='qd' v-model="pop1Show" border-radius='32' mode="bottom">
			<view class="pop1">
				<view class="p1-nav1">
					<view @click="qx" class="x1"></view>
					<!-- <view @click="qx" class="x1">取消</view> -->
					<view @click="qd" class="x2">确定</view>
				</view>
				<view class="heng"></view>
				<view class="p1-items">
					<view @click="quanxuan2" :class="{'p1-item':true}">
						全部{{item3.title}}
					</view>
					<view @click="changeBox1(item)" :class="{'p1-item':true,'blue':item.checked}"
						v-for="item in bottomList" :key='item.id'>
						{{item.title}}
					</view>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	export default {
		// watch: {
		// 	tabbar: {
		// 		handler() {
		// 			var i = 0;
		// 			this.chooseList = []
		// 			this.tabbar.forEach(ele => {
		// 				ele.checkNum = 0
		// 				if (!ele.items) {
		// 					return
		// 				}
		// 				var arr = ele.items.filter(ele2 => {
		// 					return ele2.checked
		// 				})
		// 				ele.items.forEach(ele3 => {
		// 					if (ele3.child && ele3.child.length > 0) {
		// 						ele3.checkNum = ele3.child.filter(ele4 => {
		// 							console.log(this.idList, 'idList')
		// 							if (this.idList.indexOf(ele4.id.toString()) > -1) {
		// 								this.$set(ele4, 'checked', true)
		// 							}
		// 							return ele4.checked
		// 						}).length
		// 						if (ele3.checkNum != undefined) {
		// 							ele.checkNum += ele3.checkNum
		// 							ele3.child.forEach(ele4 => {
		// 								if (ele4.child && ele4.child.length > 0) {
		// 									ele4.checkNum = ele4.child.filter(ele5 => {
		// 										return ele5.checked
		// 									}).length
		// 									if (ele4.checkNum != undefined) {
		// 										ele.checkNum += ele4.checkNum
		// 									}
		// 									ele4.child.forEach(ele5 => {
		// 										console.log(ele5.id, 'ele5-id')
		// 										if (this.idList.indexOf(ele5.id
		// 												.toString()) > -1) {
		// 											this.$set(ele5, 'checked', true)
		// 											this.$forceUpdate()
		// 										}
		// 										if (ele5.checked) {
		// 											this.chooseList.push(ele5)
		// 										}
		// 									})
		// 								}
		// 								if (ele4.checked) {
		// 									this.chooseList.push(ele4)
		// 								}
		// 							})
		// 						}
		// 					}
		// 				})
		// 				arr.forEach(arr_item => {
		// 					this.chooseList.push(arr_item)
		// 				})
		// 				ele.checkNum += arr.length
		// 				i += ele.checkNum
		// 				console.log(arr, 'arr')
		// 				console.log(this.chooseList)
		// 				if (i > 0) {
		// 					this.footer_show = true
		// 				} else {
		// 					this.footer_show = false
		// 				}
		// 			})
		// 			console.log(this.isOnshow, 'show')
		// 			if (this.isOnshow) {
		// 				console.log('hahahahah', i)
		// 				this.watchTabbar()
		// 				// this.isOnshow = false
		// 			}
		// 		},
		// 		// deep: true,
		// 	},

		// 	// item: {
		// 	// 	handler() {
		// 	// 		for (let key in this.item) {
		// 	// 			this.oldItem[key] = this.item[key]
		// 	// 			if (key == 'list') {
		// 	// 				this.item[key].forEach((ele,i)=>{
		// 	// 					for (let key2 in ele) {
		// 	// 						this.oldItem[key][i][key2] = ele[key2]
		// 	// 					}
		// 	// 				})
		// 	// 			}
		// 	// 		}
		// 	// 	},
		// 	// 	deep: true,
		// 	// }
		// },
		data() {
			return {
				isOnshow: true,
				pop1Show: false,
				keyword: "",
				footer_show: false,
				chooseList: [],
				bottomList: [],
				item: {},
				oldItem: {},
				idList: [],
				// 
				scrollTop: 0, //tab标题的滚动条位置
				current: 0, // 预设当前项的值
				menuHeight: 0, // 左边菜单的高度
				menuItemHeight: 0, // 左边菜单item的高度
				tabbar: [],
				item3: {},
				i2: -1,
				i3: 0,
				numList: [],
				zongNum:0,
			}
		},
		onShow() {
			this.getData()
		},
		onLoad(option) {
			this.idList = option.idList.split(',')
			this.numList = option.numList.split(',')
			this.chooseList2 = JSON.parse(option.hangyeList);
			console.log(this.idList, this.numList, this.chooseList2)
			if (this.chooseList2.length > 0) {
				this.footer_show = true
			} else {
				this.footer_show = false
			}
		},
		methods: {
			async getData() {
				const res = await this.$api.industryscategory({
					page: 1,
					pagesize: 1000,
					parent_id: 0,
				})
				res.list.forEach(async ele => {
					const res2 = await this.$api.industryscategory({
						page: 1,
						pagesize: 1000,
						parent_id: ele.id,
					})
					ele.items = res2.list
					this.$set(ele, 'checked', false)
					ele.items.forEach(ele2 => {
						this.$set(ele2, 'checked', false)
						if (ele2.child && ele2.child.length > 0) {
							ele2.child.forEach(ele3 => {
								this.$set(ele3, 'checked', false)
								this.$set(ele3, 'isDK', false)
								if (ele3.child && ele3.child.length > 0) {
									ele3.child.forEach(ele4 => {
										this.$set(ele4, 'checked', false)
									})
								}
							})
						}
					})
				})
				this.tabbar = res.list
				console.log(this.tabbar, 'onshow')
				this.numList.forEach((num, i) => {
					this.$set(this.tabbar[i], 'checkNum', num)
				})
				uni.showToast({
					icon: 'loading',
					duration: 1000,
				});
				setTimeout(() => {
					// this.watchTabbar()
					this.wat1()
				}, 1000)
			},
			wat1() {
				// var i = 0;
				console.log(this.i3)
				var ele = this.tabbar[this.i3]
				ele.chooseList = []
				ele.checkNum = ele.items[0].child.filter(ele4 => {
					if (ele4.checked) {
						ele.chooseList.push(ele4)
					}
					console.log(this.idList, 'idList')
					if (this.idList.indexOf(ele4.id.toString()) > -1) {
						this.$set(ele4, 'checked', true)
					}
					return ele4.checked
				}).length
				console.log(ele.checkNum, 'eleNum')
				// i += ele.checkNum
				// if (i > 0 || this.chooseList2.length > 0) {
				// 	this.footer_show = true
				// } else {
				// 	this.footer_show = false
				// }
				// console.log(i, 'iii')
				console.log(ele.chooseList, 'chooseList')
				this.seeNum()
			},
			wat2() {
				var i = 0;
				console.log(this.i3)
				var ele = this.tabbar[this.i3]
				ele.chooseList = []
				ele.checkNum = ele.items[0].child.filter(ele4 => {
					if (ele4.checked) {
						ele.chooseList.push(ele4)
					}
					return ele4.checked
				}).length
				if(ele.checkNum == ele.items[0].child.length){
					ele.chooseList.push({
						title: ele.items[0].title,
						id: -1,
					})
				}
				console.log(ele.checkNum, 'eleNum')
				// i += ele.checkNum
				// if (i > 0 || this.chooseList2.length > 0) {
				// 	this.footer_show = true
				// } else {
				// 	this.footer_show = false
				// }
				// console.log(i, 'iii')
				console.log(ele.chooseList, 'chooseList')
				this.seeNum()
			},
			seeNum(){
				var a = this.tabbar.filter(ele=>{
					return ele.checkNum && ele.checkNum>0
				})
				if(a.length>0){
					this.footer_show = true
				}else{
					this.footer_show = false
				}
			},
			watchTabbar() {
				var i = 0;
				this.chooseList = []
				this.tabbar.forEach(ele => {
					ele.checkNum = 0
					if (!ele.items) {
						return
					}
					var arr = ele.items.filter(ele2 => {
						return ele2.checked
					})
					ele.items.forEach(ele3 => {
						if (ele3.child && ele3.child.length > 0) {
							ele3.checkNum = ele3.child.filter(ele4 => {
								console.log(this.idList, 'idList')
								if (this.idList.indexOf(ele4.id.toString()) > -1) {
									this.$set(ele4, 'checked', true)
								}
								return ele4.checked
							}).length
							if (ele3.checkNum != undefined) {
								console.log(ele3.checkNum, 'ele3Num', ele)
								if (ele3.checkNum == ele.items[0].child.length) {
									this.chooseList.push({
										title: ele.items[0].title,
										id: -1,
									})
								}
								ele.checkNum += ele3.checkNum
								ele3.child.forEach(ele4 => {
									if (ele4.child && ele4.child.length > 0) {
										ele4.checkNum = ele4.child.filter(ele5 => {
											return ele5.checked
										}).length
										if (ele4.checkNum != undefined) {
											ele.checkNum += ele4.checkNum
										}
										ele4.child.forEach(ele5 => {
											// if (this.idList.indexOf(ele5.id.toString()) > -
											// 	1) {
											// 	this.$set(ele5, 'checked', true)
											// }
											if (ele5.checked) {
												this.chooseList.push(ele5)
											}
										})
									}
									if (ele4.checked) {
										this.chooseList.push(ele4)
									}
								})
							}
						}
					})
					arr.forEach(arr_item => {
						this.chooseList.push(arr_item)
					})
					ele.checkNum += arr.length
					i += ele.checkNum
					console.log(this.chooseList)
					if (i > 0) {
						this.footer_show = true
					} else {
						this.footer_show = false
					}
				})
			},
			onSubmit() {
				this.chooseList = []
				var numList = []
				this.tabbar.forEach(ele => {
					if (ele.checkNum) {
						numList.push(ele.checkNum)
					} else {
						numList.push(0)
					}
					if (ele.chooseList) {
						ele.chooseList.forEach(ele2 => {
							this.chooseList.push(ele2)
						})
					}
				})
				let pages = getCurrentPages()
				let prevPage = pages[pages.length - 2]
				console.log(numList, 'numList')
				console.log(this.chooseList, 'zong Choose')
				var zongChoose = [...this.chooseList, ...this.chooseList2]
				var finalList = []
				zongChoose.forEach(el => {
					if (!finalList.some(e => e.id == el.id)) {
						finalList.push(el);
					}
				});
				console.log(finalList);
				prevPage.$vm.getHangyeData(finalList)
				prevPage.$vm.getNumList(numList)
				uni.navigateBack({
					delta: 1
				})
			},
			quxiao() {
				// this.tabbar.forEach(ele => {
				// 	ele.items.forEach(ele2 => {
				// 		this.$set(ele2, 'checked', false)
				// 	})
				// })
				uni.navigateBack({
					delta: 1
				})
			},
			qx() {
				this.pop1Show = false
				this.$set(this.item3, 'isDK', false)
				this.wat2()
			},
			qd() {
				this.pop1Show = false
				this.$set(this.item3, 'isDK', false)
				this.wat2()
			},
			toBack() {
				let pages = getCurrentPages()
				let prevPage = pages[pages.length - 2]
				// console.log(this.chooseList)
				prevPage.$vm.getHangyeData(this.chooseList)
				uni.navigateBack({
					delta: 1
				})
			},
			quanxuan2() {
				this.item3.child.forEach(ele => {
					this.$set(ele, 'checked', true)
				})
				this.wat2()
			},
			quanxuan(item) {
				console.log(item)
				this.iitem = item
				item.child.forEach(ele => {
					if (ele.child.length > 0) {
						ele.child.forEach(ele2 => {
							this.$set(ele2, 'checked', true)
						})
					} else {
						this.$set(ele, 'checked', true)
					}
				})
				this.wat2()
			},
			changeBox1(item) {
				this.$set(item, 'checked', !item.checked)
				this.wat2()
			},
			changeBox(item, i, i2, i3) {
				this.item3 = item
				console.log(this.item3, 'item3')
				this.$set(item, 'isDK', true)
				if (item.child.length > 0) {
					this.bottomList = item.child ? item.child : [];
					this.pop1Show = true
					this.$set(item, 'isDK', !item.checked)
				} else {
					this.$set(item, 'checked', !item.checked)
					this.chooseList2 = this.chooseList2.filter(elee => {
						console.log(elee.id, item.id, 'idd')
						return elee.id != item.id
					})
					console.log(this.chooseList2, 'chooseList2')
					// if (this.chooseList2.indexOf(item.id.toString()) > -1) {

					// }
				}
				console.log(this.item3, 'item33')
				this.i3 = i3
				this.i2 = i2
				this.wat2()
			},
			// 点击左边的栏目切换
			async swichMenu(index) {
				if (index == this.current) return;
				this.current = index;
				this.i3 = index;
				// 如果为0，意味着尚未初始化
				if (this.menuHeight == 0 || this.menuItemHeight == 0) {
					await this.getElRect('menu-scroll-view', 'menuHeight');
					await this.getElRect('u-tab-item', 'menuItemHeight');
				}
				// 将菜单菜单活动item垂直居中
				this.scrollTop = index * this.menuItemHeight + this.menuItemHeight / 2 - this.menuHeight / 2;
				this.wat1()
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
	.pop1 {
		padding: 0 28rpx;

		.p1-nav1 {
			margin: 28rpx 32rpx 0 32rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;

			.x1 {
				font-size: 32rpx;
				font-family: PingFangSC, PingFangSC-Regular;
				font-weight: 400;
				color: #999999;
			}

			.x2 {
				font-size: 32rpx;
				font-family: PingFangSC, PingFangSC-Regular;
				font-weight: 400;
				color: rgba(0, 0, 0, 0.87);
			}
		}

		.heng {
			margin: 28rpx 0;
			width: 696rpx;
			height: 2rpx;
			background: #ececec;
		}

		.p1-items {
			display: flex;
			align-items: center;
			flex-wrap: wrap;
			margin-bottom: 72rpx;

			.p1-item {
				width: 220rpx;
				height: 64rpx;
				background: #f8faff;
				border-radius: 4rpx;
				font-size: 26rpx;
				font-family: PingFangSC, PingFangSC-Regular;
				font-weight: 400;
				text-align: center;
				color: #121212;
				line-height: 64rpx;
				margin-top: 16rpx;

				&:nth-child(3n-1) {
					margin-left: 16rpx;
					margin-right: 16rpx;
				}
			}

			.p1-item.blue {
				background: #095bfe;
				color: #ffffff;
			}
		}
	}

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
		height: calc(100vh - 314rpx + 160rpx) !important;
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
		height: calc(100vh - 314rpx + 160rpx);
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
			padding: 18rpx 10rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			// height: 64rpx;
			background: #f8faff;
			border-radius: 4rpx;
			position: relative;

			.numBox {
				position: absolute;
				right: 10rpx;
				top: 50%;
				width: 30rpx;
				height: 30rpx;
				transform: translateY(-80%);
				background: #095bfe;
				border-radius: 50%;
				font-size: 20rpx;
				font-family: PingFangSC, PingFangSC-Regular;
				font-weight: 400;
				text-align: center;
				line-height: 30rpx;
				color: #ffffff;
			}

			.txt1 {
				// line-height: 64rpx;
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
