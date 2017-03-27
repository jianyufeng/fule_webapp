/**
 * Created by Administrator on 2017/3/25.
 */



define(['app', 'css! ../../../css/category/productInfo'], function (app) {

    function ctrl($scope, productInfoService, $ionicSlideBoxDelegate) {
        $scope.$on('$ionicView.loaded', function () {
            /*获取数据*/
            console.log("productInfoController")
            productInfoService.getProductInfo($scope);
            productInfoService.setImageMargin();
        });

        $scope.index = 0;
        $scope.onSlideChanged = function (index) {
            $scope.index = index;
            // 获取所有 instructions 的子元素
            var ch=$(".instructions").children();
            for(var i=0;i<ch.length;i++){
                if(index==i){
                    ch.eq(i).attr("src",'./resource/images/icon/point_hover.png')
                }else {
                    ch.eq(i).attr("src",'./resource/images/icon/point_gray.png')
                }
            }
        }
    }


    ctrl.$inject = ['$scope', 'productInfoService'];
    app.registerController('productInfoController', ctrl);


});