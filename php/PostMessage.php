<?php
  //連結，每一個都要
  require("Config.php");
  $conn = mysql_connect($db_host, $db_user, $db_pass);
  mysql_select_db($db_name);
  session_start();
  //GET 取得js傳進來的值
  $_id = $_SESSION['id'];
  $_id_2 = $_POST['id_2'];
  $_msg = $_POST['msg'];
  $query_str = "INSERT INTO Messages (from_id, to_id, msg) VALUES ('$_id', '$_id_2', '$_msg')";
  if (!mysql_query($query_str,$conn)){
    die('Error: ' . mysql_error());
  }
  echo "1 msg added";
  mysql_close($conn);
?>
