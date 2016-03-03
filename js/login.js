
$( document ).ready(function() {
   $("#submitLogin").bind('click', function() { login(document.getElementById('username').value, document.getElementById('password').value)}) 
   $("#sendemail").on('click', function() { send(document.getElementById('email').value)});
});


$('.modal-trigger').leanModal({
      dismissible: true, // Modal can be dismissed by clicking outside of the modal
      opacity: .5, // Opacity of modal background
      in_duration: 300, // Transition in duration
      out_duration: 200 // Transition out duration
    }
  );

Parse.initialize("T4lD84ZeLY7615h43jpGlVTG5cXZyXd8ceSGX29e", "KPVDbWy1zWbJD1WPG4HReba5urgHsPVJgh9wX5D1");
	
var val = sessionStorage.user;
	
//alert(user);

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

function send(email){

        Parse.User.requestPasswordReset(email , {
            success: function () {
                Materialize.toast("Reset instructions emailed to you.");

            },
            error: function (error) {
               Materialize.toast("Error: " + error.message, 4000)
            }
        });

}