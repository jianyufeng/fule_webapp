
var serverIP = "http://192.168.10.123:5000";

var API = {



    Goods : {
        goods: serverIP + "/_goods/search"
    },

    My : {
        myInfo: serverIP +"/_my/search"
    },

    Cart : {
        cartSearch:serverIP + "/_cart/search",

        cartAdd:serverIP + "/_cart/addGoods"
    },

    Category : {
       
       category : serverIP + "/_category/search",
        productInfo:serverIP+"/_category/goodsDetail"
    },

    Home : {
        
    }

};