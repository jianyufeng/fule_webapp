/**
 * Created by Administrator on 2017/3/25.
 */



define(['app', 'css! ../../../css/category/productInfo'], function (app) {

    function ctrl($scope, productInfoService, $stateParams, POP,$state) {
        $scope.count = 1;
        $scope.index = 0;
        console.log("商品详情控制器")
        $scope.$on('$ionicView.loaded', function () {
            productInfoService.getProductInfo($scope, $stateParams,POP);
            productInfoService.getCartInfo($scope);
            productInfoService.setImageMargin();
        });

        productInfoService.Slide($scope);
        productInfoService.addAndReduce($scope);
        productInfoService.addCartAction($scope, POP);
        productInfoService.startPage($scope,$state);

    }


    ctrl.$inject = ['$scope', 'productInfoService', '$stateParams', 'POP','$state'];
    app.registerController('productInfoController', ctrl);


});