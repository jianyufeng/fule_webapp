//define(function(){
define(['app', 'jquery_fly'], function (app) {
    var goodsFun = {};

    goodsFun.menuSelected = function ($ionicScrollDelegate) {

        $(".goodsMenuItem").click(function () {
            $ionicScrollDelegate.scrollTop(true);
            var _index = $(".goodsMenuItem").index(this);
            $(".goodsMenuItem").removeClass("selected");
            $(".goodsMenuItem").eq(_index).addClass("selected");
        });
    };


    goodsFun.addCart = function ($scope, $rootScope, $state, POP) {

        $(document).on("click", ".goodsItem", function () {
            var goodsId = $(this).attr('name');
            var goodsNumber = $(this).attr('number');

            if (goodsNumber > 0) {
                $state.go("tab.goodsDetail", {"goodsId": goodsId});
            }
        });

        $(document).off("click", ".goodsCart").on("click", ".goodsCart", function () {


            var offset = $(".tab-item:eq(3)").offset();
            var addcar = $(this).parent().parent().prev();
            var img = addcar.find('img').attr('src');
            var flyer = $('<img class="u-flyer" src="' + img + '">');
            var goodsPrice = $(this).parent().parent().children(".goodsMoney").text().substring(2);
            var goodsName = $(this).parent().children(".goodsDesc").text();
            var goodsId = $(this).find('img').attr('id');

            if (User.isLogin()) {
                var userInfo = User.getInfo();

                HTTP.post(API.Cart.cartAdd, {
                    "user_name": userInfo.user_name,
                    "user_id": userInfo.user_id,
                    "goods_id": goodsId,
                    "goods_name": goodsName,
                    "goods_number": 1,
                    "goods_price": goodsPrice,

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
    return goodsFun;
});