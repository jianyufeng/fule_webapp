/**
 * Created by charles_xsx on 2017/3/30.
 */
define(['app','css!../../../css/cart/cart_addAddress'],function(app,cart_fun){

    function ctrl($scope,cartAddAddressService,POP){

        $scope.$on('$ionicView.loaded',function () {

            //初始化
            $scope.righttitleValue = "保存";




        });



    }

    ctrl.$inject = ['$scope','cartAddAddressService', 'POP'];
    app.registerController('cartAddAddressController',ctrl);
});
