/**
 * Created by ShareLock on 2017/4/14.
 * 喜乐之家升级的Controller
 */


define(['app', 'css! ../../../css/my/my-happyHomeUpgrade'], function (app) {
    function ctrl($scope) {

        $scope.$on('$ionicView.loaded', function () {
            /*获取数据*/
            console.log("dsfs")
        });
    }

    /*给构造函数添加$inject属性,添加注入的服务*/
    ctrl.$inject = ['$scope'];

    /*动态注册控制器*/
    app.registerController('myHappyHomeUpgradeController', ctrl);
});