/**
 * Created by Administrator on 2017/3/24.
 */
define(['app','./Fun/my_fun',"css! ../../../css/my/unreadMessage"],function(app,my_fun){
    function ctrl($scope,$timeout) {


        /*加载界面动画*/
        my_fun.animation();


        $scope.edit = function(item) {
            alert('Edit Item: ' + item.id);
        };
        $scope.share = function(item) {
            alert('Share Item: ' + item.id);
        };

        $scope.moveItem = function(item, fromIndex, toIndex) {
            $scope.items.splice(fromIndex, 1);
            $scope.items.splice(toIndex, 0, item);
        };

        $scope.onItemDelete = function(item) {
            $scope.items.splice($scope.items.indexOf(item), 1);
        };

        /*下拉刷新*/
        $scope.doRefresh = function () {
            $timeout(function () {
                $scope.$broadcast('scroll.refreshComplete');
            }, 2000);
        };


        $scope.$on('$ionicView.loaded', function () {

            /*获取数据*/
            $scope.items = [
                { id: 0 },
                { id: 1 },
                { id: 2 },
                { id: 3 },
                { id: 4 },
                { id: 5 },
                { id: 6 },
                { id: 7 },
                { id: 8 },
                { id: 9 },
                { id: 10 },
                { id: 11 },
                { id: 12 }
            ];
        });
    }

    /*给构造函数添加$inject属性,添加注入的服务*/
    ctrl.$inject = ['$scope','$timeout'];

    /*动态注册控制器*/
    app.registerController("myUnreadMessageController",ctrl);
});