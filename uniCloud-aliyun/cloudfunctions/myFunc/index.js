'use strict';
// import pinyin from 'pinyin'
const pinyin = require('pinyin')
exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('pinyin : ', pinyin)
	//返回数据给客户端
	return pinyin
};
