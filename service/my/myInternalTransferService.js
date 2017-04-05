/**
 * Created by ShareLock on 2017/3/30.
 * 内部转账Service
 */

define(['app'], function (app) {

    app.factory("myInternalTransferService", function () {

        var service = {};


        /**
         * 获取短信验证码
         */
        service.getMessageCodeBiz=function($scope,POP){

            //获取账号
            var user_name = User.getInfo().user_name;
            //账号不为空
            if (CommenFun.isNullObj(user_name)) {
                POP.Hint("账号不能为空");
                return;
            }
            var sendBox = $('.postNote');
            sendBox.attr("disabled",true);
            sendBox.text("正在发送...");
            //获取验证码
            var url = "http://192.168.10.123:5000/_user/getSmsCode/user_name/"+user_name;
            HTTP.get(url,{},function (e, data) {
                if (e) {
                    //POP.Hint("data");
                    console.log(e);
                    console.log(data);
                    sendBox.removeAttr("disabled");
                    sendBox.text("发送短信效验码");
                    return;
                }
                POP.Hint(data);
                setTime(sendBox);
            });


        }

        var countdown = 60;
        //定时60s
        function setTime(obj) {
            console.log(obj);
            if (countdown == 0) {
                obj.text("发送短信效验码");
                countdown = 60;
                obj.removeAttr("disabled");
                return;
            } else {
                obj.attr("disabled", true);
                obj.text("重新发送(" + countdown + ")");
                countdown--;
            }
            setTimeout(function () {
                    setTime(obj)
                }
                , 1000)
        }


        /**
         * 提交转账申请
         * @param $scope
         * @param verification_code
         * @param POP
         */
        service.submitTransformMoney=function($scope,POP){
            var targetName=$scope.transformMoney.targetName;
            var money=$scope.transformMoney.money;
            var passWord=$scope.transformMoney.passWord;
            var reMark=$scope.transformMoney.reMark;
            var messageCode=$scope.transformMoney.messageCode;
            if(reMark==undefined)reMark="";
            if(targetName==undefined||targetName==null){
                POP.Hint("转账对象不能为空，请检查！");
                return ;
            }
            if(money==undefined||money==null){
                POP.Hint("请你填写转账金额！");
                return ;
            }

            if(passWord==undefined||passWord==null){
                POP.Hint("请填写三级密码！");
                return ;
            }
            if(messageCode==undefined||messageCode==null){
                POP.Hint("请填写短信验证码！");
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
           HTTP.post(API.My.internalTransfer,
               //+"/verificationType/"+'1'
               //+"/user_name/"+userName
               //+"/user_id/"+userId
               //+"/SECOND_PASSWORD/"+passWord
               //+"/target_user_name/"+targetName
               //+"/amount/"+money
               //+"/remark/"+reMark
               //+"/verification_code/"+messageCode,
               {
               "verificationType":"1",
               "user_name":userName,
               "user_id":userId,
               "SECOND_PASSWORD":passWord,
               "target_user_name":targetName,
               "amount":money,
               "remark":reMark,
               "verification_code":messageCode
           },function(e,data){
               POP.EndLoading()
               if (e) {
                  console.log(e);
                   console.log(data.verifyCode);
                   POP.Hint(data.verifyCode);
                   return;
               }
               POP.Hint("转账成功");


           });

        }
        return service;


    });


});