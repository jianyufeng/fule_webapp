var app = angular.module("registerApp",['ionic']);

app.controller("registerController", function ($scope, POP) {

    /*点击发送短信效验码*/
    $('.postNote').click(function () {
        var user_name = $.trim($('#account').val());
        //账号不为空
        if (CommenFun.isNullObj(user_name)) {
            POP.Hint("账号不能为空");
            return;
        }
        var postNote = $('.postNote');
        postNote.attr("disabled",true);
        postNote.text("正在发送...");
        //获取验证码
        var url = "http://192.168.10.123:5000/_user/getSmsCode/user_name/"+user_name;

        HTTP.get(url,{},function (e, data) {
            if (e) {
                POP.Hint("data");
                postNote.removeAttr("disabled");
                postNote.text("发送短信效验码");
                return;
            }
            POP.Hint(data);
            setTime(postNote);
        });

    });
    var countdown = 8;
    //定时60s
    function setTime(obj) {
        console.log(obj);
        if (countdown == 0) {
            obj.text("发送短信效验码");
            countdown = 8;
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




    //注册
    $('#register').click(function () {
        var user_name = $.trim($('#account').val());
        var email = $('#mailbox').val();
        var loginPassword = $('#loginPassword').val();
        var secondPassword = $('#secondPassword').val();
        var threePassword = $('#threePassword').val();
        var phoneNumber = $('#phone').val();
        //获取手机验证码
        var note = $('#note').val();
        //手机验证码不为空
        if (CommenFun.isNullObj(code)) {
            POP.Hint("验证码不能为空");
            return;
        }
        var codeCheck = note;
        var verification_mode = "CODE";
        var url = "http://192.168.10.123:5000/_user/register";
        var param = {
            'user_name':user_name,
            'email':email,
            'password':loginPassword,
            'SECOND_PASSWORD':secondPassword,
            'THREE_PASSWORD':threePassword,
            'mobile':phoneNumber,
            'verification_mode':verification_mode


    };
        param.code = codeCheck;
        POP.StartLoading();

        HTTP.post(url, param, function (e, data) {
            POP.EndLoading();
if (e) {
    POP.Hint(data);
    return;
}
            var userInfo = JSON.stringify(data);
            console.log(userInfo);
        })
    });

});