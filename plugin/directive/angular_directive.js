/*
 * angularjs指令扩展文件
 */

//console.log("[框架]====>[加载angularjs指令自定义扩展文件]");

define(['app'],function(app){

	/*
	 * 标签属性扩展
	 * 作用:跳转进入二级界面时隐藏或显示底部Tab菜单栏
 	 */
	app.directive('hideTabs', function($rootScope) {
		return {
			restrict: 'A',
			link: function(scope, element, attributes) {
				scope.$on('$ionicView.beforeEnter', function() {
					scope.$watch(attributes.hideTabs, function(value){
						$rootScope.hideTabs = value;
					});
				});

				scope.$on('$ionicView.beforeLeave', function() {
					$rootScope.hideTabs = false;
				});
			}
		};
	});

	/*
	 * 屏幕高度设置
 	 */
	app.directive('screenHeight',function($window){
		return{
			restrict:'AE',
			link:function(scope,element,attr){
			element[0].style.top=attr.screenHeight+'px';
			element[0].style.height=($window.innerHeight-55-attr.screenHeight-70)+'px';
			}
		}
	});

	/*
	 * 设置高度与屏幕高度一致
	 */
	app.directive('setWindowHeight',function($window){
		return{
			restrict:'AE',
			link:function(scope,element,attr){
				element[0].style.height=($window.innerHeight)+'px';
			}
		}
	});

	/*
	 * 自定义导航条
 	 */
	app.directive('navigationBar',function(){  
		return{  
			restrict: 'EA',  
			transclude: true,  
			scope: {  
				title		: '@',
				lefttitle   : '@',
				righttitle  : '@',
				ishint      : '@',
				onRightClick : "&onRightClick"
			},  
			template:[
				'<div class="headerBox">',
					'<div class="leftHeaderBox">{{lefttitle}}</div>',
					'<div class="middleHeaderBox">{{title}}</div>',
					'<div class="rightHeaderBox" ng-click="rightIconClick()">{{righttitle}}<div class="iconHint" ng-show="{{ishint}}"></div></div>',
				'</div>'
			].join(""),  
			link:function(scope,element,attrs){  
				scope.rightIconClick = function(){
					scope.onRightClick();
				}
			}  
		}
	});

});