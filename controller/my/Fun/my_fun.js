define(['animate'],function(){

    var myFun = {};

    myFun.animation = function(){

        $(document).on("touchstart",".unreadBox" ,function (event) {
            $(this).transition({ x:5, delay: 0 },200)
                .transition({ x: 0},200);
        });


        $(document).on("touchstart",".MyOfficeBox" ,function (event) {
            $(this).css({ background: "#fff" }).transition({ background: "#eee" },1000);
        });

        $(document).on("touchend",".MyOfficeBox" ,function (event) {
            $(this).css("background","#fff");
        });

        $(document).on("touchstart",".businessColBox" ,function (event) {
            $(this).transition({ scale: 1.1 });
        });

        $(document).on("touchend",".businessColBox" ,function (event) {
            $(this).transition({ scale: 1 });
        });

    };

    return myFun;
});