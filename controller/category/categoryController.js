define(['app'], function (app) {

    function ctrl($scope, categoryService,POP) {

        console.log("分类界面控制器...");


        //console.log(categoryService);
        $scope.$on('$ionicView.loaded', function () {
            categoryService.getCategoryListAndCategoryGoodsList($scope);
        });

        //更换产品列表
        $scope.changCategoryList=function(categoryId){
            categoryService.getCategoryGoodsList($scope,categoryId,POP);
        };
    }

    ctrl.$inject = ['$scope', 'categoryService','POP'];
    app.registerController('categoryController', ctrl);


});