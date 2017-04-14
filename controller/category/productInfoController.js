/**
 * Created by Administrator on 2017/3/25.
 */



define(['app', 'css! ../../../css/category/productInfo'], function (app) {

    function ctrl($scope, productInfoService, $stateParams, POP, $state, $ionicSlideBoxDelegate) {
        //
        //$scope.$on('$ionicView.loaded', function () {
        //    productInfoService.getProductInfo($scope, $stateParams, POP);
        //    productInfoService.getCartInfo($scope, POP);
        //
        //});
        $scope.$on('$ionicView.beforeEnter', function () {
            $scope.count = 1;
            productInfoService.getProductInfo($scope, $stateParams, POP);
            productInfoService.getCartInfo($scope, POP);

        });


        $scope.$on("viewOnFinish", function () {
            productInfoService.setImageMargin();
            $scope.myActiveSlide = 0;
            $ionicSlideBoxDelegate.update();
        });

        $scope.onSlideChanged = function (index) {
            productInfoService.Slide($scope, index);
        }

        // 减号
        $scope.reduce = function () {
            $scope.count = $(".accountBox_number").val();
            if ($scope.minGoodsNumber == "无限制") {
                $scope.count--;
            } else {
                if ($scope.count <= $scope.minGoodsNumber) {
                    $scope.count = $scope.minGoodsNumber;
                } else {
                    $scope.count--;
                }
            }
            if ($scope.count <= 1) {
                $scope.count = 1
            }
            $(".accountBox_number").val($scope.count);
        }
        // 加号
        $scope.add = function () {
            $scope.count = $(".accountBox_number").val();
            if ($scope.limitGoodsNumber == "无限制") {
                $scope.count++;
            } else {
                if ($scope.count >= $scope.limitGoodsNumber) {
                    $scope.count = $scope.limitGoodsNumber;
                } else {
                    $scope.count++;
                }
            }

            $(".accountBox_number").val($scope.count);
        }

        $scope.addCartAction = function () {
            productInfoService.addCartAction($scope, POP);
        }

        $scope.startPage = function () {
            productInfoService.startPage($scope, $state);
        }


    }


    ctrl.$inject = ['$scope', 'productInfoService', '$stateParams', 'POP', '$state', '$ionicSlideBoxDelegate'];
    app.registerController('productInfoController', ctrl);


});