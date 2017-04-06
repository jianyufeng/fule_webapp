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
        $(".addAddressBtn").hide();             //初始添加新地址隐藏
        //编辑购物车
        $scope.manageAddress = function(){
            if (editing){

                editing = false;
                $scope.righttitleValue = "管理";
                $(".editOperationArea").hide();
                $scope.addressTitle = "选择收货地址";
                $(".addAddressBtn").hide();

            }else{

                editing = true;
                $scope.righttitleValue = "关闭";
                $(".editOperationArea").show();
                $(".addAddressBtn").show();
                $scope.addressTitle = "管理收货地址";

            }

        };

        //选择收货地址
        $(document).on("click",".shippingAddressItem",function(){

                if (!editing){

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
        $(document).on("click",".selectDefaultBox",function(){

            var _this = $(this);

            var _idx = $(".selectDefaultBox").index(this);
            var info = User.getInfo();

            console.log(_idx);
            var addressID =  $scope.historyAddress[_idx].address_id;
            console.log("*****" + addressID);
            var params = {

                 user_id : info.user_id,
                 address_id : addressID

                 }

            cartManageAddressService.setDefaultAddress($scope,params,POP,function(){

                // if (addressID !=$scope.defaultAddressID){

                    console.log("22-" + addressID,$scope.defaultAddressID);

                    $(".defaultAddress").find("span").text("设为默认");
                    _this.find(".defaultAddress span").text("默认地址");

                    $(".defaultAddress").find("span").css("color","#BCBCBC");
                    _this.find(".defaultAddress span").css("color","#BB55A0");


                    $(".imgSelect").hide();
                    _this.find("img").show();
                    $(".default").hide();
                    $(".default:eq("+_idx+")").show();


                // }


            });




        });

        //点击编辑
        $(document).on("click",".editBtnBox",function(){

            $state.go("tab.cart_addAddress",{UID:1});

            });


        //点击删除
        $(document).on("click",".deleteBtnBox",function(){

            POP.Confirm("您确认要删除掉当前地址?",function () {

                alert("删除地址");

            })

        });

        //添加新地址
        $(".addAddressBtn").click(function(){

            $state.go("tab.cart_addAddress");


        });







    }




    ctrl.$inject = ['$rootScope','$scope','cartManageAddressService', 'POP','$state','$ionicHistory'];
    app.registerController('cartManageAddressController',ctrl);
});