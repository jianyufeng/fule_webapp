define(['app'], function (app) {

    app.factory("categoryService", function () {

        var service = {};

        //  获取头部的分类列表和默认分类货物
        service.getCategoryListAndCategoryGoodsList = function ($scope) {
            $.initAppStartLoad();
            HTTP.get(API.Category.category + "/category_id/35", {}, function (e, data) {

                if (e) {
                    $.loadError(function () {
                        service.getCategoryListAndCategoryGoodsList();
                    });
                    return;
                }

                $scope.$apply(function () {
                    console.log(data);
                    $scope.categorys = data.categoryInfo;
                    $scope.productArray = data.goodsInfo.data;
                    var a=data.categoryInfo;
                    var obj=a[0];
                    $scope.categoryName=obj.category_name;
                    $.initAppEndLoad();
                });

            });
        };

        // 点击按钮后实现分类货物的切换
        service.getCategoryGoodsList = function ($scope, categoryId, POP, cacheData,categoryName) {
            if (CommenFun.isNullObj(cacheData)) {
                console.log("没有缓存");
                console.log("当前的Id是没有缓存的");s
                POP.StartLoading();
                HTTP.get(API.Category.category + "/category_id/" + categoryId, {}, function (e, data) {
                    POP.EndLoading();
                    if (e) {
                        $.loadError(function () {
                            service.getCategoryGoodsList();
                        });
                        return;
                    }

                    $scope.$apply(function () {
                        console.log(data);
                        $scope.productArray = data.goodsInfo.data;
                        cacheData[categoryId] = $scope.productArray;
                        $scope.categoryName=categoryName;;
                    });
                });
            } else {
                console.log("有缓存");
                console.log(cacheData[categoryId]);
                if (cacheData[categoryId] == undefined) {
                    console.log("当前的Id是没有缓存的");
                    POP.StartLoading();
                    HTTP.get(API.Category.category + "/category_id/" + categoryId, {}, function (e, data) {
                        POP.EndLoading();
                        if (e) {
                            $.loadError(function () {
                                service.getCategoryGoodsList();
                            });
                            return;
                        }

                        $scope.$apply(function () {
                            $scope.productArray = data.goodsInfo.data;
                            cacheData[categoryId] = $scope.productArray;
                            $scope.categoryName=categoryName;
                        });


                    });

                } else {
                    console.log("当前的ID是有缓存的")
                    $scope.productArray = cacheData[categoryId];
                    $scope.categoryName=categoryName;
                }
            }
        }

        // 下拉刷新
        service.Refresh = function ($scope) {

            HTTP.get(API.Category.category + "/category_id/35", {}, function (e, data) {
                if (e) {
                    $.loadError(function () {
                        service.Refresh();
                    });
                    $scope.$broadcast('scroll.refreshComplete');
                    return;
                }
                $scope.$apply(function () {
                    $scope.$broadcast('scroll.refreshComplete');
                    $scope.categorys = data.categoryInfo;
                    $scope.productArray = data.goodsInfo.data;
                    $scope.categoryName=data.categoryInfo.shift().category_name;
                    $scope.$broadcast('clearCache');
                });

            });

        }
        return service;
    });


});