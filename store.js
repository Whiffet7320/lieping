import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
export default new Vuex.Store({
	state: {
		searchList: [],
		shopPage:1,
		shopPageSize: 15,//商品列表
		IndexshopPage:1,
		IndexshopPageSize: 15,//首页商品列表
		dingdanPage:1,
		dingdanPageSize: 15,//订单列表
		jifenShopPage:1,
		jifenShopPageSize: 15,//积分商品列表
		pinlunPage:1,
		pinlunPageSize: 15,//评论列表
		from:21,
		token:uni.getStorageSync("token")||"",
		userInfo: {},
		uid:uni.getStorageSync("uid") || 0,
		addressInfo:null,
		onResh:false,
		proInfo:{},
		orderInfo:{},
		haveDot:false,
		shareTitle:"",
		post_id:"",
	},
	mutations: {
		searchList(state, str) {
			if (str != '') {
				state.searchList.push(str);
			}
			if (state.searchList.length > 10) {
				state.searchList.pop()
			}
		},
		post_id(state, str) {
			state.post_id = str;
		},
		shareTitle(state, str) {
			state.shareTitle = str;
		},
		haveDot(state, str) {
			state.haveDot = str;
		},
		from(state, str) {
			state.from = str;
		},
		shopPage(state, str) {
			state.shopPage = str;
		},
		IndexshopPage(state, str) {
			state.IndexshopPage = str;
		},
		dingdanPage(state, str) {
			state.dingdanPage = str;
		},
		jifenShopPage(state, str) {
			state.jifenShopPage = str;
		},
		pinlunPage(state, str) {
			state.pinlunPage = str;
		},
		// 
		Login(state, opt) {
			state.token = opt.token;
		},
		SetUid(state,val){
			state.uid = val;
			uni.setStorageSync("uid",val);
		},
		UpdateUserinfo(state, userInfo) {
			state.userInfo = userInfo;
			uni.setStorageSync("userInfo",userInfo);
		},
		setAddress(state,data){
			state.addressInfo = data;
		},
		setResh(state,data){
			state.onResh = data;
		},
		setProinfo(state, data) {
			state.proInfo = data;
		},
		setOrderInfo(state, data) {
			state.orderInfo = data;
		}
	},
	getters:{
		token: state => state.token,
		isLogin: state => !!state.token,
	},
	actions: {

	},
});
