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
            if (index == 1) {
                $(".ACard").css('color', '#D39AC5');
                $(".BCard").css('color', 'black');
                $(".CCard").css('color', 'black');
                $("#listA").css('display', 'block');
                $("#listB").css('display', 'none');
                $("#listC").css('display', 'none');
            } else if (index == 2) {
                $(".BCard").css('color', '#D39AC5');
                $(".ACard").css('color', 'black');
                $(".CCard").css('color', 'black');
                $("#listA").css('display', 'none');
                $("#listB").css('display', 'block');
                $("#listC").css('display', 'none');
            } else if (index == 3) {
                $(".CCard").css('color', '#D39AC5');
                $(".BCard").css('color', 'black');
                $(".ACard").css('color', 'black');
                $("#listC").css('display', 'block');
                $("#listB").css('display', 'none');
                $("#listA").css('display', 'none');
            }
        }
    }

    /*给构造函数添加$inject属性,添加注入的服务*/
    ctrl.$inject = ['$scope', 'myRechargeableCardListService', 'POP'];

    /*动态注册控制器*/
    app.registerController("myRechargeableCardListController", ctrl);
});