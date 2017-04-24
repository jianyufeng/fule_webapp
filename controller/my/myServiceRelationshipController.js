
define(['app',"./Fun/my_fun",'css! ../../../css/my/my-serviceRelationship'], function (app,my_fun) {

    function ctrl($scope,myServiceRelationService,POP,$state) {

        $scope.$on('$ionicView.loaded', function () {

            //初始化加载喜乐之家
            myServiceRelationService.getServiceRelationship($scope, POP,function () {
                console.log($scope.logsData);




            });

        });






    }

    /*给构造函数添加$inject属性,添加注入的服务*/
    ctrl.$inject = ['$scope','myServiceRelationService','POP','$state'];
    /*动态注册控制器*/
    app.registerController('myServiceRelationshipController', ctrl);




});