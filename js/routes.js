/*
 * 路由配置文件
 */

console.log("[框架]====>[加载angularjs路由配置文件]");


define(['app'], function (app) {

    //配置路由
    app.config(function ($stateProvider, $urlRouterProvider, $controllerProvider) {

        //控制器文件,按需加载方法
        app.registerController = $controllerProvider.register;

        app.loadControllerJs = function (controllerJs) {

            return function ($rootScope, $q) {
                var def = $q.defer(), deps = [];
                angular.isArray(controllerJs) ? (deps = controllerJs) : deps.push(controllerJs);
                require(deps, function () {
                    $rootScope.$apply(function () {
                        def.resolve();
                    });
                });
                return def.promise;
            }
        };


        //初始化显示的路由，页面初次打开时，默认显示的界面
        $urlRouterProvider.otherwise('/tab/goods');
        $urlRouterProvider.otherwise('/tab/home');

        //初始化显示的路由，页面初次打开时，默认显示的界面

        /*
         * 开始路由配置信息
         * url           : 导航中显示的路由地址
         * templateUrl   : 对应的模板路径
         * controllerUrl : 处理该模板的控制器路径
         * controller    : 控制器名称
         */
        $stateProvider


            .state('tab', {
                url: "/tab",
                abstract: true,
                templateUrl: "template/tabController.html?_r=" + Math.random(),
                controller: 'mainController',
                resolve: {
                    deps: app.loadControllerJs('../controller/mainController')
                }
            })

            .state('tab.home', {
                url: '/home',
            .state('tab.goods', {
                url: '/goods',
                views: {
                    'tab-home': {
                        templateUrl: "views/home/home.html?_r=" + Math.random(),
                        controller: 'homeController',
                    'tab-goods': {
                        templateUrl: "views/goods/goods.html?_r=" + Math.random(),
                        controller: 'goodsController',
                        resolve: {
                            deps: app.loadControllerJs('../controller/home/homeController')
                            deps: app.loadControllerJs('../controller/goods/goodsController')
                        }
                    }

                }

            })


            .state('tab.goods', {
                url: '/goods',
                views: {
            .state('tab.goodsDetails', {
                url: '/goodsDetails',
                    views: {
                    'tab-goods': {
                        templateUrl: "views/goods/goods.html?_r=" + Math.random(),
                        controller: 'goodsController',
                        resolve: {
                            deps: app.loadControllerJs('../controller/goods/goodsController')
                        templateUrl: "views/goods/goodsDetails.html?_r=" + Math.random(),
                            controller: 'goodsDetailsController',
                            resolve : {
                            deps : app.loadControllerJs('../controller/goods/goodsDetailsController')
                        }
                    }

                }
            })
.state('tab.goodsDetails', {
	url: '/goodsDetails',
		views: {
		'tab-goods': {
			templateUrl: "views/goods/goodsDetails.html?_r=" + Math.random(),
				controller: 'goodsDetailsController',
				resolve : {
				deps : app.loadControllerJs('../controller/goods/goodsDetailsController')
			}
		}

	}
})
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

            .state('tab.my', {
                url: '/my',
                views: {
                    'tab-my': {
                        templateUrl: "views/my/my.html?_r=" + Math.random(),
                        controller: 'myController',
                        resolve: {
                            deps: app.loadControllerJs('../controller/my/myController')
                        }
                    }

                }
            })
            .state('tab.my-office', {
                url: '/my-office',
                views: {
                    'tab-my': {
                        templateUrl: "views/my/my-office.html?_r=" + Math.random(),
                        controller: 'myOfficeController',
                        resolve: {
                            deps: app.loadControllerJs('../controller/my/myOfficeController')
                        }
                    }

                }
            })


          

























    });


});