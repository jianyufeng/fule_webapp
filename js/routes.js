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
            /*我的 未读消息 路由*/
            .state('tab.my-unreadMessage', {
                url: '/my-unreadMessage',
                views: {
                    'tab-my': {
                        templateUrl: "views/my/my-unreadMessage.html?_r=" + Math.random(),
                        controller: 'myUnreadMessageController',
                        resolve: {
                            deps: app.loadControllerJs('../controller/my/myUnreadMessageController')
                        }
                    }

                }
            })
            /*我的办公室路由*/
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
            /*我的订单路由*/
            .state('tab.my-orderForm', {
                url: '/my-orderForm',
                views: {
                    'tab-my': {
                        templateUrl: "views/my/my-orderForm.html?_r=" + Math.random(),
                        controller: 'myOrderFormController',
                        resolve: {
                            deps: app.loadControllerJs('../controller/my/myOrderFormController')
                        }
                    }

                }
            })
            /*我的  防伪查询 路由*/
            .state('tab.my-authenticCheck', {
                url: '/my-authenticCheck',
                views: {
                    'tab-my': {
                        templateUrl: "views/my/my-authenticCheck.html?_r=" + Math.random(),
                        controller: 'myAuthenticCheckController',
                        resolve: {
                            deps: app.loadControllerJs('../controller/my/myAuthenticCheckController')
                        }
                    }

                }

            })
            /*我的  充值卡充值询路由*/
            .state('tab.my-prepaidCardRecharge', {
                url: '/my-prepaidCardRecharge',
                views: {
                    'tab-my': {
                        templateUrl: "views/my/my-prepaidCardRecharge.html?_r=" + Math.random(),
                        controller: 'myPrepaidCardRechargeCheckController',
                        resolve: {
                            deps: app.loadControllerJs('../controller/my/myPrepaidCardRechargeCheckController')
                        }
                    }

                }

            })
            /*我的  电子币银行汇款 路由*/
            .state('tab.my-electronicBankTransfer', {
                url: '/my-electronicBankTransfer',
                views: {
                    'tab-my': {
                        templateUrl: "views/my/my-electronicBankTransfer.html?_r=" + Math.random(),
                        controller: 'myElectronicBankTransferCheckController',
                        resolve: {
                            deps: app.loadControllerJs('../controller/my/myElectronicBankTransferCheckController')
                        }
                    }

                }
            })
            /*我的  辅销币银行汇款 路由*/
            .state('tab.my-subsidiaryBankTransfer', {
                url: '/my-subsidiaryBankTransfer',
                views: {
                    'tab-my': {
                        templateUrl: "views/my/my-subsidiaryBankTransfer.html?_r=" + Math.random(),
                        controller: 'mySubsidiaryBankTransferCheckController',
                        resolve: {
                            deps: app.loadControllerJs('../controller/my/mySubsidiaryBankTransferCheckController')
                        }
                    }

                }
            })
            /*我的  汇款记录 路由*/
            .state('tab.my-remittanceRecord', {
                url: '/my-remittanceRecord',
                views: {
                    'tab-my': {
                        templateUrl: "views/my/my-remittanceRecord.html?_r=" + Math.random(),
                        controller: 'myRemittanceRecordCheckController',
                        resolve: {
                            deps: app.loadControllerJs('../controller/my/myRemittanceRecordCheckController')
                        }
                    }

                }
            })
            /*我的  内部转账 路由*/
            .state('tab.my-internalTransfer', {
                url: '/my-internalTransfer',
                views: {
                    'tab-my': {
                        templateUrl: "views/my/my-internalTransfer.html?_r=" + Math.random(),
                        controller: 'myInternalTransferCheckController',
                        resolve: {
                            deps: app.loadControllerJs('../controller/my/myInternalTransferCheckController')
                        }
                    }

                }
            })
            /*我的  转账记录 路由*/
            .state('tab.my-transferRecord', {
                url: '/my-transferRecord',
                views: {
                    'tab-my': {
                        templateUrl: "views/my/my-transferRecord.html?_r=" + Math.random(),
                        controller: 'myTransferRecordController',
                        resolve: {
                            deps: app.loadControllerJs('../controller/my/myTransferRecordController')
                        }
                    }

                }

            })
            /*我的  代金卷转账 路由*/
            .state('tab.my-voucherTransfer', {
                url: '/my-voucherTransfer',
                views: {
                    'tab-my': {
                        templateUrl: "views/my/my-voucherTransfer.html?_r=" + Math.random(),
                        controller: 'myVoucherTransferController',
                        resolve: {
                            deps: app.loadControllerJs('../controller/my/myVoucherTransferController')
                        }
                    }

                }
            })
            /*我的  代金卷转账记录 路由*/
            .state('tab.my-voucherTransferRecords', {
                url: '/my-voucherTransferRecords',
                views: {
                    'tab-my': {
                        templateUrl: "views/my/my-voucherTransferRecords.html?_r=" + Math.random(),
                        controller: 'myVoucherTransferRecordsController',
                        resolve: {
                            deps: app.loadControllerJs('../controller/my/myVoucherTransferRecordsController')
                        }
                    }

                }
            })
    });


});