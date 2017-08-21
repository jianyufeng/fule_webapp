var app = angular.module("registerApp",['ionic']);
var serverIP = "../transmit/save.php";

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
            duration: 1000
        });
    };

    return service;
});

app.controller("registerController", function ($scope, POP,$state,$ionicScrollDelegate) {




    var url = serverIP + "/_user/showRegister/";
    POP.StartLoading();
    HTTP.get(url, {}, function (e, data) {

        POP.EndLoading();

        if (e) {
            $.loadError(function () {

            });
            return;
        }

        $scope.$apply(function () {
            $scope.showCircle = data["PARAM_VALUE"];
        });

    });

    //短信验证码按钮开启 0，关闭 1
    var messageCode_On = 0;

    /*点击发送短信效验码*/
    $('.postNote').click(function () {


        var yanzhengma = $('#img').val();


        if (yanzhengma == '') {
            $('#img').focus();
            POP.Hint('请填写图形验证码');
            return;
        }
        if (yanzhengma.toUpperCase() != $.cookie('web_key')) {
            $('#img').focus();
            POP.Hint('图形验证码填写错误');
            return;
        }


        //alert(11);
        var mobile = $('#phone').val();
        //手机号不为空

        var reg = /^1(3|4|5|7|8)\d{9}/; //验证规则
        var flag = reg.test(mobile); //true
        console.log(flag);
        if (!flag) {
            POP.Hint("手机号格式不正确");
            return;
        }
        if(messageCode_On == 0) {
        //    二次验证手机位数
        //    if(flag.length == 11) {
            messageCode_On = 1;
            var postNote = $('.postNote');
            //postNote.attr("disabled", true);
            //postNote.text("正在发送...");
             postNote.css({
                 'background': '#d9d6d0',
                 'border': '#d9d6d0'
             });


            //修改为倒计时
            var timess = 59;
            var timessBox = setInterval(function() {
                $('.postNote').html(timess + 's');
                timess = timess - 1;
                //计时结束
                if(timess == -1) {
                    messageCode_On = 0;
                    clearInterval(timessBox);
                    $('.postNote').html('发送短信验证码');
                    $('.postNote').css({
                        'background': '#d79ac4',
                        'border': '#f55c86'
                    });
                }
            }, 1000);





            //获取验证码
            var url = serverIP + "/sms/registerVerification/mobile/" + mobile;
            HTTP.get(url, {}, function (e, data) {

                if (e) {
                    POP.Hint(data);
                    postNote.removeAttr("disabled");
                    postNote.text("发送短信效验码");
                    return;
                }
                POP.Hint("短信发送成功");

                setTime(postNote);
            });

        }


    });

    //var countdown = 60;
    ////定时60s
    //function setTime(obj) {
    //    if (countdown == 0) {
    //        obj.text("发送短信效验码");
    //        countdown = 60;
    //        obj.removeAttr("disabled");
    //        return;
    //    } else {
    //        obj.attr("disabled", true);
    //        obj.text("重新发送(" + countdown + ")");
    //        countdown--;
    //    }
    //    setTimeout(function () {
    //            setTime(obj)
    //        }
    //        , 1000)
    //}


//点击更换图片验证码
    $('.imgNote').click(function () {

        var change = $('.imgNote')[0];

        change.src="../save/yanzhengma.php?random="+Date.parse(new Date());

    });


    //注册
    $('#register').click(function () {

        var user_name = $.trim($('#account').val());
        var email = $('#mailbox').val();
        var sex = parseInt($("input[name = '1']:checked").val());
        var circle = parseInt($("input[name = '2']:checked").val());
        var loginPassword = $('#loginPassword').val();
        var secondPassword = $('#secondPassword').val();
        var threePassword = $('#threePassword').val();
        var phoneNumber = $('#phone').val();
        var note = $('#note').val();

        //正则匹配
        var pattern_user = /^xlzj/; //用户名
        var pattern_userNumber = /^[0-9]/; //数字开头
        var pattern_6Number = /^[0-9]([0-9]{5,5})$/; //6位数字
        var pattern_Number = /^[0-9]$/; //纯数字
        var pattern_wenzi = /[^A-Za-z0-9]/; //文字
        var pattern_feifa = /[(,),`,~,-,_,!,#,<,>,\\[,\\],:,;,?,$,%,^,&,*,+,=,\\\\,',\",|]/ ; //非法文字
        var pattern_email = /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,5}$/; //邮箱
        var pattern_phone = /^0?(13|14|15|18)[0-9]{9}$/; //手机号码

        //验证用户名
            if(pattern_wenzi.test(user_name)) {
                POP.Hint("用户名长度只能在6-16位之间且不能有中文和非法字符");
                return;

            } else if(user_name.length < 6 || user_name.length > 16 ) {
                POP.Hint("用户名长度需要在6-16位之间");
                return;

            } else if(pattern_user.test(user_name)) {
                POP.Hint("用户名不能以xlzj开头");
                return;

            } else if(pattern_userNumber.test(user_name)) {
                POP.Hint("用户名不能以数字开头");
                return;

            } else if(pattern_feifa.test(user_name)) {
                POP.Hint("用户名不能有特殊字符");
                return;

            } else {
                userRepeat(user_name);
            }


        //验证电子邮箱

            if(!pattern_email.test(email)) {
                POP.Hint("请正确输入邮箱");
                return;

            }


        //验证登录密码
            if(pattern_wenzi.test(loginPassword)) {

                POP.Hint("密码不能为中文或特殊字符");
                return;

            } else if(loginPassword.length < 6 || loginPassword.length > 16) {

                POP.Hint("密码长度需要在6-16位之间");
                return;

            } else {

            }



        //验证二级密码
            if(pattern_wenzi.test(secondPassword)) {

                POP.Hint("密码不能为中文或特殊字符");
                return;

            } else if(secondPassword.length < 6 || secondPassword.length > 16) {

                POP.Hint("密码长度需要在6-16位之间");
                return;

            } else {

            }


        //验证支付密码
            if(pattern_wenzi.test(threePassword)) {
                POP.Hint("密码不能为中文或特殊字符");
                return;

            } else if(threePassword.length != 6 || !pattern_6Number.test(threePassword)) {
                POP.Hint("支付密码只能为6位数字的组合");
                return;

            } else {

            }


        //验证手机号码
            if(!pattern_phone.test(phoneNumber)) {
                POP.Hint("请输入正确手机号码");
                return;

            } else {

            }


        //验证验证码
            if(pattern_wenzi.test(note)) {
                POP.Hint("验证码不能为中文或特殊字符");
                return;

            }
            
            if(pattern_feifa.test(note)) {
                POP.Hint("验证码不能为中文或特殊字符");
                return;
            }

            if(!(/^\d{6}$/.test(note))){
                POP.Hint("验证码必须为6位数字");
                return;
            }


        //用户名不为空
        if (CommenFun.isNullObj(user_name)) {
            POP.Hint("用户名不为空");
            return;
        }else {

        }
        //邮箱不为空
        if (CommenFun.isNullObj(email)) {
            POP.Hint("邮箱不为空");
            return;
        }else {
            var re = /\w@\w*\.\w/;
            if (!re.test(email)) {
                POP.Hint("请填写正确的电子邮箱地址");
                return;
            }
        }
        //登录密码不为空
        if (CommenFun.isNullObj(loginPassword)) {
            POP.Hint("登录密码不为空");
            return;
        }else {

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
        }else{
            var re = /^1(3|4|5|7|8)\d{9}$/;
            if (!re.test(phoneNumber)){
                POP.Hint("请填写正确的手机号码");
                return;
            }
        }
        ////图片校验码不为空
        //if (CommenFun.isNullObj(yanzhengma)) {
        //    POP.Hint("图片校验码不能为空");
        //    return;
        //}
        //手机验证码不为空
        if (CommenFun.isNullObj(note)) {
            POP.Hint("验证码不能为空");
            return;
        }
        var verification_mode = "CODE";
        var url = serverIP + "/_user/register";





        var param = {
            'user_name':user_name,
            'email':email,
            'sex':sex,
            'password':loginPassword,
            'confirm_password':loginPassword,
            'SECOND_PASSWORD':secondPassword,
            'THREE_PASSWORD':threePassword,
            'mobile':phoneNumber,
            'verification_code':verification_mode,
            'code':note

    };


        if($scope.showCircle == 1 || $scope.showCircle == "1"){

            param = {
                'user_name':user_name,
                'email':email,
                'sex':sex,
                'USER_SHARE_TYPE':circle,
                'password':loginPassword,
                'confirm_password':loginPassword,
                'SECOND_PASSWORD':secondPassword,
                'THREE_PASSWORD':threePassword,
                'mobile':phoneNumber,
                'verification_code':verification_mode,
                'code':note

            };

        }


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



//$('#account').blur(function() {
//
//    var user_name = $.trim($('#account').val());  //用户名

    //userRepeat(user_name);

    function userRepeat(user_name) {
        //检查用户名是否存在
        var url = serverIP + "/_user/verifyUserName/user_name/" + user_name;
        HTTP.get(url, function (e, data) {
            if (e) {
                POP.Hint(data);
            }
        })
    }


//});

    //输入框聚焦变换
    $('#account').focus(function () {
        $('#nameIcon').attr("src", "../resource/images/icon/user_head.png");
    });
    $('#account').blur(function () {
        $('#nameIcon').attr("src", "../resource/images/icon/user_headhover.png");
    });


    $('#mailbox').focus(function () {
        $('#mailIcon').attr("src", "../resource/images/icon/email_hover.png");
    });
    $('#mailbox').blur(function () {
        $('#mailIcon').attr("src", "../resource/images/icon/email.png");
    });

    $('#loginPassword').focus(function () {
        $('#passwordIcon').attr("src", "../resource/images/icon/password_headhover.png");
    });
    $('#loginPassword').blur(function () {
        $('#passwordIcon').attr("src", "../resource/images/icon/password_head.png");
    });

    $('#secondPassword').focus(function () {
        $('#secondIcon').attr("src", "../resource/images/icon/second_mima_hover.png");
    });
    $('#secondPassword').blur(function () {
        $('#secondIcon').attr("src", "../resource/images/icon/second_mima.png");
    });

    $('#threePassword').focus(function () {
        $('#threeIcon').attr("src", "../resource/images/icon/three_mima_hover.png");
    });
    $('#threePassword').blur(function () {
        $('#threeIcon').attr("src", "../resource/images/icon/three_mima.png");
    });

    $('#phone').focus(function () {
        $('#phoneIcon').attr("src", "../resource/images/icon/mobile_number_hover.png");
    });
    $('#phone').blur(function () {
        $('#phoneIcon').attr("src", "../resource/images/icon/mobile_number.png");
    });

    //校验码聚焦变换
    $('#note').focus(function () {
        $('#note').css("border", "solid 1px #d98bbc");
    });
    $('#note').blur(function () {
        $('#note').css("border", "solid 1px #eee");
    });
//校验码聚焦变换
    $('#img').focus(function () {
        $('#img').css("border", "solid 1px #d98bbc");
    });
    $('#img').blur(function () {
        $('#img').css("border", "solid 1px #eee");
    });


    $('input').blur(function() {

        //正则匹配
        var pattern_user = /^xlzj/; //用户名
        var pattern_userNumber = /^[0-9]/; //数字开头
        var pattern_6Number = /^[0-9]([0-9]{5,5})$/; //6位数字
        var pattern_Number = /^[0-9]$/; //纯数字
        var pattern_wenzi = /[^A-Za-z0-9]/; //文字
        var pattern_feifa = /[(,),`,~,-,_,!,#,<,>,\\[,\\],:,;,?,$,%,^,&,*,+,=,\\\\,',\",|]/ ; //非法文字
        var pattern_email = /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,5}$/; //邮箱
        var pattern_phone = /^0?(13|14|15|18)[0-9]{9}$/; //手机号码

        //正则匹配值
        var user_name = $.trim($('#account').val());
        var email = $('#mailbox').val();
        var loginPassword = $('#loginPassword').val();
        var secondPassword = $('#secondPassword').val();
        var threePassword = $('#threePassword').val();
        var phoneNumber = $('#phone').val();
        //获取手机验证码
        var note = $('#note').val();


        //验证用户名
        if($(this).is('#account')) {
            if(pattern_wenzi.test(user_name)) {
                POP.Hint("长度只能在6-16位之间且不能有中文和非法字符");

            } else if(this.value.length < 6 || this.value.length > 16 ) {
                POP.Hint("用户名长度需要在6-16位之间");

            } else if(pattern_user.test(user_name)) {
                POP.Hint("用户名不能以xlzj开头");

            } else if(pattern_userNumber.test(user_name)) {
                POP.Hint("用户名不能以数字开头");

            } else if(pattern_feifa.test(user_name)) {
                POP.Hint("用户名不能有特殊字符");

            } else {
                userRepeat(user_name);
            }
        }

        //验证电子邮箱
        if($(this).is('#mailbox')) {

            if(!pattern_email.test(email)) {
                POP.Hint("请正确输入邮箱");
            }
        }

        //验证登录密码
        if($(this).is('#loginPassword')) {
            if(pattern_wenzi.test(loginPassword)) {

                POP.Hint("密码不能为中文或特殊字符");
            } else if(this.value.length < 6 || this.value.length > 16) {

                POP.Hint("密码长度需要在6-16位之间");
            } else {

            }
        }


        //验证二级密码
        if($(this).is('#secondPassword')) {
            if(pattern_wenzi.test(secondPassword)) {

                POP.Hint("密码不能为中文或特殊字符");

            } else if(this.value.length < 6 || this.value.length > 16) {

                POP.Hint("密码长度需要在6-16位之间");


            } else {

            }
        }

        //验证支付密码
        if($(this).is('#threePassword')) {
            if(pattern_wenzi.test(threePassword)) {
                POP.Hint("密码不能为中文或特殊字符");

            } else if(this.value.length != 6 || !pattern_6Number.test(threePassword)) {
                POP.Hint("支付密码只能为6位数字的组合");

            } else {

            }
        }

        //验证手机号码
        if($(this).is('#userphone')) {
            if(!pattern_phone.test(phoneNumber)) {
                POP.Hint("请输入正确手机号码");

            } else {

            }
        }

        //验证验证码
        if($(this).is('#note')) {
            if(pattern_wenzi.test(note)) {
                POP.Hint("验证码不能为中文或特殊字符");

            } else if(pattern_feifa.test(note)) {
                POP.Hint("验证码不能为中文或特殊字符");

            } else {

            }
        }

    })



});

