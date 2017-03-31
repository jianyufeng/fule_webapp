/**
 * Created by charles_xsx on 2017/3/30.
 */
define(['app','css!../../../css/cart/cart_manageAddress'],function(app,cart_fun){

    function ctrl($scope,cartManageAddressService,POP){

        $scope.$on('$ionicView.loaded',function () {






        });



    }

    ctrl.$inject = ['$scope','cartManageAddressService', 'POP'];
    app.registerController('cartManageAddressController',ctrl);
});