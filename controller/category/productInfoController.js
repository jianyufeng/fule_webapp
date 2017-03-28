/**
 * Created by Administrator on 2017/3/25.
 */



define(['app', 'css! ../../../css/category/productInfo'], function (app) {

    function ctrl($scope, productInfoService,$stateParams,POP) {

        //console.log(11111);
        //console.log($stateParams);
        $scope.$on('$ionicView.loaded', function () {
            /*获取数据*/
            console.log("productInfoController")
            productInfoService.getProductInfo($scope,$stateParams);
            productInfoService.getCartInfo($scope);
            productInfoService.setImageMargin();
        });
        $scope.count = 1;
        $scope.index = 0;
        $scope.onSlideChanged = function (index) {
            $scope.index = index;
            // 获取所有 instructions 的子元素
            var ch = $(".instructions").children();
            for (var i = 0; i < ch.length; i++) {
                if (index == i) {
                    ch.eq(i).attr("src", './resource/images/icon/point_hover.png')
                } else {
                    ch.eq(i).attr("src", './resource/images/icon/point_gray.png')
                }
            }
        }
        // 减号
        $scope.reduce = function () {
            ;
            if ($scope.count <= 1) {
                $scope.count = 1;
            } else {
                $scope.count--;
            }
        }
        // 加号
        $scope.add = function () {
            if ($scope.count >= 99) {
                $scope.count = 99;
            } else {
                $scope.count++;
            }
        }

        productInfoService.addCartAction($scope,POP);

    }


    ctrl.$inject = ['$scope', 'productInfoService','$stateParams','POP'];
    app.registerController('productInfoController', ctrl);


});