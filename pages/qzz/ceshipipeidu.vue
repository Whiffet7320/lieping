<template>
	<view class="index">
		<u-toast ref="uToast" />
		<!-- <view class="top"></view>
		<view class="nav1">
			<u-icon @click='toBack' style='margin-right: 12rpx;' name="arrow-left" color="#000000" size="36"></u-icon>
			<view @click='toBack' class="n1-txt">测试匹配度</view>
		</view> -->
		<u-navbar back-text="测试匹配度" back-icon-size='36'></u-navbar>
		<view style="margin-top: calc(16rpx);" class="nav2">
			<view class="n2-tit1">基本条件</view>
			<view class="n2-box">
				<view class="n2b-tit1">第一学历</view>
				<view class="n2b-tit2" @click='seleShow2_1 = true'>
					<view :class="{'l-txt1':true,'gray':sele2_1_val == ''}">
						{{sele2_1_val == '' ? '请选择第一学历' : sele2_1_val}}
					</view>
					<u-select title='第一学历' @confirm="confirm2_1" :default-value="def2_1" v-model="seleShow2_1"
						:list="sele2_1"></u-select>
					<u-icon name="play-right-fill" color="#000000" size="20"></u-icon>
				</view>
				<view class="heng"></view>
				<view style="margin-top: 38rpx;" class="n2b-tit1">最高学历</view>
				<view class="n2b-tit2" @click='seleShow20_1 = true'>
					<view :class="{'l-txt1':true,'gray':sele20_1_val == ''}">
						{{sele20_1_val == '' ? '请选择最高学历' : sele20_1_val}}
					</view>
					<u-select title='最高学历' @confirm="confirm20_1" :default-value="def20_1" v-model="seleShow20_1"
						:list="sele20_1"></u-select>
					<u-icon name="play-right-fill" color="#000000" size="20"></u-icon>
				</view>
				<view class="heng"></view>
				<view v-if="dataObj.foreignlanguage_name != ''" style="margin-top: 38rpx;" class="n2b-tit3-1">是否<text
						style="color: #FF5C50;">{{dataObj.foreignlanguage_name}}听说读写熟练</text>
				</view>
				<view v-if="dataObj.foreignlanguage_name != ''" style="display: flex;justify-content: center;"
					class="n2b-btns">
					<view class="b1" @click="isYes = true">
						<view class="b1-txt1">是</view>
						<view v-if="!isYes" class="circle"></view>
						<u-icon v-if='isYes' name="checkmark-circle-fill" color="#2979ff" size="24"></u-icon>
					</view>
					<view @click="isYes = false" style="margin-left: 42rpx;" class="b1">
						<view class="b1-txt1">否</view>
						<view v-if="isYes" class="circle"></view>
						<u-icon v-if='!isYes' name="checkmark-circle-fill" color="#2979ff" size="24"></u-icon>
					</view>
				</view>
				<view v-if="dataObj.essentialskills_keywords != ''" style="margin-top: 38rpx;" class="n2b-tit3-1">
					是否熟练掌握<text style="color: #FF5C50;">{{dataObj.is_essentialskills == 0? '（任意即可）':'（全部）'}}</text>:
				</view>
				<view v-if="dataObj.essentialskills_keywords != ''" class="n2b-tit3-2">
					{{dataObj.essentialskills_keywords}}
				</view>
				<view v-if="dataObj.essentialskills_keywords != ''" style="display: flex;justify-content: center;"
					class="n2b-btns">
					<view class="b1" @click="is2_1 = true;is2_2 = false">
						<view class="b1-txt1">是</view>
						<view v-if="!is2_1" class="circle"></view>
						<u-icon v-else name="checkmark-circle-fill" color="#2979ff" size="24"></u-icon>
					</view>
					<view @click="is2_2 = true;is2_1 = false" style="margin-left: 42rpx;" class="b1">
						<view class="b1-txt1">否</view>
						<view v-if="!is2_2" class="circle"></view>
						<u-icon v-else name="checkmark-circle-fill" color="#2979ff" size="24"></u-icon>
					</view>
				</view>
				<view style="margin-top: 38rpx;" class="n2b-tit3-1">年薪是否在<text
						style="color: #FF5C50;">{{dataObj.years_salaries}}万</text>范围内
				</view>
				<view class="n2b-btns">
					<view class="b1" @click="is3_1 = true;is3_2 = false;is3_3 = false">
						<view class="b1-txt1">范围内</view>
						<view v-if="!is3_1" class="circle"></view>
						<u-icon v-else name="checkmark-circle-fill" color="#2979ff" size="24"></u-icon>
					</view>
					<view @click="is3_2 = true;is3_1 = false;is3_3 = false" style="margin-left: 42rpx;" class="b1">
						<view class="b1-txt1">高于上限</view>
						<view v-if="!is3_2" class="circle"></view>
						<u-icon v-else name="checkmark-circle-fill" color="#2979ff" size="24"></u-icon>
					</view>
					<view @click="is3_3 = true;is3_1 = false;is3_2 = false" style="margin-left: 42rpx;" class="b1">
						<view class="b1-txt1">低于下限</view>
						<view v-if="!is3_3" class="circle"></view>
						<u-icon v-else name="checkmark-circle-fill" color="#2979ff" size="24"></u-icon>
					</view>
				</view>
				<view style="margin-top: 38rpx;" class="n2b-tit1">年龄</view>
				<view class="n2b-tit2" @click='seleShow21_1 = true'>
					<view :class="{'l-txt1':true,'gray':sele21_1_val == ''}">
						{{sele21_1_val == '' ? '请选择实际年龄' : sele21_1_val}}
					</view>
					<u-select title='实际年龄' @confirm="confirm21_1" :default-value="def21_1" v-model="seleShow21_1"
						:list="sele21_1"></u-select>
					<u-icon name="play-right-fill" color="#000000" size="20"></u-icon>
				</view>
				<view class="heng"></view>
				<view style="margin-top: 38rpx;" class="n2b-tit1">共有几段公司经历</view>
				<view class="n2b-tit2" @click='seleShow22_1 = true'>
					<view :class="{'l-txt1':true,'gray':sele22_1_val == ''}">
						{{sele22_1_val == '' ? '请选择工作经历' : sele22_1_val}}
					</view>
					<u-select title='工作经历' @confirm="confirm22_1" :default-value="def22_1" v-model="seleShow22_1"
						:list="sele22_1"></u-select>
					<u-icon name="play-right-fill" color="#000000" size="20"></u-icon>
				</view>
				<view class="heng"></view>
			</view>
		</view>
		<view v-if="jiduan > 0" class="nav2 nav3">
			<view class="n2-tit1">工作经历</view>
			<view class="n2-box">
				<!-- 第一段 -->
				<template v-if="jiduan > 0">
					<view class="n2b-tit1">最近一段工作经历</view>
					<!--  -->
					<view style="margin-top: 30rpx;margin-bottom: 0;" class="n2b-tit1">公司名称</view>
					<u-input :clearable='false' placeholder='请输入完整的公司名称' v-model="work1.com_name" type="text" />
					<view class="heng"></view>
					<!--  -->
					<template v-if="dataObj.is_industrysegmentation == 1">
						<view style="margin-top: 38rpx;" class="n2b-tit3-1">
							该行业是否属于<text style="color: #FF5C50;">{{dataObj.industrysegmentation_name}}</text>:
						</view>
						<view class="n2b-btns">
							<view class="b1" @click="work1.is4_1 = true;work1.is4_2 = false">
								<view class="b1-txt1">是</view>
								<view v-if="!work1.is4_1" class="circle"></view>
								<u-icon v-else name="checkmark-circle-fill" color="#2979ff" size="24"></u-icon>
							</view>
							<view @click="work1.is4_2 = true;work1.is4_1 = false" style="margin-left: 42rpx;"
								class="b1">
								<view class="b1-txt1">否</view>
								<view v-if="!work1.is4_2" class="circle"></view>
								<u-icon v-else name="checkmark-circle-fill" color="#2979ff" size="24"></u-icon>
							</view>
						</view>
					</template>
					<template v-else>
						<view style="margin-top: 30rpx;margin-bottom: 0;" class="n2b-tit1">所属行业</view>
						<!-- 	<u-input @click='tohangye(1)' disabled :clearable='false' placeholder='请输入所属行业' v-model="work1.industry_name" type="text" /> -->
						<view style="margin-top: 20rpx;" class="n2b-tit2" @click="tohangye(1)">
							<view :class="{'l-txt1':true,'gray':work1.industry_name == ''}">
								{{work1.industry_name == '' ? '请选择所属行业' : work1.industry_name}}
							</view>
							<u-icon name="play-right-fill" color="#000000" size="20"></u-icon>
						</view>
						<view class="heng"></view>
					</template>
					<view style="margin-top: 38rpx;" class="n2b-tit1">公司规模（人数）</view>
					<view class="n2b-tit2" @click='seleShow23_1 = true'>
						<view :class="{'l-txt1':true,'gray':work1.com_size == ''}">
							{{work1.com_size == '' ? '请选择公司规模' : work1.com_size}}
						</view>
						<u-select title='公司规模' @confirm="confirm23_1" :default-value="def23_1" v-model="seleShow23_1"
							:list="sele23_1">
						</u-select>
						<u-icon name="play-right-fill" color="#000000" size="20"></u-icon>
					</view>
					<view class="heng"></view>
					<!--  -->
					<view style="margin-top: 38rpx;" class="n2b-tit1">在这家公司工作多长时间</view>
					<view class="age-box">
						<view class="a-left" @click='seleShow24_1 = true'>
							<view class="al-t">
								<u-icon
									style='margin-left: 8rpx;transform: rotate(90deg);margin-left: 22rpx;margin-right: 70rpx;'
									name="play-right-fill" color="#000000" size="20"></u-icon>

								<view :class="{'txt':true}">{{work1.work_year}}</view>
							</view>
							<u-select @confirm="confirm24_1" :default-value="def24_1" v-model="seleShow24_1"
								:list="sele24_1"></u-select>
							<view class="hengg"></view>
						</view>
						<view style="">年</view>
						<view class="a-right" @click="seleShow25_1 = true">
							<view class="ar-t">
								<u-icon
									style='margin-left: 8rpx;transform: rotate(90deg);margin-left: 22rpx;margin-right: 70rpx;'
									name="play-right-fill" color="#000000" size="20"></u-icon>
								<view style="height: 36rpx;" :class="{'txt':true,'gray':work1.work_month == ''}">
									{{work1.work_month == '' ? '' : work1.work_month}}
								</view>
							</view>
							<u-select @confirm="confirm25_1" :default-value="def25_1" v-model="seleShow25_1"
								:list="sele25_1"></u-select>
							<view class="hengg"></view>
						</view>
						<view style="">月</view>
					</view>
					<!--  -->
					<view style="margin-top: 30rpx;margin-bottom: 0;" class="n2b-tit1">岗位名称</view>
					<view style="color: #FF5C50;font-size: 20rpx;margin-top: 16rpx;">*请输入完整通用名称，例如：财务总监</view>
					<u-input :clearable='false' placeholder='请输入岗位名称，多个岗位名称用逗号隔开' v-model="work1.job_name"
						type="text" />
					<view class="heng"></view>
				</template>

				<!-- 第二段工作经历 -->
				<template v-if="jiduan > 1">
					<view style="margin-top: 38rpx;" class="n2b-tit1">第二段工作经历</view>
					<!--  -->
					<view style="margin-top: 30rpx;margin-bottom: 0;" class="n2b-tit1">公司名称</view>
					<u-input :clearable='false' placeholder='请输入完整的公司名称' v-model="work2.com_name" type="text" />
					<view class="heng"></view>
					<!--  -->
					<template v-if="dataObj.is_industrysegmentation == 1">
						<view style="margin-top: 38rpx;" class="n2b-tit3-1">
							该行业是否属于<text style="color: #FF5C50;">{{dataObj.industrysegmentation_name}}</text>:
						</view>
						<view class="n2b-btns">
							<view class="b1" @click="work2.is4_1 = true;work2.is4_2 = false">
								<view class="b1-txt1">是</view>
								<view v-if="!work2.is4_1" class="circle"></view>
								<u-icon v-else name="checkmark-circle-fill" color="#2979ff" size="24"></u-icon>
							</view>
							<view @click="work2.is4_2 = true;work2.is4_1 = false" style="margin-left: 42rpx;"
								class="b1">
								<view class="b1-txt1">否</view>
								<view v-if="!work2.is4_2" class="circle"></view>
								<u-icon v-else name="checkmark-circle-fill" color="#2979ff" size="24"></u-icon>
							</view>
						</view>
					</template>
					<template v-else>
						<view style="margin-top: 30rpx;margin-bottom: 0;" class="n2b-tit1">所属行业</view>
						<!-- <u-input @click='tohangye(2)' disabled :clearable='false' placeholder='请输入所属行业' v-model="work2.industry_name"
							type="text" /> -->
						<view style="margin-top: 20rpx;" class="n2b-tit2" @click="tohangye(2)">
							<view :class="{'l-txt1':true,'gray':work2.industry_name == ''}">
								{{work2.industry_name == '' ? '请选择所属行业' : work2.industry_name}}
							</view>
							<u-icon name="play-right-fill" color="#000000" size="20"></u-icon>
						</view>
						<view class="heng"></view>
					</template>
					<view style="margin-top: 38rpx;" class="n2b-tit1">公司规模（人数）</view>
					<view class="n2b-tit2" @click='seleShow23_2 = true'>
						<view :class="{'l-txt1':true,'gray':work2.com_size == ''}">
							{{work2.com_size == '' ? '请选择公司规模' : work2.com_size}}
						</view>
						<u-select title='公司规模' @confirm="confirm23_2" :default-value="def23_2" v-model="seleShow23_2"
							:list="sele23_2">
						</u-select>
						<u-icon name="play-right-fill" color="#000000" size="20"></u-icon>
					</view>
					<view class="heng"></view>
					<!--  -->
					<view style="margin-top: 38rpx;" class="n2b-tit1">在这家公司工作多长时间</view>
					<view class="age-box">
						<view class="a-left" @click='seleShow24_2 = true'>
							<view class="al-t">
								<u-icon
									style='margin-left: 8rpx;transform: rotate(90deg);margin-left: 22rpx;margin-right: 70rpx;'
									name="play-right-fill" color="#000000" size="20"></u-icon>

								<view :class="{'txt':true}">{{work2.work_year}}</view>
							</view>
							<u-select @confirm="confirm24_2" :default-value="def24_2" v-model="seleShow24_2"
								:list="sele24_2"></u-select>
							<view class="hengg"></view>
						</view>
						<view style="">年</view>
						<!-- <view class="heng2"></view> -->
						<view class="a-right" @click="seleShow25_2 = true">
							<view class="ar-t">
								<u-icon
									style='margin-left: 8rpx;transform: rotate(90deg);margin-left: 22rpx;margin-right: 70rpx;'
									name="play-right-fill" color="#000000" size="20"></u-icon>
								<view :class="{'txt':true,'gray':work2.work_month == ''}">
									{{work2.work_month == '' ? '' : work2.work_month}}
								</view>
							</view>
							<u-select @confirm="confirm25_2" :default-value="def25_2" v-model="seleShow25_2"
								:list="sele25_2"></u-select>
							<view class="hengg"></view>
						</view>
						<view style="">月</view>
					</view>
					<!--  -->
					<view style="margin-top: 30rpx;margin-bottom: 0;" class="n2b-tit1">岗位名称</view>
					<view style="color: #FF5C50;font-size: 20rpx;margin-top: 16rpx;">*请输入完整通用名称，例如：财务总监</view>
					<u-input :clearable='false' placeholder='请输入岗位名称，多个岗位名称用逗号隔开' v-model="work2.job_name"
						type="text" />
					<view class="heng"></view>
				</template>
				<!-- 第三段 -->
				<template v-if="jiduan > 2">
					<view style="margin-top: 38rpx;" class="n2b-tit1">第三段工作经历</view>
					<!--  -->
					<view style="margin-top: 30rpx;margin-bottom: 0;" class="n2b-tit1">公司名称</view>
					<u-input :clearable='false' placeholder='请输入完整的公司名称' v-model="work3.com_name" type="text" />
					<view class="heng"></view>
					<!--  -->
					<template v-if="dataObj.is_industrysegmentation == 1">
						<view style="margin-top: 38rpx;" class="n2b-tit3-1">
							该行业是否属于<text style="color: #FF5C50;">{{dataObj.industrysegmentation_name}}</text>:
						</view>
						<view class="n2b-btns">
							<view class="b1" @click="work3.is4_1 = true;work3.is4_2 = false">
								<view class="b1-txt1">是</view>
								<view v-if="!work3.is4_1" class="circle"></view>
								<u-icon v-else name="checkmark-circle-fill" color="#2979ff" size="24"></u-icon>
							</view>
							<view @click="work3.is4_2 = true;work3.is4_1 = false" style="margin-left: 42rpx;"
								class="b1">
								<view class="b1-txt1">否</view>
								<view v-if="!work3.is4_2" class="circle"></view>
								<u-icon v-else name="checkmark-circle-fill" color="#2979ff" size="24"></u-icon>
							</view>
						</view>
					</template>
					<template v-else>
						<view style="margin-top: 30rpx;margin-bottom: 0;" class="n2b-tit1">所属行业</view>
						<!-- <u-input @click='tohangye(3)' disabled :clearable='false' placeholder='请输入所属行业' v-model="work3.industry_name"
							type="text" /> -->
						<view style="margin-top: 20rpx;" class="n2b-tit2" @click="tohangye(3)">
							<view :class="{'l-txt1':true,'gray':work3.industry_name == ''}">
								{{work3.industry_name == '' ? '请选择所属行业' : work3.industry_name}}
							</view>
							<u-icon name="play-right-fill" color="#000000" size="20"></u-icon>
						</view>
						<view class="heng"></view>
					</template>
					<view style="margin-top: 38rpx;" class="n2b-tit1">公司规模（人数）</view>
					<view class="n2b-tit2" @click='seleShow23_3 = true'>
						<view :class="{'l-txt1':true,'gray':work3.com_size == ''}">
							{{work3.com_size == '' ? '请选择公司规模' : work3.com_size}}
						</view>
						<u-select title='公司规模' @confirm="confirm23_3" :default-value="def23_3" v-model="seleShow23_3"
							:list="sele23_3">
						</u-select>
						<u-icon name="play-right-fill" color="#000000" size="20"></u-icon>
					</view>
					<view class="heng"></view>
					<!--  -->
					<view style="margin-top: 38rpx;" class="n2b-tit1">在这家公司工作多长时间</view>
					<view class="age-box">
						<view class="a-left" @click='seleShow24_3 = true'>
							<view class="al-t">
								<u-icon
									style='margin-left: 8rpx;transform: rotate(90deg);margin-left: 22rpx;margin-right: 70rpx;'
									name="play-right-fill" color="#000000" size="20"></u-icon>

								<view :class="{'txt':true}">{{work3.work_year}}</view>
							</view>
							<u-select @confirm="confirm24_3" :default-value="def24_3" v-model="seleShow24_3"
								:list="sele24_3"></u-select>
							<view class="hengg"></view>
						</view>
						<view style="">年</view>
						<!-- <view class="heng2"></view> -->
						<view class="a-right" @click="seleShow25_3 = true">
							<view class="ar-t">
								<u-icon
									style='margin-left: 8rpx;transform: rotate(90deg);margin-left: 22rpx;margin-right: 70rpx;'
									name="play-right-fill" color="#000000" size="20"></u-icon>
								<view :class="{'txt':true,'gray':work3.work_month == ''}">
									{{work3.work_month == '' ? '' : work3.work_month}}
								</view>
							</view>
							<u-select @confirm="confirm25_3" :default-value="def25_3" v-model="seleShow25_3"
								:list="sele25_3"></u-select>
							<view class="hengg"></view>
						</view>
						<view style="">月</view>
					</view>
					<!--  -->
					<view style="margin-top: 30rpx;margin-bottom: 0;" class="n2b-tit1">岗位名称</view>
					<view style="color: #FF5C50;font-size: 20rpx;margin-top: 16rpx;">*请输入完整通用名称，例如：财务总监</view>
					<u-input :clearable='false' placeholder='请输入岗位名称，多个岗位名称用逗号隔开' v-model="work3.job_name"
						type="text" />
					<view class="heng"></view>
				</template>
				<!-- 第四段 -->
				<template v-if="jiduan > 3">
					<view style="margin-top: 38rpx;" class="n2b-tit1">第四段工作经历</view>
					<!--  -->
					<view style="margin-top: 30rpx;margin-bottom: 0;" class="n2b-tit1">公司名称</view>
					<u-input :clearable='false' placeholder='请输入完整的公司名称' v-model="work4.com_name" type="text" />
					<view class="heng"></view>
					<!--  -->
					<template v-if="dataObj.is_industrysegmentation == 1">
						<view style="margin-top: 38rpx;" class="n2b-tit3-1">
							该行业是否属于<text style="color: #FF5C50;">{{dataObj.industrysegmentation_name}}</text>:
						</view>
						<view class="n2b-btns">
							<view class="b1" @click="work4.is4_1 = true;work4.is4_2 = false">
								<view class="b1-txt1">是</view>
								<view v-if="!work4.is4_1" class="circle"></view>
								<u-icon v-else name="checkmark-circle-fill" color="#2979ff" size="24"></u-icon>
							</view>
							<view @click="work4.is4_2 = true;work4.is4_1 = false" style="margin-left: 42rpx;"
								class="b1">
								<view class="b1-txt1">否</view>
								<view v-if="!work4.is4_2" class="circle"></view>
								<u-icon v-else name="checkmark-circle-fill" color="#2979ff" size="24"></u-icon>
							</view>
						</view>
					</template>
					<template v-else>
						<view style="margin-top: 30rpx;margin-bottom: 0;" class="n2b-tit1">所属行业</view>
						<!-- 	<u-input @click='tohangye(4)' disabled :clearable='false' placeholder='请输入所属行业'
							v-model="work4.industry_name" type="text" /> -->
						<view style="margin-top: 20rpx;" class="n2b-tit2" @click="tohangye(4)">
							<view :class="{'l-txt1':true,'gray':work4.industry_name == ''}">
								{{work4.industry_name == '' ? '请选择所属行业' : work4.industry_name}}
							</view>
							<u-icon name="play-right-fill" color="#000000" size="20"></u-icon>
						</view>
						<view class="heng"></view>
					</template>

					<view style="margin-top: 38rpx;" class="n2b-tit1">公司规模（人数）</view>
					<view class="n2b-tit2" @click='seleShow23_4 = true'>
						<view :class="{'l-txt1':true,'gray':work4.com_size == ''}">
							{{work4.com_size == '' ? '请选择公司规模' : work4.com_size}}
						</view>
						<u-select title='公司规模' @confirm="confirm23_4" :default-value="def23_4" v-model="seleShow23_4"
							:list="sele23_4">
						</u-select>
						<u-icon name="play-right-fill" color="#000000" size="20"></u-icon>
					</view>
					<view class="heng"></view>
					<!--  -->
					<view style="margin-top: 38rpx;" class="n2b-tit1">在这家公司工作多长时间</view>
					<view class="age-box">
						<view class="a-left" @click='seleShow24_4 = true'>
							<view class="al-t">
								<u-icon
									style='margin-left: 8rpx;transform: rotate(90deg);margin-left: 22rpx;margin-right: 70rpx;'
									name="play-right-fill" color="#000000" size="20"></u-icon>

								<view :class="{'txt':true}">{{work4.work_year}}</view>
							</view>
							<u-select @confirm="confirm24_4" :default-value="def24_4" v-model="seleShow24_4"
								:list="sele24_4"></u-select>
							<view class="hengg"></view>
						</view>
						<view style="">年</view>
						<!-- <view class="heng2"></view> -->
						<view class="a-right" @click="seleShow25_4 = true">
							<view class="ar-t">
								<u-icon
									style='margin-left: 8rpx;transform: rotate(90deg);margin-left: 22rpx;margin-right: 70rpx;'
									name="play-right-fill" color="#000000" size="20"></u-icon>
								<view :class="{'txt':true,'gray':work4.work_month == ''}">
									{{work4.work_month == '' ? '' : work4.work_month}}
								</view>
							</view>
							<u-select @confirm="confirm25_4" :default-value="def25_4" v-model="seleShow25_4"
								:list="sele25_4"></u-select>
							<view class="hengg"></view>
						</view>
						<view style="">月</view>
					</view>
					<!--  -->
					<view style="margin-top: 30rpx;margin-bottom: 0;" class="n2b-tit1">岗位名称</view>
					<view style="color: #FF5C50;font-size: 20rpx;margin-top: 16rpx;">*请输入完整通用名称，例如：财务总监</view>
					<u-input :clearable='false' placeholder='请输入岗位名称，多个岗位名称用逗号隔开' v-model="work4.job_name"
						type="text" />
					<view class="heng"></view>
				</template>

			</view>
		</view>
		<view
			v-if="jiduan != 0 && dataObj.scope1_keywords != '' || dataObj.scope2_keywords != '' || dataObj.scope3_keywords != '' "
			style="margin-top: 48rpx;" class="nav2 nav3 nav4">
			<view class="n2-box">
				<template v-if="dataObj.scope1_keywords != ''">
					<view class="n2b-tit1">哪几段工作经历积累了以下丰富经验<text class="red">*多选</text></view>
					<view class="nn-tit1">1.{{dataObj.is_scope1 == 0 ? '任意即可':'必须全部'}}：<text
							style="color: #707070;">{{dataObj.scope1_keywords}}</text></view>
					<view class="n2b-btns">
						<view class="b1" @click="is10_1 = !is10_1;is10_6=false;is10_5=false">
							<view class="b1-txt1">最近</view>
							<view v-if="!is10_1" class="circle"></view>
							<u-icon v-else name="checkmark-circle-fill" color="#2979ff" size="24"></u-icon>
						</view>
						<view v-if="jiduan>1" @click="is10_2 = !is10_2;is10_6=false;is10_5=false" style="margin-left: 42rpx;" class="b1">
							<view class="b1-txt1">第二段</view>
							<view v-if="!is10_2" class="circle"></view>
							<u-icon v-else name="checkmark-circle-fill" color="#2979ff" size="24"></u-icon>
						</view>
						<view v-if="jiduan>2" @click="is10_3 = !is10_3;is10_6=false;is10_5=false" style="margin-left: 42rpx;" class="b1">
							<view class="b1-txt1">第三段</view>
							<view v-if="!is10_3" class="circle"></view>
							<u-icon v-else name="checkmark-circle-fill" color="#2979ff" size="24"></u-icon>
						</view>
					</view>
					<view class="n2b-btns">
						<view v-if="jiduan>3" class="b1" style="margin-right: 42rpx;" @click="is10_4 = !is10_4;is10_6=false;is10_5=false">
							<view class="b1-txt1">第四段</view>
							<view v-if="!is10_4" class="circle"></view>
							<u-icon v-else name="checkmark-circle-fill" color="#2979ff" size="24"></u-icon>
						</view>
						<view @click="is10_1 = true;is10_2 = true;is10_3 = true;is10_4 = true;is10_5=true;is10_6=false"
							class="b1">
							<view class="b1-txt1">全选</view>
							<view v-if="!is10_5" class="circle"></view>
							<u-icon v-else name="checkmark-circle-fill" color="#2979ff" size="24"></u-icon>
						</view>
						<view
							@click="is10_1 = false;is10_2 = false;is10_3 = false;is10_4 = false;is10_6=true;is10_5=false"
							style="margin-left: 42rpx;" class="b1">
							<view class="b1-txt1">全不选</view>
							<view v-if="!is10_6" class="circle"></view>
							<u-icon v-else name="checkmark-circle-fill" color="#2979ff" size="24"></u-icon>
						</view>
					</view>
				</template>

				<template v-if="dataObj.scope2_keywords != ''">
					<view class="nn-tit1">
						{{dataObj.scope1_keywords == "" ? '1' : '2'}}.{{dataObj.is_scope2 == 0 ? '任意即可':'必须全部'}}：<text
							style="color: #707070;">{{dataObj.scope2_keywords}}</text>
					</view>
					<view class="n2b-btns">
						<view class="b1" @click="is6_1 = !is6_1;is6_6=false;is6_5=false;">
							<view class="b1-txt1">最近</view>
							<view v-if="!is6_1" class="circle"></view>
							<u-icon v-else name="checkmark-circle-fill" color="#2979ff" size="24"></u-icon>
						</view>
						<view v-if="jiduan>1" @click="is6_2 = !is6_2;is6_6=false;is6_5=false;" style="margin-left: 42rpx;" class="b1">
							<view class="b1-txt1">第二段</view>
							<view v-if="!is6_2" class="circle"></view>
							<u-icon v-else name="checkmark-circle-fill" color="#2979ff" size="24"></u-icon>
						</view>
						<view v-if="jiduan>2" @click="is6_3 = !is6_3;is6_6=false;is6_5=false;" style="margin-left: 42rpx;" class="b1">
							<view class="b1-txt1">第三段</view>
							<view v-if="!is6_3" class="circle"></view>
							<u-icon v-else name="checkmark-circle-fill" color="#2979ff" size="24"></u-icon>
						</view>
					</view>
					<view class="n2b-btns">
						<view v-if="jiduan>3" class="b1" style="margin-right: 42rpx;" @click="is6_4 = !is6_4;is6_6=false;is6_5=false;">
							<view class="b1-txt1">第四段</view>
							<view v-if="!is6_4" class="circle"></view>
							<u-icon v-else name="checkmark-circle-fill" color="#2979ff" size="24"></u-icon>
						</view>
						<view @click="is6_1 = true;is6_2 = true;is6_3 = true;is6_4 = true;is6_5=true;is6_6=false"
							class="b1">
							<view class="b1-txt1">全选</view>
							<view v-if="!is6_5" class="circle"></view>
							<u-icon v-else name="checkmark-circle-fill" color="#2979ff" size="24"></u-icon>
						</view>
						<view @click="is6_1 = false;is6_2 = false;is6_3 = false;is6_4 = false;is6_6=true;is6_5=false"
							style="margin-left: 42rpx;" class="b1">
							<view class="b1-txt1">全不选</view>
							<view v-if="!is6_6" class="circle"></view>
							<u-icon v-else name="checkmark-circle-fill" color="#2979ff" size="24"></u-icon>
						</view>
					</view>
				</template>
				<template v-if="dataObj.scope3_keywords != ''">
					<view class="nn-tit1">
						{{dataObj.scope1_keywords == "" && dataObj.scope2_keywords == "" ? '1' : dataObj.scope1_keywords == "" || dataObj.scope2_keywords == "" ? '2' : '3' }}.{{dataObj.is_scope3 == 0 ? '任意即可':'必须全部'}}：<text
							style="color: #707070;">{{dataObj.scope3_keywords}}</text>
					</view>
					<view class="n2b-btns">
						<!-- <view class="b1" @click="is11_1 = !is11_1;is11_6=false;if(is11_1&&is11_2&&is11_3&&is11_4){
							is11_5=true
						}else{
							is11_5=false
						}">
							<view class="b1-txt1">最近</view>
							<view v-if="!is11_1" class="circle"></view>
							<u-icon v-else name="checkmark-circle-fill" color="#2979ff" size="24"></u-icon>
						</view> -->
						<view class="b1" @click="is11_1 = !is11_1;is11_6=false;is11_5=false">
							<view class="b1-txt1">最近</view>
							<view v-if="!is11_1" class="circle"></view>
							<u-icon v-else name="checkmark-circle-fill" color="#2979ff" size="24"></u-icon>
						</view>
						<view v-if="jiduan>1" @click="is11_2 = !is11_2;is11_6=false;is11_5=false" style="margin-left: 42rpx;" class="b1">
							<view class="b1-txt1">第二段</view>
							<view v-if="!is11_2" class="circle"></view>
							<u-icon v-else name="checkmark-circle-fill" color="#2979ff" size="24"></u-icon>
						</view>
						<view v-if="jiduan>2" @click="is11_3 = !is11_3;is11_6=false;is11_5=false" style="margin-left: 42rpx;" class="b1">
							<view class="b1-txt1">第三段</view>
							<view v-if="!is11_3" class="circle"></view>
							<u-icon v-else name="checkmark-circle-fill" color="#2979ff" size="24"></u-icon>
						</view>
					</view>
					<view class="n2b-btns">
						<view v-if="jiduan>3" class="b1" style="margin-right: 42rpx;" @click="is11_4 = !is11_4;is11_6=false;is11_5=false">
							<view class="b1-txt1">第四段</view>
							<view v-if="!is11_4" class="circle"></view>
							<u-icon v-else name="checkmark-circle-fill" color="#2979ff" size="24"></u-icon>
						</view>
						<view @click="is11_1 = true;is11_2 = true;is11_3 = true;is11_4 = true;is11_5=true;is11_6=false"
							class="b1">
							<view class="b1-txt1">全选</view>
							<view v-if="!is11_5" class="circle"></view>
							<u-icon v-else name="checkmark-circle-fill" color="#2979ff" size="24"></u-icon>
						</view>
						<view
							@click="is11_1 = false;is11_2 = false;is11_3 = false;is11_4 = false;is11_6=true;is11_5=false"
							style="margin-left: 42rpx;" class="b1">
							<view class="b1-txt1">全不选</view>
							<view v-if="!is11_6" class="circle"></view>
							<u-icon v-else name="checkmark-circle-fill" color="#2979ff" size="24"></u-icon>
						</view>
					</view>
				</template>
			</view>
		</view>

		<view class="footer">
			<view class="f-txt">
				您会看到自己的匹配度模型和不足，自行根据分析结果决定是否应聘
			</view>
			<view @click="onSubmit" class="btn">测试匹配度</view>
		</view>
		<u-popup mode='bottom' closeable border-radius='32' height='552' v-model="pop1Show">
			<view class="pop1">
				<view class="txx">
					接待客户，打印文件，整理会议资，接待客户，打印文件，整理会议资，接待客户，打印文件，整理会议资，接待客户，打印文件，整理会议资，接待客户，打印文件，整理会议资，接待客户，打印文件，整理会议资，接待客户，打印文件，整理会议资，接待客户，打印文件，整理会议资，接待客户，打印文件，整理会议资，接待客户，打印文件，整理会议资，接待客户，打印文件，整理会议资，接待客户，打印文件，整理会议资，
				</view>
			</view>
		</u-popup>
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
				post_id: '',
				pop1Show: false,
				gangweiValue: '',
				gangweiList: [],
				popoverList1: ['任意', '全部'],
				isYes: null,
				is2_1: false,
				is2_2: false,
				is3_1: false,
				is3_2: false,
				is3_3: false,
				is3_4: false,
				is10_1: false,
				is10_2: false,
				is10_3: false,
				is10_4: false,
				is10_5: false,
				is10_6: false,
				is6_1: false,
				is6_2: false,
				is6_3: false,
				is6_4: false,
				is6_5: false,
				is6_6: false,
				is11_1: false,
				is11_2: false,
				is11_3: false,
				is11_4: false,
				is11_5: false,
				is11_6: false,
				is4_1: false,
				is4_2: false,
				value: '',
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
						label: '大专'
					},
					{
						value: '2',
						label: '本科'
					}
				],
				sele2_1_val: '',
				seleShow20_1: false,
				sele20_1: [{
						value: '1',
						label: '大专'
					},
					{
						value: '2',
						label: '本科'
					},
					{
						value: '3',
						label: '硕士'
					},
					{
						value: '4',
						label: '博士'
					},
				],
				sele20_1_val: '',
				seleShow21_1: false,
				sele21_1: [],
				sele21_1_val: '',
				seleShow22_1: false,
				sele22_1: [],
				sele22_1_val: '',
				jiduan: 0,
				hangyeValue: "",
				hangyeList: [],
				seleShow23_1: false,
				sele23_1: [{
						value: '1',
						label: '1-49人'
					},
					{
						value: '2',
						label: '50-99人'
					},
					{
						value: '3',
						label: '100-499人'
					},
					{
						value: '4',
						label: '500-999人'
					},
					{
						value: '5',
						label: '1000-1999人'
					},
					{
						value: '6',
						label: '2000-5000人'
					},
					{
						value: '7',
						label: '5000-10000人'
					},
					{
						value: '8',
						label: '10000人以上'
					},
				],
				sele23_1_val: '',
				seleShow24_1: false,
				sele24_1: [],
				sele24_1_val: '',
				seleShow25_1: false,
				sele25_1: [],
				sele25_1_val: '',
				work1: {
					industry_name: "",
					com_name: '',
					is4_1: false,
					is4_2: false,
					job_name: '',
					com_size: '',
					work_year: '',
					work_month: '',
					hyId: '',
				},
				seleShow23_2: false,
				sele23_2: [{
						value: '1',
						label: '1-49人'
					},
					{
						value: '2',
						label: '50-99人'
					},
					{
						value: '3',
						label: '100-499人'
					},
					{
						value: '4',
						label: '500-999人'
					},
					{
						value: '5',
						label: '1000-1999人'
					},
					{
						value: '6',
						label: '2000-5000人'
					},
					{
						value: '7',
						label: '5000-10000人'
					},
					{
						value: '8',
						label: '10000人以上'
					},
				],
				sele23_2_val: '',
				seleShow24_2: false,
				sele24_2: [],
				sele24_2_val: '',
				seleShow25_2: false,
				sele25_2: [],
				sele25_2_val: '',
				work2: {
					industry_name: "",
					com_name: '',
					is4_1: false,
					is4_2: false,
					job_name: '',
					com_size: '',
					work_year: '',
					work_month: '',
					hyId: '',
				},
				// 
				seleShow23_3: false,
				sele23_3: [{
						value: '1',
						label: '1-49人'
					},
					{
						value: '2',
						label: '50-99人'
					},
					{
						value: '3',
						label: '100-499人'
					},
					{
						value: '4',
						label: '500-999人'
					},
					{
						value: '5',
						label: '1000-1999人'
					},
					{
						value: '6',
						label: '2000-5000人'
					},
					{
						value: '7',
						label: '5000-10000人'
					},
					{
						value: '8',
						label: '10000人以上'
					},
				],
				sele23_3_val: '',
				seleShow24_3: false,
				sele24_3: [],
				sele24_3_val: '',
				seleShow25_3: false,
				sele25_3: [],
				sele25_3_val: '',
				work3: {
					industry_name: "",
					com_name: '',
					is4_1: false,
					is4_2: false,
					job_name: '',
					com_size: '',
					work_year: '',
					work_month: '',
					hyId: '',
				},
				//
				seleShow23_4: false,
				sele23_4: [{
						value: '1',
						label: '1-49人'
					},
					{
						value: '2',
						label: '50-99人'
					},
					{
						value: '3',
						label: '100-499人'
					},
					{
						value: '4',
						label: '500-999人'
					},
					{
						value: '5',
						label: '1000-1999人'
					},
					{
						value: '6',
						label: '2000-5000人'
					},
					{
						value: '7',
						label: '5000-10000人'
					},
					{
						value: '8',
						label: '10000人以上'
					},
				],
				sele23_4_val: '',
				seleShow24_4: false,
				sele24_4: [],
				sele24_4_val: '',
				seleShow25_4: false,
				sele25_4: [],
				sele25_4_val: '',
				work4: {
					industry_name: "",
					com_name: '',
					is4_1: false,
					is4_2: false,
					job_name: '',
					com_size: '',
					work_year: '',
					work_month: '',
					hyId: '',
				},
				// 
				dataObj: {},
				IdList1: [],
				IdList2: [],
				IdList3: [],
				IdList4: [],
				def2_1: [],
				def4_1: [],
				def4_2: [],
				def4_3: [],
				def5_1: [],
				def5_2: [],
				def20_1: [],
				def21_1: [],
				def22_1: [],
				def23_1: [],
				def24_1: [],
				def25_1: [],
				def23_2: [],
				def24_2: [],
				def25_2: [],
				def23_3: [],
				def24_3: [],
				def25_3: [],
				def23_4: [],
				def24_4: [],
				def25_4: [],
				xqObj: {},
				numList1: [],
				numList2: [],
				numList3: [],
				numList4: [],
			}
		},
		onShow() {
		},
		onLoad(option) {
			this.sele5_1 = []
			this.sele5_2 = []
			for (let i = 20; i < 61; i++) {
				this.sele21_1.push({
					value: i,
					label: i
				})
			}
			for (let i = 0; i <= 30; i++) {
				this.sele24_1.push({
					value: i,
					label: i.toString()
				})
				this.sele24_2.push({
					value: i,
					label: i.toString()
				})
				this.sele24_3.push({
					value: i,
					label: i.toString()
				})
				this.sele24_4.push({
					value: i,
					label: i.toString()
				})
			}
			for (let i = 0; i <= 11; i++) {
				this.sele25_1.push({
					value: i,
					label: i.toString()
				})
				this.sele25_2.push({
					value: i,
					label: i.toString()
				})
				this.sele25_3.push({
					value: i,
					label: i.toString()
				})
				this.sele25_4.push({
					value: i,
					label: i.toString()
				})
			}
			for (let i = 1; i <= 20; i++) {
				this.sele22_1.push({
					value: i,
					label: `${i.toString()}段`
				})
			}
			this.post_id = option.post_id
			this.getData()
			this.getXQ()
		},
		methods: {
			async getData() {
				const res = await this.$api.postnavigation_view({
					post_id: this.post_id
				})
				this.dataObj = res.postnavigation
			},
			async getXQ() {
				const res = await this.$api.jobpost_candidateview()
				console.log(res, 'ress')
				this.xqObj = res.candidate_view;
				var work_experience = this.xqObj.work_experience
				console.log(work_experience, 'worrrrk')
				this.sele2_1_val = this.xqObj.first_education;
				this.sele20_1_val = this.xqObj.highest_education;
				this.sele21_1_val = this.xqObj.ages;
				this.sele22_1_val = this.xqObj.work_num;
				this.jiduan = this.xqObj.work_num;
				if (work_experience.length > 0) {
					this.work1 = work_experience[0];
					this.work2 = work_experience[1];
					this.work3 = work_experience[2];
					this.work4 = work_experience[3];
					this.$set(this.work1, 'is4_1', work_experience[0].is_internetindustry == 1 ? true : false)
					this.$set(this.work2, 'is4_1', work_experience[1].is_internetindustry == 1 ? true : false)
					this.$set(this.work3, 'is4_1', work_experience[2].is_internetindustry == 1 ? true : false)
					this.$set(this.work4, 'is4_1', work_experience[3].is_internetindustry == 1 ? true : false)
					this.$set(this.work1, 'is4_2', work_experience[0].is_internetindustry == 1 ? false : true)
					this.$set(this.work2, 'is4_2', work_experience[1].is_internetindustry == 1 ? false : true)
					this.$set(this.work3, 'is4_2', work_experience[2].is_internetindustry == 1 ? false : true)
					this.$set(this.work4, 'is4_2', work_experience[3].is_internetindustry == 1 ? false : true)
				}

			},
			getNumList(e, i) {
				console.log(e, i, 'e.numList')
				if (i == 1) {
					this.numList1 = e
				} else if (i == 2) {
					this.numList2 = e
				} else if (i == 3) {
					this.numList3 = e
				} else if (i == 4) {
					this.numList4 = e
				}
			},
			async onSubmit() {
				if (this.dataObj.essentialskills_keywords != '') {
					if (!this.is2_1 && !this.is2_2) {
						this.$refs.uToast.show({
							title: '请选择熟练程度',
						})
						return
					}
				}
				if (!this.is3_1 && !this.is3_2 && !this.is3_3) {
					this.$refs.uToast.show({
						title: '请选择年薪范围',
					})
					return
				}

				if (this.jiduan >= 1) {
					if (this.work1.com_name == '') {
						this.$refs.uToast.show({
							title: '请输入公司名称',
						})
						return
					}
					if (this.work1.industry_name == '' && this.dataObj.is_industrysegmentation != 1) {
						this.$refs.uToast.show({
							title: '请选择所属行业',
						})
						return
					}
					if (this.work1.com_size == '') {
						this.$refs.uToast.show({
							title: '请选择公司规模',
						})
						return
					}
					if (this.work1.work_year == 0 && this.work1.work_month == 0) {
						this.$refs.uToast.show({
							title: '请选择工作时间',
						})
						return
					}
					if (this.work1.work_year == 0 && this.work1.work_month == 0) {
						this.$refs.uToast.show({
							title: '请选择工作时间',
						})
						return
					}
					if (this.work1.job_name == '') {
						this.$refs.uToast.show({
							title: '请输入岗位名称',
						})
						return
					}
				}
				if (this.jiduan >= 2) {
					if (this.work2.com_name == '') {
						this.$refs.uToast.show({
							title: '请输入公司名称',
						})
						return
					}
					if (this.work2.industry_name == '' && this.dataObj.is_industrysegmentation != 1) {
						this.$refs.uToast.show({
							title: '请选择所属行业',
						})
						return
					}
					if (this.work2.com_size == '') {
						this.$refs.uToast.show({
							title: '请选择公司规模',
						})
						return
					}
					if (this.work2.work_year == 0 && this.work2.work_month == 0) {
						this.$refs.uToast.show({
							title: '请选择工作时间',
						})
						return
					}
					if (this.work2.work_year == 0 && this.work2.work_month == 0) {
						this.$refs.uToast.show({
							title: '请选择工作时间',
						})
						return
					}
					if (this.work2.job_name == '') {
						this.$refs.uToast.show({
							title: '请输入岗位名称',
						})
						return
					}
				}
				if (this.jiduan >= 3) {
					if (this.work3.com_name == '') {
						this.$refs.uToast.show({
							title: '请输入公司名称',
						})
						return
					}
					if (this.work3.industry_name == '' && this.dataObj.is_industrysegmentation != 1) {
						this.$refs.uToast.show({
							title: '请选择所属行业',
						})
						return
					}
					if (this.work3.com_size == '') {
						this.$refs.uToast.show({
							title: '请选择公司规模',
						})
						return
					}
					if (this.work3.work_year == 0 && this.work3.work_month == 0) {
						this.$refs.uToast.show({
							title: '请选择工作时间',
						})
						return
					}
					if (this.work3.work_year == 0 && this.work3.work_month == 0) {
						this.$refs.uToast.show({
							title: '请选择工作时间',
						})
						return
					}
					if (this.work3.job_name == '') {
						this.$refs.uToast.show({
							title: '请输入岗位名称',
						})
						return
					}
				}
				if (this.jiduan >= 4) {
					if (this.work4.com_name == '') {
						this.$refs.uToast.show({
							title: '请输入公司名称',
						})
						return
					}
					if (this.work4.industry_name == '' && this.dataObj.is_industrysegmentation != 1) {
						this.$refs.uToast.show({
							title: '请选择所属行业',
						})
						return
					}
					if (this.work4.com_size == '') {
						this.$refs.uToast.show({
							title: '请选择公司规模',
						})
						return
					}
					if (this.work4.work_year == 0 && this.work4.work_month == 0) {
						this.$refs.uToast.show({
							title: '请选择工作时间',
						})
						return
					}
					if (this.work4.work_year == 0 && this.work4.work_month == 0) {
						this.$refs.uToast.show({
							title: '请选择工作时间',
						})
						return
					}
					if (this.work4.job_name == '') {
						this.$refs.uToast.show({
							title: '请输入岗位名称',
						})
						return
					}
				}
				if(this.jiduan != 0 && this.dataObj.scope1_keywords != '' || this.dataObj.scope2_keywords != '' || this.dataObj.scope3_keywords != ''){
					if(this.dataObj.scope1_keywords != ''){
						// 10 6 11
						if(this.jiduan > 1){
							if(!this.is10_1 && !this.is10_2 && !this.is10_5 && !this.is10_6){
								this.$refs.uToast.show({
									title: '请选择哪几段工作经历累计的经验',
								})
								return
							}
						}else if(this.jiduan > 2){
							if(!this.is10_1 && !this.is10_2 && !this.is10_3 && !this.is10_5 && !this.is10_6){
								this.$refs.uToast.show({
									title: '请选择哪几段工作经历累计的经验',
								})
								return
							}
						}else if(this.jiduan > 3){
							if(!this.is10_1 && !this.is10_2 && !this.is10_3 && !this.is10_4 && !this.is10_5 && !this.is10_6){
								this.$refs.uToast.show({
									title: '请选择哪几段工作经历累计的经验',
								})
								return
							}
						}else{
							if(!this.is10_1 && !this.is10_5 && !this.is10_6){
								this.$refs.uToast.show({
									title: '请选择哪几段工作经历累计的经验',
								})
								return
							}
						}
						
					}
					if(this.dataObj.scope2_keywords != ''){
						// 10 6 11
						// if(!this.is6_1 && !this.is6_2 && !this.is6_3 && !this.is6_4 && !this.is6_5 && !this.is6_6){
						// 	this.$refs.uToast.show({
						// 		title: '请选择哪几段工作经历累计的经验',
						// 	})
						// 	return
						// }
						if(this.jiduan > 1){
							if(!this.is6_1 && !this.is6_2 && !this.is6_5 && !this.is6_6){
								this.$refs.uToast.show({
									title: '请选择哪几段工作经历累计的经验',
								})
								return
							}
						}else if(this.jiduan > 2){
							if(!this.is6_1 && !this.is6_2 && !this.is6_3 && !this.is6_5 && !this.is6_6){
								this.$refs.uToast.show({
									title: '请选择哪几段工作经历累计的经验',
								})
								return
							}
						}else if(this.jiduan > 3){
							if(!this.is6_1 && !this.is6_2 && !this.is6_3 && !this.is6_4 && !this.is6_5 && !this.is6_6){
								this.$refs.uToast.show({
									title: '请选择哪几段工作经历累计的经验',
								})
								return
							}
						}else{
							if(!this.is6_1 && !this.is6_5 && !this.is6_6){
								this.$refs.uToast.show({
									title: '请选择哪几段工作经历累计的经验',
								})
								return
							}
						}
					}
					if(this.dataObj.scope3_keywords != ''){
						// 10 6 11
						console.log(this.is11_1,this.is11_2,this.is11_3,this.is11_4,this.is11_5,this.is11_6,'is11_1')
						// if(!this.is11_1 && !this.is11_2 && !this.is11_3 && !this.is11_4 && !this.is11_5 && !this.is11_6){
						// 	this.$refs.uToast.show({
						// 		title: '请选择哪几段工作经历累计的经验',
						// 	})
						// 	return
						// }
						if(this.jiduan > 1){
							if(!this.is11_1 && !this.is11_2 && !this.is11_5 && !this.is11_6){
								this.$refs.uToast.show({
									title: '请选择哪几段工作经历累计的经验',
								})
								return
							}
						}else if(this.jiduan > 2){
							if(!this.is11_1 && !this.is11_2 && !this.is11_3 && !this.is11_5 && !this.is11_6){
								this.$refs.uToast.show({
									title: '请选择哪几段工作经历累计的经验',
								})
								return
							}
						}else if(this.jiduan > 3){
							if(!this.is11_1 && !this.is11_2 && !this.is11_3 && !this.is11_4 && !this.is11_5 && !this.is11_6){
								this.$refs.uToast.show({
									title: '请选择哪几段工作经历累计的经验',
								})
								return
							}
						}else{
							if(!this.is11_1 && !this.is11_5 && !this.is11_6){
								this.$refs.uToast.show({
									title: '请选择哪几段工作经历累计的经验',
								})
								return
							}
						}
					}
				}
				
				var work_experience = []
				console.log(this.work1, this.work2, this.work3, this.work4, 'work')
				if (this.work1) {
					this.work1.is_internetindustry = this.work1.is4_1 ? 1 : 0;
				}
				if (this.work2) {
					this.work2.is_internetindustry = this.work2.is4_1 ? 1 : 0;
				}
				if (this.work3) {
					this.work3.is_internetindustry = this.work3.is4_1 ? 1 : 0;
				}
				if (this.work4) {
					this.work4.is_internetindustry = this.work4.is4_1 ? 1 : 0;
				}
				work_experience = [this.work1, this.work2, this.work3, this.work4]
				var risk_advert = []
				if (this.is10_1) {
					risk_advert.push(1)
				}
				if (this.is10_2) {
					risk_advert.push(2)
				}
				if (this.is10_3) {
					risk_advert.push(3)
				}
				if (this.is10_4) {
					risk_advert.push(4)
				}
				var riskmanagement_advertisement = []
				if (this.is6_1) {
					riskmanagement_advertisement.push(1)
				}
				if (this.is6_2) {
					riskmanagement_advertisement.push(2)
				}
				if (this.is6_3) {
					riskmanagement_advertisement.push(3)
				}
				if (this.is6_4) {
					riskmanagement_advertisement.push(4)
				}
				var riskmanagement_advertisement3 = []
				if (this.is11_1) {
					riskmanagement_advertisement3.push(1)
				}
				if (this.is11_2) {
					riskmanagement_advertisement3.push(2)
				}
				if (this.is11_3) {
					riskmanagement_advertisement3.push(3)
				}
				if (this.is11_4) {
					riskmanagement_advertisement3.push(4)
				}
				const res = await this.$api.jobpost_candidate({
					first_education: this.sele2_1_val,
					highest_education: this.sele20_1_val,
					english_skilled: this.isYes ? 1 : 0,
					technology_mastery: this.is2_1 ? 1 : 0,
					yearly_salary: this.is3_1 ? 1 : this.is3_2 ? 2 : 3,
					ages: this.sele21_1_val,
					work_experience: JSON.stringify(work_experience),
					risk_advert: risk_advert.toString(),
					riskmanagement_advertisement: riskmanagement_advertisement.toString(),
					riskmanagement_advertisement3: riskmanagement_advertisement3.toString(),
					work_num: this.jiduan,
				})
				if (res.result == 1) {
					uni.navigateTo({
						url: `/pages/qzz/pipeidu?post_id=${this.post_id}&candidate_id=${res.candidate_id}`
					})
				} else {
					this.$refs.uToast.show({
						title: res.msg,
					})
				}
			},
			getHangyeData(e, i) {
				console.log(e, i, 123)
				if (i == 1) {
					this.work1.industry_name = e[0].title;
					this.IdList1 = [e[0].id].toString()
					this.work1.hyId = [e[0].id].toString()
					console.log(this.IdList1)
				} else if (i == 2) {
					this.work2.industry_name = e[0].title;
					this.IdList2 = [e[0].id].toString()
					this.work2.hyId = [e[0].id].toString()
				} else if (i == 3) {
					this.work3.industry_name = e[0].title;
					this.IdList3 = [e[0].id].toString()
					this.work3.hyId = [e[0].id].toString()
				} else if (i == 4) {
					this.work4.industry_name = e[0].title;
					this.IdList4 = [e[0].id].toString()
					this.work4.hyId = [e[0].id].toString()
				}
			},
			tohangye(i) {
				var IdList = []
				var numList = []
				if (i == 1) {
					IdList = this.work1.hyId
					numList = this.numList1
				} else if (i == 2) {
					IdList = this.work2.hyId
					numList = this.numList2
				} else if (i == 3) {
					IdList = this.work3.hyId
					numList = this.numList3
				} else if (i == 4) {
					IdList = this.work4.hyId
					numList = this.numList4
				}
				console.log(IdList, i)
				uni.navigateTo({
					url: `/pages/index/xuanzefenlei2?idList=${IdList}&index=${i}&numList=${numList}`
				})
			},
			clickZk(i) {
				this.pop1Show = true;
			},
			toBack() {
				uni.navigateBack({
					delta: 1
				})
				// uni.switchTab({
				// 	url:'/pages/tabBar/daohang'
				// })
			},
			toGangwei() {
				uni.navigateTo({
					url: '/pages/index/xuanzegangwei'
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
				this.sele4_1.forEach((ele, i) => {
					if (ele.value == e[0].value) {
						this.def4_1 = [i]
					}
				})
				this.sele4_1_val = e[0].label
			},
			confirm4_2(e) {
				console.log(e[0])
				this.sele4_2.forEach((ele, i) => {
					if (ele.value == e[0].value) {
						this.def4_2 = [i]
					}
				})
				this.sele4_2_val = e[0].label
			},
			confirm4_3(e) {
				console.log(e[0])
				this.sele4_3.forEach((ele, i) => {
					if (ele.value == e[0].value) {
						this.def4_3 = [i]
					}
				})
				this.sele4_3_val = e[0].label
			},
			confirm5_1(e) {
				console.log(e[0])
				this.sele5_1.forEach((ele, i) => {
					if (ele.value == e[0].value) {
						this.def5_1 = [i]
					}
				})
				this.sele5_1_val = e[0].label
			},
			confirm5_2(e) {
				console.log(e[0])
				this.sele5_2.forEach((ele, i) => {
					if (ele.value == e[0].value) {
						this.def5_2 = [i]
					}
				})
				this.sele5_2_val = e[0].label
			},
			confirm2_1(e) {
				console.log(e[0])
				this.sele2_1.forEach((ele, i) => {
					if (ele.value == e[0].value) {
						this.def2_1 = [i]
					}
				})
				this.sele2_1_val = e[0].label
			},
			confirm20_1(e) {
				console.log(e[0])
				this.sele20_1.forEach((ele, i) => {
					if (ele.value == e[0].value) {
						this.def20_1 = [i]
					}
				})
				this.sele20_1_val = e[0].label
			},
			confirm21_1(e) {
				console.log(e[0])
				this.sele21_1.forEach((ele, i) => {
					if (ele.value == e[0].value) {
						this.def21_1 = [i]
					}
				})
				this.sele21_1_val = e[0].label
			},
			confirm22_1(e) {
				console.log(e[0])
				this.sele22_1.forEach((ele, i) => {
					if (ele.value == e[0].value) {
						this.def22_1 = [i]
					}
				})
				this.jiduan = Number(e[0].value)
				this.sele22_1_val = e[0].label
			},
			confirm23_1(e) {
				console.log(123123)
				console.log(e[0], this.work1, 1111)
				this.sele23_1.forEach((ele, i) => {
					if (ele.value == e[0].value) {
						this.def23_1 = [i]
					}
				})
				this.work1.com_size = e[0].label
			},
			confirm24_1(e) {
				console.log(e[0])
				this.sele24_1.forEach((ele, i) => {
					if (ele.value == e[0].value) {
						this.def24_1 = [i]
					}
				})
				this.work1.work_year = e[0].label
			},
			confirm25_1(e) {
				console.log(e[0])
				this.sele25_1.forEach((ele, i) => {
					if (ele.value == e[0].value) {
						this.def25_1 = [i]
					}
				})
				this.work1.work_month = e[0].label
			},
			confirm23_2(e) {
				console.log(e[0])
				this.sele23_2.forEach((ele, i) => {
					if (ele.value == e[0].value) {
						this.def23_2 = [i]
					}
				})
				this.work2.com_size = e[0].label
			},
			confirm24_2(e) {
				console.log(e[0])
				this.sele24_2.forEach((ele, i) => {
					if (ele.value == e[0].value) {
						this.def24_2 = [i]
					}
				})
				this.work2.work_year = e[0].label
			},
			confirm25_2(e) {
				console.log(e[0])
				this.sele25_2.forEach((ele, i) => {
					if (ele.value == e[0].value) {
						this.def25_2 = [i]
					}
				})
				this.work2.work_month = e[0].label
			},
			confirm23_3(e) {
				console.log(e[0])
				this.sele23_3.forEach((ele, i) => {
					if (ele.value == e[0].value) {
						this.def23_3 = [i]
					}
				})
				this.work3.com_size = e[0].label
			},
			confirm24_3(e) {
				console.log(e[0])
				this.sele24_3.forEach((ele, i) => {
					if (ele.value == e[0].value) {
						this.def24_3 = [i]
					}
				})
				this.work3.work_year = e[0].label
			},
			confirm25_3(e) {
				console.log(e[0])
				this.sele25_3.forEach((ele, i) => {
					if (ele.value == e[0].value) {
						this.def25_3 = [i]
					}
				})
				this.work3.work_month = e[0].label
			},
			confirm23_4(e) {
				console.log(e[0])
				this.sele23_4.forEach((ele, i) => {
					if (ele.value == e[0].value) {
						this.def23_4 = [i]
					}
				})
				this.work4.com_size = e[0].label
			},
			confirm24_4(e) {
				console.log(e[0])
				this.sele24_4.forEach((ele, i) => {
					if (ele.value == e[0].value) {
						this.def24_4 = [i]
					}
				})
				this.work4.work_year = e[0].label
			},
			confirm25_4(e) {
				console.log(e[0])
				this.sele25_4.forEach((ele, i) => {
					if (ele.value == e[0].value) {
						this.def25_4 = [i]
					}
				})
				this.work4.work_month = e[0].label
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

		.age-box {
			margin: 26rpx 0;
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
						font-size: 24rpx;
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
						font-size: 24rpx;
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
				font-weight: 600;
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

			.nn-tit1 {
				font-size: 26rpx;
				font-family: PingFangSC, PingFangSC-Medium;
				font-weight: 500;
				color: #000000;
				margin-top: 40rpx;
			}

			.n2b-tit2 {
				display: flex;
				align-items: center;
				justify-content: space-between;

				.l-txt1 {
					width: 560rpx;
					font-size: 24rpx;
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
				height: 1.6rpx;
				background: #ececec;
			}

			.n2b-tit3-1 {
				font-size: 32rpx;
				font-family: PingFangSC, PingFangSC-Medium;
				font-weight: 600;
				color: #000000;
			}

			.n2b-tit3-2 {
				margin-top: 12rpx;
				font-size: 24rpx;
				font-family: PingFangSC, PingFangSC-Regular;
				font-weight: 400;
				color: #000000;
				line-height: 40rpx;
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
				// justify-content: center;
				margin-top: 32rpx;

				.b1 {
					width: 190rpx;
					height: 52rpx;
					background: #f8faff;
					border-radius: 26rpx;
					display: flex;
					align-items: center;
					justify-content: center;

					.b1-txt1 {
						font-size: 24rpx;
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
				font-size: 24rpx;
				font-family: PingFangSC, PingFangSC-Regular;
				font-weight: 400;
				color: #121212;
			}

			.shu {
				width: 4rpx;
				height: 48rpx;
				background: #979797;
				margin: 0 18rpx;
			}

			/deep/ .u-input__input {
				width: 552rpx;
				// width: 478rpx;
				font-size: 24rpx;
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
			width: 466rpx;
			font-size: 24rpx;
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
						font-size: 24rpx;
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
						font-size: 24rpx;
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
		height: 200rpx;
		z-index: 99;

		// background: #ffffff;
		.f-txt {
			margin-top: 24rpx;
			font-size: 20rpx;
			font-family: PingFangSC, PingFangSC-Regular;
			font-weight: 400;
			text-align: center;
			color: #999999;
		}

		.btn {
			margin: 24rpx auto;
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

	.pop1 {
		.txx {
			transform: translateY(110rpx);
			margin: 0 auto 0 auto;
			width: 632rpx;
			font-size: 24rpx;
			font-family: PingFangSC, PingFangSC-Regular;
			font-weight: 400;
			color: #121212;
			line-height: 40rpx;
		}
	}

	/deep/ .u-input__input {
		width: 552rpx;
		// width: 478rpx;
		font-size: 24rpx;
	}
</style>
