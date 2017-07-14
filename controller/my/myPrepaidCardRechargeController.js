/**
 * Created by ShareLock on 2017/3/24.
 * 充值卡充值的Contronller
 */
define(['app', 'css! ../../../css/my/my-prepaidCardRecharge'], function (app) {
    function ctrl($scope, myPrepaidCardRechargeService,POP,$state) {
        $(".mytab").find(".tab-title").css("color", "#000000");
        $(".myIcon").find(".tab-title").css("color", "#D9A8CD");
        $scope.rechargeCard={};
        $scope.$on('$ionicView.loaded', function () {
            //点击充值按钮
            $scope.recharge = function () {
                myPrepaidCardRechargeService.rechargeBiz($scope, POP,$state);
            }
            $scope.showList=function(){
                $state.go("tab.my-rechargeableCardList");
            }
        });
    }

    /*给构造函数添加$inject属性,添加注入的服务*/
    ctrl.$inject = ['$scope', 'myPrepaidCardRechargeService','POP','$state'];

    /*动态注册控制器*/
    app.registerController("myPrepaidCardRechargeController", ctrl);
});