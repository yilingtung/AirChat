var holder;
var width;
var lastWidth;
var maxShowingIndex;
var aircraftImg;
var cloudImg;
$(document).ready(function () {
  $(window).resize(Resize);
  width = $(window).width();
  aircraftImg = document.getElementsByClassName('aircraft')[0];
  cloudImg = document.getElementsByClassName('cloud')[0];

  $("body").mousemove(function(event){
    UpdateImgPosByPercent(aircraftImg, event.clientX/$(window).width(), event.clientY/$(window).height(), 200);
    UpdateImgPosByPercent(cloudImg, event.clientX/$(window).width(), event.clientY/$(window).height(), -50);
  });

  $('.chat_head').click(function () {
    $('.chat_body').slideToggle("fast");
  });

  $('.toggle_bottom').click(function(event){
    event.stopPropagation();
    $('.toggle_body').toggle();
  });

});

$(document).on("click", function () {
    $(".toggle_body").hide();
});

var activedMsgBoxArray = [];
var activedToggleDivArray = [];
function ShowUpMsgBox(_id,_name) {
  //create msgBox
  if (document.getElementById('msg_'+_id) == null){
    var msgBox = document.createElement("div");
    $(msgBox).css("display","block");
    msgBox.className = "msg_box";
    msgBox.setAttribute("id", "msg_"+_id);
    msgBox.setAttribute("count", 0);
    var closeMsgBtn = document.createElement("div");
    closeMsgBtn.className = "close";
    closeMsgBtn.innerHTML = 'x';
    msgBox.innerHTML = '<div class="msg_head"><div class="msg_name"><span></span></div></div>';
    msgBox.getElementsByClassName('msg_head')[0].appendChild(closeMsgBtn);
    msgBox.innerHTML += '<div class="msg_wrap"><div class="msg_body"></div><div class="msg_footer"><textarea class="msg_input" placeholder="Type a message..."></textarea></div></div>';
    $(msgBox).find('.msg_input').keypress(function(e) {
      if(e.which == 13) {
        console.log($(this).val());
        PostMessage(_id,$(this).val());
        e.preventDefault();
        $(this).val("");
      }
    });
    msgBox.getElementsByClassName('msg_head')[0].childNodes[0].childNodes[0].innerHTML = _name;
    document.getElementsByTagName('body')[0].appendChild(msgBox);
    activedMsgBoxArray.push(msgBox);
    //GetConversationHistory(1,_id);
    msgBox.getElementsByClassName('msg_head')[0].onclick = function(){$(msgBox.getElementsByClassName('msg_wrap')[0]).slideToggle('fast')};
    msgBox.getElementsByClassName('close')[0].onclick = function(){CloseBtn(msgBox)};
    if(activedMsgBoxArray.length <= maxShowingIndex){
      $(msgBox).css({'right': 280+270* (activedMsgBoxArray.length - 1) +"px"});
    }else{
      $(msgBox).css({'right': 316+270* (maxShowingIndex-1) +"px"});
    }


    //create toggleDiv
    var toggleDiv = document.createElement("div");
    toggleDiv.className = "toggle_div";
    //toggleDiv.onclick = function(){ShowUpMsgBoxFromToggleDiv(toggleDiv)};
    var closeToggleBtn = document.createElement("div");
    closeToggleBtn.className = "close";
    closeToggleBtn.innerHTML = 'x';
    toggleDiv.innerHTML = '<div class="toggle_name"><span></span></div>';
    toggleDiv.childNodes[0].onclick = function(){ShowUpMsgBoxFromToggleDiv(toggleDiv)};
    toggleDiv.appendChild(closeToggleBtn);
    toggleDiv.childNodes[0].childNodes[0].innerHTML = _name;
    document.getElementsByClassName('toggle_body')[0].appendChild(toggleDiv);
    activedToggleDivArray.push(toggleDiv);
    toggleDiv.getElementsByClassName('close')[0].onclick = function(){CloseBtn(toggleDiv)};

    //test exchange

    if(activedMsgBoxArray.length > maxShowingIndex){
      var tempMsg = activedMsgBoxArray[maxShowingIndex-1];
      activedMsgBoxArray[maxShowingIndex-1] = activedMsgBoxArray[activedMsgBoxArray.length-1];
      activedMsgBoxArray[activedMsgBoxArray.length-1] = tempMsg;

      var tempToggle = activedToggleDivArray[maxShowingIndex-1];
      activedToggleDivArray[maxShowingIndex-1] = activedToggleDivArray[activedToggleDivArray.length-1];
      activedToggleDivArray[activedToggleDivArray.length-1] = tempToggle;

      UpdateActivedMsgPosition();
    }else{
      UpdateActivedMsgPosition();
    }
    var func = GetConversationHistory.bind(msgBox);
    msgBox.intervalHolder = setInterval(func,500);
  }else{
    var msgBox = document.getElementById('msg_'+_id);
    if(msgBox.style.display == 'none'){
      ShowUpMsgBoxFromToggleDiv(msgBox);
    }
  }
}

function ShowUpMsgBoxFromToggleDiv(item) {
  if(item.className == 'msg_box'){
    var index = activedMsgBoxArray.indexOf(item);
  }else{
    var index = activedToggleDivArray.indexOf(item);
  }
  var tempMsg = activedMsgBoxArray[maxShowingIndex-1];
  activedMsgBoxArray[maxShowingIndex-1] = activedMsgBoxArray[index];
  activedMsgBoxArray[index] = tempMsg;
  var tempToggle = activedToggleDivArray[maxShowingIndex-1];
  activedToggleDivArray[maxShowingIndex-1] = activedToggleDivArray[index];
  activedToggleDivArray[index] = tempToggle;
  UpdateActivedMsgPosition();
  activedMsgBoxArray[maxShowingIndex-1].childNodes[1].style.display = 'block';
}

function CloseBtn(item) {
  if(item.className == 'msg_box'){
    var index = activedMsgBoxArray.indexOf(item);
    clearInterval(item.intervalHolder);
    $(activedToggleDivArray[index]).remove();
  }else{
    var index = activedToggleDivArray.indexOf(item);
    clearInterval(activedMsgBoxArray[index].intervalHolder);
    $(activedMsgBoxArray[index]).remove();
  }
  $(item).remove();
  if(index > -1){
    activedMsgBoxArray.splice(index, 1);
    activedToggleDivArray.splice(index,1);
  }
  UpdateActivedMsgPosition();
}

function UpdateActivedMsgPosition() {
  lastWidth = width-320;
  if(lastWidth > 0){
    maxShowingIndex = Math.floor(lastWidth/270) ;
  }
  //set toggle_box position
  var toggleBox = document.getElementsByClassName('toggle_box');
  $(toggleBox).css({'right' : 270*(maxShowingIndex+1)+10 +'px'});
  //show toggle_box
  if(activedMsgBoxArray.length <= maxShowingIndex){
    $(toggleBox).hide();
  }else{
    $(toggleBox).show();
  }

  activedMsgBoxArray.forEach(function(element, index) {
    if(index < maxShowingIndex){
      $(element).animate({"right": 280+270*index+"px"});
      $(element).show();
    }else{
      $(element).hide();
      $(element).children('.msg_wrap').css({'display':'none'});
      //$(element).css({"right": 280+270*index+"px"});
    }
  });
  activedToggleDivArray.forEach(function(element, index) {

    if(index < maxShowingIndex){
      $(element).hide();
    }else{
      $(element).show();
    }
  });
}

function Resize() {
  width = $(window).width();
  UpdateActivedMsgPosition();
}

function UpdateImgPosByPercent(img, x_percent, y_percent, p) {
  var img_x = (x_percent - 0.5) * p;
  var img_y = (y_percent - 0.5) * p;
  img.style.backgroundPosition = img_x + " " + img_y;
}
