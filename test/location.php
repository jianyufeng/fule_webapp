<?php
header("Access-Control-Allow-Origin: *");
$arr = array( "success" => 1 , "result" => array(
    array("id"=>1,"name"=>"中国","fid"=>"0"),
    array("id"=>2,"name"=>"甘肃省","fid"=>"1"),
    array("id"=>3,"name"=>"陕西省","fid"=>"1"),
    array("id"=>4,"name"=>"兰州市","fid"=>"2"),
    array("id"=>5,"name"=>"天水市","fid"=>"2"),
    array("id"=>6,"name"=>"麦积区","fid"=>"5"),
    array("id"=>7,"name"=>"秦城区","fid"=>"5"),
    array("id"=>8,"name"=>"西站","fid"=>"4"),
    array("id"=>9,"name"=>"西关十字","fid"=>"4")
));

echo json_encode($arr);
?>