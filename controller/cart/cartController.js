define(['app', "./Fun/cart_fun", 'animate'], function (app, cart_fun) {

    function ctrl($rootScope, $scope, cartService, POP, $state) {
        $(".mytab").find(".tab-title").css("color", "#000000");
        $(".myCartIcon").find(".tab-title").css("color", "#D9A8CD");
        $scope.blurAction = function () {
            $(".changeBtn input").blur();
        }


        //获取数量手动输入是去焦点
        $(document).on("blur", ".changeBtn", function () {

            var _this = $(this);

            _this.css('border', '1px solid #cccccc');


        });
        //手动输入商品数量获取焦点
        $(document).on("focus", ".changeBtn", function () {

            var _this = $(this);

            _this.css('border', '2px solid #d98bbc');

        });


        $scope.$on("viewOnFinish", function () {
            $(".cartGoodsImage img").myImageLazyLoad({
                //默认三个参数可不传，使用默认参数
                // imageLoadErr : "./resource/images/default/default_image.png", //加载失败占位图
                // imageServer : "http://image.38zs.net:848",				    //图片服务器地址
                // animate     : true,											//是否动画显示
            });

        });

        $scope.$on('$ionicView.beforeEnter', function () {


            //判断是否登录
            if (User.isLogin()) {
                $(".noCartGoodBox").hide();
                //加载数据
                cartService.getCartGoods($scope, POP, false);
                var userId = User.getInfo().user_id;
                HTTP.get(API.Category.getCartNum + "/user_id/" + userId + "/shopping_type/1", {}, function (e, data) {

                    if (e) {
                        $rootScope.cartBadge = 0;
                        return;
                    }
                    data = data == undefined ? 0 : data;
                    $scope.$apply(function () {
                        $rootScope.cartBadge = data;
                    });
                })

            } else {
                $(".noCartGoodBox").show();
                return;
            }


        });


        //初始化
        var editOpen = false;

        //结算按钮点击时
        $(document).off("click").on("click", ".cartAccountBox", function () {

            POP.Confirm("您确认要购买已选产品?", function () {
                $state.go("tab.cart_orderConfirm");
            });

        });

        //购物车商品选择按钮
        cart_fun.cartGoodsSelectBtn(function (_idx) {
            console.log(_idx);
        });

        //全选按钮选择时
        cart_fun.allGoodsSelectBtn(function (isAll) {
            console.log(isAll);
        });

        //递增按钮
        cart_fun.addCartGoodsBtn(POP, function (countMoney, nowNum, gid, cartId, goodsNumber, limitNumber) {


            var info = User.getInfo();
            var updateParams = {
                user_id: info.user_id,
                shopping_type: 1,
                id: cartId,
                goods_number: nowNum,
                goods_price: countMoney,
                goods_id: gid
            };


            cartService.updateCart($scope, updateParams, POP, $rootScope);


        });


        //递减按钮
        cart_fun.reduceCartGoodsBtn(POP, function (countMoney, nowNum, gid, cartId, goodsNumber, limitNumber) {

            var info = User.getInfo();
            var updateParams = {
                user_id: info.user_id,
                shopping_type: 1,
                id: cartId,
                goods_number: nowNum,
                goods_price: countMoney,
                goods_id: gid
            };

            cartService.updateCart($scope, updateParams, POP, $rootScope);

        });

        //输入框改变时
        cart_fun.changeCartGoodsBtn(POP, function (countMoney, nowNum, gid, cartId) {

            var info = User.getInfo();
            var updateParams = {
                user_id: info.user_id,
                shopping_type: 1,
                id: cartId,
                goods_number: nowNum,
                goods_price: countMoney,
                goods_id: gid
            };

            cartService.updateCart($scope, updateParams, POP, $rootScope);


        });


        //编辑购物车
        var editOpen = false;
        $scope.editCart = function () {

            if (editOpen) {
                $scope.righttitleValue = "编辑";
                cart_fun.cartSideslipping(false);
                $(".cartShade").hide();
                editOpen = false;
            } else {
                $scope.righttitleValue = "关闭";
                cart_fun.cartSideslipping(true);
                $(".cartShade").show();
                editOpen = true;


            }

        };

        //点击删除
        cart_fun.deleteCartBtn(function (_idx, _id) {

            POP.Confirm("您是否放弃购买当前产品?", function () {

                var info = User.getInfo();
                var deleteParams = {
                    user_id: info.user_id,
                    shopping_type: 1,
                    id: _id
                };

                //删除购物车
                cartService.deleteCartGood($scope, deleteParams, POP, _idx, $rootScope);

            });


        });


        //进入商品详情
        $(document).off("click", ".turnProduct").on("click", ".turnProduct", function (event) {
            if (!editOpen) {
                var goodsId = $(this).attr("data-id");
                $state.go("tab.goProductInfo", {"goodsId": goodsId});
            }
        });

        $scope.goHome = function () {
            $state.go('tab.home');
        }

        //左滑动出现删除
        $scope.swipLeft = function (idx, id) {
            cart_fun.cartIdxSideslipping(true, idx);
        };

        //右滑动还原
        $scope.swipRight = function (idx, id) {
            cart_fun.cartIdxSideslipping(false, idx);
        };

    }


    ctrl.$inject = ['$rootScope', '$scope', 'cartService', 'POP', '$state'];
    app.registerController('cartController', ctrl);


});