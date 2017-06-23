<?php
/*
*
*
*图形验证码类
*@YX
*
*/
 class Vcode {
  private $width; //宽
  private $height; //高
  private $num;  //数量
  public  $code; //验证码
  private $img;  //图像的资源
  private $key = 'web_key';
  
  //构造方法， 三个参数
  function __construct($width=205, $height=48, $num=4) {
   $this->width = $width;
   $this->height = $height;
   $this->num = $num;
   $this->code = $this->createcode(); //调用自己的方法
  }
  
  //获取字符的验证码， 用于保存在服务器中
  function getcode() {
   return $this->code;
  }
  
//生成验证码
  public  function get_img()
  {
  	// @session_start();
    @session_id('ecsid');
    @session_start();
 	 //$_SESSION['mobile_key'] = $this->getcode();
   setcookie('web_key',$this->getcode(),time()+15*60,'/');
 
 	 $this->outimg();


  	
  }

 //验证验证码、
  public function case_key($img_key){
	
  	if($_SESSION[$this->key]){
  		if(strtolower($_SESSION[$this->key])==strtolower($img_key)){
  			return true;
  		}else{
  			return false;
  		}

  	}else{
  		return false;
  	}



  }



  //输出图像
  function outimg() {
   //创建背景 (颜色， 大小， 边框)
   $this->createback();
  
   //画字 (大小， 字体颜色)
   $this->outstring();
  
   //干扰元素(点， 线条)
  
   $this->setdisturbcolor();
   //输出图像
   $this->printimg();
  }
  
  //创建背景
  private function createback() {
   //创建资源
   $this->img = imagecreatetruecolor($this->width, $this->height);
   //设置随机的背景颜色
   $bgcolor = imagecolorallocate($this->img, rand(225, 255), rand(225, 255), rand(225, 255)); 
   //设置背景填充
   imagefill($this->img, 0, 0, $bgcolor);
   //画边框
   $bordercolor = imagecolorallocate($this->img, 0, 0, 0);
  
    imagerectangle($this->img, 0, 0, $this->width-1, $this->height-1, $bordercolor);
  }
  
  //画字
  private function outstring() {
   for($i=0; $i<$this->num; $i++) {
  
    $color= imagecolorallocate($this->img, rand(100, 128), rand(0, 128), rand(50, 128)); 
  
    $fontsize=30; //字体大小
  
    $x = 20+($this->width/$this->num)*$i; //水平位置
   // $y = rand(0, imagefontheight($fontsize)-6);
  $y = 16;
    //画出每个字符
    imagechar($this->img, $fontsize, $x, $y, $this->code{$i}, $color);
   }
  }
  
  //设置干扰元素
  private function setdisturbcolor() {
   //加上点数
   for($i=0; $i<50; $i++) {
    $color= imagecolorallocate($this->img, rand(0, 255), rand(0, 255), rand(0, 255)); 
    imagesetpixel($this->img, rand(1, $this->width-2), rand(1, $this->height-2), $color);
   }
  
   //加线条
   for($i=0; $i<3; $i++) {
    $color= imagecolorallocate($this->img, rand(0, 255), rand(0, 128), rand(0, 255)); 
    imagearc($this->img,rand(-10, $this->width+10), rand(-10, $this->height+10), rand(30, 300), rand(30, 300), 55,44, $color);
   }
  }
  
  //输出图像
  private function printimg() {
   if (imagetypes() & IMG_GIF) {
     header("Content-type: image/gif");
     imagegif($this->img);
   } elseif (function_exists("imagejpeg")) {
     header("Content-type: image/jpeg");
     imagegif($this->img);
   } elseif (imagetypes() & IMG_PNG) {
     header("Content-type: image/png");
     imagegif($this->img);
   } else {
     die("No image support in this PHP server");
   } 
  
  }
  
  //生成验证码字符串
  private function createcode() {
   $codes = "ABCDEFGHIJKLMNPQRSTUVWXY123456789";
  
   $code = "";
  
   for($i=0; $i < $this->num; $i++) {
    $code .=$codes{rand(0, strlen($codes)-1)}; 
   }
  
   return $code;
  }
  
  
  //用于自动销毁图像资源
  function __destruct() {
   @imagedestroy($this->img);
  }
  
 }










































?>