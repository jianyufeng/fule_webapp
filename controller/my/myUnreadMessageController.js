/**
 * Created by Administrator on 2017/3/24.
 */
define(['app', './Fun/my_fun', "css! ../../../css/my/unreadMessage", 'dotdotdot'], function (app) {
    function ctrl($scope, myUnreadMsgService, POP, $state) {
        $(".mytab").find(".tab-title").css("color", "#000000");
        $(".myIcon").find(".tab-title").css("color", "#D9A8CD");
        /*加载界面动画*/
        /*未读消息 点击效果*/
        $(document).off("touchstart", ".itemBox").on("touchstart", ".itemBox", function (event) {
            $(this).css({background: "#fff"}).transition({background: "#eee"}, 10);
        });

        $(document).off("touchend", ".itemBox").on("touchend", ".itemBox", function (event) {
            $(this).css("background", "#eee").transition({background: "#fff"}, 10);
        });

        $scope.$on("viewOnFinish", function () {
            //显示省略号
            $(".contentBox").dotdotdot({
                wrap: 'letter'
            });
        });
        //默认不可以拉上
        $scope.isCanPull = false;
        //默认页数
        $scope.page = 0;
        /*获取数据*/
        myUnreadMsgService.getUnreadMsg($scope, POP,true);

        /*下拉刷新*/
        $scope.doRefresh = function () {
            //重置页数
            $scope.page = 0;
            //重置上拉
            $scope.isCanPull = false;
            myUnreadMsgService.getUnreadMsg($scope, POP,false);
        };
        //加载更多
        $scope.loadMore = function () {
            myUnreadMsgService.getUnreadMsg($scope, POP,false);
        };
        //跳转详情
        $scope.showDetail = function (item) {
            $state.go('tab.my-unreadMessageDetail', {
                title: item.title,
                add_time: item.add_time,
                create_user_name: item.create_user_name,
                article_id:item.id
            });
        };
    }

    /*给构造函数添加$inject属性,添加注入的服务*/
    ctrl.$inject = ['$scope', 'myUnreadMsgService', 'POP', '$state'];

    /*动态注册控制器*/
    app.registerController("myUnreadMessageController", ctrl);
});