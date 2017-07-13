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
                    if (!isRefresh) {
                        POP.Hint("对不起，刷新失败");
                        return
                    }
                    $.loadError(function () {
                        service.getMyInfo();
                    });
                    return;
                }
                //获取用户图像
                if (data.userInfo.headerUrl != undefined && data.userInfo.headerUrl != null && data.userInfo.headerUrl.length > 4) {
                    $("#usrIcon").attr('src', "http://image.38zs.net:38888" + data.userInfo.headerUrl);
                } else {
                    $("#usrIcon").attr('src', "./resource/images/default/morentouxiang.jpg");
                }
                // D级别的标准
                var IS_D = data.config.IS_D;
                // VIP 标准
                var IS_VIP = data.config.IS_VIP;
                // 批发标准
                var IS_PI_FA = data.config.IS_PI_FA;
                // 高级志愿者标准
                var GAOJI_ZHI_YUAN_ZHE = data.config.GAOJI_ZHI_YUAN_ZHE;
                // 共享圈升级积分标准
                var IS_REAL_SHARE = data.config.IS_REAL_SHARE;
                // 当前用户的级别
                var lv = data.userInfo.REGISTER_GRADE;
                $scope.registerGrade = lv;
                // userVIP的级别
                var user_IS_VIP = data.userInfo.IS_VIP;
                // user批发的级别
                var user_IS_PI_FA = data.userInfo.IS_PI_FA;
                // 升级积分
                var user_INTEGRAL = data.userInfo.INTEGRAL;
                //  共享圈/事业圈
                var share_type = data.userInfo.USER_SHARE_TYPE;
                // 激活时间
                 share_time = data.userInfo.USER_SHARE_TIME;

                $scope.$apply(function () {
                    $scope.userInfo = data.userInfo;
                    $scope.travel_points = data.travel_points;
                    //判断添加个人图像
                    var headerUrl = data.userInfo.headerUrl;
                    if (headerUrl == undefined || headerUrl == null || headerUrl.length == 0) {
                        //$(".usrIcon").attr('src', "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3557371746,1385116483&fm=117&gp=0.jpg");
                    } else {
                        $(".usrIcon").attr('src', headerUrl);
                    }
                    //判断是否显示部分功能
                    if (data.userInfo.ZHUAN_MAI_DIAN_GRADE > 0) {
                        //专卖店 或 旗舰店
                        $('.isNotRegister').show();
                        $('#emptyFull').hide();
                    } else if (data.userInfo.REGISTER_GRADE < 1) {
                        //是注册会员
                        $('.isNotRegister').hide();
                        $('#emptyFull').show(); //补齐空格
                    } else {
                        //其他等级的会员
                        $('.isNotRegister').show();
                        $('#emptyFull').hide();  //
                    }

                    //  事业圈
                    if (share_type == 0) {
                        // 判断 REGISTER_GRADE
                        console.log(11111111111);
                        if (lv < 4) {
                            // 判断一键升级
                            $(".levelName").text("事业圈·注册会员");
                            if (user_INTEGRAL >= GAOJI_ZHI_YUAN_ZHE) {
                                // 显示一键升级
                                $("#gradeButton").text("一键升级");
                                $("#gradeButton").css("display", "block");
                                $scope.garde = 1;
                            } else if (user_INTEGRAL >= IS_D && user_INTEGRAL < GAOJI_ZHI_YUAN_ZHE) {
                                // 显示升级D级
                                $("#gradeButton").text("升级为志愿者");
                                $("#gradeButton").css("display", "block");
                                $scope.garde = 2;
                            } else {
                                $("#gradeButton").css("display", "none");
                            }

                        } else if (lv == 4 && user_IS_VIP == 0 && user_IS_PI_FA == 0) {
                            $(".levelName").text("事业圈·志愿者D");
                            if (user_IS_VIP == 0 && user_INTEGRAL >= IS_VIP) {
                                // 显示升级VIP
                                $("#gradeButton").text("升级为VIP");
                                $("#gradeButton").css("display", "block");
                            }
                            $scope.garde = 3;
                        } else if (lv == 4 && user_IS_VIP == 1 && user_IS_PI_FA == 0) {
                            $(".levelName").text("事业圈·VIP");
                            if (user_INTEGRAL >= IS_PI_FA) {
                                //  显示升级批发
                                $("#gradeButton").text("升级为批发");
                                $("#gradeButton").css("display", "block");
                            }
                            $scope.garde = 4;
                        } else if (lv == 4 && user_IS_VIP == 1 && user_IS_PI_FA == 1) {
                            $("#gradeButton").css("display", "none");
                            $(".levelName").text("事业圈·批发");
                        } else {
                            $("#gradeButton").css("display", "none");
                        }

                    } else
                    //  共享圈
                    if (share_type == 1) {
                        if (share_time > 0) {
                            $(".levelName").text("共享圈·激活会员");
                        } else {
                            $(".levelName").text("共享圈·注册会员");
                        }
                        if (lv < 4) {
                            // 判断一键升级
                            if (user_INTEGRAL >= GAOJI_ZHI_YUAN_ZHE) {
                                if (share_time > 0) {
                                    // 共享圈一键升级
                                    $scope.garde = 6;
                                } else {
                                    //一键升级
                                    $scope.garde = 1;
                                }
                                // 显示一键升级
                                $("#gradeButton").text("一键升级");
                                $("#gradeButton").css("display", "block");

                            } else if (user_INTEGRAL >= IS_D && user_INTEGRAL < GAOJI_ZHI_YUAN_ZHE) {
                                if (share_time > 0) {
                                    //共享圈激活会员升级为D;
                                    $scope.garde = 7;
                                } else {
                                    // 升级D
                                    $scope.garde = 2;
                                }
                                // 显示升级D级
                                $("#gradeButton").text("升级为志愿者");
                                $("#gradeButton").css("display", "block");
                            } else if (user_INTEGRAL < IS_D && user_INTEGRAL > IS_REAL_SHARE) {
                                // 升级为共享圈注册会员
                                // 显示升级D级
                                $("#gradeButton").text("激活共享圈");
                                $("#gradeButton").css("display", "block");
                                $scope.garde = 5;
                            } else {
                                $("#gradeButton").css("display", "none");
                                console.log(55555555555);
                                console.log($scope.garde)
                            }

                        } else if (lv == 4 && user_IS_VIP == 0 && user_IS_PI_FA == 0) {
                            if (user_INTEGRAL >= IS_VIP) {
                                // 显示升级VIP
                                $("#gradeButton").text("升级为VIP");
                                $("#gradeButton").css("display", "block");
                            }
                            $scope.garde = 3;
                            $(".levelName").text("共享圈·志愿者D");
                        } else if (lv == 4 && user_IS_VIP == 1 && user_IS_PI_FA == 0) {
                            if (user_INTEGRAL >= IS_PI_FA) {
                                //  显示升级批发
                                $("#gradeButton").text("升级为批发");
                                $("#gradeButton").css("display", "block");
                            }
                            $(".levelName").text("共享圈·VIP");
                            $scope.garde = 4;
                        } else if (lv == 4 && user_IS_VIP == 1 && user_IS_PI_FA == 1) {
                            $(".levelName").text("共享圈·批发");
                            $("#gradeButton").css("display", "none");
                        } else {
                            $("#gradeButton").css("display", "none");
                        }
                    }
                    if (!isRefresh) {
                        $.initAppEndLoad();
                    }
                });
                if (isRefresh) {
                    $scope.$broadcast('scroll.refreshComplete');
                }
            });

        };
        service.upGrade = function ($scope, $state, POP) {
            // 判断是否要填写用户资料
            if ($scope.registerGrade > 0||share_time>0) {
                // 直接升级VIP
                service.upgradeToVIPAndPIFA($scope, POP);
                return;
            }
            $state.go("tab.my-updateUserData", {"grade": $scope.garde});
        };

        service.upgradeToVIPAndPIFA = function ($scope, POP) {
            var url = "";
            var user = User.getInfo();
            console.log(1111111112222222);
            console.log($scope.garde);
            if ($scope.garde == 3) {
                url = API.My.upgradeToVIP;
                // 直接升级批发
            } else if ($scope.garde == 4) {
                url = API.My.upgradeToPIFA;
            } else if ($scope.garde == 6) {
                url=API.My.upgradeToAllFromShare;
            }else if ($scope.garde == 7) {
                url=API.My.upgradeToDFromShare;
            }
            POP.StartLoading();
            HTTP.post(url,
                {
                    "user_name": user.user_name,
                    "user_id": user.user_id
                },
                function (e, data) {
                    POP.EndLoading();
                    if (e) {
                        if (data != null) {
                            POP.Hint(data);
                        }
                        return;
                    }
                    //按钮消失
                    $("#gradeButton").css("display", "none");
                    service.getMyInfo($scope, POP, true);
                })

        };

        //验证二级密码
        service.verifyPayPassword = function ($scope, updateParams, POP, fn) {

            POP.StartLoading();

            //更新操作
            HTTP.post(API.Cart.verifyUserPassword, updateParams, function (e, data) {

                POP.EndLoading();

                if (e) {
                    POP.Hint("密码错误!");
                    return;
                } else {
                    fn();
                }

            });

        };
        return service;


    });


});