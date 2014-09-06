
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
  
    <?php
/*
This script is an example of using curl in php to log into on one page and 
then get another page passing all cookies from the first page along with you.
If this script was a bit more advanced it might trick the server into 
thinking its netscape and even pass a fake referer, yo look like it surfed 
from a local page.
*/

$ch = curl_init();
curl_setopt($ch, CURLOPT_COOKIEJAR, "/tmp/cookieFileName");
curl_setopt($ch, CURLOPT_URL,"http://jweb.kettering.edu/cku1/twbkwbis.P_ValLogin");

ob_start();      // prevent any output
curl_exec ($ch); // execute the curl command
ob_end_clean();  // stop preventing output

curl_close ($ch);
unset($ch);

$ch = curl_init();
curl_setopt($ch, CURLOPT_RETURNTRANSFER,1);
curl_setopt($ch, CURLOPT_COOKIEFILE, "/tmp/cookieFileName");
curl_setopt($ch, CURLOPT_URL,"http://jweb.kettering.edu/cku1/twbkwbis.P_ValLogin");
curl_setopt($ch, CURLOPT_POSTFIELDS, "sid=holl4332&PIN=21797721");

$buf2 = curl_exec ($ch);

curl_close ($ch);

echo $buf2;
?>
  </body>
  <script src="chat.js"></script>
</html>