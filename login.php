<!DOCTYPE>
<html>
  <head>
    <meta charset="utf-8">
    <title>Login To Chat!</title>
    <link rel="stylesheet" href="css/loginStyle.css" type="text/css">
  </head>
  <body>
    <img class="logo" src="img/logo.png">
    <form id="login_form" class="form-wrap" method="POST">
      <div class="character">
        <img src="img/character.png">
        <div class="bubble right_bubble">Hi</div>
      </div>
      <input id="account" class="form_input account" type="text" name="account" placeholder="Account">
      <input id="password" class="form_input password" type="password" name="password" placeholder="Password">
      <div>
        <span class="error_msg"></span>
      </div>
      <button id ="login" class="form-sbmit" onclick="Login()" type="submit" name="login">Login</button>
      <div>
        <span>Not a member?</span>
        <a href="signUp.php">Sign up now!</a>
      </div>
    </form>
  </body>
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
  <script src="loginAjaxRequest.js" type="text/javascript"></script>
</html>
