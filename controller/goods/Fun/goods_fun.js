//define(function(){
    define(['app','jquery_fly'], function (app) {
    var goodsFun = {};

    goodsFun.menuSelected = function(){

        $(".goodsMenuItem").click(function(){
            var _index = $(".goodsMenuItem").index(this);
            $(".goodsMenuItem").removeClass("selected");
            $(".goodsMenuItem").eq(_index).addClass("selected");
        });
    };


    goodsFun.addCart = function ($scope, $rootScope,$state) {

        $(document).on("click", ".goodsItem", function () {
            var goodsId=$(this).attr('name');
            $state.go("tab.productInfo",{"goodsId":goodsId});
        });

        $(document).on("click", ".goodsCart", function () {


            var offset = $(".tab-item:eq(3)").offset();
            console.log(offset);
            var addcar = $(this).parent().parent().prev();
            console.log(addcar)
            var img = addcar.find('img').attr('src');
            var flyer = $('<img class="u-flyer" src="' + img + '">');
            console.log(img);

            flyer.fly({
                start: {
                    left: event.pageX, //开始位置（必填）#fly元素会被设置成position: fixed
                    top: event.pageY //开始位置（必填）
                },
                end: {
                    left: offset.left + 10, //结束位置（必填）
                    top: offset.top + 20, //结束位置（必填）
                    width: 0, //结束时宽度
                    height: 0 //结束时高度
                },
                onEnd: function () { //结束回调
                    $scope.$apply(function () {
                        $rootScope.cartBadge++;
                    })


                }
            });

            return false;

        });
    }
    return goodsFun;
});