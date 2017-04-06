define(['app'], function (app) {

    app.factory("myElectronicBankTransferService", function () {

        var service = {};

        /*网络获取银行列表 信息*/
        service.getBankList = function ($scope,type) {

            //获取用户的账号
            var info = User.getInfo();
            HTTP.get(API.My.bankList + "/BANK_TYPE/" + type, {}, function (e, data) {
                if (e) {
                    POP.Hint("获取银行列表失败");
                    return;
                }
                //如果是上拉则添加到上次数据的后面
                console.log(data.data);
               $scope.bankLists = data.data;
            });

        };

        //提交
        service.addEleBankTransfer = function ($scope, POP,param) {
            POP.StartLoading();
            //获取用户的账号
            var info = User.getInfo();
            HTTP.post(API.My.eleBankTransfer, {
                "user_id": info.user_id,
                "user_name": info.user_name,
                "AMOUNT": param.amount,
                "BANK_ACCOUNT": param.bank_account,
                "BANK_NAME": param.bank_name,
                "REMITTANCE_DATE": param.remittance_date,
                "REMITTANCE_MAN": param.remittance_man,
                "BANK_ID": param.bank_id,
                "BANK_ADDRESS": param.bank_address,
                "HUIKUAN_TYPE": param.huikuan_type,
                "remittance_img": param.remittance_img,
                "REMARK": param.remark
            }, function (e, data) {
                POP.EndLoading();
                if (e) {
                    POP.Hint("提交失败");
                }
                //成功干啥？？？

            });

        };
        return service;


    });


});