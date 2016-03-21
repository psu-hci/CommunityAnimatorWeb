$( document ).ready(function() {
   $("#send").bind('click', function() { sendEmail(document.getElementById('email').value, document.getElementById('subject').value, 
   document.getElementById('message').value, document.getElementById('name').value) }) 
});

//var key = new mandrill.Mandrill('');

function sendEmail( email, subject, message, name)
{
  $.ajax({
  	type: 'POST',
  	url: 'https://mandrillapp.com/api/1.0/messages/send.json',
  	data: {
    	key: '72f331ecdd33f56bf69221270623d116-us13',
    	message: {
    		text: message,
    		subject: subject,
      		from_email: email,
      		from_name: name,
      		to: [
        		  {
            		email: 'hci@ist.psu.edu',
            		name: 'HCI Lab',
            		type: 'text'
          		},
          		{
            		email: 'jessk@psu.edu',
            		name: 'Dr. Jess Kropczynski',
            		type: 'text'
         	 	}
        		],
      	autotext: true
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
        });
}