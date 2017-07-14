/**
 * Created by ShareLock on 2017/4/1.
 * 充值卡列表的Controller
 */


define(['app', 'css! ../../../css/my/my-RechargeableCardList'], function (app) {
    function ctrl($scope, myRechargeableCardListService, POP) {
        $(".mytab").find(".tab-title").css("color", "#000000");
        $(".myIcon").find(".tab-title").css("color", "#D9A8CD");
        $scope.rechargeableCard = {};
        var userId = User.getInfo().user_id;
        $scope.$on('$ionicView.loaded', function () {
            myRechargeableCardListService.getAList($scope, POP, userId);

        });
        // fix  ShareLock   修改显示的空列表的逻辑 2017-7-4
        function showEmpty(list) {
            if (list != undefined & list != null & list.length > 0) {
                $scope.isEmptyData = false;
            } else {
                $scope.isEmptyData = true;
            }
        }
        $scope.show = function (index) {
            if (index == 1) {
                $(".ACard").css('color', '#D39AC5');
                $(".BCard").css('color', 'black');
                $(".CCard").css('color', 'black');
                $("#listA").css('display', 'block');
                $("#listB").css('display', 'none');
                $("#listC").css('display', 'none');
                showEmpty($scope.rechargeableCardAList)
            } else if (index == 2) {
                $(".BCard").css('color', '#D39AC5');
                $(".ACard").css('color', 'black');
                $(".CCard").css('color', 'black');
                $("#listA").css('display', 'none');
                $("#listB").css('display', 'block');
                $("#listC").css('display', 'none');
                showEmpty($scope.rechargeableCardBList)
            } else if (index == 3) {
                $(".CCard").css('color', '#D39AC5');
                $(".BCard").css('color', 'black');
                $(".ACard").css('color', 'black');
                $("#listC").css('display', 'block');
                $("#listB").css('display', 'none');
                $("#listA").css('display', 'none');
                showEmpty($scope.rechargeableCardCList)
            }
        }
    }

    /*给构造函数添加$inject属性,添加注入的服务*/
    ctrl.$inject = ['$scope', 'myRechargeableCardListService', 'POP'];

    /*动态注册控制器*/
    app.registerController("myRechargeableCardListController", ctrl);
});