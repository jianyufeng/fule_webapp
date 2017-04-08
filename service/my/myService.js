define(['app'], function (app) {

    app.factory("myService", function () {

        var service = {};

        /*网络获取用户信息*/
        service.getMyInfo = function ($scope, POP, isRefresh) {
            if (!isRefresh) {
                $.initAppStartLoad();
            }
            //获取用户的账号
            var info = User.getInfo();
            HTTP.get(API.My.myInfo + "/user_name/"+info.user_name , {}, function (e, data) {
                if (e) {
                    if (!isRefresh) {
                        POP.Hint("对不起，刷新失败");
                        return
                    }
                    $.loadError(function () {
                        service.getMyInfo();
                    });
                    return;
                }

                $scope.$apply(function () {
                    $scope.userInfo = data.userInfo;
                    $scope.travel_points = data.travel_points;
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