<?php
  session_start();
?>
<!DOCTYPE>
<html>
  <head>
    <meta charset="utf-8">
    <title>AirChat</title>
    <link rel="stylesheet" href="css/style.css" type="text/css">
    <link rel="icon" type="image/png" href="./img/favicon.ico" />
  </head>
  <body>

    <header class="header">
      <div>
        <img src="img/logo.png" alt="">
        <button class ="log_out" onclick="Logout()" name="logout">Log Out</button>
        <div class="user">
          <?php
            echo $_SESSION['name'];
          ?>
        </div>
        <img class="userImg" src="<?php echo $_SESSION['img'];?>" alt="">
      </div>
		</header>
    <!-- <div class="aircraft"></div>
    <div class="cloud"></div> -->
    <div class="chat_box">
      <div class="chat_head">
        Chat
      </div>
      <div class="chat_body">
      </div>
    </div>
    <div class="toggle_box">
      <div class="toggle_body"></div>
      <div class="toggle_bottom">
        <div class="toggle_icon">
          <img class="toggle_icon_img" src="./img/chat.png">
        </div>
      </div>
    </div>
  </body>
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
  <script src="script.js" type="text/javascript"></script>
  <script src="ajaxRequest.js" type="text/javascript"></script>
</html>
