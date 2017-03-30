define(['app'], function (app) {

    app.factory("myOrderFormService", function () {

        var service = {};

        /*网络获取商城订单 信息*/
        service.getShopOrderForm = function ($scope, POP, type) {
            if ($scope.isCanPull) {
                POP.StartLoading();
            }

            //获取用户的账号
            var info = User.getInfo();
            HTTP.get(API.My.myOrderForm + "/skip/"+ $scope.page * 10 +"/limit/10/order_type/" + type + "/user_id/" + info.user_id, {}, function (e, data) {
                POP.EndLoading();
                if (e) {
                    POP.Hint("加载失败");
                    return;
                }
                $scope.data = data.data;

                if (data.data.length < 10) {
                    $scope.isCanPull = false;
                } else {
                    $scope.isCanPull = true;
                    $scope.page++;
                }
                $scope.$broadcast('scroll.infiniteScrollComplete');
            });

        };
        return service;


    });


});