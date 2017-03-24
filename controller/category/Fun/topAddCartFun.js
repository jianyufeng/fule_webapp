/**
 * Created by ShareLock on 2017/3/23.
 * 加入购物车的特效
 */

define(function(){


    var offset = $(".tab-item:eq(3)").offset();
    $.(".cartTag").click=function(){

        var addcar = $(this);

        var img = $(this).find('img').attr('src');
        var flyer = $('<img class="u-flyer" src="'+img+'">');


    }

})
