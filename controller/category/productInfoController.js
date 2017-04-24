/**
 * Created by Administrator on 2017/3/25.
 */



define(['app', 'css! ../../../css/category/productInfo'], function (app) {

    function ctrl($scope, productInfoService, $stateParams, POP, $state, $ionicSlideBoxDelegate) {

        $scope.$on('$ionicView.enter', function () {
            $scope.count = 1;
            productInfoService.getProductInfo($scope, $stateParams, POP);
            productInfoService.getCartInfo($scope, POP);

        });
        $scope.$on('$ionicView.leave', function () {
            $scope.count = 1;


        });




        $scope.onSlideChanged = function (index) {
            productInfoService.Slide(index);
        }

        $scope.addCartAction = function () {
            productInfoService.addCartAction($scope, POP);
        }

        $scope.startPage = function () {
            productInfoService.startPage($scope, $state);
        }
        // 减号
        $scope.reduce = function () {
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
        }
        // 加号
        $scope.add = function () {
            if ($scope.limitGoodsNumber == "无限制") {
                $scope.count++;
            } else {
                if ($scope.count >= $scope.limitGoodsNumber) {
                    $scope.count = $scope.limitGoodsNumber;
                } else {
                    $scope.count++;
                }
            }
        }

        $scope.$on("viewOnFinish", function () {
            productInfoService.setImageMargin();
            $scope.myActiveSlide = 0;
            $ionicSlideBoxDelegate.update();

        });


    }


    ctrl.$inject = ['$scope', 'productInfoService', '$stateParams', 'POP', '$state', '$ionicSlideBoxDelegate'];
    app.registerController('productInfoController', ctrl);


});