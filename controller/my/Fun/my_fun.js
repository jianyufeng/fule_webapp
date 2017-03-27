define(['animate'],function(){

    var myFun = {};

    myFun.animation = function(){
        /*我的里面的点击效果*/

        /*未读消息的点击效果*/
        $(document).on("touchstart",".unreadBox" ,function (event) {
            $(this).transition({ x:5, delay: 0 },200)
                .transition({ x: 0},200);
        });

        /*我的房子的 点击效果*/
        $(document).on("touchstart",".MyOfficeBox" ,function (event) {
            $(this).css({ background: "#fff" }).transition({ background: "#eee" },500);
        });

        $(document).on("touchend",".MyOfficeBox" ,function (event) {
            $(this).css("background","#eee").transition({ background: "#fff" },500);
        });

        /*业务相关的 放大 点击效果*/
        $(document).on("touchstart",".businessColBox" ,function (event) {
            $(this).transition({ scale: 1.1 });
        });

        $(document).on("touchend",".businessColBox" ,function (event) {
            $(this).transition({ scale: 1 });
        });

        /*未读消息 点击效果*/
        $(document).on("touchstart",".itemBox" ,function (event) {
            $(this).css({ background: "#fff" }).transition({ background: "#eee" },500);
        });

        $(document).on("touchend",".itemBox" ,function (event) {
            $(this).css("background","#eee").transition({ background: "#fff" },500);
        });
    };

    return myFun;
});