define(['app','./Fun/goods_fun'],function(app,goods_fun){

	function ctrl($scope,$rootScope, goodsService,POP){

		goods_fun.
		();




		// 下拉刷新
		$scope.doRefresh = function(){

			goodsService.getGoodList($scope,true);


		}
        //上拉加载
		$scope.loadMore = function(){

			setTimeout(function(){
				$scope.$broadcast('scroll.infiniteScrollComplete');
			},2000);

		}

		//根据条件获取相应商品
		$(".goodsMenuItem").click(function(){

			var _type = $(this).attr("id");

			goodsService.getCategoryGoodList($scope,_type,POP)


		});

		$scope.$on('$ionicView.loaded', function () {
			goodsService.getGoodList($scope,false);
		});

		// 加入购物车
		goods_fun.addCart($scope,$rootScope);

	}

	ctrl.$inject = ['$scope','$rootScope', 'goodsService','POP'];
	app.registerController('goodsController',ctrl);


});