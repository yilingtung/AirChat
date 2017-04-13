<!DOCTYPE>
<html>
  <head>
    <meta charset="utf-8">
    <title>Register For A Free Account!</title>
    <link rel="stylesheet" href="css/loginStyle.css" type="text/css">
  </head>
  <body>
    <img class="logo" src="img/logo.png">
    <form id="signup_form" class="form-wrap" method="POST">
      <div class="character">
        <img src="img/character.png">
        <div class="bubble register_bubble">Rigster!!</div>
      </div>
      <input id="name" class="form_input account" type="text" name="name" placeholder="Your Name">
      <input id="account" class="form_input" type="text" name="account" placeholder="Account">
      <input id="password" class="form_input" type="password" name="password" placeholder="Password">
      <input id="confirm" class="form_input password" type="password" name="confirm" placeholder="Repeat Password">
      <div>
        <span class="error_msg"></span>
      </div>
      <button id ="signup" class="form-sbmit" onclick="SignUp()" type="submit" name="signup">Sign Up</button>
      <div>
        <span>Already have an account?</span>
        <a href="login.php">Yes</a>
      </div>
    </form>
  </body>
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
  <script src="loginAjaxRequest.js" type="text/javascript"></script>
</html>
