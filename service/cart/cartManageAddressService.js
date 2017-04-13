/**
 * Created by charles_xsx on 2017/3/30.
 */
define(['app'],function(app){

    app.factory("cartManageAddressService",function(){

        var service = {};

        /* 获取服务器数据*/
        service.getShippingAddressList = function ($scope, POP ,fn) {

            POP.StartLoading();

            //获取用户的账号
            var info = User.getInfo();
            HTTP.get(API.Cart.shippingAddress + "/user_id/"+info.user_id , {}, function (e, data) {


                POP.EndLoading();
                console.log(data);
                if (e) {
                    $.loadError(function () {
                        service.getShippingAddressList();
                    });
                    return;
                }


                $scope.$apply(function () {
                    //为html页面注入数据
                    $scope.historyAddress = data.AddressList;
                    $scope.defaultAddressID = data.defaultAddress;
                    fn();//回调函数

                });


            });

        };

        /*设置默认收货地址*/
        service.setDefaultAddress = function($scope,updateParams,POP,fn){

            POP.StartLoading();

            //更新操作
            HTTP.post(API.Cart.updateDefaultAddress,updateParams,function(e,data){

                POP.EndLoading();

                if(e){
                    POP.Hint("设置失败");
                    return;
                }else {
                    fn();
                    POP.Hint("设置成功");
                }



            });

        }


        /*删除收货地址*/
        service.deleteAddress = function($scope,deleteParams,POP,_idx){

            POP.StartLoading();
            //删除操作
            HTTP.get(API.Cart.deleteUserAddress + "/user_id/"+deleteParams.user_id + "/address_id/"+deleteParams.address_id, {}, function (e, data) {

                POP.EndLoading();

                if (e) {
                    $.loadError(function () {
                        POP.Hint("删除失败!");
                        return;
                    });
                    return;
                }

                $(".deleteBtnBox:eq("+_idx+")").parent().parent().slideUp(200);
                var newArr = _.pullAt($scope.historyAddress,_idx);

                if($scope.historyAddress.length<=0){

                    $scope.$apply(function () {
                        $scope.historyAddress = [];
                        $scope.righttitleValue = "";
                        $(".noAddress").show();
                        $scope.address = "";

                    });


                }



            });



        }



        return service;

    });


});

