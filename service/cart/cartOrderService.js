define(['app'],function(app){

    app.factory("cartOrderService",function(){

        var service = {};

        /* 获取服务器数据*/
        /*网络获取用户信息*/
        service.getOrderInfo = function ($scope, POP) {


            POP.StartLoading();



            //获取用户的账号
            var info = User.getInfo();
            HTTP.get(API.Cart.orderInfo + "/user_id/"+info.user_id , {}, function (e, data) {


                POP.EndLoading();

                if (e) {
                    $.loadError(function () {
                        service.getOrderInfo();
                    });
                    return;
                }

                console.log(data);

                var nowAddress;
                if(data.address != undefined && data.address.length > 0){
                    for(var i=0;i<data.address.length;i++){
                        if(data.address[i].is_default == 1){
                            nowAddress = data.address[i];
                            break;
                        }
                    }

                }else{
                    nowAddress = "NO";

                }

                var orderAmount = 0;
                if (data.cartInfo.cart_goods != undefined && data.cartInfo.cart_goods.length > 0){

                    for (var i=0;i<data.cartInfo.cart_goods.length;i++){
                        console.log(parseFloat(data.cartInfo.cart_goods[i].goods_price));

                        orderAmount +=parseFloat(data.cartInfo.cart_goods[i].goods_price);

                    }


                }

                console.log(orderAmount);

                $scope.$apply(function () {

                    $scope.address = nowAddress;                   //收货地址和信息
                    $scope.shipping = data.shipping.data[0];       //快递公司名
                    $scope.cartGoods = data.cartInfo.cart_goods;   //购物车订单信息
                    $scope.payment = data.payment.data[0];         //支付方式
                    $scope.amountOrder = orderAmount;              //合计
                    console.log($scope.address);


                });


            });

        };


        return service;

    });


});
