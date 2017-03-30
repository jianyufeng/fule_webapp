/**
 * Created by ShareLock on 2017/3/30.
 * 内部转账Service
 */

define(['app'], function (app) {

    app.factory("myInternalTransferCheckService", function () {

        var service = {};

        service.submitTransformMoney=function($scope,verification_code,POP){
            var targetName=$scope.transformMoney.targetName;
            var money=$scope.transformMoney.money;
            var passWord=$scope.transformMoney.passWord;
            var reMark=$scope.transformMoney.reMark;
            if(reMark==undefined)reMark="";
            if(targetName==undefined||targetName==null||targetName.length<1||targetName==""){
                POP.Hint("转账对象不能为空，请检查！");
                return ;
            }
            if(money==undefined||money==null||targetName.length<1||targetName==""){
                POP.Hint("请你填写转账金额！");
                return ;
            }

            if(passWord==undefined||passWord==null||targetName.length<1||targetName==""){
                POP.Hint("请填写三级密码！");
                return ;
            }


            var userInfo=User.getInfo();
            var userName=userInfo.user_name;
            var userId=userInfo.user_id;

            //verificationType:1
            //user_name:zhoulibo
            //user_id:145989
            //SECOND_PASSWORD:asdasd
            //target_user_name:dadssad
            //amount:23123
            //remark:dasdasd
            //verification_code:123123
            POP.StartLoading();
           HTTP.post(API.My.internalTransfer,{
               "verificationType":"1",
               "user_name":userName,
               "user_id":userId,
               "SECOND_PASSWORD":passWord,
               "target_user_name":targetName,
               "amount":money,
               "remark":reMark,
               "verification_code":verification_code
           },function(e,data){
               POP.EndLoading()
               if (e) {
                  //console.log(e);
                  // console.log(data);
                   return;
               }



           });

        }
        return service;


    });


});