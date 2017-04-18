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
        service.getMyHappyHomeUpgradeInfo = function ($scope, configId, POP) {

            var userName = User.getInfo().user_name;
            POP.StartLoading();
            HTTP.get(API.My.updateGradeHappyHome + "/config_id/" + configId + "/user_name/" + "liweixuan001", {}, function (e, data) {
                POP.EndLoading()
                console.log(e);
                console.log(data);
                if (e) {
                    return;
                }
                var userList = data.data.xlzj_user;
                var userNameArray = userList.split(",");
                $scope.$apply(function () {
                    $scope.userNameArray = userNameArray;
                    $(".of_navBox").css('width', 120 * userNameArray.length + "px");
                    // 创建userArray.length个数组
                    for (var i = 0; i < userNameArray.length; i++) {
                        var user = {};
                        if (i == 0) {
                            // 推荐人
                            user.recommendP = "";
                            //节点人
                            user.nodeP = "";
                            // 区域
                            user.region = "";
                            //商城密码
                            user.mallPassWord = "";
                            //二级密码
                            user.secondPassWord = "";
                            //支付密码
                            user.payPassword = "";
                            //Email
                            user.Email = "";
                            //手机
                            user.phone = "";
                            //姓名
                            user.name = "";
                            //银行账号
                            user.bankNum = "";
                            //开户银行
                            user.bank = "";
                            //身份证号
                            user.carId = "";
                            //开户姓名
                            user.bankCardName = "";
                            // 开户支行
                            user.bankBranch = "";
                            //省市地区
                            user.address = "";
                            //标记
                            user.flag = 0;
                            $scope.userArray.push(user);
                            continue;
                        }
                        // 确定左右区和节点人
                        if (i < 3) {
                            if (i % 2 == 0) {
                                user.region = "右区";
                            } else if (i % 2 == 1) {
                                user.region = "左区";
                            }
                            user.nodeP = userNameArray[0];
                        } else {
                            if (i % 2 == 0) {
                                user.region = "右区";
                                var b = (i - 2) / 2;
                                user.nodeP = userNameArray[b];
                            } else if (i % 2 == 1) {
                                user.region = "左区";
                                var b = (i - 1) / 2;
                                user.nodeP = userNameArray[b];
                            }

                        }
                        // 推荐人
                        user.recommendP = userNameArray[0];
                        //商城密码
                        user.mallPassWord = "";
                        //二级密码
                        user.secondPassWord = "";
                        //支付密码
                        user.payPassword = "";
                        //Email
                        user.Email = "";
                        //手机
                        user.phone = "";
                        //姓名
                        user.name = "";
                        //银行账号
                        user.bankNum = "";
                        //开户银行
                        user.bank = "";
                        //身份证号
                        user.carId = "";
                        //开户姓名
                        user.bankCardName = "";
                        // 开户支行
                        user.bankBranch = "";
                        //省市地区
                        user.address = "";
                        //标记
                        user.flag = 0;

                        $scope.userArray.push(user);
                    }
                })

            });

        }

        /**
         * 点击Tab 切换页面
         * @param $scope
         * @param index
         */
        service.showUserGrade = function ($scope, index) {
            var box = $(".of_navBox").children();
            for (var i = 0; i < box.length; i++) {
                if (index == i) {
                    $(box[i]).css("color", "#d39bc5");
                } else {
                    $(box[i]).css("color", "#000000");
                }
            }
            var info = $scope.userArray[index];
            $("#recommend").val(info.recommendP);
            $("#node").val(info.nodeP);
            $("#selectResult").val(info.region);
            $("#mallPassWord").val(info.mallPassWord);
            $("#secondPassWord").val(info.secondPassWord);
            $("#payPassWord").val(info.payPassword);
            $("#Email").val(info.Email);
            $("#phone").val(info.phone);
            $("#name").val(info.name);
            $("#bankCardN").val(info.bankNum);
            $("#bank").val(info.bank);
            $("#identityCardN").val(info.carId);
            $("#cardName").val(info.bankCardName);
            $("#identityCardN").val(info.carId);
            $("#bankBranch").val(info.bankBranch);
            $("#bankBranch").val(info.bankBranch);
            $("#bankBranch").val(info.bankBranch);
            $("#bankBranch").val(info.bankBranch);

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

        service.showError = function (elea, eleb, text) {
            console.log(elea);
            elea.css('display', 'block');
            eleb.css({
                'height': '34px',
                'line-height': '34px',
            });
            elea.html("<i class='icon ion-android-warning'></i> " + text);
        }
        return service;


    });


});