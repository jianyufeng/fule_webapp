/**
 * Created by ShareLock on 2017/4/8.
 * 用户激活或者是升级是填写的用户资料Controller
 */

define(['app', "css! ../../../css/my/my-updateUserData"], function (app) {
    function ctrl($scope, myUpdateUserDataService, POP) {

        $scope.$on('$ionicView.loaded', function () {

            console.log("已经注入了服务");
        });
        // 点击提交按钮
        $scope.submitUpGradeAction = function () {


        }
        // 点击重置按钮
        $scope.reset = function () {

        }


    }

    /*给构造函数添加$inject属性,添加注入的服务*/
    ctrl.$inject = ['$scope', 'myUpdateUserDataService', 'POP'];

    /*动态注册控制器*/
    app.registerController("myUpdateUserDataController", ctrl);
});
