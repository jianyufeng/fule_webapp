/**
 * Created by Administrator on 2017/3/24.
 */
define(['app', "css! ../../../css/my/myElectronicBankTransfer"], function (app) {
    function ctrl($scope, myElectronicBankTransferService, POP) {

        $scope.$on('$ionicView.loaded', function () {
            /*获取数据*/
        });

        var info = User.getInfo();
        $scope.userName = info.user_name;
        //获取转入银行列表
        myElectronicBankTransferService.getBankList($scope, 1);
        //提交

        var hzReg = /^[\u4e00-\u9fa5]+$/;
        $('.ert_confirm').click(function () {
            //获取选择的汇入银行
            var bankID = $("input[name='selectBank']:checked").val();
            if (CommenFun.isNullObj(bankID)) {
                POP.Alert("请选择<br/><font color='red'>(汇入银行)</font>");
                return;
            }
            //汇款银行
            var tfBank = $.trim($('#ert_TFBank').val());
            if (!hzReg.test(tfBank)) {
                POP.Alert("汇款银行&nbsp;格式不正确<br/><font color='red'>(必须为中文)</font>");
                return
            }
            //获取银行地址



            //获取银行账号
            var bankAccoutnt =$.trim( $('#ert_BankAccount').val());
            if (CommenFun.isNullObj(bankID) || isNaN(bankAccoutnt)) {
                POP.Alert("银行账号&nbsp;格式不正确<br/><font color='red'>(必须为数字)</font>");
                return
            }
            //获取汇款人姓名
            var userName =$.trim( $('#ert_userName').val());
            if (!isNaN(userName)) {
                POP.Alert("获取汇款人姓名&nbsp;格式不正确<br/><font color='red'>(必须为中文)</font>");
                return
            }


        });

        ///*提交 点击效果*/
        //$(document).on("touchstart", ".ert_confirm", function (event) {
        //    $(this).css({background: "#d98bbc"}).transition({background: "#d9a9cd"}, 500);
        //});
        //
        //$(document).on("touchend", ".ert_confirm", function (event) {
        //    $(this).css("background", "#d9a9cd").transition({background: "#d98bbc"}, 500);
        //});
    }

    /*给构造函数添加$inject属性,添加注入的服务*/
    ctrl.$inject = ['$scope', 'myElectronicBankTransferService', 'POP'];

    /*动态注册控制器*/
    app.registerController("myElectronicBankTransferController", ctrl);
});