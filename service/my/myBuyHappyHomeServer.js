define(['app'], function (app) {

    app.factory("myBuyHappyHomeServer", function () {

        var service = {};

        /*喜乐之家商品列表 信息*/
        service.getBuyGoodList = function ($scope, POP) {
            POP.StartLoading();
            //获取用户的账号
            HTTP.get(API.My.buyGoodsList, {}, function (e, data) {
                    POP.EndLoading();
                    if (e) {
                        POP.Hint("加载失败");
                        return;
                    }
                    first = false;
                    console.log(data);
                    $scope.$apply(function () {
                        $scope.goods = data.goodsInfo.data;
                    })
                }
            );
        };


        /*网络获取商品列表的属性列表 信息*/
        service.getBuyGoodMoreAttr = function ($scope, POP, goodId, $ionicScrollDelegate, $compile) {
            POP.StartLoading();
            //获取用户的账号
            HTTP.get(API.My.buyGoodsMoreAttr + "/goods_id/" + goodId, {}, function (e, data) {
                    POP.EndLoading();
                    if (e) {
                        POP.Hint("加载失败");
                        return;
                    }
                    $scope.$apply(function () {

                        var length = data.length;
                        for (var i = 0; i < length; i++) {
                            var template = [
                                '<div class="more_goodsBox">',
                                '   <div class="more_goodImgBox">',
                                '       <div class="more_goodName" id="more_goodName_' + goodId + '' + i + ' ">',
                                '       </div>',
                                '    </div>',
                                '    <div class="more_goodInfo">',
                                '              <div class="bbh_goodPrice">单价&nbsp;:&nbsp;255</div>',
                                '               <div class="bbh_goodMoney">实际金额&nbsp;:&nbsp;0</div>',
                                '     </div>',
                                '     <div class="more_buyNumberBox">',
                                '           <input class="bhh_buyNumber" type="number" placeholder="购买数量">',
                                '     </div>',
                                '     <div style="clear: both"> ',
                                '     </div>',
                                '</div>'
                            ].join("");
                            var modelHtml = $compile(template)($scope);
                            $("#more_goodsBox_" + goodId).append(modelHtml);


                            var lth =  data[i].attr_info.length
                            for(var j= 0;j<lth;j++){
                                var tem = [
                                    '<div class="goodAttrNameBox">',
                                    '   属性&nbsp;:&nbsp;',
                                    '   <span class="goodAttrVal">值</span>',
                                    '</div>'
                                ].join("");
                                var modelH = $compile(tem)($scope);
                                var sss = "#more_goodName_" + goodId + i ;
                                console.log(sss)
                                console.log($('#sss'));
                                $("#more_goodName_" + goodId + i).append(modelH);
                            }
                        }


                        $('#' + "more_goodsBox_" + goodId).slideDown(300, function () {
                            var scroller = $ionicScrollDelegate.$getByHandle('bhh_scroll');
                            var scrollPosition = scroller.getScrollPosition();
                            var currentScroll = scrollPosition.top;
                            scroller.scrollTo(0, currentScroll + 60, true);
                        });
                    })
                }
            );
        };

        return service;


    })
    ;


})
;