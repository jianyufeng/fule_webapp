define(['app','./Fun/goods_fun'],function(app){

	function ctrl($scope){

		console.log("商品界面控制器...");

	}

	ctrl.$inject = ['$scope'];
	app.registerController('goodsController',ctrl);


});