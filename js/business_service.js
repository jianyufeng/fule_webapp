/*
 * 加载业务服务扩展
 */

//console.log("[框架]====>[加载加载业务服务扩展相关文件]");

define([

    //商品部分
    '../service/goods/goodsService',

    //购物车部分
	'../service/cart/cartService',
    '../service/cart/cartOrderService',

    //首页部分
    '../service/home/homeService',

    //分类部分
	'../service/category/categoryService',	

    //我的部分
    '../service/my/myService',
    //我的订单
    '../service/my/myOrderFormService',
    '../service/my/myAuthenticCheckService',
    //充值卡充值
    '../service/my/myPrepaidCardRechargeService',
    //内部转账
    '../service/my/myInternalTransferCheckService',

    // 商品详情页
    '../service/category/productInfoService'



]);