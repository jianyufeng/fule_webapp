define(['app', './Fun/my_fun'], function (app, my_fun) {

    function ctrl($scope, myService, POP, $state,$rootScope) {
        console.log("我的界面控制器...");
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
                $('.unLoginBox').hide();
                $('.myHeaderBox').hide();
                /*获取数据*/
                myService.getMyInfo($scope, POP, false);
            } else {
                $('.my_loginBox').hide();
                $('.xiala').hide();
                $('.unLoginBox').show();
                $('.myHeaderBox').show();
            }
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
        $scope.startVoucherTransferPage = function (fxp_points) {

            $state.go("tab.my-voucherTransfer", {"userVoucher": fxp_points});
        };


        // 跳转到升级界面
        $scope.upGrade = function () {
            myService.upGrade($scope, $state,POP);
        };

        ////上拉弹出框
        //$scope.selectIcon = function () {
        //    POP.ActionSheet("图片获取方式", ["确认弹窗", "普通弹窗"], [
        //        function () {
        //            $scope.confirm();
        //        },
        //        function () {
        //            $scope.alert();
        //        }
        //    ]);
        //}
    }

    /*给构造函数添加$inject属性,添加注入的服务*/
    ctrl.$inject = ['$scope', 'myService', 'POP', '$state','$rootScope'];

    /*动态注册控制器*/
    app.registerController('myController', ctrl);


});