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
            var recommendP = $scope.upGrade.recommendP;
            var nodeP = $scope.upGrade.nodeP;
            var region = $("#selectResult").text();
            var nickName = $scope.upGrade.nickName;
            var bankCardN = $scope.upGrade.bankCardN;
            var bank = $scope.upGrade.bank;
            var identityCardN = $scope.upGrade.identityCardN;
            var cardName = $scope.upGrade.cardName;
            var branchBank = $scope.upGrade.branchBank;
            var address = $("#address").text();


            if (recommendP == undefined || recommendP == null) {
                POP.Hint("推荐人不能为空，请检查！");
                return;
            }
            if (nodeP == undefined || nodeP == null) {
                POP.Hint("节点人不能为空，请检查！");
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
            // HTTP 提交
            HTTP.post(url, {
                "user_name": userInfo.user_name,// 用户名
                "user_id": userInfo.user_id, // 用户Id
                "RECOMMENDED_MAN": recommendP,// 推荐人姓名
                "CONTACT_MAN": nodeP, // 节点人姓名
                "REGION": "", // 区域
                "ACCOUNT_OWNER": cardName, //开户人
                "BANK_ACCOUNT": bankCardN,   // 银行账号
                "BANK_NAME": bank,// 开户银行
                "ID_CARD": identityCardN,  // 省份证
                "BANK_LOCATION": "",  // 开户支行
                "BANK_STATE_ID": "",   // 开户行所在省
                "BANK_CITY_ID": "",   // 开户行所在市
                "BANK_DISTRICT_ID": "",   // 开户行所在区
                "MEMBER_NAME": nickName,   // 昵称
            }, function (e, data) {

                console.log(e);
                console.log(data);
                if (e) {
                    return;
                }


            })


        }
        // 查询用户是否存在
        service.getUserInfo = function (ele, eleNode, userName) {
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
                if (data == null || data.user_name == null) {
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
                    //console.log(data);
                    console.log(left);
                    console.log(right);
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

        return service;

    });


});