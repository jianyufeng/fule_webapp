/**
 * Created by Administrator on 2017/3/24.
 */
define(['app', 'css! ../../../css/my/my-prepaidCardRecharge'],function(app){
    function ctrl($scope,myPrepaidCardRechargeCheckService) {

        $scope.$on('$ionicView.loaded', function () {
            /*获取数据*/
            console.log("myPrepaidCardRechargeCheckController")


        });
    }

    /*给构造函数添加$inject属性,添加注入的服务*/
    ctrl.$inject = ['$scope','myPrepaidCardRechargeCheckService'];

    /*动态注册控制器*/
    app.registerController("myPrepaidCardRechargeCheckController",ctrl);
});