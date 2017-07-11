/*
 * 主控制器文件
 */

//console.log("[框架]====>[加载主控制器文件]");

define(['app'],function(app){

	function ctrl($scope,$rootScope,$state,$ionicTabsDelegate){





		console.log("mainController......");

		if(customStorage.getPersistenceValue("regionData") == null){

			HTTP.get(API.Other.getRegion,{},function(e,data){

				if(e){
					console.log("省市区数据请求失败");
					return;
				}

				if(data.data.length > 0){

					customStorage.setPersistenceValue("regionData",JSON.stringify(data.data));

				}
				
			});


		}

		//console.log(111111);
		//console.log(locationInfo.getProvince());
		//console.log(locationInfo.getCity(5));
		//console.log(locationInfo.getArea(62));

		//.....
		//获取购物车总数
		if (User.isLogin()) {
                var userId = User.getInfo().user_id;
                HTTP.get(API.Category.getCartNum + "/user_id/" + userId + "/shopping_type/1", {}, function (e, data) {

                	if(e) {
						$rootScope.cartBadge = 0;
						return;
					}

					data = data == undefined ? 0 : data;
					$scope.$apply(function () {
                        $rootScope.cartBadge = data;
                    });
                })
        }

		$scope.tabSelect=function(index){
			$(".mytab").find(".tab-title").css("color","#000000");
			if(index==0) {
				$state.go('tab.goods',{});
				$(".goodsIcon").find(".tab-title").css("color","#D9A8CD");
			} else if(index==1) {
				$state.go('tab.category',{});
				$(".fenleiIcon").find(".tab-title").css("color","#D9A8CD");
			} else if(index==2) {
				$state.go('tab.home', {});
				$(".middleIcon").find(".tab-title").css("color","#D9A8CD");
			}else if(index==3) {
				$state.go('tab.cart', {});
				$(".cartIcon").find(".tab-title").css("color","#D9A8CD");
			}else if(index==4) {
				$state.go('tab.my', {});
				$(".myIcon").find(".tab-title").css("color","#D9A8CD");
			}
		};

		//var refresh = $.cookie('refresh');
		//if(refresh == undefined || refresh === 'null'){
		//}else{
		//	$state.go('tab.home', {});
		//	window.setTimeout(function(){
		//		$rootScope.hideTabs = false;
		//		$ionicHistory.clearHistory();
		//	},0);
        //
        //
		//}
		//$.cookie("refresh", 1, {path: '/'});


		$.initAppEndLoad();
	}

	ctrl.$inject = ['$scope','$rootScope','$state','$ionicTabsDelegate'];
	app.registerController('mainController',ctrl);


});