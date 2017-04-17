define(['app'],function(app){

    app.factory("myHappyHomeLogsService",function(){

        var service = {};


        /*网络获取用户信息*/
        service.getHappyHomeLogs = function ($scope, POP) {


            POP.StartLoading();

            //获取用户的账号
            var info = User.getInfo()
            HTTP.get(API.My.searchHappyHomeLogs + "/user_name/"+info.user_name , {}, function (e, data) {

                POP.EndLoading();

                  console.log(data);
                if (e) {
                    $.loadError(function () {
                        service.getHappyHomeLogs();
                    });
                    return;
                }

                for(var i = 0; i < data.count;i++){

                    var add_time = data.data[i].addtime;

                    var xlzj_users = data.data[i].xlzj_user;

                     var usersArr = xlzj_users.split(",");

                       data.data[i].xlzj_user = usersArr;

                }



                $scope.$apply(function () {
                    //为html页面注入数据
                    $scope.logsData = data.data;

                });

                console.log($scope.logsData);

            });

        };


        return service;

    });


});