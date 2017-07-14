define(['app', './Fun/my_fun'], function (app, my_fun) {

    function ctrl($scope, myService, POP, $state, $rootScope) {
        $(".mytab").find(".tab-title").css("color", "#000000");
        $(".myIcon").find(".tab-title").css("color", "#D9A8CD");
        var isLogin = User.isLogin();
        /*加载界面动画*/
        my_fun.animation();
        $scope.garde = 0;
        $scope.registerGrade = 0;
        //ionicView的生命周期的事件调用在每个ionicView的controller中使用$scope.$on('$ionicView.enter', function() {});
        $scope.$on('$ionicView.loaded', function () {
        });
        $scope.$on('$ionicView.beforeEnter', function () {
            isLogin = User.isLogin();
            $scope.islogin = isLogin;
            if (isLogin) {
                $('.my_loginBox').show();
                $('.xiala').show();
                $('.unLoginBoxP').hide();
                /*获取数据*/
                myService.getMyInfo($scope, POP, false);
            } else {
                $('.my_loginBox').hide();
                $('.xiala').hide();
                $('.unLoginBoxP').show();
            }
        });

        /*登录  点击效果*/
        $(document).off("touchstart", "#my_login").on("touchstart", "#my_login", function (event) {
            $(this).css({"background": "#d98bbc"}).transition({"background": "#d9a9cd"}, 200);
        });

        $(document).off("touchend", "#my_login").on("touchend", "#my_login", function (event) {
            $(this).css({"background": "#d9a9cd"}).transition({"background": "#d98bbc"}, 200);
        });
        /* 新用户 点击效果*/
        $(document).off("touchstart", "#my_register").on("touchstart", "#my_register", function (event) {
            $(this).css({"border-color": "#d98bbc"}).transition({"border-color": "#d9a9cd"}, 200);
        });

        $(document).off("touchend", "#my_register").on("touchend", "#my_register", function (event) {
            $(this).css({"border-color": "#d9a9cd"}).transition({"border-color": "#d98bbc"}, 200);
        });


        /*下拉刷新*/
        $scope.doRefresh = function () {
            if (isLogin) {
                myService.getMyInfo($scope, POP, true);
            } else {
                $scope.$broadcast('scroll.refreshComplete');
            }
        };
        //退出登录
        $('.loginOutBox').click(function () {
            POP.Confirm("确认退出登录?", function () {
                $.cookie("userInfo", null, {path: '/'});
                $.cookie('two_pass_go', null, {path: '/'});
                $rootScope.cartBadge = 0;
                $state.go("tab.home");

            });
        });
        //去登陆
        $scope.goLogin = function () {
            location.href = "./login/login.html";
        };
        //去注册
        $scope.goRegister = function () {
            location.href = "./register/register.html";
        };
        // 跳转到内部转账页面
        $scope.startPage = function () {
            var userName = $scope.userInfo.user_name;
            var userMoney = $scope.userInfo.user_money;
            $state.go("tab.my-internalTransfer", {"userName": userName, "userMoney": userMoney});
        };
        //跳转界面 代金卷转账
        $scope.startVoucherTransferPage = function (fxp_points) {
            $state.go("tab.my-voucherTransfer", {"userVoucher": fxp_points});
        };
        //跳转界面  奖金币转电子币
        $scope.startJJBZDZB = function () {
            if (isInputTwo()) { //是否已经输入二级密码
                $state.go("tab.my-AwardGoldCOINSTransferElectronicToken");
                return;
            }
            POP.FormAlert("请输入二级密码", $scope, function (v) {
                var info = User.getInfo();
                var payParams = {
                    user_id: info.user_id,
                    password: v,
                    type: "SECOND_PASSWORD"
                };
                //验证二级密码
                myService.verifyPayPassword($scope, payParams, POP, function () {
                    twoPassGo();  //未输入 存储
                    $state.go("tab.my-AwardGoldCOINSTransferElectronicToken");
                });
            });
        };
        //跳转界面 管理关系
        $scope.startGLGX = function () {
            if (isInputTwo()) { //是否已经输入二级密码
                $state.go("tab.my-manageRelationships");
                return;
            }
            POP.FormAlert("请输入二级密码", $scope, function (v) {
                var info = User.getInfo();
                var payParams = {
                    user_id: info.user_id,
                    password: v,
                    type: "SECOND_PASSWORD"
                };
                //验证二级密码
                myService.verifyPayPassword($scope, payParams, POP, function () {
                    twoPassGo();  //未输入 存储
                    $state.go("tab.my-manageRelationships");
                });
            });
        };
        //跳转界面 服务关系
        $scope.startFWGX = function () {
            if (isInputTwo()) { //是否已经输入二级密码
                $state.go("tab.my-serviceRelationship");
                return;
            }
            POP.FormAlert("请输入二级密码", $scope, function (v) {
                var info = User.getInfo();
                var payParams = {
                    user_id: info.user_id,
                    password: v,
                    type: "SECOND_PASSWORD"
                };
                //验证二级密码
                myService.verifyPayPassword($scope, payParams, POP, function () {
                    twoPassGo();  //未输入 存储
                    $state.go("tab.my-serviceRelationship");
                });
            });
        };

        // 跳转到升级界面
        $scope.upGrade = function () {
            myService.upGrade($scope, $state, POP);
        };
        //存储二级密码通过验证
        var twoPassGo = function () {
            var expiresDate = new Date();
            expiresDate.setTime(expiresDate.getTime() + (30 * 60 * 1000));
            $.cookie('two_pass_go', true, {expires: expiresDate, path: '/'});
        };
        //获取二级密码通过验证
        var isInputTwo = function () {
            var hasInput = $.cookie('two_pass_go');
            if (hasInput == undefined || hasInput === 'null') {
                return false;
            } else {
                return true;
            }
        };

    }

    /*给构造函数添加$inject属性,添加注入的服务*/
    ctrl.$inject = ['$scope', 'myService', 'POP', '$state', '$rootScope'];

    /*动态注册控制器*/
    app.registerController('myController', ctrl);


});