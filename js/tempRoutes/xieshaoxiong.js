console.log("[框架]====>[加载angularjs路由配置文件 -> 解少雄专用]");
console.log("[框架]====>[加载angularjs路由配置文件 -> 解少雄专用]");

define(['app'],function (app) {

    //配置路由
    app.config(function ($stateProvider, $urlRouterProvider, $controllerProvider) {

        /*
         * 开始路由配置信息
         * url           : 导航中显示的路由地址
         * templateUrl   : 对应的模板路径
         * controllerUrl : 处理该模板的控制器路径
         * controller    : 控制器名称
         */
        $stateProvider
            /*购物车 路由*/
            .state('tab.cart', {
                cache : false,
                url: '/cart',
                views: {
                    'tab-cart': {
                        templateUrl: "views/cart/cart.html?_r=" + Math.random(),
                        controller: 'cartController',
                        resolve: {
                            deps: app.loadControllerJs('../controller/cart/cartController')
                        }
                    }

                }

            })
            /*购物车 确认订单 路由*/
            .state('tab.cart_orderConfirm', {
                url: '/cart_orderConfirm',
                //cache : false,
                views: {
                    'tab-cart': {
                        templateUrl: "views/cart/cart_orderConfirm.html?_r=" + Math.random(),
                        controller: 'cartOrderController',
                        resolve: {
                            deps: app.loadControllerJs('../controller/cart/cartOrderController')
                        }
                    }

                }
            })

            /*购物车 管理收货地址 路由*/
            .state('tab.cart_manageAddress', {
                url: '/cart_manageAddress',
                cache : false,
                views: {
                    'tab-cart': {
                        templateUrl: "views/cart/cart_manageAddress.html?_r=" + Math.random(),
                        controller: 'cartManageAddressController',
                        resolve: {
                            deps: app.loadControllerJs('../controller/cart/cartManageAddressController')
                        }
                    }

                }
            })
            // /*购物车 添加新收货地址 路由*/
            .state('tab.cart_addAddress', {
                url: '/cart_addAddress',
                cache : false,
                views: {
                    'tab-cart': {
                        templateUrl: "views/cart/cart_addAddress.html?_r=" + Math.random(),
                        controller: 'cartAddAddressController',
                        resolve: {
                            deps: app.loadControllerJs('../controller/cart/cartAddAddressController')
                        }
                    }

                }
            })

            /*购物车 修改收货地址 路由*/
            .state('tab.cart_modifyAddress', {
                cache : false,
                url: '/cart_modifyAddress/:address/:address_id/:address_name/:best_time/:country/:country_name/:city_name/:city/:consignee/:district_name/:district/:email/:mobile/:province_name/:province/:sign_building/:tel/:zipcode/:user_id',
                views: {
                    'tab-cart': {
                        templateUrl: "views/cart/cart_modifyAddress.html?_r=" + Math.random(),
                        controller: 'cartModifyAddressController',
                        resolve: {
                            deps: app.loadControllerJs('../controller/cart/cartModifyAddressController')
                        }
                    }

                }
            })

             //购买成功后跳转到我的界面
            .state('tab.goMy', {
                url: '/goMy',
                views: {
                    'tab-cart': {
                        templateUrl: "views/my/my.html?_r=" + Math.random(),
                        controller: 'myController',
                        resolve: {
                            deps: app.loadControllerJs('../controller/my/myController')
                        }
                    }

                }
            })

            //点击跳转详情
            .state('tab.goProductInfo', {
                url: '/goProductInfo/:goodsId',
                cache : false,
                views: {
                    'tab-cart': {
                        templateUrl: "views/category/productInfo.html?_r=" + Math.random(),
                        controller: 'productInfoController',
                        resolve: {
                            deps: app.loadControllerJs('../controller/category/productInfoController')
                        }
                    }

                }
            })


    });
   

});