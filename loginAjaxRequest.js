$(document).ready(function(){
});
function Login(){
  event.preventDefault();
  var account = $("input#account").val();
  if(account == ""){
    document.getElementsByClassName('character')[0].innerHTML = '<img src="img/character_error2.png"><div class="bubble top_bubble"><span class="error_msg">Account is Empty.</span></div>';
  }else{
    var password = $("input#password").val();
    if(password == ""){
      document.getElementsByClassName('character')[0].innerHTML = '<img src="img/character_error2.png"><div class="bubble top_bubble"><span class="error_msg">Password is Empty. </span></div>';
    }else{
      var xmlhttp = new XMLHttpRequest();
      var url = 'php/Login.php';
      var vars = 'account='+account+'&password='+password;
      xmlhttp.open('POST', url , true);
      xmlhttp.onreadystatechange = function() {
        if(xmlhttp.readyState == 4 && xmlhttp.status == 200){
          console.log(xmlhttp.responseText);
          if(xmlhttp.responseText == ''){
            document.getElementsByClassName('character')[0].innerHTML = '<img src="img/character_error.png"><div class="bubble top_bubble"><span class="error_msg">Incorrect...</span></div>';
          }else{
            window.location.replace(xmlhttp.responseText);
          }
        }
      };
      xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      xmlhttp.send(vars);
    }
  }
}

function SignUp() {
  event.preventDefault();
  var name = $("input#name").val();
  if(name == ""){
    document.getElementsByClassName('character')[0].innerHTML = '<img src="img/character_error2.png"><div class="bubble top_bubble"><span class="error_msg">What is your name?</span></div>';
  }else{
    var account = $("input#account").val();
    if(account == ""){
      document.getElementsByClassName('character')[0].innerHTML = '<img src="img/character_error2.png"><div class="bubble top_bubble"><span class="error_msg">Account is Empty.</span></div>';
    }else{
      var password = $("input#password").val();
      if(password == ""){
        document.getElementsByClassName('character')[0].innerHTML = '<img src="img/character_error2.png"><div class="bubble top_bubble"><span class="error_msg">Password is Empty. </span></div>';
      }else{
        var confirm = $("input#confirm").val();
        if(confirm == ""){
          document.getElementsByClassName('character')[0].innerHTML = '<img src="img/character_error2.png"><div class="bubble top_bubble"><span class="error_msg">Repeat Password. </span></div>';
        }else{
          if(password != confirm){
            document.getElementsByClassName('character')[0].innerHTML = '<img src="img/character_error2.png"><div class="bubble top_bubble"><span class="error_msg">Password is different. </span></div>';
          }else{
            var xmlhttp = new XMLHttpRequest();
            var url = 'php/AddMember.php';
            var vars = 'name='+name+'&account='+account+'&password='+password;
            xmlhttp.open('POST', url , true);
            xmlhttp.onreadystatechange = function() {
              if(xmlhttp.readyState == 4 && xmlhttp.status == 200){
                console.log(xmlhttp.responseText);
                if(xmlhttp.responseText == 'null'){
                  document.getElementsByClassName('character')[0].innerHTML = '<img src="img/character_error.png"><div class="bubble top_bubble"><span class="error_msg">Account has been used...</span></div>';
                }else{
                  window.location.replace(xmlhttp.responseText);
                }
              }
            };
            xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            xmlhttp.send(vars);
          }
        }
      }
    }
  }
}
