

define(['app',"./Fun/my_fun",'css! ../../../css/my/my-happyHomeLogs'], function (app,my_fun) {

    function ctrl($scope,myHappyHomeLogsService,POP) {
        $(".mytab").find(".tab-title").css("color", "#000000");
        $(".myIcon").find(".tab-title").css("color", "#D9A8CD");
        $scope.$on('$ionicView.beforeEnter', function () {

            //初始化加载喜乐之家
            myHappyHomeLogsService.getHappyHomeLogs($scope, POP,function () {
                //判断是否登录
                if($scope.logsData.length >0){
                    $scope.righttitleValue = "删除";
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
                $scope.righttitleValue = "删除";
                my_fun.happyHomeSideslipping(false);
                editOpen = false;
            }else{
                $scope.righttitleValue = "关闭";
                my_fun.happyHomeSideslipping(true);
                editOpen = true;

            }

        };


         //点击删除
        my_fun.deleteHappyHomeBtn(function(_idx,_id){

            console.log("index : "+ _idx);
            console.log("id : " + _id);


            POP.Confirm("确认删除掉当前购买记录?",function () {

                // 删除购买记录
                myHappyHomeLogsService.deleteHappyHomeLogs($scope,POP,_id,_idx);


            })




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
    ctrl.$inject = ['$scope','myHappyHomeLogsService','POP'];
    /*动态注册控制器*/
    app.registerController('myHappyHomeLogsController', ctrl);




});