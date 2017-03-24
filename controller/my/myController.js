define(['app'], function (app) {

    function ctrl($scope,myService) {
        console.log("我的界面控制器...");

        /*ionicView的生命周期的事件调用在每个ionicView的controller中使用$scope.$on('$ionicView.enter', function() {});调用*/
        $scope.$on('$ionicView.loaded', function () {
            /*获取数据*/
            myService.getMyInfo($scope);

        });

        $scope.$on('$ionicView.enter', function () {
            console.log("$ionicView.enter")
        });
        $scope.$on('$ionicView.leave', function () {
            console.log("$ionicView.leave")
        });
        $scope.$on('$ionicView.beforeEnter', function () {
            console.log("$ionicView.beforeEnter")
        });
        $scope.$on('$ionicView.beforeLeave', function () {
            console.log("$ ionicView.beforeLeave")
        });
        $scope.$on('$ionicView.afterEnter', function () {
            console.log("$ionicView.afterEnter")
        });
        $scope.$on('$ionicView.afterLeave', function () {
            console.log("$ionicView.afterLeave")
        });


        $scope.$on('$ionicView.unloaded', function () {
            console.log("$ionicView.unloaded")
        });


    }

    /*给构造函数添加$inject属性,添加注入的服务*/
    ctrl.$inject = ['$scope', 'myService'];

    /*动态注册控制器*/
    app.registerController('myController', ctrl);


});