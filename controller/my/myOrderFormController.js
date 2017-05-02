/**
 * Created by Administrator on 2017/3/24.
 */
define(['app', "css! ../../../css/my/myOrderForm"], function (app) {
    function ctrl($scope, myOrderFormService, POP, $ionicScrollDelegate) {

        $scope.$on('$ionicView.loaded', function () {
            /*获取数据*/
            console.log("myOrderFormController")
        });

        //默认不可以拉上
        $scope.isCanPull = false;
        //默认页数
        $scope.page = 0;
        //默认获取商城订单
        var type =0 ;
        //导航栏的点击事件 获取订单并展示
        $('.of_nav').click(function () {
            //滚动到顶部
            smallToTop();

            //重置页数
            $scope.page = 0;
            //重置上拉
            $scope.isCanPull = false;
            var allNav = $('.of_nav');
            var index = allNav.index(this);
            allNav.css("color", "#020202");
            $(this).css("color", "#d39bc5");
            $scope.$apply(function () {
                $scope.data = [];
            });
            switch (index) {
                case 0:
                    type = 0;
                    //商城订单
                    break;
                case 1:
                    type = 1;
                    //提货订单
                    break;
                case 2:
                    type = 2;
                    //重复消费订单
                    break;
                case 3:
                    type = 3;
                    //申请专柜
                    break;
                case 4:
                    //申请专卖店
                    type = 4;
                    break;
                case 5:
                    //申请旗舰店
                    type = 5;
                    break;
                case 6:
                    //辅销品订单
                    type = 6;
                    break;
                case 7:
                    //辅销品换购订单
                    type = 7;
                    break;
                case 8:
                    //喜乐之家订单
                    type = 8;
                    break;
                case 9:
                    //旗舰店报单
                    type = 9;
                    break;
                case 10:
                    //超期空升特批
                    type = 10;
                    break;
            }
            //获取订单
            myOrderFormService.getShopOrderForm($scope, POP, type);
        });
        var smallToTop =function() {
            $ionicScrollDelegate.$getByHandle('small').scrollTop();
        };
        // 默认 获取商城订单
        myOrderFormService.getShopOrderForm($scope, POP, type);
        //加载更多
        $scope.loadMore = function () {
            myOrderFormService.getShopOrderForm($scope, POP, type);
        }


    }

    /*给构造函数添加$inject属性,添加注入的服务*/
    ctrl.$inject = ['$scope', 'myOrderFormService', 'POP', '$ionicScrollDelegate'];

    /*动态注册控制器*/
    app.registerController("myOrderFormController", ctrl);
});