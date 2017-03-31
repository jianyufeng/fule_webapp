define(['app'], function (app) {

    app.factory("myTransferRecordService", function () {

        var service = {};

        /*网络获取转账记录 信息*/
        service.getTransferRecord = function ($scope, POP, type) {
            if ($scope.isCanPull) {
                POP.StartLoading();
            }

            //获取用户的账号
            var info = User.getInfo();
            HTTP.get(API.My.transferRecord + "/skip/"+ $scope.page * 10 +"/limit/10/type/" + type + "/user_id/" + info.user_id, {}, function (e, data) {
                POP.EndLoading();
                console.log(data);
                if (e) {
                    POP.Hint("加载失败");
                    return;
                }
                //如果是上拉则添加到上次数据的后面
                if($scope.isCanPull){
                    $scope.data = $scope.data.concat(data.data);
                }else {
                    $scope.data = data.data;
                }
                //判断是否有下页数据
                if (data.data.length < 10) {
                    $scope.isCanPull = false;
                } else {
                    $scope.isCanPull = true;
                    $scope.page++;
                }
                $scope.$broadcast('scroll.infiniteScrollComplete');
            });

        };
        return service;


    });


});