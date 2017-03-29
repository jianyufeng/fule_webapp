/**
 * Created by charles_xsx on 2017/3/27.
 */

define(['app','css!../../../css/cart/cart_orderConfirm'],function(app,cart_fun){

    function ctrl($scope){

        $scope.$on('$ionicView.loaded',function () {




        });
    }

    ctrl.$inject = ['$scope'];
    app.registerController('cartOrderController',ctrl);
});