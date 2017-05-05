/**
 * Created by ShareLock on 2017/4/14.
 * 喜乐之家升级的Service
 */
define(['app'], function (app) {

    app.factory("myHappyHomeUpgradeService", function () {

        var service = {};

        /***
         * 获取页面的初始信息
         * @param $scope
         * @param configId
         */
        service.getMyHappyHomeUpgradeInfo = function ($scope, configId, POP, tagAnimateFun) {

            var userName = User.getInfo().user_name;
            POP.StartLoading();
            HTTP.get(API.My.updateGradeHappyHome + "/config_id/" + configId + "/user_name/" + userName, {}, function (e, data) {
                POP.EndLoading()
                if (e) {
                    return;
                }
                var userdataArray = data.data.user_date;
                if (userdataArray != null) {
                    $scope.goShopping = "去购物";
                }
                var userdataList = JSON.parse(userdataArray);
                var userList = data.data.xlzj_user;
                $scope.id = data.data.id;
                var userNameArray = userList.split(",");
                if (userdataList != null) {
                    $scope.userArray = userdataList;
                    $scope.showRight = true;
                } else {
                    // 创建userArray.length个数组
                    for (var i = 0; i < userNameArray.length; i++) {
                        var user = {};
                        user.user_name = userNameArray[i];
                        if (i == 0) {

                            // 推荐人
                            user.RECOMMENDED_MAN = "";
                            //节点人
                            user.CONTACT_MAN = "";
                            // 区域
                            user.REGION = null;
                            createUser(user);
                            $scope.userArray.push(user);
                            continue;
                        }
                        // 确定左右区和节点人
                        if (i < 3) {
                            if (i % 2 == 0) {
                                user.REGION = 1;
                            } else if (i % 2 == 1) {
                                user.REGION = 0;
                            }
                            user.CONTACT_MAN = userNameArray[0];
                        } else {
                            if (i % 2 == 0) {
                                user.REGION = 1;
                                var b = (i - 2) / 2;
                                user.CONTACT_MAN = userNameArray[b];
                            } else if (i % 2 == 1) {
                                user.REGION = 0;
                                var b = (i - 1) / 2;
                                user.CONTACT_MAN = userNameArray[b];
                            }

                        }
                        // 推荐人
                        user.RECOMMENDED_MAN = userNameArray[0];
                        createUser(user);
                        $scope.userArray.push(user);
                    }
                }
                $scope.$apply(function () {
                    $scope.userNameArray = userNameArray;
                    $(".of_navBox").css('width', 120 * userNameArray.length + "px");
                    var width = $(document.body).width();
                    if (width < (120 * userNameArray.length + 10)) {
                        $scope.showAnimate = true;
                        tagAnimateFun.startTagAnimate();
                    } else {
                        $("#leftTag").css('display', 'none');
                        $("#rightTag").css('display', 'none');
                    }
                    service.showUserGrade($scope, 0);
                })

            });

        }

        /**
         * 点击Tab 切换页面
         * @param $scope
         * @param index
         */
        service.showUserGrade = function ($scope, index) {

            $(".of_nav").css("color", "#000000")
            $(".of_nav").eq(index).css("color", "#d39bc5");
            var info = $scope.userArray[index];
            console.log(info);
            $("#recommend").val(info.RECOMMENDED_MAN);
            $("#node").val(info.CONTACT_MAN);
            if (info.REGION == 0) {
                $("#selectResult").val("左区");
            } else if (info.REGION == 1) {
                $("#selectResult").val("右区");
            } else {
                $("#selectResult").val("--请选择--");
            }

            if (info.BANK_NAME == 1) {
                $("#bank").val("中国工商银行");
            } else if (info.BANK_NAME == 2) {
                $("#bank").val("中国农业银行");
            }
            if (info.BANK_NAME == 3) {
                $("#bank").val("中国建设银行");
            }
            $("#mallPassWord").val(info.PASSWORD);
            $("#secondPassWord").val(info.SECOND_PASSWORD);
            $("#payPassWord").val(info.THREE_PASSWORD);
            $("#Email").val(info.email);
            $("#phone").val(info.mobile_phone);
            $("#name").val(info.MEMBER_NAME);
            $("#bankCardN").val(info.BANK_ACCOUNT);
            //$("#bank").val(info.BANK_NAME);
            $("#identityCardN").val(info.ID_CARD);
            $("#cardName").val(info.ACCOUNT_OWNER);
            $("#bankBranch").val(info.BANK_LOCATION);
            if (info.BANK_STATE_ID != "") {
                var address = locationInfo.getAddressName(info.BANK_STATE_ID, info.BANK_CITY_ID, info.BANK_DISTRICT_ID);
                $("#address").val(address);
            }
            if (index > 0) {
                $("#recommend").attr("disabled", "true");
                $("#node").attr("disabled", "true");
                $("#selectResult").attr("disabled", "true");
                $(".waring").hide();
                $scope.upGrade.click = false;
            } else {
                $("#recommend").removeAttr("disabled");
                $("#node").removeAttr("disabled");
                $("#selectResult").removeAttr("disabled");
            }
            $scope.index = index;
        }


        /**
         *
         * @param str
         * @param elea   警告框
         * @param eleb   输入框
         * @returns {boolean}
         */
        service.showEmptyError = function (str, elea, eleb) {

            if (str == null || str == "") {

                service.showError(elea, eleb, "内容不能为空");
                return true;
            }
            return false;
        }

        /**
         *
         * @param elea 警告框
         * @param eleb 输入框
         * @param text 提示文字
         */
        service.showError = function (elea, eleb, text) {
            elea.css('display', 'block');
            eleb.css({
                'height': '34px',
                'line-height': '34px',
            });
            elea.html("<i class='icon ion-android-warning'></i> " + text);
        }


        // 验证推荐人流程
        service.checkingRecommendedMan = function ($scope, ele, eleNode, userName, POP) {
            POP.StartLoading();
            HTTP.get(API.My.recommendedManInfo + '/userName/' + userName, {}, function (e, data) {
                POP.EndLoading();
                if (e) {
                    if (data != null) {
                        service.showError(eleNode, ele, data);
                    }
                    return
                }
                //为user赋值
                $scope.userArray[0].RECOMMENDED_MAN = userName;

            });
        }

        //验证节点人流程
        service.checkingNodeMan = function ($scope, ele, eleNode, userName, POP) {
            // 请求个人信息
            // 判断 username  是否激活
            POP.StartLoading();
            HTTP.get(API.My.recommendedManInfo + '/userName/' + userName, {}, function (e, data) {
                POP.EndLoading();
                if (e) {
                    if (data != null) {
                        service.showError(eleNode, ele, data);
                    }
                    return;
                }
                //为user赋值
                $scope.userArray[0].CONTACT_MAN = userName;
                /**
                 * 让左右区域可以点击
                 */
                $scope.upGrade.click = true;
                $scope.left = data.userInfo.LEFT_REGION_ID;
                $scope.right = data.userInfo.RIGHT_REGION_ID;
            })
        }

        /**
         * 验证身份证号是否可用
         * @param str
         */
        service.testIdentityCardN = function (str, POP) {
            POP.StartLoading();
            HTTP.get(API.My.verifyIdentityCardN + "/id_card/" + str, {}, function (e, data) {
                POP.EndLoading();
                if (e) {
                    $("#identityCardNWaring").html("<i class='icon ion-android-warning'></i>" + "该身份证不可用");
                    return true;
                }
                return false;

            })

        }


        function createUser(user) {
            //商城密码
            user.PASSWORD = "";
            //二级密码
            user.SECOND_PASSWORD = "";
            //支付密码
            user.THREE_PASSWORD = "";
            //Email
            user.email = "";
            //手机
            user.mobile_phone = "";
            //姓名
            user.MEMBER_NAME = "";
            //银行账号
            user.BANK_ACCOUNT = "";
            //开户银行
            user.BANK_NAME = "";
            //身份证号
            user.ID_CARD = "";
            //开户姓名
            user.ACCOUNT_OWNER = "";
            // 开户支行
            user.BANK_LOCATION = "";
            //省市地区
            user.BANK_STATE_ID = "";
            user.BANK_CITY_ID = "";
            user.BANK_DISTRICT_ID = "";
            //标记
            user.flag = 0;
        }

        return service;


    });


});