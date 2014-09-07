function chat(user) {
  var userKey;
  var firstLoad = true;
  var myDataRef = new Firebase("https://sizzling-heat-3782.firebaseio.com/");
  var classRef = myDataRef.child("Classes");
  var userRef = myDataRef.child("Users");
  var currentClassRef;
  //Temporary...will need to be dynamic for classes


  // Get current user's classes and populate tabs
  var classes;
  userRef.once("value", function(snapshot){
    var user = snapshot.val();
    if (user && user[userKey]) {
      classes = user[userKey].Classes;
      
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
    }
  });


// TODO: Change this so we don't have to unbind/rebind the event
// Should just dynamically work for active tab?

  // Load messages
  currentClassRef = myDataRef.child("Messages/class0"); // Set path to load messages from (defaults to class0 for now)
  currentClassRef.on("child_added", function(snapshot){
    var text = snapshot.val().text;
    displayChatMessage(text, $(".ui-state-active").attr("aria-controls"));
  });

  $("#tabs").on("click", "a", function(){
    currentClassRef = myDataRef.child("Messages/" + $(this).attr("id").split("ss").pop()); // Rebase the path to pull messages from
    $("#" + $(".ui-state-active").attr("aria-controls")).html(""); // Clear active tab before we switch
    currentClassRef.off("child_added"); // unbind event handler so we can bind a new one

    currentClassRef.on("child_added", function(snapshot){

      var text = snapshot.val().text;
      displayChatMessage(text, $(".ui-state-active").attr("aria-controls"));
    });
  });

  //end temporary

  // Create new div and store message in it, append to tab
  function displayChatMessage(text, tab)
  {
    $("<div/>").text(text).prepend($("<em/>").text(name + ": ")).appendTo($("#" + tab));
    var d = $("#" + $(".ui-state-active").attr("aria-controls"));
    d.scrollTop(d.prop("scrollHeight"));
  }

  // Send message.. needs to pull name of the user from somewhere
  $('#messageInput').keypress(function (e) {
      if (e.keyCode == 13) {
        var text = $('#messageInput').val();
        currentClassRef.push({name: user, text: text});
        $('#messageInput').val('');
      }
    });
}
