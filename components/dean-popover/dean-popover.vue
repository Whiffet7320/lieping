<template>
	<view>
		<view class="compos">
			<view class="base-btn" @tap="show = !show" :style="btnStyle">
				<slot></slot>
			</view>

			<view class="modal" 
				:style="{ 
					top: modalTopPos,
					left: modalLeftPos,
					opacity: show?'1' : '0',
					'z-index': show?'99' : '-10'
				}"
			>
				<view class="modal-ang" v-if="dotShow && btnList.length > 0" :style="direction !== 'left' ? 'left: 10px': 'right: 10px'"></view>
				<view class="modal-item" v-for="(item, index) in btnList" :index="index" :key="index" @tap="callRes(item)">
					{{item}}
				</view>
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
			dotShow: this.active
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
		}
	},
	methods: {
		callRes(e) {
			this.$emit('select', e);
			// this.show=false;
			// this.dotShow=false;
		}
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
		transition: opacity ease-out 200ms;
		z-index: 999;
		box-shadow: 0rpx 4rpx 8rpx 0rpx rgba(0,0,0,0.11); 

		.modal-item {
			// z-index: 99;
			// height: 7vw;
			line-height: 7vw;
			color: #121212;
			text-align: center;
			border-bottom: 1px solid #ececec;
			margin-left: 2px;
			margin-right: 2px;
			padding: 18rpx 38rpx;
			font-size: 26rpx;
		}

		.modal-item:last-child {
			border-bottom: none;
		}

		// .modal-ang {
		// 	background-color: #f8faff;
		// 	position: absolute;
		// 	width: 9px;
		// 	height: 9px;
		// 	transform: rotate(45deg);
		// 	top: -3px;
		// 	border-radius: 3px;
		// }
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
</style>
