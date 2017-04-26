/**
 * Created by ShareLock on 2017/4/14.
 * 喜乐之家升级的Controller
 */


define(['app', './Fun/identityCardTest', 'css! ../../../css/my/my-happyHomeUpgrade', 'addressSelect'], function (app, identityCardTest) {
    function ctrl($scope, myHappyHomeUpgradeService, POP, $state, $stateParams, $ionicScrollDelegate) {

        $scope.userArray = [];
        $scope.upGrade = {};
        $scope.upGrade.click = false;
        $scope.index = 0;
        $scope.id = 0;
        $scope.upGrade.address = null;
        $scope.showRight = false;
        $scope.left = -1;
        $scope.right = -1;
        var configId = 0;
        $scope.$on('$ionicView.enter', function () {
            configId = $stateParams.configId;
            //获取数据
            myHappyHomeUpgradeService.getMyHappyHomeUpgradeInfo($scope, configId, POP);

            startTagAnimate();

        });

        $scope.$on('$ionicView.leave', function () {

            clearInterval(rightTimer);
            clearInterval(leftTimer);
        });


        var rightflag = 1;
        var leftFlag = 1;
        var rightTimer = null;
        var leftTimer = null;

        function startTagAnimate() {

            rightTimer = setInterval(function () {

                (function () {

                    $("#rightTag").animate({"right": (-5 * rightflag ) + "px"}, 500, function () {
                        rightflag = -rightflag;
                    });

                })();

            }, 500);


            leftTimer = setInterval(function () {

                (function () {

                    $("#leftTag").animate({"left": (-5 * leftFlag ) + "px"}, 500, function () {
                        leftFlag = -leftFlag;
                    });

                })();

            }, 500);


        }

        $scope.showLeftOrRight = function () {
            var delegate = $ionicScrollDelegate.$getByHandle('topScroll');
            var position = delegate.getScrollPosition();
            var width = $(".of_navBox").width();
            var scrWidth = $(document.body).width();
            if (position.left == 0) {
                $("#leftTag").hide();
                $("#rightTag").show();
                return;
            }
            if (position.left == (width - scrWidth)) {
                $("#rightTag").hide();
                $("#leftTag").show();
                return;
            }


        }

        // 跳转到购物界面
        $scope.goToShopping = function () {
            if ($scope.goShopping == undefined) {
                return;
            }
            $state.go("tab.my-buyHappyHome", {
                "configId": configId,
                "id": $scope.id
            });
        }
        $scope.showUser = function (index) {
            myHappyHomeUpgradeService.showUserGrade($scope, index);
        }
        $scope.backClick = function () {
            POP.Confirm("是否放弃当前操作？", function () {
                },
                "放弃", "继续编辑", function () {
                    window.history.back();
                });
        };


        $('#abc1').click(function () {
            $('#RegionBox').fadeOut(300);
            if ($scope.left == 0) {
                $(this).css('color', '#D39AC5');
                $('#abc2').css('color', 'black');
                $('#selectResult').val("左区");
                var user = $scope.userArray[0];
                user.REGION = 0;
            } else {
                POP.Alert("左区不可用");
            }

        });

        $("#abc2").click(function () {
            $('#RegionBox').fadeOut(300);
            if ($scope.right == 0) {
                $(this).css('color', '#D39AC5');
                $('#abc1').css('color', 'black');
                $('#selectResult').val("右区");
                var user = $scope.userArray[0];
                user.REGION = 1;
            } else {
                POP.Alert("右区不可用");
            }
        });

        $('#a').click(function () {
            $(document).off("click", "#selectBank");
            $(this).css('color', '#D39AC5');
            $('#b').css('color', 'black');
            $('#c').css('color', 'black');
            $('#bank').val($(this).text());
            $('#BankBox').fadeOut(300, function () {
                $(document).on("click", "#selectBank", function () {
                });
            });

            var user = $scope.userArray[$scope.index];
            if (user.flag == undefined) {
                user.BANK_NAME = 1;
                return;
            }
            user.flag = $scope.index;
            if ($scope.index != 0) {
                user.BANK_NAME = 1;
                return;
            }
            //    // 输入完成赋值给其他的输入项
            for (var i = 0; i < $scope.userArray.length; i++) {
                var info = $scope.userArray[i];
                if (info.flag == 0) {
                    info.BANK_NAME = 1;
                }
            }

            return false;
        });
        $("#b").click(function () {
            $(document).off("click", "#selectBank");
            $(this).css('color', '#D39AC5');
            $('#a').css('color', 'black');
            $('#c').css('color', 'black');
            $('#bank').val($(this).text());
            $('#BankBox').fadeOut(300, function () {
                $(document).on("click", "#selectBank", function () {
                });
            });

            var user = $scope.userArray[$scope.index];
            if (user.flag == undefined) {
                user.BANK_NAME = 2;
                return;
            }
            user.flag = $scope.index;
            if ($scope.index != 0) {
                user.BANK_NAME = 2;
                return;
            }
            //    // 输入完成赋值给其他的输入项
            for (var i = 0; i < $scope.userArray.length; i++) {
                var info = $scope.userArray[i];
                if (info.flag == 0) {
                    info.BANK_NAME = 2;
                }
            }

            return false;
        });
        $("#c").click(function () {
            $(document).off("click", "#selectBank");
            $(this).css('color', '#D39AC5');
            $('#a').css('color', 'black');
            $('#b').css('color', 'black');
            $('#bank').val($(this).text());
            $('#BankBox').fadeOut(300, function () {
                $(document).on("click", "#selectBank", function () {
                });
            });

            var user = $scope.userArray[$scope.index];
            if (user.flag == undefined) {
                user.BANK_NAME = 3;
                console.log(1111111111);
                return;
            }
            user.flag = $scope.index;
            if ($scope.index != 0) {
                user.BANK_NAME = 3;
                console.log(222222222222);
                return;
            }
            //    // 输入完成赋值给其他的输入项
            for (var i = 0; i < $scope.userArray.length; i++) {
                var info = $scope.userArray[i];
                if (info.flag == 0) {
                    info.BANK_NAME = 3;
                    console.log(3333333333);
                }
            }

            return false;
        });
        // 选择银行弹框消失
        $("#BankBox").click(function (e) {
            if (e.target.id == "BankBox") {
                $('#BankBox').hide();

            }
        });

        // 推荐人失去焦点
        $("#recommend").blur(function () {
            var str = _.trim($(this).val());

            if ($scope.index > 0) {
                return
            }
            if (myHappyHomeUpgradeService.showEmptyError(str,
                    $("#recommendWaring"), $("#recommend"))) {
                return;
            }
            myHappyHomeUpgradeService.checkingRecommendedMan($scope, $(this), $("#recommendWaring"), str, POP);

        });
        function checkRecommend() {
            var str = _.trim($("#recommend").val());
            myHappyHomeUpgradeService.showEmptyError(str,
                $("#recommendWaring"), $("#recommend"))
            return;
        }

        // 节点人失去焦点
        $("#node").blur(function () {
            var str = _.trim($(this).val());
            if ($scope.index > 0) {
                return
            }
            if (myHappyHomeUpgradeService.showEmptyError(str,
                    $("#nodeWaring"), $("#node"))) {
                return;
            }
            myHappyHomeUpgradeService.checkingNodeMan($scope, $(this), $("#nodeWaring"), str, POP);
        })

        function checkNode() {
            var str = _.trim($("#node").val());
            myHappyHomeUpgradeService.showEmptyError(str,
                $("#nodeWaring"), $("#node"))
        }


        // 商城密码失去焦点
        $("#mallPassWord").blur(function () {
            var str = _.trim($(this).val());
            console.log(str);
            var pattern = /^[A-Z a-z \d ]{6,16}$/;
            if (myHappyHomeUpgradeService.showEmptyError(str,
                    $("#mallPassWordWaring"), $("#mallPassWord"))) {
                return;
            }
            if (!pattern.test(str)) {
                myHappyHomeUpgradeService.showError($("#mallPassWordWaring"), $("#mallPassWord"), "输入的格式有误请重新输入");
            } else {
                var user = $scope.userArray[$scope.index];

                if (user.flag == undefined) {
                    user.PASSWORD = str;
                    return;
                }
                user.flag = $scope.index;
                if ($scope.index != 0) {
                    user.PASSWORD = str;
                    return;
                }
                // 输入完成赋值给其他的输入项
                for (var i = 0; i < $scope.userArray.length; i++) {
                    var info = $scope.userArray[i];
                    if (info.flag == 0) {
                        info.PASSWORD = str;
                    }
                }

                for (var i = 0; i < $scope.userArray.length; i++) {
                    var info = $scope.userArray[i];
                    console.log(1111111);
                    console.log(info.PASSWORD);
                }
            }

        });


        function checkMallPassWord() {
            var str = _.trim($("#mallPassWord").val());
            var pattern = /^[A-Z a-z \d ]{6,16}$/;
            if (myHappyHomeUpgradeService.showEmptyError(str,
                    $("#mallPassWordWaring"), $("#mallPassWord"))) {
                return;
            }
            if (!pattern.test(str)) {
                myHappyHomeUpgradeService.showError($("#mallPassWordWaring"), $("#mallPassWord"), "输入的格式有误请重新输入");
            }
        }

        // 二级密码失去焦点
        $("#secondPassWord").blur(function () {
            var str = _.trim($(this).val());
            var pattern = /^[A-Z a-z \d ]{6,16}$/;
            if (myHappyHomeUpgradeService.showEmptyError(str,
                    $("#secondPassWordWaring"), $("#secondPassWord"))) {
                return;
            }
            if (!pattern.test(str)) {
                myHappyHomeUpgradeService.showError($("#secondPassWordWaring"), $("#secondPassWord"), "输入的格式有误请重新输入");
            } else {

                var user = $scope.userArray[$scope.index];

                if (user.flag == undefined) {
                    user.SECOND_PASSWORD = str;
                    return;
                }
                user.flag = $scope.index;
                if ($scope.index != 0) {
                    user.SECOND_PASSWORD = str;
                    return;
                }
                // 输入完成赋值给其他的输入项
                for (var i = 0; i < $scope.userArray.length; i++) {
                    var info = $scope.userArray[i];
                    if (info.flag == 0) {
                        info.SECOND_PASSWORD = str;
                    }
                }
            }
        });
        function checkSecondPassWord() {
            var str = $("#secondPassWord").val();
            var pattern = /^[A-Z a-z \d ]{6,16}$/;
            if (myHappyHomeUpgradeService.showEmptyError(str,
                    $("#secondPassWordWaring"), $("#secondPassWord"))) {
                return;
            }
            if (!pattern.test(str)) {
                myHappyHomeUpgradeService.showError($("#secondPassWordWaring"), $("#secondPassWord"), "输入的格式有误请重新输入");
            }
        }


        // 支付密码失去焦点
        $("#payPassWord").blur(function () {
            var str = $(this).val();
            var pattern = /^\d{6}$/;
            if (myHappyHomeUpgradeService.showEmptyError(str,
                    $("#payPassWordWaring"), $("#payPassWord")
                )) {
                return;
            }
            if (!pattern.test(str)) {
                myHappyHomeUpgradeService.showError(str, $("#payPassWordWaring"),
                    $("#payPassWord"), "输入的格式不正确");
            } else {

                var user = $scope.userArray[$scope.index];
                if (user.flag == undefined) {
                    user.THREE_PASSWORD = str;
                    return;
                }
                user.flag = $scope.index;
                if ($scope.index != 0) {
                    user.THREE_PASSWORD = str;
                    return;
                }
                // 输入完成赋值给其他的输入项
                for (var i = 0; i < $scope.userArray.length; i++) {
                    var info = $scope.userArray[i];
                    if (info.flag == 0) {
                        info.THREE_PASSWORD = str;
                    }
                }

            }
        });
        function checkPayPassWord() {
            var str = $("#payPassWord").val();
            var pattern = /^\d{6}$/;
            if (myHappyHomeUpgradeService.showEmptyError(str,
                    $("#payPassWordWaring"), $("#payPassWord")
                )) {
                return;
            }
            if (!pattern.test(str)) {
                myHappyHomeUpgradeService.showError(str, $("#payPassWordWaring"),
                    $("#payPassWord"), "输入的格式不正确");
            }
        }

        // 邮箱失去焦点
        $("#Email").blur(function () {
            var str = _.trim($(this).val());
            var pattern = /^([0-9A-Za-z\-_\.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$/g;
            if (myHappyHomeUpgradeService.showEmptyError(str,
                    $("#EmailWaring"), $("#Email")
                )) {
                return;
            }
            if (!pattern.test(str)) {
                myHappyHomeUpgradeService.showError($("#EmailWaring"), $("#Email"), "输入的格式不正确");
            } else {
                var user = $scope.userArray[$scope.index];
                user.flag = $scope.index;
                if (user.flag == undefined) {
                    user.email = str;
                    return;
                }
                if ($scope.index != 0) {
                    user.email = str;
                    return;
                }
                // 输入完成赋值给其他的输入项
                for (var i = 0; i < $scope.userArray.length; i++) {
                    var info = $scope.userArray[i];
                    if (info.flag == 0) {
                        info.email = str;
                    }
                }

            }
        });

        function checkEmail() {
            var str = $("#Email").val();
            var pattern = /^([0-9A-Za-z\-_\.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$/g;
            if (myHappyHomeUpgradeService.showEmptyError(str,
                    $("#EmailWaring"), $("#Email")
                )) {
                return;
            }
            if (!pattern.test(str)) {
                myHappyHomeUpgradeService.showError($("#EmailWaring"), $("#Email"), "输入的格式不正确");
            }
        }

        // 手机失去焦点
        $("#phone").blur(function () {
            var str = _.trim($(this).val());
            var pattern = /^\d{11}$/;
            if (myHappyHomeUpgradeService.showEmptyError(str,
                    $("#phoneWaring"), $("#phone")
                )) {
                return;
            }
            if (!pattern.test(str)) {
                myHappyHomeUpgradeService.showError($("#phoneWaring"), $("#phone"), "输入的格式不正确");
            } else {
                $("#phoneWaring").css('display', 'none');
                var user = $scope.userArray[$scope.index];
                if (user.flag == undefined) {
                    user.mobile_phone = str;
                    return;
                }
                user.flag = $scope.index;
                if ($scope.index != 0) {
                    user.mobile_phone = str;
                    return;
                }
                // 输入完成赋值给其他的输入项
                for (var i = 0; i < $scope.userArray.length; i++) {
                    var info = $scope.userArray[i];
                    if (info.flag == 0) {
                        info.mobile_phone = str;
                    }
                }

            }
        });
        function checkPhone() {
            var str = $("#phone").val();
            var pattern = /^\d{11}$/;
            if (myHappyHomeUpgradeService.showEmptyError(str,
                    $("#phoneWaring"), $("#phone")
                )) {
                return;
            }
            if (!pattern.test(str)) {
                myHappyHomeUpgradeService.showError($("#phoneWaring"), $("#phone"), "输入的格式不正确");
            }
            ;
        }

        // 姓名失去焦点
        $("#name").blur(function () {
            var str = _.trim($(this).val());
            if (myHappyHomeUpgradeService.showEmptyError(str,
                    $("#nameWaring"), $("#name"))) {
                return;
            }
            var user = $scope.userArray[$scope.index];
            if (user.flag == undefined) {
                user.MEMBER_NAME = str;
                return;
            }
            user.flag = $scope.index;
            if ($scope.index != 0) {
                user.MEMBER_NAME = str;
                return;
            }
            // 输入完成赋值给其他的输入项
            for (var i = 0; i < $scope.userArray.length; i++) {
                var info = $scope.userArray[i];
                if (info.flag == 0) {
                    info.MEMBER_NAME = str;
                }
            }
        });
        function checkName() {
            var str = $("#name").val();
            if (myHappyHomeUpgradeService.showEmptyError(str,
                    $("#nameWaring"), $("#name"))) {
                return;
            }
        }

        //银行账号失去焦点
        $("#bankCardN").blur(function () {
            var str = _.trim($(this).val());
            var pattern = /^\d{19}$/;
            if (myHappyHomeUpgradeService.showEmptyError(str,
                    $("#bankCardNWaring"), $("#bankCardN"))) {
                return;
            }
            if (!pattern.test(str)) {
                myHappyHomeUpgradeService.showError($("#bankCardNWaring"), $("#bankCardN"), "输入的格式不正确");
            } else {
                $("#bankCardNWaring").css('display', 'none');
                var user = $scope.userArray[$scope.index];
                user.flag = $scope.index;
                if (user.flag == undefined) {
                    user.BANK_ACCOUNT = str;
                    return;
                }
                if ($scope.index != 0) {
                    user.BANK_ACCOUNT = str;
                    return;
                }
                // 输入完成赋值给其他的输入项
                for (var i = 0; i < $scope.userArray.length; i++) {
                    var info = $scope.userArray[i];
                    if (info.flag == 0) {
                        info.BANK_ACCOUNT = str;
                    }
                }

            }
        });

        function checkBanlCardN() {
            var str = $("#bankCardN").val();
            var pattern = /^\d{19}$/;
            if (myHappyHomeUpgradeService.showEmptyError(str,
                    $("#bankCardNWaring"), $("#bankCardN"))) {
                return;
            }
            if (!pattern.test(str)) {
                myHappyHomeUpgradeService.showError($("#bankCardNWaring"), $("#bankCardN"), "输入的格式不正确");
            }


        }

        //开户银行失去焦点
        $("#bank").blur(function () {
            var str = _.trim($(this).val());
            if (myHappyHomeUpgradeService.showEmptyError(str,
                    $("#bankWaring"), $("#bank"))) {
                return;
            }
            var user = $scope.userArray[$scope.index];
            user.flag = $scope.index;
            if (user.flag == undefined) {
                user.BANK_NAME = str;
            }
            if ($scope.index != 0) {
                user.bank = str;
                return;
            }
            // 输入完成赋值给其他的输入项
            for (var i = 0; i < $scope.userArray.length; i++) {
                var info = $scope.userArray[i];
                if (info.flag == 0) {
                    info.bank = str;
                }
            }
        });

        function checkBank() {
            var str = $("#bank").val();
            if (myHappyHomeUpgradeService.showEmptyError(str,
                    $("#bankWaring"), $("#bank"))) {
                return;
            }
        }

        //身份证号
        $("#identityCardN").blur(function () {
            var str = _.trim($(this).val());
            if (myHappyHomeUpgradeService.showEmptyError(str,
                    $("#identityCardNWaring"), $("#identityCardN"))) {
                return;
            }
            //验证身份证号
            if (!identityCardTest.test(str)) {
                myHappyHomeUpgradeService.showError($("#identityCardNWaring"), $("#identityCardN"), "您输入的格式不正确请重新输入");
                return;
            }
            // 服务端校验
            if (myHappyHomeUpgradeService.testIdentityCardN(str, POP)) return;
            var user = $scope.userArray[$scope.index];
            if (user.flag == undefined) {
                user.ID_CARD = str;
                return;
            }
            user.flag = $scope.index;
            if ($scope.index != 0) {
                user.ID_CARD = str;
                return;
            }
            // 输入完成赋值给其他的输入项
            for (var i = 0; i < $scope.userArray.length; i++) {
                var info = $scope.userArray[i];
                if (info.flag == 0) {
                    info.ID_CARD = str;
                }
            }

        });

        function checkIdentityCardN() {
            var str = $("#identityCardN").val();
            if (myHappyHomeUpgradeService.showEmptyError(str,
                    $("#identityCardNWaring"), $("#identityCardN"))) {
                return;
            }
            //验证身份证号
            if (!identityCardTest.test(str)) {
                myHappyHomeUpgradeService.showError($("#identityCardNWaring"), $("#identityCardN"), "您输入的格式不正确请重新输入");
                return;
            }

        }

        //开户姓名
        $("#cardName").blur(function () {
            var str = _.trim($(this).val());
            if (myHappyHomeUpgradeService.showEmptyError(str,
                    $("#cardNameWaring"), $("#cardName"))) {
                return;
            }
            var user = $scope.userArray[$scope.index];
            if (user.flag == undefined) {
                user.ACCOUNT_OWNER = str;
            }
            user.flag = $scope.index;
            if ($scope.index != 0) {
                user.ACCOUNT_OWNER = str;
                return;
            }
            // 输入完成赋值给其他的输入项
            for (var i = 0; i < $scope.userArray.length; i++) {
                var info = $scope.userArray[i];
                if (info.flag == 0) {
                    info.ACCOUNT_OWNER = str;
                }
            }

        });

        function checkCardName() {
            var str = $("#cardName").val();
            if (myHappyHomeUpgradeService.showEmptyError(str,
                    $("#cardNameWaring"), $("#cardName"))) {
                return;
            }
        }

        //开户支行
        $("#bankBranch").blur(function () {
            var str = _.trim($(this).val());
            if (myHappyHomeUpgradeService.showEmptyError(str,
                    $("#bankBranchWaring"), $("#bankBranch"))) {
                return;
            }
            var user = $scope.userArray[$scope.index];
            if (user.flag == undefined) {
                user.BANK_LOCATION = str;
            }
            user.flag = $scope.index;
            if ($scope.index != 0) {
                user.BANK_LOCATION = str;
                return;
            }
            // 输入完成赋值给其他的输入项
            for (var i = 0; i < $scope.userArray.length; i++) {
                var info = $scope.userArray[i];
                if (info.flag == 0) {
                    info.BANK_LOCATION = str;
                }
            }
        });
        function checkBankBranch() {
            var str = $("#bankBranch").val();
            if (myHappyHomeUpgradeService.showEmptyError(str,
                    $("#bankBranchWaring"), $("#bankBranch"))) {
                return;
            }
        }


        // 获取焦点
        $("#recommend").focus(function () {
            $("#recommendWaring").css('display', 'none');
            $(this).css({
                'height': '44px',
                'line-height': '44px',
            })
        });
        $("#node").focus(function () {
            $("#nodeWaring").css('display', 'none');
            $(this).css({
                'height': '44px',
                'line-height': '44px',
            })
        });
        $("#mallPassWord").focus(function () {
            $("#mallPassWordWaring").css('display', 'none');
            $(this).css({
                'height': '44px',
                'line-height': '44px',
            })
        });
        $("#payPassWord").focus(function () {
            $("#payPassWordWaring").css('display', 'none');
            $(this).css({
                'height': '44px',
                'line-height': '44px',
            })
        });
        $("#Email").focus(function () {
            $("#EmailWaring").css('display', 'none');
            $(this).css({
                'height': '44px',
                'line-height': '44px',
            })
        });
        $("#phone").focus(function () {
            $("#phoneWaring").css('display', 'none');
            $(this).css({
                'height': '44px',
                'line-height': '44px',
            })
        });
        $("#name").focus(function () {
            $("#nameWaring").css('display', 'none');
            $(this).css({
                'height': '44px',
                'line-height': '44px',
            })
        });
        $("#bankCardN").focus(function () {
            $("#bankCardNWaring").css('display', 'none');
            $(this).css({
                'height': '44px',
                'line-height': '44px',
            })
        });
        $("#bank").focus(function () {
            $("#bankWaring").css('display', 'none');
            $(this).css({
                'height': '44px',
                'line-height': '44px',
            })
        });
        $("#identityCardN").focus(function () {
            $("#identityCardNWaring").css('display', 'none');
            $(this).css({
                'height': '44px',
                'line-height': '44px',
            })
        });
        $("#cardName").focus(function () {
            $("#cardNameWaring").css('display', 'none');
            $(this).css({
                'height': '44px',
                'line-height': '44px',
            })
        });
        $("#bankBranch").focus(function () {
            $("#bankBranchWaring").css('display', 'none');
            $(this).css({
                'height': '44px',
                'line-height': '44px',
            })
        });


        // 省市地区
        // 选择地址
        $scope.chooseAddress = function () {
            new AddressSelect({
                resultBtnClick: function (result) {
                    var address = result.provinceName + "-" + result.cityName + "-" + result.areaName;
                    $("#address").val(address);
                    var user = $scope.userArray[$scope.index];
                    if (user.flag == undefined) {
                        user.BANK_STATE_ID = result.pid;
                        user.BANK_CITY_ID = result.cid;
                        user.BANK_DISTRICT_ID = result.aid;
                        return;
                    }
                    user.flag = $scope.index;
                    if ($scope.index != 0) {
                        user.BANK_STATE_ID = result.pid;
                        user.BANK_CITY_ID = result.cid;
                        user.BANK_DISTRICT_ID = result.aid;
                        return;
                    }
                    // 输入完成赋值给其他的输入项
                    for (var i = 0; i < $scope.userArray.length; i++) {
                        var info = $scope.userArray[i];
                        if (info.flag == 0) {
                            info.BANK_STATE_ID = result.pid;
                            info.BANK_CITY_ID = result.cid;
                            info.BANK_DISTRICT_ID = result.aid;
                        }
                    }

                }
            })
        }


        /**
         *  表单提交
         */
        $scope.submitUpGradeAction = function () {

            // 验证所有的输入项
            //一个一个验证
            checkRecommend();
            checkNode();
            checkMallPassWord();
            checkSecondPassWord();
            checkPayPassWord();
            checkEmail();
            checkName();
            checkPhone();
            checkBanlCardN();
            checkBank();
            checkIdentityCardN();
            checkCardName();
            checkBankBranch();
            if ($("#recommend").val() == null || $("#recommend").val() == "") {
                POP.Hint("推荐人不能为空，请检查");
                return;
            }
            if ($("#node").val() == null || $("#node").val() == "") {
                POP.Hint("节点人不能为空，请检查");
                return;
            }
            if ($("#selectResult").val() == null || $("#selectResult").val() == "") {
                POP.Hint("节点人节点不能为空，请检查");
                return;
            }
            if ($("#mallPassWord").val() == null || $("#mallPassWord").val() == "") {
                POP.Hint("商城密码不能为空，请检查");
                return;
            }
            if ($("#secondPassWord").val() == null || $("#secondPassWord").val() == "") {
                POP.Hint("二级密码不能为空，请检查");
                return;
            }
            if ($("#payPassWord").val() == null || $("#payPassWord").val() == "") {
                POP.Hint("支付密码不能为空，请检查");
                return;
            }
            if ($("#Email").val() == null || $("#Email").val() == "") {
                POP.Hint("邮箱不能为空，请检查");
                return;
            }
            if ($("#phone").val() == null || $("#phone").val() == "") {
                POP.Hint("手机号不能为空，请检查");
                return;
            }
            if ($("#name").val() == null || $("#name").val() == "") {
                POP.Hint("姓名不能为空，请检查");
                return;
            }
            if ($("#bankCardN").val() == null || $("#bankCardN").val() == "") {
                POP.Hint("银行账号不能为空，请检查");
                return;
            }
            if ($("#bank").val() == null || $("#bank").val() == "") {
                POP.Hint("开户银行不能为空，请检查");
                return;
            }
            if ($("#identityCardN").val() == null || $("#identityCardN").val() == "") {
                POP.Hint("身份证号不能为空，请检查");
                return;
            }
            if ($("#cardName").val() == null || $("#cardName").val() == "") {
                POP.Hint("开户姓名不能为空，请检查");
                return;
            }
            if ($("#bankBranch").val() == null || $("#bankBranch").val() == "") {
                POP.Hint("开户支行不能为空，请检查");
                return;
            }
            if ($("#address").val() == null || $("#address").val() == "") {
                POP.Hint("地址不能为空，请检查");
                return;
            }
            // 验证所有的user的字段
            for (var i = 0; i < $scope.userArray.length; i++) {
                var user = $scope.userArray[i];
                var userItem = null;
                for (userItem in user) {
                    if (user[userItem] == undefined || user[userItem] == null || user[userItem].length <= 0) {
                        POP.Hint("请确保所有输入项全部填写。");
                    }
                }
            }
            // 拼参数
            var array = [];
            for (var i = 0; i < $scope.userArray.length; i++) {
                var item = $scope.userArray[i];
                console.log(item.REGION);
                var user = {
                    "user_name": item.user_name,
                    "RECOMMENDED_MAN": item.RECOMMENDED_MAN,
                    "CONTACT_MAN": item.CONTACT_MAN,
                    "REGION": item.REGION,
                    "PASSWORD": item.PASSWORD,
                    "SECOND_PASSWORD": item.SECOND_PASSWORD,
                    "THREE_PASSWORD": item.THREE_PASSWORD,
                    "email": item.email,
                    "mobile_phone": item.mobile_phone,
                    "MEMBER_NAME": item.MEMBER_NAME,
                    "BANK_ACCOUNT": item.BANK_ACCOUNT,
                    "BANK_NAME": item.BANK_NAME,
                    "ID_CARD": item.ID_CARD,
                    "ACCOUNT_OWNER": item.ACCOUNT_OWNER,
                    "BANK_LOCATION": item.BANK_LOCATION,
                    "BANK_STATE_ID": item.BANK_STATE_ID,
                    "BANK_CITY_ID": item.BANK_CITY_ID,
                    "BANK_DISTRICT_ID": item.BANK_DISTRICT_ID

                }
                array.push(user);
            }


            var user_datas = {};

            for (var d in array[0]) {
                var arr = [];
                for (var s = 0; s < array.length; s++) {
                    //通过赋值
                    arr.push(array[s][d]);
                }
                user_datas[d] = arr;
            }

            console.log(user_datas);
            POP.StartLoading();
            HTTP.post(API.My.updateUserLogs, {
                "config_id": configId,
                "id": $scope.id,
                "user_data": user_datas,
            }, function (e, data) {
                console.log(e);
                console.log(data);
                POP.EndLoading();
                if (e) {
                    return;
                }
                // 跳转界面
                $state.go("tab.my-buyHappyHome", {
                    "configId": configId,
                    "id": $scope.id
                });
            })
        };
        // 选择区域
        $scope.selectRegion = function () {
            if ($scope.upGrade.click) {
                $("#RegionBox").css("display", "block");
            } else {
                $("#RegionBox").css("display", "none");
            }

        }

        // 选择银行
        $("#selectBank").click(function () {
            $("#BankBox").fadeIn(300);
        })

    }

    /*给构造函数添加$inject属性,添加注入的服务*/
    ctrl.$inject = ['$scope', 'myHappyHomeUpgradeService', 'POP', '$state', '$stateParams', '$ionicScrollDelegate'];

    /*动态注册控制器*/
    app.registerController('myHappyHomeUpgradeController', ctrl);
})
;