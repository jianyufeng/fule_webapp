/**
 * Created by Administrator on 2017/3/25.
 */



define(['app','css! ../../../css/category/productInfo'], function (app ) {

    function ctrl($scope,productInfoService) {
        $scope.$on('$ionicView.loaded', function () {
            /*获取数据*/
            console.log("productInfoController")
            productInfoService.getProductInfo($scope);

        });

    }


    ctrl.$inject = ['$scope', 'productInfoService'];
    app.registerController('productInfoController', ctrl);






});