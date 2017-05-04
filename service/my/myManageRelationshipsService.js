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

        ////搜索内容
        //service.searchManageAction = function ($scope, POP) {
        //
        //    var searchContent = $('.form-control').val();
        //
        //    POP.StartLoading();
        //
        //    //获取用户的账号
        //    var info = User.getInfo()
        //
        //    HTTP.get(API.My.manageRelationships + "/user_id/"+info.user_id + "/search_user_name/" + searchContent, {}, function (e, data) {
        //
        //        POP.EndLoading();
        //
        //        console.log(data);
        //        if (e) {
        //            POP.Alert("查询有误")
        //            return;
        //        }
        //
        //        $scope.$apply(function () {
        //            //为html页面注入数据
        //            $scope.data  = data.data;
        //            $scope.relationCount = data.count;
        //
        //            if (data.count == 0) {
        //                $scope.isEmptyData = true;
        //            } else {
        //                $scope.isEmptyData = false;
        //
        //            }
        //            $scope.isPullComplete = false;
        //            $scope.$broadcast('scroll.refreshComplete');
        //
        //        });
        //
        //    });
        //
        //
        //};









        return service;


    });


});