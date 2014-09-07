
<html>
  <head>
    <script src='https://cdn.firebase.com/js/client/1.0.15/firebase.js'></script>
    <script src='https://ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.min.js'></script>
    <script src="jquery-ui-1.11.1.custom/jquery-ui.min.js"></script>
    <script src='jquery.nicescroll.min.js'></script>
    <link rel="stylesheet" type="text/css" href="jquery-ui-1.11.1.custom/jquery-ui.min.css" />
  </head>
  <body style="background-color:#555555;">
    <div id="tabs">
      <ul style="height:50px;">
      </ul>
    </div>
    <input style="color:#d9d9d9; background-color:#111; border-color:#111; text-align:left;" type='text' id='nameInput' class="ui-autocomplete-input ui-button ui-corners-all" placeholder='Name'>
    <input style="color:#d9d9d9; background-color:#111; border-color:#111; text-align:left;" type='text' id='messageInput' class="ui-autocomplete-input ui-button ui-corners-all" placeholder='Message'>
  <script>
    var username = "";
  while(username == null)
    {
      username = prompt("Please enter Jweb Username", "Enter Username");
    }
    var password = "";
  while(password == null)
    {
      password = prompt("Please enter Jweb Password", "Enter Password");
    }
  </script>


    <?php
      $LOGINURL = "http://jweb.kettering.edu/cku1/twbkwbis.P_ValLogin";
      $cookie_file_path = "cookies.txt";
      $ch = curl_init();
      curl_setopt($ch, CURLOPT_URL,$LOGINURL);
      curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
      curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 0);
      curl_setopt($ch, CURLOPT_COOKIEFILE, $cookie_file_path);
      curl_setopt($ch, CURLOPT_COOKIEJAR, $cookie_file_path);
      ob_start();
      $result = curl_exec ($ch);
      ob_end_clean();
      curl_close ($ch);
      
      //$POSTFIELDS = "sid=holl4332&PIN=21797721";
      $POSTFIELDS = "sid=".username."&PIN=".password;

      $ch = curl_init(); 
        curl_setopt($ch, CURLOPT_URL,$LOGINURL);
        curl_setopt($ch, CURLOPT_POST, 1); 
        curl_setopt($ch, CURLOPT_POSTFIELDS,$POSTFIELDS);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 0); 
        curl_setopt($ch, CURLOPT_COOKIEFILE, $cookie_file_path);
        curl_setopt($ch, CURLOPT_COOKIEJAR, $cookie_file_path);
        $result = curl_exec ($ch);
        curl_close ($ch);

      
      /* 
        Home > Student > Registration > Select Term
        Format for selecting term: yyyy + term_id
        term_ids: 
          Winter - 01
          Spring - 02
          Summer - 03
          Fall   - 04
      */

    ?>
    <script src="parsing_functions.js"></script>
    <script src="chat.js"></script>
    <script type="text/javascript">
      $(document).ready(function(){
        $.ajax({
          type: "POST",
          url: "php-proxy.php",
          data: null
        }).done(function(result){
          parseSchedule(result, chat);
        });
      });
    </script>

  </body>
  
</html>