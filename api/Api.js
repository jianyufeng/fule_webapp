var serverIP = "http://192.168.10.123:5000";

var API = {


    Goods: {
        goods: serverIP + "/_goods/search"
    },

    My: {
        //myInfo: serverIP + "/_my/search",
        // 个人信息
        myInfo: serverIP + "/_user/userHome",
        myOrderForm: serverIP + "/order/searchList",
        // 查询商品条形码
        searchBarCodeGoods:serverIP+"/barCode/searchBarCodeGoods",
        // 内部转账
        internalTransfer:serverIP+"/_money/transferUserMoney",
        // 充值卡充值
        prepaidCard:serverIP+"/userCard/bindUser",
        // 转账记录
        remittanceRecord:serverIP+"/banks/searchRemittanceAdvices",
        // 代金券转账
        voucherTransfer:serverIP+"/_fxp/transferFxpPoints",
        // 代金券转账 记录
        voucherTransferRecord:serverIP+"/fxp/searchAccount",
        //转账记录
        transferRecord:serverIP+"/_money/searchTransferAccounts" ,
        //未读消息
        unreadMsg:serverIP+"/article/search",
        //未读消息详情
        unreadMsgInfo:serverIP+"/article/searchInfo",
        //添加电子币银行汇款
        eleBankTransfer:serverIP+"/banks/addRemittance",
        //获取电子币卡记录
        searchUserAccount:serverIP+"/userCard/searchLogs",
        //获取银行列表
        bankList:serverIP+"/banks/search_banks",
        //查询辅销币流水
        searchAccountLog:serverIP+"/fxp/searchIntergralLog"
    },

    Cart: {
        //购物车信息
        cartSearch: serverIP + "/_cart/search",
        //添加购物车
        cartAdd: serverIP + "/_cart/addGoods",
        //商品支付
        orderInfo:serverIP + "/_goods/payment",
        //用户地址查询
        shippingAddress:serverIP + "/_user/searchUserAddress",
        //更新购物车产品
        updateCart : serverIP + "/cart/updateCartGoods",
        //删除购物车产品
        deleteCart : serverIP + "/cart/deleteCartGoods",
        //购物车提交订单产品总数
        goodsCount : serverIP +"/_cart/searchCartCount",
        //设置默认收货地址
        updateDefaultAddress :serverIP + "/user/update",
        //删除用户地址
        deleteUserAddress:serverIP + "/user/deleteAddress",
        //添加新的收货地址
        addNewAddress:serverIP + "/user/addAddress",
        //更新用户地址
        updateUserAddress: serverIP + "/user/updateAddress"


    },

    Category: {
        //分类页面
        category: serverIP + "/_category/search",
        // 产品详情
        productInfo: serverIP + "/_category/goodsDetail",
        //获取购物车数量
        getCartNum:serverIP+"/_cart/searchCartCount"
    },

   Other : {
        getProvinces : serverIP + "/region/provinces",
        getCities    : serverIP + "/region/cities",
        getCounties  : serverIP + "/region/counties"
    },

    Home: {}

}