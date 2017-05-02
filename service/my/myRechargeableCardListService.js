/**
 * Created by ShareLock on 2017/4/1.
 * 充值卡列表的Service
 */
define(['app'], function (app) {


    app.factory('myRechargeableCardListService', function () {

        var service = {};


        /**
         * 获取电子币卡记录
         *
         */
        service.getAList = function ($scope, POP, userId) {
            POP.StartLoading();
            HTTP.get(API.My.searchUserAccount + "/user_id/" + userId, {}, function (e, data) {
                POP.EndLoading();
                if (e) {
                    return;
                }
                console.log(data);
                $(".listBBox").attr('display', 'none');
                $(".listABox").attr('display', 'block');
                $scope.$apply(function () {
                    $scope.rechargeableCardAList = data.data;
                });
            });

        }


        /**
         * 获取购物代金劵卡的记录
         *
         */
        service.getBList = function ($scope, POP, userId) {
            $(".listABox").attr('display', 'none');
            $(".listBBox").attr('display', 'block');
            console.log(22222222222);
            POP.StartLoading();
            HTTP.get(API.My.searchAccountLog + "/user_id/" + userId, {}, function (e, data) {
                POP.EndLoading();
                if (e) {
                    //console.log("e:"+e+"-------46");
                    //console.log("data:"+data+"-------47");
                    return;
                }
                //RechargeableCard
                //console.log("data:"+data+"-------50");
                console.log(data);
                $scope.$apply(function () {
                    $scope.rechargeableCardBList = data.data;
                });
            });
        }
        return service;

    });


});


