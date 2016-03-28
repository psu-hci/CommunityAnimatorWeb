<?php

	$mytoken = $_GET["access_token"];

	setCookie("token", $mytoken, time() + 3600); // cookie will expire in 1 hour
	
	
	if(!isset($_COOKIE["token"])) {
    	echo "Cookie token '" . $mytoken . "' is not set!";
	} else {
	    echo "Cookie '" . $mytoken . "' is set!<br>";
	    echo "Value is: " . $_COOKIE["token"];
	}
?>

