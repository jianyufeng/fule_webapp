/**
 * Created by Administrator on 2017/3/24.
 */
define(['app', "css! ../../../css/my/myOrderFormDetails"], function (app) {
    function ctrl($scope, myOrderFormDetailsService, POP, $stateParams) {

        var orderId = $stateParams.order_id;

        $scope.orderInfo = {
            "order_id": "211772",
            "order_sn": "OR170704054617382",
            "order_status": "0",
            "pay_status": "1",
            "pay_time": "1499161577",
            "consignee": "dfvg",
            "email": "",
            "address": "213213",
            "zipcode": "710000",
            "tel": "1256455",
            "mobile": "13720562773",
            "best_time": "123",
            "sign_building": "231213",
            "shipping_name": "运费到付",
            "pay_name": "余额支付",
            "goods_amount": "480.00",
            "surplus": "480.00",
            "shipping_fee": "0.00",
            "invoice_no": null
        };


        $scope.$on('$ionicView.beforeEnter', function () {
            //获取订单详情
            myOrderFormDetailsService.getOrderFormDetails($scope, POP, orderId);
        });


        $scope.isNumberEmpty = function (s) {
            if (s == undefined || s == null || s == 'null' || s.length < 1 || parseInt(s) == 0) {
                return true;
            }
            return false;
        };
    }

    /*给构造函数添加$inject属性,添加注入的服务*/
    ctrl.$inject = ['$scope', 'myOrderFormDetailsService', 'POP', '$stateParams'];

    /*动态注册控制器*/
    app.registerController('myOrderFormDetailsController', ctrl);
});