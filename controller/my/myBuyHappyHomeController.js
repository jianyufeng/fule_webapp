/**
 * Created by Administrator on 2017/4/14.
 */
define(['app', 'css! ../../../css/my/my-buyHappyHome'], function (app) {
    function ctrl($scope, $rootScope, myBuyHappyHomeServer, POP, $ionicScrollDelegate,$compile) {

        $scope.$on('$ionicView.loaded', function () {
            /*获取数据*/
        });
        //// 接收传值页面传过来的地址内容
        //$rootScope.$on('changeAddressInfo', function(event, args) {
        //    console.log(args);
        //    //将新的值重新注入页面
        //    $scope.$apply(function(){
        //        $scope.address = args.address;
        //    })
        //
        //});
        //// 接收传值页面传过来的地址内容
        //$rootScope.$on('deleteAddress', function(event, args) {
        //    console.log(args);
        //    if (args.address == "NO"){
        //        $scope.address = "NO";
        //    }else {
        //        if ($scope.address.address_id == args.address_id){
        //
        //cartOrderService.getOrderInfo($scope, POP);
        //
        //        }
        //    }
        //});
        //初始化默认值
        $scope.bugConfig = {
            pay_amount:0,
            goods_pice:0
        };
        //配置获取 实际支付金额
        $scope.bugConfig.pay_amount = 0;
        //配置获取 至少金额
        $scope.bugConfig.goods_pice = 0;
        //一共多少钱
        $scope.totalMoney = 0;
        //合计多少商品
        $scope.totalGoodsNumber = 0;





        //获取购买喜乐之家的列表
        myBuyHappyHomeServer.getBuyGoodList($scope, POP);
        //获取购买喜乐之家配置
        myBuyHappyHomeServer.getBuyGoodConfig($scope, POP,7);

        //出现更多属性的商品
        $scope.seeMoreGoods = function (goodId) {
            var obj = $('#' + "more_goodsBox_" + goodId);
            if (obj.children().length< 1) {
                myBuyHappyHomeServer.getBuyGoodMoreAttr($scope, POP, goodId, $ionicScrollDelegate,$compile);
            } else {
                var display = obj.css('display');
                obj.slideToggle(300, function () {
                    var scroller = $ionicScrollDelegate.$getByHandle('bhh_scroll');
                    var scrollPosition = scroller.getScrollPosition();
                    var currentScroll = scrollPosition.top;
                    if (display == 'none') {
                        scroller.scrollTo(0, currentScroll + 60, true);
                    } else {
                        scroller.scrollTo(0, currentScroll, true);
                    }
                });
            }
        };

    }

    /*给构造函数添加$inject属性,添加注入的服务*/
    ctrl.$inject = ['$scope', '$rootScope', 'myBuyHappyHomeServer', 'POP', '$ionicScrollDelegate','$compile'];

    /*动态注册控制器*/
    app.registerController('myBuyHappyHomeController', ctrl);
});