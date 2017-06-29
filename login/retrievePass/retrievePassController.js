/**
 * Created by Administrator on 2017/3/24.
 */

var app = angular.module("passApp", ['ionic']);
var serverIP = "../transmit/save.php";
/*
 * 自定义导航条
 */

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

app.controller("passController", function ($scope, POP) {

    //汉字正则
    var hzReg = /[^\x00-\xff]/;
    var zmReg = /^[a-zA-Z][a-zA-Z0-9]*$/;


    $(".mi_box").fadeOut();
    $('.change_box').fadeIn();

    /*点击发送短信效验码*/
    $('.sendBox').click(function () {
        var user_name = $.trim($('#account').val());
        //账号不为空
        if (CommenFun.isNullObj(user_name)) {
            POP.Hint("账号不能为空");
            return;
        }
        if (user_name.length < 6 || user_name.length > 16) {
            POP.Hint("账号长度不正确");
            return;
        }
        if (hzReg.test(user_name) || !zmReg.test(user_name)) {
            POP.Hint("账号格式不正确");
            return;
        }
        var sendBox = $('.sendBox');
        sendBox.attr("disabled", true);
        sendBox.text("正在发送...");
        //获取验证码


        var url = "http://192.168.10.70:3838/save/save.php/sms/login_verify/user_name/" + user_name;
        //var url = serverIP + "/_user/getSmsCode/user_name/" + user_name;
        HTTP.get(url, {}, function (e, data) {
            if (e) {
                POP.Hint("短信验证码发送失败，请重新尝试");
                sendBox.removeAttr("disabled");
                sendBox.text("发送短信效验码");
                return;
            }
            //更改密码
            $('.mi_box').fadeOut();
            $(".change_box").fadeIn();
            POP.Hint(data);
        });
    });
    /*修改*/
    $('#changBtn').click(function () {
        //获取新密码


        //获取密码
        var password = $('#new_mi').val();
        //密码不为空
        if (CommenFun.isNullObj(password)) {
            POP.Hint("密码不能为空");
            return;
        }
        if (password.length < 6 || password.length > 16) {
            POP.Hint("密码长度不正确");
            return;
        }
        if (hzReg.test(password)) {
            POP.Hint("密码格式不正确");
            return;
        }
        //获取密码重复输入的
        var password_r = $('#new_mi_re').val();
        //密码不为空
        if (CommenFun.isNullObj(password_r)) {
            POP.Hint("密码不能为空");
            return;
        }
        if (password_r.length < 6 || password_r.length > 16) {
            POP.Hint("密码长度不正确");
            return;
        }
        if (hzReg.test(password_r)) {
            POP.Hint("密码格式不正确");
            return;
        }
        if (password_r != password) {
            POP.Hint("重复输入的密码不一致");
            return
        }

        //获取手机验证码
        var code = $.trim($('#code').val());
        //手机验证码不为空
        if (CommenFun.isNullObj(code)) {
            POP.Hint("验证码不能为空");
            return;
        }
        if (isNaN(code)) {
            POP.Hint("验证码格式不正确");
            return;
        }
        if (code.length != 6) {
            POP.Hint("验证码长度不正确");
        }
        //提交修改
        var url = serverIP + "/_user/login";
        //登录的参数
        var param = {
            'user_name': user_name,
            'password': password,
        };
        POP.StartLoading();
        HTTP.post(url, param, function (e, data) {
            POP.EndLoading();
            if (e) {
                if (data == undefined || data == null || !(typeof data == 'string')) {
                    POP.Hint("修改失败");
                    return
                }
                POP.Hint(data);
                return;
            }

            //
            //var userInfo = JSON.stringify(data);
            ////判断是否保存登录信息  如果保存则保存7天
            //if ($('#saveLogin').is(':checked')) {
            //
            //    $.cookie('userInfo', userInfo, {expires: 7, path: '/'});
            //} else {
            //    $.cookie("userInfo", userInfo, {path: '/'});
            //}
            //location.href = "../index.html";


        })

    });
    //输入框聚焦变换
    $(document).off('focus', '.mi_account,').on('focus', '.mi_account', function () {
        $(this).css("border", "solid 1px #d98bbc");
    });
    $(document).off('blur', '.mi_account').on('blur', '.mi_account', function () {
        $(this).css("border", "solid 1px #eee");
    });


    /*登录 点击效果*/
    $(document).off("touchstart", "#changBtn").on("touchstart", "#changBtn", function (event) {
        $(this).css({background: "#d98bbc"}).transition({background: "#d9a9cd"}, 200);
    });

    $(document).off("touchend", "#changBtn").on("touchend", "#changBtn", function (event) {
        $(this).css("background", "#d9a9cd").transition({background: "#d98bbc"}, 200);
    });

});

