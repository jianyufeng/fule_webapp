define(['app'],function(app,home_fun){

	function ctrl($scope){
		
		console.log("首页控制器...");
		
		
	}

	ctrl.$inject = ['$scope'];
	app.registerController('homeController',ctrl);


	

});