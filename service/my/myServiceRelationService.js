
define(['app'],function(app){

    app.factory("myHappyHomeLogsService",function(){

        var service = {};


        /*网络获取用户信息*/
        service.getServiceRelationship = function ($scope, POP,fn) {


            POP.StartLoading();

            //获取用户的账号
            var info = User.getInfo()
            HTTP.get(API.My.serviceRelationShip + "/user_id/"+info.user_id + "/limit/"+10 + "skip" + 0, {}, function (e, data) {

                POP.EndLoading();

                console.log(data);
                if (e) {
                    $.loadError(function () {
                        service.getServiceRelationship();
                    });
                    return;
                }


                $scope.$apply(function () {
                    //为html页面注入数据
                    $scope.relationData  = data.data;
                    $scope.relationCount = data.count;
                    fn();
                });

            });

        };




        return service;

    });


});