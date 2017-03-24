define(['app'],function(app){

	function ctrl($scope,myService){
		console.log("我的界面控制器...");

		//console.log(categoryService);
		$scope.$on('$ionicView.loaded', function () {
			myService.getMyInfo($scope);
		});

	}

	ctrl.$inject = ['$scope', 'myService'];
	app.registerController('myController', ctrl);


});