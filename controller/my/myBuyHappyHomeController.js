/**
 * Created by Administrator on 2017/4/14.
 */
define(['app', 'css! ../../../css/my/my-buyHappyHome'], function (app) {
    function ctrl($scope, $rootScope, myBuyHappyHomeServer, POP, $compile, $ionicScrollDelegate, $stateParams, $state,$ionicHistory) {

        var configId = $stateParams.configId;
        var id = $stateParams.id;
        //移动时所有的input失去焦点
        $(document).off('touchmove').on('touchmove',function(){
           $(":focus").blur();
        });
        //回到顶部
        var nowSreenH = $("#bhh_ContentBox").height();
        $scope.bhh_ListScrollEvent = function(){
            var scrollTop = $ionicScrollDelegate.$getByHandle('bhh_scroll').getScrollPosition().top;
            if(parseInt(scrollTop) > parseInt(nowSreenH)){
                $(".goToTop").fadeIn(200);
            }else{
                $(".goToTop").fadeOut(200);
            }
        };
        $(".goToTop").click(function(){
            $ionicScrollDelegate.scrollTop(true);
        });
        //提交是的库存不足判断标记
        var canotSave = "canotSave";
        $scope.$on('$ionicView.loaded', function () {
            /*获取数据*/

            //获取购买喜乐之家的列表
            myBuyHappyHomeServer.getBuyGoodList($scope, POP);
            //获取购买喜乐之家配置
            myBuyHappyHomeServer.getBuyGoodConfig($scope, POP, configId);

        });


        // 接收传值页面传过来的地址内容
        $rootScope.$on('changeAddress', function (event, args) {
            //console.log(args);
            //将新的值重新注入页面
            // $scope.$apply(function () {
                $scope.buyHappyAddress = args.address;
            // })

        });
        // 接收传值页面传过来的地址内容
        $rootScope.$on('deleteAddress', function (event, args) {
            //console.log(args);
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
        $(document).off("input propertychange", ".bhh_search").on("input propertychange", ".bhh_search", function () {
            var val = $.trim($(this).val());
            if (val == "") {
                $("div .bhh_goodItemBox").show();
            } else {
                $(".bhh_goodItemBox").each(
                    function () {
                        var pinyin = $(this).find('.bhh_goodName').first().text();
                        if (pinyin.indexOf(val) != -1) {
                            $(this).show();
                        } else {
                            $(this).hide();
                        }
                    });
            }
        });

        //$(document).on("change",".bhh_buyNumber",function(){
        //
        //
        //});
        var reg = /^[0-9]\d*$/;
        $(document).off("input propertychange", ".bhh_buyNumber").on("input propertychange", ".bhh_buyNumber", function () {

            //获取输入的产品数
            var input = $(this).val();
            var result = reg.test(input);
            if (input == "") {
                input = 0;
            } else if (!result) {
                // input = 0;
                // $(this).val(0);
                //console.log("不满足");
                return;
            }
            input = Number.parseFloat(input);
            //获取上次输入的值
            var oldInput = Number.parseFloat($(this).data("oldinput"));
            //console.log(input);
            //最大库存数
            var number = Number.parseFloat($(this).data("number"));
            //检测是否没有库存
            if (input > number) {
                $(this).css("background-color", "#F0B3C5");
                $(this).addClass(canotSave);
                return;
            }
            $(this).css("background-color", "#fff");
            $(this).removeClass(canotSave);


            //存输入的值到html中
            $(this).data("oldinput", input);

            //获取单价
            var price = Number.parseFloat($(this).data("price"));
            //获取金额对象
            var moneyBox = $(this).parent().parent().find(".money").first();
            //获取上次的金额
            var oldMoney = Number.parseFloat(moneyBox.text());
            //计算金额
            var newMoney = price * input;
            //赋值新的金额
            moneyBox.text(newMoney);


            //判断是有属性的产品需要添加购买的数量在其视图上
            if ($(this).parent().attr('class') == "more_buyNumberBox") {
                var sel = $(this).parent().parent().parent().parent().find(".sel_p_n").first();
                var n = Number.parseFloat(sel.text());
                sel.text(n - oldInput + input);
            }
            $scope.$apply(function () {
                //计算总金额
                $scope.totalMoney = $scope.totalMoney - oldMoney + newMoney;
                //计算总商品
                $scope.totalGoodsNumber = Number.parseFloat($scope.totalGoodsNumber) - oldInput + input;

                //显示比较是否可以购买喜乐之家
                if ($scope.totalMoney >= ($scope.bugConfig.goods_pice - 100)) {
                    //可以购买
                    $('.bhh_addBuyAlertBox').hide();
                    $('.bhh_addBuyAlertBox1').show();
                    $('.bhh_saveBox').removeAttr('disabled');
                } else {
                    //差点金额
                    $('.bhh_addBuyAlertBox').show();
                    $('.bhh_addBuyAlertBox1').hide();
                    $('.bhh_saveBox').attr("disabled", true);

                }
            })
        });
        $scope.$on("viewOnFinish", function () {

            $(".bhh_goodImgBox img").myImageLazyLoad({
                //默认三个参数可不传，使用默认参数
                // imageLoadErr : "./resource/images/default/default_image.png", //加载失败占位图
                // imageServer : "http://image.38zs.net:848",				    //图片服务器地址
                // animate     : true,											//是否动画显示
            });

        });
        //出现更多属性的商品
        $scope.seeMoreGoods = function (goodId, price) {
            var obj = $('#' + "more_goodsBox_" + goodId);
            if (obj.children().length < 1) {
                myBuyHappyHomeServer.getBuyGoodMoreAttr($scope, POP, goodId, $ionicScrollDelegate, $compile, price);
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
        //输入框抬起
        inputKeyUp = function (t) {
            t.value = t.value.replace(/\D/g, '');
        };
        //点击保存按钮
        $(".bhh_saveBox").click(function () {
            //检测是否有库存不足 根据是否包含类名 canotSave
            var isSave = $('.' + canotSave + '');
            if (isSave.length > 0) {
                POP.Confirm("<font color='red'>(您选择的产品超出库存)</font>", function () {
                    var scroller = $ionicScrollDelegate.$getByHandle('bhh_scroll');
                    console.log(isSave.first().offset().top);
                    scroller.scrollBy(0, isSave.first().offset().top-100, true);
                });
                return;
            }
            //检测金额数据
            if ($scope.totalMoney > $scope.user_money) {
                POP.Confirm("<font color='red'>(余额不足)</font>", function () {
                });
                return;
            }
            //添加收货地址
            if ($scope.buyHappyAddress == 'NO') {
                POP.Confirm("<font color='red'>(请添加收货人信息)</font>", function () {
                    //滑动到顶部 添加地址信息
                   $ionicScrollDelegate.$getByHandle('bhh_scroll').scrollTop();
                });
                return;
            }
            //收货人 id
            var addressId = $scope.buyHappyAddress.address_id;
            //console.log("addressId:" + addressId);
            //钱数
            var totalMoney = $scope.totalMoney;
            //console.log("totalMoney:" + totalMoney);
            //商品数
            //var totalGoodsNumber = $scope.totalGoodsNumber;
            //console.log("totalGoodsNumber:" + totalGoodsNumber);

            //获取提交订单需要的数据
            //循环输入框的数量
            var goods_infos = [];
            //获取选着商品的信息
            $(".bhh_buyNumber").each(
                function () {
                    var input = $(this).val();

                    if (input > 0) {
                        var goodInfo = {};
                        if ($(this).parent().attr('class') == "more_buyNumberBox") {
                            //多属性商品  获取item的属性 和属性的item
                            var item = $(this).parent().parent().parent().parent().data("gooditem");
                            var productid = $(this).data("productid");
                            var goodsprice = $(this).data("goodsprice");
                            var goodsattr = $(this).data("goodsattr");
                            goodInfo.goods_id = item.goods_id;
                            goodInfo.product_id = productid;
                            goodInfo.goods_name = item.goods_name;
                            goodInfo.extension_code = 0;
                            goodInfo.goods_number = input;
                            goodInfo.goods_price = item.shop_price;
                            goodInfo.goods_attr = goodsattr;
                            goodInfo.goods_sn = item.goods_sn;
                            goodInfo.market_price = item.market_price;
                            goodInfo.goods_type = item.goods_type;
                            goodInfo.goods_attr_id = 0;

                        } else {
                            //非属性商品  获取item的属性
                            var item = $(this).data("gooditem");
                            goodInfo.goods_id = item.goods_id;
                            goodInfo.product_id = 0;
                            goodInfo.goods_name = item.goods_name;
                            goodInfo.extension_code = 0;
                            goodInfo.goods_number = input;
                            goodInfo.goods_price = item.shop_price;
                            goodInfo.goods_attr = 0;
                            goodInfo.goods_sn = item.goods_sn;
                            goodInfo.market_price = item.market_price;
                            goodInfo.goods_type = item.goods_type;
                            goodInfo.goods_attr_id = 0;
                        }
                        goods_infos.push(goodInfo);
                    }
                });

            //创建提交信息

            var info = User.getInfo();
            var paras = {
                'order_info': {
                    'address_id': addressId,
                    'surplus': totalMoney < $scope.bugConfig.goods_pice ? $scope.bugConfig.pay_amount : totalMoney - ($scope.bugConfig.goods_pice - $scope.bugConfig.pay_amount),
                    'goods_amount': totalMoney,
                    'referer': '手机'
                },
                'goods_info': goods_infos,
                'id': id,
                'user_id': info.user_id,
                'user_name': info.user_name,
                'config_id': configId
            };
            //console.log(paras);
            //提交订单
            myBuyHappyHomeServer.saveOrderForm(paras, $scope, POP, function () {
                //提交成功的回调  弹框验证密码
                POP.FormAlert('请输入支付密码', $scope, function (psw) {
                    //验证密码
                    var pars = {
                        'user_id': info.user_id,
                        'password': psw,
                        'type': 'THREE_PASSWORD'
                    };
                    myBuyHappyHomeServer.verifyPayPassword($scope, pars, POP, function () {
                        //密码验证成功后的回调
                        var p = {
                            'config_id': configId,
                            'user_id': info.user_id,
                            'log_id': id
                        };
                        myBuyHappyHomeServer.happlyOver(p, $scope, POP, function () {
                            //购买完毕
                            POP.Hint("购买成功");
                            $ionicHistory.clearCache();
                            setTimeout(function(){
                                $state.go('tab.my');
                            },1000);
                        })


                    })
                });


            });


        })

    }

    /*给构造函数添加$inject属性,添加注入的服务*/
    ctrl.$inject = ['$scope', '$rootScope', 'myBuyHappyHomeServer', 'POP', '$compile', '$ionicScrollDelegate', '$stateParams','$state','$ionicHistory'];

    /*动态注册控制器*/
    app.registerController('myBuyHappyHomeController', ctrl);
});