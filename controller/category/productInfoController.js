/**
 * Created by Administrator on 2017/3/25.
 */



define(['app', 'css! ../../../css/category/productInfo'], function (app) {

    function ctrl($scope, productInfoService, $stateParams, POP, $state, $ionicSlideBoxDelegate, $ionicTabsDelegate, $compile) {
        $(".mytab").find(".tab-title").css("color", "#000000");
        $(".fenleiIcon").find(".tab-title").css("color", "#D9A8CD");
        $scope.showImg = false;
        $scope.goodsDetailImg = true;
        POP.StartLoading();
        productImgNum=0;
        $scope.$on('$ionicView.enter', function () {
            $scope.count = 1;
            $scope.cartCount = 0;
            productInfoService.MYreset();
            productInfoService.getProductInfo($scope, $stateParams, POP, $compile);
            productInfoService.getCartInfo($scope, POP);
        });
        $scope.$on('$ionicView.leave', function () {
            $scope.count = 1;
            productInfoService.MYreset();
        });

        //获取数量手动输入是去焦点
        $(document).on("blur", "#_number", function () {

            var num = $("#_number").val();
            if (num == null || num == "" || num == "0") {
                POP.Hint("商品数量不能小于1");
                $("#_number").val(1);
            }
            $("#_number").css('border', '1px solid #cccccc');
        });
        //手动输入商品数量获取焦点
        $(document).on("focus", "#_number", function () {
            $("#_number").css('border', '2px solid #d98bbc');
        });


        $scope.onSlideChanged = function (index) {
            productInfoService.Slide(index);
        }

        // 选择属性
        $scope.selectAttr = function (type,price,goods_AttrId,outerIndex,index) {
            productInfoService.selectAttr($scope,type,price,goods_AttrId,outerIndex,index);
        };

        $scope.addCartAction = function () {
            productInfoService.addCartAction($scope, POP);
        }

        $scope.startPage = function () {
            productInfoService.startPage($scope, $state, $ionicTabsDelegate);
        }
        // 减号
        $scope.reduce = function () {
            var str = $("#_number").val();
            if (str == "") {
                $("#_number").val("1")
                return;
            }
            var nowNum = parseInt($("#_number").val());
            if (_.isNaN(nowNum)) {
                nowNum = 1;
            }
            $scope.count = nowNum;
            if ($scope.minGoodsNumber == "无限制") {
                $scope.count--;
            } else {
                if ($scope.count <= $scope.minGoodsNumber) {
                    $scope.count = $scope.minGoodsNumber;
                } else {
                    $scope.count--;
                }
            }
            if ($scope.count <= 1) {
                $scope.count = 1
            }
            $("#_number").val($scope.count);

        }
        // 加号
        $scope.add = function () {
            //获取当前的数量
            var str = $("#_number").val();
            if (str == "") {
                $("#_number").val("1")
                return;
            }
            var nowNum = parseInt($("#_number").val());

            $scope.count = nowNum;
            if ($scope.limitGoodsNumber == "无限制") {
                $scope.count++;
            } else {
                if ($scope.count >= $scope.limitGoodsNumber) {
                    $scope.count = $scope.limitGoodsNumber;
                } else {
                    $scope.count++;
                }
            }

            $("#_number").val($scope.count);
        }

        $scope.$on("viewOnFinish", function () {
            //productInfoService.setImageMargin();
            $scope.myActiveSlide = 0;
            $ionicSlideBoxDelegate.update();
            // 计算
            var Pwidth = $(".instructions").width();
            console.log(222222222);
            console.log(Pwidth);
            var Iwidth = productImgNum * 23;
            console.log(Iwidth);
            var Nwidth = (Pwidth - Iwidth) / 2;
            console.log(Nwidth);
            $(".instructionItem").css("margin-left", Nwidth+"px");
            $(".productInfoImg").myImageLazyLoad({
                //默认三个参数可不传，使用默认参数
                // imageLoadErr : "./resource/images/default/default_image.png", //加载失败占位图
                // imageServer : "http://image.38zs.net:848",				    //图片服务器地址
                // animate     : true,											//是否动画显示
            });
        });


    }


    ctrl.$inject = ['$scope', 'productInfoService', '$stateParams', 'POP', '$state', '$ionicSlideBoxDelegate', '$ionicTabsDelegate', "$compile"];
    app.registerController('productInfoController', ctrl);


});