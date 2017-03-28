/**
 * Created by Administrator on 2017/3/24.
 */
define(['app',"css! ../../../css/login/login"],function(app){
    function ctrl($scope) {

        $scope.$on('$ionicView.loaded', function () {
            /*获取数据*/
            console.log("loginController")

        });


        /*点击登录验证模式切换*/
        $('.choiceModel').click(function (){
            var  v = $(this).val();
            if (v==0){
                $(".phoneCheckBox").fadeIn(300);
                $('.CardCheckBox').hide();
            }else{
                $(".phoneCheckBox").hide();
                $('.CardCheckBox').fadeIn(300);

            }
        })


    }

    /*给构造函数添加$inject属性,添加注入的服务*/
    ctrl.$inject = ['$scope'];

    /*动态注册控制器*/
    app.registerController("loginController",ctrl);
});