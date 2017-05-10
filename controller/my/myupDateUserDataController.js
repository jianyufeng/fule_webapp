/**
 * Created by ShareLock on 2017/4/8.
 * 用户激活或者是升级是填写的用户资料Controller
 */

define(['app', './Fun/identityCardTest', "css! ../../../css/my/my-updateUserData", 'addressSelect'], function (app, identityCardTest) {
    function ctrl($scope, myUpdateUserDataService, POP, $stateParams, $state, $compile) {

        $scope.upGrade = {};
        $scope.upGrade.click = false;
        $scope.upGrade.address = {};
        $scope.left = -1;
        $scope.right = -1;
        var myGrade;

        function showEmptyError(str, elea, eleb) {
            if (str == null || str == "") {
                showError(elea, eleb, "内容不能为空");
                return true;
            }
            return false;
        }

        function showError(elea, eleb, text) {
            elea.css('display', 'block');
            eleb.css({
                'height': '44px',
                'line-height': '44px',
            });
            elea.html("<i class='icon ion-android-warning'></i>" + text);
        }

        function disappearError(eleInput, eleError) {
            eleError.css('display', 'none');
            eleInput.css({
                'height': '44px',
                'line-height': '44px',
            })
        }

        $scope.$on('$ionicView.loaded', function () {
            // 页面传值过来的要升级的级别
            myGrade = $stateParams.grade;

        });
        $('#abc1').click(function () {
            if ($scope.left == 0) {
                $(this).css('color', '#D39AC5');
                $('#abc2').css('color', 'black');
                $('#selectResult').val("左区");
            } else {
                POP.Alert("左区不可用");
            }
        });
        $("#abc2").click(function () {
            if ($scope.right == 0) {
                $(this).css('color', '#D39AC5');
                $('#abc1').css('color', 'black');
                $('#selectResult').val("右区");
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
            return false;
        });


        // 推荐人失去焦点事件
        $("#recommend").blur(function () {
            checkRecommend();
        });
        function checkRecommend() {
            var name = $("#recommend").val();
            name = _.trim(name)
            console.log(name);
            if (showEmptyError(name, $("#recommendWaring"), $("#recommend"))) {
                return;
            }
            // 验证推荐人
            myUpdateUserDataService.checkingRecommendedMan($scope, $("#recommend"), $("#recommendWaring"), name, POP);
        }

        // 节点人失去焦点事件
        $("#node").blur(function () {
            checkNode();
        });
        function checkNode() {
            var name = $("#node").val();
            name = _.trim(name);
            if (showEmptyError(name, $("#nodeWaring"), $("#node"))) {
                return;
            }
            // 验证节点人
            myUpdateUserDataService.checkingNodeMan($scope, $("#node"), $("#nodeWaring"), name, POP);
        }

        // 昵称失去焦点
        $("#name").blur(function () {
            checkNickName();
        })

        function checkNickName() {
            var name = $("#name").val();
            name = _.trim(name);
            if (showEmptyError(name, $("#nameWaring"), $("#name"))) {
                return;
            }
        }

        // 银行账号失去焦点事件
        $("#bankCardN").blur(function () {
            checkBankCardN();
        });

        function checkBankCardN() {
            var num = $("#bankCardN").val();
            var reg = /^\d{19}$/;
            if (showEmptyError(num, $("#bankCardNWaring"), $("#bankCardN"))) {
                return;
            }
            if (!reg.test(num)) {
                showError($("#bankCardNWaring"), $("#bankCardN"), "输入格式不正确请检查");
            }
        }

        // 开户银行失去焦点事件
        $("#bank").blur(function () {
            checkBank();
        });
        function checkBank() {
            var name = $("#bank").val();
            name = _.trim(name);
            if (showEmptyError(name, $("#bankWaring"), $("#bank"))) {
                return;
            }
        }

        // 身份证号失去焦点验证
        $("#identityCardN").blur(function () {
            checkIdentityCardN();
        });

        function checkIdentityCardN() {
            var num = $("#identityCardN").val();
            num = _.trim(num);
            if (showEmptyError(num, $("#identityCardNWaring"), $("#identityCardN")))
                return;
            if (!identityCardTest.test(num)) {
                showError($("#identityCardNWaring"), $("#identityCardN"), "身份证格式不正确请检查");
            }
        }

        // 开户银行失去焦点事件
        $("#bankCardName").blur(function () {
            checkBankCardName();
        });
        function checkBankCardName() {
            var name = $("#bankCardName").val();
            name = _.trim(name);
            if (showEmptyError(name, $("#bankCardNameWaring"), $("#bankCardName"))) {
                return;
            }
        }

        // 开户支行失去焦点事件
        $("#branchBank").blur(function () {
            checkBranchBank();
        });
        function checkBranchBank() {
            var name = $("#branchBank").val();
            name = _.trim(name);
            if (showEmptyError(name, $("#branchBankWaring"), $("#branchBank"))) {
                return;
            }
        }

        //推荐人获取焦点事件
        $("#recommend").focus(function () {
            disappearError($("#recommend"), $("#recommendWaring"));
            $scope.upGrade.team = "";
        });

        //节点人获取焦点事件
        $("#node").focus(function () {
            disappearError($("#node"), $("#nodeWaring"));
        });

        // 昵称获取焦点事件
        $("#name").focus(function () {
            disappearError($("#name"), $("#nameWaring"));
        });
        // 银行卡号获取焦点事件
        $("#bankCardN").focus(function () {
            disappearError($("#bankCardN"), $("#bankCardNWaring"));
        });
        // 开户银行获取焦点事件
        $("#bank").focus(function () {
            disappearError($("#bank"), $("#bankWaring"));
        });

        // 省份证号获取焦点事件
        $("#identityCardN").focus(function () {
            disappearError($("#identityCardN"), $("#identityCardNWaring"));
        });

        // 开户姓名获取焦点事件
        $("#bankCardName").focus(function () {
            disappearError($("#bankCardName"), $("#bankCardNameWaring"));
        });

        // 开户支行获取焦点事件
        $("#branchBank").focus(function () {
            disappearError($("#branchBank"), $("#branchBankWaring"));
        });

        function checkTeam() {
            if ($scope.upGrade.team == undefined || $scope.upGrade.team == "") {
                $("#teamWaring").css('display', 'block');
                $("#team").css({
                    'height': '44px',
                    'line-height': '44px',
                });
                $("#teamWaring").html("<i class='icon ion-android-warning'></i> " + "内容不能为空");
            }
        }

        // 点击提交按钮
        $scope.submitUpGradeAction = function () {

            // 串行操作
            checkTeam();
            checkNickName();
            checkBank();
            checkBankCardN();
            checkBankCardName();
            checkBranchBank();
            checkIdentityCardN();
            checking();
        }
         function checking() {
            var name = $("#recommend").val();
            name = _.trim(name);
             POP.StartLoading();
            HTTP.get(API.My.recommendedManInfo + '/userName/' + name, {}, function (e, data) {
               console.log(data);
                if (e) {
                    POP.EndLoading();
                    if (data != null) {
                        $("#recommendWaring").css('display', 'block');
                        $("#recommend").css({
                            'height': '44px',
                            'line-height': '44px',
                        });
                        $("#recommendWaring").html("<i class='icon ion-android-warning'></i>" + data);
                    }
                    return
                }

                var name = $("#node").val();
                name = _.trim(name);
                HTTP.get(API.My.recommendedManInfo + '/userName/' + name, {}, function (e, data) {
                    console.log(data);
                    if (e) {
                        POP.EndLoading();
                        if (data != null) {
                            $("#nodeWaring").css('display', 'block');
                            $("#node").css({
                                'height': '44px',
                                'line-height': '44px',
                            });
                            $("#nodeWaring").html("<i class='icon ion-android-warning'></i>" + data);
                        }
                        return;
                    }
                    myUpdateUserDataService.upGradeAction($scope, POP, myGrade, $state);

                })
            });


        }

        // 点击重置按钮
        $scope.reset = function () {
            myUpdateUserDataService.reset($scope);
        }
        // 选择区域
        $scope.selectRegion = function () {
            if ($scope.upGrade.click) {
                $("#RegionBox").css("display", "block");
            } else {
                $("#RegionBox").css("display", "none");
            }
        }

        // 关闭选择区域的弹框
        $scope.closepop = function () {
            $(".popRegionBox").css("display", "none");
        }

        // 选择银行
        $("#selectBank").click(function () {
            $("#BankBox").fadeIn(300);
        })

        // 选择地址
        $scope.chooseAddress = function () {
            new AddressSelect({
                resultBtnClick: function (result) {
                    var address = result.provinceName + "-" + result.cityName + "-" + result.areaName;
                    $scope.upGrade.address = result;
                    $("#address").val(address);
                }
            })
        }

    }


    /*给构造函数添加$inject属性,添加注入的服务*/
    ctrl.$inject = ['$scope', 'myUpdateUserDataService', 'POP', '$stateParams', '$state', '$compile',];

    /*动态注册控制器*/
    app.registerController("myUpdateUserDataController", ctrl);
});
