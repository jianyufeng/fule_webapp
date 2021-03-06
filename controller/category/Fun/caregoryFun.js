/**
 * Created by ShareLock on 2017/3/23.
 * 加入购物车的特效
 */

define(['app', 'jquery_fly'], function (app) {
    var caregoryFun = {}
    caregoryFun.addCartFlay = function ($scope, $rootScope, $state, POP) {
        $(document).off("click").on("click", ".product_item", function () {
            var ab = $(this).children(".backgroudBox");
            var a = ab.is(':visible');
            if (a) {
                return false;
            }
            var goodsId = $(this).attr('name');
            $state.go("tab.productInfo", {"goodsId": goodsId});

            $(document).off("click", ".goodsCart");
            return false;
        });

        $(document).on("click", ".goodsCart", function () {
            var offset = $(".tab-item:eq(3)").offset();
            var addcar = $(this).parent().parent().prev();
            var img = addcar.find('img').attr('src');
            var flyer = $('<img class="u-flyer" src="' + img + '">');
            var productPrice = $(this).parent().parent().children(".goodsMoney").text().substring(2);
            var productName = $(this).parent().children(".goodsDesc").text();
            var productId = $(this).children("img").attr("id");

            //(* 必须)user_name     String用户帐号
            //(* 必须)user_id       Number用户ID
            //(* 必须)goods_id      Number商品ID
            //(* 必须)goods_name    String商品名称
            //(* 必须)goods_number  Number商品数量
            //(* 必须)goods_price   Number商品价格
            console.log("加入购物车");
            if (User.isLogin()) {
                var userInfo = User.getInfo();

                //"user_name": userInfo.user_name,
                //    "user_id": userInfo.user_id,
                //    "goods_id": goodsId,
                //    "goods_name": goodsName,
                //    "goods_number": goodsNumber,
                //    "goods_price": pri * goodsNumber
                //console.log("user_name=",userInfo.user_name);
                //console.log("user_id=",userInfo.user_id);
                //console.log("goods_id=",productId);
                //console.log("goods_name=",productName);
                //console.log("goods_number=",1);
                //console.log("goods_price",productPrice);
                HTTP.post(API.Cart.cartAdd, {
                    "user_name": userInfo.user_name,
                    "user_id": userInfo.user_id,
                    "goods_id": productId,
                    "goods_name": productName,
                    "goods_number": 1,
                    "goods_price": productPrice,
                }, function (e, data) {
                    if (e) {
                        return;
                    }
                    console.log(data);
                });
                flyer.fly({
                    start: {
                        left: event.pageX, //开始位置（必填）#fly元素会被设置成position: fixed
                        top: event.pageY //开始位置（必填）

                    },

                    end: {
                        left: offset.left + 10, //结束位置（必填）
                        top: offset.top + 20, //结束位置（必填）
                        width: 0, //结束时宽度
                        height: 0 //结束时高度
                    },
                    onEnd: function () { //结束回调
                        $scope.$apply(function () {
                            $rootScope.cartBadge++;
                        })
                    }
                });

            } else {
                POP.Confirm("您未登录，点击确定进入登录页面！", function () {
                    location.href = "./login/login.html";
                })
            }
            return false;
        });

    }


    return caregoryFun;

})
