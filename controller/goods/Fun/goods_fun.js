define(function(){

    var goodsFun = {};

    goodsFun.menuSelected = function(){

        $(".goodsMenuItem").click(function(){

            var _index = $(".goodsMenuItem").index(this);

            $(".goodsMenuItem").removeClass("selected");

            $(".goodsMenuItem").eq(_index).addClass("selected");

        });
    };

    return goodsFun;
});