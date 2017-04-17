define(['app'], function (app) {

    app.factory("myBuyHappyHomeServer", function () {

        var service = {};

        /*喜乐之家商品列表 信息*/
        service.getBuyGoodList = function ($scope, POP) {
            POP.StartLoading();
            //获取用户的账号
            HTTP.get(API.My.buyGoodsList, {}, function (e, data) {
                    POP.EndLoading();
                    if (e) {
                        POP.Hint("加载失败");
                        return;
                    }
                    first = false;
                    console.log(data);
                    $scope.$apply(function () {
                        $scope.goods = data.goodsInfo.data;
                    })
                }
            );
        };


        /*网络获取商品列表的属性列表 信息*/
        service.getBuyGoodMoreAttr = function ($scope, POP, goodId,index,$ionicScrollDelegate) {
            POP.StartLoading();
            //获取用户的账号
            HTTP.get(API.My.buyGoodsMoreAttr + "/goods_id/" + goodId, {}, function (e, data) {
                    POP.EndLoading();
                    if (e) {
                        POP.Hint("加载失败");
                        return;
                    }
                    console.log(data);
                    $scope.$apply(function () {
                        $scope.attrGoods = data;
                        $('#'+"more_goodsBox_" + index).slideDown(300,function(){
                                    var scroller = $ionicScrollDelegate.$getByHandle('bhh_scroll');
                                    var scrollPosition = scroller.getScrollPosition();
                                    var currentScroll = scrollPosition.top;
                                    scroller.scrollTo(0,currentScroll+60,true);
                        });
                    })
                }
            );
        };
        return service;


    })
    ;


})
;