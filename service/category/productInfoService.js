/**
 * Created by Administrator on 2017/3/25.
 */

define(['app'], function (app) {

    app.factory("productInfoService", function () {

        var service = {};
        var goodsId;
        var pri;
        // 获取产品详情
        service.getProductInfo = function ($scope, $stateParams, POP, $compile) {
            POP.StartLoading();
            HTTP.get(API.Category.productInfo + "/goods_id/" + $stateParams.goodsId, {}, function (e, data) {
                POP.EndLoading();

                if (e) {
                    console.log(e);
                    $.loadError(function () {
                        service.getProductInfo();
                    });
                    return;
                }
                $scope.$apply(function () {
                    var goodsInfo = data.goodsInfo.data.shift();
                    // 商品的轮播图
                    $scope.goodsImgss = data.goodsImgs;
                    if ($scope.goodsImgss.length > 0) {
                        $scope.showImg = true;
                        $("#noImg").hide();
                    } else {
                        $scope.showImg = false;
                        $("#noImg").show();
                    }
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
                    // 商品的详情图
                    var str = data.goodsDetail[0].detail_text;
                    if (str != null && str.length > 0) {
                        //正则替换
                        str = str.replace(/Image_Image/g, "image.38zs.net:38888");
                        $("#goodsDetailBox").append(str);
                        $scope.goodsDetailImg = false;
                        console.log($scope.goodsDetailImg);
                    }
                    // 商品购买的最大数量
                    if (goodsInfo.limit_num > 0) {
                        $scope.limitGoodsNumber = goodsInfo.limit_num;
                    } else {
                        $scope.limitGoodsNumber = "无限制";
                    }
                    if (goodsInfo.min_order_num != undefined && goodsInfo.min_order_num != null) {
                        $scope.minGoodsNumber = goodsInfo.min_order_num;
                    } else {
                        $scope.minGoodsNumber = "无限制";
                    }
                });


            })

        }
        /**
         * 滑动图片切换导航
         * @param $scope
         * @constructor
         */
        service.Slide = function (index) {
            // 获取所有 instructions 的子元素
            var ch = $(".instructions").children().children();
            ch.attr('src', './resource/images/icon/point_gray.png');
            ch.eq(index).attr('src', './resource/images/icon/point_hover.png');
            //service.setImageMargin();
        }

        /**
         * 点击加号或者减号
         * @param $scope
         */
        service.addAndReduce = function ($scope) {

            $scope.reduce = function () {

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
                var goodsNumber = Number.parseInt($("#_number").val());
                $scope.count = goodsNumber;

                if (pri * goodsNumber > 1000000) {
                    POP.Hint("商品数量不合法");
                    return;
                }
                // 判断最低购买量和最大购买量
                if ($scope.count > $scope.limitGoodsNumber) {
                    POP.Hint("本商品的最大限制购买量为" + "&nbsp" + "<span style='color: red'>" + $scope.limitGoodsNumber + "</span>");
                    return;
                }
                if ($scope.count < $scope.minGoodsNumber) {
                    POP.Hint("本商品的最低购买量为" + "&nbsp" + "<span style='color: red'>" + $scope.minGoodsNumber + "</span>");
                    return;
                }
                if ($scope.count < 1) {
                    POP.Hint("最少添加一个商品！");
                    return;
                }

                //console.log("user_name=", userInfo.user_name);
                //console.log("user_id=", userInfo.user_id);
                //console.log("goods_id=", goodsId);
                //console.log("goods_name=", goodsName);
                //console.log("goods_number=", 1);
                //console.log("goods_price", pri * goodsNumber);
                HTTP.post(API.Cart.cartAdd, {
                    "user_name": userInfo.user_name,
                    "user_id": userInfo.user_id,
                    "goods_id": goodsId,
                    "goods_name": goodsName,
                    "goods_number": goodsNumber,
                    "goods_price": pri * goodsNumber
                }, function (e, data) {
                    if (e) {
                        POP.Hint("添加失败");
                        return;
                    }
                    $scope.$apply(function () {
                        $scope.cartCount += $scope.count;
                    });

                    POP.Hint("添加成功");
                })

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
        service.getCartInfo = function ($scope, POP) {
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
                $(".cartNumber").css('display', 'none');
            }
        }


        /**
         * 点击购物车跳转页面
         * @param $scope
         */
        service.startPage = function ($scope, $state, $ionicTabsDelegate) {
            $state.go("tab.newCart");
            $ionicTabsDelegate.select(3);
        }
        return service;
    });

});
