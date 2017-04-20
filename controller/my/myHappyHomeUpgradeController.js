/**
 * Created by ShareLock on 2017/4/14.
 * 喜乐之家升级的Controller
 */


define(['app', './Fun/identityCardTest', 'css! ../../../css/my/my-happyHomeUpgrade', 'addressSelect'], function (app, identityCardTest) {
    function ctrl($scope, myHappyHomeUpgradeService, POP, $state, $stateParams) {

        $scope.userArray = [];
        $scope.upGrade = {};
        $scope.upGrade.click = false;
        $scope.index = 0;
        $scope.id = 0;
        $scope.upGrade.address = null;
        var configId = 0;
        $scope.$on('$ionicView.loaded', function () {
            configId = $stateParams.configId;
            console.log("configId" + configId);
            //获取数据
            myHappyHomeUpgradeService.getMyHappyHomeUpgradeInfo($scope, configId, POP);

            $scope.showUser = function (index) {
                myHappyHomeUpgradeService.showUserGrade($scope, index);
            }


        });


        $('#abc1').click(function () {
            $(this).css('color', '#D39AC5');
            $('#abc2').css('color', 'black');
            $('#selectResult').val("左区");
            var user = $scope.userArray[0];
            user.region = "左区";
            console.log("左区");
        });

        $("#abc2").click(function () {
            $(this).css('color', '#D39AC5');
            $('#abc1').css('color', 'black');
            $('#selectResult').val("右区");
            var user = $scope.userArray[0];
            user.region = "右区";
            console.log("右区");
        });

        $('#a').click(function () {
            $(this).css('color', '#D39AC5');
            $('#b').css('color', 'black');
            $('#c').css('color', 'black');
            $('#bank').val($(this).text());
        });
        $("#b").click(function () {
            $(this).css('color', '#D39AC5');
            $('#a').css('color', 'black');
            $('#c').css('color', 'black');
            $('#bank').val($(this).text());
        });
        $("#c").click(function () {
            $(this).css('color', '#D39AC5');
            $('#a').css('color', 'black');
            $('#b').css('color', 'black');
            $('#bank').val($(this).text());
        });
        // 关闭选择区域的弹框
        $scope.closepop = function () {
            $(".popRegionBox").hide();
        }

        // 推荐人失去焦点
        $("#recommend").blur(function () {
            var str = $(this).val().trim();
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
            var str = $("#recommend").val().trim();
            myHappyHomeUpgradeService.showEmptyError(str,
                $("#recommendWaring"), $("#recommend"))
            return;
        }

        // 节点人失去焦点
        $("#node").blur(function () {
            var str = $(this).val().trim();
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
            var str = $("#node").val().trim();
            myHappyHomeUpgradeService.showEmptyError(str,
                $("#nodeWaring"), $("#node"))
        }

        // 节点失去焦点
        $("#selectResult").blur(function () {
            var text = $(this).val();
            text = _.trim(text);
            console.log(text);
            if (text != "") {
                // 查找节点人
                myHappyHomeUpgradeService.searchUserDetail(text, $scope, POP);
            }
        });
        // 商城密码失去焦点
        $("#mallPassWord").blur(function () {
            var str = $(this).val().trim();
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
                user.flag = $scope.index;
                if ($scope.index != 0) {
                    user.mallPassWord = str;
                    return;
                }
                // 输入完成赋值给其他的输入项
                for (var i = 0; i < $scope.userArray.length; i++) {
                    var info = $scope.userArray[i];
                    if (info.flag == 0) {
                        info.mallPassWord = str;
                    }
                }

            }

        });


        function checkMallPassWord() {
            var str = $("#mallPassWord").val().trim();
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
            var str = $(this).val();
            var pattern = /^[A-Z a-z \d ]{6,16}$/;
            if (myHappyHomeUpgradeService.showEmptyError(str,
                    $("#secondPassWordWaring"), $("#secondPassWord"))) {
                return;
            }
            if (!pattern.test(str)) {
                myHappyHomeUpgradeService.showError($("#secondPassWordWaring"), $("#secondPassWord"), "输入的格式有误请重新输入");
            } else {
                $("#secondPassWordWaring").css('display', 'none');
                var user = $scope.userArray[$scope.index];
                user.flag = $scope.index;
                if ($scope.index != 0) {
                    user.secondPassWord = str;
                    return;
                }
                // 输入完成赋值给其他的输入项
                for (var i = 0; i < $scope.userArray.length; i++) {
                    var info = $scope.userArray[i];
                    if (info.flag == 0) {
                        info.secondPassWord = str;
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
                $("#payPassWordWaring").css('display', 'none');
                var user = $scope.userArray[$scope.index];
                user.flag = $scope.index;
                if ($scope.index != 0) {
                    user.payPassword = str;
                    return;
                }
                // 输入完成赋值给其他的输入项
                for (var i = 0; i < $scope.userArray.length; i++) {
                    var info = $scope.userArray[i];
                    if (info.flag == 0) {
                        info.payPassword = str;
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
            var str = $(this).val();
            var pattern = /^([0-9A-Za-z\-_\.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$/g;
            if (myHappyHomeUpgradeService.showEmptyError(str,
                    $("#EmailWaring"), $("#Email")
                )) {
                return;
            }
            if (!pattern.test(str)) {
                myHappyHomeUpgradeService.showError($("#EmailWaring"), $("#Email"), "输入的格式不正确");
            } else {
                $("#EmailWaring").css('display', 'none');
                var user = $scope.userArray[$scope.index];
                user.flag = $scope.index;
                if ($scope.index != 0) {
                    user.Email = str;
                    return;
                }
                // 输入完成赋值给其他的输入项
                for (var i = 0; i < $scope.userArray.length; i++) {
                    var info = $scope.userArray[i];
                    if (info.flag == 0) {
                        info.Email = str;
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
            var str = $(this).val();
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
                user.flag = $scope.index;
                if ($scope.index != 0) {
                    user.phone = str;
                    return;
                }
                // 输入完成赋值给其他的输入项
                for (var i = 0; i < $scope.userArray.length; i++) {
                    var info = $scope.userArray[i];
                    if (info.flag == 0) {
                        info.phone = str;
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
            var str = $(this).val();
            if (myHappyHomeUpgradeService.showEmptyError(str,
                    $("#nameWaring"), $("#name"))) {
                return;
            }
            var user = $scope.userArray[$scope.index];
            user.flag = $scope.index;
            if ($scope.index != 0) {
                user.name = str;
                return;
            }
            // 输入完成赋值给其他的输入项
            for (var i = 0; i < $scope.userArray.length; i++) {
                var info = $scope.userArray[i];
                if (info.flag == 0) {
                    info.name = str;
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
            var str = $(this).val();
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
                if ($scope.index != 0) {
                    user.bankNum = str;
                    return;
                }
                // 输入完成赋值给其他的输入项
                for (var i = 0; i < $scope.userArray.length; i++) {
                    var info = $scope.userArray[i];
                    if (info.flag == 0) {
                        info.bankNum = str;
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
            var str = $(this).val();
            if (myHappyHomeUpgradeService.showEmptyError(str,
                    $("#bankWaring"), $("#bank"))) {
                return;
            }
            var user = $scope.userArray[$scope.index];
            user.flag = $scope.index;
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
            var str = $(this).val();
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
            user.flag = $scope.index;
            if ($scope.index != 0) {
                user.carId = str;
                return;
            }
            // 输入完成赋值给其他的输入项
            for (var i = 0; i < $scope.userArray.length; i++) {
                var info = $scope.userArray[i];
                if (info.flag == 0) {
                    info.carId = str;
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
            var str = $(this).val();
            if (myHappyHomeUpgradeService.showEmptyError(str,
                    $("#cardNameWaring"), $("#cardName"))) {
                return;
            }
            var user = $scope.userArray[$scope.index];
            user.flag = $scope.index;
            if ($scope.index != 0) {
                user.bankCardName = str;
                return;
            }
            // 输入完成赋值给其他的输入项
            for (var i = 0; i < $scope.userArray.length; i++) {
                var info = $scope.userArray[i];
                if (info.flag == 0) {
                    info.bankCardName = str;
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
            var str = $(this).val();
            if (myHappyHomeUpgradeService.showEmptyError(str,
                    $("#bankBranchWaring"), $("#bankBranch"))) {
                return;
            }
            var user = $scope.userArray[$scope.index];
            user.flag = $scope.index;
            if ($scope.index != 0) {
                user.bankBranch = str;
                return;
            }
            // 输入完成赋值给其他的输入项
            for (var i = 0; i < $scope.userArray.length; i++) {
                var info = $scope.userArray[i];
                if (info.flag == 0) {
                    info.bankBranch = str;
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
                    user.flag = $scope.index;
                    if ($scope.index != 0) {
                        user.address = result;
                        return;
                    }
                    // 输入完成赋值给其他的输入项
                    for (var i = 0; i < $scope.userArray.length; i++) {
                        var info = $scope.userArray[i];
                        if (info.flag == 0) {
                            info.address = result;
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
            // 验证所有的user的字段
            for (var i = 0; i < $scope.userArray.length; i++) {
                var user = $scope.userArray[i];
                var userItem = null;
                for (userItem in user) {
                    if (user[userItem] == null || user[userItem].length <= 0) {
                        POP.Hint("请确保所有输入项全部填写。");
                    }
                }
            }
            // 拼参数
            var array = [];
            for (var i = 0; i < $scope.userArray.length; i++) {
                var item = $scope.userArray[i];
                var region;
                if (item.region == "左区") {
                    region = 0;
                } else if (item.region == "右区") {
                    region = 1;
                }
                var user = {
                    "user_name": item.user_name,
                    "RECOMMENDED_MAN": item.recommendP,
                    "CONTACT_MAN": item.nodeP,
                    "REGION": region,
                    "PASSWORD": item.mallPassWord,
                    "SECOND_PASSWORD": item.secondPassWord,
                    "THREE_PASSWORD": item.payPassword,
                    "email": item.Email,
                    "mobile_phone": item.phone,
                    "MEMBER_NAME": item.name,
                    "BANK_ACCOUNT": item.bankNum,
                    "BANK_NAME": "1",
                    "ID_CARD": item.carId,
                    "ACCOUNT_OWNER": item.bankCardName,
                    "BANK_LOCATION": item.bankBranch,
                    "BANK_STATE_ID": item.address.pid,
                    "BANK_CITY_ID": item.address.cid,
                    "BANK_DISTRICT_ID": item.address.aid

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
            POP.StartLoading();
            HTTP.post(API.My.updateUserLogs, {
                "config_id": configId,
                "id": $scope.id,
                "user_data": user_datas,
            }, function (e, data) {
                POP.EndLoading();
                if (e) {
                    return;
                }
                // 跳转界面
                $state.go("tab.my-happyHomeLogs");
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
        $scope.selectBank = function () {
            $("#BankBox").css("display", "block");
        }


    }

    /*给构造函数添加$inject属性,添加注入的服务*/
    ctrl.$inject = ['$scope', 'myHappyHomeUpgradeService', 'POP', '$state', '$stateParams'];

    /*动态注册控制器*/
    app.registerController('myHappyHomeUpgradeController', ctrl);
})
;