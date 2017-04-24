//console.log("[框架]====>[加载angularjs路由配置文件 -> 叶静雅专用]");

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

            .state('tab.goods', {
            url: '/goods',
            views: {
                'tab-goods': {
                    templateUrl: "views/goods/goods.html?_r=" + Math.random(),
                    controller: 'goodsController',
                    resolve: {
                        deps: app.loadControllerJs('../controller/goods/goodsController')
                    }
                }

            }
        })

            .state('tab.goodsDetail', {
                url: '/goodsDetail/:goodsId',
                views: {
                    'tab-goods': {
                        templateUrl: "views/category/productInfo.html?_r=" + Math.random(),
                        controller: 'productInfoController',
                        resolve: {
                            deps: app.loadControllerJs('../controller/category/productInfoController')
                        }
                    }

                }
            })

            .state('tab.register', {
                url: '/register',
                    views: {
                    'tab-goods': {
                        templateUrl: "register/register.html?_r=" + Math.random(),
                            controller: 'registerController',
                            resolve : {
                            deps : app.loadControllerJs('../register/registerController')
                        }
                    }

                }
            })

    });
   

});