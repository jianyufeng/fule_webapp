

define(['app','css! ../../../css/my/my-happyHomeLogs'], function (app) {
    function ctrl($scope,myHappyHomeLogsService,POP,$state) {

        $scope.$on('$ionicView.loaded', function () {
            /*获取数据*/
            $scope.righttitleValue = "编辑";
            //初始化加载喜乐之家
            myHappyHomeLogsService.getHappyHomeLogs($scope, POP);


        });




        //购买记录
        $scope.editLogs  = function () {

            alert("购买记录编辑");
        };





    }

    /*给构造函数添加$inject属性,添加注入的服务*/
    ctrl.$inject = ['$scope','myHappyHomeLogsService','POP','$state'];
    /*动态注册控制器*/
    app.registerController('myHappyHomeLogsController', ctrl);




});