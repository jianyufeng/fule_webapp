define(['app', "css! ../../../css/my/my-manageRelationships"],function(app){

    function ctrl($scope ,myManageRelationshipsService, POP) {

        $scope.$on('$ionicView.loaded', function() {
            myManageRelationshipsService.getManageRelationships($scope, POP, function () {
                alert(ffadsf);
            });


        });



    }

    ctrl.$inject = ['$scope', 'myManageRelationshipsService', 'POP'];
    app.registerController('myManageRelationshipsController',ctrl);


});