define(['app'], function (app) {

    app.factory("myService", function () {

        var service = {};
        service.getMyInfo = function ($scope) {

            $.initAppStartLoad();

            HTTP.get(API.My.myInfo + "/user_name/zhoulibo4", {}, function (e, data) {
                console.log(data);
                if (e) {
                    $.loadError(function () {
                        service.getMyInfo();
                    });
                    return;
                }

                $scope.$apply(function () {
                    $scope.userInfo = data.userInfo;
                    $scope.travel_points = data.travel_points;
                    $.initAppEndLoad();
                });


                console.log(data);


            });

        };
        return service;


    });


});