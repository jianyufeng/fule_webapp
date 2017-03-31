/**
 * Created by Administrator on 2017/3/24.
 */

var app = angular.module("loginApp", ['ionic']);

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
            template: "正在登录..."
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

app.controller("loginController", function ($scope, POP) {
    /*点击登录验证模式切换*/
    $('.choiceModel').click(function () {
        var v = $(this).val();
        if (v == 0) {
            $(".phoneCheckBox").fadeIn(300);
            $('.CardCheckBox').hide();
        } else {
            $(".phoneCheckBox").hide();
            $('.CardCheckBox').fadeIn(300);

        }
        var loginCard = _getRandomString();
        var length = loginCard.length;
        for (var i = 0; i < length; i++) {
            $('.codeName').eq(i).text(loginCard[i])
        }
    });

    /*点击发送短信效验码*/
    $('.sendBox').click(function () {
        //获取账号
        var user_name = $.trim($('#account').val());
        //账号不为空
        if (CommenFun.isNullObj(user_name)) {
            POP.Hint("账号不能为空");
            return;
        }
        var sendBox = $('.sendBox');
        sendBox.attr("disabled", true);
        sendBox.text("正在发送...");
        //获取验证码
        var url = "http://192.168.10.123:5000/_user/getSmsCode/user_name/" + user_name;
        HTTP.get(url, {}, function (e, data) {
            if (e) {
                POP.Hint("data");
                sendBox.removeAttr("disabled");
                sendBox.text("发送短信效验码");
                return;
            }
            POP.Hint(data);
            setTime(sendBox);
        });
    });
    var countdown = 8;
    //定时60s
    function setTime(obj) {
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


    /*忘记密码*/
    $('.retrievePassword').click(function () {
        alert($('.retrievePassword').text());

    });

    /*登录*/
    $('#login').click(function () {
        //获取账号
        var user_name = $.trim($('#account').val());
        //账号不为空
        if (CommenFun.isNullObj(user_name)) {
            POP.Hint("账号不能为空");
            return;
        }
        //获取密码
        var password = $('#password').val();
        //密码不为空
        if (CommenFun.isNullObj(password)) {
            POP.Hint("密码不能为空");
            return;
        }
        //获取验证模式
        var isCardCheck = $('#choiceCardCheck').is(':checked');
        var isPhoneCheck = $('#choicePhoneCheck').is(':checked');
        var verification_mode;
        var codeCheck;
        if (isCardCheck) {
            //获取密保卡验证码
            var codeValue = {};

            for (var i = 0; i < 5; i++) {
                var v = $.trim($(".codeValue").eq(i).val());
                //密保卡验证码不为空
                if (CommenFun.isNullObj(v)) {
                    POP.Hint("密保卡 验证码不能为空");
                    return;
                }
                if(isNaN(v)){
                    POP.Hint("验证码格式不正确");
                    return;
                }
                var name = $('.codeName').eq(i).text();
                codeValue[name] = v;
            }
            //$(".codeValue").each(function(i,item){
            //});
            codeCheck = codeValue;
            verification_mode = "CARD"
        } else {
            //获取手机验证码
            var code = $.trim($('#code').val());
            //手机验证码不为空
            if (CommenFun.isNullObj(code)) {
                POP.Hint("验证码不能为空");
                return;
            }
            if(isNaN(code)){
                POP.Hint("验证码格式不正确");
                return;
            }
            codeCheck = code;
            verification_mode = "CODE"
        }
        var url = "http://192.168.10.123:5000/_user/login";

        //登录的参数
        var param = {
            'user_name': user_name,
            'password': password,
            'verification_mode': verification_mode
        };
        if (isPhoneCheck) {
            param.code = codeCheck;
        }
        if (isCardCheck) {
            param.ciphers = codeCheck;
        }
        POP.StartLoading();

        HTTP.post(url, param, function (e, data) {
            POP.EndLoading();
            if (e) {
                POP.Hint(data);
                return;
            }
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


    //输入框聚焦变换
    $('#account').focus(function () {
        $('#accountIcon').attr("src", "../resource/images/icon/user_head.png");
    });
    $('#account').blur(function () {
        $('#accountIcon').attr("src", "../resource/images/icon/user_headhover.png");
    });
    //输入框聚焦变换
    $('#password').focus(function () {
        $('#passwordIcon').attr("src", "../resource/images/icon/password_headhover.png");
    });
    $('#password').blur(function () {
        $('#passwordIcon').attr("src", "../resource/images/icon/password_head.png");
    });


    /*登录 点击效果*/
    $(document).on("touchstart", "#login", function (event) {
        $(this).css({background: "#d9a9cd"}).transition({background: "#d9a9cd"}, 500);
    });

    $(document).on("touchend", "#login", function (event) {
        $(this).css("background", "#d9a9cd").transition({background: "#d98bbc"}, 500);
    });

        //随机获取 密保卡的码
    function _getRandomString(len) {
        var loginCard = [];
        for (var t = 0; t < 5; t++) {
            len = len || 1;
            var $chars = 'ABCDEFGHJ'; // 默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1  ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678
            var maxPos = $chars.length;
            var randNums = Math.floor(Math.random() * 10);
            var pwd = '';
            for (var i = 0; i < len; i++) {
                pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
            }
            pwd += randNums;
            loginCard.push(pwd)
        }
        return loginCard;
    }

});

