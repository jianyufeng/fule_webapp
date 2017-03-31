/**
 * Created by Administrator on 2017/3/24.
 */
define(['app','./Fun/my_fun',"css! ../../../css/my/unreadMessage",'dotdotdot'],function(app,my_fun){
    function ctrl($scope,myUnreadMsgService,POP) {


        /*加载界面动画*/
        my_fun.animation();


        //$scope.$on("viewOnFinish",function(){
        //
        //    //显示省略号
        //    $(".contentBox").dotdotdot({
        //        wrap: 'letter'
        //    });
        //});

        //默认不可以拉上
        $scope.isCanPull = false;
        //默认页数
        $scope.page = 0;
        //默认获取商城订单

        myUnreadMsgService.getUnreadMsg($scope,POP);
        /*下拉刷新*/
        $scope.doRefresh = function () {
            //重置页数
            $scope.page = 0;
            //重置上拉
            $scope.isCanPull = false;

            myUnreadMsgService.getUnreadMsg($scope,POP);
        };
        //加载更多
        $scope.loadMore = function () {
            myUnreadMsgService.getUnreadMsg($scope,POP);
        }

    }

    /*给构造函数添加$inject属性,添加注入的服务*/
    ctrl.$inject = ['$scope','myUnreadMsgService','POP'];

    /*动态注册控制器*/
    app.registerController("myUnreadMessageController",ctrl);
});