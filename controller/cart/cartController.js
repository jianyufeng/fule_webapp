define(['app',"./Fun/cart_fun",'jquery_fly'],function(app,cart_fun){

	function ctrl($scope){

		$scope.aa = [];

		// $(".accountBox").click(function(){
		// 	alert(1);
		// });


		$(".selectBtn").click(function () {

			var _idx = $(".selectBtn").index(this);


			if($(this).find("img").is(':visible')){
				$(this).find("img").hide();
			}else{
				$(this).find("img").show();
			}



		});

		$(".allSelectBtn").click(function(){
			if($(this).find("img").is(':visible')){

				$(this).find("img").hide();

				$(".selectBtn").find("img").hide();

			}else{

				$(this).find("img").show();
				$(".selectBtn").find("img").show();

			}
		});





		
	}

	ctrl.$inject = ['$scope'];
	app.registerController('cartController',ctrl);


});