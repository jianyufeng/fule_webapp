/*
 * angularjs过滤器扩展文件
 */

console.log("[框架]====>[加载angularjs过滤器自定义扩展文件]");

define(['app'],function(app){

	app.filter('demoFilter', function($rootScope) {
		return function(input,var1){
            return input + "|" + var1;
        }
	});




});