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

            .state('tab.cart', {
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
            /*我的 未读消息 路由*/
            .state('tab.cart_orderConfirm', {
                url: '/cart_orderConfirm',
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
    });
   

});