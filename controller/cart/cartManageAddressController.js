/**
 * Created by charles_xsx on 2017/3/30.
 */
define(['app','css!../../../css/cart/cart_manageAddress'],function(app,cart_fun){

    function ctrl($scope,cartManageAddressService,POP){

        $scope.$on('$ionicView.loaded',function () {

            //初始化
            $scope.righttitleValue = "管理";
            cartManageAddressService.getShippingAddress($scope,POP);


        });
        
        var editing = false;
        //编辑购物车
        $scope.manageAddress = function(){
            if (editing){

                editing = false;
                $scope.righttitleValue = "管理";
                $(".editOperationArea").show();

            }else{

                editing = true;
                $scope.righttitleValue = "完成";
                $(".editOperationArea").hide();

            }

        };


    }




    ctrl.$inject = ['$scope','cartManageAddressService', 'POP'];
    app.registerController('cartManageAddressController',ctrl);
});