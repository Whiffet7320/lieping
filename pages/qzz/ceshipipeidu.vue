<template>
	<view class="index">
		<view class="top"></view>
		<view class="nav1">
			<u-icon @click='toBack' style='margin-right: 12rpx;' name="arrow-left" color="#000000" size="36"></u-icon>
			<view @click='toBack' class="n1-txt">测试匹配度</view>
		</view>
		<view style="margin-top: calc(176rpx + 16rpx);" class="nav2">
			<view class="n2-tit1">基本条件</view>
			<view class="n2-box">
				<view class="n2b-tit1">第一学历</view>
				<view class="n2b-tit2" @click='seleShow2_1 = true'>
					<view :class="{'l-txt1':true,'gray':sele2_1_val == ''}">
						{{sele2_1_val == '' ? '请选择第一学历' : sele2_1_val}}
					</view>
					<u-select title='公司规模' @confirm="confirm2_1" v-model="seleShow2_1" :list="sele2_1"></u-select>
					<u-icon name="play-right-fill" color="#000000" size="20"></u-icon>
				</view>
				<view class="heng"></view>
				<view style="margin-top: 38rpx;" class="n2b-tit1">最高学历</view>
				<view class="n2b-tit2" @click='seleShow2_1 = true'>
					<view :class="{'l-txt1':true,'gray':sele2_1_val == ''}">
						{{sele2_1_val == '' ? '请选择最高学历' : sele2_1_val}}
					</view>
					<u-select title='公司规模' @confirm="confirm2_1" v-model="seleShow2_1" :list="sele2_1"></u-select>
					<u-icon name="play-right-fill" color="#000000" size="20"></u-icon>
				</view>
				<view class="heng"></view>
				<view style="margin-top: 38rpx;" class="n2b-tit3-1">是否<text style="color: #FF5C50;">英语听说读写熟练</text></view>
				<view class="n2b-btns">
					<view class="b1" @click="isYes = true">
						<view class="b1-txt1">是</view>
						<view v-if="!isYes" class="circle"></view>
						<u-icon v-else name="checkmark-circle-fill" color="#2979ff" size="24"></u-icon>
					</view>
					<view @click="isYes = false" style="margin-left: 42rpx;" class="b1">
						<view class="b1-txt1">否</view>
						<view v-if="isYes" class="circle"></view>
						<u-icon v-else name="checkmark-circle-fill" color="#2979ff" size="24"></u-icon>
					</view>
				</view>
				<view style="margin-top: 38rpx;" class="n2b-tit3-1">是否熟练掌握<text style="color: #FF5C50;">(任意即可）</text>:</view>
				<view class="n2b-tit3-2">C++、PHP、NET、Ruby、Golang、C++、PHP、NET、Ruby、Golang、jave</view>
				<view class="n2b-btns">
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
				<view style="margin-top: 38rpx;" class="n2b-tit3-1">年薪是否在<text style="color: #FF5C50;">3-10万</text>范围内</view>
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
				<view class="n2b-tit2" @click='seleShow2_1 = true'>
					<view :class="{'l-txt1':true,'gray':sele2_1_val == ''}">
						{{sele2_1_val == '' ? '请选择实际年龄' : sele2_1_val}}
					</view>
					<u-select title='公司规模' @confirm="confirm2_1" v-model="seleShow2_1" :list="sele2_1"></u-select>
					<u-icon name="play-right-fill" color="#000000" size="20"></u-icon>
				</view>
				<view class="heng"></view>
				<view style="margin-top: 38rpx;" class="n2b-tit1">共有几段公司经历</view>
				<view class="n2b-tit2" @click='seleShow2_1 = true'>
					<view :class="{'l-txt1':true,'gray':sele2_1_val == ''}">
						{{sele2_1_val == '' ? '请选择工作经历' : sele2_1_val}}
					</view>
					<u-select title='公司规模' @confirm="confirm2_1" v-model="seleShow2_1" :list="sele2_1"></u-select>
					<u-icon name="play-right-fill" color="#000000" size="20"></u-icon>
				</view>
				<view class="heng"></view>
			</view>
		</view>
		<view class="nav2 nav3">
			<view class="n2-tit1">工作经历</view>
			<view class="n2-box">
				<view class="n2b-tit1">第一段工作经历</view>
				<!--  -->
				<view style="margin-top: 30rpx;margin-bottom: 0;" class="n2b-tit1">公司名称</view>
				<u-input :clearable='false' placeholder='请输入完整的公司名称' v-model="value" type="text" />
				<view class="heng"></view>
				<!--  -->
				<view style="margin-top: 38rpx;" class="n2b-tit3-1">是否属于<text style="color: #FF5C50;">互联网行业</text>:</view>
				<view class="n2b-btns">
					<view class="b1" @click="is4_1 = true;is4_2 = false">
						<view class="b1-txt1">是</view>
						<view v-if="!is4_1" class="circle"></view>
						<u-icon v-else name="checkmark-circle-fill" color="#2979ff" size="24"></u-icon>
					</view>
					<view @click="is4_2 = true;is4_1 = false" style="margin-left: 42rpx;" class="b1">
						<view class="b1-txt1">否</view>
						<view v-if="!is4_2" class="circle"></view>
						<u-icon v-else name="checkmark-circle-fill" color="#2979ff" size="24"></u-icon>
					</view>
				</view>
				<view style="margin-top: 38rpx;" class="n2b-tit1">公司规模（人数）</view>
				<view class="n2b-tit2" @click='seleShow2_1 = true'>
					<view :class="{'l-txt1':true,'gray':sele2_1_val == ''}">
						{{sele2_1_val == '' ? '请选择公司规模' : sele2_1_val}}
					</view>
					<u-select title='公司规模' @confirm="confirm2_1" v-model="seleShow2_1" :list="sele2_1"></u-select>
					<u-icon name="play-right-fill" color="#000000" size="20"></u-icon>
				</view>
				<view class="heng"></view>
				<!--  -->
				<view style="margin-top: 38rpx;" class="n2b-tit1">在这家公司工作多长时间</view>
				<view class="age-box">
					<view class="a-left" @click='seleShow5_1 = true'>
						<view class="al-t">
							<u-icon
								style='margin-left: 8rpx;transform: rotate(90deg);margin-left: 22rpx;margin-right: 70rpx;'
								name="play-right-fill" color="#000000" size="20"></u-icon>
				
							<view :class="{'txt':true}">{{sele5_1_val}}</view>
							<!-- <view :class="{'txt':true,'gray':sele5_1_val == ''}">
									{{sele5_1_val == '' ? '最小' : sele5_1_val}}</view>
							</view> -->
						</view>
						<u-select @confirm="confirm5_1" v-model="seleShow5_1" :list="sele5_1"></u-select>
						<view class="hengg"></view>
					</view>
					<view style="">年</view>
					<!-- <view class="heng2"></view> -->
					<view class="a-right" @click="seleShow5_2 = true">
						<view class="ar-t">
							<u-icon
								style='margin-left: 8rpx;transform: rotate(90deg);margin-left: 22rpx;margin-right: 70rpx;'
								name="play-right-fill" color="#000000" size="20"></u-icon>
							<view :class="{'txt':true,'gray':sele5_2_val == ''}">
								{{sele5_2_val == '' ? '' : sele5_2_val}}
							</view>
						</view>
						<u-select @confirm="confirm5_2" v-model="seleShow5_2" :list="sele5_2"></u-select>
						<view class="hengg"></view>
					</view>
					<view style="">月</view>
				</view>
				<!--  -->
				<view style="margin-top: 30rpx;margin-bottom: 0;" class="n2b-tit1">近两年内该公司担任且擅长的岗位名称</view>
				<view style="color: #FF5C50;font-size: 20rpx;margin-top: 16rpx;">*请输入完整通用名称，例如：财务总监</view>
				<u-input :clearable='false' placeholder='请输入岗位名称，多个岗位名称用逗号隔开' v-model="value" type="text" />
				<view class="heng"></view>
				<!-- 第二段工作经历 -->
				<view style="margin-top: 38rpx;" class="n2b-tit1">第二段工作经历</view>
				<!--  -->
				<view style="margin-top: 30rpx;margin-bottom: 0;" class="n2b-tit1">公司名称</view>
				<u-input :clearable='false' placeholder='请输入完整的公司名称' v-model="value" type="text" />
				<view class="heng"></view>
				<!--  -->
				<view style="margin-top: 38rpx;" class="n2b-tit3-1">是否属于<text style="color: #FF5C50;">互联网行业</text>:</view>
				<view class="n2b-btns">
					<view class="b1" @click="is4_1 = true;is4_2 = false">
						<view class="b1-txt1">是</view>
						<view v-if="!is4_1" class="circle"></view>
						<u-icon v-else name="checkmark-circle-fill" color="#2979ff" size="24"></u-icon>
					</view>
					<view @click="is4_2 = true;is4_1 = false" style="margin-left: 42rpx;" class="b1">
						<view class="b1-txt1">否</view>
						<view v-if="!is4_2" class="circle"></view>
						<u-icon v-else name="checkmark-circle-fill" color="#2979ff" size="24"></u-icon>
					</view>
				</view>
				<view style="margin-top: 38rpx;" class="n2b-tit1">公司规模（人数）</view>
				<view class="n2b-tit2" @click='seleShow2_1 = true'>
					<view :class="{'l-txt1':true,'gray':sele2_1_val == ''}">
						{{sele2_1_val == '' ? '请选择公司规模' : sele2_1_val}}
					</view>
					<u-select title='公司规模' @confirm="confirm2_1" v-model="seleShow2_1" :list="sele2_1"></u-select>
					<u-icon name="play-right-fill" color="#000000" size="20"></u-icon>
				</view>
				<view class="heng"></view>
				<!--  -->
				<view style="margin-top: 38rpx;" class="n2b-tit1">在这家公司工作多长时间</view>
				<view class="age-box">
					<view class="a-left" @click='seleShow5_1 = true'>
						<view class="al-t">
							<u-icon
								style='margin-left: 8rpx;transform: rotate(90deg);margin-left: 22rpx;margin-right: 70rpx;'
								name="play-right-fill" color="#000000" size="20"></u-icon>
				
							<view :class="{'txt':true}">{{sele5_1_val}}</view>
							<!-- <view :class="{'txt':true,'gray':sele5_1_val == ''}">
									{{sele5_1_val == '' ? '最小' : sele5_1_val}}</view>
							</view> -->
						</view>
						<u-select @confirm="confirm5_1" v-model="seleShow5_1" :list="sele5_1"></u-select>
						<view class="hengg"></view>
					</view>
					<view style="">年</view>
					<!-- <view class="heng2"></view> -->
					<view class="a-right" @click="seleShow5_2 = true">
						<view class="ar-t">
							<u-icon
								style='margin-left: 8rpx;transform: rotate(90deg);margin-left: 22rpx;margin-right: 70rpx;'
								name="play-right-fill" color="#000000" size="20"></u-icon>
							<view :class="{'txt':true,'gray':sele5_2_val == ''}">
								{{sele5_2_val == '' ? '' : sele5_2_val}}
							</view>
						</view>
						<u-select @confirm="confirm5_2" v-model="seleShow5_2" :list="sele5_2"></u-select>
						<view class="hengg"></view>
					</view>
					<view style="">月</view>
				</view>
				<!--  -->
				<view style="margin-top: 30rpx;margin-bottom: 0;" class="n2b-tit1">近两年内该公司担任且擅长的岗位名称</view>
				<view style="color: #FF5C50;font-size: 20rpx;margin-top: 16rpx;">*请输入完整通用名称，例如：财务总监</view>
				<u-input :clearable='false' placeholder='请输入岗位名称，多个岗位名称用逗号隔开' v-model="value" type="text" />
				<view class="heng"></view>
			</view>
		</view>
		<view style="margin-top: 48rpx;" class="nav2 nav3 nav4">
			<view class="n2-box">
				<view class="n2b-tit1">哪几段工作经历积累了以下丰富经验<text class="red">*多选</text></view>
				<view class="nn-tit1">1.任意即可：<text style="color: #707070;">“大数据风控”、“大数据广告”</text></view>
				<view class="n2b-btns">
					<view class="b1" @click="is3_1 = true;is3_2 = false;is3_3 = false">
						<view class="b1-txt1">最近</view>
						<view v-if="!is3_1" class="circle"></view>
						<u-icon v-else name="checkmark-circle-fill" color="#2979ff" size="24"></u-icon>
					</view>
					<view @click="is3_2 = true;is3_1 = false;is3_3 = false" style="margin-left: 42rpx;" class="b1">
						<view class="b1-txt1">第二段</view>
						<view v-if="!is3_2" class="circle"></view>
						<u-icon v-else name="checkmark-circle-fill" color="#2979ff" size="24"></u-icon>
					</view>
					<view @click="is3_3 = true;is3_1 = false;is3_2 = false" style="margin-left: 42rpx;" class="b1">
						<view class="b1-txt1">第三段</view>
						<view v-if="!is3_3" class="circle"></view>
						<u-icon v-else name="checkmark-circle-fill" color="#2979ff" size="24"></u-icon>
					</view>
				</view>
				<view class="n2b-btns">
					<view class="b1" @click="is3_1 = true;is3_2 = false;is3_3 = false">
						<view class="b1-txt1">第四段</view>
						<view v-if="!is3_1" class="circle"></view>
						<u-icon v-else name="checkmark-circle-fill" color="#2979ff" size="24"></u-icon>
					</view>
					<view @click="is3_2 = true;is3_1 = false;is3_3 = false" style="margin-left: 42rpx;" class="b1">
						<view class="b1-txt1">全选</view>
						<view v-if="!is3_2" class="circle"></view>
						<u-icon v-else name="checkmark-circle-fill" color="#2979ff" size="24"></u-icon>
					</view>
					<view @click="is3_3 = true;is3_1 = false;is3_2 = false" style="margin-left: 42rpx;" class="b1">
						<view class="b1-txt1">全不选</view>
						<view v-if="!is3_3" class="circle"></view>
						<u-icon v-else name="checkmark-circle-fill" color="#2979ff" size="24"></u-icon>
					</view>
				</view>
				<view class="nn-tit1">2.必须全部：<text style="color: #707070;">“大数据风控”、“大数据广告”</text></view>
				<view class="n2b-btns">
					<view class="b1" @click="is3_1 = true;is3_2 = false;is3_3 = false">
						<view class="b1-txt1">最近</view>
						<view v-if="!is3_1" class="circle"></view>
						<u-icon v-else name="checkmark-circle-fill" color="#2979ff" size="24"></u-icon>
					</view>
					<view @click="is3_2 = true;is3_1 = false;is3_3 = false" style="margin-left: 42rpx;" class="b1">
						<view class="b1-txt1">第二段</view>
						<view v-if="!is3_2" class="circle"></view>
						<u-icon v-else name="checkmark-circle-fill" color="#2979ff" size="24"></u-icon>
					</view>
					<view @click="is3_3 = true;is3_1 = false;is3_2 = false" style="margin-left: 42rpx;" class="b1">
						<view class="b1-txt1">第三段</view>
						<view v-if="!is3_3" class="circle"></view>
						<u-icon v-else name="checkmark-circle-fill" color="#2979ff" size="24"></u-icon>
					</view>
				</view>
				<view class="n2b-btns">
					<view class="b1" @click="is3_1 = true;is3_2 = false;is3_3 = false">
						<view class="b1-txt1">第四段</view>
						<view v-if="!is3_1" class="circle"></view>
						<u-icon v-else name="checkmark-circle-fill" color="#2979ff" size="24"></u-icon>
					</view>
					<view @click="is3_2 = true;is3_1 = false;is3_3 = false" style="margin-left: 42rpx;" class="b1">
						<view class="b1-txt1">全选</view>
						<view v-if="!is3_2" class="circle"></view>
						<u-icon v-else name="checkmark-circle-fill" color="#2979ff" size="24"></u-icon>
					</view>
					<view @click="is3_3 = true;is3_1 = false;is3_2 = false" style="margin-left: 42rpx;" class="b1">
						<view class="b1-txt1">全不选</view>
						<view v-if="!is3_3" class="circle"></view>
						<u-icon v-else name="checkmark-circle-fill" color="#2979ff" size="24"></u-icon>
					</view>
				</view>
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
				pop1Show:false,
				gangweiValue: '',
				gangweiList: [],
				popoverList1: ['任意', '全部'],
				isYes: true,
				is2_1:false,
				is2_2:false,
				is3_1:false,
				is3_2:false,
				is3_3:false,
				is4_1:false,
				is4_2:false,
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
						label: '1000人以上'
					},
					{
						value: '2',
						label: '2000人以上'
					},
					{
						value: '3',
						label: '5000人以上'
					},
					{
						value: '4',
						label: '10000人以上'
					},
					{
						value: '5',
						label: '不限'
					}
				],
				sele2_1_val: '',
				hangyeValue:"",
				hangyeList:[],
			}
		},
		onShow() {
			this.sele5_1 = []
			this.sele5_2 = []
			for (let i = 16; i < 60; i++) {
				this.sele5_1.push({
					value: i,
					label: i
				})
				this.sele5_2.push({
					value: i,
					label: i
				})
			}
		},
		onLoad() {

		},
		methods: {
			onSubmit(){
				uni.navigateTo({
					url:'/pages/qzz/pipeidu'
				})
			},
			clickZk(i) {
				this.pop1Show = true;
			},
			getHangyeData(e) {
				console.log(e)
				var arr = []
				this.hangyeList = e;
				this.hangyeList.forEach(ele => {
					arr.push(ele.name)
				})
				this.hangyeValue = arr.toString()
			},
			getGangweiData(e) {
				console.log(e)
				var arr = []
				this.gangweiList = e;
				this.gangweiList.forEach(ele => {
					arr.push(ele.name)
				})
				this.gangweiValue = arr.toString()
			},
			toBack() {
				uni.navigateBack({
					delta: 1
				})
				// uni.switchTab({
				// 	url:'/pages/tabBar/daohang'
				// })
			},
			toHangye() {
				uni.navigateTo({
					url: '/pages/index/xuanzefenlei'
				})
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
				this.sele4_1_val = e[0].label
			},
			confirm4_2(e) {
				console.log(e[0])
				this.sele4_2_val = e[0].label
			},
			confirm4_3(e) {
				console.log(e[0])
				this.sele4_3_val = e[0].label
			},
			confirm5_1(e) {
				console.log(e[0])
				this.sele5_1_val = e[0].label
			},
			confirm5_2(e) {
				console.log(e[0])
				this.sele5_2_val = e[0].label
			},
			confirm2_1(e) {
				console.log(e[0])
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
					height: 4rpx;
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
					height: 4rpx;
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
			.nn-tit1{
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
				height: 4rpx;
				background: #ececec;
			}
			.n2b-tit3-1{
				font-size: 32rpx;
				font-family: PingFangSC, PingFangSC-Medium;
				font-weight: 500;
				color: #000000;
			}
			.n2b-tit3-2{
				margin-top: 12rpx;
				font-size: 28rpx;
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
					height: 4rpx;
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
					height: 4rpx;
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
		.f-txt{
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
	.pop1{
		.txx{
			transform: translateY(110rpx);
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
