<?php
  //連結，每一個都要
  require("Config.php");
  $conn = mysql_connect($db_host, $db_user, $db_pass);
  mysql_select_db($db_name);
  session_start();
  //GET 取得js傳進來的值
  $account = $_POST['account'];
  $password = $_POST['password'];
  $query_str = "SELECT * FROM Members WHERE account = '$account' AND password = '$password'";
  $result = mysql_query($query_str, $conn);
  $responseText = null;
  if($result === FALSE) {
    die(json_encode($responseText));
  }
  while($item = mysql_fetch_array($result)){
      $_SESSION['name'] = $item['name'];
      $_SESSION['id'] = $item['id'];
      $_SESSION['account'] = $item['account'];
      $_SESSION['img'] = $item['img'];
      $responseText = 'index.php';
      echo $responseText;
  }
?>
