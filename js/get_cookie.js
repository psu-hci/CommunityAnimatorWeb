

	function readCookie(token) {
		var cookiename = token + "=";
		var ca = document.cookie.split(';');
		for(var i=0;i < ca.length;i++)
		{
			var c = ca[i];
			while (c.charAt(0)==' ') c = c.substring(1,c.length);
			if (c.indexOf(cookiename) == 0) return c.substring(cookiename.length,c.length);
		}
		return null;
	}
	document.write("n" + readCookie('token'));
	
	
	
	function getUser(token)
	{
	 
  		$.ajax(
  			{
        	url: "https://api.groupme.com/v3/users/me?token="+readCookie('token'),
        	type: 'GET'
    	}).done( function(data) {
       		retrievedData = data;
       		outputData();
    	});

	}
	
	function outputData()
	{
	  var jsonObj = retrievedData;

 	  console.log(JSON.stringify(jsonObj));
	}
