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
        $scope.showRight = false;
        var configId = 0;
        $scope.$on('$ionicView.enter', function () {
            configId = $stateParams.configId;
            //获取数据
            myHappyHomeUpgradeService.getMyHappyHomeUpgradeInfo($scope, configId, POP);

        });

        // 跳转到购物界面
        $scope.goToShopping = function () {
            if ($scope.goShopping == undefined) {
                return;
            }
            console.log(configId);
            console.log(44545454545);
            console.log($scope.id);
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

        // 节点失去焦点
        $("#selectResult").blur(function () {
            var text = _.trim($(this).val());
            console.log(text);
            if (text != "") {
                // 查找节点人
                myHappyHomeUpgradeService.searchUserDetail(text, $scope, POP);
            }
        });
        // 商城密码失去焦点
        $("#mallPassWord").blur(function () {
            var str = _.trim($(this).val());
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
                        user.address = address;
                        return;
                    }
                    user.flag = $scope.index;
                    if ($scope.index != 0) {
                        user.address = address;
                        return;
                    }
                    // 输入完成赋值给其他的输入项
                    for (var i = 0; i < $scope.userArray.length; i++) {
                        var info = $scope.userArray[i];
                        if (info.flag == 0) {
                            info.address = address;
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
                if (item.REGION == "左区") {
                    region = 0;
                } else if (item.REGION == "右区") {
                    region = 1;
                }

                var user = {
                    "user_name": item.user_name,
                    "RECOMMENDED_MAN": item.RECOMMENDED_MAN,
                    "CONTACT_MAN": item.CONTACT_MAN,
                    "REGION": region,
                    "PASSWORD": item.PASSWORD,
                    "SECOND_PASSWORD": item.SECOND_PASSWORD,
                    "THREE_PASSWORD": item.THREE_PASSWORD,
                    "email": item.email,
                    "mobile_phone": item.mobile_phone,
                    "MEMBER_NAME": item.MEMBER_NAME,
                    "BANK_ACCOUNT": item.BANK_ACCOUNT,
                    "BANK_NAME": "1",
                    "ID_CARD": item.ID_CARD,
                    "ACCOUNT_OWNER": item.ACCOUNT_OWNER,
                    "BANK_LOCATION": item.BANK_LOCATION,
                    //"BANK_STATE_ID": item.address.pid,
                    //"BANK_CITY_ID": item.address.cid,
                    //"BANK_DISTRICT_ID": item.address.aid
                    "address": "dsjafdksl"

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