define(['animate'], function () {

    var myFun = {};

    myFun.animation = function () {
        /*我的里面的点击效果*/

        /*未读消息的点击效果*/
        $(document).on("touchstart", ".unreadBox", function (event) {
            $(this).transition({x: 5, delay: 0}, 200)
                .transition({x: 0}, 200);
        });

        /*我的房子的 点击效果*/
        $(document).on("touchstart", ".MyOfficeBox", function (event) {
            $(this).css({background: "#fff"}).transition({background: "#eee"}, 500);
        });

        $(document).on("touchend", ".MyOfficeBox", function (event) {
            $(this).css("background", "#eee").transition({background: "#fff"}, 500);
        });

        // /*业务相关的 放大 点击效果*/
        // $(document).on("touchstart",".businessColBox" ,function (event) {
        //     $(this).transition({ scale: 1.1 });
        // });

        // $(document).on("touchend",".businessColBox" ,function (event) {
        //     $(this).transition({ scale: 1 });
        // });

        /*未读消息 点击效果*/
        $(document).on("touchstart", ".itemBox", function (event) {
            $(this).css({background: "#fff"}).transition({background: "#eee"}, 10);
        });

        $(document).on("touchend", ".itemBox", function (event) {
            $(this).css("background", "#eee").transition({background: "#fff"}, 10);
        });

        /*登录 注册点击效果*/
        $(document).on("touchstart", ".goLogin", function (event) {
            $(this).css({background: "#d98bbc"}).transition({background: "#d9a9cd"}, 500);
        });
        $(document).on("touchend", ".goLogin", function (event) {
            $(this).css("background", "#d9a9cd").transition({background: "#d98bbc"}, 500);
        });
        /*登录 注册点击效果*/
        $(document).on("touchstart", ".goRegister", function (event) {
            $(this).css({background: "#d98bbc"}).transition({background: "#d9a9cd"}, 500);
        });
        $(document).on("touchend", ".goRegister", function (event) {
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
            var _id = $(this).attr("id");
            fn(_idx, _id);

        });
    }


    return myFun;
});