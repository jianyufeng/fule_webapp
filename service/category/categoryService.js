define(['app'],function(app){

    app.factory("categoryService",function(){

         var service = {};

         service.getCategoryGoodsInfo = function($scope){

             $.initAppStartLoad();

             HTTP.get(API.Category.category + "/category_id/35",{},function(e,data){

                 if(e){
                     $.loadError(function(){
                         service.getCategoryGoodsInfo();
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


         return service;

    });


});