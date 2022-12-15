<template>
	<view>
		<view class="compos">
			<view class="base-btn" @tap="show = !show" :style="btnStyle">
				<slot></slot>
			</view>

			<view class="modal" :style="{ 
					top: modalTopPos,
					opacity: show?'1' : '0',
					'z-index': show?'99999' : '-10'
				}">
				<!-- <view class="modal-ang" v-if="dotShow && btnList.length > 0" :style="direction !== 'left' ? 'left: 10px': 'right: 10px'"></view>
				<view class="modal-item" v-for="(item, index) in btnList" :index="index" :key="index" @tap="callRes(item)">
					{{item}}
				</view> -->
				<!-- <u-icon :style='{position: "absolute",top: "-50rpx",right:leftNum}' name="arrow-upward" color="#fff" size="40"></u-icon>
				<view class="flex">
					<view class="left">点击这里可以进行分享哦！</view>
					<view class="shu"></view>
					<view @click="callRes" class="right">好的</view>
				</view> -->
				<image @click="callRes" style="width: 710rpx;height: 264rpx;margin-left: 20rpx;margin-top: -30rpx;" src="/static/newImage/tabBar/bz18.png" mode=""></image>
			</view>
		</view>
	</view>
</template>

<script>
	/**
	 * :btnList				按钮列表
	 * :btnStyle			外部按钮样式
	 * :modalWidth			弹出层宽度
	 * :modalLeftPos		弹出层左定位
	 * :modalTopPos			弹出层顶定位
	 * :modalOpacity		弹出层透明度
	 * :direction			弹出层箭头位置 left right
	 * :active				默认激活状态
	 * @select				选中列表触发事件
	 * */


	export default {
		data() {
			return {
				show: this.active,
				dotShow: this.active,
				scollTop: '',
				emitObj: {
					isclose: false,
					scollTop: '',
					val: "",
				},
				shareTitle: '',
				user_id: "",
				leftNum:''
			};
		},
		watch: {
			show() {
				setTimeout(() => {
					this.dotShow = this.show;
				}, 50);
			},
			active() {
				this.show = this.active
			}
		},
		// 用户点击右上角分享转发
		onShareAppMessage: async function() {
			console.log('123456789')
			return {
				title: this.shareTitle,
				path: `/pages/qzz/zhiweixiangqin?scene=${this.post_ids}_${this.user_id}`,
			}
		},
		//用户点击右上角分享朋友圈
		onShareTimeline: async function() {
			var title = this.shareTitle; //data，return 数据title
			return {
				title: title || '',
				path: `/pages/qzz/zhiweixiangqin?scene=${this.post_ids}_${this.user_id}`,
			}
		},
		created() {
			const res = uni.getMenuButtonBoundingClientRect()
			this.leftNum = `calc(100vw - ${res.left}px - ${(res.width / 4 * 1)}px - 17rpx - 2px)`
			console.log(this.leftNum)
		},
		props: {
			btnList: {
				type: Array,
				default: () => {
					return [];
				}
			},
			btnStyle: {
				type: Object,
				default: () => {
					return {};
				}
			},
			modalWidth: {
				type: String,
				default: '15vw'
			},
			modalLeftPos: {
				type: String,
				default: '5vw'
			},
			modalTopPos: {
				type: String,
				default: '6vw'
			},
			modalOpacity: {
				type: String,
				default: '0.7'
			},
			direction: {
				type: String,
				default: 'left'
			},
			active: {
				type: Boolean,
				default: false
			},
			isFabu: {
				type: Boolean,
				default: false
			},
			isshow: {
				type: Boolean,
				default: false
			},
			num: {
				type: String,
				default: '0'
			},
			post_ids: {
				type: String,
				default: ''
			},
		},
		methods: {
			async callRes() {
				this.$emit('select', '');
			},
			closeBtn() {
				this.show = false
				this.emitObj.isclose = true
				this.$emit('select', this.emitObj);
				this.emitObj.isclose = false
			},
			getTop() {
				this.calc('.modal')
			},
			calc(dom) {
				const that = this
				const query = uni.createSelectorQuery().in(this);
				query.select(dom).boundingClientRect(data => {
					// console.log(data.top)
					that.emitObj.scollTop = data.top
					this.$emit('select', that.emitObj);
					this.show = true

				}).exec();
			},
		}
	};
</script>

<style lang="scss" scoped>
	/deep/ .uicon-arrow-upward{
		position: absolute !important;
		right: 20rpx !important;
		top: 0 !important;
	}
	.compos {
		position: relative;
		height: 0;
		z-index: 19999;

		.modal {
			position: absolute;
			border-radius: 1vw;
			transition: opacity ease-out 300ms;
			z-index: 999;
			width: 100vw;
			.flex{
				margin-left: 22rpx;
				width: 710rpx;
				height: 110rpx;
				background: #ffffff;
				border: 2rpx solid #1262fd;
				border-radius: 12rpx;
				display: flex;
				align-items: center;
			}
			.left {
				font-size: 32rpx;
				font-family: PingFangSC, PingFangSC-Regular;
				font-weight: 400;
				color: #000000;
				width: 588rpx;
				text-align: center;
			}

			.shu {
				width: 2rpx;
				height: 76rpx;
				background: #f2f2f2;
			}

			.right {
				margin-left: 32rpx;
				font-size: 32rpx;
				font-family: PingFangSC, PingFangSC-Regular;
				font-weight: 400;
				color: #000000;
			}
		}
	}

	.base-btn {
		position: relative;
		border: 0upx;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		box-sizing: border-box;
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
		background-color: #f8faff;
	}
</style>
