//console.log("[框架]====>[加载angularjs路由配置文件 -> 李许峰专用]");

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

            .state('tab.category', {
                url: '/category',
                views: {
                    'tab-category': {
                        templateUrl: "views/category/category.html?_r=" + Math.random(),
                        controller: 'categoryController',
                        resolve: {
                            deps: app.loadControllerJs('../controller/category/categoryController')
                        }
                    }

                }
            })


            /**
             *
             *
             */
            .state('tab.productInfo', {
                url: '/productInfo/:goodsId',
                views: {
                    'tab-category': {
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