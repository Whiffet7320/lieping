<template>
	<view class="index">
		<u-toast ref="uToast" />
		<!-- <view class="top"></view>
		<view class="nav1">
			<u-icon @click='toBack' style='margin-right: 12rpx;' name="arrow-left" color="#000000" size="36"></u-icon>
			<view @click='toBack' class="n1-txt">设置导航</view>
		</view> -->
		<u-navbar back-text="设置导航" back-icon-size='36'></u-navbar>
		<view style="margin-top: calc(16rpx);" class="nav2">
			<view class="n2-tit1">行业背景</view>
			<view class="n2-box">
				<view class="n2b-tit1">行业分类<text class="red">*不限</text></view>
				<view class="n2b-tit2" @click="toHangye">
					<view :class="{'l-txt1':true,'gray':hangyeValue == ''}">
						{{hangyeValue == '' ? '请选择行业分类' : hangyeValue}}
					</view>
					<u-icon name="play-right-fill" color="#000000" size="20"></u-icon>
				</view>
				<view class="heng"></view>
				<view class="n2b-tit3">是否限定细分行业，且在分类中无细分选项，比如只看光伏组件行业</view>
				<view class="n2b-btns">
					<view class="b1" @click="isYes = true">
						<view class="b1-txt1">是</view>
						<view v-if="!isYes" class="circle"></view>
						<u-icon v-else name="checkmark-circle-fill" color="#2979ff" size="24"></u-icon>
					</view>
					<view @click="isNoyes" style="margin-left: 42rpx;" class="b1">
						<view class="b1-txt1">否</view>
						<view v-if="isYes" class="circle"></view>
						<u-icon v-else name="checkmark-circle-fill" color="#2979ff" size="24"></u-icon>
					</view>
				</view>
				<template v-if="isYes">
					<view style="margin-top: 38rpx;" class="n2b-tit1">写明限定的细分目标行业<text class="red">*必填</text></view>
					<view class="n2b-tit3">
						<u-input maxlength='12' style='width: 588rpx;min-height: 54rpx;' :clearable='false'
							placeholder='请输入限定的细分目标行业' v-model="industrysegmentation_name" type="text" />
						<view @click="clickZk(industrysegmentation_name)" v-if='industrysegmentation_name.length > 16'
							class="zk">展开</view>
					</view>
					<view style="margin-top: 0;" class="heng"></view>
					<view style="margin-top: 38rpx;" class="n2b-tit1">行业关键词<text class="red">*必填</text></view>
					<view class="n2b-tit3">
						<view class="lt2-txt">任意</view>
						<view class="shu"></view>
						<u-input :style="{width: industry_keywords.length>0?'466rpx':'520rpx'}"  :clearable='false' placeholder='如硅料,石油…,多个关键词用逗号隔开'
							v-model="industry_keywords" type="text" />
						<view @click="clickZk(industry_keywords)" v-if='industry_keywords.length > 16' class="zk">展开
						</view>
					</view>
					<view style="margin-top: 4rpx;" class="heng"></view>
				</template>

			</view>
		</view>
		<view class="nav2 nav3">
			<view class="n2-tit1">公司背景</view>
			<view class="n2-box">
				<view class="n2b-tit1">公司规模</view>
				<!-- <view class="n2b-tit2">
					<view class="l-txt1">大数据行业应用，大数据风控，大数dsadas据广告大数据广告</view>
					<u-icon name="play-right-fill" color="#000000" size="20"></u-icon>
				</view> -->
				<view class="n2b-tit2" @click='seleShow2_1 = true'>
					<view :class="{'l-txt1':true,'gray':sele2_1_val == ''}">
						{{sele2_1_val == '' ? '选择公司规模' : sele2_1_val}}
					</view>
					<u-select title='公司规模' @confirm="confirm2_1" :default-value="def2_1" v-model="seleShow2_1" :list="sele2_1"></u-select>
					<u-icon name="play-right-fill" color="#000000" size="20"></u-icon>
				</view>
				<view class="heng"></view>
				<view style="margin-top: 38rpx;" class="n2b-tit1">目标公司（简称）</view>
				<view class="n2b-tit3">
					<view class="lt2-txt">仅限</view>
					<view class="shu"></view>
					<u-input :style="{width: target_company.length>0?'466rpx':'520rpx'}"  :clearable='false' placeholder='请输入目标公司,多个关键词用逗号隔开' v-model="target_company" type="text" />
					<view @click="clickZk(target_company)" v-if='target_company.length > 16' class="zk">展开</view>
				</view>
				<view style="margin-top: 4rpx;" class="heng"></view>
			</view>
		</view>
		<view class="nav2 nav3 nav4">
			<view class="n2-tit1">岗位背景</view>
			<view class="n2-box">
				<view class="n2b-tit1">岗位名称中专业方向关键词<text class="red">*此处不要写职级</text></view>
				<view class="n2b-tit3">
					<view class="lt2-txt">任意</view>
					<view class="shu"></view>
					<u-input :style="{width: postname_keywords.length>0?'466rpx':'520rpx'}" :clearable='false' placeholder='如财务,销售…,多个关键词用逗号隔开'
						v-model="postname_keywords" type="text" />
					<view @click="clickZk(postname_keywords)" v-if='postname_keywords.length > 16' class="zk">展开</view>
				</view>
				<view style="margin-top: 4rpx;" class="heng"></view>
				<view style="margin-top: 38rpx;" class="n2b-tit1">岗位职级<text class="red">*基础岗位，如专员、主管不要填</text></view>
				<view class="n2b-tit3">
					<view class="lt2-txt">任意</view>
					<view class="shu"></view>
					<u-input :style="{width: jobtitle_keywords.length>0?'466rpx':'520rpx'}" :clearable='false' placeholder='如经理,总监…,多个关键词用逗号隔开'
						v-model="jobtitle_keywords" type="text" />
					<view @click="clickZk(jobtitle_keywords)" v-if='jobtitle_keywords.length > 16' class="zk">展开</view>
				</view>
				<view style="margin-top: 4rpx;" class="heng"></view>
				<!--  -->
				<view style="margin-top: 38rpx;" class="n2b-tit1">职责范围关键词1<text class="red">*如要求有总部经验</text></view>
				<view class="n2b-tit3">
					<view @click="popover1 = !popover1" class="lt2-txt">{{pop1_title}}
						<u-icon style='margin-left: 8rpx;transform: rotate(90deg);' name="play-right-fill"
							color="#000000" size="20"></u-icon>
					</view>
					<view class="shu"></view>
					<u-input :style="{width: scope1_keywords.length>0?'466rpx':'520rpx'}"  :clearable='false' placeholder='请输入职责关键词,多个关键词用逗号隔开' v-model="scope1_keywords"
						type="text" />
					<view @click="clickZk(scope1_keywords)" v-if='scope1_keywords.length > 16' class="zk">展开</view>
				</view>
				<view style="margin-top: 4rpx;" class="heng"></view>
				<popover @select='changePop1' :btnList='popoverList1' :modalLeftPos='"-20rpx"' :modalTopPos='"-10rpx"'
					:modalOpacity='"1"' :active="popover1"></popover>
				<!--  -->
				<view style="margin-top: 38rpx;" class="n2b-tit1">职责范围关键词2<text class="red">*如要求有指定区域经验</text></view>
				<view class="n2b-tit3">
					<view @click="popover2 = !popover2" class="lt2-txt">{{pop2_title}}
						<u-icon style='margin-left: 8rpx;transform: rotate(90deg);' name="play-right-fill"
							color="#000000" size="20"></u-icon>
					</view>
					<view class="shu"></view>
					<u-input :style="{width: scope2_keywords.length>0?'466rpx':'520rpx'}"  :clearable='false' placeholder='请输入职责关键词,多个关键词用逗号隔开' v-model="scope2_keywords"
						type="text" />
					<view @click="clickZk(scope2_keywords)" v-if='scope2_keywords.length > 16' class="zk">展开</view>
				</view>
				<view style="margin-top: 4rpx;" class="heng"></view>
				<popover @select='changePop2' :btnList='popoverList1' :modalLeftPos='"-20rpx"' :modalTopPos='"-10rpx"'
					:modalOpacity='"1"' :active="popover2"></popover>
				<!--  -->
				<view style="margin-top: 38rpx;" class="n2b-tit1">职责范围关键词3<text class="red">*如要求有具体业务经验</text></view>
				<view class="n2b-tit3">
					<view @click="popover3 = !popover3" class="lt2-txt">{{pop3_title}}
						<u-icon style='margin-left: 8rpx;transform: rotate(90deg);' name="play-right-fill"
							color="#000000" size="20"></u-icon>
					</view>
					<view class="shu"></view>
					<u-input :style="{width: scope3_keywords.length>0?'466rpx':'520rpx'}"  :clearable='false' placeholder='请输入职责关键词,多个关键词用逗号隔开' v-model="scope3_keywords"
						type="text" />
					<view @click="clickZk(scope3_keywords)" v-if='scope3_keywords.length > 16' class="zk">展开</view>
				</view>
				<view style="margin-top: 4rpx;" class="heng"></view>
				<popover @select='changePop3' :btnList='popoverList1' :modalLeftPos='"-20rpx"' :modalTopPos='"-10rpx"'
					:modalOpacity='"1"' :active="popover3"></popover>
				<!--  -->
				<view @click="toGangwei" style="margin-top: 38rpx;" class="n2b-tit1">岗位分类<text class="red">*不限</text>
				</view>
				<view class="n2b-tit2" @click="toGangwei">
					<view class="l-txt1">{{gangweiValue}}</view>
					<u-icon name="play-right-fill" color="#000000" size="20"></u-icon>
				</view>
				<view class="heng" @click="toGangwei"></view>
			</view>
		</view>


		<view style="padding-bottom: 220rpx;" class="nav2 nav3 nav4">
			<view class="n2-tit1">基本条件</view>
			<view class="n2-box">
				<view class="n2b-tit1">第一学历<text class="red">*必选</text></view>
				<view class="n2b-tit2" @click='seleShow4_1 = true'>
					<view :class="{'l-txt1':true,'gray':sele4_1_val == ''}">
						{{sele4_1_val == '' ? '请选择学历要求' : sele4_1_val}}
					</view>
					<u-select title='第一学历' @confirm="confirm4_1" :default-value="def4_1" v-model="seleShow4_1" :list="sele4_1"></u-select>
					<u-icon name="play-right-fill" color="#000000" size="20"></u-icon>
				</view>
				<view class="heng"></view>
				<!--  -->
				<view style="margin-top: 38rpx;" class="n2b-tit1">硕博要求</view>
				<view class="n2b-tit2" @click='seleShow4_2 = true'>
					<view :class="{'l-txt1':true,'gray':sele4_2_val == ''}">
						{{sele4_2_val == '' ? '请选择学历要求' : sele4_2_val}}
					</view>
					<u-select title='硕博要求' @confirm="confirm4_2" :default-value="def4_2" v-model="seleShow4_2" :list="sele4_2"></u-select>
					<u-icon name="play-right-fill" color="#000000" size="20"></u-icon>
				</view>
				<view class="heng"></view>
				<!--  -->
				<view style="margin-top: 38rpx;" class="n2b-tit1">学科专业</view>
				<view class="n2b-tit3">
					<view class="lt2-txt">任意</view>
					<view class="shu"></view>
					<u-input :style="{width: discipline.length>0?'466rpx':'520rpx'}" :clearable='false' placeholder='多个关键词用逗号隔开' v-model="discipline" type="text" />
					<view @click="clickZk(discipline)" v-if='discipline.length > 16' class="zk"
						style="margin-left: 38rpx;">展开
					</view>
				</view>
				<view style="margin-top: 4rpx;" class="heng"></view>
				<!--  -->
				<view style="margin-top: 38rpx;display: flex;align-items: center;" class="n2b-tit1">外语
					<image @click="foreignlanguage_name = '';sele4_3_val=''"
						style="margin-left: 16rpx;width: 40rpx;height: 40rpx;" src="/static/newImage/index/zu1008.png"
						mode=""></image>
				</view>
				<view class="n2b-tit2" @click='toWaiyu'>
					<view :class="{'l-txt1':true,'gray':foreignlanguage_name == ''}">
						{{foreignlanguage_name == '' ? '请选择外语' : foreignlanguage_name}}
					</view>
					<u-icon name="play-right-fill" color="#000000" size="20"></u-icon>
				</view>
				<view class="heng"></view>
				<!--  -->
				<template v-if="foreignlanguage_name != ''">
					<view style="margin-top: 38rpx;" class="n2b-tit1">熟练程度<text class="red">*必选</text></view>
					<view class="n2b-tit2" @click='seleShow4_3 = true'>
						<view :class="{'l-txt1':true,'gray':sele4_3_val == ''}">
							{{sele4_3_val == '' ? '请选择熟练程度' : sele4_3_val}}
						</view>
						<u-select title='熟练程度' @confirm="confirm4_3" :default-value="def4_3" v-model="seleShow4_3" :list="sele4_3"></u-select>
						<u-icon name="play-right-fill" color="#000000" size="20"></u-icon>
					</view>
					<view class="heng"></view>
				</template>

				<!--  -->
				<view style="margin-top: 38rpx;" class="n2b-tit1">必备技能关键词</view>
				<view class="n2b-tit3">
					<view @click="popover4 = !popover4" class="lt2-txt">{{pop4_title}}
						<u-icon style='margin-left: 8rpx;transform: rotate(90deg);' name="play-right-fill"
							color="#000000" size="20"></u-icon>
					</view>
					<view class="shu"></view>
					<u-input :style="{width: essentialskills_keywords.length>0?'466rpx':'520rpx'}" :clearable='false' placeholder='如C++，JAVA…,多个关键词用逗号隔开' v-model="essentialskills_keywords"
						type="text" />
					<view @click="clickZk(essentialskills_keywords)" v-if='essentialskills_keywords.length > 16'
						class="zk">展开</view>
				</view>
				<view style="margin-top: 4rpx;" class="heng"></view>
				<popover @select='changePop4' :btnList='popoverList1' :modalLeftPos='"-20rpx"' :modalTopPos='"-10rpx"'
					:modalOpacity='"1"' :active="popover4"></popover>
				<!--  -->
				<view style="margin-top: 38rpx;" class="n2b-tit1">年龄<text class="red">*必选</text></view>
				<view class="age-box">
					<view class="a-left" @click='seleShow5_1 = true'>
						<view class="al-t">
							<u-icon
								style='margin-left: 8rpx;transform: rotate(90deg);margin-left: 22rpx;margin-right: 70rpx;'
								name="play-right-fill" color="#000000" size="20"></u-icon>

							<view v-if="sele5_1_val == ''" :class="{'txt':true,'gray':sele5_1_val == ''}">
								最小
							</view>
							<view v-else :class="{'txt':true}">{{sele5_1_val}}</view>
							<!-- <view :class="{'txt':true,'gray':sele5_1_val == ''}">
									{{sele5_1_val == '' ? '最小' : sele5_1_val}}</view>
							</view> -->
						</view>
						<u-select @confirm="confirm5_1" :default-value="def5_1" v-model="seleShow5_1" :list="sele5_1"></u-select>
						<view class="hengg"></view>
					</view>
					<view class="heng2"></view>
					<view class="a-right" @click="seleShow5_2Click">
						<view class="ar-t">
							<u-icon
								style='margin-left: 8rpx;transform: rotate(90deg);margin-left: 22rpx;margin-right: 70rpx;'
								name="play-right-fill" :color="oldFlag?'#000000':'#bcbcbc'" size="20"></u-icon>
							<view :class="{'txt':true,'gray':sele5_2_val == ''}">
								{{sele5_2_val == '' ? '最大' : sele5_2_val}}
							</view>
						</view>
						<u-select @confirm="confirm5_2" :default-value="def5_2" v-model="seleShow5_2" :list="sele5_2"></u-select>
						<view class="hengg"></view>
					</view>
				</view>
				<!--  -->
				<view style="margin-top: 38rpx;" class="n2b-tit1">薪酬<text class="red">*必选</text></view>
				<view class="n2b-tit2" @click='seleShow4_4 = true'>
					<view :class="{'l-txt1':true,'gray':sele4_4_val == ''}">
						{{sele4_4_val == '' ? '请选择薪酬范围' : sele4_4_val}}
					</view>
					<u-select title='期望薪资' v-model="seleShow4_4" :default-value="def4_4" mode="mutil-column-auto" :list="xinziList"
						@confirm="confirm4_4"></u-select>
					<u-icon name="play-right-fill" color="#000000" size="20"></u-icon>
				</view>
				<view class="heng"></view>
				<!-- 年收入 -->
				<view class="nsr-txt">
					年收入：<text style="color: #000000;">{{nsr}}万</text>
				</view>
			</view>
		</view>
		<view class="footer">
			<view @click="onSubmit" class="btn">完成</view>
		</view>
		<u-popup mode='bottom' :closeable='false' border-radius='32' v-model="pop1Show">
			<view class="pop1">
				<u-icon @click='pop1Show = false' style='margin-left: 30rpx;margin-bottom: 40rpx;' name="arrow-down"
					color="#121212" size="28"></u-icon>
				<view class="txx">{{zkVal}}</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import xinziList from '../../static/xinziList.js'
	import popover from '../../components/dean-popover/dean-popover.vue'
	export default {
		components: {
			popover
		},
		data() {
			return {
				pop1Show: false,
				gangweiValue: '',
				gangweiId: [],
				gangweiList: [],
				popoverList1: ['任意', '全部'],
				isYes: false,
				value: '',
				industrysegmentation_name: '',
				industry_keywords: '',
				target_company: "",
				postname_keywords: "",
				jobtitle_keywords: '',
				scope1_keywords: '',
				scope2_keywords: '',
				scope3_keywords: '',
				foreignlanguage_name: "",
				foreignlanguage_id: '',
				discipline: '',
				essentialskills_keywords: "",

				popover1: false,
				pop1_title: '任意',
				popover2: false,
				pop2_title: '任意',
				popover3: false,
				pop3_title: '任意',
				popover4: false,
				pop4_title: '任意',
				seleShow4_1: false,
				sele4_1: [{
						value: '1',
						label: '大专'
					},
					{
						value: '2',
						label: '本科'
					}
				],
				sele4_1_val: '',
				seleShow4_2: false,
				sele4_2: [{
						value: '1',
						label: '硕士'
					},
					{
						value: '2',
						label: '博士'
					},
					{
						value: '3',
						label: '—'
					}
				],
				sele4_2_val: '',
				seleShow4_3: false,
				sele4_3: [{
						value: '1',
						label: '读写精通'
					},
					{
						value: '2',
						label: '听说读写精通'
					}
				],
				sele4_3_val: '',
				seleShow5_1: false,
				sele5_1: [],
				sele5_1_val: '',
				seleShow5_2: false,
				sele5_2: [],
				sele5_2_val: '',
				seleShow2_1: false,
				sele2_1: [{
						value: '1',
						label: '100人以上'
					},
					{
						value: '2',
						label: '500人以上'
					},
					{
						value: '3',
						label: '1000人以上'
					},
					{
						value: '4',
						label: '2000人以上'
					},
					{
						value: '5',
						label: '5000人以上'
					},
					{
						value: '6',
						label: '10000人以上'
					},
					{
						value: '7',
						label: '不限'
					}
				],
				sele2_1_val: '',
				seleShow4_4: false,
				sele4_4: [
					[{
							value: '1',
							label: '2K'
						},
						{
							value: '2',
							label: '3K'
						},
						{
							value: '2',
							label: '4K'
						},
						{
							value: '2',
							label: '5K'
						},
						{
							value: '2',
							label: '6K'
						},
						{
							value: '2',
							label: '7K'
						},
						{
							value: '2',
							label: '8K'
						},
						{
							value: '2',
							label: '9K'
						},
						{
							value: '2',
							label: '10K'
						},
						{
							value: '2',
							label: '11K'
						},
						{
							value: '2',
							label: '12K'
						}
					],
					[{
						value: '1',
						label: '~'
					}],
					[{
							value: '1',
							label: '2K'
						},
						{
							value: '2',
							label: '3K'
						},
						{
							value: '2',
							label: '4K'
						},
						{
							value: '2',
							label: '5K'
						},
						{
							value: '2',
							label: '6K'
						},
						{
							value: '2',
							label: '7K'
						},
						{
							value: '2',
							label: '8K'
						},
						{
							value: '2',
							label: '9K'
						},
						{
							value: '2',
							label: '10K'
						},
						{
							value: '2',
							label: '11K'
						},
						{
							value: '2',
							label: '12K'
						}
					],
					[{
						value: '1',
						label: '×'
					}],
					[{
							value: '3',
							label: '12'
						},
						{
							value: '4',
							label: '13'
						},
						{
							value: '4',
							label: '14'
						},
						{
							value: '4',
							label: '15'
						},
						{
							value: '4',
							label: '16'
						}
					],
					[{
						value: '1',
						label: '月'
					}],
				],
				sele4_4_val: '',
				hangyeValue: "",
				hangyeIdList: '',
				hangyeList: [],
				oldFlag: false,
				nsr: '',
				xinziList,
				post_id: "",
				dataObj: {},
				zkVal: "",
				isCan: false,
				def4_1:[],
				def4_2:[],
				def4_3:[],
				def5_1:[],
				def5_2:[],
				def4_4:[],
				def2_1:[],
				numList:[],
			}
		},
		onShow() {
			this.sele5_1 = []
			this.sele5_2 = []
			for (let i = 20; i < 60; i++) {
				this.sele5_1.push({
					value: i,
					label: i
				})
				this.sele5_2.push({
					value: i + 1,
					label: i + 1
				})
			}
		},
		onLoad(option) {
			this.post_id = option.post_id;
			console.log(this.post_id)
			this.getData()
		},
		methods: {
			async getData() {
				const res = await this.$api.postnavigation_view({
					post_id: this.post_id
				})
				this.dataObj = res
				this.$set(this, 'sele2_1_val', res.postnavigation.company_size)
				this.$set(this, 'discipline', res.postnavigation.discipline)
				this.$set(this, 'essentialskills_keywords', res.postnavigation.essentialskills_keywords)
				this.$set(this, 'sele4_1_val', res.postnavigation.first_degree)
				this.$set(this, 'foreignlanguage_name', res.postnavigation.foreignlanguage_name)
				this.$set(this, 'hangyeIdList', res.postnavigation.industry_ids)
				this.foreignlanguage_id = res.postnavigation.foreignlanguage_id
				this.industry_keywords = res.postnavigation.industry_keywords
				this.hangyeValue = res.postnavigation.industry_name
				this.industrysegmentation_name = res.postnavigation.industrysegmentation_name
				this.pop4_title = res.postnavigation.is_essentialskills == 0 ? '任意' : '全部'
				this.isYes = res.postnavigation.is_industrysegmentation == 1 ? true : false;
				this.pop1_title = res.postnavigation.is_scope1 == 0 ? '任意' : '全部'
				this.pop2_title = res.postnavigation.is_scope2 == 0 ? '任意' : '全部'
				this.pop3_title = res.postnavigation.is_scope3 == 0 ? '任意' : '全部'
				this.jobtitle_keywords = res.postnavigation.jobtitle_keywords
				this.sele5_2_val = res.postnavigation.max_age
				this.sele5_1_val = res.postnavigation.min_age
				this.gangweiValue = res.postnavigation.position_classification
				this.gangweiId = res.postnavigation.position_classificationids
				this.postname_keywords = res.postnavigation.postname_keywords
				this.sele4_3_val = res.postnavigation.proficiency
				this.sele4_4_val = res.postnavigation.salary_range
				this.scope1_keywords = res.postnavigation.scope1_keywords
				this.scope2_keywords = res.postnavigation.scope2_keywords
				this.scope3_keywords = res.postnavigation.scope3_keywords
				this.sele4_2_val = res.postnavigation.shuobo_requirements
				this.target_company = res.postnavigation.target_company
				this.nsr = res.postnavigation.years_salaries
				if (this.sele5_2_val != '') {
					this.oldFlag = true
				} else {
					this.oldFlag = false
				}
			},
			seleShow5_2Click() {
				if (this.oldFlag) {
					this.seleShow5_2 = true
				}
			},
			async onSubmit() {
				const res = await this.$api.set_postnavigation({
					post_id: this.post_id,
					industry_name: this.hangyeValue,
					industry_ids: this.hangyeIdList,
					is_industrysegmentation: this.isYes ? '1' : "0",
					industrysegmentation_name: this.industrysegmentation_name,
					industry_keywords: this.industry_keywords,
					company_size: this.sele2_1_val,
					target_company: this.target_company,
					postname_keywords: this.postname_keywords,
					jobtitle_keywords: this.jobtitle_keywords,
					scope1_keywords: this.scope1_keywords,
					scope2_keywords: this.scope2_keywords,
					scope3_keywords: this.scope3_keywords,
					// scope2_keywords:this.scope2_keywords,
					first_degree: this.sele4_1_val,
					shuobo_requirements: this.sele4_2_val,
					discipline: this.discipline,
					foreignlanguage_name: this.foreignlanguage_name,
					foreignlanguage_id: this.foreignlanguage_id,
					proficiency: this.sele4_3_val,
					essentialskills_keywords: this.essentialskills_keywords,
					min_age: this.sele5_1_val,
					max_age: this.sele5_2_val,
					salary_range: this.sele4_4_val,
					position_classification: this.gangweiValue,
					position_classificationids: this.gangweiId,
					is_scope1: this.pop1_title == '任意' ? '0' : '1',
					is_scope2: this.pop2_title == '任意' ? '0' : '1',
					is_scope3: this.pop3_title == '任意' ? '0' : '1',
					is_essentialskills: this.pop4_title == '任意' ? '0' : '1',
					years_salaries: this.nsr,
				})
				if (res.result == 1) {
					this.$refs.uToast.show({
						title: '导航设置成功',
						url: '/pages/tabBar/index',
						isTab: true
					})
				} else {
					this.$refs.uToast.show({
						title: res.msg,
					})
				}

			},
			clickZk(val) {
				this.zkVal = val
				console.log(this.zkVal)
				this.pop1Show = true;
			},
			confirm4_4(e) {
				console.log(e,'eeeeee')
				this.sele4_4_val = `${e[0].label}~${e[2].label}*${e[4].label.substring(0,e[4].label.length-1)}薪`
				this.nsr =
					`${Number(e[0].label.substring(0,e[0].label.length-1))*Number(e[4].label.substring(0,e[4].label.length-1))/10}-${Number(e[2].label.substring(0,e[2].label.length-1))*Number(e[4].label.substring(0,e[4].label.length-1))/10}`
				// this.def4_4 = []
				// this.sele4_2.forEach((ele,i)=>{
				// 	if(ele.value == e[0].value){
				// 		this.def4_2 = [i]
				// 	}
				// })
				// this.xinziList.forEach((ele,i)=>{
				// 	if(ele.value == e[0].value){
				// 		this.def4_4 = [i]
				// 		ele.chli
				// 	}
				// })
			},
			getNumList(e){
				console.log(e)
				this.numList = e
			},
			getHangyeData(e) {
				console.log(e)
				var arr = []
				var arr2 = []
				this.hangyeList = e;
				this.hangyeList.forEach(ele => {
					arr.push(ele.title)
					arr2.push(ele.id)
				})
				this.hangyeValue = arr.toString()
				this.hangyeIdList = arr2.toString()
			},
			getWaiyuData(e) {
				console.log(e)
				this.foreignlanguage_name = e.title;
				this.foreignlanguage_id = e.id;
			},
			isNoyes() {
				this.isYes = false;
				this.industry_keywords = ''
				this.industrysegmentation_name = ''
			},
			getGangweiData(e) {
				console.log(e)
				var arr = []
				var arr2 = []
				this.gangweiList = e;
				this.gangweiList.forEach(ele => {
					arr.push(ele.title)
					arr2.push(ele.id)
				})
				this.gangweiValue = arr.toString()
				this.gangweiId = arr2.toString()
			},
			toBack() {
				uni.navigateBack({
					delta: 1
				})
			},
			toHangye() {
				uni.navigateTo({
					url: `/pages/index/xuanzefenlei?idList=${this.hangyeIdList}&numList=${this.numList.toString()}&hangyeList=${JSON.stringify(this.hangyeList)}`
				})
			},
			toGangwei() {
				// uni.showToast({
				// 	title:'123123'
				// })
				uni.navigateTo({
					url: `/pages/index/xuanzegangwei?idList=${this.gangweiId}`
				})
			},
			toWaiyu() {
				uni.navigateTo({
					url: '/pages/index/waiyu'
				})
			},
			changePop1(e) {
				console.log(e)
				this.pop1_title = e
				this.popover1 = false
			},
			changePop2(e) {
				console.log(e)
				this.pop2_title = e
				this.popover2 = false
			},
			changePop3(e) {
				console.log(e)
				this.pop3_title = e
				this.popover3 = false
			},
			changePop4(e) {
				console.log(e)
				this.pop4_title = e
				this.popover4 = false
			},
			confirm4_1(e) {
				console.log(e[0])
				this.sele4_1.forEach((ele,i)=>{
					if(ele.value == e[0].value){
						this.def4_1 = [i]
					}
				})
				this.sele4_1_val = e[0].label
			},
			confirm4_2(e) {
				console.log(e[0])
				this.sele4_2.forEach((ele,i)=>{
					if(ele.value == e[0].value){
						this.def4_2 = [i]
					}
				})
				this.sele4_2_val = e[0].label
			},
			confirm4_3(e) {
				console.log(e[0])
				this.sele4_3.forEach((ele,i)=>{
					if(ele.value == e[0].value){
						this.def4_3 = [i]
					}
				})
				this.sele4_3_val = e[0].label
			},
			confirm5_1(e) {
				console.log(e[0])
				this.sele5_1.forEach((ele,i)=>{
					if(ele.value == e[0].value){
						this.def5_1 = [i]
					}
				})
				this.sele5_1_val = e[0].label
				this.sele5_2 = this.sele5_2.filter(ele => {
					return Number(ele.label) > Number(e[0].label)
				})
				this.oldFlag = true;
				if (Number(this.sele5_1_val) >= Number(this.sele5_2_val)) {
					this.sele5_2_val = ''
				}
			},
			confirm5_2(e) {
				console.log(e[0])
				this.sele5_2.forEach((ele,i)=>{
					if(ele.value == e[0].value){
						this.def5_2 = [i]
					}
				})
				this.sele5_2_val = e[0].label
			},
			confirm2_1(e) {
				console.log(e[0])
				this.sele2_1.forEach((ele,i)=>{
					if(ele.value == e[0].value){
						this.def2_1 = [i]
					}
				})
				this.sele2_1_val = e[0].label
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
	/deep/ .u-select__header {
		font-size: 30rpx;
	}

	/deep/ .u-line-1 {
		font-size: 30rpx;
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
		margin-top: 32rpx;

		.n2b-tit3 {
			display: flex;
			align-items: center;

			.lt2-txt {
				font-size: 28rpx;
				font-family: PingFangSC, PingFangSC-Regular;
				font-weight: 400;
				color: #121212;
			}

			.shu {
				width: 2rpx;
				height: 48rpx;
				background: #979797;
				margin: 0 18rpx;
			}

			/deep/ .u-input__input {
				width: 496rpx;
				// width: 478rpx;
				font-size: 28rpx;
				min-height: 54rpx !important;
			}

			.zk {
				font-size: 24rpx;
				font-family: PingFangSC, PingFangSC-Regular;
				color: #1362fd;
				margin-left: 12rpx;
			}
		}

		.n2-tit1 {
			font-size: 36rpx;
			font-family: PingFangSC, PingFangSC-Medium;
			font-weight: 600;
			color: #000000;
			margin-left: 52rpx;
			margin-bottom: 32rpx;
		}

		.n2-box {
			width: 710rpx;
			margin: 0 auto;
			background: #ffffff;
			border-radius: 20rpx;
			padding: 48rpx 30rpx;

			.n2b-tit1 {
				font-size: 32rpx;
				font-family: PingFangSC, PingFangSC-Medium;
				font-weight: 500;
				color: #000000;
				margin-bottom: 20rpx;

				.red {
					font-size: 20rpx;
					font-family: PingFangSC, PingFangSC-Regular;
					font-weight: 400;
					color: #ff5c50;
					margin-left: 16rpx;
				}
			}

			.n2b-tit2 {
				display: flex;
				align-items: center;
				justify-content: space-between;

				.l-txt1 {
					width: 560rpx;
					font-size: 28rpx;
					font-family: PingFangSC, PingFangSC-Regular;
					font-weight: 400;
					color: #000000;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap; // 默认不换行；
				}

				.l-txt1.gray {
					color: #bcbcbc;
				}
			}

			.heng {
				margin-top: 8rpx;
				height: 2rpx;
				background: #ececec;
			}

			.n2b-tit3 {
				font-size: 26rpx;
				font-family: PingFangSC, PingFangSC-Regular;
				font-weight: 400;
				color: #707070;
				margin-top: 20rpx;
			}

			.n2b-btns {
				display: flex;
				align-items: center;
				justify-content: center;
				margin-top: 32rpx;

				.b1 {
					width: 198rpx;
					height: 52rpx;
					background: #f8faff;
					border-radius: 26rpx;
					display: flex;
					align-items: center;
					justify-content: center;

					.b1-txt1 {
						font-size: 28rpx;
						font-family: PingFangSC, PingFangSC-Medium;
						font-weight: 600;
						color: #121212;
						margin-right: 16rpx;
					}

					.circle {
						width: 24rpx;
						height: 24rpx;
						border: 2rpx solid #979797;
						border-radius: 50%;
					}
				}
			}
		}
	}

	.nav2.nav3 {
		.n2b-tit3 {
			display: flex;
			align-items: center;

			.lt2-txt {
				font-size: 28rpx;
				font-family: PingFangSC, PingFangSC-Regular;
				font-weight: 400;
				color: #121212;
			}

			.shu {
				width: 2rpx;
				height: 48rpx;
				background: #979797;
				margin: 0 18rpx;
			}

			/deep/ .u-input__input {
				width: 496rpx;
				// width: 478rpx;
				font-size: 28rpx;
				min-height: 54rpx !important;
			}

			.zk {
				font-size: 24rpx;
				font-family: PingFangSC, PingFangSC-Regular;
				color: #1362fd;
				margin-left: 12rpx;
			}
		}
	}

	.nav2.nav3.nav4 {
		/deep/ .u-input__input {
			// width: 466rpx;
			font-size: 28rpx;
			min-height: 54rpx !important;
		}

		.age-box {
			display: flex;
			align-items: center;
			justify-content: space-between;

			.a-left {
				width: 268rpx;
				display: flex;
				flex-direction: column;

				.al-t {
					width: 268rpx;
					display: flex;
					align-items: center;

					.txt {
						width: 560rpx;
						font-size: 28rpx;
						font-family: PingFangSC, PingFangSC-Regular;
						font-weight: 400;
						color: #000000;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap; // 默认不换行；
					}

					.txt.gray {
						color: #bcbcbc;
					}
				}

				.hengg {
					margin-top: 8rpx;
					width: 268rpx;
					height: 1.6rpx;
					background: #ececec;
				}
			}

			.heng2 {
				width: 66rpx;
				height: 2rpx;
				background: #121212;
			}

			.a-right {
				.ar-t {
					width: 268rpx;
					display: flex;
					align-items: center;

					.txt {
						width: 560rpx;
						font-size: 28rpx;
						font-family: PingFangSC, PingFangSC-Regular;
						font-weight: 400;
						color: #000000;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap; // 默认不换行；
					}

					.txt.gray {
						color: #bcbcbc;
					}
				}

				.hengg {
					margin-top: 8rpx;
					width: 268rpx;
					height: 1.6rpx;
					background: #ececec;
				}
			}
		}
	}

	.footer {
		width: 100%;
		position: fixed;
		bottom: 0;
		height: 200rpx;
		z-index: 99;
		background: #ffffff;
		box-shadow: 0rpx -4rpx 8rpx 0rpx rgba(0, 0, 0, 0.03);

		.btn {
			margin: 38rpx auto;
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
	}

	/deep/ .u-select__header__title {
		font-size: 32rpx;
	}

	/deep/ .u-select__body__picker-view__item {
		.u-line-1 {
			font-size: 36rpx;
		}
	}

	.nsr-txt {
		margin-top: 14rpx;
		font-size: 24rpx;
		font-family: PingFangSC, PingFangSC-Regular;
		font-weight: 400;
		text-align: right;
		color: #ff6459;
		line-height: 34rpx;
	}

	.pop1 {
		padding: 60rpx 30rpx;

		.txx {
			// transform: translateY(110rpx);
			margin: 0 auto 0 auto;
			width: 632rpx;
			font-size: 28rpx;
			font-family: PingFangSC, PingFangSC-Regular;
			font-weight: 400;
			color: #121212;
			line-height: 40rpx;
		}
	}
</style>
