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

                cartOrderService.verifyPayPassword($scope,payParams,POP,function () {

                   $state.go("tab.my",{});
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

        //选择发货方式
        $(".deliveryChoice").click(function () {
            if ($(this).find("img").is(':visible')){
                $(this).find("img").hide();
                $(this).css("border", "1px solid #d79ac4");
            }else {
                $(this).find("img").show();
                $(this).css("border", "0px");
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