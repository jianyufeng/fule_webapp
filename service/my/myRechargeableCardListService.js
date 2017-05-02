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
                    var listA = [];
                    var listB = [];
                    for (var i = 0; i < data.data.length; i++) {
                        var item = data.data[i];
                        console.log(item);
                        if (item.user_money > 0 && item.fxp_points <= 0) {
                            listA.push(item);
                        }
                        if (item.fxp_points > 0 && item.user_money <= 0) {
                            listB.push(item);
                        }
                    }

                    $scope.rechargeableCardAList = listA;
                    $scope.rechargeableCardBList = listB;

                });
            });

        }
        return service;

    });


});


