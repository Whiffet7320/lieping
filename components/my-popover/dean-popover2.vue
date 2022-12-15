<template>
	<view>
		<view class="compos">
			<view class="base-btn" @tap="show = !show" :style="btnStyle">
				<slot></slot>
			</view>

			<view class="modal" :style="{ 
					top: modalTopPos,
					left: modalLeftPos,
					opacity: show?'1' : '0',
					'z-index': show?'99999' : '-10',
					height:haveZf?'220rpx':'140rpx'
				}">
				<!-- <view class="modal-ang" v-if="dotShow && btnList.length > 0" :style="direction !== 'left' ? 'left: 10px': 'right: 10px'"></view>
				<view class="modal-item" v-for="(item, index) in btnList" :index="index" :key="index" @tap="callRes(item)">
					{{item}}
				</view> -->
				<image @click="closeBtn" class="float-img" src="/static/newImage/tabBar/zu11.png" mode="">
				</image>
				<template v-if="haveZf">
					<button style="margin-top: 50rpx;" @tap="callRes('转发')" open-type="share" class="m-tit2">转发</button>
					<view @tap="callRes('应聘')" class="m-tit3">
						<view v-if="num != '0'" class="red"></view>
						<view class="txx">应聘<text class="span">({{num}})</text></view>
					</view>
				</template>
				<template v-else>
					<view style="margin-top: 50rpx;" @tap="callRes('应聘')" class="m-tit3">
						<view v-if="num != '0'" class="red"></view>
						<view class="txx">应聘<text class="span">({{num}})</text></view>
					</view>
				</template>
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
			// const res = await this.$api.userShare({
			// 	way: 2,
			// 	product_id: this.product_id
			// });
			// // console.log(res)

			// var title = '分销商城app'; //data，return 数据title
			// return {
			// 	title: title || '',
			// 	path: `/pages/index/index?scene=0_${res.share_userid}`,
			// }
			return {
				title: '123546',
				path: `/pages/index/index?scene=0_${1}`,
			}
		},
		//用户点击右上角分享朋友圈
		onShareTimeline: async function() {
			const res = await this.$api.userShare({
				way: 2,
				product_id: this.product_id
			});
			var title = '分销商城app'; //data，return 数据title
			return {
				title: title || '',
				path: `/pages/index/index?scene=0_${res.share_userid}`,
			}
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
			num: {
				type: String,
				default: '0'
			},
			haveZf: {
				type: Boolean,
				default: false
			},
		},
		methods: {
			callRes(val) {
				this.emitObj.val = val
				this.$emit('select', this.emitObj);
				this.emitObj.val = ''
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

<style lang="scss">
	.compos {
		position: relative;
		height: 0;

		.modal {
			background-color: #f8faff;
			position: absolute;
			border-radius: 1vw;
			transition: opacity ease-out 300ms;
			z-index: 999;
			box-shadow: 0rpx 4rpx 8rpx 0rpx rgba(0, 0, 0, 0.11);
			width: calc(244rpx);
			height: 140rpx;
			padding: 0 32rpx;
			background: #f8faff;
			border-radius: 10rpx;
			box-shadow: 0rpx 6rpx 8rpx 0rpx rgba(0, 0, 0, 0.15);

			.float-img {
				width: 40rpx;
				height: 40rpx;
				position: absolute;
				right: 16rpx;
				top: 16rpx;
			}

			.m-tit1 {
				height: 70rpx;
				font-size: 28rpx;
				font-family: PingFangSC, PingFangSC-Regular;
				font-weight: 400;
				text-align: center;
				color: #b4b4b4;
				margin-top: 50rpx;
				line-height: 70rpx;
				border-bottom: 2rpx solid #efefef;
			}

			.m-tit2 {
				height: 70rpx;
				font-size: 28rpx;
				font-family: PingFangSC, PingFangSC-Regular;
				font-weight: 400;
				text-align: center;
				color: #121212;
				line-height: 70rpx;
				border-bottom: 2rpx solid #efefef;
			}

			.m-tit3 {
				height: 70rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				border-bottom: 2rpx solid #efefef;

				.red {
					width: 14rpx;
					height: 14rpx;
					background: #ff5c50;
					border-radius: 50%;
					margin-right: 12rpx;
				}

				.txx {
					font-size: 28rpx;
					font-family: PingFangSC, PingFangSC-Regular;
					font-weight: 400;
					color: #121212;

					.span {
						margin-left: 6rpx;
					}
				}
			}

			.m-tit4 {
				height: 70rpx;
				font-size: 28rpx;
				font-family: PingFangSC, PingFangSC-Regular;
				font-weight: 400;
				text-align: center;
				color: #121212;
				line-height: 70rpx;
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
