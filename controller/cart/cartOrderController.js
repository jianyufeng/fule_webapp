/**
 * Created by charles_xsx on 2017/3/27.
 */

define(['app', 'css!../../../css/cart/cart_orderConfirm'], function (app) {

    function ctrl($rootScope, $scope, cartOrderService, POP, $state) {

        //修改显示地址刷新后用来判断要显示的地址
        $scope.jugdeAddress = "";

        $scope.$on('$ionicView.loaded', function () {

            cartOrderService.getOrderInfo($scope, POP);
            // console.log("订单更新"+ $scope.cartGoods);
        });

        //每次进入页面
        $scope.$on('$ionicView.beforeEnter', function () {
            $(".popBg,.popBox").css("display", "none");

          cartOrderService.getPartOrderInfo($scope, POP);

        });




        // 接收传值页面传过来的地址内容
        $rootScope.$on('changeAddressInfo', function (event, args) {

            console.log("changeAddressInfo..");

            //将新的值重新注入页面
            //$scope.$apply(function () {
              
                $scope.address = args.address;
           // })

        });



        //修改的地址为当前显示的地址
        $rootScope.$on('modifyAddressUptate', function (event, args) {

            console.log("modifyAddressUptate..");

            $scope.jugdeAddress = args.addressId;
            //将新的值重新注入页面
           if($scope.address.address_id == args.addressId){

               cartOrderService.getOrderInfo($scope, POP);

           }

        });




        // 接收传值页面传过来的地址内容
        $rootScope.$on('deleteAddress', function (event, args) {

            if (args.address == "NO") {
                $scope.address = "NO";
            } else {

                if ($scope.address.address_id == args.address_id) {

                    cartOrderService.getOrderInfo($scope, POP);

                }


            }

        });

        //图片懒加载的方法
        $scope.$on("viewOnFinish", function () {

            $(".orderItemImg img").myImageLazyLoad({
                //默认三个参数可不传，使用默认参数
                // imageLoadErr : "./resource/images/default/default_image.png", //加载失败占位图
                // imageServer : "http://image.38zs.net:848",				    //图片服务器地址
                // animate     : true,											//是否动画显示
            });

        });
        //提交订单点击时
        $(".paySubmit").click(function () {

            //判断余额是否足够
            if ($scope.userInfo.user_money < $scope.orderInfo.pay_amount) {

                POP.Alert("抱歉,您的余额不足!");

                return;

            }


            //验证收货地址
            if ($scope.address == "NO") {

                POP.Alert("请设置收货地址!");

                return;

            }


            if ($scope.shippingName == "") { //$scope.deliveryFreight == undefined

                POP.Alert("请选择配送方式!");

                return;


            }
            POP.FormAlert("请输入您的支付密码", $scope, function (v) {

                var info = User.getInfo();

                var payParams = {

                    user_id: info.user_id,
                    password: v,
                    type: "THREE_PASSWORD"

                }
                //验证密码
                cartOrderService.verifyPayPassword($scope, payParams, POP, function () {

                    var deliveryFit = 0 ;
                    var delivery = $scope.deliveryFreight;
                    if(delivery == "" || delivery.indexOf("免运费")>0){

                        alert(delivery.indexOf("免运费"));
                        deliveryFit = 0;

                    }else {


                        deliveryFit = delivery.substr(1,delivery.length);
                    }



                    var orderParams = {
                        user_id: info.user_id, //用户id
                        user_money: $scope.userInfo.user_money, //用户余额
                        shipping_fee: deliveryFit, //运费
                        address_id: $scope.address.address_id, //收货地址id
                        shipping_id: $scope.shi_id, //物流公司id
                        shipping_name: $scope.expressName, //物流公司名
                        goods_amount: $scope.amountOrder, //商品总金额
                        surplus: $scope.orderInfo.pay_amount, //实际支付总金额
                        referer: "手机", //订单来源(本站/手机/APP)
                        order_mode: $scope.orderInfo.ORDER_TYPE, //订单类型（CE/CM）
                        pv: $scope.orderInfo.pv, //获得PV
                        isAccumulative: $scope.orderInfo.LEI_JI_TYPE, //是否累计PV 0-累计 1-不累计
                        shipping_config: $scope.webConfig.EXEMPT_FREIGHT.PARAM_VALUE, //运费配置（达到指定支付金额免除运费）
                        pay_id: 1, //余额支付
                        pay_name: "余额支付", //支付方式名
                        cart_id: $scope.cartGoods[0].cart_id, //购物车id
                        LEVEL_TO: $scope.orderInfo.LEVEL_TO, //自动升级目标级别
                        integral: $scope.orderInfo.integral, //累计积分
                        pay_fee: 0, //支付手续费
                        insure_fee: 0 //运费险
                    }


                    console.log(orderParams);


                    //提交订单
                    cartOrderService.addCommonPaymentOrder($scope, orderParams, POP, function () {

                        $scope.$apply(function () {
                            $rootScope.cartBadge = 0;
                        })

                        $state.go('tab.my');
                    });


                });


            });


        });


        //弹出订单的配送方式选择选择界面
        $(".orderDeliveryModel").click(function () {
            // $(".popBg").css({
            //
            //     height: $(document).height()
            // });

            $(".popBg").fadeIn(300);

            var $popBox = $(".popBox");

                $popBox.css({
                    display: "block"
                 });
            $popBox.animate({"bottom":0},300);


            $(".closeButton").click(function () {
               // $(".popBg").css("display", "none");
                $(".popBg").fadeOut(200);
                $popBox.animate({"bottom":-1000},200);
            });

            //在配送方式选择界面选择具体的配送方式
            $(document).on("click", ".deliveryBox", function () {
                var _index = $(".deliveryBox").index(this);
                var shipping_id = $(".deliveryChoice").eq(_index).attr("id");
                $scope.shi_id = $(".deliveryChoice").eq(_index).attr("id"); //当前快递公司id
                var cart_id = $scope.cartGoods[0].cart_id;
                var payment_amount = $scope.orderInfo.pay_amount;

                var freightParams = {

                    shipping_id: shipping_id,
                    cart_id: cart_id,
                    payment_amount: payment_amount

                }
;

                //计算运费

    cartOrderService.countFreightAction($scope, freightParams, POP, function (freight) {


        alert($scope.deliveryFreight);
var deliverymoney;
        $scope.$apply(function () {
            if(freightParams.shipping_id == "1" ||freightParams.shipping_id == "23") {

                deliverymoney = "";

            }else {

                deliverymoney = "¥" + freight;

            }

                $scope.shippingName = $(".deliveryContent").eq(_index).text() + deliverymoney; //物流公司名


    })
    });







                    //if (freight == "" || freight == null || freight == undefined) {
                    //    $scope.amountOrder = $scope.orderInfo.pay_amount
                    //}


                if ($(this).find("img").is(':visible')) {
                    $(this).find("img").show();
                } else {
                    $(".deliveryChoice").find("img").hide();
                    $(this).find("img").show();
                    $(".deliveryChoice").css("border", "1px solid #d79ac4");
                    $(this).children(".deliveryChoice").css("border", "0px");
                    $(".deliveryChoice").eq(_index).find("img").show();

                    var $deliveryPrice = $(".deliveryPrice");
                    $deliveryPrice.css({
                        visibility: "hidden"
                    });
                    var $deliveryPrice = $(".deliveryPrice").eq(_index);
                    $deliveryPrice.css({
                        visibility: "visible"
                    });
                }

            });


        });

        //弹出发货地址选择框(暂时不用)
        $(".orderSendGoodsAddress").click(function () {
            $(".popBg").css({
                display: "block", height: $(document).height()
            });
            var $popAddressBox = $(".popAddressBox");
            $popAddressBox.css({
                display: "block"
            });

            $(".close").click(function () {
                $(".popBg,.popAddressBox").css("display", "none");
            });
        });

        //弹出支付方式选择框
        $(".orderPayModel").click(function () {

            POP.Alert("抱歉,暂不支持其他支付方式");

            // $(".popPayModelBg").css({
            //     display: "block", height: $(document).height()
            // });
            // var $popBox = $(".popPayModelBox");
            // $popBox.css({
            //     display: "block"
            // }) ;
            // $(".closeButton").click(function () {
            //     $(".popPayModelBg,.popPayModelBox").css("display", "none");
            // });

        });
        //选择支付方式
        $(".confirmChoice").click(function () {
            if ($(this).find("img").is(':visible')) {
                $(this).find("img").hide();
                $(this).css("border", "1px solid #d79ac4");
            } else {
                $(this).find("img").show();
                $(this).css("border", "0px");
            }
        });



          //是否使用默认支付方式的选择
        $(".bottomChoice").click(function () {
            if ($(this).find("img").is(':visible')) {
                $(this).find("img").hide();
                $(this).css("border", "1px solid #d79ac4");
            } else {
                $(this).find("img").show();
                $(this).css("border", "0px");
            }

        });

        //具体发货地址选择
        $(".choice").click(function () {
            if ($(this).find("img").is(':visible')) {
                $(this).find("img").hide();
                $(this).css("border", "1px solid #d79ac4");
            } else {
                $(this).find("img").show();
                $(this).css("border", "0px");
            }

        });


    }

    ctrl.$inject = ['$rootScope', '$scope', 'cartOrderService', 'POP', '$state'];
    app.registerController('cartOrderController', ctrl);
});