/**
 * Created by Administrator on 2017/3/24.
 */
define(['app',"css! ../../../css/my/my-transferRecord"],function(app){
    function ctrl($scope,myTransferRecordService,POP) {

        $scope.$on('$ionicView.loaded', function () {

            //默认不可以拉上
            $scope.isCanPull = false;
            //默认页数
            $scope.page = 0;
            //默认获取商城订单
            var type =3 ;
            //导航栏的点击事件 获取订单并展示
            $('.tr_nav').click(function () {
                //重置页数
                $scope.page = 0;
                //重置上拉
                $scope.isCanPull = false;
                var allNav = $('.tr_nav');
                var index = allNav.index(this);
                allNav.css("color", "#020202");
                $(this).css("color", "#d39bc5");
                switch (index) {
                    case 0:
                        type = 3;
                        //全部记录
                        break;
                    case 1:
                        type = 1;
                        //转出记录
                        break;
                    case 2:
                        type = 2;
                        //转入记录
                        break;
                }
                //获取全部记录
                myTransferRecordService.getTransferRecord($scope, POP, type);
            });

            // 默认 获取全部记录
            myTransferRecordService.getTransferRecord($scope, POP, type);
            //加载更多
            $scope.loadMore = function () {
                myTransferRecordService.getTransferRecord($scope, POP, type);
            }
        });
    }

    /*给构造函数添加$inject属性,添加注入的服务*/
    ctrl.$inject = ['$scope','myTransferRecordService','POP'];

    /*动态注册控制器*/
    app.registerController("myTransferRecordController",ctrl);
});