define(['app'], function (app) {

    app.factory("myBuyHappyHomeServer", function () {

        var service = {};
        var first = true;
        /*网络获取未读消息记录 信息*/
        service.getBuyGoodList = function ($scope, POP) {
            if (first) {
                POP.StartLoading();
            }
            //获取用户的账号
            HTTP.get(API.My.buyGoodsList, {}, function (e, data) {
                POP.EndLoading();
                if (e) {
                    POP.Hint("加载失败");
                    return;
                }
                first = false;
                console.log(data);
                $scope.$apply(function () {
                    //$scope.datas = data.data;
                })
            }

        );

};
return service;


})
;


})
;