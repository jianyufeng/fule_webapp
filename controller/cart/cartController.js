define(['app',"./Fun/cart_fun"],function(app,cart_fun){

	function ctrl($scope,cartService){

		$scope.$on('$ionicView.beforeEnter', function () {
            //判断是否登录
			if(User.isLogin()){
				$(".noCartGoodBox").hide();
			}else{
				$(".noCartGoodBox").show();
				return;
			}
        });
		
		//初始化
		$scope.righttitleValue = "编辑";
		var editOpen = false;

		//结算按钮点击时
		$(".accountBox").click(function(){
			
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
		cart_fun.addCartGoodsBtn(function(oneMoney,nowNum){
			console.log(oneMoney);
			console.log(nowNum);
		})

	
		//递减按钮
		cart_fun.reduceCartGoodsBtn(function(oneMoney,nowNum){
			console.log(oneMoney);
			console.log(nowNum);
		})

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
		cart_fun.deleteCartBtn(function(_idx){
			console.log(_idx);
		})

		//左滑动
		$scope.swipLeft = function(idx){
			cart_fun.cartIdxSideslipping(true,idx);
		}

		$scope.swipRight = function(idx){
			cart_fun.cartIdxSideslipping(false,idx);
		}
		
	}

	ctrl.$inject = ['$scope','cartService'];
	app.registerController('cartController',ctrl);


});