define(function(){

    var homeFun = {};

    /*
     * 轮播广告实现
     */
    homeFun.createBanner = function($scope){

        //轮播广告实现部分
		var deviceWidth = $(window).width();

		//初始化广告轮播信息
		$(".home_banner_box .banner_ul").width(deviceWidth * 6);
		$(".home_banner_box .banner_ul li").width(deviceWidth);

		//拷贝DOM
		var firstDom = $(".home_banner_box .banner_ul li:eq(0)").clone(true);
		var lastDom  = $(".home_banner_box .banner_ul li:eq(3)").clone(true);

		$(".home_banner_box .banner_ul").append(firstDom);
		$(".home_banner_box .banner_ul").prepend(lastDom);
		$(".home_banner_box .banner_ul").css("marginLeft",-(deviceWidth));

		//当前索引
		var _bannerIndex = 1;

		//向左边轻扫
		$scope.bannerLeftSwipe = function(){

			_bannerIndex ++ ;

			if(_bannerIndex >= 5){
				$(".home_banner_box .banner_ul").animate({"marginLeft":-(deviceWidth * _bannerIndex)},200,function(){
					$(".home_banner_box .banner_ul").css("marginLeft",-(deviceWidth));
					_bannerIndex = 1;
					$(".banner_control li").removeClass("banner_active");
					$(".banner_control li:eq("+(_bannerIndex-1)+")").addClass("banner_active");
				});



			}else{
				$(".home_banner_box .banner_ul").animate({"marginLeft":-(deviceWidth * _bannerIndex)},200);
			}

			$(".banner_control li").removeClass("banner_active");
			$(".banner_control li:eq("+(_bannerIndex-1)+")").addClass("banner_active");

		}

		//向右边轻扫
		$scope.bannerRightSwipe = function(){

			_bannerIndex --;

			if(_bannerIndex < 1){

				$(".home_banner_box .banner_ul").animate({"marginLeft":0},200,function(){
					$(".home_banner_box .banner_ul").css("marginLeft",-(deviceWidth * 4));
					_bannerIndex = 4;
				});
			}else{
				$(".home_banner_box .banner_ul").animate({"marginLeft":-(deviceWidth * _bannerIndex)},200);
			}


			$(".banner_control li").removeClass("banner_active");
			$(".banner_control li:eq("+(_bannerIndex-1)+")").addClass("banner_active");

		}
    }

    return homeFun;
});