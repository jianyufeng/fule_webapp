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

        service.setImageMargin = function () {
            $(function () {
                var maxWidth = $(".productImgBox").width();
                var maxHeight = $(".productImgBox").height();
                var imgSrc = $(".productImg img").attr("src");
                getImageWidth(imgSrc, function (w, h) {
                    console.log(maxWidth)
                    console.log(maxHeight)
                    console.log(w)
                    console.log(h)

                    if (w < maxWidth) {
                        var mar = (maxWidth - w) / 2;
                        $(".productImg img").css({
                            "margin-left": mar + "px",
                            "margin-right": mar + "px"
                        });
                    }
                    if (h < maxHeight) {
                        var mar = (maxHeight - h) / 2;
                        $(".productImg img").css({
                            "margin-top": mar + "px",
                            "margin-buttom": mar + "px"
                        });
                    }


                });
            });

            function getImageWidth(url, callback) {
                var img = new Image();
                img.src = url;

                // 如果图片被缓存，则直接返回缓存数据
                if (img.complete) {
                    callback(img.width, img.height);
                } else {
                    // 完全加载完毕的事件
                    img.onload = function () {
                        callback(img.width, img.height);
                    }
                }

            }

        }

        /**
         *加入购物车
         * @param $scope
         */
        service.addCartAction = function ($scope) {
            alert("加入购物车");
        }
        /**
         *  获取购物车信息
         * @param $scope
         */
        service.getCartInfo = function ($scope) {
            alert("获取购物车信息");
        }


        return service;
    });


});
