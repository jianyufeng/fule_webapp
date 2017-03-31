/**
 * Created by ShareLock on 2017/3/24.
 * 条形码验证Controller
 */
define(['app', 'css! ../../../css/my/my-authenticCheck'], function (app) {
    function ctrl($scope, myAuthenticCheckService,POP) {
        $scope.barCodeGoods={};
        /**
         * 查询商品码
         */
        $scope.searchBarCodeGoods = function () {
            var code_password = $scope.barCodeGoods.code;
            var userId=User.getInfo().user_id;

            myAuthenticCheckService.searchBarCodeGoods($scope,code_password,userId,POP);
        }

    }

    /*给构造函数添加$inject属性,添加注入的服务*/
    ctrl.$inject = ['$scope', 'myAuthenticCheckService','POP'];

    /*动态注册控制器*/
    app.registerController("myAuthenticCheckController", ctrl);
});