configureWebpack: config => {
 	Object.assign(config, {
 		externals: {
 			pinyinPro: 'pinyin-pro'
 		}
 	})
 }
