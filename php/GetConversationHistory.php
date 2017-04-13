<?php
  //連結，每一個都要
  require("Config.php");
  $conn = mysql_connect($db_host, $db_user, $db_pass);
  mysql_select_db($db_name);
  session_start();
  //GET 取得js傳進來的值
  $_id = $_SESSION['id'];
  $_id_2 = $_GET['id_2'];
  $_count = $_GET['count'];
  $query_str = "SELECT *
                FROM (SELECT *
                      FROM Messages AS m
                      WHERE from_id = $_id OR to_id = $_id
                )AS mm WHERE from_id = $_id_2 OR to_id = $_id_2";
  $result = mysql_query($query_str, $conn);
  $i = 0;
  $responseText = null;
  while($item = mysql_fetch_array($result)){
    $responseText[$i] = ['time_stamp' => $item[0],'from_id' => $item[1],'to_id' => $item[2],'msg' => $item[3]];
    $i++;
  }
  if($_count == $i){
    $responseText = null;
  }
  echo json_encode($responseText);
?>
