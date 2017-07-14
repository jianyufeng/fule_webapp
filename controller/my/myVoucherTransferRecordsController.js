/**
 * Created by Administrator on 2017/3/24.
 */
define(['app', "css! ../../../css/my/my-transferRecord"], function (app) {
    function ctrl($scope, myTransferRecordService, POP) {
        $(".mytab").find(".tab-title").css("color", "#000000");
        $(".myIcon").find(".tab-title").css("color", "#D9A8CD");
        //默认不可以拉上
        $scope.isCanPull = false;
        //默认页数
        $scope.page = 0;
        //下拉刷新
        $scope.doRefresh = function () {
            //重置页数
            $scope.page = 0;
            //重置上拉
            $scope.isCanPull = false;
            myTransferRecordService.getVouTransferRecord($scope, POP,false);
        };
        // 默认 获取全部记录
        myTransferRecordService.getVouTransferRecord($scope, POP,true);
        //加载更多
        $scope.loadMore = function () {
            myTransferRecordService.getVouTransferRecord($scope, POP,false);
        }
    }

    /*给构造函数添加$inject属性,添加注入的服务*/
    ctrl.$inject = ['$scope', 'myTransferRecordService', 'POP'];

    /*动态注册控制器*/
    app.registerController("myVoucherTransferRecordsController", ctrl);
});