<?php
   session_start();
   if(session_destroy()) {
      $responseText = 'login.php';
      echo $responseText;
   }
?>
