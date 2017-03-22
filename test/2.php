<?php
header("Access-Control-Allow-Origin: *");
sleep(1);

$arr = array( "success" => 1 , "result" => array(
        array("id"=>1,"name"=>"user1","age"=>10),
        array("id"=>2,"name"=>"user2","age"=>20),
        array("id"=>3,"name"=>"user3","age"=>30),
        array("id"=>4,"name"=>"user4","age"=>40)
    )
);

echo json_encode($arr);
?>