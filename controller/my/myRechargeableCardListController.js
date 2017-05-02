/**
 * Created by ShareLock on 2017/4/1.
 * 充值卡列表的Controller
 */


define(['app', 'css! ../../../css/my/my-RechargeableCardList'], function (app) {
    function ctrl($scope, myRechargeableCardListService, POP) {

        $scope.rechargeableCard = {};
        var userId = User.getInfo().user_id;
        $scope.$on('$ionicView.loaded', function () {
            myRechargeableCardListService.getAList($scope, POP, userId);

        });
        $scope.show = function (index) {
           if(index==1){
               $(".leftCard").css('color','#D39AC5');
               $(".rightCard").css('color','black');
               myRechargeableCardListService.getAList($scope, POP, userId);
           }else {
               $(".rightCard").css('color','#D39AC5');
               $(".leftCard").css('color','black');
               myRechargeableCardListService.getBList($scope, POP, userId);
           }
        }
    }

    /*给构造函数添加$inject属性,添加注入的服务*/
    ctrl.$inject = ['$scope', 'myRechargeableCardListService', 'POP'];

    /*动态注册控制器*/
    app.registerController("myRechargeableCardListController", ctrl);
});