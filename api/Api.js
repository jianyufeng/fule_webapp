var serverIP = "http://192.168.10.123:5000";

var API = {


    Goods: {
        goods: serverIP + "/_goods/search"
    },

    My: {
        myInfo: serverIP + "/_my/search"
    },

    Cart: {
        cartSearch: serverIP + "/_cart/search",
        cartAdd: serverIP + "/_cart/addGoods",
        orderInfo:serverIP + "/_goods/payment",
        updateCart : serverIP + "/cart/updateCartGoods",
        deleteCart : serverIP + "/cart/deleteCartGoods"

    },

    Category: {
        //分类页面
        category: serverIP + "/_category/search",
        // 产品详情
        productInfo: serverIP + "/_category/goodsDetail",
        //获取购物车数量
        getCartNum:serverIP+"/_cart/searchCartCount"
    },

    Home: {}

};