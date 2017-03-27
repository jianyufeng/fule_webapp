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

    /*显示专卖店等级*/
    app.filter('storeLevelFilter', function ($rootScope) {
        return function (input, varl) {
            var v = parseInt(input)
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
    /*显示用户等级*/
    app.filter('userLevelFilter', function ($rootScope) {
        return function (input, varl) {
            var v = parseInt(input)
            switch (v) {
                case  0:
                    varl = '会员0';
                    break;
                case  1:
                    varl = '会员1';
                    break;
                case  2:
                    varl = '会员2';
                    break;
                case  3:
                    varl = '会员3';
                    break;
                case  4:
                    varl = '会员4';
                    break;
                default:
                    varl = '会员default';
                    break;
            }
            return varl
        }

    });


});