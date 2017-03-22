<?php
header("Access-Control-Allow-Origin: *");
sleep(4);

$arr = array( "success" => 1 , "result" => array(
        array("id"=>1,"name"=>"user1","age"=>10,"headerUrl"=>"http://d.hiphotos.baidu.com/zhidao/wh%3D600%2C800/sign=44efbe491e30e924cff194377c38423e/dcc451da81cb39dbf51ac417d1160924aa18309c.jpg"),
        array("id"=>2,"name"=>"user2","age"=>20,"headerUrl"=>"http://img.cnjiayu.net/3211573049-3310678237-21-0.jpg"),
        array("id"=>3,"name"=>"user3","age"=>30,"headerUrl"=>"http://img.mp.itc.cn/upload/20160611/f99d89236dbf42328f0f0f22cd64dab4.png"),
        array("id"=>4,"name"=>"user4","age"=>40,"headerUrl"=>"http://www.qqbody.com/uploads/allimg/img/weixin/20170304/rle255apte2uqvikk.jpg"),
        array("id"=>5,"name"=>"user5","age"=>50,"headerUrl"=>"http://www.qqbody.com/uploads/allimg/img/weixin/20170304/rle255xfcyz3v2do2.jpg"),
        array("id"=>6,"name"=>"user6","age"=>60,"headerUrl"=>"http://www.qqbody.com/uploads/allimg/img/weixin/20170304/rle255bjmfncxuppx.jpg"),
        array("id"=>7,"name"=>"user7","age"=>70,"headerUrl"=>"http://tupian.qqjay.com/tou2/2017/0120/22aa389629fc6dfad21d4b3027889054.jpg"),
        array("id"=>8,"name"=>"user8","age"=>80,"headerUrl"=>"http://www.qqbody.com/uploads/allimg/img/weixin/20170304/rle255ur4wu4ymyaa.png")
        
    )
);

echo json_encode($arr);
?>