/**
 * Created by Administrator on 2017/3/24.
 */
define(['app'], function (app) {
    function ctrl($scope) {
        $(".mytab").find(".tab-title").css("color", "#000000");
        $(".myIcon").find(".tab-title").css("color", "#D9A8CD");
        $scope.$on('$ionicView.loaded', function () {
            /*获取数据*/
        });
    }
    /*给构造函数添加$inject属性,添加注入的服务*/
    ctrl.$inject = ['$scope'];

    /*动态注册控制器*/
    app.registerController('myOfficeController', ctrl);
});