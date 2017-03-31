/**
 * Created by charles_xsx on 2017/3/27.
 */

define(['app','css!../../../css/cart/cart_orderConfirm'],function(app,cart_fun){

    function ctrl($scope,cartOrderService,POP){

        $scope.$on('$ionicView.loaded',function () {

            cartOrderService.getOrderInfo($scope,POP);

        });

        //提交订单点击时
        $(".paySubmit").click(function(){
            alert("点击提交订单");

        });
        $(".addressContent").click(function(){
            alert("点击收货信息");
        });

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

        $(".orderPayModel").click(function(){
            alert("点击支付方式");
        });

    }

    ctrl.$inject = ['$scope','cartOrderService', 'POP'];
    app.registerController('cartOrderController',ctrl);
});