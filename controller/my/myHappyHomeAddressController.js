
/**
 * Created by charles_xsx on 2017/3/30.
 */
define(['app','css!../../../css/my/my-happyHomeAddress'],function(app){

    function ctrl($rootScope,$scope,myHappyHomeAddressService,POP,$state,$ionicHistory){

        $scope.addressTitle = "选择收货地址";
        var editing = false;  //管理状态

        $scope.$on('$ionicView.beforeEnter',function () {

            //初始化
            myHappyHomeAddressService.getHappyHomeAddressList($scope,POP,function () {

                //判断是否登录
                if($scope.happyHomeAddress.length > 0){
                    $(".noAddress").hide();
                    $scope.righttitleValue = "管理";

                }else{
                    $(".noAddress").show();
                    return;
                }

            });
            $(".addAddressBtn").hide(); //初始添加新地址隐藏
            $(".manageContent").css("bottom","0px");


            //选择收货地址
            $(document).on("click",".happyHomeAddressItem",function(){

                if (!editing){

                    //选择当前点击的收货地址
                    var _idx = $(".happyHomeAddressItem").index(this);

                    //将数组对应的地址信息拿到并绑定成全局变量(相当于变量绑定通知)
                    $rootScope.$broadcast('changeAddress', { "address":$scope.happyHomeAddress[_idx]});

                    //成功直接返回上一层
                    $ionicHistory.goBack();

                }


            });



        });



        //将要离开本页面时调用
        $scope.$on('$ionicView.beforeLeave',function () {

            editing = false;

        });

        var info = User.getInfo(); //获取用户信息

        //编辑地址
        $scope.manageAddress = function(){
            if (editing){

                editing = false;
                $scope.righttitleValue = "管理";
                $(".editOperationArea").hide();
                $scope.addressTitle = "选择收货地址";
                $(".addAddressBtn").hide();
                $(".manageContent").css("bottom","0px");

            }else{

                editing = true;
                $scope.righttitleValue = "关闭";
                $(".editOperationArea").show();
                $(".addAddressBtn").show();
                $scope.addressTitle = "管理收货地址";
                $(".manageContent").css("bottom","50px");



                //点击设置默认地址
                $(document).on("click",".selectDefaultBox",function(){

                    var _this = $(this);

                    var _idx = $(".selectDefaultBox").index(this);


                    var addressID =  $scope.happyHomeAddress[_idx].address_id;

                    console.log($scope.happyHomeAddress[_idx]);

                    var params = {

                        user_id : info.user_id,
                        address_id : addressID

                    }


                    if (addressID == $scope.defaultHomeAddressID){

                        POP.Hint("已经是默认地址了");
                        return;

                    }


                    myHappyHomeAddressService.setDefaultAddress($scope,params,POP,function(){

                        $scope.defaultHomeAddressID = addressID;

                        $(".defaultAddress").find("span").text("设为默认");
                        _this.find(".defaultAddress span").text("默认地址");

                        $(".defaultAddress").find("span").css("color","#BCBCBC");
                        _this.find(".defaultAddress span").css("color","#BB55A0");


                        $(".imgSelect").hide();
                        _this.find("img").show();
                        $(".default").hide();
                        $(".default:eq("+_idx+")").show();  //根据下标地址获取对应的控件


                    });


                });





                //点击编辑
                $(document).on("click",".editBtnBox",function(){

                    var _idx = $(".editBtnBox").index(this);
                    var RAddress =  $scope.happyHomeAddress[_idx];

                    $state.go("tab.cart_modifyAddress",{  address:RAddress.address,
                        address_id:RAddress.address_id,
                        address_name:RAddress.address_name,
                        best_time:RAddress.best_time,
                        country:RAddress.country,
                        country_name:RAddress.country_name,
                        city_name:RAddress.city_name,
                        city:RAddress.city,
                        consignee:RAddress.consignee,
                        district_name:RAddress.district_name,
                        district:RAddress.district,
                        email:RAddress.email,
                        mobile:RAddress.mobile,
                        province_name:RAddress.province_name,
                        province:RAddress.province,
                        sign_building:RAddress.sign_building,
                        tel:RAddress.tel,
                        zipcode:RAddress.zipcode,
                        user_id:info.user_id});

                });





            }

        };




        //点击删除
        $(document).off('click').on("click",".deleteBtnBox",function(){
            var _this = $(this);

            var _idx = $(".deleteBtnBox").index(_this);

            var rrAddress =  $scope.happyHomeAddress[_idx];

            var PARAMS = {
                user_id :rrAddress.user_id,
                address_id : rrAddress.address_id
            }

            if (rrAddress.address_id == $scope.defaultHomeAddressID){

                POP.Hint("不能删除默认地址");
                return;

            }


            POP.Confirm("您确认要删除掉当前地址?",function () {

                myHappyHomeAddressService.deleteAddress($scope,rrAddress,POP,_idx,function (empty) {

                    //将对应的地址信息拿到并绑定成全局变量(相当于变量绑定通知)
                    $rootScope.$broadcast('deleteAddress', { "address" : empty,"address_id":rrAddress.address_id});


                });


            })

        });


        //添加新地址
        $(".addAddressBtn").click(function(){

            $state.go("tab.cart_addAddress");

        });

        //添加新地址
        $(document).on("click",".newAddressBtn",function(){

            $state.go("tab.cart_addAddress");

        });




    }




    ctrl.$inject = ['$rootScope','$scope','myHappyHomeAddressService', 'POP','$state','$ionicHistory'];
    app.registerController('myHappyHomeAddressController',ctrl);
});