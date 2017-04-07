/*
 * 主控制器文件
 */

//console.log("[框架]====>[加载主控制器文件]");

define(['app'],function(app){

	function ctrl($scope,$rootScope,$state){

		//.....
		//获取购物车总数
		if (User.isLogin()) {
                var userId = User.getInfo().user_id;
                HTTP.get(API.Category.getCartNum + "/user_id/" + userId + "/shopping_type/1", {}, function (e, data) {

					data = data == undefined ? 0 : data;
					$scope.$apply(function () {
                        $rootScope.cartBadge = data;
                    });
                })
        }

		$scope.tabSelect=function(index){
			if(index==0) {
				$state.go('tab.goods',{});
			} else if(index==1) {
				$state.go('tab.category',{});
			} else if(index==2) {
				$state.go('tab.home', {});
			}else if(index==3) {
				$state.go('tab.cart', {});
			}else if(index==4) {
				$state.go('tab.my', {});
			}
		}

	}

	ctrl.$inject = ['$scope','$rootScope','$state'];
	app.registerController('mainController',ctrl);


});