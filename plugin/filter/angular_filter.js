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

	/*显示专卖店等级*/
	app.filter('storeLevelFilter',function($rootScope){
		return function (input,varl){
			switch (input) {
				case  0:
					varl = '会员';
					break;
				case  1:
					varl = '专卖店';
					break;
				case  2:
					varl = '旗舰店';
					break;
				default:
					varl = '会员';
					break;
			}
			return varl
		}

	});




});