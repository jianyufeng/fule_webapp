define(['app', "css! ../../../css/my/my-manageRelationships"],function(app){

    function ctrl($scope ,myManageRelationshipsService, POP) {

        //默认不能上拉
        $scope.isCanPull = false;
        //默认服务关系页码
        $scope.managePage = 0;


        //// 下拉刷新
        //$scope.doRefresh = function(){
        //
        //    myManageRelationshipsService.getManageRelationships($scope,true);
        //
        //
        //}
        $scope.$on('$ionicView.loaded', function() {
            myManageRelationshipsService.getManageRelationships($scope, POP, function () {
            });


        });

        //内容搜索
        $scope.searchServiceRelationship = function () {

            myManageRelationshipsService.searchManageAction($scope, POP);



        }

        //监听搜索框输入的内容
        $(document).on('input propertychange','.form-control',function(){
            console.log($(this).val());

            var content = $(this).val();

            if (content == null || content == undefined || content.length <=0){

                myManageRelationshipsService.getManageRelationships($scope, POP,function () {

                });
            }


        });


// 下拉刷新
        $scope.doRefresh = function(){

            myManageRelationshipsService.getManageRelationships($scope, POP);


        }
        $scope.loadMore = function () {
            myManageRelationshipsService.getManageRelationships($scope, POP);
        }

    }

    ctrl.$inject = ['$scope', 'myManageRelationshipsService', 'POP'];
    app.registerController('myManageRelationshipsController',ctrl);


});