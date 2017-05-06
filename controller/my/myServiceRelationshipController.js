
define(['app',"./Fun/my_fun",'css! ../../../css/my/my-serviceRelationship'], function (app,my_fun) {

    function ctrl($scope,myServiceRelationService,POP,$state,$rootScope) {

        //默认不能上拉
        $scope.isPullComplete = false;
        //默认服务关系页码
        $scope.servicePage = 0;

        $scope.$on('$ionicView.loaded', function () {

            //初始化加载喜乐之家
            myServiceRelationService.getServiceRelationship($scope, POP,function () {


            });

            // 下拉刷新
            $scope.serviceRelationshipRefresh = function () {
                myServiceRelationService.ServiceRefresh($scope);
            }



        });


        //上拉加载
        $scope.loadMoreServiceData = function () {

            myServiceRelationService.loadMoreServiceRelationship($scope, POP,function () {

                console.log("数据上拉加载完成");

            });

        }


        //内容搜索
        $scope.searchServiceRelationship = function () {

            myServiceRelationService.searchServiceAction($scope, POP);



         }

         //监听搜索框输入的内容
        $(document).on('input propertychange','.searchInput',function(){
           console.log($(this).val());

            var content = $(this).val();

            if (content == null || content == undefined || content.length <=0){

                myServiceRelationService.ServiceRefresh($scope);

            }


        });









    }

    /*给构造函数添加$inject属性,添加注入的服务*/
    ctrl.$inject = ['$scope','myServiceRelationService','POP','$state','$rootScope'];
    /*动态注册控制器*/
    app.registerController('myServiceRelationshipController', ctrl);




});