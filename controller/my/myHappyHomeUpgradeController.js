define(['app', './Fun/identityCardTest', './Fun/tagAnimateFun', 'css! ../../../css/my/my-happyHomeUpgrade', 'addressSelect'], function (app, identityCardTest, tagAnimateFun) {
    function ctrl($scope, myHappyHomeUpgradeService, POP, $state, $stateParams, $ionicScrollDelegate) {
        $(".mytab").find(".tab-title").css("color", "#000000");
        $(".myIcon").find(".tab-title").css("color", "#D9A8CD");
        $scope.userArray = [];
        $scope.upGrade = {};
        $scope.upGrade.click = false;
        dex = 0;
        $scope.id = 0;
        $scope.upGrade.address = null;
        $scope.showRight = false;
        $scope.left = -1;
        $scope.right = -1;
        var configId = 0;
        $scope.showAnimate = false;
        $scope.bankList = null;

        $scope.titleName = $stateParams.barTitle;
        $.initAppStartLoad();
        $scope.$on('$ionicView.enter', function () {
            configId = $stateParams.configId;
            //获取银行
            myHappyHomeUpgradeService.getBankList($scope);
            //获取数据
            myHappyHomeUpgradeService.getMyHappyHomeUpgradeInfo($scope, configId, POP, tagAnimateFun, $ionicScrollDelegate);
        });
        $scope.$on('$ionicView.leave', function () {
            if ($scope.showAnimate) {
                tagAnimateFun.clear();
            }
        });


        $scope.showLeftOrRight = function () {
            tagAnimateFun.showLeftOrRight($scope, $ionicScrollDelegate);
        };
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
            myHappyHomeUpgradeService.showUserGrade($scope, index, $ionicScrollDelegate);
        }
        $scope.backClick = function () {
            POP.Confirm("是否放弃当前操作？", function () {
                },
                "放弃", "继续编辑", function () {
                    $state.go("tab.my-happyHomeList", {});
                });
        };

        $scope.reset = function () {
            POP.Confirm("是否清除所有的用户信息？", function () {
                },
                "清除", "不清除", function () {
                    // 清楚用户的所有信息
                    for (var i = 0; i < $scope.userArray.length; i++) {
                        if (i == 0) {
                            $scope.userArray[i].RECOMMENDED_MAN = null;
                            //节点人
                            $scope.userArray[i].CONTACT_MAN = null;
                            // 区域
                            $scope.userArray[i].REGION = null;
                        }
                        //商城密码
                        $scope.userArray[i].PASSWORD = null;
                        //二级密码
                        $scope.userArray[i].SECOND_PASSWORD = null;
                        //支付密码
                        $scope.userArray[i].THREE_PASSWORD = null;
                        //Email
                        $scope.userArray[i].email = null;
                        //手机
                        $scope.userArray[i].mobile_phone = null;
                        //姓名
                        $scope.userArray[i].MEMBER_NAME = null;
                        //银行账号
                        $scope.userArray[i].BANK_ACCOUNT = null;
                        //开户银行
                        $scope.userArray[i].BANK_NAME = null;
                        //身份证号
                        $scope.userArray[i].ID_CARD = null;
                        //开户姓名
                        $scope.userArray[i].ACCOUNT_OWNER = null;
                        // 开户支行
                        $scope.userArray[i].BANK_LOCATION = null;
                        //省市地区
                        $scope.userArray[i].BANK_STATE_ID = null;
                        $scope.userArray[i].BANK_CITY_ID = null;
                        $scope.userArray[i].BANK_DISTRICT_ID = null;
                        //标记
                        $scope.userArray[i].flag = 0;
                    }

                    myHappyHomeUpgradeService.showUserGrade($scope, dex);
                });

        }


        // POP消失
        $(document).on("click", $(".popup-container").prev(), function () {
            POP.Close();
            return false;
        });

        // 选择银行
        $("#selectBank").click(function () {
            if ($scope.bankList == null) {
                POP.Hint("未获取银行信息，请刷新页面");
            } else {
                myHappyHomeUpgradeService.showBankPOP($scope, POP);
            }
            return false;
        })

        // 选择节点
        $(document).on("click", "#selectResultBox", function () {
            if ($scope.upGrade.click) {
                myHappyHomeUpgradeService.showNodePOP(POP);
            }
            return false;
        })

        /**
         * 银行列表的点击事件
         */
        $(document).on("click", ".bankName", function () {
            var bankName = $(this).text();
            console.log(bankName);
            $(".bankName").css("color", "black");
            $(this).css("color", "#D39AC5");
            $('#bank').text(bankName);
            var user = $scope.userArray[dex];
            if (user.flag == undefined) {
                user.BANK_NAME = bankName;
                return;
            }
            user.flag = dex;
            if (dex != 0) {
                user.BANK_NAME = bankName;
                return;
            }
            //    // 输入完成赋值给其他的输入项
            for (var i = 0; i < $scope.userArray.length; i++) {
                var info = $scope.userArray[i];
                if (info.flag == 0) {
                    console.log(999999999)
                    info.BANK_NAME = bankName;
                }
                console.log(info);
            }
            // POP 消失
            POP.Close();
            return false;

        });

        // 左区
        $(document).on("click", "#nodeLeft", function () {
            if ($scope.left == 0) {
                $(this).css('color', '#D39AC5');
                $('#nodeRight').css('color', 'black');
                $('#selectResult').val("左区");
                $scope.userArray[0].REGION = 0;
            } else {
                POP.Alert("左区不可用");
            }
            POP.Close();
            return false;
        })

        //右区
        $(document).on("click", "#nodeRight", function () {
            if ($scope.right == 0) {
                $(this).css('color', '#D39AC5');
                $('#nodeLeft').css('color', 'black');
                $('#selectResult').val("右区");
                $scope.userArray[0].REGION = 1;
            } else {
                POP.Alert("右区不可用");
            }
            POP.Close();
            return false;
        })


        // 推荐人失去焦点
        $(document).on("blur", "#recommend", function () {
            var str = _.trim($(this).val());
            console.log(dex)
            if (dex > 0) {
                return;
            }
            console.log(dex);
            console.log("-------------");
            if (myHappyHomeUpgradeService.showEmptyError(str,
                    $("#recommendWaring"), $("#recommend"))) {
                return;
            }

            console.log(121212121212);
            var pattern = /^[A-Za-z0-9_]+$/;

            if (!pattern.test(str)) {
                myHappyHomeUpgradeService.showError($("#recommendWaring"), "输入的格式有误请重新输入");
            } else {

                myHappyHomeUpgradeService.checkingRecommendedMan($scope, $(this), $("#recommendWaring"), str, POP);
            }


        });
        function checkRecommend() {
            var str = _.trim($("#recommend").val());
            myHappyHomeUpgradeService.showEmptyError(str,
                $("#recommendWaring"), $("#recommend"))
            return;
        }

        // 节点人失去焦点
        $(document).on("blur", "#node", function () {
            var str = _.trim($(this).val());
            if (dex > 0) {
                return;
            }
            console.log(dex);
            console.log("-------------");
            if (myHappyHomeUpgradeService.showEmptyError(str,
                    $("#nodeWaring"), $("#node"))) {
                return;
            }

            var pattern = /^[A-Za-z0-9_]+$/;

            if (!pattern.test(str)) {
                myHappyHomeUpgradeService.showError($("#nodeWaring"), "输入的格式有误请重新输入");
            } else {
                myHappyHomeUpgradeService.checkingNodeMan($scope, $(this), $("#nodeWaring"), str, POP);
            }

        })
        function checkNode() {
            var str = _.trim($("#node").val());
            myHappyHomeUpgradeService.showEmptyError(str,
                $("#nodeWaring"), $("#node"))
        }

        // 商城密码失去焦点
        $(document).on("input propertychange blur", "#mallPassWord", function () {
            var str = _.trim($(this).val());
            var pattern = /^[A-Z a-z \d ]{6,16}$/;
            if (myHappyHomeUpgradeService.showEmptyError(str,
                    $("#mallPassWordWaring"), $("#mallPassWord"))) {
                return;
            }
            if (!pattern.test(str)) {
                myHappyHomeUpgradeService.showError($("#mallPassWordWaring"), "输入的格式有误请重新输入");
            } else {
                $("#mallPassWordWaring").css('display', 'none');
                var user = $scope.userArray[dex];
                console.log(12312312313);
                console.log(user.flag);
                if (user.flag == undefined) {
                    $scope.userArray[dex].PASSWORD = str;
                    return;
                }
                user.flag = dex;
                if (dex != 0) {
                    $scope.userArray[dex].PASSWORD = str;
                    return;
                }
                // 输入完成赋值给其他的输入项
                for (var i = 0; i < $scope.userArray.length; i++) {
                    var info = $scope.userArray[i];
                    if (info.flag == 0) {
                        $scope.userArray[i].PASSWORD = str;
                    }
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
                myHappyHomeUpgradeService.showError($("#mallPassWordWaring"), "输入的格式有误请重新输入");
            }
        }

        // 二级密码失去焦点
        $(document).on("input propertychange blur", "#secondPassWord", function () {
            var str = _.trim($(this).val());
            var pattern = /^[A-Z a-z \d ]{6,16}$/;
            if (myHappyHomeUpgradeService.showEmptyError(str,
                    $("#secondPassWordWaring"), $("#secondPassWord"))) {
                return;
            }
            if (!pattern.test(str)) {
                myHappyHomeUpgradeService.showError($("#secondPassWordWaring"), "输入的格式有误请重新输入");
            } else {
                $("#secondPassWordWaring").css('display', 'none');
                var user = $scope.userArray[dex];

                if (user.flag == undefined) {
                    $scope.userArray[dex].SECOND_PASSWORD = str;
                    return;
                }
                user.flag = dex;
                if (dex != 0) {
                    $scope.userArray[dex].SECOND_PASSWORD = str;
                    return;
                }
                // 输入完成赋值给其他的输入项
                for (var i = 0; i < $scope.userArray.length; i++) {
                    var info = $scope.userArray[i];
                    if (info.flag == 0) {
                        $scope.userArray[i].SECOND_PASSWORD = str;
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
                myHappyHomeUpgradeService.showError($("#secondPassWordWaring"), "输入的格式有误请重新输入");
            }
        }

        // 支付密码失去焦点
        $(document).on("input propertychange blur", "#payPassWord", function () {
            var str = $(this).val();
            var pattern = /^\d{6}$/;
            if (myHappyHomeUpgradeService.showEmptyError(str,
                    $("#payPassWordWaring"), $("#payPassWord")
                )) {
                return;
            }
            if (!pattern.test(str)) {
                myHappyHomeUpgradeService.showError($("#payPassWordWaring"), "输入的格式不正确");
            } else {
                $("#payPassWordWaring").css('display', 'none');
                var user = $scope.userArray[dex];
                if (user.flag == undefined) {
                    $scope.userArray[dex].THREE_PASSWORD = str;
                    return;
                }
                user.flag = dex;
                if (dex != 0) {
                    $scope.userArray[dex].THREE_PASSWORD = str;
                    return;
                }
                // 输入完成赋值给其他的输入项
                for (var i = 0; i < $scope.userArray.length; i++) {
                    var info = $scope.userArray[i];
                    if (info.flag == 0) {
                        $scope.userArray[i].THREE_PASSWORD = str;
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
                myHappyHomeUpgradeService.showError(str, $("#payPassWordWaring"), "输入的格式不正确");
            }
        }

        // 邮箱失去焦点
        $(document).on("input propertychange blur", "#Email", function () {
            //$("#Email").blur(function () {
            var str = _.trim($(this).val());
            var pattern = /^([0-9A-Za-z\-_\.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$/g;
            if (myHappyHomeUpgradeService.showEmptyError(str,
                    $("#EmailWaring"), $("#Email")
                )) {
                return;
            }
            if (!pattern.test(str)) {
                myHappyHomeUpgradeService.showError($("#EmailWaring"), "输入的格式不正确");
            } else {
                $("#EmailWaring").css('display', 'none');
                var user = $scope.userArray[dex];
                user.flag = dex;
                if (user.flag == undefined) {
                    $scope.userArray[dex].email = str;
                    return;
                }
                if (dex != 0) {
                    $scope.userArray[dex].email = str;
                    return;
                }
                // 输入完成赋值给其他的输入项
                for (var i = 0; i < $scope.userArray.length; i++) {
                    var info = $scope.userArray[i];
                    if (info.flag == 0) {
                        $scope.userArray[i].email = str;
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
                myHappyHomeUpgradeService.showError($("#EmailWaring"), "输入的格式不正确");
            }
        }

        // 手机失去焦点
        $(document).on("input propertychange blur", "#phone", function () {
            //$("#phone").blur(function () {
            var str = _.trim($(this).val());
            var pattern = /^\d{11}$/;
            if (myHappyHomeUpgradeService.showEmptyError(str,
                    $("#phoneWaring"), $("#phone")
                )) {
                return;
            }
            if (!pattern.test(str)) {
                myHappyHomeUpgradeService.showError($("#phoneWaring"), "输入的格式不正确");
            } else {
                $("#phoneWaring").css('display', 'none');
                var user = $scope.userArray[dex];
                if (user.flag == undefined) {
                    $scope.userArray[dex].mobile_phone = str;
                    return;
                }
                user.flag = dex;
                if (dex != 0) {
                    $scope.userArray[dex].mobile_phone = str;
                    return;
                }
                // 输入完成赋值给其他的输入项
                for (var i = 0; i < $scope.userArray.length; i++) {
                    var info = $scope.userArray[i];
                    if (info.flag == 0) {
                        $scope.userArray[i].mobile_phone = str;
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
                myHappyHomeUpgradeService.showError($("#phoneWaring"), "输入的格式不正确");
            }
            ;
        }

        // 姓名失去焦点
        $(document).on("input propertychange blur", "#name", function () {
            //$("#name").blur(function () {
            var str = _.trim($(this).val());
            if (myHappyHomeUpgradeService.showEmptyError(str,
                    $("#nameWaring"), $("#name"))) {
                return;
            }
            var user = $scope.userArray[dex];
            if (user.flag == undefined) {
                $scope.userArray[dex].MEMBER_NAME = str;
                return;
            }
            user.flag = dex;
            if (dex != 0) {
                $scope.userArray[dex].MEMBER_NAME = str;
                return;
            }
            // 输入完成赋值给其他的输入项
            for (var i = 0; i < $scope.userArray.length; i++) {
                var info = $scope.userArray[i];
                if (info.flag == 0) {
                    $scope.userArray[i].MEMBER_NAME = str;
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
        $(document).on("input propertychange blur", "#bankCardN", function () {
            //$("#bankCardN").blur(function () {
            var str = _.trim($(this).val());
            var pattern = /^\d{19}$/;
            if (myHappyHomeUpgradeService.showEmptyError(str,
                    $("#bankCardNWaring"), $("#bankCardN"))) {
                return;
            }
            if (!pattern.test(str)) {
                myHappyHomeUpgradeService.showError($("#bankCardNWaring"), "输入的格式不正确");
            } else {
                $("#bankCardNWaring").css('display', 'none');
                var user = $scope.userArray[dex];
                user.flag = dex;
                if (user.flag == undefined) {
                    $scope.userArray[dex].BANK_ACCOUNT = str;
                    return;
                }
                if (dex != 0) {
                    $scope.userArray[dex].BANK_ACCOUNT = str;
                    return;
                }
                // 输入完成赋值给其他的输入项
                for (var i = 0; i < $scope.userArray.length; i++) {
                    var info = $scope.userArray[i];
                    if (info.flag == 0) {
                        $scope.userArray[i].BANK_ACCOUNT = str;
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
                myHappyHomeUpgradeService.showError($("#bankWaring"), "输入的格式不正确");
            }


        }

        function checkBank() {
            if ($("#bank").text() == "--请选择银行--") {
                myHappyHomeUpgradeService.showError($("#bankCardNWaring"), "输入的格式不正确");
                return;
            }
        }


        //身份证号
        $(document).on("blur", "#identityCardN", function () {
            var str = _.trim($(this).val());
            if (myHappyHomeUpgradeService.showEmptyError(str,
                    $("#identityCardNWaring"), $("#identityCardN"))) {
                return;
            }
            //验证身份证号
            if (!identityCardTest.test(str)) {
                myHappyHomeUpgradeService.showError($("#identityCardNWaring"), "您输入的格式不正确请重新输入");
                return;
            }
            // 服务端校验
            myHappyHomeUpgradeService.testIdentityCardN(str, POP, function () {
                $("#bankCardNWaring").css('display', 'none');
                var user = $scope.userArray[dex];
                if (user.flag == undefined) {
                    $scope.userArray[dex].ID_CARD = str;
                    return;
                }
                user.flag = dex;
                if (dex != 0) {
                    $scope.userArray[dex].ID_CARD = str;
                    return;
                }
                // 输入完成赋值给其他的输入项
                for (var i = 0; i < $scope.userArray.length; i++) {
                    var info = $scope.userArray[i];
                    if (info.flag == 0) {
                        $scope.userArray[i].ID_CARD = str;
                    }
                }

            });


        });
        function checkIdentityCardN() {
            var str = $("#identityCardN").val();
            if (myHappyHomeUpgradeService.showEmptyError(str,
                    $("#identityCardNWaring"), $("#identityCardN"))) {
                return;
            }
            //验证身份证号
            if (!identityCardTest.test(str)) {
                myHappyHomeUpgradeService.showError($("#identityCardNWaring"), "您输入的格式不正确请重新输入");
                return;
            }

        }

        //开户姓名
        $(document).on("input propertychange blur", "#cardName", function () {
            var str = _.trim($(this).val());
            if (myHappyHomeUpgradeService.showEmptyError(str,
                    $("#cardNameWaring"), $("#cardName"))) {
                return;
            }
            var user = $scope.userArray[dex];
            if (user.flag == undefined) {
                $scope.userArray[dex].ACCOUNT_OWNER = str;
            }
            user.flag = dex;
            if (dex != 0) {
                $scope.userArray[dex].ACCOUNT_OWNER = str;
                return;
            }
            // 输入完成赋值给其他的输入项
            for (var i = 0; i < $scope.userArray.length; i++) {
                var info = $scope.userArray[i];
                if (info.flag == 0) {
                    $scope.userArray[i].ACCOUNT_OWNER = str;
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
        $(document).on("input propertychange blur", "#bankBranch", function () {
            var str = _.trim($(this).val());
            if (myHappyHomeUpgradeService.showEmptyError(str,
                    $("#bankBranchWaring"), $("#bankBranch"))) {
                return;
            }
            var user = $scope.userArray[dex];
            if (user.flag == undefined) {
                $scope.userArray[dex].BANK_LOCATION = str;
            }
            user.flag = dex;
            if (dex != 0) {
                $scope.userArray[dex].BANK_LOCATION = str;
                return;
            }
            // 输入完成赋值给其他的输入项
            for (var i = 0; i < $scope.userArray.length; i++) {
                var info = $scope.userArray[i];
                if (info.flag == 0) {
                    $scope.userArray[i].BANK_LOCATION = str;
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


        });
        $("#node").focus(function () {
            $("#nodeWaring").css('display', 'none');

        });
        $("#mallPassWord").focus(function () {
            $("#mallPassWordWaring").css('display', 'none');

        });
        $("#secondPassWord").focus(function () {
            $("#secondPassWordWaring").css('display', 'none');

        });
        $("#payPassWord").focus(function () {
            $("#payPassWordWaring").css('display', 'none');

        });
        $("#Email").focus(function () {
            $("#EmailWaring").css('display', 'none');

        });
        $("#phone").focus(function () {
            $("#phoneWaring").css('display', 'none');

        });
        $("#name").focus(function () {
            $("#nameWaring").css('display', 'none');

        });
        $("#bankCardN").focus(function () {
            $("#bankCardNWaring").css('display', 'none');

        });
        $("#bank").focus(function () {
            $("#bankWaring").css('display', 'none');

        });
        $("#identityCardN").focus(function () {
            $("#identityCardNWaring").css('display', 'none');

        });
        $("#cardName").focus(function () {
            $("#cardNameWaring").css('display', 'none');

        });
        $("#bankBranch").focus(function () {
            $("#bankBranchWaring").css('display', 'none');
        });

        // 省市地区
        // 选择地址
        $scope.chooseAddress = function () {
            new AddressSelect({
                resultBtnClick: function (result) {
                    var address = result.provinceName + "-" + result.cityName + "-" + result.areaName;
                    $("#address").val(address);
                    var user = $scope.userArray[dex];
                    if (user.flag == undefined) {
                        user.BANK_STATE_ID = result.pid;
                        user.BANK_CITY_ID = result.cid;
                        user.BANK_DISTRICT_ID = result.aid;
                        return;
                    }
                    user.flag = dex;
                    if (dex != 0) {
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
            checkCardName();
            checkBankBranch();
            checkIdentityCardN();
            // 验证推荐人 节点人 节点
            checking();

        };
        function checking() {
            var name = $scope.userArray[0].RECOMMENDED_MAN;
            console.log(name);
            POP.StartLoading();
            HTTP.get(API.My.recommendedManInfo + '/userName/' + name, {}, function (e, data) {
                console.log(111111111111);
                console.log(data);
                if (e) {
                    POP.EndLoading();
                    if (data != null) {
                        $("#recommendWaring").css('display', 'block');
                        $("#recommendWaring").html("<i class='icon ion-android-warning'></i>" + data);
                    }
                    POP.Hint("推荐人不可用");
                    return
                }

                var name = $scope.userArray[0].CONTACT_MAN;
                HTTP.get(API.My.recommendedManInfo + '/userName/' + name, {}, function (e, data) {
                    console.log(22222222222222222);
                    console.log(data);
                    if (e) {
                        POP.EndLoading();
                        if (data != null) {
                            $("#nodeWaring").css('display', 'block');
                            $("#nodeWaring").html("<i class='icon ion-android-warning'></i>" + data);
                        }
                        POP.Hint("节点人不可用");
                        return;
                    }
                    // 验证节点
                    var left = data.userInfo.LEFT_REGION_ID;
                    var right = data.userInfo.RIGHT_REGION_ID;
                    console.log($scope.userArray[0].REGION);
                    if ($scope.userArray[0].REGION == 0 && left != 0) {
                        POP.EndLoading();
                        POP.Alert("左区不可用");
                        return;
                    }
                    if ($scope.userArray[0].REGION == 1 && right != 0) {
                        POP.EndLoading();
                        POP.Alert("右区不可用");
                        return;
                    }
                    console.log($scope.userArray[0].ID_CARD);
                    var str = $scope.userArray[0].ID_CARD;
                    // 服务端验证身份证
                    myHappyHomeUpgradeService.testIdentityCardN(str, POP, function () {
                        // 开始提交

                        submitUpGrade();
                    }, function () {
                        POP.EndLoading();
                        POP.Hint("身份证不可用");
                        return;
                    });

                })
            });


        }


        function submitUpGrade() {
            if ($("#recommend").val() == null || $("#recommend").val() == "") {
                POP.EndLoading();
                POP.Hint("推荐人不能为空，请检查");
                return;
            }
            if ($("#node").val() == null || $("#node").val() == "") {
                POP.EndLoading();
                POP.Hint("节点人不能为空，请检查");
                return;
            }
            if ($("#selectResult").val() == null || $("#selectResult").val() == "") {
                POP.EndLoading();
                POP.Hint("节点人节点不能为空，请检查");
                return;
            }
            if ($("#mallPassWord").val() == null || $("#mallPassWord").val() == "") {
                POP.EndLoading();
                POP.Hint("商城密码不能为空，请检查");
                return;
            }
            if ($("#secondPassWord").val() == null || $("#secondPassWord").val() == "") {
                POP.EndLoading();
                POP.Hint("二级密码不能为空，请检查");
                return;
            }
            if ($("#payPassWord").val() == null || $("#payPassWord").val() == "") {
                POP.EndLoading();
                POP.Hint("支付密码不能为空，请检查");
                return;
            }
            if ($("#Email").val() == null || $("#Email").val() == "") {
                POP.EndLoading();
                POP.Hint("邮箱不能为空，请检查");
                return;
            }
            if ($("#phone").val() == null || $("#phone").val() == "") {
                POP.EndLoading();
                POP.Hint("手机号不能为空，请检查");
                return;
            }
            if ($("#name").val() == null || $("#name").val() == "") {
                POP.EndLoading();
                POP.Hint("姓名不能为空，请检查");
                return;
            }
            if ($("#bankCardN").val() == null || $("#bankCardN").val() == "") {
                POP.EndLoading();
                POP.Hint("银行账号不能为空，请检查");
                return;
            }
            if ($("#bank").text() == null || $("#bank").text() == "--请选择银行--") {
                POP.EndLoading();
                POP.Hint("开户银行不能为空，请检查");
                return;
            }
            if ($("#identityCardN").val() == null || $("#identityCardN").val() == "") {
                POP.EndLoading();
                POP.Hint("身份证号不能为空，请检查");
                return;
            }
            if ($("#cardName").val() == null || $("#cardName").val() == "") {
                POP.EndLoading();
                POP.Hint("开户姓名不能为空，请检查");
                return;
            }
            if ($("#bankBranch").val() == null || $("#bankBranch").val() == "") {
                POP.EndLoading();
                POP.Hint("开户支行不能为空，请检查");
                return;
            }
            if ($("#address").val() == null || $("#address").val() == "") {
                POP.EndLoading();
                POP.Hint("地址不能为空，请检查");
                return;
            }
            // 验证所有的user的字段

            for (var i = 0; i < $scope.userArray.length; i++) {
                var user = $scope.userArray[i];
                var userItem = null;
                for (userItem in user) {
                    if (user[userItem] == undefined || user[userItem] == null || user[userItem].length <= 0) {
                        POP.EndLoading();
                        POP.Hint("请确保所有输入项全部填写。");
                        return;
                    }
                }
            }
            // 拼参数
            var array = [];
            for (var i = 0; i < $scope.userArray.length; i++) {
                var item = $scope.userArray[i];
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
            HTTP.post(API.My.updateUserLogs, {
                "config_id": Number.parseInt(configId),
                "id": Number.parseInt($scope.id),
                "user_data": user_datas,
            }, function (e, data) {
                POP.EndLoading();
                if (e) {
                    if (data["1"] != null) {
                        POP.Confirm("提交失败请删除后再提交！", function () {
                            setTimeout(function () {
                                $state.go("tab.my-happyHomeLogs");
                            }, 1000);
                        }, "取消", "确认", function () {
                            POP.Hint("请删除后再提交！");
                        }, "操作提示");
                    } else if (data["3"] != null) {
                        POP.Hint(data["3"]);
                    } else if (data["4"] != null) {
                        POP.Hint(data["4"]);
                    } else if (data["5"] != null) {
                        POP.Hint(data["5"]);
                    } else if (data["6"] != null) {
                        POP.Hint(data["6"]);
                    } else {
                        POP.Hint("信息保存失败，请检查输入项");
                    }
                    return;
                }
                // 跳转界面

                POP.Hint("提交成功");
                setTimeout(function () {
                    $state.go("tab.my-buyHappyHome", {
                        "configId": configId,
                        "id": $scope.id
                    });
                }, 2000);


            })

        }


    }

    /*给构造函数添加$inject属性,添加注入的服务*/
    ctrl.$inject = ['$scope', 'myHappyHomeUpgradeService', 'POP', '$state', '$stateParams', '$ionicScrollDelegate'];

    /*动态注册控制器*/
    app.registerController('myHappyHomeUpgradeController', ctrl);
})
;