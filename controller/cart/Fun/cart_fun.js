define(function(){

    var cartFun = {};

    cartFun.goodsAddcart = function(cartItemId){

        $(document).on("touchstart",".accountBox" ,function (event) {
            $(this).css({ background: "#fff" }).transition({ background: "#eee" },1000);
        });



    }


    //购物车商品选择按钮
    cartFun.cartGoodsSelectBtn = function(fn){
        $(".selectBtn").click(function () {
			var _idx = $(".selectBtn").index(this);
			if($(this).find("img").is(':visible')){
				$(this).find("img").hide();
			}else{
				$(this).find("img").show();
			}

            fn(_idx);
		});
    }

    cartFun.allGoodsSelectBtn = function(fn){
        $(".allSelectBtn").click(function(){
			if($(this).find("img").is(':visible')){
				$(this).find("img").hide();
				$(".selectBtn").find("img").hide();
                fn(false);
			}else{
				$(this).find("img").show();
				$(".selectBtn").find("img").show();
                fn(true);
			}
		})
    }

    cartFun.addCartGoodsBtn = function(fn){
        $(".addBtn").click(function(){
			
			//获取单价
			var moneyValue = parseInt($(this).parent().prev().find("span b").text());

			//获取当前的数量
			var nowNum = parseInt($(this).next().text());

			nowNum++;

			$(this).next().text(nowNum);

			//重新计算总价
            fn(moneyValue,nowNum);

		});
    }

    cartFun.reduceCartGoodsBtn = function(fn){
        $(".reduceBtn").click(function(){

			//获取单价
			var moneyValue = parseInt($(this).parent().prev().find("span b").text());

			//获取当前的数量
			var nowNum = parseInt($(this).prev().text());

			nowNum--;

			$(this).prev().text(nowNum);

			//重新计算总价
            fn(moneyValue,nowNum);

		});
    }

    cartFun.cartSideslipping = function(isOpen){

        if(isOpen){
				$(".buyerItemMain").animate({"left":-100},200);
				$(".deleteBox").animate({"right":0},200);
			}else{
				$(".buyerItemMain").animate({"left":0},200);
				$(".deleteBox").animate({"right":-110},200);
			}
    }

    cartFun.cartIdxSideslipping = function(isOpen,idx){
        if(isOpen){
				$(".buyerItemMain:eq("+idx+")").animate({"left":-100},200);
				$(".deleteBox:eq("+idx+")").animate({"right":0},200);
			}else{
				$(".buyerItemMain:eq("+idx+")").animate({"left":0},200);
				$(".deleteBox:eq("+idx+")").animate({"right":-110},200);
			}
    }

    cartFun.deleteCartBtn = function(fn){
        $(".deleteBox").click(function(){
		    var _idx = $(".deleteBox").index(this);
            $(this).parent().slideUp(200,function(){
                fn(_idx);
            });
		});
    }

    return cartFun;
});