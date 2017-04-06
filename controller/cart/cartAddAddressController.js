/**
 * Created by charles_xsx on 2017/3/30.
 */
define(['app','css!../../../css/cart/cart_addAddress'],function(app,cart_fun){

    function ctrl($scope,cartAddAddressService,POP,$state){

        $scope.$on('$ionicView.loaded',function () {

            //初始化
            $scope.righttitleValue = "保存";




        });


        //保存
        $scope.saveAddress = function () {

            //保存成功后后退到地址管理页面
            var recieverName = $('.recieverName').val();
            var mobileNumeber = $('.recieverNumber').val();








            // $state.go("tab.cart_manageAddress",{UID:1})


        }



    }

    ctrl.$inject = ['$scope','cartAddAddressService', 'POP','$state'];
    app.registerController('cartAddAddressController',ctrl);
});
