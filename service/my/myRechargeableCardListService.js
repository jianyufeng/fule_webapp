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

            HTTP.get(API.My.searchUserAccount + "/user_id/" + userId, {}, function (e, data) {

                if (e) {
                    console.log("e:"+e+"-------22");
                    console.log("data:"+data+"-------23");
                }
                //RechargeableCard
                console.log("data:"+data+"-------25");


            });

        }


        /**
         * 获取购物代金劵卡的记录
         *
         */
        service.getBList = function () {


        }
        return service;

    });


});


