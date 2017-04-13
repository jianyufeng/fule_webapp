/**
 * Created by charles_xsx on 2017/3/27.
 */

define(['app','css!../../../css/cart/cart_orderConfirm'],function(app,cart_fun){

    function ctrl($rootScope,$scope,cartOrderService,POP,$state){

        $scope.$on('$ionicView.loaded',function () {

            cartOrderService.getOrderInfo($scope, POP);

        });


        // 接收传值页面传过来的地址内容
        $rootScope.$on('changeAddressInfo', function(event, args) {


            console.log(args);

            //将新的值重新注入页面
            $scope.$apply(function(){
                $scope.address = args.address;
            })

        });


        //提交订单点击时
        $(".paySubmit").click(function(){

            //判断余额是否足够
            if($scope.userInfo.user_money < $scope.orderInfo.pay_amount){

                POP.Alert("抱歉,您的余额不足!");

                return;

            }


           //验证收货地址
            if( $scope.address == "NO"){

                POP.Alert("请设置收货地址!");

                return;

            }



            if ($scope.deliveryFreight == undefined){

                POP.Alert("请选择配送方式!");

                return;


            }
            POP.FormAlert("请输入您的支付密码",$scope,function(v){

                var info = User.getInfo();

                var payParams = {

                     user_id : info.user_id,
                     password : v,
                        type : "THREE_PASSWORD"

                }
                 //验证密码
                cartOrderService.verifyPayPassword($scope,payParams,POP,function () {



                    var orderParams = {
                           user_id : info.user_id, //用户id
                        user_money : $scope.userInfo.user_money, //用户余额
                      shipping_fee : $scope.deliveryFreight, //运费
                        address_id : $scope.address.address_id, //收货地址id
                       shipping_id : $scope.shi_id, //物流公司id
                     shipping_name : $scope.expressName, //物流公司名
                      goods_amount : $scope.amountOrder, //商品总金额
                           surplus : $scope.orderInfo.pay_amount, //实际支付总金额
                           referer : "手机", //订单来源(本站/手机/APP)
                        order_mode : $scope.orderInfo.ORDER_TYPE, //订单类型（CE/CM）
                                pv : $scope.orderInfo.pv, //获得PV
                    isAccumulative : $scope.orderInfo.LEI_JI_TYPE, //是否累计PV 0-累计 1-不累计
                   shipping_config : $scope.webConfig.EXEMPT_FREIGHT.PARAM_VALUE, //运费配置（达到指定支付金额免除运费）
                            pay_id : 1, //余额支付
                          pay_name : "余额支付", //支付方式名
                           cart_id : $scope.cartGoods[0].cart_id, //购物车id
                          LEVEL_TO : $scope.orderInfo.LEVEL_TO, //自动升级目标级别
                          integral : $scope.orderInfo.integral //累计积分

                    }


                 //提交订单
                    cartOrderService.addCommonPaymentOrder($scope,orderParams,POP,function () {

                        $scope.$apply(function(){
                            $rootScope.cartBadge = 0;
                        })

                        $state.go("tab.my",{});
                    });


                });



            });


        });
        // $(document).on("click",".orderBox",function(){
        //     alert("点击收货信息");
        // });

        $(".orderDeliveryModel").click(function(){
        $(".popBg").css({
             display: "block", height: $(document).height()
          });
            var $popBox = $(".popBox");
           $popBox.css({
               display: "block"
           }) ;
            $(".closeButton").click(function () {
                $(".popBg,.popBox").css("display", "none");
            });


        });

        $(".orderSendGoodsAddress").click(function(){
            $(".popBg").css({
                display: "block", height: $(document).height()
            });
            var $popAddressBox = $(".popAddressBox");
            $popAddressBox.css({
                display: "block"
            }) ;

            $(".close").click(function () {
                $(".popBg,.popAddressBox").css("display", "none");
            });
        });

        //选择支付方式
        $(".orderPayModel").click(function(){

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
            if ($(this).find("img").is(':visible')){
                $(this).find("img").hide();
                $(this).css("border", "1px solid #d79ac4");
            }else {
                $(this).find("img").show();
                $(this).css("border", "0px");
            }
        });

        //选择配送方式
        $(document).on("click",".deliveryChoice",function () {
            var _index = $(".deliveryChoice").index(this);
            var shipping_id = $(".deliveryChoice").eq(_index).attr("id");
             $scope.shi_id  = $(".deliveryChoice").eq(_index).attr("id"); //当前快递公司id
            var cart_id = $scope.cartGoods[0].cart_id;
            var payment_amount = $scope.orderInfo.pay_amount;

            var freightParams = {

                shipping_id : shipping_id,
                    cart_id : cart_id,
             payment_amount : payment_amount

            }

        cartOrderService.countFreight ($scope,freightParams,function(freight) {

            $scope.shippingName = $(".deliveryContent").eq(_index).text() + '¥' + freight;
            $scope.expressName  = $(".deliveryContent").eq(_index).text(); //物流公司名

        });

            if ($(this).find("img").is(':visible')){
                $(this).find("img").hide();
                $(this).css("border", "1px solid #d79ac4");

            }else {
                $(".deliveryChoice").find("img").hide();
                $(this).find("img").show();
                $(".deliveryChoice").css("border", "1px solid #d79ac4");
                $(this).css("border", "0px");
                var $deliveryPrice = $(".deliveryPrice");
                $deliveryPrice.css({
                    visibility: "hidden"
                }) ;
                var $deliveryPrice = $(".deliveryPrice").eq(_index);
                $deliveryPrice.css({
                    visibility: "visible"
                }) ;
            }


        });


        $(".bottomChoice").click(function () {
            if ($(this).find("img").is(':visible')){
                $(this).find("img").hide();
                $(this).css("border", "1px solid #d79ac4");
            }else {
                $(this).find("img").show();
                $(this).css("border", "0px");
            }

        });
        $(".choice").click(function () {
            if ($(this).find("img").is(':visible')){
                $(this).find("img").hide();
                $(this).css("border", "1px solid #d79ac4");
            }else {
                $(this).find("img").show();
                $(this).css("border", "0px");
            }

        });


    }

    ctrl.$inject = ['$rootScope','$scope','cartOrderService', 'POP','$state'];
    app.registerController('cartOrderController',ctrl);
});