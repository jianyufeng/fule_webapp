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
    });

    /*点击发送短信效验码*/
    $('.sendBox').click(function () {
        alert($('.sendBox').text());

    });


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
            var codeValue = $('.codeValue').val();

            //密保卡验证码不为空
            if (CommenFun.isNullObj(codeValue)) {
                POP.Hint("验证码不能为空");
                return
            }
            codeCheck = codeValue;
            verification_mode = "CARD"


        } else {
            //获取手机验证码
            var code = $('#code').val();

            //手机验证码不为空
            if (CommenFun.isNullObj(code)) {
                POP.Hint("验证码不能为空");
                return;

            }
            codeCheck = code;
            verification_mode = "CODE"
        }
        var url = "http://192.168.10.123:5000/_user/login";
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
                $.loadError(function () {
                    POP.Hint("访问出错");
                });
                return;
            }
            var userInfo = JSON.stringify(data);

            //判断是否保存登录信息  如果保存则保存7天
            if ($('#saveLogin').is(':checked')) {

                $.cookie('userInfo', userInfo, {expires: 7});
            } else {

                $.cookie("userInfo", userInfo);
            }

            location.href="../index.html";


        })

    });

    /*未读消息 点击效果*/
    $(document).on("touchstart", "#login", function (event) {
        $(this).css({background: "#d9a9cd"}).transition({background: "#d9a9cd"}, 500);
    });

    $(document).on("touchend", "#login", function (event) {
        $(this).css("background", "#d9a9cd").transition({background: "#d98bbc"}, 500);
    });
});

