/**
 * Created by charles_xsx on 2017/3/30.
 */
define(['app','css!../../../css/cart/cart_selectAddress'],function(app,cart_fun){

    function ctrl($scope,cartSelectAddressService,POP,$state){

        // $scope.$on('$ionicView.loaded',function () {
        //
        //
        //     //初始化
        //     $scope.righttitleValue = "管理";
        //     cartSelectAddressService.getShippingAddress($scope,POP);
        //
        // });

//编辑购物车

        // $scope.manageAddress = function(){
        //
        //
        // };


    }

    ctrl.$inject = ['$scope','cartSelectAddressService', 'POP'];
    app.registerController('cartSelectAddressController',ctrl);
});