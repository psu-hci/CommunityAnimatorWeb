
    Parse.initialize("T4lD84ZeLY7615h43jpGlVTG5cXZyXd8ceSGX29e", "KPVDbWy1zWbJD1WPG4HReba5urgHsPVJgh9wX5D1");
    var tbl = "<br/><center><table class = 'striped'><th><center>Icon<center></th><th><center>Username</center></th><th><center>Status</center></th>";
	var intTbl = "<br/><center><table border = 1 class = 'striped'><th>Interests</th>"
	update();

	Parse.User.current().fetch().then(function (user) {
    document.getElementById("welcome").innerHTML = "<center><h2>Welcome " + user.get('username') + "!</h2></center>";
	
	//alert(Parse.User.current().get('status'));
	if(Parse.User.current().get('status') === false)
		{
		//alert("it works/false");
		document.getElementById('switch1').checked = false;
		}
		else
		{
		//alert("it works/true");
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
		//alert(obj.username);
		});
	}});
	
	var q3 = new Parse.Query(Parse.Object.extend("Interest"));
	q3.find({success:function(items){
	
	$.each(items,function(i,item){
		var obj = JSON.parse(JSON.stringify(item));
		intTbl += "<tr><td> " + obj.interestName + " </td></tr>";
		//alert(obj.username);
		});
	}});
	});
	
	function displayUsers()
	{
		tbl = tbl + "</table></center>";
		//alert(tbl);
		document.getElementById("users").innerHTML = tbl;
	}
	
	function displayInterests()
	{
		intTbl = intTbl + "</table></center>";
		//alert(tbl);
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
	
