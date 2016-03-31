<?php

	$mytoken = $_GET["access_token"];

	setCookie("token", $mytoken, time() + 3600); // cookie will expire in 1 hour
	
	
	if(isset($_COOKIE["token"])) {
 
	   echo "Group Me is set!";
	   //echo "Value is: " . $_COOKIE["token"];
	}
?>

