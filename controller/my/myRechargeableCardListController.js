/**
 * Created by ShareLock on 2017/4/1.
 * 充值卡列表的Controller
 */


define(['app', 'css! ../../../css/my/my-RechargeableCardList'], function (app) {
    function ctrl($scope, myRechargeableCardListService,POP) {
        
        $scope.$on('$ionicView.loaded', function () {

        });
    }

    /*给构造函数添加$inject属性,添加注入的服务*/
    ctrl.$inject = ['$scope', 'myRechargeableCardListService','POP'];

    /*动态注册控制器*/
    app.registerController("myRechargeableCardListController", ctrl);
});