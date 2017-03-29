define(['app'],function(app){

    app.factory("cartService",function(){

         var service = {};

        /* 获取服务器数据*/
        /*网络获取用户信息*/
        service.getCartGoods = function ($scope, POP, isRefresh) {
            if (!isRefresh) {
                $.initAppStartLoad();
            }
            //获取用户的账号
            var info = User.getInfo();
            HTTP.get(API.Cart.cartSearch + "/shopping_type/1/user_id/"+info.user_id , {}, function (e, data) {
                if (e) {
                    if (!isRefresh) {
                        POP.Hint("对不起，刷新失败");
                        return
                    }
                    $.loadError(function () {
                        console.log(132);
                        service.getCartGoods();
                    });
                    return;
                }

                $scope.$apply(function () {
                    $scope.cart_goods = data.cart_goods;
                    //$scope.travel_points = data.travel_points;
                    if (!isRefresh) {
                        $.initAppEndLoad();
                    }
                });

                if (isRefresh) {
                    $scope.$broadcast('scroll.refreshComplete');
                }


            });

        };
         

         return service;

    });


});