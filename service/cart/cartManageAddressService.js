/**
 * Created by charles_xsx on 2017/3/30.
 */
define(['app'],function(app){

    app.factory("cartManageAddressService",function(){

        var service = {};

        /* 获取服务器数据*/
        service.getShippingAddress = function ($scope, POP) {

            POP.StartLoading();

            //获取用户的账号
            var info = User.getInfo();
            HTTP.get(API.Cart.shippingAddress + "/user_id/"+info.user_id , {}, function (e, data) {


                POP.EndLoading();
                console.log(data);
                if (e) {
                    $.loadError(function () {
                        service.getShippingAddress();
                    });
                    return;
                }


                $scope.$apply(function () {
                    //为html页面注入数据
                    $scope.historyAddress = data.AddressList;
                    $scope.defaultAddressID = data.defaultAddress;

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


        return service;

    });


});

