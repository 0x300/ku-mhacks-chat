<?php
/*
	Accepts URL as a parameter via POST
*/


	$cookie_file_path = "cookies.txt";
	$ch = curl_init();
	  curl_setopt($ch, CURLOPT_URL, "https://jweb.kettering.edu/cku1/bwskfshd.P_CrseSchdDetl?term_in=201403");
	  curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
	  curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 0);
	  curl_setopt($ch, CURLOPT_COOKIEFILE, $cookie_file_path);
	  curl_setopt($ch, CURLOPT_COOKIEJAR, $cookie_file_path); 
	  $response = curl_exec($ch);
	  curl_close($ch);

	  echo $response; //return response
?>