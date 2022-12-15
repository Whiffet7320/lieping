<template>
	<view class="index">
		<!-- <view class="top"></view>
		<view class="nav1">
			<u-icon @click='toBack' style='margin-right: 12rpx;' name="arrow-left" color="#000000" size="36"></u-icon>
			<view @click='toBack' class="n1-txt">应聘</view>
		</view> -->
		<u-navbar back-text="应聘" back-icon-size='36'></u-navbar>
		<view style="margin-top: calc(20rpx);margin-bottom: 70rpx;" class="nav2">
			<view class="n2-box1">
				<view class="n2t1-txt">基本条件</view>
				<view class="bbox">
					<view class="txt1">第一学历</view>
					<view class="txt2">{{dataObj.first_education}}</view>
					<view style="margin-top: 44rpx;" class="txt1">最高学历</view>
					<view class="txt2">{{dataObj.highest_education}}</view>
					<view style="margin-top: 44rpx;" class="txt1">是否{{dataObj2.foreignlanguage_name}}听说读写熟练</view>
					<view class="txt2">{{dataObj.english_skilled == 1 ? '是' : '否'}}</view>
					<view style="margin-top: 44rpx;" class="txt1">是否熟练掌握:{{dataObj2.essentialskills_keywords}}</view>
					<view class="txt2">{{dataObj.technology_mastery == 1 ? '是' : '否'}}</view>
					<view style="margin-top: 44rpx;" class="txt1">是否年薪在{{dataObj2.salary_range}}万范围内</view>
					<view class="txt2">
						{{dataObj.yearly_salary == 1 ? '范围内' : dataObj.yearly_salary == 2 ? '高于上限' : '低于下限'}}
					</view>
					<view style="margin-top: 44rpx;" class="txt1">年龄</view>
					<view class="txt2">{{dataObj.ages}}岁</view>
					<view style="margin-top: 44rpx;" class="txt1">共有几段公司经历</view>
					<view class="txt2">{{dataObj.work_num}}段</view>
				</view>
			</view>
			<view style="margin-top: 48rpx;" class="n2-box1">
				<view class="n2t1-txt">工作经历</view>
				<view class="bbox">
					<view v-for="(item,i) in dataObj.mywork_experience" :key='i'>
						<view :style="{'margin-top':i>0 ? '48rpx' : '0rpx'}" class="tt">
							第{{i==0?'一':i==1?'二':i==2?'三':'四'}}段工作经历</view>
						<view style="margin-top: 30rpx;" class="txt1">公司名称</view>
						<view class="txt2">{{item.com_name}}</view>
						<template v-if="dataObj2.is_industrysegmentation == 1">
							<view style="margin-top: 44rpx;" class="txt1">
								是否属于{{dataObj2.industrysegmentation_name}}行业</view>
							<view class="txt2">
								{{item.is_internetindustry==1 ? '是':'否'}}</view>
						</template>
						<template v-else>
							<view style="margin-top: 44rpx;" class="txt1">所属行业</view>
							<view class="txt2">{{item.industry_name}}</view>
						</template>
						<view style="margin-top: 44rpx;" class="txt1">公司规模（人数）</view>
						<view class="txt2">{{item.com_size}}</view>
						<view style="margin-top: 44rpx;" class="txt1">在这家公司工作多长时间</view>
						<view class="txt2">{{item.work_year}}年{{item.work_month}}月</view>
						<view style="margin-top: 44rpx;" class="txt1">岗位名称</view>
						<view class="txt2">{{item.job_name}}</view>
					</view>
				</view>
			</view>
			<view v-if="dataObj2.scope1_keywords !=''||dataObj2.scope2_keywords !=''||dataObj2.scope3_keywords !=''"
				style="margin-top: 48rpx;" class="n2-box1">
				<view class="bbox">
					<view style="font-size: 32rpx;" class="tt">哪几段工作经历积累了以下丰富经验</view>
					<view v-if="dataObj2.scope1_keywords !=''" style="margin-top: 30rpx;" class="txt1">
						1.{{dataObj2.is_scope1 == 0 ? '任意即可':'必须全部'}}：{{dataObj2.scope1_keywords}}</view>
					<view class="txt2">{{dataObj.myrisk_advert}}</view>
					<view v-if="dataObj2.scope2_keywords !=''" style="margin-top: 44rpx;" class="txt1">
						2.{{dataObj2.is_scope2 == 0 ? '任意即可':'必须全部'}}：{{dataObj2.scope2_keywords}}</view>
					<view class="txt2">{{dataObj.riskmanagement_advertisement}}</view>
					<view v-if="dataObj2.scope3_keywords !=''" style="margin-top: 44rpx;" class="txt1">
						3.{{dataObj2.is_scope3 == 0 ? '任意即可':'必须全部'}}：{{dataObj2.scope3_keywords}}</view>
					<view class="txt2">{{dataObj.riskmanagement_advertisement3}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id: '',
				post_id: "",
				dataObj: {},
				dataObj2: {}
			}
		},
		onShow() {

		},
		onLoad(option) {
			this.id = option.id;
			this.post_id = option.post_id;
			console.log(this.id)
			this.getDHdata()
			this.getData()
		},
		methods: {
			async getDHdata() {
				const res = await this.$api.postnavigation_view({
					post_id: this.post_id
				})
				this.dataObj2 = res.postnavigation
			},
			async getData() {
				const res = await this.$api.compost_candidateview({
					id: this.id
				})
				var arr = []
				if (res.candidate_view.risk_advert.indexOf('1') > -1) {
					arr.push('第一段')
				}
				if (res.candidate_view.risk_advert.indexOf('2') > -1) {
					arr.push('第二段')
				}
				if (res.candidate_view.risk_advert.indexOf('3') > -1) {
					arr.push('第三段')
				}
				if (res.candidate_view.risk_advert.indexOf('4') > -1) {
					arr.push('第四段')
				}
				var arr2 = []
				if (res.candidate_view.riskmanagement_advertisement.indexOf('1') > -1) {
					arr2.push('第一段')
				}
				if (res.candidate_view.riskmanagement_advertisement.indexOf('2') > -1) {
					arr2.push('第二段')
				}
				if (res.candidate_view.riskmanagement_advertisement.indexOf('3') > -1) {
					arr2.push('第三段')
				}
				if (res.candidate_view.riskmanagement_advertisement.indexOf('4') > -1) {
					arr2.push('第四段')
				}
				res.candidate_view.myrisk_advert = arr.toString()
				res.candidate_view.myriskmanagement_advertisement = arr2.toString()
				this.dataObj = res.candidate_view
				this.dataObj.mywork_experience = this.dataObj.work_experience.filter(ele => {
					return ele.com_name != ''
				})
			},
			toBack() {
				uni.navigateBack({
					delta: 1
				})
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
	/deep/ .u-navbar {
		background: #f8faff;
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
		background: #f8faff;
	}

	.nav1 {
		z-index: 1000;
		position: fixed;
		top: 88rpx;
		background: #f8faff;
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
		.n2-box1 {
			.n2t1-txt {
				margin-left: 52rpx;
				font-size: 36rpx;
				font-family: PingFangSC, PingFangSC-Medium;
				font-weight: 600;
				color: #000000;
			}

			.bbox {
				background: #ffffff;
				border-radius: 20rpx;
				margin: 32rpx 20rpx 0 20rpx;
				padding: 52rpx 32rpx;

				.tt {
					font-size: 36rpx;
					font-family: PingFangSC, PingFangSC-Medium;
					font-weight: 600;
					color: #000000;
				}

				.txt1 {
					font-size: 28rpx;
					font-family: PingFangSC, PingFangSC-Regular;
					font-weight: 400;
					color: #6c6c6c;
				}

				.txt2 {
					margin-top: 16rpx;
					font-size: 32rpx;
					font-family: PingFangSC, PingFangSC-Regular;
					font-weight: 400;
					color: #000000;
				}
			}
		}

	}
</style>
