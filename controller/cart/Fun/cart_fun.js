define(function(){

    var cartFun = {};

    cartFun.goodsAddcart = function(cartItemId){

        $(document).on("touchstart",".accountBox" ,function (event) {
            $(this).css({ background: "#fff" }).transition({ background: "#eee" },1000);
        });



    }

    return cartFun;
});