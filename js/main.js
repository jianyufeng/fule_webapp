/*
 * require配置文件
 */

//console.log("[框架]====>[加载require主入口文件]");

require.config({

	//设置文件加载路径配置
	paths: {
		'app'				: './app',								   //angularjs主配置文件
		'init'				: './init',								   //初始化配置文件
		'routes'		    : './routes',							   //路由文件
		'jquery'			: '../lib/js/jquery',					   //jquery库文件
		'jquery_fly'		: '../lib/js/jquery.fly.min',			   //购物车加入动画
		'animate'			: '../lib/js/jquery.transit',			   //动画库			
		'loading'			: '../plugin/loading/loading',   		   //动画加载插件文件
		'lodash'			: '../lib/js/lodash',					   //通用库
		'cookie'			: '../lib/js/jquery.cookie',			   //cookie	
		'angular_directive' : '../plugin/directive/angular_directive', //angularjs指令扩展
		'angular_service'   : '../plugin/service/angular_service', 	   //angularjs公共服务扩展
		'angular_filter'    : '../plugin/filter/angular_filter', 	   //angularjs公共过滤器扩展
		'utils'				: './util',								   //工具类
		'linq'				: '../lib/js/JSLINQ',			   		   //linq工具
		'business_service'  : './business_service',					   //业务服务加载区	
		'API'				: '../api/Api',							   //接口配置文件加载
		'css'				: '../lib/js/requirejs-css.min',		   //加载CSS插件
		'text'				: '../lib/js/requirejs-text',		       //加载文本插件
		'dotdotdot'			: '../lib/js/jquery.dotdotdot.min',		       //加载文本省略插件

		'liweixuanRoutes'	   : './tempRoutes/liweixuan',				   //李蔚轩临时路由
		'lixufengRoutes'	   : './tempRoutes/lixufeng',				   //李许峰临时路由
		'jianyufengRoutes'	   : './tempRoutes/jianyufeng',				   //简玉峰临时路由
		'xieshaoxiongRoutes'   : './tempRoutes/xieshaoxiong',			   //谢少雄临时路由
		'yejingyaRoutes'	   : './tempRoutes/yejingya'				   //叶静雅临时路由
	},

	//设置优先加载文件
	deps: ['jquery', 'bootstrap'],

	shim : {
		'liweixuanRoutes' : ['routes'],
		'lixufengRoutes' : ['routes'],
		'jianyufengRoutes' : ['routes'],
		'xieshaoxiongRoutes' : ['routes'],
		'yejingyaRoutes' : ['routes']
	},

	//禁止文件缓存
	urlArgs : "bust=" +  (new Date()).getTime()

});