define(['app','./Fun/goods_fun'],function(app,goods_fun){

	function ctrl($scope, $rootScope, goodsService, POP, $state,$ionicScrollDelegate){

		var _type = 'ALL';

		goods_fun.menuSelected($ionicScrollDelegate);

		$(".mytab").find(".tab-title").css("color", "#000000");
		$(".goodsIcon").find(".tab-title").css("color", "#D9A8CD");
		var nowSreenH = $("#goodContentBox").height();
		$scope.goodListScrollEvent = function(){
			var scrollTop = $ionicScrollDelegate.getScrollPosition().top;
			if(parseInt(scrollTop) > parseInt(nowSreenH)){
				 $(".goTop").fadeIn(200);
			}else{
				$(".goTop").fadeOut(200);
			}
		}
		$(".goTop").click(function(){
			$ionicScrollDelegate.scrollTop(true);
		});

		$scope.$on("$ionicView.enter",function(){


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



		});

		// 加入购物车
		goods_fun.addCart($scope, $rootScope, $state, POP);

		// 下拉刷新
		$scope.doRefresh = function(){

			if(_type!= 'ALL'){
				goodsService.getCategoryGoodList($scope,_type,POP)
			}else{
				goodsService.getGoodList($scope,true);
			}




		}
        //上拉加载
		$scope.loadMore = function(){

			setTimeout(function(){
				$scope.$broadcast('scroll.infiniteScrollComplete');
			},2000);

		}

		//根据条件获取相应商品
		$(".goodsMenuItem").click(function(){

			_type = $(this).attr("id");

			goodsService.getCategoryGoodList($scope,_type,POP)


		});

		$scope.$on('$ionicView.loaded', function () {
			goodsService.getGoodList($scope,false);
		});

		$scope.$on("viewOnFinish", function () {

			$(".goodsImage img").myImageLazyLoad({
				//默认三个参数可不传，使用默认参数
				// imageLoadErr : "./resource/images/default/default_image.png", //加载失败占位图
				// imageServer : "http://image.38zs.net:848",				    //图片服务器地址
				// animate     : true,											//是否动画显示
			});
         
        });




	}

	ctrl.$inject = ['$scope','$rootScope', 'goodsService','POP','$state','$ionicScrollDelegate'];
	app.registerController('goodsController',ctrl);


});