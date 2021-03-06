/**
 * Created by ShareLock on 2017/5/9.
 * 奖金币转电子币
 */

define(['app', 'css! ../../../css/my/my-internalTransfer'], function (app) {
    function ctrl($scope, myAwardGoldCOINSTransferElectronicTokenService, POP, $state) {
        $scope.transform = {};
        $(".mytab").find(".tab-title").css("color", "#000000");
        $(".myIcon").find(".tab-title").css("color", "#D9A8CD");

        $scope.$on('$ionicView.loaded', function () {
            // 获取参数
            // 显示
            $scope.userName=User.getInfo().user_name;
            myAwardGoldCOINSTransferElectronicTokenService.getBouns($scope, POP);
        })
        //    // 获取短信验证码
        $scope.getMessageCode = function () {
            myAwardGoldCOINSTransferElectronicTokenService.getMessageCodeBiz($scope, POP);
        }

        // 提交
        $scope.transformMoneyAction = function () {
            myAwardGoldCOINSTransferElectronicTokenService.submitTransformMoney($scope, POP, $state);

        }

    }

    /*给构造函数添加$inject属性,添加注入的服务*/
    ctrl.$inject = ['$scope', 'myAwardGoldCOINSTransferElectronicTokenService', 'POP', '$state'];

    /*动态注册控制器*/
    app.registerController("myAwardGoldCOINSTransferElectronicTokenController", ctrl);
});