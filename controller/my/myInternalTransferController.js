/**
 * Created by ShareLock on 2017/3/24.
 * 内部转账的Controller
 */
define(['app','css! ../../../css/my/my-internalTransfer'],function(app){
    function ctrl($scope,myInternalTransferService,$stateParams,POP,$state) {
        $(".mytab").find(".tab-title").css("color", "#000000");
        $(".myIcon").find(".tab-title").css("color", "#D9A8CD");
     $scope.transformMoney={};
        $scope.$on('$ionicView.loaded', function () {
            // 获取参数
            // 显示
            $scope.userName=$stateParams.userName;
            $scope.user_money=$stateParams.userMoney;
         // 获取短信验证码
            $scope.getMessageCode=function(){
                myInternalTransferService.getMessageCodeBiz($scope,POP);
            }

            // 提交
            $scope.transformMoneyAction=function(){
                myInternalTransferService.submitTransformMoney($scope,POP,$state);

            }

        });
    }

    /*给构造函数添加$inject属性,添加注入的服务*/
    ctrl.$inject = ['$scope','myInternalTransferService','$stateParams','POP','$state'];

    /*动态注册控制器*/
    app.registerController("myInternalTransferController",ctrl);
});