define(['app'],function(app){

	function ctrl($scope,categoryService){

		console.log("分类界面控制器...");

		console.log(categoryService);

		$scope.$on('$ionicView.loaded', function() {
			categoryService.getCategoryGoodsInfo($scope);
		});



	}

	ctrl.$inject = ['$scope','categoryService'];
	app.registerController('categoryController',ctrl);


});