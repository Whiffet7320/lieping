<template>
	<view class="index">
		<!-- <view class="top"></view>
		<view class="nav1">
			<u-icon @click='toBack' style='margin-right: 12rpx;' name="arrow-left" color="#000000" size="36"></u-icon>
			<view @click='toBack' class="n1-txt">匹配度报告</view>
		</view> -->
		<u-navbar back-text="匹配度报告" back-icon-size='36'></u-navbar>
		<view style="margin-top: calc(24rpx);" class="nav2">
			<view class="n2-tit1">
				<view class="l">
					<view class="box1"></view>
					<view class="txx1">有要求</view>
				</view>
				<view class="c">
					<view class="box1">
						<u-icon style='transform: translateY(2rpx);' name="checkmark" color="#fff" size="20"></u-icon>
					</view>
					<view class="txx1">匹配</view>
				</view>
				<view class="r">
					<view class="box1">
						<u-icon style='transform: translateY(2rpx);' name="close" color="#fff" size="18"></u-icon>
					</view>
					<view class="txx1">不匹配</view>
				</view>
			</view>
		</view>
		<view class="nav3">
			<view class="tit1">基本条件</view>
			<view class="n3-table">
				<view class="t1" v-if="dataObj.firstdegree_match != -1">
					<view class="t1-1">第一学历</view>
					<view class="t1-2">
						<u-icon v-if='dataObj.firstdegree_match == 1' name="checkmark" color="#fff" size="40"></u-icon>
						<u-icon v-else-if='dataObj.firstdegree_match == 0' name="close" color="#fff" size="36"></u-icon>
					</view>
				</view>
				<view class="t1" v-if="dataObj.foreignlanguages_match != -1">
					<view class="t1-1">外语</view>
					<view class="t1-2">
						<u-icon v-if='dataObj.foreignlanguages_match == 1' name="checkmark" color="#fff" size="40">
						</u-icon>
						<u-icon v-else-if='dataObj.foreignlanguages_match == 0' name="close" color="#fff" size="36"></u-icon>
					</view>
				</view>
				<view class="t1" v-if="dataObj.otherskills_match != -1">
					<view class="t1-1">其他技能</view>
					<view class="t1-2">
						<u-icon v-if='dataObj.otherskills_match == 1' name="checkmark" color="#fff" size="40"></u-icon>
						<u-icon v-else-if='dataObj.otherskills_match == 0' name="close" color="#fff" size="36"></u-icon>
					</view>
				</view>
				<view class="t1" v-if="dataObj.ages_match != -1">
					<view class="t1-1">年龄</view>
					<view class="t1-2">
						<u-icon v-if='dataObj.ages_match == 1' name="checkmark" color="#fff" size="40"></u-icon>
						<u-icon v-else-if='dataObj.ages_match == 0' name="close" color="#fff" size="36"></u-icon>
					</view>
				</view>
				<view class="t1" v-if="dataObj.salary_match != -1">
					<view class="t1-1">薪酬</view>
					<view class="t1-2">
						<u-icon v-if='dataObj.salary_match == 1' name="checkmark" color="#fff" size="40"></u-icon>
						<u-icon v-else-if='dataObj.salary_match == 0' name="close" color="#fff" size="36"></u-icon>
					</view>
				</view>
			</view>
			<view style="margin-top: 48rpx;" class="tit1">工作经历</view>
			<view class="n3-table2" v-for="(item,i) in dataObj.workexperience" :key='i'>
				<view class="t1">
					<view class="t1-1">
						<view class="t-top">模型</view>
						<view class="t-top">{{item.model_name}}</view>
					</view>
					<view class="t1-2">行业</view>
					<view class="t1-2">公司</view>
					<view class="t1-2">专业</view>
					<view class="t1-2">职级</view>
				</view>
				<view class="t1" v-if='item.match_list[0]'>
					<view class="t2-1">第一段</view>
					<view v-if="item.match_list[0].industry_match == -1" :class="{'t2-2':true,'active':false}"></view>
					<view v-else :class="{'t2-2':true,'active':true}">
						<u-icon v-if="item.match_list[0].industry_match == 1" name="checkmark" color="#fff" size="40">
						</u-icon>
						<u-icon v-if="item.match_list[0].industry_match == 0" name="close" color="#fff" size="36">
						</u-icon>
					</view>
					<view v-if="item.match_list[0].company_match == -1" :class="{'t2-2':true,'active':false}"></view>
					<view v-else :class="{'t2-2':true,'active':true}">
						<u-icon v-if="item.match_list[0].company_match == 1" name="checkmark" color="#fff" size="40">
						</u-icon>
						<u-icon v-if="item.match_list[0].company_match == 0" name="close" color="#fff" size="36">
						</u-icon>
					</view>
					<view v-if="item.match_list[0].major_match == -1" :class="{'t2-2':true,'active':false}"></view>
					<view v-else :class="{'t2-2':true,'active':true}">
						<u-icon v-if="item.match_list[0].major_match == 1" name="checkmark" color="#fff" size="40">
						</u-icon>
						<u-icon v-if="item.match_list[0].major_match == 0" name="close" color="#fff" size="36"></u-icon>
					</view>
					<view v-if="item.match_list[0].rank_match == -1" :class="{'t2-2':true,'active':false}"></view>
					<view v-else :class="{'t2-2':true,'active':true}">
						<u-icon v-if="item.match_list[0].rank_match == 1" name="checkmark" color="#fff" size="40">
						</u-icon>
						<u-icon v-if="item.match_list[0].rank_match == 0" name="close" color="#fff" size="36"></u-icon>
					</view>
				</view>
				<view class="t1" v-if='item.match_list[1]'>
					<view class="t2-1">第二段</view>
					<view v-if="item.match_list[1].industry_match == -1" :class="{'t2-2':true,'active':false}"></view>
					<view v-else :class="{'t2-2':true,'active':true}">
						<u-icon v-if="item.match_list[1].industry_match == 1" name="checkmark" color="#fff" size="40">
						</u-icon>
						<u-icon v-if="item.match_list[1].industry_match == 0" name="close" color="#fff" size="36">
						</u-icon>
					</view>
					<view v-if="item.match_list[1].company_match == -1" :class="{'t2-2':true,'active':false}"></view>
					<view v-else :class="{'t2-2':true,'active':true}">
						<u-icon v-if="item.match_list[1].company_match == 1" name="checkmark" color="#fff" size="40">
						</u-icon>
						<u-icon v-if="item.match_list[1].company_match == 0" name="close" color="#fff" size="36">
						</u-icon>
					</view>
					<view v-if="item.match_list[1].major_match == -1" :class="{'t2-2':true,'active':false}"></view>
					<view v-else :class="{'t2-2':true,'active':true}">
						<u-icon v-if="item.match_list[1].major_match == 1" name="checkmark" color="#fff" size="40">
						</u-icon>
						<u-icon v-if="item.match_list[1].major_match == 0" name="close" color="#fff" size="36"></u-icon>
					</view>
					<view v-if="item.match_list[1].rank_match == -1" :class="{'t2-2':true,'active':false}"></view>
					<view v-else :class="{'t2-2':true,'active':true}">
						<u-icon v-if="item.match_list[1].rank_match == 1" name="checkmark" color="#fff" size="40">
						</u-icon>
						<u-icon v-if="item.match_list[1].rank_match == 0" name="close" color="#fff" size="36"></u-icon>
					</view>
				</view>
				<view class="t1" v-if='item.match_list[2]'>
					<view class="t2-1">第三段</view>
					<view v-if="item.match_list[2].industry_match == -1" :class="{'t2-2':true,'active':false}"></view>
					<view v-else :class="{'t2-2':true,'active':true}">
						<u-icon v-if="item.match_list[2].industry_match == 1" name="checkmark" color="#fff" size="40">
						</u-icon>
						<u-icon v-if="item.match_list[2].industry_match == 0" name="close" color="#fff" size="36">
						</u-icon>
					</view>
					<view v-if="item.match_list[2].company_match == -1" :class="{'t2-2':true,'active':false}"></view>
					<view v-else :class="{'t2-2':true,'active':true}">
						<u-icon v-if="item.match_list[2].company_match == 1" name="checkmark" color="#fff" size="40">
						</u-icon>
						<u-icon v-if="item.match_list[2].company_match == 0" name="close" color="#fff" size="36">
						</u-icon>
					</view>
					<view v-if="item.match_list[2].major_match == -1" :class="{'t2-2':true,'active':false}"></view>
					<view v-else :class="{'t2-2':true,'active':true}">
						<u-icon v-if="item.match_list[2].major_match == 1" name="checkmark" color="#fff" size="40">
						</u-icon>
						<u-icon v-if="item.match_list[2].major_match == 0" name="close" color="#fff" size="36"></u-icon>
					</view>
					<view v-if="item.match_list[2].rank_match == -1" :class="{'t2-2':true,'active':false}"></view>
					<view v-else :class="{'t2-2':true,'active':true}">
						<u-icon v-if="item.match_list[2].rank_match == 1" name="checkmark" color="#fff" size="40">
						</u-icon>
						<u-icon v-if="item.match_list[2].rank_match == 0" name="close" color="#fff" size="36"></u-icon>
					</view>
				</view>
				<view class="t1" v-if='item.match_list[3]'>
					<view class="t2-1">第四段</view>
					<view v-if="item.match_list[3].industry_match == -1" :class="{'t2-2':true,'active':false}"></view>
					<view v-else :class="{'t2-2':true,'active':true}">
						<u-icon v-if="item.match_list[3].industry_match == 1" name="checkmark" color="#fff" size="40">
						</u-icon>
						<u-icon v-if="item.match_list[3].industry_match == 0" name="close" color="#fff" size="36">
						</u-icon>
					</view>
					<view v-if="item.match_list[3].company_match == -1" :class="{'t2-2':true,'active':false}"></view>
					<view v-else :class="{'t2-2':true,'active':true}">
						<u-icon v-if="item.match_list[3].company_match == 1" name="checkmark" color="#fff" size="40">
						</u-icon>
						<u-icon v-if="item.match_list[3].company_match == 0" name="close" color="#fff" size="36">
						</u-icon>
					</view>
					<view v-if="item.match_list[3].major_match == -1" :class="{'t2-2':true,'active':false}"></view>
					<view v-else :class="{'t2-2':true,'active':true}">
						<u-icon v-if="item.match_list[3].major_match == 1" name="checkmark" color="#fff" size="40">
						</u-icon>
						<u-icon v-if="item.match_list[3].major_match == 0" name="close" color="#fff" size="36"></u-icon>
					</view>
					<view v-if="item.match_list[3].rank_match == -1" :class="{'t2-2':true,'active':false}"></view>
					<view v-else :class="{'t2-2':true,'active':true}">
						<u-icon v-if="item.match_list[3].rank_match == 1" name="checkmark" color="#fff" size="40">
						</u-icon>
						<u-icon v-if="item.match_list[3].rank_match == 0" name="close" color="#fff" size="36"></u-icon>
					</view>
				</view>
			</view>
		</view>

		<view class="nav4">
			匹配结果：{{dataObj.jobs_matchstatus == 0 ? '不建议应聘' : dataObj.jobs_matchstatus == 1 ? '建议应聘' : dataObj.jobs_matchstatus == 2 ? '有要求' : '待定' }}
		</view>
		<view class="nav5">我已阅读并同意<text style="color: #1362FD;" @click="toXieyi">用户协议</text></view>
		<view @click="onSubmit" :class="{'btn':true,'no':isYPed}">应聘</view>
		<view style="width: 100vw;height: 110rpx;"></view>
		<u-popup border-radius='32' width='676' height='540' closeable mode='center' v-model="pop1">
			<view class="pop1">
				<view class="p1-tit1">您的称呼</view>
				<view class="p1-tit2">
					<u-input :clearable='false' style='width: 200rpx;' v-model="name" placeholder='请输入您的姓名' type="text"
						:border="false" />
					<view class="flex">
						<view v-if="isXS" @click="isXS = false" class="circle"></view>
						<u-icon @click="isXS = false" v-else style="transform: translateY(2rpx);"
							name="checkmark-circle-fill" color="#1362FD" size="24"></u-icon>
						<view @click="isXS = false" class="c-txt">先生</view>
						<view @click="isXS = true" v-if="!isXS" style="margin-left: 40rpx;" class="circle"></view>
						<u-icon @click="isXS = true" v-else style="margin-left: 40rpx;transform: translateY(2rpx);"
							name="checkmark-circle-fill" color="#1362FD" size="24"></u-icon>
						<view @click="isXS = true" class="c-txt">女士</view>
					</view>
				</view>
				<view class="inp1">
					<u-input v-model="mobile" type="text" :clearable='false' placeholder='请输入手机号' />
				</view>
				<view class="inp2box">
					<view class="inp2">
						<u-input v-model="yzm" style='width: 100rpx;' type="text" :clearable='false' placeholder='请输入验证码' />
					</view>
					<view @click='getCode' class="txt1">{{tips}}</view>
				</view>
				<view @click="onSubmit2" class="p1-btn">应聘</view>
			</view>
		</u-popup>
		<u-verification-code seconds="60" ref="uCode" @change="codeChange">
		</u-verification-code>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				yzm:"",
				tips:'',
				isYPed: false,
				isHave: true,
				pop1: false,
				name: "",
				isXS: '',
				candidate_id: "",
				post_id: "",
				mobile: "",
				dataObj: {}
			}
		},
		onShow() {

		},
		onLoad(option) {
			this.post_id = option.post_id
			this.candidate_id = option.candidate_id
			this.getData()
		},
		methods: {
			codeChange(text) {
				this.tips = text;
			},
			async getCode() {
				if (this.$refs.uCode.canGetCode) {
					// 模拟向后端请求验证码
					uni.showLoading({
						title: '正在获取验证码'
					})
					const res = await this.$api.sendsms({
						mobile: this.mobile,
						type:2
					})
					if (res.result == 1) {
						uni.hideLoading();
						this.$u.toast('验证码已发送');
						this.$refs.uCode.start();
					} else {
						this.$u.toast(res.msg);
					}
			
				} else {
					this.$u.toast('倒计时结束后再发送');
				}
			},
			async getData() {
				const res = await this.$api.jobpost_candidateanalysis({
					post_id: this.post_id,
					candidate_id: this.candidate_id,
				})
				this.dataObj = res
				const res2 = await this.$api.acceptjobs_view({
					post_id: this.post_id,
				})
				this.mobile = res2.candidate_mobile;
				this.name = res2.candidate_realname;
				this.isXS = res2.candidate_issex == 1 ? true : false
			},
			toBack() {
				uni.navigateBack({
					delta: 1
				})
			},
			onSubmit() {
				if (this.isYPed) {
					return
				}
				this.pop1 = true
			},
			toXieyi() {
				uni.navigateTo({
					url: '/pages/wode/yonghuxieyi'
				})
			},
			async onSubmit2() {
				const res = await this.$api.acceptjobs_operation({
					post_id: this.post_id,
					realname: this.name,
					is_sex: this.isXS ? 2 : 1,
					jobs_matchstatus: this.dataObj.jobs_matchstatus,
					mobile: this.mobile,
					code:this.yzm
				})
				if (res.result == 1) {
					uni.showToast({
						title: '已发送应聘申请',
						duration: 1500,
						success: (res) => {
							console.log(res)
							this.pop1 = false;
							this.isYPed = true;
						}
					});
				} else {
					uni.showToast({
						icon: 'error',
						title: res.msg,
						duration: 1500,
					});
				}

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
	.inp2box {
		display: flex;
		align-items: center;
		justify-content: space-between;
		.inp2 {
			border-radius: 10rpx;
			background: #FFFFFF;
		}
	
		.txt1 {
			// margin-left: 52rpx;
			font-size: 24rpx;
			color: #ffffff;
			padding: 6rpx 10rpx;
			background: #19be6b;
			border-radius: 10rpx;
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

	/deep/ .u-icon__icon {
		font-weight: 800 !important;
	}

	.nav2 {
		padding: 0 52rpx;

		.n2-tit1 {
			display: flex;
			align-items: center;
			justify-content: space-between;

			.l {
				display: flex;
				align-items: center;

				.box1 {
					width: 82rpx;
					height: 28rpx;
					background: #3db682;
				}

				.txx1 {
					margin-left: 20rpx;
					font-size: 26rpx;
					font-family: PingFangSC, PingFangSC-Regular;
					font-weight: 400;
					color: #707070;
				}
			}

			.c {
				display: flex;
				align-items: center;

				.box1 {
					width: 82rpx;
					height: 28rpx;
					background: #3db682;
					display: flex;
					align-items: center;
					justify-content: center;
				}

				.txx1 {
					margin-left: 20rpx;
					font-size: 26rpx;
					font-family: PingFangSC, PingFangSC-Regular;
					font-weight: 400;
					color: #707070;
				}
			}

			.r {
				display: flex;
				align-items: center;

				.box1 {
					width: 82rpx;
					height: 28rpx;
					background: #3db682;
					display: flex;
					align-items: center;
					justify-content: center;
				}

				.txx1 {
					margin-left: 20rpx;
					font-size: 26rpx;
					font-family: PingFangSC, PingFangSC-Regular;
					font-weight: 400;
					color: #707070;
				}
			}
		}
	}

	.nav3 {
		width: 710rpx;
		// height: 1020rpx;
		background: #ffffff;
		border-radius: 20rpx;
		margin: 20rpx auto 0 auto;
		padding: 48rpx 32rpx;

		.tit1 {
			font-size: 36rpx;
			font-family: PingFangSC, PingFangSC-Medium;
			font-weight: 600;
			color: #000000;
		}

		.n3-table {
			margin-top: 24rpx;

			.t1 {
				height: 74rpx;
				display: flex;
				align-items: center;
				border-top: 2rpx solid #c6c6c6;
				border-left: 2rpx solid #c6c6c6;
				border-right: 2rpx solid #c6c6c6;

				&:nth-last-child(1) {
					height: 72rpx;
					border-top: 2rpx solid #c6c6c6;
					border-bottom: 2rpx solid #c6c6c6;
					.t1-2 {
						height: 70rpx;
						width: 50%;
						font-size: 26rpx;
						font-family: PingFangSC, PingFangSC-Regular;
						font-weight: 400;
						text-align: center;
						color: #707070;
						line-height: 72rpx;
						background: #3db682;
					}
				}

				.t1-1 {
					width: 50%;
					font-size: 26rpx;
					font-family: PingFangSC, PingFangSC-Regular;
					font-weight: 400;
					text-align: center;
					color: #707070;
					line-height: 74rpx;
					border-right: 2rpx solid #c6c6c6;
				}

				.t1-2 {
					height: 72rpx;
					width: 50%;
					font-size: 26rpx;
					font-family: PingFangSC, PingFangSC-Regular;
					font-weight: 400;
					text-align: center;
					color: #707070;
					line-height: 74rpx;
					background: #3db682;
				}
			}
		}

		.n3-table2 {
			margin-top: 24rpx;

			.t1 {
				display: flex;
				align-items: center;
				border-top: 2rpx solid #c6c6c6;
				border-left: 2rpx solid #c6c6c6;
				border-right: 2rpx solid #c6c6c6;

				&:nth-last-child(1) {
					border-bottom: 2rpx solid #c6c6c6;
				}

				.t1-1 {
					width: 20%;
					height: 88rpx;
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: center;
					border-right: 2rpx solid #c6c6c6;

					.t-top {
						font-size: 26rpx;
						font-family: PingFangSC, PingFangSC-Regular;
						font-weight: 400;
						text-align: center;
						color: #707070;
					}
				}

				.t1-2 {
					width: 20%;
					font-size: 26rpx;
					font-family: PingFangSC, PingFangSC-Regular;
					font-weight: 400;
					text-align: center;
					color: #707070;
					line-height: 88rpx;
					border-right: 2rpx solid #c6c6c6;

					&:nth-last-child(1) {
						border-right: 0;
					}
				}

				.t2-1 {
					height: 74rpx;
					width: 20%;
					font-size: 26rpx;
					font-family: PingFangSC, PingFangSC-Regular;
					font-weight: 400;
					text-align: center;
					color: #707070;
					line-height: 74rpx;
					border-right: 2rpx solid #c6c6c6;
				}

				.t2-2 {
					width: 20%;
					display: flex;
					align-items: center;
					justify-content: center;
					border-right: 2rpx solid #c6c6c6;

					&:nth-last-child(1) {
						border-right: 0;
					}
				}

				.t2-2.active {
					transform: translateY(-0rpx);
					height: 74rpx;
					text-align: center;
					background: #3db682;
				}
			}
		}
	}

	.nav4 {
		margin-top: 54rpx;
		font-size: 32rpx;
		font-family: PingFangSC, PingFangSC-Regular;
		font-weight: 400;
		text-align: center;
		color: #ff5c50;
	}

	.nav5 {
		font-size: 28rpx;
		font-family: PingFangSC, PingFangSC-Regular;
		font-weight: 400;
		text-align: center;
		color: #b2b2b2;
		line-height: 40rpx;
		margin-top: 20rpx;
	}

	.btn {
		margin: 20rpx auto 0 auto;
		width: 570rpx;
		height: 96rpx;
		background: #1362fd;
		border-radius: 48rpx;
		font-size: 32rpx;
		font-family: PingFangSC, PingFangSC-Medium;
		font-weight: 500;
		text-align: center;
		color: #ffffff;
		line-height: 96rpx;
	}

	.btn.no {
		background: #bcbcbc;
	}

	.pop1 {
		padding: 0 80rpx;

		.p1-tit1 {
			padding-top: 108rpx;
			font-size: 32rpx;
			font-family: PingFangSC, PingFangSC-Regular;
			font-weight: 400;
			color: #454545;
		}

		.p1-tit2 {
			margin-top: 30rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;

			.flex {
				display: flex;
				align-items: center;

				.circle {
					width: 24rpx;
					height: 24rpx;
					border: 2rpx solid #979797;
					border-radius: 50%;
				}

				.c-txt {
					margin-left: 16rpx;
					font-size: 28rpx;
					font-family: PingFangSC, PingFangSC-Regular;
					font-weight: 400;
					color: #454545;
				}
			}

		}

		.p1-btn {
			width: 254rpx;
			height: 64rpx;
			background: #1362fd;
			border-radius: 48rpx;
			margin: 52rpx auto 0 auto;
			font-size: 32rpx;
			font-family: PingFangSC, PingFangSC-Medium;
			font-weight: 500;
			text-align: center;
			color: #ffffff;
			line-height: 64rpx;
		}
	}
</style>
