define(['app'],function(app){

	function ctrl($scope,$rootScope,$ionicModal){


		$.initAppEndLoad();

		$ionicModal.fromTemplateUrl("login.html", {
			scope: $scope,
			animation: 'slide-in-up'
		}).then(function(modal) {
			$scope.modal = modal;
		});

		$scope.showMoney = function(){
			$scope.modal.show();
		}
	}

	ctrl.$inject = ['$scope','$rootScope','$ionicModal'];
	app.registerController('myController',ctrl);


});