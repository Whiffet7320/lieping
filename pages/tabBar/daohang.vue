<template>
	<view class="index">
		<u-tabbar active-color="#121212" icon-size='60' height='120' mid-button-size="150" v-model="current"
			:list="tabbarlist" :mid-button="true"></u-tabbar>
	</view>
</template>

<script>
	export default{
		data(){
			return {
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
						// pagePath: "/pages/tabBar/daohang"
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
				current: 2
			}
		},
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
</style>
