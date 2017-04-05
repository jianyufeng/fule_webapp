/**
 * Created by charles_xsx on 2017/3/30.
 */
define(['app','css!../../../css/cart/cart_manageAddress'],function(app,cart_fun){

    function ctrl($scope,cartManageAddressService,POP,$state){

        $scope.addressTitle = "选择收货地址";

        $scope.$on('$ionicView.loaded',function () {

            //初始化
            $scope.righttitleValue = "管理";
            cartManageAddressService.getShippingAddress($scope,POP);


        });

        var editing = false;
        $(".editOperationArea").hide();
        //编辑购物车
        $scope.manageAddress = function(){
            if (editing){

                editing = false;
                $scope.righttitleValue = "管理";
                $(".editOperationArea").hide();
                $scope.addressTitle = "选择收货地址";

            }else{

                editing = true;
                $scope.righttitleValue = "完成";
                $(".editOperationArea").show();
                $scope.addressTitle = "管理收货地址";

            }

        };

        //选择收货地址
        $(document).on("click",".shippingAddressItem",function(){

                if (editing){

                }
                else {

                    //请求服务器设为默认地址,并且跳转到订单页面
                    $state.go("tab.cart_orderConfirm",{UID:1});
                }


            });

        //点击编辑
        $(".editBtnBox").click(function(){
            $state.go("tab.cart_addAddress",{UID:1});

        });


        //点击删除
        $(".deleteBtnBox").click(function(){
            POP.Confirm("您确认要删除掉当前地址?",function () {

                alert("删除地址");


            })

        });


    }




    ctrl.$inject = ['$scope','cartManageAddressService', 'POP','$state'];
    app.registerController('cartManageAddressController',ctrl);
});