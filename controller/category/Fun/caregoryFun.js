/**
 * Created by ShareLock on 2017/3/23.
 * 加入购物车的特效
 */

define(['app', 'jquery_fly'], function (app) {
    var caregoryFun = {}
    caregoryFun.addCartFlay = function ($scope, $rootScope,$state) {
        $(document).on("click", ".product_item", function () {
            var goodsId=$(this).attr('name');
            $state.go("tab.productInfo",{"goodsId":goodsId});
        });

        $(document).on("click", ".cartTagBox", function () {
            var offset = $(".tab-item:eq(3)").offset();
            var addcar = $(this).parent().parent().parent();
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



    return caregoryFun;

})
