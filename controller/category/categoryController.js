
define(['app',"./Fun/caregoryFun"], function (app, caregoryFun) {

    function ctrl($scope,$rootScope, categoryService,POP,$state) {

        //$rootScope =[];
        console.log($state)
        $rootScope[$state.current.name]={};

        console.log("分类界面控制器...");
    ;
        $scope.$on('$ionicView.loaded', function () {
            // 初始化页面数据
            categoryService.getCategoryListAndCategoryGoodsList($scope);
        });

        // 页面销毁销毁内存
        $scope.$on('$onicView.unloaded',function(){
            $rootScope[$state.current.name]={};
        })

        $scope.$on("clearCache",function(){
            $rootScope[$state.current.name]= {};
        })
        //更换产品列表
        $scope.changCategoryList=function(categoryId,categoryName){
            categoryService.getCategoryGoodsList($scope,categoryId,POP,$rootScope[$state.current.name],categoryName);

        };
        // 下拉刷新
        $scope.doRefresh = function(){
            categoryService.Refresh($scope);
        }
        // 跳转下一页
        //$scope.startNextPage=function(goodsId){
        //    categoryService.goNextPage($scope,$state,goodsId);
        //}
        // 加入购物车
        caregoryFun.addCartFlay($scope,$rootScope,$state);

    }

    ctrl.$inject = ['$scope','$rootScope', 'categoryService','POP','$state'];
    app.registerController('categoryController', ctrl);


});