
    Parse.initialize("T4lD84ZeLY7615h43jpGlVTG5cXZyXd8ceSGX29e", "KPVDbWy1zWbJD1WPG4HReba5urgHsPVJgh9wX5D1");

	 $(document).ready(function(){
    // the "href" attribute of .modal-trigger must specify the modal ID that wants to be triggered
    $('.modal-trigger').leanModal();
  });
	
	
	function logOut(username, password)
	{
		Parse.User.logOut();
		window.location="index.html";
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

