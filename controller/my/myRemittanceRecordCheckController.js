/**
 * Created by Administrator on 2017/3/24.
 */
define(['app', 'css! ../../../css/my/my-remittanceRecord'],function(app){
    function ctrl($scope) {

        $scope.$on('$ionicView.loaded', function () {
            /*获取数据*/
            console.log("myRemittanceRecordCheckController")


        });
    }

    /*给构造函数添加$inject属性,添加注入的服务*/
    ctrl.$inject = ['$scope'];

    /*动态注册控制器*/
    app.registerController("myRemittanceRecordCheckController",ctrl);
});