/**
 * Created by ShareLock on 2017/3/31.
 *
 * 转账记录Service
 */


define(['app'], function (app) {

    app.factory('myRemittanceRecordService', function () {

        var service = {};

        service.getRemittanceRecord = function ($scope, POP) {
            //POP.StartLoading();
            //User_ID userId
            //skip    分页
            //limit   分页条数
            var skip = 1;
            var limit = 50;
            var userId = User.getInfo().user_id;
            HTTP.get(API.My.remittanceRecord + "/User_ID/" + userId ,
                {}, function (e, data) {
                    //POP.EndLoading();
                    if(e){
                        //console.log(e);
                        //console.log(data);
                        //
                        //$.loadError(function () {
                        //    service.getRemittanceRecord();
                        //});
                        return;
                    }
                    $scope.$apply(function () {
                        $scope.RemittanceRecordArray = data.data;
                    });

                    return;

                }
            );


        }

        return service;


    });

})