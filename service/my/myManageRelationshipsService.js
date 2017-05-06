define(['app'], function (app) {

    app.factory("myManageRelationshipsService", function () {

        var service = {};

        service.getManageRelationships = function ($scope, POP ) {


            if (!$scope.isCanPull) {
                POP.StartLoading();
            }

            //获取用户的账号
            var info = User.getInfo()

            HTTP.get(API.My.manageRelationships + "/user_id/"+info.user_id + "/limit/"+10 + "/skip/" + $scope.managePage * 10, {}, function (e, data) {
                POP.EndLoading();
                if (e) {

                    POP.Hint("加载失败");

                    return;
                }
                $scope.$apply(function () {
                    //根据是否上拉不同处理
                    var length = data.data.length;
                    console.log(length);
                    if ($scope.isCanPull) {
                        //加载更多
                        $scope.data = $scope.data.concat(data.data);
                    } else { //根据是否上拉不同处理
                        //if ($scope.isCanPull) {
                        //    //加载更多
                        //    $scope.data = $scope.data.concat(data.data);
                        //} else {
                            //刷新
                            $scope.data = data.data;
                            //判断数据是否为空
                            if (length <= 0) {
                                $scope.isEmptyData = true;
                            } else {
                                $scope.isEmptyData = false;
                            }
                        //}
                    }
                    //判断是否有下页数据
                    if (length < 10) {
                        $scope.isCanPull = false;
                    } else {
                        $scope.isCanPull = true;
                        $scope.managePage++;
                    }
                    $scope.$broadcast('scroll.infiniteScrollComplete');
                });

            });
        };

        //搜索内容
        service.searchManageAction = function ($scope, POP) {

            var searchContent = $('.form-control').val();

            POP.StartLoading();

            //获取用户的账号
            var info = User.getInfo()

            HTTP.get(API.My.manageRelationships + "/user_id/"+info.user_id + "/search_user_name/" + searchContent, {}, function (e, data) {

                POP.EndLoading();

                console.log(data);
                if (e) {
                    POP.Alert("查询有误")
                    return;
                }

                $scope.$apply(function () {
                    //为html页面注入数据
                    $scope.data  = data.data;
                    $scope.relationCount = data.count;

                    if (data.count == 0) {
                        $scope.isEmptyData = true;
                    } else {
                        $scope.isEmptyData = false;

                    }
                    $scope.isCanPull = false;
                    $scope.$broadcast('scroll.refreshComplete');

                });

            });


        };




        return service;


    });


});