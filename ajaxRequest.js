$(document).ready(function(){
  GetUserData();
});
var user_name;
var user_id;
var user_account;

function GetUserData() {
  var xmlhttp = new XMLHttpRequest();
  var url = 'php/GetUserData.php';
  xmlhttp.open('GET', url , true);
  xmlhttp.onreadystatechange = function(){
    if(xmlhttp.readyState == 4 && xmlhttp.status == 200){
      var responseText = $.parseJSON(xmlhttp.responseText);
      user_name = responseText['name'];
      user_id = responseText['id'];
      user_account = responseText['account'];
      user_img = responseText['img'];
      GetUserList();
    }
  };
  xmlhttp.send();
}

function GetUserList(){
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function(){
    if(xmlhttp.readyState == 4 && xmlhttp.status == 200){
      //Success
      console.log(xmlhttp.responseText+'@line11');
      var responseText = $.parseJSON(xmlhttp.responseText);
      console.log(responseText[0].img+'@line13');
      responseText.forEach(function(friend){
        var chatFriend = document.createElement('div');
        chatFriend.className = "chat_friend";
        chatFriend.innerHTML = '<div class="chat_img"><img class="user_img" alt="" /></div><div class="user_name"></div>';
        chatFriend.getElementsByClassName('user_img')[0].src = friend.img;
        chatFriend.getElementsByClassName('user_name')[0].innerHTML += friend.name;
        document.getElementsByClassName('chat_body')[0].appendChild(chatFriend);
        chatFriend.onclick = function(){ShowUpMsgBox(friend.id,friend.name,friend.img)};
      });
    }
  };
  xmlhttp.open('GET', 'php/GetAllUser.php', true);
  xmlhttp.send();
}

function GetConversationHistory(_id_2){
  var _id_2 = parseInt(this.id.split("_")[1]);
  var count = this.getAttribute('count');
  var img = this.getAttribute('img');
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function(){
    if(xmlhttp.readyState == 4 && xmlhttp.status == 200){
      //Success
      var msgBox = document.getElementById('msg_'+_id_2);
      var responseText = $.parseJSON(xmlhttp.responseText);
      console.log('GetConversationHistory');
      if(responseText != null){
        var i = 0;
        responseText.forEach(function(msg){
          i++;
          if( i > count){
            if (msg.from_id == _id_2){
              msgBox.childNodes[1].childNodes[0].innerHTML += '<div class="msg_B"><div class="msg_user_img"><img class="user_img" src='+ img +' alt="" /></div><div class="msg_B_say">' + msg.msg + '</div></div>';
            }else{
              msgBox.childNodes[1].childNodes[0].innerHTML += '<div class="msg_A"><div class="msg_A_say">' + msg.msg + '</div></div>';
            }
          }
        });
        msgBox.setAttribute('count',i);
        $(msgBox.childNodes[1].childNodes[0]).scrollTop(msgBox.childNodes[1].childNodes[0].scrollHeight)
      }
    }
  };
  xmlhttp.open('GET', 'php/GetConversationHistory.php?id_2='+_id_2+"&count="+count, true);
  xmlhttp.send();
}

function PostMessage(to_id,msg){
  var xmlhttp = new XMLHttpRequest();
  var url = 'php/PostMessage.php';
  var vars = 'id_2='+to_id+'&msg='+msg;
  xmlhttp.open('POST', url , true);
  xmlhttp.onreadystatechange = function() {
    if(xmlhttp.readyState == 4 && xmlhttp.status == 200){
      console.log(this.responseText);
    }
  };
  xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xmlhttp.send(vars);
}

function Logout() {
  var xmlhttp = new XMLHttpRequest();
  var url = 'php/Logout.php';
  xmlhttp.open('GET', url , true);
  xmlhttp.onreadystatechange = function(){
    if(xmlhttp.readyState == 4 && xmlhttp.status == 200){
      window.location.replace(xmlhttp.responseText);
    }
  };
  xmlhttp.send();
}
