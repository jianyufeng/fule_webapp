

define(['app',"./Fun/my_fun",'css! ../../../css/my/my-happyHomeLogs'], function (app,my_fun) {

    function ctrl($scope,myHappyHomeLogsService,POP,$state) {

        $scope.$on('$ionicView.loaded', function () {
            /*获取数据*/
            $scope.righttitleValue = "编辑";
            //初始化加载喜乐之家
            myHappyHomeLogsService.getHappyHomeLogs($scope, POP);


        });




        //点击编辑购买记录
        // var editOpen = false;
        // $scope.editLogs = function(){
        //
        //     if(editOpen){
        //         $scope.righttitleValue = "编辑";
        //         my_fun.cartSideslipping(false);
        //         editOpen = false;
        //     }else{
        //         $scope.righttitleValue = "关闭";
        //         my_fun.cartSideslipping(true);
        //         editOpen = true;
        //
        //
        //     }
        //
        // };

        //点击删除
        // my_fun.deleteHappyHomeBtn(function(_idx,_id){
        //
        //     var info = User.getInfo();
        //     var deleteParams = {
        //         user_id : info.user_id,
        //         shopping_type : 1,
        //         id : _id
        //     }


            //删除购物车

            // myHappyHomeLogsService.deleteCart($scope,deleteParams,POP,_idx,$rootScope);


        // })

        // //左滑动
        // $scope.swipLeft = function(idx,id){
        //     my_fun.happyHomeIdxSideslipping(true,idx);
        // }
        //
        // $scope.swipRight = function(idx,id){
        //     my_fun.happyHomeIdxSideslipping(false,idx);
        // };



    }

    /*给构造函数添加$inject属性,添加注入的服务*/
    ctrl.$inject = ['$scope','myHappyHomeLogsService','POP','$state'];
    /*动态注册控制器*/
    app.registerController('myHappyHomeLogsController', ctrl);




});