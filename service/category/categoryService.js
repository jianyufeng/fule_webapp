define(['app'], function (app) {

    app.factory("categoryService", function () {

        var service = {};
        var categoryId;
        var refreshCaregoryId;
        var refreshCaregoryName;
        //var refreshIndex;
        //  获取头部的分类列表和默认分类货物
        service.getCategoryListAndCategoryGoodsList = function ($scope, POP) {
            $.initAppStartLoad();
            HTTP.get(API.Category.category, {}, function (e, data) {
                if (e) {
                    $.loadError(function () {
                        service.getCategoryListAndCategoryGoodsList();
                    });
                    return;
                }

                $scope.$apply(function () {
                    // 添加全部
                    var last = new Object();
                    last.category_id = -1;
                    last.category_img = "resource/icon/allCategory.png";
                    last.category_name = "全部"
                    var array = [];
                    array = data.categoryInfo;
                    array.push(last);
                    $scope.categorys = array;
                    $scope.productArray = data.goodsInfo.data;
                    $scope.allProduct = data.goodsInfo.data;
                    var a = data.categoryInfo;
                    console.log($scope.categorys);
                    console.log($scope.productArray);
                    console.log(a);
                    var obj = a[0];
                    $scope.categoryName = obj.category_name;
                    //  手动请求一下点击事件
                    categoryId = obj.category_id;
                    service.getCategoryGoodsList($scope, categoryId, POP, {}, obj.category_name, 0);
                    $.initAppEndLoad();
                });

            });
        };

        service.showDef = function (index) {
            var id = "item" + index;
            $(".category_top_list_item").find(".categoryImgBack").css(
                {
                    "background-color": "#FFFFFF",
                    "border": "1px #e7c6df solid"
                }
            )
            $("#" + id).find(".categoryImgBack").css(
                {
                    "background-color": "#F5E9F3", "border": "0px"
                }
            );
            $(".categoryName").css("color", "#999999");
            $(".categoryName").eq(index).css("color", "#D39AC5");
        };

        // 点击按钮后实现分类货物的切换
        service.getCategoryGoodsList = function ($scope, categoryId, POP, cacheData, categoryName, index) {

            console.log(123123123);
            console.log("categoryId=" + categoryId);
            refreshCaregoryId = categoryId;
            refreshCaregoryName = categoryName;
            refreshIndex = index;
            console.log("refreshCaregoryId" + refreshCaregoryId)
            //点击全部
            if (categoryId == -1) {
                console.log("全部")
                console.log($scope.allProduct);
                $scope.productArray = $scope.allProduct;
                $scope.categoryName = "全部";
                service.showDef(index);
                return;
            }
            if (CommenFun.isNullObj(cacheData)) {
                //POP.StartLoading();
                HTTP.get(API.Category.category + "/category_id/" + categoryId, {}, function (e, data) {
                    if (e) {

                        return;
                    }

                    $scope.$apply(function () {
                        $scope.productArray = data.goodsInfo.data;
                        cacheData[categoryId] = $scope.productArray;
                        $scope.categoryName = categoryName;
                        service.showDef(index);
                    });


                });
            } else {
                if (cacheData[categoryId] == undefined) {
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
                            $scope.categoryName = categoryName;
                            service.showDef(index);

                        });


                    });

                } else {
                    $scope.productArray = cacheData[categoryId];
                    $scope.categoryName = categoryName;
                    service.showDef(index);
                }
            }


        }

        // 下拉刷新
        service.Refresh = function ($scope) {
            console.log(55555555555555555);
            console.log("当前的index=" + refreshIndex);
            console.log("当前的分类Id是：" + refreshCaregoryId);
            if (refreshCaregoryId == -1) {
                //请求全部
                HTTP.get(API.Category.category, {}, function (e, data) {
                    if (e) {
                        return;
                    }
                    $scope.$apply(function () {
                        // 添加全部
                        $scope.$broadcast('scroll.refreshComplete');
                        // 添加全部
                        console.log("请求全部");
                        var last = new Object();
                        last.category_id = -1;
                        last.category_img = "resource/icon/allCategory.png";
                        last.category_name = "全部"
                        var array = [];
                        array = data.categoryInfo;
                        array.push(last);
                        $scope.categorys = array;
                        $scope.productArray = data.goodsInfo.data;
                        $scope.allProduct = data.goodsInfo.data;
                        $scope.$broadcast('clearCache');
                    });

                });

                return;
            }
            HTTP.get(API.Category.category + "/category_id/" + refreshCaregoryId, {}, function (e, data) {
                if (e) {
                    $scope.$broadcast('scroll.refreshComplete');
                    return;
                }
                $scope.$apply(function () {
                    console.log("请求的不是全部当前的分类Id是" + refreshCaregoryId);
                    $scope.$broadcast('scroll.refreshComplete');
                    // 添加全部
                    var last = new Object();
                    last.category_id = -1;
                    last.category_img = "resource/icon/allCategory.png";
                    last.category_name = "全部"
                    var array = [];
                    array = data.categoryInfo;
                    array.push(last);
                    $scope.categorys = array;
                    $scope.productArray = data.goodsInfo.data;
                    $scope.categoryName = refreshCaregoryName;

                    $scope.$broadcast('clearCache');
                });

            });

        }
        return service;
    });


});