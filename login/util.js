



	// HTTP 请求封装
	var HTTP = {};

	/*
	 * get请求
	 * @params {url} 请求地址
	 * @params {data} 请求参数
	 * @params {callback} 回调函数
	 */
	HTTP.get = function(url, data, callback) {
				var $data = typeof data === 'function' ? null : data;
				var $callback = typeof data === 'function' ? data : callback;
				send('get', url, $data, $callback);
	};

	/*
	 * post请求
	 * @params {url} 请求地址
	 * @params {data} 请求参数
	 * @params {callback} 回调函数
	 */
	HTTP.post = function (url, data, callback) {
			send('post', url, data, callback);
		};

	//将工具添加至window对象
	window.HTTP = HTTP;


	/*
	 * 请求发送方法
	 * @params {$method} 请求方式
	 * @params {$url} 请求地址
	 * @params {$data} 请求参数
	 * @params {$callback} 回调函数
	 */
	var send = function ($method, $url, $data, $callback) {

		//回调函数定义
		var _callback = function (e, data) {

			// 回调
			if (typeof $callback === 'function') {
				$callback(e, data);
			} else {
				console.log("错误请求");
			}
		};

		console.log("请求的接口地址为:" + $url);

		//查看是否为POST请求,如果是则取出token并设置在头信息中
		if($method == 'post'){

			//取出本地token信息
			//var employeesInfo = JSON.parse($.cookie("employeesInfo"));

			//获取token
			//var tokenValue = employeesInfo.token;

			//设置在ajax的请求头中
			//$.ajaxSetup({
			//    headers: {'x-token': tokenValue}
			//});
		}

		// 设置异步请求选项
		var options = {
			url			: $url,
			method	: $method,
			data		: $data,
			dataType : "json",
			jsonp		: true,
			timeout	: 150000,  //设置超时时间15秒
			success	: function (data) {

				//判断业务是否成功
				if (data.success) {
					_callback(null, data.result);
				} else {
					_callback(true, data.result.message);
				}
			},
			error: function (e) {
				_callback(e);
			}
		};

		// 发送异步请求
		$.ajax(options);

	};


	// 浏览器相关判断
	var BrowserUtil = {};

	/*
	 * 判断当前打开的浏览起是否为微信内置浏览器
	 */
	BrowserUtil.isWeiXinBrowser = function(){
		var ua = navigator.userAgent.toLowerCase();
		if(ua.match(/MicroMessenger/i)=="micromessenger") {
			return true;  
		} else {
			return false;  
		}
	};

	/*
	 * 判断当前打开的浏览起是否为QQ内置浏览器
	 */
	BrowserUtil.isQQBrowser = function(){
		var ua = navigator.userAgent.toLowerCase();  
			if(ua.match(/qqmobile/i)=="qqmobile") {
				return true;  
			} else {
				return false;  
			}
	}

	//将工具添加至window对象
	window.BrowserUtil = BrowserUtil;


	//公共方法
	var CommenFun = {};

	/**
	 * 判断一个对象是否为空
	 */
	CommenFun.isNullObj = function(obj){
		for(var i in obj){
			if(obj.hasOwnProperty(i)){
				return false;
			}
		}
		return true;
	};

	window.CommenFun = CommenFun;





