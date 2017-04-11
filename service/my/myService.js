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
                };
                // D级别的标准
                var a=data.config.IS_D;
                console.log("D级别的标准"+a);
                // 当前用户的级别
                var b=data.userInfo.REGISTER_GRADE;
                console.log(" 当前用户的级别"+b);
                b=4;
                if(b<4){
                 // 显示按钮
                    $("#gradeButton").css("display","none");
                }else {
                    $("#gradeButton").css("display","block");
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


        service.upGrade=function($scope,$state){
            $state.go("tab.my-updateUserData",{});
        }
        return service;


    });


});