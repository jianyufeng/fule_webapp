define(['app'], function (app) {

    app.factory("myOrderFormDetailsService", function () {

        var service = {};

        /*网络获取商城订单 信息*/
        service.getOrderFormDetails = function ($scope, POP, orderId) {
            //获取用户的账号\
            POP.StartLoading();
            var info = User.getInfo();
            HTTP.get(API.My.myOrderFormDetails + "/user_id/" + info.user_id + "/order_id/" + orderId, {}, function (e, data) {
                POP.EndLoading();
                if (e) {
                    POP.Hint("订单详情获取失败");
                    $.loadError(function () {
                        service.getOrderFormDetails();
                    });
                    return;
                }
                console.log(3333);
                console.log(data);
                $scope.$apply(function () {
                    $scope.orderInfo=data.orderInfo
                    $scope.data=data.orderGoods.data;
                });

            });

        };
        return service;


    });


});