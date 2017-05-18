<?php


$url='http://192.168.10.123:5000/';

$u=str_replace('/fule_webapp/transmit/save.php/',$url,$_SERVER['REQUEST_URI']);

//验证码

$fule_key="jinwandalaohu";


 if($_SERVER['REQUEST_METHOD']==="OPTIONS"){
		   echo $_SERVER['REQUEST_METHOD'];
		   exit;
}
//验证路由是否存在
/**
if($_SERVER['HTTP_REFERER']==""){
	
	echo false; 
	exit;
}
*/

//get方式处理
if($_SERVER['REQUEST_METHOD']=="GET")
{
	
	$raw=[];
	$raw[]='x_fule_key'.':'.$fule_key;
		//Header("Location: $u"); 
 //初始化
		
     $curl = curl_init();
     //设置抓取的url
     curl_setopt($curl, CURLOPT_URL, $u);

     //设置头文件的信息作为数据流输出
     curl_setopt($curl, CURLOPT_HEADER, 1);
    //设置获取的信息以文件流的形式返回，而不是直接输出。
	 curl_setopt($curl, CURLOPT_HEADER, 0);
     curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
	 curl_setopt($curl, CURLOPT_HTTPHEADER, $raw);
    //执行命令
    $data = curl_exec($curl);
    //关闭URL请求
    curl_close($curl);
     //显示获得的数据
 
    echo $data;
};
if($_SERVER['REQUEST_METHOD']=="POST")
{	

	
	
$raw=[];
	foreach($_SERVER as $key => $value) { 
		if(substr($key, 0, 6) === 'HTTP_X') { 
			
			 
			$raw[]=substr($key, 5).':'.$value;
		} 
	} 
	$raw[]='x_fule_key'.':'.$fule_key;
	$p=file_get_contents('php://input');
	
	$ch = curl_init();
	curl_setopt($ch, CURLOPT_URL,$u);

	curl_setopt($ch, CURLOPT_POST, 1);
	curl_setopt($ch, CURLOPT_POSTFIELDS, $p);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
	//curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	curl_setopt($ch, CURLOPT_HEADER, 0);
	curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 120);
	//curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
	curl_setopt($ch, CURLOPT_HTTPHEADER, $raw);
	//var_dump($raw);
	$result = curl_exec ($ch);

	curl_close ($ch);
	echo $result;
}


function get_http_raw() { 
$raw = ''; 
 
// (1) 请求行 
//$raw .= $_SERVER['REQUEST_METHOD'].' '.$_SERVER['REQUEST_URI'].' '.$_SERVER['SERVER_PROTOCOL']."\r\n"; 
 
// (2) 请求Headers 
foreach($_SERVER as $key => $value) { 
if(substr($key, 0, 5) === 'HTTP_') { 
	$key = substr($key, 5); 
	$key = str_replace('_', '-', $key); 
	 
	$raw .= $key.':'.$value."\r\n"; 
} 
} 
 
// (3) 空行 
//$raw .= "\r\n"; 
 
// (4) 请求Body 
//$raw .= file_get_contents('php://input'); 
 
return $raw; 
}


















?>













