/**
 * Created by Administrator on 2017/3/25.
 */

define(['app'], function (app) {

    app.factory("productInfoService", function () {

        var service = {};
        var goodsId;
        var pri;
        // 获取产品详情
        service.getProductInfo = function ($scope, $stateParams, POP) {
            POP.StartLoading();
            HTTP.get(API.Category.productInfo + "/goods_id/" + $stateParams.goodsId, {}, function (e, data) {
                POP.EndLoading();
                if (e) {
                    $.loadError(function () {
                        service.getProductInfo();
                    });
                    return;
                }
                $scope.$apply(function () {
                    var goodsInfo = data.goodsInfo.data.shift();
                    // 商品名
                    $scope.productName = goodsInfo.goods_name;
                    // 商品编号
                    $scope.productNum = goodsInfo.goods_sn;
                    // 品牌名
                    $scope.productBrand = goodsInfo.brand_name;
                    goodsId = goodsInfo.goods_id;
                    // 免运费的等级
                    $scope.freight = data.freight;

                    //商品价格
                    pri = goodsInfo.shop_price;
                    var index = pri.indexOf(".");
                    $scope.productPrice_I = pri.substr(0, index);
                    $scope.productPrice_F = pri.substr(index, pri.length);

                });


            })

        }

        service.setImageMargin = function () {
            $(function () {
                var maxWidth = $(".productImgBox").width();
                var maxHeight = $(".productImgBox").height();
                var imgSrc = $(".productImg img").attr("src");
                getImageWidth(imgSrc, function (w, h) {

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

            /***
             * 获取图片的真实宽高
             * @param url
             * @param callback
             */
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
         * 滑动图片切换导航
         * @param $scope
         * @constructor
         */
        service.Slide = function ($scope) {
            $scope.onSlideChanged = function (index) {
                $scope.index = index;
                // 获取所有 instructions 的子元素
                var ch = $(".instructions").children();
                for (var i = 0; i < ch.length; i++) {
                    if (index == i) {
                        ch.eq(i).attr("src", './resource/images/icon/point_hover.png')
                    } else {
                        ch.eq(i).attr("src", './resource/images/icon/point_gray.png')
                    }
                }
            }

        }

        /**
         * 点击加号或者减号
         * @param $scope
         */
        service.addAndReduce = function ($scope) {
            // 减号
            $scope.reduce = function () {
                if ($scope.count <= 1) {
                    $scope.count = 1;
                } else {
                    $scope.count--;
                }
            }
            // 加号
            $scope.add = function () {
                if ($scope.count >= 99) {
                    $scope.count = 99;
                } else {
                    $scope.count++;
                }
            }

        }
        /**
         *加入购物车
         * @param $scope
         */
        service.addCartAction = function ($scope, POP) {
            //alert("加入购物车");
            if (User.isLogin()) {
                var userInfo = User.getInfo();
                var goodsName = $scope.productName;
                var goodsNumber = $scope.count;
                $scope.addCartAction = function () {
                    POP.StartLoading();
                    HTTP.post(API.Cart.cartAdd, {
                        "user_name": userInfo.user_name,
                        "user_id": userInfo.user_id,
                        "goods_id": goodsId,
                        "goods_name": goodsName,
                        "goods_number": goodsNumber,
                        "goods_price": pri
                    }, function (e, data) {
                        POP.EndLoading();
                        if (e) {
                            $.loadError(function () {
                                service.addCartAction();
                            });
                            return;
                        }
                        $scope.$apply(function () {
                            $scope.cartCount += $scope.count;
                        });
                    })
                }
            } else {

                POP.Confirm("您未登录，点击确定进入登录页面！", function () {
                    location.href = "./login/login.html";
                })
            }

        }
        /**
         *  获取购物车数量
         * @param $scope
         */
        service.getCartInfo = function ($scope) {
            if (User.isLogin()) {
                var userId = User.getInfo().user_id;
                HTTP.get(API.Category.getCartNum + "/user_id/" + userId + "/shopping_type/1", {}, function (e, data) {
                    if (e) {
                        $.loadError(function () {
                            service.getCartInfo();
                        });
                        return;
                    }

                    $scope.$apply(function () {
                        $scope.cartCount = data;
                    });

                })

            } else {
                POP.Confirm("您未登录，点击确定进入登录页面！", function () {
                    location.href = "./login/login.html";
                })

            }


        }


        /**
         * 点击购物车跳转页面
         * @param $scope
         */
        service.startPage = function ($scope, $state) {
            // 减号
            $scope.startPage = function () {
                $state.go("tab.cart");
            }

        }
        return service;
    });


});
