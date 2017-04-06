/**
 * Created by Administrator on 2017/3/24.
 */
define(['app',"css! ../../../css/my/myElectronicBankTransfer",'css!../../../plugin/datePicker/datePicker.css','datePicker'],function(app){
    function ctrl($scope) {

        $scope.$on('$ionicView.loaded', function () {
            /*获取数据*/
            console.log("mySubsidiaryBankTransferController")

            $('#dateBox').datePicker({
                beginyear: 2002,
                theme: 'datetime',
                callBack: function () {
//
                }
            });
        });
    }

    /*给构造函数添加$inject属性,添加注入的服务*/
    ctrl.$inject = ['$scope'];

    /*动态注册控制器*/
    app.registerController("mySubsidiaryBankTransferController",ctrl);
});