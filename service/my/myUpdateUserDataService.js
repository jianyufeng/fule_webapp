/**
 * Created by ShareLock on 2017/4/8.
 * 用户激活或者升级是填写信息服务
 */

define(['app'], function (app) {

    app.factory("myUpdateUserDataService", function () {
            var service = {};
            // 点击 提交按钮
            service.upGradeAction = function ($scope, POP, myGrade) {
                var userInfo = User.getInfo();
                // 推荐人
                var recommendP = $scope.upGrade.recommendP;
                // 节点人
                var nodeP = $scope.upGrade.nodeP;
                // 节点人体系
                var team = $scope.upGrade.team;
                // 节点
                var region = $("#selectResult").val();
                // 昵称
                var nickName = $scope.upGrade.nickName;
                // 银行卡号
                var bankCardN = $scope.upGrade.bankCardN;
                // 开户银行
                var bank = $scope.upGrade.bank;
                // 身份证号
                var identityCardN = $scope.upGrade.identityCardN;
                // 开户姓名
                var cardName = $scope.upGrade.cardName;
                // 开户支行
                var branchBank = $scope.upGrade.branchBank;
                // 省市地区
                var address = $("#address").val();
                if (recommendP == undefined || recommendP == null) {
                    POP.Hint("推荐人不能为空，请检查！");
                    return;
                }
                if (nodeP == undefined || nodeP == null) {
                    POP.Hint("节点人不能为空，请检查！");
                    return;
                }
                if (team == undefined || team == null) {
                    POP.Hint("节点人团队，请检查！");
                    return;
                }
                if (region == null || region == "") {
                    POP.Hint("节点不能为空，请检查！");
                    return;
                }
                if (region == undefined || region == null) {
                    POP.Hint("请选择接点人区域！");
                    return;
                }
                if (nickName == undefined || nickName == null) {
                    POP.Hint("请检查，昵称。");
                    return;
                }
                if (bankCardN == undefined || bankCardN == null) {
                    POP.Hint("请检查，银行卡账户。");
                    return;
                }
                if (bank == undefined || bank == null) {
                    POP.Hint("请检查，开户银行。");
                    return;
                }
                if (identityCardN == undefined || identityCardN == null) {
                    POP.Hint("请检查，身份证号。");
                    return;
                }
                if (cardName == undefined || cardName == null) {
                    POP.Hint("请检查，开户姓名。");
                    return;
                }
                if (branchBank == undefined || branchBank == null) {
                    POP.Hint("请检查，开户支行。");
                    return;
                }
                if (address == null || address == "") {
                    POP.Hint("请检查，地址！");
                    return;
                } else {
                    var strArr = address.split("-");
                    var province = strArr[0];
                    var city = strArr[1];
                    var district = strArr[2];
                }
                var url = null;
                switch (myGrade) {
                    case 1:
                        //一键升级
                        url = API.My.oneUpgrade;
                        break;
                    case 2:
                        //D
                        url = API.My.upgradeToD;
                        break;
                    case 3:
                        //VIP
                        url = API.My.upgradeToVIP;
                        break;
                    case 4:
                        //  批发
                        url = API.My.upgradeToPIFA;
                        break;
                    default:
                        break;

                }
                POP.StartLoading();
                // HTTP 提交
                HTTP.post(url, {
                    "user_name": userInfo.user_name,// 用户名
                    "user_id": userInfo.user_id, // 用户Id
                    "RECOMMENDED_MAN": recommendP,// 推荐人姓名
                    "CONTACT_MAN": nodeP, // 节点人姓名
                    "REGION": region, // 区域
                    "ACCOUNT_OWNER": cardName, //开户人
                    "BANK_ACCOUNT": bankCardN,   // 银行账号
                    "BANK_NAME": bank,// 开户银行
                    "ID_CARD": identityCardN,  // 省份证
                    "BANK_LOCATION": branchBank,  // 开户支行
                    "BANK_STATE_ID": province,   // 开户行所在省
                    "BANK_CITY_ID": city,   // 开户行所在市
                    "BANK_DISTRICT_ID": district,   // 开户行所在区
                    "MEMBER_NAME": nickName,   // 昵称
                }, function (e, data) {
                    POP.EndLoading();
                    console.log(e);
                    console.log(data);
                    if (e) {
                        return;
                    }
                })

            }
            // 验证推荐人流程
            service.checkingRecommendedMan = function ($scope, ele, eleNode, userName) {
                HTTP.get(API.My.recommendedManInfo + '/userName/' + userName, {}, function (e, data) {
                    console.log(e);
                    console.log(data);
                    if (e) {
                        console.log(e);
                        console.log(data);
                        if (data != null) {
                            eleNode.css('display', 'block');
                            ele.css({
                                'height': '34px',
                                'line-height': '34px',
                            });
                            $scope.$apply(function () {
                                $scope.upGrade.team = data
                            });
                        }
                        return
                    }
                    $scope.$apply(function () {
                        $scope.upGrade.team = data.teamInfo.scheme_name + " " + data.teamInfo.team_name + " " + data.teamInfo.ACCOUNT_OWNER;
                    });

                });
            }
            //验证节点人流程
            service.checkingNodeMan = function (ele, eleNode, userName) {
                // 请求个人信息
                // 判断 username  是否激活
                HTTP.get(API.My.searchUserDetail + '/user_name/' + userName, {}, function (e, data) {
                    if (e) {
                        if (data != null) {
                            eleNode.css('display', 'block');
                            ele.css({
                                'height': '34px',
                                'line-height': '34px',
                            });
                        }
                        return;
                    }
                    if (data.REGISTER_GRADE <= 0) {
                        eleNode.css('display', 'block');
                        ele.css({
                            'height': '34px',
                            'line-height': '34px',
                        });
                    }
                })
            }
            // 查询人是否存在
            service.searchUserDetail = function (leftOrRight, $scope) {
                var userName = $scope.upGrade.nodeP;
                HTTP.get(API.My.searchUserDetail + '/user_name/' + userName, {}, function (e, data) {
                    if (e) {
                        //console.log(e);
                        //console.log(data);
                        return;
                    }
                    if (data != null) {
                        var left = data.LEFT_REGION_ID;
                        var right = data.RIGHT_REGION_ID;
                        if (leftOrRight == "左区") {
                            if (left != 0) {
                                alert("左区不可用");
                            }
                        } else {
                            if (right != 0) {
                                alert("右区不可用");
                            }
                        }

                    }
                });


            }
            // 充值按钮
            service.reset = function ($scope) {
                // 推荐人
                $scope.upGrade.recommendP = null;
                // 节点人
                $scope.upGrade.nodeP = null;
                // 节点人体系
                $scope.upGrade.team = null;
                // 节点
                $("#selectResult").val("");
                // 昵称
                $scope.upGrade.nickName = null;
                // 银行卡号
                $scope.upGrade.bankCardN = null;
                // 开户银行
                $scope.upGrade.bank = null;
                // 身份证号
                $scope.upGrade.identityCardN = null;
                // 开户姓名
                $scope.upGrade.cardName = null;
                // 开户支行
                $scope.upGrade.branchBank = null;
                // 省市地区
                $("#address").val("");
            };
            return service;

        }
    );


});