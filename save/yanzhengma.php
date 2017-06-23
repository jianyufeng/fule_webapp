<?php
require_once ('./model/yanzheng.class.php');
$cord = new Vcode();

echo $cord -> get_img();
?>