
var userinfo = {
	// {
	// 	type: "avatar",
	// 	value: "avatar.png"
	// },
	'base':[
		{
			type: "namexx",
			name: "名字",
			value: "李培坚"
		},
		{
			type: "age",
			name: "年龄",
			value: "33<small> (1986-12-02)</small>"
		},
		{
			type: "birthplace",
			name: "籍贯",
			value: "福建省泉州市"
		},
		{
			type: "job",
			name: "应聘岗位",
			value: "前端开发 <small>&#60;F2E&#62;</small>"
		}
	],
	'content':[
		{
			icon: {
				class: "icon-weixin",
				color: "#24db5a"
			},
			type: "wechat",
			value: "lipeijian2202"
		},
		{
			icon: {
				class: "icon-qq",
				color: "#4cafe9"
			},
			type: "qq",
			value: "200814174"
		},
		{
			icon: {
				class: "icon-shouji",
				color: "#13227a"
			},
			type: "phonenumber",
			value: "13640430944"
		},
		{
			icon: {
				class: "icon-youxiang",
				color: "#d4237a",
				size: "16px"
			},
			type: "e-mail",
			value: "lpjsteel@hotmail.com"
		},
		{
			icon: {
				class: "icon-wangzhan",
				color: "#e44d26"
			},
			type: "website",
			value: "www.icsscn.com"
		}
	]
}


export var lpj = {
	"Me": userinfo,
	"Skills": [
		{
			"icon": {
				class: "icon-HTML",
				color: "#e44d26"
			},
			"skill": "HTML/HTML5",
			"des": "了解常用的标签，注重语义化，能写出符合 W3C 标准的HTML，能使用。能使用 meta 便签 + CSS3 media ，对网站进行相对的尺寸自适应。"
		},
		{
			"icon": {
				class: "icon-CSS",
				color: "#264de4"
			},
			"skill": "CSS/CSS3",
			"des": "对于常用的函数和原型链、作用域有一定的理解。框架使用方面，jQuery 比较表熟练，能对 DOM 的进行业务需要的操作，包括使用 Ajax 对服务进行获取数据；对于目前的主流框架 Vue 比较常用，通常都是使用 Vue + Vue-router + Vuex + axios 完成符合业务需求的web APP 。"
		},
		{
			"icon": {
				class: "icon-JavaScript",
				color: "#f5dd1e"
			},
			"skill": "javascript/ECMAScript",
			"des": "对于常用的函数和原型链、作用域有一定的理解。框架使用方面，jQuery 比较表熟练，能对 DOM 的进行业务需要的操作，包括使用 Ajax 对服务进行获取数据；对于目前的主流框架 Vue 比较常用，通常都是使用 Vue + Vue-router + Vuex + axios 完成符合业务需求的web APP 。"
		},
		{
			"icon": {
				class: "icon-node-jsNodejsxingnengpingtai",
				color: "#f15533"
			},
			"skill": "Node.js",
			"des": "能使用 Node.js 做业务逻辑相对比较简单的网站的后台，通常配合 Node.js + Express + MongoDB 进行开发。能使用 Webpack、Grunt 对网站进行配置打包。"
		}
	],
	"Jobs": [
		{
			"year": "2017-06-02 到 至今",
			"company": "中山漫道服装设计有限公司",
			"des": "主要负责公司官网（www.mattmatt.cn）的测试工作及公众号（mattmatt）的运营工作。期间负责 MAD.Q 小程序的开发工作，工作内容包括小程序的前端开发及其网站的后台 API 开发，整个项目均由个人开发（不包括页面设计）。"
		},
		{
			"year": "2015-07-08 到 2017-06-02",
			"company": "中山初心技术服务有限公司",
			"des": "主要负责公司官网（www.mdecomics.com）的前端页面开发的工作，由于公司技术部门管理上的问题，后期开发工作就交由外包公司全面负责。"
		},
		{
			"year": "珠海如易软件有限公司",
			"company": "2010-09-01 到 2013-09-01",
			"des": "主要公司官网（www.ueesoft.com）和如易汽车用品商城（www.uee360.com）前端页面开发及维护。"
		}
	],
	"Projects": [
		{
			"title": "梵特家居网",
			"banner": "vinte.jpg",
			"work": "前后端和页面设计均为个人开发。",
			"skills": "html, javascript, Node.js, Express, MongoDB 等等",
			"website": "www.vinte.xin",
			"description": "使用 grunt 自动化项目，前端页面使用 pug (原 jade) 模板引擎 + jQuery 框架开发；后端使用 Node.js + Express 的开发框架进行开发，数据库使用 nosql 的 MongoDB 对网站数据进行存储。通过自己对整个项目的开发，了解了 Grunt 的配置设置，如 最大的收获就是能够了解到整个项目在服务器上的发布过程，可以使用PM2对服务器自动化发布、更新代码，并且可以在服务器上防火墙的设置和Nginx的代理服务，https证书的获取和部署。",
		},
		{
			"title": "MAD.Q 童装小程序",
			"banner": "madq.jpg",
			"work": "主要个人负责开发小程序的前端页面和后台程序及API接口(api.vinte.xin)的开发。",
			"skills": "微信小程序 API, javascript, css, Node.js",
			"website": "https://api.vinte.xin",
			"description": "通过该项目的开发，主要是能了解小程序提供的api功能及使用，收获比较大的是模块化开发，其好处就可重用易维护。还有就是组件开发，如自定义的wx.showLoading、wx.showToast。",
			"qrcode": "gh_5a969e2b9dea_258.png"
		},
		{
			"title": "mattmatt",
			"banner": "mattmatt.jpg",
			"work": "给予的外包公司项目，主要负责网站的原型设计方案，及后期网站的进度跟进及功能测试。",
			"skills": "html, css, jQuery, javascript",
			"website": "www.mattmatt.cn",
			"description": "mattmatt 为香港原创设计品牌，主要是以中高端品牌为定位，服装彰显个性，适合当代追求时尚的流行趋势，受众人群层面广，年龄跨度大。",
		},
		{
			"title": "漫道网",
			"banner": "mandao.jpg",
			"work": "公司项目，主要是负责前端页面的开发。",
			"skills": "html, css, jQuery, javascript",
			"website": "www.mdecomices.cn",
			"description": "「跨越港澳和内地的原创漫画网站，以培养漫画新人为己任，创造丰富的机会为漫画爱好者们提供展示的舞台，力求将最好的产品及服务提供给广大动漫从业人员及爱好者，为所有漫画、小说及插画作者创造良好的创作机制。",
		}
	],
	"About": {
		"title": "自我简介",
		"des": "本人主攻前端开发方向和 Node.js 开发，目标是成为独当一面的全栈开发程序员。有近5年的开发经验，平时会通过一些技术博客和GitHub 学习新的知识从而提高自己的专业技能。但是如果任务急需快速了解一个框架或语言，本人会通过付费视频教程快速学习并使用，当任务完成后在业余时间内再去巩固其原理和基础。除了前端的知识外，本人还喜欢浏览Behace和站酷上浏览优秀的设计作品，有一定的审美标准。在工作期间过程中也运营过公众号、自媒体，也对其有一定的理解和经验。",
		"thx": "Thanks for<br>Watching",
		"btn": {
			"title": "简历下载",
			"src": ""
		}
	}
}

