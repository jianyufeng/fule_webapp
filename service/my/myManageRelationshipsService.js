define(['app'], function (app) {

    app.factory("myManageRelationshipsService", function () {

        var service = {};

        service.getManageRelationships = function ($scope, POP ) {


                POP.StartLoading();


            //获取用户的账号
            var info = User.getInfo()

            HTTP.get(API.My.manageRelationships + "/user_id/"+info.user_id + "/limit/"+10 + "/skip/" + 0, {}, function (e, data) {
                POP.EndLoading();
                if (e) {
                    $.loadError(function () {
                        service.getManageRelationships();
                    });
                    POP.Hint("加载失败");

                    return;
                }
                //如果是上拉则添加到上次数据的后面

                $scope.$apply(function () {
                    //if ($scope.isCanPull) {
                    //    $scope.data = $scope.data.concat(data.data);
                    //} else {
                        $scope.data = data.data;
                    //}
                });

                //var length = data.data.length;
                //
                ////判断数据是否为空
                //if (length <= 0) {
                //    $scope.$apply(function () {
                //        $scope.isEmptyData = true;
                //    });
                //} else {
                //    $scope.$apply(function () {
                //        $scope.isEmptyData = false;
                //    });
                //}
                //
                ////判断是否有下页数据
                //if (length < 10) {
                //    $scope.isCanPull = false;
                //} else {
                //    $scope.isCanPull = true;
                //    $scope.page++;
                //}
                //$scope.$broadcast('scroll.infiniteScrollComplete');


            });


        };

        return service;


    });


});