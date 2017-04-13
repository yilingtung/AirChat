<?php
  require("Config.php");
  $conn = mysql_connect($db_host, $db_user, $db_pass);
  mysql_select_db($db_name);
  session_start();
  $name = $_POST['name'];
  $account = $_POST['account'];
  $password = $_POST['password'];
  $query_str = "SELECT account
                FROM Members
                WHERE account = '$account'";
  $result = mysql_query($query_str, $conn);
  $count = mysql_num_rows($result);
  if($count != 0){
    $responseText = null;
    die(json_encode($responseText));
  }else{
    $query_str = "INSERT INTO Members (name, account, password) VALUES ('$name', '$account', '$password')";
    if (!mysql_query($query_str,$conn)){
      echo 'error';
      die('Error: ' . mysql_error());
    }else{
      $query_str = "SELECT * FROM Members WHERE account = '$account'";
      $result = mysql_query($query_str, $conn);
      $responseText = null;
      if($result === FALSE) {
        die(json_encode($responseText));
      }
      while($item = mysql_fetch_array($result)){
          $_SESSION['name'] = $item['name'];
          $_SESSION['id'] = $item['id'];
          $_SESSION['account'] = $item['account'];
          $responseText = 'index.php';
          echo $responseText;
      }
    }


  }
?>
