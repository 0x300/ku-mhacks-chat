<?php
/*
	Accepts URL as a parameter via POST
*/

	$URL = urlencode($_POST["url"]);
	$cookie_file_path = "cookies.txt";
	$ch = curl_init();
	  curl_setopt($ch, CURLOPT_URL, $URL);
	  curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
	  curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 0);
	  curl_setopt($ch, CURLOPT_COOKIEFILE, $cookie_file_path);
	  curl_setopt($ch, CURLOPT_COOKIEJAR, $cookie_file_path); 
	  $response = curl_exec($ch);
	  curl_close($ch);

	  echo $response; //return response
?>