/**
 * Created by Administrator on 2017/4/14.
 */
define(['app','css! ../../../css/my/my-buyHappyHome'], function (app) {
    function ctrl($scope,$rootScope,myBuyHappyHomeServer,POP) {

        $scope.$on('$ionicView.loaded', function () {
            /*获取数据*/
            console.log("dsfs")
        });
        //// 接收传值页面传过来的地址内容
        //$rootScope.$on('changeAddressInfo', function(event, args) {
        //    console.log(args);
        //    //将新的值重新注入页面
        //    $scope.$apply(function(){
        //        $scope.address = args.address;
        //    })
        //
        //});
        //// 接收传值页面传过来的地址内容
        //$rootScope.$on('deleteAddress', function(event, args) {
        //    console.log(args);
        //    if (args.address == "NO"){
        //        $scope.address = "NO";
        //    }else {
        //        if ($scope.address.address_id == args.address_id){
        //
                    //cartOrderService.getOrderInfo($scope, POP);
        //
        //        }
        //    }
        //});

        myBuyHappyHomeServer.getBuyGoodList($scope,POP);
        $scope.seeMoreGoods = function (goodId,index) {
            if ($scope.attrGoods == undefined){
                console.log(2222);
                myBuyHappyHomeServer.getBuyGoodMoreAttr($scope,POP,goodId);
            }else {
                $('#'+"more_goodsBox_" + index).slideToggle(300);
            }
        };

    }

    /*给构造函数添加$inject属性,添加注入的服务*/
    ctrl.$inject = ['$scope','$rootScope','myBuyHappyHomeServer','POP'];

    /*动态注册控制器*/
    app.registerController('myBuyHappyHomeController', ctrl);
});