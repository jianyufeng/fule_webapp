define(['app', "./Fun/caregoryFun"], function (app, caregoryFun) {

    function ctrl($scope, $rootScope, categoryService, POP, $state) {

        $rootScope[$state.current.name] = {};
        console.log("分类界面控制器...");
        $scope.$on('$ionicView.loaded', function () {
            // 初始化页面数据
            categoryService.getCategoryListAndCategoryGoodsList($scope, POP);

            //更换产品列表
            $scope.changCategoryList = function (categoryId, categoryName) {
                categoryService.getCategoryGoodsList($scope, categoryId, POP, $rootScope[$state.current.name], categoryName);
            };
            // 下拉刷新
            $scope.doRefresh = function () {
                categoryService.Refresh($scope);
            }
            // 加入购物车
            caregoryFun.addCartFlay($scope, $rootScope, $state, POP);

        });

        $scope.$on("viewOnFinish", function () {

			$(".goodsImg img").myImageLazyLoad({
				//默认三个参数可不传，使用默认参数
				// imageLoadErr : "./resource/images/default/default_image.png", //加载失败占位图
				// imageServer : "http://image.38zs.net:848",				    //图片服务器地址
				// animate     : true,											//是否动画显示
			});
         
        });

        // 页面销毁销毁内存
        $scope.$on('$onicView.unloaded', function () {
            $rootScope[$state.current.name] = {};
        })

        $scope.$on("clearCache", function () {
            $rootScope[$state.current.name] = {};
        })

    }

    ctrl.$inject = ['$scope', '$rootScope', 'categoryService', 'POP', '$state'];
    app.registerController('categoryController', ctrl);


});