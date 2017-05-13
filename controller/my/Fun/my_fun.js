define(['animate'], function () {

    var myFun = {};

    myFun.animation = function () {
        /*我的里面的点击效果*/

        /*未读消息的点击效果*/
        $(document).off("touchstart", ".unreadBox").on("touchstart", ".unreadBox", function (event) {
            $(this).transition({x: 5, delay: 0}, 200)
                .transition({x: 0}, 200);
        });

        /*我的房子的 点击效果*/
        $(document).off("touchstart", ".MyOfficeBox").on("touchstart", ".MyOfficeBox", function (event) {
            $(this).css({background: "#fff"}).transition({background: "#eee"}, 200);
        });

        $(document).off("touchend", ".MyOfficeBox").on("touchend", ".MyOfficeBox", function (event) {
            $(this).css("background", "#eee").transition({background: "#fff"}, 200);
        });
        /*退出 点击效果*/
        $(document).off("touchstart", ".loginOutBox").on("touchstart", ".loginOutBox", function (event) {
            $(this).css("color","#000").transition({color: "#999"},200);
        });

        $(document).off("touchend", ".loginOutBox").on("touchend", ".loginOutBox", function (event) {
            $(this).css("color", "#999").transition({color: "#000"}, 200);
        });

        // /*业务相关的  点击效果*/
         $(document).off("touchstart",".businessColBox").on("touchstart",".businessColBox" ,function (event) {
             $(this).css("background-color","#fff").transition({background: "#F5F5F5"},200);
         });
         $(document).off("touchend",".businessColBox").on("touchend",".businessColBox" ,function (event) {
             $(this).css("background-color", "#F5F5F5").transition({background: "#fff"}, 200);
         });

        /*未读消息 点击效果*/
        $(document).off("touchstart", ".itemBox").on("touchstart", ".itemBox", function (event) {
            $(this).css({background: "#fff"}).transition({background: "#eee"}, 10);
        });

        $(document).off("touchend", ".itemBox").on("touchend", ".itemBox", function (event) {
            $(this).css("background", "#eee").transition({background: "#fff"}, 10);
        });

        /*登录 注册点击效果*/
        $(document).off("touchstart", ".goLogin").on("touchstart", ".goLogin", function (event) {
            $(this).css({background: "#d98bbc"}).transition({background: "#d9a9cd"}, 500);
        });
        $(document).off("touchend", ".goLogin").on("touchend", ".goLogin", function (event) {
            $(this).css("background", "#d9a9cd").transition({background: "#d98bbc"}, 500);
        });
        /*登录 注册点击效果*/
        $(document).off("touchstart", ".goRegister").on("touchstart", ".goRegister", function (event) {
            $(this).css({background: "#d98bbc"}).transition({background: "#d9a9cd"}, 500);
        });
        $(document).off("touchend", ".goRegister").on("touchend", ".goRegister", function (event) {
            $(this).css("background", "#d9a9cd").transition({background: "#d98bbc"}, 500);
        });
    };


    myFun.happyHomeSideslipping = function (isOpen) {

        if (isOpen) {
            $(".historyBox").animate({"left": -100}, 200);
            $(".deleteLogBox").animate({"right": 0}, 200);
        } else {
            $(".historyBox").animate({"left": 0}, 200);
            $(".deleteLogBox").animate({"right": -110}, 200);
        }
    }

    myFun.happyHomeIdxSideslipping = function (isOpen, idx) {
        if (isOpen) {
            $(".historyBox:eq(" + idx + ")").animate({"left": -100}, 200);
            $(".deleteLogBox:eq(" + idx + ")").animate({"right": 0}, 200);

        } else {
            $(".historyBox:eq(" + idx + ")").animate({"left": 0}, 200);
            $(".deleteLogBox:eq(" + idx + ")").animate({"right": -110}, 200);
        }
    }


    myFun.deleteHappyHomeBtn = function (fn) {

        $(document).on("click", ".deleteLogBox", function () {
            var _idx = $(".deleteLogBox").index(this);
            var _id  = $(this).attr("id");
            fn(_idx, _id);

        });
    }


    return myFun;
});