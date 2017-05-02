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
            POP.StartLoading();
            HTTP.get(API.My.searchAccountLog + "/user_id/" + userId, {}, function (e, data) {
                POP.EndLoading();
                if (e) {
                    return;
                }
                console.log(data);
                $scope.$apply(function () {
                    $scope.rechargeableCardBList = data.data;
                });
            });
        }
        return service;

    });


});


