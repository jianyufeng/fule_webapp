<?php
header("Access-Control-Allow-Origin: *");
sleep(1);

$arr = array( "success" => 1 , "result" => $_POST );

echo json_encode($arr);

?>