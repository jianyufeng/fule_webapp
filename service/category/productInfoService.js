/**
 * Created by Administrator on 2017/3/25.
 */

define(['app'], function (app) {

    app.factory("productInfoService", function () {

        var service = {};

        // 获取产品详情
        service.getProductInfo = function ($scope) {
            $.initAppStartLoad();
            HTTP.get(API.Category.productInfo + "/goods_id/57", {}, function (e, data) {

                if (e) {
                    $.loadError(function () {
                        service.getProductInfo();
                    });
                    return;
                }
                $scope.$apply(function () {
                    var goodsInfo = data.goodsInfo.data.shift();
                    console.log(goodsInfo.goods_name);
                    // 商品名
                    $scope.productName = goodsInfo.goods_name;
                    // 商品编号
                    $scope.productNum = goodsInfo.goods_sn;
                    // 品牌名
                    $scope.productBrand = goodsInfo.brand_name;
                    // 免运费的等级
                    $scope.freight = data.freight;
                    //商品价格
                    var pri = goodsInfo.shop_price;
                    var index = pri.indexOf(".");
                    $scope.productPrice_I = pri.substr(0, index);
                    $scope.productPrice_F = pri.substr(index, pri.length);


                    $.initAppEndLoad();
                });

                console.log(data);

            })

        }

        service.setImageMargin=function($scope){
            var _w = parseInt($(window).width());//获取浏览器的宽度
            $(".productImg img").each(function(i){
                var img = $(this);
                var realWidth;//真实的宽度
                var realHeight;//真实的高度
                //这里做下说明，$("<img/>")这里是创建一个临时的img标签，类似js创建一个new Image()对象！
                $("<img/>").attr("src", $(img).attr("src")).load(function() {
                    /*
                     如果要获取图片的真实的宽度和高度有三点必须注意
                     1、需要创建一个image对象：如这里的$("<img/>")
                     2、指定图片的src路径
                     3、一定要在图片加载完成后执行如.load()函数里执行
                     */
                    realWidth = this.width;
                    realHeight = this.height;
                    console.log("图片的高度");
                    //如果真实的宽度大于浏览器的宽度就按照100%显示
                    if(realWidth>=_w){
                        $(img).css("width","100%").css("height","auto");
                    }
                    else{//如果小于浏览器的宽度按照原尺寸显示
                        $(img).css("width",realWidth+'px').css("height",realHeight+'px');
                    }
                });
            });

        }

        return service;
    });


});
