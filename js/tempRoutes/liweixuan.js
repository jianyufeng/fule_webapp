//console.log("[框架]====>[加载angularjs路由配置文件 -> 李蔚轩专用]");

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

            .state('tab.home', {
                url: '/home',
                cache : false,
                views: {
                    'tab-home': {
                        templateUrl: "views/home/home.html?_r=" + Math.random(),
                        controller: 'homeController',
                        resolve: {
                            deps: app.loadControllerJs('../controller/home/homeController')
                        }
                    }

                }

            })

    });
   

});