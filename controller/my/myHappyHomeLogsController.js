

define(['app',"./Fun/my_fun",'css! ../../../css/my/my-happyHomeLogs'], function (app,my_fun) {

    function ctrl($scope,myHappyHomeLogsService,POP,$state) {

        $scope.$on('$ionicView.loaded', function () {

            //初始化加载喜乐之家
            myHappyHomeLogsService.getHappyHomeLogs($scope, POP,function () {
                console.log($scope.logsData);

                //判断是否登录
                if($scope.logsData.length >0){
                    $scope.righttitleValue = "编辑";
                    $(".noRecord").hide();
                }else{
                    $scope.righttitleValue = "";
                    $(".noRecord").show();
                    return;
                }


            });

        });




       // 点击编辑购买记录
        var editOpen = false;
        $scope.editLogs = function(){

            if(editOpen){
                $scope.righttitleValue = "编辑";
                my_fun.happyHomeSideslipping(false);
                editOpen = false;
            }else{
                $scope.righttitleValue = "关闭";
                my_fun.happyHomeSideslipping(true);
                editOpen = true;

            }

        };


         //点击删除
        my_fun.deleteHappyHomeBtn(function(_indx,_idNum){

           // 删除购买记录

            myHappyHomeLogsService.deleteHappyHomeLogs($scope,POP,_idNum,_indx);


        })

        //左滑动
        $scope.swipLeft = function(_indx,_idNum){
            my_fun.happyHomeIdxSideslipping(true,_indx);
        }

        $scope.swipRight = function(_indx,_idNum){
            my_fun.happyHomeIdxSideslipping(false,_indx);
        };



    }

    /*给构造函数添加$inject属性,添加注入的服务*/
    ctrl.$inject = ['$scope','myHappyHomeLogsService','POP','$state'];
    /*动态注册控制器*/
    app.registerController('myHappyHomeLogsController', ctrl);




});