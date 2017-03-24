define(['app'],function(app){

    app.factory("goodsService",function(){

         var service = {};
        
//获取商品列表
        service.getGoodList = function($scope){
            $.initAppStartLoad();

            HTTP.get(API.Goods.goods,{},function(e,data){

                if(e){
                    $.loadError(function(){
                        service.getGoodList();
                    });
                    return;
                }
                $scope.$apply(function () {
                $scope.goodsArray=data.data;
                    $.initAppEndLoad();
                });

                console.log(data);

            });


        };


         

         return service;

    });


});