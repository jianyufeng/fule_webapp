define(['app', "./Fun/caregoryFun"], function (app, caregoryFun) {

    function ctrl($scope, $rootScope, categoryService, POP, $state, $ionicScrollDelegate) {

        $rootScope[$state.current.name] = {};
        $(".mytab").find(".tab-title").css("color", "#000000");
        $(".fenleiIcon").find(".tab-title").css("color", "#D9A8CD");

        refreshIndex = 0;
        var allProduct = {};
        // 加入购物车
        $scope.$on("$ionicView.enter", function () {
            caregoryFun.addCartFlay($scope, $rootScope, $state, POP);
            if (User.isLogin()) {
                var userId = User.getInfo().user_id;
                console.log(userId);
                HTTP.get(API.Category.getCartNum + "/user_id/" + userId + "/shopping_type/1", {}, function (e, data) {

                    if (e) {
                        $rootScope.cartBadge = 0;
                        return;
                    }

                    data = data == undefined ? 0 : data;
                    $scope.$apply(function () {
                        $rootScope.cartBadge = data;
                    });
                })
            }

        });

        $scope.$on('$ionicView.loaded', function () {

            // 初始化页面数据
            categoryService.getCategoryListAndCategoryGoodsList($scope, POP);

            //更换产品列表
            $scope.changCategoryList = function (categoryId, categoryName, index) {
                smallToTop();
                categoryService.getCategoryGoodsList($scope, categoryId, POP, $rootScope[$state.current.name], categoryName, index);
            };
            // 下拉刷新
            $scope.doRefresh = function () {
                categoryService.Refresh($scope);
            }
        });

        var smallToTop = function () {
            $ionicScrollDelegate.$getByHandle('small').scrollTop();
        };
        $scope.$on("viewOnFinish", function () {
            $(".goodsImg img").myImageLazyLoad({
                //默认三个参数可不传，使用默认参数
                // imageLoadErr : "./resource/images/default/default_image.png", //加载失败占位图
                // imageServer : "http://image.38zs.net:848",				    //图片服务器地址
                // animate     : true,											//是否动画显示
            });
            var textWidth = $(".midd_text").outerWidth();
            $(".midd_text").css("marginLeft", -(textWidth / 2));

        });


        $scope.$on("viewOnFinishTwo", function () {
            categoryService.showDef(refreshIndex);
            $(".categoryImageBox img").myImageLazyLoad({
                //默认三个参数可不传，使用默认参数
                // imageLoadErr : "./resource/images/default/default_image.png", //加载失败占位图
                // imageServer : "http://image.38zs.net:848",				    //图片服务器地址
                // animate     : true,											//是否动画显示
            });


        });

        // 页面销毁销毁内存
        $scope.$on('$ionicView.unloaded', function () {
            $rootScope[$state.current.name] = {};
        })

        $scope.$on("clearCache", function () {
            $rootScope[$state.current.name] = {};
        })


    }

    ctrl.$inject = ['$scope', '$rootScope', 'categoryService', 'POP', '$state', '$ionicScrollDelegate'];
    app.registerController('categoryController', ctrl);


});