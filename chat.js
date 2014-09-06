var userKey = "User2";
var firstLoad = true;
var myDataRef = new Firebase("https://sizzling-heat-3782.firebaseio.com/");
var classRef = new Firebase("https://sizzling-heat-3782.firebaseio.com/Classes")
var currentClassRef;
//Temporary...will need to be dynamic for classes

var classes;
var userRef =  new Firebase("https://sizzling-heat-3782.firebaseio.com/Users")
userRef.once("value", function(snapshot){
  classes = snapshot.val()[userKey].Classes;
  
  $.each(classes, function(currentClassIndex, currentClassValue){
    
    $("<li><a id='class" + currentClassValue.classKey + "' href='#tabs-" + currentClassValue.classKey + "'>" + currentClassValue.ClassName + "</a></li>").appendTo($("#tabs > ul"));
    $("<div class='scrollingDiv' style='height:100px;' id='tabs-" + currentClassValue.classKey + "'></div>").appendTo("#tabs");
  });
  $(function() {
    $( "#tabs" ).tabs();
    $(".scrollingDiv").each(function(){
      $(this).niceScroll();
    });
  });
   
});
currentClassRef = myDataRef.child("Messages/0");
currentClassRef.on("child_added", function(snapshot){
  var name = snapshot.val().name;
  var text = snapshot.val().text;
  displayChatMessage(name, text, $(".ui-state-active").attr("aria-controls"));
});

$("#tabs").on("click", "a", function(){
  currentClassRef = myDataRef.child("Messages/" + $(this).attr("id").split("ss").pop());
  $("#" + $(".ui-state-active").attr("aria-controls")).html("");
  currentClassRef.off("child_added");

  currentClassRef.on("child_added", function(snapshot){

    var name = snapshot.val().name;
    var text = snapshot.val().text;
    displayChatMessage(name, text, $(".ui-state-active").attr("aria-controls"));
  });
});

//end temporary

function displayChatMessage(name, text, tab)
{
  $("<div/>").text(text).prepend($("<em/>").text(name + ": ")).appendTo($("#" + tab));
  var d = $("#" + $(".ui-state-active").attr("aria-controls"));
  d.scrollTop(d.prop("scrollHeight"));
}

//This will change based on user who is logged in
$('#messageInput').keypress(function (e) {
    if (e.keyCode == 13) {
      var name = $('#nameInput').val();
      var text = $('#messageInput').val();
      currentClassRef.push({name: name, text: text});
      $('#messageInput').val('');
    }
  });