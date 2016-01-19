
    Parse.initialize("T4lD84ZeLY7615h43jpGlVTG5cXZyXd8ceSGX29e", "KPVDbWy1zWbJD1WPG4HReba5urgHsPVJgh9wX5D1");
	
	var val = sessionStorage.user;
	
	alert(user);

	function login(username, password)
	{
	Parse.User.logIn(username, password, {
	  success: function(user) {
		window.location="main.html";
	  },
	  error: function(user, error) {
		Materialize.toast("Username or password incorrect, please try again", 4000) // 4000 is the duration of the toast
	  }
	});
	}

