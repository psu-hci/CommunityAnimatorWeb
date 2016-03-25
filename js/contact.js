//$( document ).ready(function() {
//   $("#send").bind('click', function() { sendEmail(document.getElementById('email').value, document.getElementById('subject').value, 
//   document.getElementById('message').value, document.getElementById('name').value) }) 
//});

//var m = new mandrill.Mandrill("72f331ecdd33f56bf69221270623d116-us13");

//function sendEmail( email, subject, message, name)
//{
/*  $.ajax({
  	type: 'POST',
  	url: 'mandrillapp.com/api/1.0/messages/send.json',
  	data: {
    	'key': '72f331ecdd33f56bf69221270623d116-us13',
    	'message': {
    		'text': 'message',
    		'subject': 'subject',
      		'from_email': 'email',
      		'from_name': 'name',
      		'to': [
        		  {
            		'email': 'hci@ist.psu.edu',
            		'name': 'HCI Lab',
            		'type': 'to'
          		},
          		{
            		'email': 'jessk@psu.edu',
            		'name': 'Dr. Jess Kropczynski',
            		'type': 'text'
         	 	}
        		],
      	'autotext': 'true'
    	}
  	}
 	}).done(function (error, response) {
            if (error) {
                console.log(JSON.stringify(error));
                return error;
            }
            else {
                console.log("Mandrill result: "+response);
                callback(null, response);
            }
        });*/
//}
$( document ).ready(function() {
	// Validate the contact form
  $('#contactform').validate({
  	// Specify what the errors should look like
  	// when they are dynamically added to the form
  	errorElement: "label",
  	wrapper: "td",
  	errorPlacement: function(error, element) {
  		error.insertBefore( element.parent().parent() );
  		error.wrap("<tr class='error'></tr>");
  		$("<td></td>").insertBefore(error);
  	},
  	
  	// Add requirements to each of the fields
  	rules: {
  		name: {
  			required: true,
  			minlength: 2
  		},
  		email: {
  			required: true,
  			email: true
  		},
  		message: {
  			required: true,
  			minlength: 10
  		}
  	},
  	
  	// Specify what error messages to display
  	// when the user does something horrid
  	messages: {
  		name: {
  			required: "Please enter your name.",
  			minlength: jQuery.format("At least {0} characters required.")
  		},
  		email: {
  			required: "Please enter your email.",
  			email: "Please enter a valid email."
  		},
  		message: {
  			required: "Please enter a message.",
  			minlength: jQuery.format("At least {0} characters required.")
  		}
  	},
  	
  	// Use Ajax to send everything to processForm.php
  	submitHandler: function(form) {
  		$("#send").attr("value", "Sending...");
  		$(form).ajaxSubmit({
  			success: function(responseText, statusText, xhr, $form) {
  				$(form).slideUp("fast");
  				$("#response").html(responseText).hide().slideDown("fast");
  			}
  		});
  		return false;
  	}
  });
});
