/**
 * Created by Administrator on 2017/3/25.
 */



define(['app','css! ../../../css/category/productInfo'], function (app ) {

    function ctrl($scope) {
        $scope.$on('$ionicView.loaded', function () {
            /*获取数据*/
            console.log("productInfoController")


        });

    }

    ctrl.$inject = ['$scope'];
    app.registerController('productInfoController', ctrl);


});