/**
 * Created by charles_xsx on 2017/3/30.
 */
define(['app','css!../../../css/cart/cart_manageAddress'],function(app,cart_fun){

    function ctrl($rootScope,$scope,cartManageAddressService,POP,$state,$ionicHistory){

        $scope.addressTitle = "选择收货地址";

        $scope.$on('$ionicView.loaded',function () {

            //初始化
            $scope.righttitleValue = "管理";
            cartManageAddressService.getShippingAddress($scope,POP);


        });

        var editing = false;
        $(".editOperationArea").hide();  //初始编辑区域隐藏
        $(".addBtn").hide();             //初始添加新地址隐藏
        //编辑购物车
        $scope.manageAddress = function(){
            if (editing){

                editing = false;
                $scope.righttitleValue = "管理";
                $(".editOperationArea").hide();
                $scope.addressTitle = "选择收货地址";
                $(".addBtn").hide();

            }else{

                editing = true;
                $scope.righttitleValue = "完成";
                $(".editOperationArea").show();
                $(".addBtn").show();
                $scope.addressTitle = "管理收货地址";

            }

        };

        //选择收货地址
        $(document).on("click",".shippingAddressItem",function(){

                if (editing){

                }
                else {

                    //请求服务器设为默认地址,并且跳转到订单页面

                    //选择当前点击的收货地址
                    var _idx = $(".shippingAddressItem").index(this);

                    console.log($scope.historyAddress[_idx]);

                    //将数组对应的地址信息拿到并绑定成全局变量(相当于变量绑定通知)
                    $rootScope.$broadcast('changeAddressInfo', { "address" : $scope.historyAddress[_idx]});

                    //成功直接返回上一层
                    $ionicHistory.goBack();

                }


            });


        //点击设置默认地址
        $(".selectDefaultBox").click(function(){

            var _idx = $(".selectBtn").index(this);
            if($(this).find("img").is(':visible')){
                $(this).find("img").hide();
            }else{
                $(this).find("img").show();
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

        //添加新地址
        $(".addBtn").click(function(){

            $state.go("tab.cart_addAddress");


        });







    }




    ctrl.$inject = ['$rootScope','$scope','cartManageAddressService', 'POP','$state','$ionicHistory'];
    app.registerController('cartManageAddressController',ctrl);
});