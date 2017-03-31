define(['app'], function (app) {

    app.factory("myUnreadMsgService", function () {

        var service = {};

        /*网络获取未读消息记录 信息*/
        service.getUnreadMsg = function ($scope, POP) {
            POP.StartLoading();
            //获取用户的账号
            var info = User.getInfo();
            HTTP.get(API.My.unreadMsg + "/is_notification/1/skip/" + $scope.page * 10 + "/limit/10/", {}, function (e, data) {
                POP.EndLoading();
                console.log(data);
                if (e) {
                    POP.Hint("加载失败");
                    return;
                }
                //如果是上拉则添加到上次数据的后面
                if ($scope.isCanPull) {
                    $scope.datas = $scope.data.concat(data.data);
                } else {
                    $scope.$apply(function(){
                        $scope.datas = [];
                        $scope.datas = data.data;
                    })

                }
                //判断是否有下页数据
                if (data.data.length < 10) {
                    $scope.isCanPull = false;
                } else {
                    $scope.isCanPull = true;
                    $scope.page++;
                }
                $scope.$broadcast('scroll.infiniteScrollComplete');
                $scope.$broadcast('scroll.refreshComplete');
            });

        };
        return service;


    });


});