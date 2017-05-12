define(['app', 'css! ../../../css/my/my-happyHomeList'], function (app) {
    function ctrl($scope, myHappyHomeListService, POP, $state) {

        $scope.$on('$ionicView.loaded', function () {
            /*获取数据*/
            $scope.righttitleValue = "购买记录";
            //初始化加载喜乐之家
            myHappyHomeListService.getHappyHomeList($scope, POP, function () {
                //判断是否登录
                if ($scope.happyHomeData.length > 0) {
                    $scope.righttitleValue = "购买记录";
                    $(".noHappyHome").hide();
                } else {
                    $scope.righttitleValue = "";
                    $(".noHappyHome").show();
                    return;
                }


            });


        });

        //购买记录
        $scope.toPurchaseHistory = function () {
            $state.go("tab.my-happyHomeLogs");
        };

        //点击进入喜乐之家
        $scope.goNext = function (index) {
            var configId = $scope.happyHomeData[index].id;

            $state.go("tab.my-happyHomeUpgrade", {"configId": configId});
        }
    }

    /*给构造函数添加$inject属性,添加注入的服务*/
    ctrl.$inject = ['$scope', 'myHappyHomeListService', 'POP', '$state'];
    /*动态注册控制器*/
    app.registerController('myHappyHomeListController', ctrl);


});