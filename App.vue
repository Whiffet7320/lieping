<script>
	export default {
		globalData: {
			spid: 0,
			code: 0
		},
		mounted() {
			// const query = uni.createSelectorQuery().in(this);
			// query.select('script').boundingClientRect(data => {
			//   console.log("得到布局位置信息" + JSON.stringify(data));
			//   console.log("节点离页面顶部的距离为" + data.top);
			// }).exec();
			// oScript.type = "text/javascript";
			// oScript.src = "https://cdn.bootcdn.net/ajax/libs/jquery/3.6.1/jquery.js";
			// document.body.appendChild(oScript);
			
		},
		// onLaunch(option) {
		// 	if (option.query.hasOwnProperty('scene')) {
		// 		switch (option.scene) {
		// 			//扫描小程序码
		// 			case 1047:
		// 				let val = this.$tool.getUrlParams(decodeURIComponent(option.query.scene));
		// 				this.globalData.code = val.pid === undefined ? val : val.pid;
		// 				break;
		// 				//长按图片识别小程序码
		// 			case 1048:
		// 				this.globalData.code = option.query.scene;
		// 				break;
		// 				//手机相册选取小程序码
		// 			case 1049:
		// 				this.globalData.code = option.query.scene;
		// 				break;
		// 				//直接进入小程序
		// 			case 1001:
		// 				this.globalData.spid = option.query.scene;
		// 				break;
		// 		}
		// 	}
		// 	const updateManager = uni.getUpdateManager();
		// 	updateManager.onCheckForUpdate(function(res) {
		// 		// 请求完新版本信息的回调
		// 	});
		// 	updateManager.onUpdateReady(function() {
		// 		uni.showModal({
		// 			title: '更新提示',
		// 			content: '新版本已经准备好，是否重启应用？',
		// 			success: function(res) {
		// 				if (res.confirm) {
		// 					// 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
		// 					updateManager.applyUpdate();
		// 				}
		// 			}
		// 		});
		// 	});
		// 	updateManager.onUpdateFailed(function() {
		// 		uni.showToast({
		// 			title:"新版本下载失败",
		// 			icon:"none"
		// 		})
		// 	});
		// },
		onShow: function(route) {
			console.log(route, 'onShow')
		},
		onHide: function() {
			console.log('App Hide')
		},
	}
</script>

<style lang="scss">
	@import "uview-ui/index.scss";
	/deep/.myTabber {
		background: #f8faff !important;
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100vw;
		z-index: 99;
	}
	/deep/ .u-navbar{
		background: #f8faff !important;
		.u-icon__icon{
			margin-left: 8rpx !important;
			font-weight: 600 !important;
			color: #000 !important;
		}
		.u-back-text{
			font-size: 36rpx !important;
			margin-left: 8rpx !important;
			font-weight: 600 !important;
			color: #000 !important;
		}
	}
	/deep/ .u-load-more-wrap{
		height: 140rpx !important;
		// .u-line-1{
		// 	color: #5DA5DB !important;
		// }
	}
	/deep/ .u-border-bottom:after {
	    border-bottom-width: 0px !important;
	}
	/deep/ .u-badge {
		    top: -2rpx !important;
		    right: 0px !important;
	}
	page {
		font-family: PingFang SC;
	}

	/deep/ .u-line-1 {
		font-size: 24rpx;
	}
</style>
