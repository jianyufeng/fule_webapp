//console.log("[框架]====>[加载angularjs路由配置文件 -> 简玉峰专用]");

define(['app'], function (app) {

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
            /*我的 未读消息详情 路由*/
            .state('tab.my-unreadMessageDetail', {
                url: '/my-unreadMessageDetail/:title/:add_time/:create_user_name/:article_id',
                views: {
                    'tab-my': {
                        templateUrl: "views/my/my-unreadMessageDetail.html?_r=" + Math.random(),
                        controller: 'myUnreadMessageDetailController',
                        resolve: {
                            deps: app.loadControllerJs('../controller/my/myUnreadMessageDetailController')
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
                        controller: 'myPrepaidCardRechargeController',
                        resolve: {
                            deps: app.loadControllerJs('../controller/my/myPrepaidCardRechargeController')
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
                        controller: 'myElectronicBankTransferController',
                        resolve: {
                            deps: app.loadControllerJs('../controller/my/myElectronicBankTransferController')
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
                        controller: 'mySubsidiaryBankTransferController',
                        resolve: {
                            deps: app.loadControllerJs('../controller/my/mySubsidiaryBankTransferController')
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
                        controller: 'myRemittanceRecordController',
                        resolve: {
                            deps: app.loadControllerJs('../controller/my/myRemittanceRecordController')
                        }
                    }

                }
            })
            /*我的  内部转账 路由*/
            .state('tab.my-internalTransfer', {
                url: '/my-internalTransfer/:userName/:userMoney',
                views: {
                    'tab-my': {
                        templateUrl: "views/my/my-internalTransfer.html?_r=" + Math.random(),
                        controller: 'myInternalTransferController',
                        resolve: {
                            deps: app.loadControllerJs('../controller/my/myInternalTransferController')
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
                url: '/my-voucherTransfer/:userVoucher',
                //url: '/my-voucherTransfer',
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

            /*我的 充值卡充值列表 路由*/
            .state('tab.my-rechargeableCardList', {
                url: '/my-rechargeableCardList',
                views: {
                    'tab-my': {
                        templateUrl: "views/my/my-rechargeableCardList.html?_r=" + Math.random(),
                        controller: 'myRechargeableCardListController',
                        resolve: {
                            deps: app.loadControllerJs('../controller/my/myRechargeableCardListController')
                        }
                    }

                }
            })
            /*我的 用户激活或者升级是填写信息页面 路由*/
            .state('tab.my-updateUserData', {
                url: '/my-updateUserData/:grade',
                views: {
                    'tab-my': {
                        templateUrl: "views/my/my-updateUserData.html?_r=" + Math.random(),
                        controller: 'myUpdateUserDataController',
                        resolve: {
                            deps: app.loadControllerJs('../controller/my/myUpdateUserDataController')
                        }
                    }

                }
            })
            /*我的 喜乐之家列表 路由*/
            .state('tab.my-happyHomeList', {
                url: '/my-happyHomeList',
                views: {
                    'tab-my': {
                        templateUrl: "views/my/my-happyHomeList.html?_r=" + Math.random(),
                        controller: 'myHappyHomeListController',
                        resolve: {
                            deps: app.loadControllerJs('../controller/my/myHappyHomeListController')
                        }
                    }

                }
            })
            /*我的 喜乐之家购买记录列表 路由*/
            .state('tab.my-happyHomeLogs', {
                url: '/my-happyHomeLogs',
                views: {
                    'tab-my': {
                        templateUrl: "views/my/my-happyHomeLogs.html?_r=" + Math.random(),
                        controller: 'myHappyHomeLogsController',
                        resolve: {
                            deps: app.loadControllerJs('../controller/my/myHappyHomeLogsController')
                        }
                    }

                }
            })
            /*我的 购买喜乐之家列表 路由*/
            .state('tab.my-buyHappyHome', {
                url: '/my-buyHappyHome',
                views: {
                    'tab-my': {
                        templateUrl: "views/my/my-buyHappyHome.html?_r=" + Math.random(),
                        controller: 'myBuyHappyHomeController',
                        resolve: {
                            deps: app.loadControllerJs('../controller/my/myBuyHappyHomeController')
                        }
                    }

                }
            })
            /*我的 喜乐之家升级 路由*/
            .state('tab.my-happyHomeUpgrade', {
                url: '/my-happyHomeUpgrade',
                views: {
                    'tab-my': {
                        templateUrl: "views/my/my-happyHomeUpgrade.html?_r=" + Math.random(),
                        controller: 'myHappyHomeUpgradeController',
                        resolve: {
                            deps: app.loadControllerJs('../controller/my/myHappyHomeUpgradeController')
                        }
                    }

                }
            })





    });


});