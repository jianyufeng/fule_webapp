/**
 * Created by Administrator on 2017/3/24.
 */
define(['app',"css! ../../../css/my/unreadMessage"],function(app){
    function ctrl($scope, $stateParams,myUnreadMsgService,POP,$sce) {
        $scope.title = $stateParams.title;
        $scope.add_time = $stateParams.add_time;
        $scope.create_user_name = $stateParams.create_user_name;
        var article_id = $stateParams.article_id;
        $scope.$on('$ionicView.loaded', function () {
            /*获取数据*/
            myUnreadMsgService.getUnreadMsgInfo($scope,$sce,POP,article_id);
        });
    }
    /*给构造函数添加$inject属性,添加注入的服务*/
    ctrl.$inject = ['$scope','$stateParams','myUnreadMsgService','POP','$sce'];
    /*动态注册控制器*/
    app.registerController("myUnreadMessageDetailController",ctrl);
});