define(['app'], function (app) {

    app.factory("myOrderFormDetailsService", function () {

        var service = {};

        /*网络获取商城订单 信息*/
        service.getOrderFormDetails = function ($scope, POP, orderId) {
            //获取用户的账号\
            POP.StartLoading();
            var info = User.getInfo();
            HTTP.get(API.My.myOrderFormDetails + "/user_id/" + info.user_id + "/order_id/" + orderId, {}, function (e, data) {
                POP.EndLoading();
                if (e) {
                    POP.Hint("订单详情获取失败");
                    $.loadError(function () {
                        service.getOrderFormDetails();
                    });
                    return;
                }

                $scope.$apply(function () {
                    $scope.orderInfo = data.orderInfo;
                    $scope.data = data.orderGoods.data;

                    //显示 发货状态处理
                    doSendGoodState(data.orderInfo.order_status);
                    var length = data.orderGoods.data.length;
                    //商品总数
                    var n = 0;
                    for (var i = 0; i < length; i++) {
                        n += Number.parseFloat(data.orderGoods.data[i].goods_number);
                    }
                    $scope.goodsAllNumber = n;

                    //是否显示的状态处理

                    //隐藏手机
                    objHide($('.ofdAdL_PPhone'), isEmpty(data.orderInfo.mobile));
                    objHide($('.ofd_phoneBox'), isEmpty(data.orderInfo.mobile));
                    //隐藏电话
                    objHide($('.ofd_callBox'), isEmpty(data.orderInfo.tel));
                    //隐藏电自邮箱
                    objHide($('.ofd_mailBox'), isEmpty(data.orderInfo.email));
                    //隐藏标志建筑
                    objHide($('.ofd_flagRoomBox'), isEmpty(data.orderInfo.sign_building));
                    //最佳送货时间
                    objHide($('.ofd_sendTimeBox'), isEmpty(data.orderInfo.best_time));



                })
            });

        };
        var isEmpty = function (s) {
            if (s == undefined || s == null || s == 'null' || s.length < 1) {
                return true;
            }
            return false;
        };


        var objHide = function (obj, isHide) {
            if (isHide) {
                obj.hide();
            } else {
                obj.show();
            }
        };
        //发货状态
        var doSendGoodState = function (state) {
            var v = parseInt(state);
            var src = "";
            switch (v) {
                case  0:
                    //varl = '未发货';
                    src = "./resource/images/icon/orderform_unsend.png";
                    break;
                case  1:
                    //varl = '配货中';
                    src = "./resource/images/icon/orderform_readying.png";
                    break;
                case  2:
                    //varl = '发货中';
                    src = "./resource/images/icon/orderform_sendying.png";

                    break;
                case  3:
                    //varl = '部分发货';
                    src = "./resource/images/icon/orderform_sendying.png";

                    break;
                case  4:
                    //varl = '已全部发货';
                    src = "./resource/images/icon/orderform_sendying.png";

                    break;
                case  5:
                    //varl = '已收货';
                    src = "./resource/images/icon/orderform_received.png";
                    break;
                default:
                    //varl = '未发货';
                    src = "./resource/images/icon/orderform_unsend.png";
                    break;
            }
            $("#ofd_s_goods_img").attr('src', src);
        };

        return service;


    });


});