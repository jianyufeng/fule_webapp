/**
 * Created by Administrator on 2017/4/14.
 */
define(['app', 'css! ../../../css/my/my-buyHappyHome'], function (app) {
    function ctrl($scope, $rootScope, myBuyHappyHomeServer, POP, $ionicScrollDelegate, $compile) {

        $scope.$on('$ionicView.loaded', function () {
            /*获取数据*/

            //获取购买喜乐之家的列表
            myBuyHappyHomeServer.getBuyGoodList($scope, POP);
            //获取购买喜乐之家配置
            myBuyHappyHomeServer.getBuyGoodConfig($scope, POP, 7);

        });


        // 接收传值页面传过来的地址内容
        $rootScope.$on('changeAddress', function (event, args) {
            console.log(args);
            //将新的值重新注入页面
            $scope.$apply(function () {
                $scope.buyHappyAddress = args.address;
            })

        });
        // 接收传值页面传过来的地址内容
        $rootScope.$on('deleteAddress', function (event, args) {
            console.log(args);
            if (args.address == "NO") {
                $scope.buyHappyAddress = "NO";
            } else {
                if ($scope.buyHappyAddress.address_id == args.address_id) {

                    myBuyHappyHomeServer.getBuyGoodList($scope, POP);

                }
            }
        });
        //初始化默认值
        $scope.bugConfig = {
            pay_amount: 0,
            goods_pice: 0
        };
        //配置获取 实际支付金额
        $scope.bugConfig.pay_amount = 0;
        //配置获取 至少金额
        $scope.bugConfig.goods_pice = 0;
        //一共多少钱
        $scope.totalMoney = 0;
        //合计多少商品
        $scope.totalGoodsNumber = 0;
        //当前数量产品的金额
        $scope.goodMoney = 0;


        $(document).on("input propertychange", ".bhh_buyNumber", function () {

            //获取输入的产品数
            var input = $(this).val();
            //最大库存数
            var number = $(this).data("number");
            //获取上次输入的值
            var oldInput = $(this).data("oldInput");
            console.log(number);
            //设置最大值为 库存+1  金额为 最后输入未超出库存的数量 的金额
            if (input > number) {
                $(this).css("background-color", "#F0B3C5");
                return;
            }
            $(this).css("background-color", "#fff");
            //存输入的值到html中
            $(this).attr("data-oldInput",input);

            //获取单价
            var price = $(this).data("price");
            //获取金额对象
            var moneyBox = $(this).parent().parent().find(".money").first();
            //获取上次的金额
            var oldMoney = moneyBox.text();
            //计算金额
            var newMoney = price * input;
            //赋值新的金额
            moneyBox.text(newMoney);

            //计算总金额
            $scope.totalMoney = $scope.totalMoney - oldMoney + newMoney;
            //计算总商品
            $scope.totalGoodsNumber =  $scope.totalGoodsNumber - oldInput;

            //计算 差多少可以购买喜乐之间  貌似不需要

        });


        //计算商品金额
        $scope.calGoodMomey = function (price, numberGood, inputNumber) {
            //var money = "";
            //if (numberGood<inputNumber){
            //    money = price*numberGood
            //
            //    return price*numberGood;
            //}
            return price * inputNumber;
        };
        //$scope.$watch('a.goods_number', function(newValue, oldValue) {
        //    console.log(newValue);
        //    console.log(oldValue);
        //    console.log(112112);
        //    //if ($scope.input.Tel != oldValue){
        //    //    //当value改变时执行的代码
        //    //}
        //});

        //出现更多属性的商品
        $scope.seeMoreGoods = function (goodId) {
            var obj = $('#' + "more_goodsBox_" + goodId);
            if (obj.children().length < 1) {
                myBuyHappyHomeServer.getBuyGoodMoreAttr($scope, POP, goodId, $ionicScrollDelegate, $compile);
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
    ctrl.$inject = ['$scope', '$rootScope', 'myBuyHappyHomeServer', 'POP', '$ionicScrollDelegate', '$compile'];

    /*动态注册控制器*/
    app.registerController('myBuyHappyHomeController', ctrl);
});