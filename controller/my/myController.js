define(['app', './Fun/my_fun'], function (app, my_fun) {

    function ctrl($scope, myService, POP) {
        console.log("我的界面控制器...");

        var isLogin = User.isLogin();
        if(isLogin){

        }

        /*加载界面动画*/
        my_fun.animation();

        /*ionicView的生命周期的事件调用在每个ionicView的controller中使用$scope.$on('$ionicView.enter', function() {});调用*/
        $scope.$on('$ionicView.loaded', function () {
            /*获取数据*/
            myService.getMyInfo($scope, POP, false);
        });
        /*下拉刷新*/
        $scope.doRefresh = function () {
            myService.getMyInfo($scope, POP, true);

        };


        //上拉弹出框
        $scope.selectIcon = function () {
            POP.ActionSheet("图片获取方式", ["确认弹窗", "普通弹窗"], [
                function () {
                    $scope.confirm();
                },
                function () {
                    $scope.alert();
                }
            ]);
        }
    }

    /*给构造函数添加$inject属性,添加注入的服务*/
    ctrl.$inject = ['$scope', 'myService', 'POP'];

    /*动态注册控制器*/
    app.registerController('myController', ctrl);


});