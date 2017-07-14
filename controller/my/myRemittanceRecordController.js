/**
 * Created by ShareLock on 2017/3/24.
 *
 * 转账记录Controller
 */
define(['app', 'css! ../../../css/my/my-remittanceRecord'],function(app){
    function ctrl($scope,myRemittanceRecordService,POP) {
        $(".mytab").find(".tab-title").css("color", "#000000");
        $(".myIcon").find(".tab-title").css("color", "#D9A8CD");
        $scope.$on('$ionicView.loaded', function () {
            /*获取数据*/
            console.log("myRemittanceRecordController")
            myRemittanceRecordService.getRemittanceRecord($scope,POP);

        });
    }

    /*给构造函数添加$inject属性,添加注入的服务*/
    ctrl.$inject = ['$scope','myRemittanceRecordService','POP'];

    /*动态注册控制器*/
    app.registerController("myRemittanceRecordController",ctrl);
});