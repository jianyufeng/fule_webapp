/**
 * Created by ShareLock on 2017/3/24.
 * 充值卡充值的Contronller
 */
define(['app', 'css! ../../../css/my/my-prepaidCardRecharge'],function(app){
    function ctrl($scope,myPrepaidCardRechargeCheckService) {

        $scope.$on('$ionicView.loaded', function () {
            /*获取数据*/
            console.log("myPrepaidCardRechargeCheckController")
            //http://ecommerce.38zs.net:66/docs/index.php#594_28_14   文档接口


        });
    }

    /*给构造函数添加$inject属性,添加注入的服务*/
    ctrl.$inject = ['$scope','myPrepaidCardRechargeCheckService'];

    /*动态注册控制器*/
    app.registerController("myPrepaidCardRechargeCheckController",ctrl);
});