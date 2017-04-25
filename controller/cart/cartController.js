define(['app',"./Fun/cart_fun"],function(app,cart_fun){

	function ctrl($rootScope,$scope,cartService,POP,$state,$ionicScrollDelegate){

		$scope.blurAction = function(){
			$(".changeBtn input").blur();
		}


		$(document).on("focus",".changeBtn input",function(){

			// 	var scrollTop = $ionicScrollDelegate.$getByHandle('mainScroll');
			// 	var top = scrollTop.getScrollPosition().top;
			//  	var offsetTop = ($(this).offset().top - 55);

			// $ionicScrollDelegate.scrollTo(0,top + offsetTop,true);

			//$("#abc").css("height","100%");
		// 	var showH     = $(window).height() - 55 - 30 - 60 - 60;
		// 	var offsetTop = ($(this).offset().top - 55);

		// 	var scrollTop = $ionicScrollDelegate.$getByHandle('mainScroll');
		// 	var top = scrollTop.getScrollPosition().top;

		// 	if(offsetTop > showH/2){
		// 		$("#abc").height(top + 500)

		// 		console.log(1111);

		// 		$ionicScrollDelegate.scrollTo(0,top + offsetTop+200,true);

		// 	}

		// 	console.log(showH);
		//	console.log(offsetTop);



			// if(top > 50){

			// 	console.log(1)
			// 	$ionicScrollDelegate.scrollTo(0,200,true);

			// }
		});

		$scope.$on("viewOnFinish", function () {
			$(".cartGoodsImage img").myImageLazyLoad({
				//默认三个参数可不传，使用默认参数
				// imageLoadErr : "./resource/images/default/default_image.png", //加载失败占位图
				// imageServer : "http://image.38zs.net:848",				    //图片服务器地址
				// animate     : true,											//是否动画显示
			});

		});

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
		$(document).off("click").on("click",".cartAccountBox",function(){

			POP.Confirm("您确认要购买已选产品?",function(){
				$state.go("tab.cart_orderConfirm");
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
		cart_fun.addCartGoodsBtn(POP,function(countMoney,nowNum,gid,cartId,goodsNumber,limitNumber){

			console.log(goodsNumber);
			console.log(limitNumber);

			var info = User.getInfo();
			var updateParams = {
				user_id : info.user_id,
				shopping_type : 1,
				id : cartId,
				goods_number : nowNum,
				goods_price :countMoney,
				goods_id : gid
			};


			cartService.updateCart($scope,updateParams,POP,$rootScope);

			

		})
		
		


		//递减按钮
		cart_fun.reduceCartGoodsBtn(POP,function(countMoney,nowNum,gid,cartId,goodsNumber,limitNumber){

			console.log(goodsNumber);
			console.log(limitNumber);



			var info = User.getInfo();
			var updateParams = {
				user_id : info.user_id,
				shopping_type : 1,
				id : cartId,
				goods_number : nowNum,
				goods_price :countMoney,
				goods_id : gid
			};
			
			cartService.updateCart($scope,updateParams,POP,$rootScope);

		})

		//输入框改变时
		cart_fun.changeCartGoodsBtn(POP,function(countMoney,nowNum,gid,cartId){

			var info = User.getInfo();
			var updateParams = {
				user_id : info.user_id,
				shopping_type : 1,
				id : cartId,
				goods_number : nowNum,
				goods_price :countMoney,
				goods_id : gid
			};

			cartService.updateCart($scope,updateParams,POP,$rootScope);

			
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

			POP.Confirm("您是否放弃购买当前产品?",function(){

				console.log(7758521);
				var info = User.getInfo();
				var deleteParams = {
					user_id : info.user_id,
					shopping_type : 1,
					id : _id
				}

				//删除购物车
				cartService.deleteCartGood($scope,deleteParams,POP,_idx,$rootScope);

			});


		})

		//左滑动出现删除
		$scope.swipLeft = function(idx,id){
			cart_fun.cartIdxSideslipping(true,idx);
		}

		//右滑动还原
		$scope.swipRight = function(idx,id){
			cart_fun.cartIdxSideslipping(false,idx);
		};
		
	}


	ctrl.$inject = ['$rootScope','$scope','cartService', 'POP','$state','$ionicScrollDelegate'];
	app.registerController('cartController',ctrl);


});