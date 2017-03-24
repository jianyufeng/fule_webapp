define(['app','./Fun/goods_fun'],function(app,goods_fun){

	function ctrl($scope,goodsService){

		goods_fun.menuSelected();

		$scope.doRefresh = function(){

			setTimeout(function(){
				$scope.$broadcast('scroll.refreshComplete');
			},2000);

		}

		$scope.loadMore = function(){

			setTimeout(function(){
				$scope.$broadcast('scroll.infiniteScrollComplete');
			},2000);

		}

		$scope.$on('$ionicView.loaded', function () {
			goodsService.getGoodList($scope);
		});


	}

	ctrl.$inject = ['$scope', 'goodsService'];
	app.registerController('goodsController',ctrl);


});