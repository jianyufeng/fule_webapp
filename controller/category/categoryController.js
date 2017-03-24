define(['app'], function (app) {

    function ctrl($scope, categoryService) {

        console.log("分类界面控制器...");

        //console.log(categoryService);
        $scope.$on('$ionicView.loaded', function () {
            categoryService.getCategoryListAndCategoryGoodsList($scope);
        });

        $scope.changCategoryList=function(categoryId){
            categoryService.getCategoryGoodsList($scope,categoryId);
        };
    }

    ctrl.$inject = ['$scope', 'categoryService'];
    app.registerController('categoryController', ctrl);


});