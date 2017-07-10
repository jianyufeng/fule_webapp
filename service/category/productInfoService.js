/**
 * Created by Administrator on 2017/3/25.
 */

define(['app'], function (app) {

    app.factory("productInfoService", function () {

        var service = {};
        var goodsId;
        var pri;
        var Npri;
        var selectArray = [];
        var ArrayPri = [];
        var goodsAttrIdArray = [];
        service.MYreset = function () {
            console.log("清空数据");
            pri = 0;
            Npri = 0;
            selectArray = [];
            ArrayPri = [];
            goodsAttrIdArray = [];

        }
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
                    // fix by ShareLock_Li
                    // 商品属性
                    attr = data.goodsAttr;
                    var attrNameArray = []; //同种类型的 不同表现
                    newArray = []
                    if (attr.length > 0) {
                        for (var i = 0; i < attr.length; i++) {
                            //如果是默认属性 则给goodsAttrId 直接拼接上 goods_attr_id
                            if (i == attr.length - 1) {
                                if ($.inArray(attr[i].attr_name, attrNameArray) == -1) {
                                    attrNameArray.push(attr[i].attr_name);
                                    break;
                                }
                                break;
                            }
                            if (attr[i].attr_name != attr[i + 1].attr_name) {
                                attrNameArray.push(attr[i].attr_name);
                            }
                        }
                        for (var j = 0; j < attrNameArray.length; j++) {
                            var mArray = [];
                            for (var a = 0; a < attr.length; a++) {
                                var obj = attr[a];
                                if (attr[a].attr_name == attrNameArray[j]) {
                                    mArray.push(obj);
                                }
                            }
                            newArray.push(mArray);
                        }
                    }


                    $scope.attrs = newArray;
                    console.log(newArray);
                    console.log(newArray.length);
                    for (var a = 0; a < newArray.length; a++) {
                        var itemPri = 0;
                        if ((newArray[a][0].attr_type) == 0) {
                            selectArray.push(true);
                            itemPri = 0;
                        } else {
                            selectArray.push(false);
                            //goodsAttrIdArray.push(0);
                        }
                        ArrayPri.push(itemPri);
                    }
                    console.log(goodsAttrIdArray)
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
                console.log("显示商品价格");
                var cartPri = 0;
                var arg = {};
                if (attr.length > 0) {
                    for (var b = 0; b < selectArray.length; b++) {
                        console.log(12);
                        console.log(selectArray[b]);
                        if (selectArray[b] === false) {
                            POP.Hint("请完整选择商品属性！");
                            return;
                        }
                    }
                    cartPri = Npri;
                    // 字符串连接
                    var goods_attrs = goodsAttrIdArray.join("_");
                    var index = goods_attrs.indexOf("_");
                    if (index == 0) {
                        goods_attrs = goods_attrs.substr(index + 1, goods_attrs.length);
                    }
                    arg = {
                        "user_name": userInfo.user_name,
                        "user_id": userInfo.user_id,
                        "goods_id": goodsId,
                        "goods_name": goodsName,
                        "goods_number": goodsNumber,
                        "goods_attrs": goods_attrs,
                        "goods_price": cartPri * goodsNumber
                    };
                } else {
                    cartPri = pri;
                    arg = {
                        "user_name": userInfo.user_name,
                        "user_id": userInfo.user_id,
                        "goods_id": goodsId,
                        "goods_name": goodsName,
                        "goods_number": goodsNumber,
                        "goods_price": cartPri * goodsNumber
                    };
                }
                //var str = JSON.stringify(arg);
                //console.log(str);
                HTTP.post(API.Cart.cartAdd, arg, function (e, data) {
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
         *  点击选择属性
         * @param $scope
         * @param type
         * @param price
         * @param index
         */
        service.selectAttr = function ($scope, type, price, goodsAttrId, outerIndex, index) {
            if (type == 0) {

                return;
            }
            // 改变样式
            //找到所有样式为这
            var s = "attrValue-" + type;
            $("." + s).removeClass("attrValue_select");
            $("." + s).eq(index).addClass("attrValue_select");
            pri = Number(pri);
            price = Number(price);
            selectArray[outerIndex] = true;
            ArrayPri[outerIndex] = price;
            goodsAttrIdArray[outerIndex] = goodsAttrId;
            var selectPri = 0;
            for (var p = 0; p < selectArray.length; p++) {
                //判断选中的
                if (selectArray[p] === true) {
                    selectPri += ArrayPri[p];
                }
            }

            Npri = selectPri + pri;
            var SPri;
            SPri = Npri + "";
            //console.log(SPri);
            var index = SPri.indexOf(".");
            //console.log(index);
            if (index < 0) {
                SPri = SPri + ".00";
            }
            var index = SPri.indexOf(".");
            $scope.productPrice_I = SPri.substr(0, index);
            $scope.productPrice_F = SPri.substr(index, SPri.length);
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
