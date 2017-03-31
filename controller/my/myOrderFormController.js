/**
 * Created by Administrator on 2017/3/24.
 */
define(['app', "css! ../../../css/my/myOrderForm"], function (app) {
    function ctrl($scope, myOrderFormService, POP) {

        $scope.$on('$ionicView.loaded', function () {
            /*获取数据*/
            console.log("myOrderFormController")
        });

        //默认不可以拉上
        $scope.isCanPull = false;
        //页数
        $scope.page =0;
        var type;
        $('.of_nav').click(function () {
            //重置页数
            $scope.page =0;
            //重置上拉
            $scope.isCanPull = false;

            var allNav = $('.of_nav');
            var index = allNav.index(this);
            allNav.css("color", "#020202");
            $(this).css("color", "#d39bc5");

            switch (index) {
                case 0:
                    type = 0;
                    //获取商城订单
                    myOrderFormService.getShopOrderForm($scope, POP,type);
                    break;
                case 1:
                    type = 0;
                    //批发订单
                    myOrderFormService.getShopOrderForm($scope, POP, type);
                    break;
                case 2:
                    type = 1;
                    //提货订单
                    myOrderFormService.getShopOrderForm($scope, POP, type);
                    break;
                case 3:
                    type = 6;
                    //辅销订单
                    myOrderFormService.getShopOrderForm($scope, POP, type);
                    break;
                case 4:
                    type = 8;
                    //喜乐订单
                    myOrderFormService.getShopOrderForm($scope, POP, type);
                    break;
            }
        });
        //获取商城订单
        myOrderFormService.getShopOrderForm($scope, POP, false);

        //加载更多
        $scope.loadMore = function () {
            myOrderFormService.getShopOrderForm($scope, POP, type);
        }


    }

    /*给构造函数添加$inject属性,添加注入的服务*/
    ctrl.$inject = ['$scope', 'myOrderFormService', 'POP'];

    /*动态注册控制器*/
    app.registerController("myOrderFormController", ctrl);
});