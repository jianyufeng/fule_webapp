/**
 * Created by Administrator on 2017/5/3.
 */


define(['app'], function () {

    var myFun = {};

    var rightflag = 1;
    var leftFlag = 1;
    var rightTimer = null;
    var leftTimer = null;

    myFun.startTagAnimate = function () {

        rightTimer = setInterval(function () {

            (function () {

                $("#rightTag").animate({"right": (-5 * rightflag ) + "px"}, 500, function () {
                    rightflag = -rightflag;
                });

            })();

        }, 500);


        leftTimer = setInterval(function () {

            (function () {

                $("#leftTag").animate({"left": (-5 * leftFlag ) + "px"}, 500, function () {
                    leftFlag = -leftFlag;
                });

            })();

        }, 500);


    }

    myFun.clear=function(){
        clearInterval(rightTimer);
        clearInterval(leftTimer);
    }
    myFun.showLeftOrRight = function ($scope, $ionicScrollDelegate) {
        var delegate = $ionicScrollDelegate.$getByHandle('topScroll');
        var position = delegate.getScrollPosition();
        var width = $(".of_navBox").width();
        var scrWidth = $(document.body).width();
        if ((width + 10) < scrWidth) {
            $("#leftTag").hide();
            $("#rightTag").hide();
            return;
        }
        if (position.left == 0) {
            $("#leftTag").hide();
            $("#rightTag").show();
            return;
        }
        if (position.left == (width - scrWidth)) {
            $("#rightTag").hide();
            $("#leftTag").show();
            return;
        }

    }

    return myFun;
});