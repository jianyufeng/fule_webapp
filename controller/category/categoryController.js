define(['app'],function(app){

	function ctrl($scope){

		console.log("分类界面控制器...");

	}

	ctrl.$inject = ['$scope'];
	app.registerController('categoryController',ctrl);


});