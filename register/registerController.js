var app = angular.module("registerApp",['ionic']);

/*
 * 作用:弹出框服务封装
 */
app.factory("POP", function ($ionicPopup, $ionicActionSheet, $ionicLoading) {

    var service = {};

    //确认弹出框
    service.Confirm = function (content, ok) {
        var confirmPopup = $ionicPopup.confirm({
            title: '确认操作',
            template: content,
            cancelText: '取消',
            okText: '确认'
        });
        confirmPopup.then(function (res) {
            if (res) {
                ok();
            }
        });
    };

    //普通信息提示弹出框
    service.Alert = function (content) {
        var alertPopup = $ionicPopup.alert({
            title: '提示信息',
            template: content
        });

        alertPopup.then(function (res) {

        });
    };

    //上拉弹出框
    service.ActionSheet = function (title, buttonArr, fns) {

        var buttonJson = [];

        for (var i = 0; i < buttonArr.length; i++) {
            var tempJson = {text: buttonArr[i]};
            buttonJson.push(tempJson);
        }

        // 显示操作表
        $ionicActionSheet.show({
            buttons: buttonJson,
            titleText: title,
            cancelText: '关闭',
            buttonClicked: function (index) {
                fns[index]();
                return true;
            }
        });
    };

    //请求处理遮罩
    service.StartLoading = function () {
        $ionicLoading.show({
            showBackdrop: true,
            template: "正在注册..."
        });
    };

    //请求处理遮罩关闭
    service.EndLoading = function () {
        $ionicLoading.hide();
    };

    //提示
    service.Hint = function (msg) {
        $ionicLoading.show({
            showBackdrop: false,
            template: msg,
            duration: 2000
        });
    };

    return service;
});
app.controller("registerController", function ($scope, POP) {


    /*点击发送短信效验码*/
    $('.postNote').click(function () {
        //alert(11);
        var mobile = $('#phone').val();
        //账号不为空
        if (CommenFun.isNullObj(mobile)) {
            POP.Hint("账号不能为空");
            return;
        }
        var postNote = $('.postNote');
        postNote.attr("disabled",true);
        postNote.text("正在发送...");
        //获取验证码
        var url = "http://192.168.10.123:5000/sms/registerVerification/mobile/"+mobile;

        HTTP.get(url,{},function (e, data) {

            if (e) {
                POP.Hint("data");
                console.log(e);
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

        //用户名不为空
        if (CommenFun.isNullObj(user_name)) {
            POP.Hint("用户名不为空");
            return;
        }
        //邮箱不为空
        if (CommenFun.isNullObj(email)) {
            POP.Hint("邮箱不为空");
            return;
        }
        //登录密码不为空
        if (CommenFun.isNullObj(loginPassword)) {
            POP.Hint("登录密码不为空");
            return;
        }
        //二级密码不为空
        if (CommenFun.isNullObj(secondPassword)) {
            POP.Hint("二级密码不为空");
            return;
        }
        //三级密码不为空
        if (CommenFun.isNullObj(threePassword)) {
            POP.Hint("三级密码不为空");
            return;
        }
        //手机号码不为空
        if (CommenFun.isNullObj(phoneNumber)) {
            POP.Hint("手机号码不为空");
            return;
        }

        //手机验证码不为空
        if (CommenFun.isNullObj(note)) {
            POP.Hint("验证码不能为空");
            return;
        }
        var verification_mode = "CODE";
        var url = "http://192.168.10.123:5000/_user/register";
        var param = {
            'user_name':user_name,
            'email':email,
            'password':loginPassword,
            'confirm_password':loginPassword,
            'SECOND_PASSWORD':secondPassword,
            'THREE_PASSWORD':threePassword,
            'mobile':phoneNumber,
            'verification_code':verification_mode,
            'code':note

    };
        POP.StartLoading();

        HTTP.post(url, param, function (e, data) {
            POP.EndLoading();
console.log(data);
                if (e) {
                    if (typeof (data) == "string"){
                        POP.Hint(data);
                    }else {
                        POP.Hint(data['userRegister']);
                    }
                return;
            }
            //POP.Hint(data);
            var userInfo = JSON.stringify(data);

            //判断是否保存登录信息  如果保存则保存7天
            if ($('#saveLogin').is(':checked')) {

                $.cookie('userInfo', userInfo, {expires: 7, path: '/'});
            } else {
                $.cookie("userInfo", userInfo, {path: '/'});
            }
            location.href = "../index.html";
        })
    });



$('#account').blur(function() {
    ////内容为空提示信息
    //if($(this).val() == '') {
    //    $(this).parent().siblings(".hintF").css('display', 'block');
    //    $(this).parent().siblings(".hintT").css('display', 'none');
    //    $(this).css('border', '1px solid #e22');
    //}
    ////正则匹配
    //var pattern_user = /^xlzj/; //用户名
    //var pattern_userNumber = /^[0-9]/; //数字开头
    //var pattern_6Number = /^[0-9]([0-9]{5,5})$/; //6位数字
    //var pattern_Number = /^[0-9]$/; //纯数字
    //var pattern_wenzi = /[^A-Za-z0-9]/; //文字
    //var pattern_feifa = /[(,),`,~,-,_,!,#,<,>,\\[,\\],:,;,?,$,%,^,&,*,+,=,\\\\,',\",|,{,},\/]/ ; //非法文字
    //var pattern_email = /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,5}$/; //邮箱
    //var pattern_phone = /^0?(13|14|15|18)[0-9]{9}$/; //手机号码
    //
    //
    ////正则匹配值
    var user_name = $.trim($('#account').val());  //用户名
    //var email = $('#mailbox').val();    //电子邮箱
    //var loginPassword = $('#loginPassword').val(); //登录密码
    //var secondPassword = $('#secondPassword').val(); //二级密码
    //var threePassword = $('#threePassword').val();  //支付密码
    //var phoneNumber = $('#phone').val();   //手机号码
    //var note = $('#note').val();  //短信验证码
    //
    ////验证用户名
    //if ($(this).is('#account')) {
    //    if (pattern_wenzi.test(user_name)) {
    //    } else if (this.value.length < 6 || this.value.length > 16) {
    //    } else if (pattern_user.test(user_name)) {
    //    } else if (pattern_userNumber.test(user_name)) {
    //    } else if (pattern_feifa.test(user_name)) {
    //    } else {
    //        userRepeat(this.value);
    //
    //    }
    userRepeat(user_name);


    function userRepeat(user_name) {
        //检查用户名是否存在
        var url = "http://192.168.10.123:5000/_user/verifyUserName/user_name/" + user_name;
        HTTP.get(url, function (e, data) {
            if (e) {
                POP.Hint("用户名已被注册");
            }
        })
    }


});



});