<?php
header("Access-Control-Allow-Origin: *");
sleep(1);

$arr = array( "success" => 1 , "result" => array(
        array("id"=>1,"name"=>"user11","age"=>10),
        array("id"=>2,"name"=>"user22","age"=>20),
        array("id"=>3,"name"=>"user33","age"=>30),
        array("id"=>4,"name"=>"user44","age"=>40)
    )
);

echo json_encode($arr);
?>