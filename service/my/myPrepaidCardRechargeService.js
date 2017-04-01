/**
 * Created by ShareLock on 2017/3/30.
 *充值卡充值的Service
 */
define(['app'], function (app) {

    app.factory("myPrepaidCardRechargeService", function () {

        var service = {};

        service.rechargeBiz = function ($scope, POP) {
            var secondPassword = $scope.rechargeCard.secondPassword;
            var cardNum = $scope.rechargeCard.cardNum;
            var cardPassword = $scope.rechargeCard.cardPassword;
            if (secondPassword == undefined || CommenFun.isNullObj(secondPassword)) {
                POP.Hint("二级密码为空，请检查！");
                return;
            }
            if (cardNum == undefined || CommenFun.isNullObj(cardNum)) {
                POP.Hint("充值卡账户为空，请检查！");
                return;
            }
            if (cardPassword == undefined || CommenFun.isNullObj(cardPassword)) {
                POP.Hint("充值卡密码为空，请检查！");
                return;
            }
            //http://ecommerce.38zs.net:66/docs/index.php#594_28_14   文档接口
            userId = User.getInfo().user_id;
            HTTP.post(API.My.prepaidCard, {
                "user_id": userId,
                "SECOND_PASSWORD": secondPassword,
                "card_no": cardNum,
                "card_pass": cardPassword
            }, function (e, data) {
                if(e){
                    console.log(e);
                    console.log("37---------->"+data);
                    //POP.Hint(data);
                    return;
                }
                console.log("41---------->"+data);
            })


        }


        return service;


    });


});