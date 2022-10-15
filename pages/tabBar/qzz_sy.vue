<template>
	<view class="index">
		<view class="top"></view>
		<view class="nav1">
			<view class="n1-txt">猎头导航</view>
		</view>
		<view style="margin-top: calc(176rpx + 32rpx);" class="nav2">
			<view class="n2-tit1">
				<view class="nav1-1">
					<u-icon name="search" color="#BCBCBC" size="28"></u-icon>
					<u-input v-model="keyword" type="text" placeholder='请输入岗位名称关键词' />
				</view>
				<image @click="clickPop" class="n2t1-img" src="/static/newImage/qzz/bianzu5.png" mode=""></image>
				<popover v-if="popover" class="popov" @select='changePop' :btnList='popoverList' :modalLeftPos='"-20rpx"'
					:modalTopPos='"-10rpx"' :modalOpacity='"1"' :active="popover"></popover>
				<view class="n2t1-txt">{{pop_title}}</view>
			</view>
		</view>
		<view class="nav3">
			<image class="n3-img" src="/static/newImage/qzz/bianzu11.png" mode=""></image>
			<view class="n3-txt1 rtx">名企招聘算法模型测匹配度</view>
			<view class="n3-txt2 rtx">提高应聘成功率</view>
			<view class="n3-txt3 rtx">指引职业发展方向</view>
		</view>
		<view class="nav4">
			<view class="item" @click="toXiangqin" v-for="item in 8">
				<view class="i-tit1">
					<view class="txx1">销售经理</view>
					<view class="txx2">10-20K*15薪</view>
				</view>
				<view class="i-tit2">
					<view class="txx1">天宇传媒有限公司</view>
					<view class="txx1">哈萨克斯坦</view>
				</view>
			</view>
		</view>
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
				keyword:'',
				popoverList: ['求职者', '猎头'],
				popover: false,
				pop_title: '求职者',
			}
		},
		onShow() {

		},
		onLoad() {

		},
		methods: {
			toXiangqin(){
				uni.navigateTo({
					url:'/pages/qzz/zhiweixiangqin'
				})
			},
			clickPop(){
				this.popover = true
			},
			changePop(e) {
				console.log(e)
				if(e == '猎头'){
					uni.switchTab({
						url:'/pages/tabBar/index'
					})
				}
				this.pop_title = e
				this.popover = false
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
				width: 420rpx;
				margin-left: 20rpx;
				// padding: 0 30rpx !important;
			}
			.n2t1-img{
				width: 64rpx;
				margin: 0 8rpx 0 24rpx;
				height: 64rpx;
			}
			.n2t1-txt{
				font-size: 26rpx;
				font-family: PingFangSC, PingFangSC-Regular;
				font-weight: 400;
				color: #1362fd;
			}
		}

	}
	.nav3{
		padding: 0 32rpx;
		position: relative;
		margin-top: 32rpx;
		width: 708rpx;
		height: 292rpx;
		.n3-img{
			position: absolute;
			left: 22rpx;
			top: 0;
			width: 708rpx;
			height: 292rpx;
		}
		.rtx{
			position: absolute;
			font-size: 28rpx;
			font-family: PingFangSC, PingFangSC-Regular;
			font-weight: 400;
			color: #ffffff;
		}
		.n3-txt1{
			top: 78rpx;
			right: 20rpx;
		}
		.n3-txt2{
			top: 126rpx;
			right: 20rpx;
		}
		.n3-txt3{
			top: 174rpx;
			right: 20rpx;
		}
	}
	.nav4{
		padding: 0 20rpx;
		.item{
			margin-top: 32rpx;
			padding: 36rpx 32rpx;
			background: #ffffff;
			.i-tit1{
				display: flex;
				align-items: center;
				justify-content: space-between;
				.txx1{
					font-size: 30rpx;
					font-family: PingFangSC, PingFangSC-Semibold;
					font-weight: 600;
					color: #000000;
				}
				.txx2{
					font-size: 28rpx;
					font-family: PingFangSC, PingFangSC-Semibold;
					font-weight: 600;
					color: #4281f8;
				}
			}
			.i-tit2{
				margin-top: 32rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;
				.txx1{
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
