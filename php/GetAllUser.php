<?php
  //連結，每一個都要
  require("Config.php");
  $conn = mysql_connect($db_host, $db_user, $db_pass);
  mysql_select_db($db_name);
  session_start();
  //GET 取得js傳進來的值
  $_id = $_SESSION['id'];
  //第一次搜尋
  $query_str = "SELECT *
                FROM Members
                WHERE id <> $_id";
  $result = mysql_query($query_str, $conn);
  //累加的變數
  $i = 0;
  while($item = mysql_fetch_array($result)){
    $responseText[$i] = ['name' => $item['name'], 'id' => $item['id']];
    $i++;
  }
  echo json_encode($responseText);
?>
