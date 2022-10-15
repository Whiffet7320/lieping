<template>
	<view class="index">
		<view class="nav1">
			<view id="current" class="nav1-1">
				<u-icon style='margin-right: 6rpx;' name="search" color="#BCBCBC" size="28"></u-icon>
				<u-input @input='changeInp' clearable style='width: 460rpx !important;' v-model="keyword" type="text"
					placeholder='请输入城市名、拼音或首字母查询' />
			</view>
			<view @click="toBack"
				style="margin-left: 32rpx;font-size: 28rpx;font-family: PingFangSC, PingFangSC-Regular;font-weight: 400;color: #000000;">
				取消
			</view>
		</view>
		<view class="nav2">
			<view @click="onSelect(item)" class="item" v-for="item in filterArr" :key='item'>
				<u-icon name="map" color="#434343" size="30"></u-icon>
				<view class="tx">{{item}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	import pinyin from 'pinyin'
	import cityData from './cityData.js'
	import countryData from './countryList.js'
	import countryDataPing from './country-code.js'
	export default {
		props: {
			isGuonei: {
				type: Boolean
			},
		},
		data() {
			return {
				keyword: '',
				cityData,
				arr: [],
				filterArr: [],
				countryDataPing,
				countryData,
				countryList: [],
				guowaiArr: [],
			}
		},
		created() {
			// 国内
			this.arr = []
			this.cityData.forEach(ele => {
				ele.list.forEach(ele2 => {
					this.arr.push(ele2)
				})
			})
			this.guowaiArr = []
			// 国外
			var obj1 = {
				name: '亚洲',
				pingList: [],
				Shouping: [],
			}
			var obj2 = {
				name: '北美洲',
				pingList: [],
				Shouping: [],
			}
			var obj3 = {
				name: '南美洲',
				pingList: [],
				Shouping: [],
			}
			var obj4 = {
				name: '大洋洲',
				pingList: [],
				Shouping: [],
			}
			var obj5 = {
				name: '欧洲',
				pingList: [],
				Shouping: [],
			}
			var obj6 = {
				name: '非洲',
				pingList: [],
				Shouping: [],
			}
			this.countryData.forEach(ele => {
				this.countryDataPing.forEach(ele2 => {
					if (ele2.cn == ele.country_cname) {
						ele.pinYinInitial = ele2.pinYinInitial
					}
				})
				if (ele.pinYinInitial) {
					if (ele.continent_name == 'AS') {
						obj1.Shouping.push(ele.pinYinInitial)
						obj1.Shouping = [...new Set(obj1.Shouping)]
						obj1.Shouping.sort((a, b) => {
							return a.toLowerCase().localeCompare(b.toLowerCase());
						})
						var index = obj1.pingList.findIndex(item => item.pinY == ele.pinYinInitial)
						if (index == -1) { //说明arr中不存在id为objid的对象
							obj1.pingList.push({
								pinY: ele.pinYinInitial,
								list: [ele]
							})
						} else {
							obj1.pingList[index].list.push(ele)
						}
					} else if (ele.continent_name == 'NA') {
						obj2.Shouping.push(ele.pinYinInitial)
						obj2.Shouping = [...new Set(obj2.Shouping)]
						obj2.Shouping.sort((a, b) => {
							return a.toLowerCase().localeCompare(b.toLowerCase());
						})
						var index = obj2.pingList.findIndex(item => item.pinY == ele.pinYinInitial)
						if (index == -1) { //说明arr中不存在id为objid的对象
							obj2.pingList.push({
								pinY: ele.pinYinInitial,
								list: [ele]
							})
						} else {
							obj2.pingList[index].list.push(ele)
						}
					} else if (ele.continent_name == 'SA') {
						obj3.Shouping.push(ele.pinYinInitial)
						obj3.Shouping = [...new Set(obj3.Shouping)]
						obj3.Shouping.sort((a, b) => {
							return a.toLowerCase().localeCompare(b.toLowerCase());
						})
						var index = obj3.pingList.findIndex(item => item.pinY == ele.pinYinInitial)
						if (index == -1) { //说明arr中不存在id为objid的对象
							obj3.pingList.push({
								pinY: ele.pinYinInitial,
								list: [ele]
							})
						} else {
							obj3.pingList[index].list.push(ele)
						}
					} else if (ele.continent_name == 'OA') {
						obj4.Shouping.push(ele.pinYinInitial)
						obj4.Shouping = [...new Set(obj4.Shouping)]
						obj4.Shouping.sort((a, b) => {
							return a.toLowerCase().localeCompare(b.toLowerCase());
						})
						var index = obj4.pingList.findIndex(item => item.pinY == ele.pinYinInitial)
						if (index == -1) { //说明arr中不存在id为objid的对象
							obj4.pingList.push({
								pinY: ele.pinYinInitial,
								list: [ele]
							})
						} else {
							obj4.pingList[index].list.push(ele)
						}
					} else if (ele.continent_name == 'EU') {
						obj5.Shouping.push(ele.pinYinInitial)
						obj5.Shouping = [...new Set(obj5.Shouping)]
						obj5.Shouping.sort((a, b) => {
							return a.toLowerCase().localeCompare(b.toLowerCase());
						})
						var index = obj5.pingList.findIndex(item => item.pinY == ele.pinYinInitial)
						if (index == -1) { //说明arr中不存在id为objid的对象
							obj5.pingList.push({
								pinY: ele.pinYinInitial,
								list: [ele]
							})
						} else {
							obj5.pingList[index].list.push(ele)
						}
					} else if (ele.continent_name == 'AF') {
						obj6.Shouping.push(ele.pinYinInitial)
						obj6.Shouping = [...new Set(obj6.Shouping)]
						obj6.Shouping.sort((a, b) => {
							return a.toLowerCase().localeCompare(b.toLowerCase());
						})
						var index = obj6.pingList.findIndex(item => item.pinY == ele.pinYinInitial)
						if (index == -1) { //说明arr中不存在id为objid的对象
							obj6.pingList.push({
								pinY: ele.pinYinInitial,
								list: [ele]
							})
						} else {
							obj6.pingList[index].list.push(ele)
						}
					}
				}
			})

			this.countryList = [obj1, obj2, obj3, obj4, obj5, obj6]
			this.countryList.forEach(ele => {
				ele.pingList.forEach(ele2 => {
					ele2.list.forEach(ele3 => {
						this.guowaiArr.push(ele3.country_cname)
					})
				})
			})
			console.log(this.guowaiArr)
		},
		methods: {
			// 点击城市
			onSelect(city) {
				this.city = city;
				this.$emit('onSelect', city)
			},
			changeInp() {
				var input = this.keyword; //searchValue为input中的v-model参数
				if (input != '') {
					//生成input正则表达式进行模糊匹配
					let inputArr = input.split("");
					let str = "(.*?)"; //正则条件
					let regStr = str + inputArr.join(str) + str;
					// 以12为例生成的正则表达式为/(.*?)1(.*?)2(.*?)/i
					let reg = RegExp(regStr, "i");
					//过滤数组
					if (this.isGuonei) {
						this.filterArr = this.arr.filter((data) => {
							if (data.indexOf(input) != -1) {
								return data.indexOf(input) != -1
							} else {
								//keys获取数组可迭代属性，some方法遍历所有属性进行存在验证
								return Object.keys(data).some((key) => {
									//将汉字属性转换成字符串数组
									let dataPyArr = pinyin(data[key], {
										style: "normal"
									});
									//将字符串数组转成字符串
									let dataPy = dataPyArr.join('')
									//搜索内容和每个value值 匹配
									return reg.test(dataPy)
								});
							}
						});
					}else{
						this.filterArr = this.guowaiArr.filter((data) => {
							if (data.indexOf(input) != -1) {
								return data.indexOf(input) != -1
							} else {
								//keys获取数组可迭代属性，some方法遍历所有属性进行存在验证
								return Object.keys(data).some((key) => {
									//将汉字属性转换成字符串数组
									let dataPyArr = pinyin(data[key], {
										style: "normal"
									});
									//将字符串数组转成字符串
									let dataPy = dataPyArr.join('')
									//搜索内容和每个value值 匹配
									return reg.test(dataPy)
								});
							}
						});
					}

				} else {
					this.filterArr = []
				}
			},
			toBack() {
				uni.navigateBack({
					delta: 1
				})
			},
		}
	}
</script>

<style>
	page {
		background: #f8faff;
	}
</style>
<style lang="scss" scoped>
	.index {
		background: #FFFFFF;
		position: relative;
	}

	.nav1 {
		// position: fixed;
		// top: 176rpx;
		padding-top: 32rpx;
		display: flex;
		align-items: center;
		margin: 0 32rpx 10rpx 32rpx;
		background: #fff !important;
		;
	}

	.nav1-1 {
		background: #F8FAFF !important;
		display: flex;
		align-items: center;
		border-radius: 30rpx;
		padding: 0 32rpx !important;
	}

	.nav2 {
		max-height: calc(100vh - 300rpx);
		overflow-y: scroll;
		// margin-top: 300rpx;
		background: #ffffff;
		padding: 0 38rpx;

		.item {
			height: 86rpx;
			display: flex;
			align-items: center;
			border-bottom: 2rpx solid #ececec;

			&:last-child {
				border-bottom: 0;
			}

			.tx {
				font-size: 28rpx;
				font-family: PingFangSC, PingFangSC-Regular;
				font-weight: 400;
				color: #121212;
				line-height: 40rpx;
				margin-left: 22rpx;
			}
		}

	}
</style>
