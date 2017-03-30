/**
 * Created by ShareLock on 2017/3/24.
 * 内部转账的Controller
 */
define(['app','css! ../../../css/my/my-internalTransfer'],function(app){
    function ctrl($scope,myInternalTransferCheckService,$stateParams,POP) {
     //var transformMoney={};
        $scope.$on('$ionicView.loaded', function () {
            // 获取参数
            // 显示
            $scope.userName=$stateParams.userName;
            $scope.user_money=$stateParams.userMoney;
            var verification_code="123456";

            // 提交
            $scope.transformMoney=function(){
                myInternalTransferCheckService.submitTransformMoney($scope,verification_code,POP);

            }

        });
    }

    /*给构造函数添加$inject属性,添加注入的服务*/
    ctrl.$inject = ['$scope','myInternalTransferCheckService','$stateParams','POP'];

    /*动态注册控制器*/
    app.registerController("myInternalTransferController",ctrl);
});