/**
 * Created by charles_xsx on 2017/3/30.
 */
define(['app','css!../../../css/cart/cart_selectAddress'],function(app,cart_fun){

    function ctrl($scope,cartSelectAddressService,POP){

        $scope.$on('$ionicView.loaded',function () {


            //初始化
            $scope.righttitleValue = "管理";



        });



    }

    ctrl.$inject = ['$scope','cartSelectAddressService', 'POP'];
    app.registerController('cartSelectAddressController',ctrl);
});