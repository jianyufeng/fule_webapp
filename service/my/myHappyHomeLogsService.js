define(['app'],function(app){

    app.factory("myHappyHomeLogsService",function(){

        var service = {};


        /*网络获取用户信息*/
        service.getHappyHomeLogs = function ($scope, POP) {


            POP.StartLoading();

            //获取用户的账号
            var info = User.getInfo()
            alert(info.user_name);
            HTTP.get(API.My.searchHappyHomeLogs + "/user_name/"+info.user_name , {}, function (e, data) {

                POP.EndLoading();

                  console.log(data);
                if (e) {
                    $.loadError(function () {
                        service.getHappyHomeLogs();
                    });
                    return;
                }


                // $scope.$apply(function () {
                //     //为html页面注入数据
                //     $scope.historyAddress = data.AddressList;
                //     $scope.defaultAddressID = data.defaultAddress;
                //
                // });


            });

        };


        return service;

    });


});