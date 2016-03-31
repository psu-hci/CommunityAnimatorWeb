$( document ).ready(function() {
		$("#openchat").on('click', function() { openWindow("chat.html",1024,768,this.blur(),false)});
});


    var token = 0;
    
    Parse.initialize("T4lD84ZeLY7615h43jpGlVTG5cXZyXd8ceSGX29e", "KPVDbWy1zWbJD1WPG4HReba5urgHsPVJgh9wX5D1");
    var tbl = "<br/><center><table class = 'striped'><th><center>Icon<center></th><th><center>Username</center></th><th><center>Status</center></th>";
	var intTbl = "<br/><center><table border = 1 class = 'striped'><th>Interests</th>"
	update();
	token = readCookie('token');

	Parse.User.current().fetch().then(function (user) {
    document.getElementById("welcome").innerHTML = "<center><h2>Welcome " + user.get('username') + "!</h2></center>";
	
	if(token !== 0){
		Parse.User.current().set("AccessToken",token);
		Parse.User.current().save();
		
		getUser(token);
	}
	
	if(Parse.User.current().get('status') === false)
		{
	
		document.getElementById('switch1').checked = false;
		}
		else
		{
		 document.getElementById('switch1').checked = true;		
		}
	
	
	var q2 = new Parse.Query(Parse.User);
	q2.find({success:function(items){
	
	$.each(items,function(i,item){
		var obj = JSON.parse(JSON.stringify(item));
		var anim  = "Busy";
		if(obj.status === true)
		{
		 anim = "Animated";
		}
		tbl += "<tr><td><center><img src = 'images/user.png' width = '50' height = '50'/></center></td><td><center>" + obj.username + "</center></td><td><center> " + anim + " </center></td></tr>";
		
		});
	}});
	
	var q3 = new Parse.Query(Parse.Object.extend("Interest"));
	q3.find({success:function(items){
	
	$.each(items,function(i,item){
		var obj = JSON.parse(JSON.stringify(item));
		intTbl += "<tr><td> " + obj.interestName + " </td></tr>";
		});
	}});
	});
	
	function displayUsers()
	{
		tbl = tbl + "</table></center>";
		document.getElementById("users").innerHTML = tbl;
	}
	
	function displayInterests()
	{
		intTbl = intTbl + "</table></center>";
		document.getElementById("interests").innerHTML = intTbl;
	}
	
	function updateStatus()
	{
		if(Parse.User.current().get('status') === false)
		{
		var currentUser = Parse.User.current();
		currentUser.set('status', true);
		return currentUser.save();
		}
		else
		{
		var currentUser = Parse.User.current();
		currentUser.set('status', false);
		return currentUser.save();
		}
		
	}
	
	function update()
	{
		var currentUser = Parse.User.current();
		return currentUser.save();
	}
	
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
	//document.write("n" + readCookie('token'));
	
	
	
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
    
    	var user_id = jsonObj.response.id;
	    var phone = jsonObj.response.phone_number;
	  	var image = jsonObj.response.image_url;
	  	var name = jsonObj.response.name;
	  
	  	//console.log(user_id);
	  	//console.log(name);
	  
	 	Parse.User.current().set("GP_user_id",user_id);
	  	Parse.User.current().set("GP_phone",phone);
	  	Parse.User.current().set("GP_image",image);
	  	Parse.User.current().set("GP_username",name);
	  	Parse.User.current().save();
	  
 	  //console.log(JSON.stringify(jsonObj));
	}

	
