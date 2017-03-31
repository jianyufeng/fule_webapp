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

		$(document).on("click",".addBtn",function(){
      
		
			//获取单价
			var moneyValue = parseInt($(this).parent().data("price"));

			//获取当前的数量
			var nowNum = parseInt($(this).next().find("input").val());

			//获取商品ID
			var gid = $(this).parent().attr("id");

			//获取购物车ID
			var cartId = $(this).parent().attr("name");

			nowNum++;

			$(this).next().text(nowNum);

			countMoneyValue = moneyValue * nowNum;

			//重新计算总价
            fn(countMoneyValue,nowNum,gid,cartId);

		});
    }

    cartFun.reduceCartGoodsBtn = function(POP,fn){

		$(document).on("click",".reduceBtn",function(){

			//获取单价
			var moneyValue = parseInt($(this).parent().data("price"));

			//获取当前的数量
			var nowNum = parseInt($(this).prev().find("input").val());

			//获取商品ID
			var gid = $(this).parent().attr("id");

			//获取购物车ID
			var cartId = $(this).parent().attr("name");

			nowNum--;

			if(nowNum <= 0){
				POP.Hint("数量不能小余1");
				return;
			}

			$(this).prev().text(nowNum);

			countMoneyValue = moneyValue * nowNum;

			//重新计算总价
            fn(countMoneyValue,nowNum,gid,cartId);



		});
    }

	cartFun.changeCartGoodsBtn = function(fn){
		$(document).on("change",".changeBtn input",function(){

			//获取单价
			var moneyValue = parseInt($(this).parent().parent().data("price"));

			//获取当前的数量
			var nowNum = parseInt($(this).val());

			//获取商品ID
			var gid = $(this).parent().parent().attr("id");

			//获取购物车ID
			var cartId = $(this).parent().parent().attr("name");

			countMoneyValue = moneyValue * nowNum;

			//重新计算总价
            fn(countMoneyValue,nowNum,gid,cartId);
			
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
       
		$(document).on("click",".deleteBox",function(){
			var _idx = $(".deleteBox").index(this);
		    var _id = $(this).attr("id");
           // $(this).parent().slideUp(200,function(){
                fn(_idx,_id);
           // });
		});
    }

    return cartFun;
});