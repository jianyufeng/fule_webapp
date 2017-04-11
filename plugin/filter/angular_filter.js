/*
 * angularjs过滤器扩展文件
 */

//console.log("[框架]====>[加载angularjs过滤器自定义扩展文件]");

define(['app'], function (app) {

    app.filter('demoFilter', function ($rootScope) {
        return function (input, var1) {
            return input + "|" + var1;
        }
    });

    /*显示专卖店等级 过滤器*/
    app.filter('storeLevelFilter', function ($rootScope) {
        return function (input, varl) {
            var v = parseInt(input);
            switch (v) {
                case  0:
                    varl = '会员';
                    break;
                case  1:
                    varl = '专卖店';
                    break;
                case  2:
                    varl = '旗舰店';
                    break;
                default:
                    varl = '会员default';
                    break;
            }
            return varl
        }

    });
    /*显示用户等级 过滤器*/
    app.filter('userLevelFilter', function ($rootScope) {
        return function (input, varl) {
            var v = parseInt(input);
            switch (v) {
                case  0:
                    varl = '会员';
                    break;
                case  1:
                    varl = '志愿者';
                    break;
                case  2:
                    varl = 'VIP';
                    break;
                case  3:
                    varl = '批发';
                    break;
                    break;
                default:
                    varl = '会员';
                    break;
            }
            return varl
        }

    });
    /*订单状态 过滤器*/
    app.filter('orderStatusFilter', function ($rootScope) {
        return function (input, varl) {
            var v = parseInt(input);
            switch (v) {
                case  0:
                    varl = '商城订单';
                    break;
                case  1:
                    varl = '提货';
                    break;
                case  2:
                    varl = '重复消费订单';
                    break;
                case  3:
                    varl = '申请专柜';
                    break;
                case  4:
                    varl = '申请专卖店';
                    break;
                case  5:
                    varl = '申请旗舰店';
                    break;
                case  6:
                    varl = '辅销品订单';
                    break;
                case  7:
                    varl = '辅销品积分换购订单';
                    break;
                case  8:
                    varl = '喜乐之家订单';
                    break;
                default:
                    varl = '未发货';
                    break;
            }
            return varl
        }

    });
    /*订单类型 过滤器*/
    app.filter('orderTypeFilter', function ($rootScope) {
        return function (input, varl) {
            var v = parseInt(input);
            switch (v) {
                case  0:
                    varl = '未发货';
                    break;
                case  1:
                    varl = '配货中';
                    break;
                case  2:
                    varl = '发货中';
                    break;
                case  3:
                    varl = '部分发货';
                    break;
                case  4:
                    varl = '已全部发货';
                    break;
                case  5:
                    varl = '已收货';
                    break;
                default:
                    varl = '商城订单';
                    break;
            }
            return varl
        }

    });

    /*时间戳 过滤器*/
    app.filter('timeFilter', function ($rootScope) {
        return function (input, varl) {
            var v = parseInt(input);
            var now = new Date(parseInt(v) * 1000);
            return now.toLocaleDateString();
        }
    });
});