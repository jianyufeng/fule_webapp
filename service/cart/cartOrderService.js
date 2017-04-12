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
                var goodsCount = 0;
                if (data.cartInfo.cart_goods != undefined && data.cartInfo.cart_goods.length > 0){

                    for (var i=0;i<data.cartInfo.cart_goods.length;i++){
                        console.log(parseFloat(data.cartInfo.cart_goods[i].goods_price));

                        orderAmount +=parseFloat(data.cartInfo.cart_goods[i].goods_price);

                        goodsCount +=parseFloat(data.cartInfo.cart_goods[i].goods_number);

                    }


                }

                console.log(orderAmount);

                $scope.$apply(function () {

                    $scope.address = nowAddress;                   //收货地址和信息
                    $scope.cartGoods = data.cartInfo.cart_goods;   //购物车订单信息
                    $scope.payment = data.payment.data[0];         //支付方式
                    $scope.deliveryArray = data.shipping.data;       //快递公司名
                    $scope.amountOrder = orderAmount;              //合计价格
                    $scope.goodsNumber = goodsCount;               //购买商品总数
                    $scope.cartInfo = data.cartInfo;               //购物车信息

                });


            });

        };


        //验证支付密码
        service.verifyPayPassword = function($scope,updateParams,POP,fn){

            POP.StartLoading();

            //更新操作
            HTTP.post(API.Cart.verifyUserPassword,updateParams,function(e,data){

                POP.EndLoading();

                if(e){
                    POP.Hint("密码错误!");
                    return;
                }else {
                    fn();
                }

            });

        }


        //生成支付订单(普通商城)
        service.addCommonPaymentOrder = function($scope,updateParams,POP,fn){

            POP.StartLoading();

            //更新操作
            HTTP.post(API.Cart.commonPaymentOrder,updateParams,function(e,data){

                POP.EndLoading();

                if(e){
                    POP.Hint("订单提交失败");
                    return;
                }else {
                    fn();
                    POP.Hint("订单提交成功!");
                }

            });

        }

        //计算运费

        service.countFreight = function($scope,freightParams){

            //更新操作
            HTTP.post(API.Cart.countFreight,freightParams,function(e,data){
                $scope.$apply(function () {
                    $scope.deliveryFreight = data;
                });
                console.log(data);
                if(e){
                    $.loadError(function () {
                        service.countFreight();
                    });
                    return;
                }

            });

        }


        return service;

    });


});
