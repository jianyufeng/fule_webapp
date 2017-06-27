define(['app','addressSelect'],function(app,home_fun){

	function ctrl($scope){

		// var hotGoods = [];

		// $scope.$on("$ionicView.enter",function(){

		// 		HTTP.get(API.Home.getHomeInfo, {}, function (e, data) {

		// 			if(e) {
		// 				console.log("首页信息加载失败");
		// 				return;
		// 			}

		// 			console.log(data);

		// 			hotGoods = data['hotGoods'];
		// 			$scope.$apply(function () {
		// 				$scope.hotGoodsData = hotGoods.data;
		// 			});

		// 			$(".newGoodsImage img").myImageLazyLoad({});
		// 			$(".newGoodsImage2 img").myImageLazyLoad({});

		// 		})
			
		// });

		




	}

	ctrl.$inject = ['$scope'];
	app.registerController('homeController',ctrl);

});