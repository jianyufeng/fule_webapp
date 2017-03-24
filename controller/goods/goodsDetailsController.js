define(['app'],function(app){

    function ctrl($scope){

        $scope.$on('$ionicView.loaded', function() {
            console.log("loaded");
        });

        $scope.$on('$ionicView.beforeEnter', function() {
            console.log("beforeEnter");
        });



    }

    ctrl.$inject = ['$scope'];
    app.registerController('goodsDetailsController',ctrl);


});