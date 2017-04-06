define(['app',"./Fun/cart_fun"],function(app,cart_fun){

	function ctrl($rootScope,$scope,cartService,POP,$state){


		$scope.$on('$ionicView.beforeEnter', function () {
            //判断是否登录
			if(User.isLogin()){
				$(".noCartGoodBox").hide();
			}else{
				$(".noCartGoodBox").show();
				return;
			}

			//加载数据
			if(User.isLogin()){
				cartService.getCartGoods($scope, POP, false);
			}

        });


		//初始化
		var editOpen = false;


		//结算按钮点击时
		$(document).on("click",".accountBox",function(){

			POP.Confirm("您确认要购买已选产品?",function(){
				$state.go("tab.cart_orderConfirm",{UID:1});
			});

		});

		//购物车商品选择按钮
		cart_fun.cartGoodsSelectBtn(function(_idx){
			console.log(_idx);
		});

		//全选按钮选择时
		cart_fun.allGoodsSelectBtn(function(isAll){
			console.log(isAll);
		});

		//递增按钮
		cart_fun.addCartGoodsBtn(function(countMoney,nowNum,gid,cartId){

			var info = User.getInfo();
			var updateParams = {
				user_id : info.user_id,
				shopping_type : 1,
				id : cartId,
				goods_number : nowNum,
				goods_price :countMoney,
				goods_id : gid
			};



			cartService.updateCart($scope,updateParams,POP);

			

		})
		
		


		//递减按钮
		cart_fun.reduceCartGoodsBtn(POP,function(countMoney,nowNum,gid,cartId){

			var info = User.getInfo();
			var updateParams = {
				user_id : info.user_id,
				shopping_type : 1,
				id : cartId,
				goods_number : nowNum,
				goods_price :countMoney,
				goods_id : gid
			};
			
			cartService.updateCart($scope,updateParams,POP);

		})

		//输入框改变时
		cart_fun.changeCartGoodsBtn(function(countMoney,nowNum,gid,cartId){

			var info = User.getInfo();
			var updateParams = {
				user_id : info.user_id,
				shopping_type : 1,
				id : cartId,
				goods_number : nowNum,
				goods_price :countMoney,
				goods_id : gid
			};

			cartService.updateCart($scope,updateParams,POP);

			
		});

		//编辑购物车
		var editOpen = false;
		$scope.editCart = function(){

			if(editOpen){
				$scope.righttitleValue = "编辑";
				cart_fun.cartSideslipping(false);
				editOpen = false;
			}else{
				$scope.righttitleValue = "关闭";
				cart_fun.cartSideslipping(true);
				editOpen = true;

				
			}

		};

		//点击删除
		cart_fun.deleteCartBtn(function(_idx,_id){
			
			var info = User.getInfo();
			var deleteParams = {
				user_id : info.user_id,
				shopping_type : 1,
				id : _id
			}

			console.log(deleteParams);

			//删除购物车
			
			cartService.deleteCart($scope,deleteParams,POP,_idx,$rootScope);


		})

		//左滑动
		$scope.swipLeft = function(idx,id){
			cart_fun.cartIdxSideslipping(true,idx);
		}

		$scope.swipRight = function(idx,id){
			cart_fun.cartIdxSideslipping(false,idx);
		};
		
	}


	ctrl.$inject = ['$rootScope','$scope','cartService', 'POP','$state'];
	app.registerController('cartController',ctrl);


});