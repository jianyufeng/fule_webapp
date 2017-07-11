define(['app', 'jquery_fly'],function(app,home_fun){

	function ctrl($scope,$state,POP,$rootScope){

		 var hotGoods  = [];
		 var newsGoods = {};
		POP.StartLoading();
		$scope.$on("$ionicView.enter",function(){

				HTTP.get(API.Home.getHomeInfo, {}, function (e, data) {
				POP.EndLoading();
					
              

					if(e) {
						console.log("首页信息加载失败");
						return;
					}

					console.log("首页家在信息");
					console.log(data);

					

					// hotGoods = data['hotGoods'];
					$scope.$apply(function () {

						$scope.hotGoodsData  = data.hotGoods.data;
						$scope.newsGoodsData = data.newGoods.data;
					});
					// $(".homeImage_0 img").myImageLazyLoad({imgSize:true});
					// $(".homeImage_1 img").myImageLazyLoad({imgSize:true});
					// $(".homeImage_2 img").myImageLazyLoad({imgSize:true});
					// $(".homeImage_3 img").myImageLazyLoad({imgSize:true});
					$(".homeImage_4 img").myImageLazyLoad({});
					$(".homeImage_5 img").myImageLazyLoad({});
					$(".homeImage_6 img").myImageLazyLoad({});
					$(".homeImage_7 img").myImageLazyLoad({});
					$(".homeImage_8 img").myImageLazyLoad({});


				})
			
		});

		$(document).on("click", ".goodsItem", function () {
            var goodsId = $(this).attr('name');

			
            //var goodsNumber = $(this).attr('number');

           // if (goodsNumber > 0) {
                $state.go("tab.searchGoodsDetail", {"goodsId": goodsId});
           // }
        });



		$(document).off("click", ".cartIcon").on("click", ".cartIcon", function () {


            var offset = $(".tab-item:eq(3)").offset();
            var addcar = $(this).prev().prev().prev();
            var img = addcar.find('img').attr('src');
            var flyer = $('<img class="u-flyer" src="' + img + '">');
            var goodsPrice = $(this).data("goodsprice");
            var goodsName = $(this).data("goodsname");
            var goodsId = $(this).data("goodsid");

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




		$scope.goSearchVC = function(){
			$state.go("tab.homeSearch", {});
		};


		$scope.goGoodsDetail = function (goodsId) {

            $state.go("tab.searchGoodsDetail", {"goodsId": goodsId});
        }






	}

	ctrl.$inject = ['$scope','$state','POP','$rootScope'];
	app.registerController('homeController',ctrl);

});