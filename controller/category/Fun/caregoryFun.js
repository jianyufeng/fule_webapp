/**
 * Created by ShareLock on 2017/3/23.
 * 加入购物车的特效
 */

define(['app', 'jquery_fly'], function (app) {
    var caregoryFun = {}
    caregoryFun.addCartFlay = function ($scope, $rootScope, $state, POP) {
        $(document).on("click", ".product_item", function () {
            var ab = $(this).children(".backgroudBox");
            var a = ab.is(':visible');
            if (a) {
                return false;
            }
            var goodsId = $(this).attr('name');
            $state.go("tab.productInfo", {"goodsId": goodsId});
            return false;
        });

        $(document).on("click", ".cartTagBox", function () {

            console.log("abcabc");
            var offset = $(".tab-item:eq(3)").offset();
            var addcar = $(this).parent().parent();
            var img = addcar.find('.goodsImg').find('img').attr('src');
            var flyer = $('<img class="u-flyer" src="' + img + '">');
            var productPrice = $(this).parent().children(".product_price").text().substring(1);
            var productName = $(this).parent().children(".product_item_bottom").children(".product_name").text();
            var productId = $(this).children(".cartTag2").attr("id");

            //(* 必须)user_name     String用户帐号
            //(* 必须)user_id       Number用户ID
            //(* 必须)goods_id      Number商品ID
            //(* 必须)goods_name    String商品名称
            //(* 必须)goods_number  Number商品数量
            //(* 必须)goods_price   Number商品价格
            if (User.isLogin()) {
                var userInfo = User.getInfo();
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
