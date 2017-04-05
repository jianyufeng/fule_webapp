/*
 * 主控制器文件
 */

//console.log("[框架]====>[加载主控制器文件]");

define(['app'],function(app){

	function ctrl($scope,$rootScope){

		//.....
		//获取购物车总数
		if (User.isLogin()) {
                var userId = User.getInfo().user_id;
                HTTP.get(API.Category.getCartNum + "/user_id/" + userId + "/shopping_type/1", {}, function (e, data) {
					$scope.$apply(function () {
                        $rootScope.cartBadge = data;
                    });
                })
        }
		

	}

	ctrl.$inject = ['$scope','$rootScope'];
	app.registerController('mainController',ctrl);


});