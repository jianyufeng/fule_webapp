define(['app','./Fun/goods_fun'],function(app,goods_fun){

	function ctrl($scope){

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




	}

	ctrl.$inject = ['$scope'];
	app.registerController('goodsController',ctrl);


});