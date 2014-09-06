 <?php
    // Get cURL resource

    $curl = curl_init();
    curl_setopt($curl, CURLOPT_URL, "http://jweb.kettering.edu/cku1/twbkwbis.P_ValLogin");
    curl_setopt($curl, CURLOPT_FOLLOWLOCATION, true);
    curl_setopt($curl, CURLOPT_AUTOREFERER, false);
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($curl, CURLOPT_COOKIEJAR, "cookie.txt");
    
    // Send the request & save response to $resp

    $resp = curl_exec($curl);
    echo $resp;
    // Close request to clear up some resources
    curl_close($curl);
  ?>
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
  


  </body>
  <script src="chat.js"></script>
</html>