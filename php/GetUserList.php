<?php
  //連結，每一個都要
  require("Config.php");
  $conn = mysql_connect($db_host, $db_user, $db_pass);
  mysql_select_db($db_name);
  session_start();
  //GET 取得js傳進來的值
  $_id = $_SESSION['id'];
  //第一次搜尋
  $query_str = "SELECT friend_id FROM Friends WHERE my_id = $_id";
  $result = mysql_query($query_str, $conn);
  //累加的變數
  $i = 0;
  while($item = mysql_fetch_array($result)){
    //第二次的搜尋
    $query_str = "SELECT name,id FROM Members WHERE id = ".$item['friend_id'];
    $sub_result = mysql_query($query_str);
    $sub_item = mysql_fetch_array($sub_result);
    $responseText[$i] = ['name' => $sub_item['name'], 'id' => $sub_item['id']];
    $i++;
  }
  echo json_encode($responseText);
?>
