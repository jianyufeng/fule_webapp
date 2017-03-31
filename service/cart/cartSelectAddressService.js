/**
 * Created by charles_xsx on 2017/3/30.
 */
define(['app'],function(app){

    app.factory("cartSelectAddressService",function(){

        var service = {};

        // /* 获取服务器数据*/
        // /*网络获取用户信息*/
        // service.getShippingAddress = function ($scope, POP) {
        //
        //
        //     POP.StartLoading();
        //
        //
        //
        //     //获取用户的账号
        //     var info = User.getInfo();
        //     HTTP.get(API.Cart.shippingAddress + "/user_id/"+info.user_id , {}, function (e, data) {
        //
        //
        //         POP.EndLoading();
        //
        //         if (e) {
        //             $.loadError(function () {
        //                 service.getShippingAddress();
        //             });
        //             return;
        //         }
        //
        //
        //         $scope.$apply(function () {
        //             //为html页面注入数据
        //
        //
        //
        //
        //         });
        //
        //
        //     });
        //
        // };


        return service;

    });


});

