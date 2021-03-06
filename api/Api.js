var serverIP = "transmit/save.php";
var API = {

    Goods: {
        goods: serverIP + "/_goods/search",
        //商品搜索接口
        searchList: serverIP + "/_goods/searchList"
    },
    My: {
        // 个人信息
        myInfo: serverIP + "/_user/userHome",
        myOrderForm: serverIP + "/order/searchList",
        myOrderFormDetails: serverIP + "/_order/searchOrderDetail",
        //是否开启共享圈事业圈功能
        showRegister: serverIP + "/_user/showRegister",
        // 查询商品条形码
        searchBarCodeGoods: serverIP + "/barCode/searchBarCodeGoods",
        // 内部转账  获取短信验证码
        internalTransferGetSmsCode: serverIP + "/_user/getSmsCode",
        internalTransfer: serverIP + "/_money/transferUserMoney",
        // 充值卡充值
        prepaidCard: serverIP + "/userCard/bindUser",
        // 转账记录
        remittanceRecord: serverIP + "/banks/searchRemittanceAdvices",
        // 代金券转账
        voucherTransfer: serverIP + "/_fxp/transferFxpPoints",
        // 代金券转账 记录
        voucherTransferRecord: serverIP + "/fxp/searchAccount",
        //转账记录
        transferRecord: serverIP + "/_money/searchTransferAccounts",
        //未读消息
        unreadMsg: serverIP + "/article/search",
        //未读消息详情
        unreadMsgInfo: serverIP + "/article/searchInfo",
        //添加电子币银行汇款
        eleBankTransfer: serverIP + "/banks/addRemittance",
        //获取电子币卡记录
        searchUserAccount: serverIP + "/userCard/searchLogs",
        //获取银行列表
        bankList: serverIP + "/banks/search_banks",
        //查询辅销币流水
        searchAccountLog: serverIP + "/fxp/searchIntergralLog",
        //查看推荐人信息
        recommendedManInfo: serverIP + "/_user/userInfo",
        // 查看接点人信息
        searchUserDetail: serverIP + "/user/searchUserDetail",
        //升级到D
        upgradeToD: serverIP + "/upgrade/upgradeToD",
        // 升级到VIP
        upgradeToVIP: serverIP + "/upgrade/upgradeToVIP",
        // 升级到批发
        upgradeToPIFA: serverIP + "/upgrade/upgradeToPIFA",
        // 一键升级到D+VIP+批发
        oneUpgrade: serverIP + "/upgrade/oneUpgrade",
        buyGoodsMoreAttr: serverIP + "/goods/searchProductInfo",
        //购买喜乐之家列表
        buyGoodsList: serverIP + "/_happyHome/searchGoodsList",
        //提交喜乐之家订单
        confirmHappyOrder: serverIP + "/buyxlzj/updateOrderLog",
        //验证密码后回调添加购买信息
        butyHapplyOver: serverIP + '/buyxlzj/happlyOver',
        //获取购买喜乐之家配置
        buyHappyHomeGoodsConfig: serverIP + "/buyxlzj/happlyhomelist",
        //获取喜乐之家配置表
        happyHomeList: serverIP + "/buyxlzj/happlyhomelist",
        //喜乐之家购买记录
        searchHappyHomeLogs: serverIP + "/happyHome/searchLogs",
        //删除喜乐之家购买记录
        deleteHappyHomePurchaseHistory: serverIP + "/buyxlzj/delectlog",
        // 校验身份证
        verifyIdentityCardN: serverIP + "/_user/verifyIDCard",
        // 切记勿删......
        // 喜乐之家升级
        updateGradeHappyHome: serverIP + "/buyxlzj/buyhapply",
        //更新用户信息（喜乐之家）
        updateUserLogs: serverIP + "/buyxlzj/updateUserLog",
        //管理关系
        manageRelationships: serverIP + "/user/searchUserConnectionRelations",
        //服务关系
        serviceRelationShip: serverIP + "/user/searchUserRecommendRelations",
        // 奖金币转电子币
        bonusOnUserMoney: serverIP + "/_bonus/bonusOnUserMoney",
        //  查看奖金币
        showUserBonus: serverIP + "/_bonus/showWithdrawal",
        // 获取银行
        searchBanksDic: serverIP + "/banks/searchBanksDic",
        // 升级共享圈
        upgradeToShare: serverIP + "/upgrade/upgradeToShare",
        // 共享圈激活会员升级D
        upgradeToDFromShare: serverIP + "/upgrade/upgradeToDFromShare",
        // 共享圈激活会员一键升级
        upgradeToAllFromShare: serverIP + "/upgrade/upgradeToAllFromShare"
    },


    Cart: {
        //购物车信息
        cartSearch: serverIP + "/_cart/search",
        //添加购物车
        cartAdd: serverIP + "/_cart/addGoods",
        //商品支付页面信息
        orderInfo: serverIP + "/_goods/payment",
        //用户地址查询
        shippingAddress: serverIP + "/_user/searchUserAddress",
        //更新购物车产品

        updateCart: serverIP + "/cart/updateCartGoods",
        //删除购物车产品

        deleteCart: serverIP + "/cart/deleteCartGoods",
        //购物车提交订单产品总数

        goodsCount: serverIP + "/_cart/searchCartCount",
        //设置默认收货地址

        updateDefaultAddress: serverIP + "/user/update",
        //删除用户地址

        deleteUserAddress: serverIP + "/user/deleteAddress",
        //添加新的收货地址

        addNewAddress: serverIP + "/user/addAddress",
        //更新用户地址
        updateUserAddress: serverIP + "/user/updateAddress",
        //验证用户三级密码
        verifyUserPassword: serverIP + "/_user/verifyUserPassword",
        //普通商城生成支付订单
        commonPaymentOrder: serverIP + "/order/addCommonPaymentOrder",
        //计算运费
        countFreight: serverIP + "/shipping/countFreight",
        //查找喜乐会所
        searchExclusiveShop: serverIP + "/exclusiveShop/search"
    },

    Category: {
        //分类页面
        category: serverIP + "/_category/search",
        // 产品详情
        productInfo: serverIP + "/_category/goodsDetail",
        //获取购物车数量
        getCartNum: serverIP + "/_cart/searchCartCount"
    },


    Other: {
        getProvinces: serverIP + "/region/provinces",
        getCities: serverIP + "/region/cities",
        getCounties: serverIP + "/region/counties",
        //查询全部省市区
        getRegion: serverIP + "/region/searchRegion"
    },

    Home: {
        //首页展示信息
        getHomeInfo: serverIP + "/_goods/home"
    }

}
