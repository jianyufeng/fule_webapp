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

            //将新的值重新注入页面
            $scope.$apply(function(){
                $scope.address = args.address;
            })

        });


        //提交订单点击时
        $(".paySubmit").click(function(){

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
                           user_id : info.user_id,
                        // user_money :







                    }





                 //提交订单
                    cartOrderService.addCommonPaymentOrder($scope,payParams,POP,function () {

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
            var cart_id = $scope.cartInfo.cart_goods[0].cart_id;
            var payment_amount = $scope.cartInfo.order_info.pay_amount;

            var freightParams = {

                shipping_id : shipping_id,
                cart_id : cart_id,
                payment_amount : payment_amount

            }
        cartOrderService.countFreight ($scope,freightParams,function(){

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

            var deliveryFreight = $scope.deliveryFreight;
            $scope.shippingName = $(".deliveryContent").eq(_index).text() +'¥'+ deliveryFreight;
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