define(['app'], function (app) {

    app.factory("myUnreadMsgService", function () {

        var service = {};
        var first = true;
        /*网络获取未读消息记录 信息*/
        service.getUnreadMsg = function ($scope, POP) {
            if (first) {
                POP.StartLoading();
            }

            //获取用户的账号
            HTTP.get(API.My.unreadMsg + "/is_notification/1/skip/" + $scope.page * 10 + "/limit/10/", {}, function (e, data) {
                POP.EndLoading();
                if (e) {
                    POP.Hint("加载失败");
                    return;
                }
                first = false;
                //如果是上拉则添加到上次数据的后面
                console.log($scope.isCanPull);
                if ($scope.isCanPull) {
                    $scope.datas = $scope.datas.concat(data.data);
                } else {
                    $scope.$apply(function () {
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

        /*网络获取未读消息详情 信息*/
        service.getUnreadMsgInfo = function ($scope,$sce, POP, article_id) {
            POP.StartLoading();
            HTTP.get(API.My.unreadMsgInfo + "/type/2/article_id/" + article_id, {}, function (e, data) {
                POP.EndLoading();
                if (e) {
                    POP.Hint("加载失败");
                    return;
                }
                //如果是上拉则添加到上次数据的后面
               $scope.content = $sce.trustAsHtml(data.data[0].content);
            });
        };
        return service;


    });


});