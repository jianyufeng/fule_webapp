/**
 * Created by Administrator on 2017/3/24.
 * 代金券转账controller
 */
define(['app', 'css! ../../../css/my/my-voucherTransfer'], function (app) {
    function ctrl($scope, myVoucherTransferService, POP, $stateParams) {

        $scope.voucher={};
        $scope.$on('$ionicView.loaded', function () {
            // 为页面赋值
            $scope.userName = User.getInfo().user_name;
            $scope.balance = $stateParams.userVoucher;

        });
        // 点击提交按钮
        $scope.submitTransfer = function () {
            myVoucherTransferService.submitVoucherTransfer($scope, POP);
        }
        //点击发送按钮
        $scope.getMessageCode = function () {
            myVoucherTransferService.getMessageCodeBiz($scope, POP);
        }

    }

    /*给构造函数添加$inject属性,添加注入的服务*/
    ctrl.$inject = ['$scope', 'myVoucherTransferService', 'POP', '$stateParams'];

    /*动态注册控制器*/
    app.registerController("myVoucherTransferController", ctrl);
});