$('#modal1').openModal({
          dismissible: false, // Modal can be dismissed by clicking outside of the modal
          opacity: .5, // Opacity of modal background
          in_duration: 300, // Transition in duration
          out_duration: 200
});

$( document ).ready(function() {
   $("#submit").bind('click', function() { createUser(document.getElementById('username').value, document.getElementById('password').value, 
   document.getElementById('email').value, document.getElementById('gender').value, document.getElementById('datebirth').value, document.getElementById('occupation').value) }) 
});

$('.datepicker').pickadate({
    selectMonths: true, // Creates a dropdown to control month
    selectYears: 15 // Creates a dropdown of 15 years to control year		
});

$( document ).ready(function() {
   $("#btndisagree").on('click', function() {
        window.location="index.html";
    }); 
});


var latitude;
var longitude;
var interestList = [];
Parse.initialize("T4lD84ZeLY7615h43jpGlVTG5cXZyXd8ceSGX29e", "KPVDbWy1zWbJD1WPG4HReba5urgHsPVJgh9wX5D1");

function createUser(username, password, email, gender, datebirth, occupation)
{
    createInterestList();
    var user = new Parse.User();
    user.set("username", username);
    user.set("password", password);
    user.set("email", email);
    user.set("gender", gender)
    user.set("dateBirth", datebirth);
    user.set("distance", 0);
    user.set("occupation", occupation);
    user.set("chatting", false);
    user.set("image", false);
    user.set("reminder", true);
    user.set("status", true);	
    user.set("view", true);
    user.set("taskList", ["HJQNYCjCVh","V3EMgSnf5n","m5VJwIOHGO"])
    user.set("interestList", interestList);
    user.set("location", new Parse.GeoPoint({latitude: latitude, longitude: longitude}));

    sessionStorage.user = username;

    user.signUp(null, {
        success: function(user) {
            Materialize.toast("Account created successfully!", 4000) // 4000 is the duration of the toast
                login(username, password);
           
        },
        error: function(user, error) {
            // Show the error message somewhere and let the user try again.
            Materialize.toast("Error: " + error.message, 4000) // 4000 is the duration of the toast
        }
    });
}


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

function createInterestList()
{
    while (interestList.length) { interestList.pop(); }

    if(document.getElementById('ag').checked)
    {
        interestList.push("ZfQBlXqdg8");
    }
    if(document.getElementById('arts').checked)
    {
        interestList.push("YmhEi4uo2m");
    }
    if(document.getElementById('built').checked)
    {
        interestList.push("BnXWg7k1P4");
    }
    if(document.getElementById('bus').checked)
    {
        interestList.push("fa3Nx3F2uW");
    }
    if(document.getElementById('civ').checked)
    {
        interestList.push("eJJEe8k6Js");
    }
    if(document.getElementById('comm').checked)
    {
        interestList.push("UpM7ijuW8p");
    }
    if(document.getElementById('comm').checked)
    {
        interestList.push("UpM7ijuW8p");
    }
    if(document.getElementById('commev').checked)
    {
        interestList.push("DvLdrPN5da");
    }
    if(document.getElementById('commgroup').checked)
    {
        interestList.push("zVT0JZoTZq");
    }
    if(document.getElementById('commproj').checked)
    {
        interestList.push("zVT0JZoTZq");
    }
    if(document.getElementById('edu').checked)
    {
        interestList.push("N29x8Xbz4j");
    }
    if(document.getElementById('energy').checked)
    {
        interestList.push("c36TgxZXkZ");
    }
    if(document.getElementById('ent').checked)
    {
        interestList.push("jK4eMH6xdu");
    }
    if(document.getElementById('health').checked)
    {
        interestList.push("mdqSCiZg2f");
    }
    if(document.getElementById('nature').checked)
    {
        interestList.push("cC4OJ1BIfr");
    }
    if(document.getElementById('politics').checked)
    {
        interestList.push("EW5PZBF614");
    }
    if(document.getElementById('rec').checked)
    {
        interestList.push("2O6bxbvA5N");
    }
    if(document.getElementById('tech').checked)
    {
        interestList.push("qlnPM8vFem");
    }
    if(document.getElementById('trans').checked)
    {
        interestList.push("nDvaQM1G1Q");
    }

}


function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 40.799361, lng: -77.862548},
    zoom: 16
  });
  
  var contentString = 'You are HERE!';
  
  var infowindow = new google.maps.InfoWindow({
    content: contentString
  });

  var marker = new google.maps.Marker({map: map});
  
  marker.addListener('click', function() {
         infowindow.open(map, marker);
         
       });
  
  // Try HTML5 geolocation.
  if (navigator.geolocation) {
     
     navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      marker.setPosition(pos);
      map.setCenter(pos);
      
      latitude = position.coords.latitude;	
      longitude = position.coords.longitude;
      
    }, function() {
      handleLocationError(true, infowindow, map.getCenter());
    });
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infowindow, map.getCenter());
  }
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ?
                        'Error: The Geolocation service failed.' :
                        'Error: Your browser doesn\'t support geolocation.');
}




