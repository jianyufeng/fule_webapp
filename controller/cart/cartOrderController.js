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
            alert("点击配送方式");

        });
        $(".orderSendGoodsAddress").click(function(){
            alert("点击发货地址");
        });
        $(".orderPayModel").click(function(){
            alert("点击支付方式");
        });

    }

    ctrl.$inject = ['$scope','cartOrderService', 'POP'];
    app.registerController('cartOrderController',ctrl);
});