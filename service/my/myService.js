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
            HTTP.get(API.My.myInfo + "/user_name/" + info.user_name, {}, function (e, data) {
                if (e) {
                    console.log(e);
                    console.log(data);
                    if (!isRefresh) {
                        POP.Hint("对不起，刷新失败");
                        return
                    }
                    $.loadError(function () {
                        service.getMyInfo();
                    });
                    return;
                }
                console.log(data);
                // D级别的标准
                var IS_D = data.config.IS_D;
                // VIP 标准
                var IS_VIP = data.config.IS_VIP;
                // 批发标准
                var IS_PI_FA = data.config.IS_PI_FA;
                // 高级志愿者标准
                var GAOJI_ZHI_YUAN_ZHE = data.config.GAOJI_ZHI_YUAN_ZHE;
                // 当前用户的级别
                var lv = data.userInfo.REGISTER_GRADE;
                // userVIP的级别
                var user_IS_VIP = data.userInfo.IS_VIP;
                // user批发的级别
                var user_IS_PI_FA = data.userInfo.IS_PI_FA;
                // 升级积分
                var user_INTEGRAL = data.userInfo.INTEGRAL;
                if (lv < 4) {
                    // 判断一键升级
                    if (user_INTEGRAL >= GAOJI_ZHI_YUAN_ZHE) {
                        // 显示一键升级
                        $("#gradeButton").text("一键升级");
                        $("#gradeButton").css("display", "block");
                    } else if (user_INTEGRAL >= IS_D) {
                        // 显示升级D级
                        $("#gradeButton").text("升级为志愿者");
                        $("#gradeButton").css("display", "block");
                    } else {
                        $("#gradeButton").css("display", "none");
                    }

                } else if (lv = 4 && user_IS_VIP == 0 && user_INTEGRAL >= IS_VIP) {
                    // 显示升级VIP
                    $("#gradeButton").text("升级为VIP");
                    $("#gradeButton").css("display", "block");

                } else if (lv = 4 && user_IS_VIP == 1 && user_IS_PI_FA == 0 && user_INTEGRAL >= IS_PI_FA) {
                    //  显示升级批发
                    $("#gradeButton").text("升级为批发");
                    $("#gradeButton").css("display", "block");
                } else {
                    $("#gradeButton").css("display", "none");
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


        service.upGrade = function ($scope, $state, grade) {
            $state.go("tab.my-updateUserData", {"grade": grade});
        }
        return service;


    });


});