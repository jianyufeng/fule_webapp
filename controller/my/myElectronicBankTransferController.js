/**
 * Created by Administrator on 2017/3/24.
 */
define(['app', 'animate', "css! ../../../css/my/myElectronicBankTransfer", 'css!../../../plugin/datePicker/datePicker.css', 'datePicker', 'addressSelect'], function (app) {
    function ctrl($scope, myElectronicBankTransferService, POP) {

        $scope.$on('$ionicView.loaded', function () {
            /*获取数据*/
        });
        //选择地址
        $("#ert_address").click(function () {
            console.log(111);
            new AddressSelect({
                resultBtnClick: function (result) {
                    var address = result.provinceName + "-" + result.cityName + "-" + result.areaName;
                    $("#ert_address").val(address);
                }
            })
        });
        //隐藏汇入银行
        $('.sel_BankBox').click(function (e) {
            if (e.target.className == "sel_BankBox") {
                $('.sel_BankBox').fadeOut();
            }
        });
        //选择汇入银行
        $('#ert_showBank').click(function () {
            $('.sel_BankBox').fadeIn();
        });
        //初始化汇入银行
        $scope.data = {sel_bank: ''};
        //确定
        $('.sel_confirmSelect').click(function () {
            $('.sel_BankBox').fadeOut();

            //获取选择的值
            var data = $scope.data.sel_bank;
            //判断是否为空
            if (CommenFun.isNullObj(data)) {
                return;
            }
            //更改当前选择的值
            $('.ert_selectBank').val(
                data.BANK_NAME + "    " + data.ACCOUNT_OWNER + "\n" + data.BANK_ACCOUNT
            );
        });

        var info = User.getInfo();
        $scope.userName = info.user_name;
        //获取转入银行列表
        myElectronicBankTransferService.getBankList($scope, 1);
        //选择日期
        $('#ert_time').datePicker({
            beginyear: 2002,
            theme: 'datetime',
            callBack: function (result) {
                //var data = result.y + "-" + result.M + "-" + result.d +" "+ result.h +":"+ result.m;
                //$("#ert_time").val(data);
            }
        });
        //汉字正则
        var hzReg = /^[\u4e00-\u9fa5]+$/;
        //提交
        $('.ert_confirm').click(function () {
            //获取选择的汇入银行
            var bankContent = $.trim($("#ert_selectBank").val());
            if (bankContent.length <= 0) {
                POP.Alert("请选择<br/><font color='red'>(汇入银行)</font>");
                return;
            }
            //汇款银行
            var tfBankName = $.trim($('#ert_TFBank').val());
            if (!hzReg.test(tfBankName)) {
                POP.Alert("汇款银行&nbsp;格式不正确<br/><font color='red'>(必须为中文)</font>");
                return
            }
            //获取银行地址
            var addressDetail = $.trim($('#ert_addressDetail').val());
            var address = $.trim($('#ert_address').val());

            if (address.length <= 0) {
                POP.Alert("请选择<br/><font color='red'>(银行地址)</font>");
                return;
            }
            //获取银行账号
            var bankAccount = $.trim($('#ert_BankAccount').val());
            if (bankAccount.length <= 0 || isNaN(bankAccount)) {
                POP.Alert("银行账号&nbsp;格式不正确<br/><font color='red'>(必须为数字)</font>");
                return
            }

            //获取汇款人姓名
            var userName = $.trim($('#ert_userName').val());
            if (!hzReg.test(userName)) {
                POP.Alert("获取汇款人姓名&nbsp;格式不正确<br/><font color='red'>(必须为中文)</font>");
                return
            }
            //获取汇款金额
            var money = $.trim($('#ert_money').val());
            if (money.length <= 0 || isNaN(money)) {
                POP.Alert("汇款金额&nbsp;格式不正确<br/><font color='red'>(必须为数字)</font>");
                return
            }
            //获取汇款日期
            var tfTime = $.trim($('#ert_time').val());
            if (tfTime.length <= 0) {
                POP.Alert("请选择<br/><font color='red'>(汇款日期)</font>");
                return
            }

            //获取备注
            var remark = $.trim($('#ert_remark').val());
            var param = {
                "amount": money,
                "bank_account": bankAccount,
                "bank_name": tfBankName,
                "remittance_date": tfTime,
                "remittance_man": userName,
                "bank_id": $scope.data.sel_bank.BANK_ID,
                "bank_address": address + addressDetail,
                "huikuan_type": 1,
                //"remittance_img": img,
                "remark": remark
            };

            myElectronicBankTransferService.addEleBankTransfer($scope, POP, param);

        });

        /*确定 点击效果*/
        $(document).on("touchstart", ".sel_confirmSelect", function (event) {
            $(this).css({background: "#d98bbc"}).transition({background: "#d9a9cd"}, 500);
        });

        $(document).on("touchend", ".sel_confirmSelect", function (event) {
            $(this).css("background", "#d9a9cd").transition({background: "#d98bbc"}, 500);
        });
        /*提交 点击效果*/
        $(document).on("touchstart", ".ert_confirm", function (event) {
            $(this).css({background: "#d98bbc"}).transition({background: "#d9a9cd"}, 500);
        });

        $(document).on("touchend", ".ert_confirm", function (event) {
            $(this).css("background", "#d9a9cd").transition({background: "#d98bbc"}, 500);
        });
    }

    /*给构造函数添加$inject属性,添加注入的服务*/
    ctrl.$inject = ['$scope', 'myElectronicBankTransferService', 'POP'];

    /*动态注册控制器*/
    app.registerController("myElectronicBankTransferController", ctrl);
});