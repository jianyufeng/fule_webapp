define(['app','addressSelect'],function(app,home_fun){

	function ctrl($scope){

		
		$(".lunboBanner").click(function(){
				new AddressSelect({
					resultBtnClick : function(result){
					console.log(result);
					}
				});
		})
		
		//  $scope.addressSelect = function(){

			
			 
		//  }
		
		
	}

	ctrl.$inject = ['$scope'];
	app.registerController('homeController',ctrl);


	

});