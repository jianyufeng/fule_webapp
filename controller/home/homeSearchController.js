define(['app','jquery_fly'],function(app){

	function ctrl($scope,$ionicHistory,POP,$state,$rootScope){
		$(".mytab").find(".tab-title").css("color", "#000000");
		$(".middleIcon").find(".tab-title").css("color", "#D9A8CD");
		$scope.$on("$ionicView.enter",function(){
			console.log($rootScope.searchGoodsKeyName);
			if($rootScope.searchGoodsKeyName != undefined){
				$("#seachInput").val($rootScope.searchGoodsKeyName);
				POP.StartLoading();
				HTTP.get(API.Goods.searchList+"/search_key/" + $rootScope.searchGoodsKeyName, {}, function (e, data) {
				POP.EndLoading();
				if(e) {
						console.log("商品搜索失败");
						return;
					}

					console.log(data);

					if(data.count <= 0){
						POP.Hint("未搜索到相关商品");
						return;
					}

					$scope.$apply(function () {
						$scope.goodsArray = data.data;
					});
				})


			}
		});

		//$("#seachInput").focus();

		//搜索后退
		$scope.searchBackBtn = function(){
			$ionicHistory.goBack();
		}

		$scope.goodsSearchClick = function(){
			console.log("搜索...");

			var inputValue = $("#seachInput").val();

			if(inputValue.length <= 0){
                return;
			}

			$rootScope.searchGoodsKeyName = inputValue;


			POP.StartLoading();

			HTTP.get(API.Goods.searchList+"/search_key/" + inputValue, {}, function (e, data) {
				POP.EndLoading();
				if(e) {
						console.log("商品搜索失败");
						return;
					}

					console.log(data);

					if(data.count <= 0){
						POP.Hint("未搜索到相关商品");
						return;
					}

					$scope.$apply(function () {
						$scope.goodsArray = data.data;
					});
				})
			

		}


		$scope.$on("viewOnFinish", function () {

			$(".goodsImage img").myImageLazyLoad({
				//默认三个参数可不传，使用默认参数
				// imageLoadErr : "./resource/images/default/default_image.png", //加载失败占位图
				// imageServer : "http://image.38zs.net:848",				    //图片服务器地址
				// animate     : true,											//是否动画显示
			});
         
        });

		// $(document).on("click", ".inputSearch", function () {
		// 	alert(1);
		// });


		$(document).on("click", ".goodsItem", function () {
            var goodsId = $(this).attr('name');
            var goodsNumber = $(this).attr('number');

            if (goodsNumber > 0) {
                $state.go("tab.searchGoodsDetail", {"goodsId": goodsId});
            }
        });

        $(document).off("click", ".goodsCart").on("click", ".goodsCart", function () {


            var offset = $(".tab-item:eq(3)").offset();
            var addcar = $(this).parent().parent().prev();
            var img = addcar.find('img').attr('src');
            var flyer = $('<img class="u-flyer" src="' + img + '">');
            var goodsPrice = $(this).parent().parent().children(".goodsMoney").text().substring(2);
            var goodsName = $(this).parent().children(".goodsDesc").text();
            var goodsId = $(this).find('img').attr('id');

            if (User.isLogin()) {
                var userInfo = User.getInfo();

                HTTP.post(API.Cart.cartAdd, {
                    "user_name": userInfo.user_name,
                    "user_id": userInfo.user_id,
                    "goods_id": goodsId,
                    "goods_name": goodsName,
                    "goods_number": 1,
                    "goods_price": goodsPrice,

                }, function (e, data) {
                    if (e) {
                        return;

                    }

                });

                flyer.fly({
                    start: {
                        left: event.pageX, //开始位置（必填）#fly元素会被设置成position: fixed
                        top: event.pageY //开始位置（必填）
                    },
                    end: {
                        left: offset.left + 10, //结束位置（必填）
                        top: offset.top + 20, //结束位置（必填）
                        width: 0, //结束时宽度
                        height: 0 //结束时高度
                    },
                    onEnd: function () { //结束回调
                        $scope.$apply(function () {
                            $rootScope.cartBadge++;
                        })


                    }
                });


            } else {
                POP.Confirm("您未登录，点击确定进入登录页面！", function () {
                    location.href = "./login/login.html";
                })
            }

            return false;

        });
		
	}

	ctrl.$inject = ['$scope','$ionicHistory','POP','$state','$rootScope'];
	app.registerController('homeSearchController',ctrl);

});