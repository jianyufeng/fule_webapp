/*
 * angularjs指令扩展文件
 */

//console.log("[框架]====>[加载angularjs指令自定义扩展文件]");

define(['app'], function (app) {

    /*
     * 标签属性扩展
     * 作用:跳转进入二级界面时隐藏或显示底部Tab菜单栏
     */
    app.directive('hideTabs', function ($rootScope) {
        return {
            restrict: 'A',
            link: function (scope, element, attributes) {
                scope.$on('$ionicView.beforeEnter', function () {
                    scope.$watch(attributes.hideTabs, function (value) {
                        $rootScope.hideTabs = value;
                    });
                });

                scope.$on('$ionicView.beforeLeave', function () {
                    $rootScope.hideTabs = false;
                });
            }
        };
    });

    /*
     * 屏幕高度设置
     */
    app.directive('screenHeight', function ($window) {
        return {
            restrict: 'AE',
            link: function (scope, element, attr) {
                element[0].style.top = attr.screenHeight + 'px';
                element[0].style.height = ($window.innerHeight - attr.screenHeight - 55) + 'px';
            }
        }
    });

    /*
     * 设置高度与屏幕高度一致
     */
    app.directive('setWindowHeight', function ($window) {
        return {
            restrict: 'AE',
            link: function (scope, element, attr) {
                element[0].style.height = ($window.innerHeight) + 'px';
            }
        }
    });

    /*
     * 设置高度与屏幕高度一致
     */
    app.directive('newSetWindowHeight', function ($window) {
        return {
            restrict: 'AE',
            link: function (scope, element, attr) {
                element[0].style.position = "absolute";
                element[0].style.top = "60px";
                element[0].style.height = ($window.innerHeight - 60) + 'px';
            }
        }
    });

    /*
     * 设置高度与屏幕高度一致(有导航条)
     */
    app.directive('setWindowHeightNoNavigation', function ($window) {
        return {
            restrict: 'AE',
            link: function (scope, element, attr) {
                element[0].style.height = ($window.innerHeight - 60) + 'px';
            }
        }
    });

    /*
     * 自定义导航条
     */
    app.directive('navigationBar', function ($ionicHistory, $rootScope) {
        return {
            restrict: 'EA',
            transclude: true,
            scope: {
                title: '@',
                isBack: '@',
                righttitle: '@',
                ishint: '@',
                isOverBack: '@',
                onRightClick: "&onRightClick",
                onOverBackClick: "&onOverBackClick"
            },
            template: [
                '<div class="headerBox" style="z-index: 99999">',
                '<div class="leftHeaderBox" ng-click="backBtn()"><img ng-show="{{isBack}}"  src="./resource/images/icon/jiantou_left.png" style="width:11px;height:auto;" /></div>',
                '<div class="middleHeaderBox">{{title}}</div>',
                '<div class="rightHeaderBox" ng-click="rightIconClick()" ng-show="{{righttitle}}">{{righttitle}}<div class="iconHint" ng-show="{{ishint}}"></div></div>',
                '</div>'
            ].join(""),
            link: function (scope, element, attrs) {
                scope.rightIconClick = function () {
                    scope.onRightClick();
                };

                scope.backBtn = function () {

                    if (scope.isOverBack) {
                        scope.onOverBackClick();
                    } else {
                        if (scope.isBack) {
                            $ionicHistory.goBack();
                        }
                    }
                }
            }
        }
    });
    //视图渲染完的回调
    app.directive('viewOnFinish', function ($timeout) {

        return {
            restrict: 'A',
            link: function (scope, element, attr) {
                if (scope.$last === true) {
                    $timeout(function () {
                        scope.$emit('viewOnFinish');
                    });
                }
            }
        };
    });


});