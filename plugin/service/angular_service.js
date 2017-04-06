/*
 * angularjs自定义服务扩展文件
 */

//console.log("[框架]====>[加载angularjs自定义服务扩展文件]");

define(['app'],function(app){

	/*
	 * 作用:弹出框服务封装
 	 */
	app.factory("POP",function($ionicPopup,$ionicActionSheet,$ionicLoading){
        
        var service = {};

        //确认弹出框
        service.Confirm = function(content,ok){
            var confirmPopup = $ionicPopup.confirm({
					title: '确认操作',
					template: content,
					cancelText : '取消',
					okText : '确认'
				});
				confirmPopup.then(function(res) {
					if(res){
                        ok();
					}
			});
        },

        //普通信息提示弹出框
        service.Alert = function(content){
            var alertPopup = $ionicPopup.alert({
                title: '提示信息',
                template: content
            });
            
            alertPopup.then(function(res) {
                
            });
        }

        //上拉弹出框
        service.ActionSheet = function(title,buttonArr,fns){

            var buttonJson = [];

            for(var i = 0;i<buttonArr.length;i++){
                var tempJson = { text : buttonArr[i] };
                buttonJson.push(tempJson);
            }

            // 显示操作表
            $ionicActionSheet.show({
                buttons: buttonJson,
                titleText: title,
                cancelText: '关闭',
                buttonClicked: function(index) {
                    fns[index]();
                    return true;
                }
            });
        }

        //请求处理遮罩
        service.StartLoading = function(){
            $ionicLoading.show({
                showBackdrop: true,   
                template: '正在处理,请稍候...'
            });
        }

        //请求处理遮罩关闭
        service.EndLoading = function(){
            $ionicLoading.hide();
        }

        //提示
        service.Hint = function(msg){
            $ionicLoading.show({
                showBackdrop: false,   
                template: msg,
                duration : 2000
            });
        }

        //输入
        service.FormAlert = function(msg,$scope,fn){
            $ionicPopup.show({
                template: '<input type="password" id="pwdInput" style="border: 1px solid #e8e8e8;">',
                title: msg,
                scope: $scope,
                buttons: [
                { text: '放弃' },
                {
                    text: '<b>提交</b>',
                    type: 'button-positive',
                    onTap: function(e) {
                       var pwdValue = $("#pwdInput").val();
                       if(pwdValue.length<=0){
                           $ionicLoading.show({
                                showBackdrop: false,   
                                template: "内容不能为空",
                                duration : 2000
                           });
                           e.preventDefault();
                       }else{
                           fn(pwdValue);
                       }
                    }
                },
                ]
            });
        }

        return service;
    });

});