/*
 * 启动时文件
 */

console.log("[框架]====>[加载启动引导文件]");

define([
	'app',			
	'angular_directive',
	'angular_service',
	'angular_filter',
	'routes',
	'liweixuanRoutes',
	'lixufengRoutes',
	'jianyufengRoutes',
	'xieshaoxiongRoutes',
	'yejingyaRoutes',
	'lodash',
	'utils',
	'init',
	'css',
	'text',
	'API',
	'business_service'
],function(){
    angular.bootstrap(document,['myApp']);
});
