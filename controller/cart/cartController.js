define(['app',"./Fun/cart_fun",'jquery_fly'],function(app,cart_fun){

	function ctrl($scope){

		$scope.aa = [];

		$(".accountBox").click(function(){
			alert(1);
		});
		
		
	}

	ctrl.$inject = ['$scope'];
	app.registerController('cartController',ctrl);


});