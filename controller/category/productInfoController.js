/**
 * Created by Administrator on 2017/3/25.
 */



define(['app', 'css! ../../../css/category/productInfo'], function (app) {

    function ctrl($scope, productInfoService, $stateParams, POP) {
        $scope.count = 1;
        $scope.index = 0;
        $scope.$on('$ionicView.loaded', function () {
            /*获取数据*/
            console.log("productInfoController")
            productInfoService.getProductInfo($scope, $stateParams);
            productInfoService.getCartInfo($scope);
            productInfoService.setImageMargin();
        });

        productInfoService.Slide($scope);
        productInfoService.addAndReduce($scope);
        productInfoService.addCartAction($scope, POP);

    }


    ctrl.$inject = ['$scope', 'productInfoService', '$stateParams', 'POP'];
    app.registerController('productInfoController', ctrl);


});