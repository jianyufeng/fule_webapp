define(['app'],function(app){

    app.factory("categoryService",function(){

         var service = {};

        //  获取头部的分类列表和默认分类货物
         service.getCategoryListAndCategoryGoodsList = function($scope){

             $.initAppStartLoad();

             HTTP.get(API.Category.category + "/category_id/35",{},function(e,data){

                 if(e){
                     $.loadError(function(){
                         service.getCategoryListAndCategoryGoodsList();
                     });
                     return;
                 }

                 $scope.$apply(function(){
                     $scope.categorys = data.categoryInfo;
                     $scope.productArray=data.goodsInfo.data;
                        console.log($scope.productArray);
                     $.initAppEndLoad();
                 });

                 console.log(data);



             });


         };

        // 点击按钮后实现分类货物的切换
        service.getCategoryGoodsList=function($scope,categoryId,POP){
            POP.StartLoading();
            HTTP.get(API.Category.category + "/category_id/"+categoryId,{},function(e,data){


                POP.EndLoading();
                if(e){
                    $.loadError(function(){
                        service.getCategoryGoodsList();
                    });
                    return;
                }

                $scope.$apply(function(){
                    $scope.productArray=data.goodsInfo.data;

                    console.log($scope.productArray);
                });

                console.log(data);

            });

        }

         return service;

    });


});