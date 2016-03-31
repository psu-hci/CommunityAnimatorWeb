/*	$( document ).ready(function() {
		$("#openchat").on('click', function() { openWindow("chat.html",1024,768,this.blur(),false)});
	});

*/
	Parse.initialize("T4lD84ZeLY7615h43jpGlVTG5cXZyXd8ceSGX29e", "KPVDbWy1zWbJD1WPG4HReba5urgHsPVJgh9wX5D1");
		
	var map;
	var circle;
	var markers = [];
	var latitude;
	var longitude;
	var currentUsername;
	var softSlider= document.getElementById('soft');;
	var maxDistance;
	var newRange = false;	
	var cookiename; 
	var userGeoPoint;
	var iniValue;
    //this variable represents the total number of popups can be displayed according to the viewport width
    var total_popups = 0;
           
    //arrays of popups ids
    var popups = [];
    
	//verify interest list
	var intList = [];
	var interest = Parse.Object.extend("Interest");
	var query2 = new Parse.Query(interest);
	query2.find({
		success: function(results) {
		for (var i = 0; i < results.length; i++) { 
			var object = results[i];
				(function($) {
					 intList.push(object);
				})(jQuery);
		}
		  initMap(0);
		},
	   error: function(error) {
		 alert("Error: " + error.code + " " + error.message);
	   }
	});
	
		
	function initMap(newDistance) {
	
	 map = new google.maps.Map(document.getElementById('map'), {
			//center: {lat: 40.799361, lng: -77.862548},
			zoom: 16
	  }); 
		

	Parse.User.current().fetch().then(
	  function (user) {
		 currentUsername = user.get("username");
		 latitude = user.get("location").latitude;
		 longitude= user.get("location").longitude;
		 userGeoPoint = user.get("location");
		 distance = user.get("distance");
		// if(newRange === false){
		//distance = user.get("distance");
		// } else distance = newDistance;
		
		updateStartValue(distance); //radius start value
		
	 circle = new google.maps.Circle({
		strokeColor: "#FF0000",
		strokeOpacity: 0.8,
		strokeWeight: 2,
		fillColor: "#FF0000",
		fillOpacity: 0.35,
		map: map,
		radius: iniValue // in meters
	  });
	  
		softSlider.noUiSlider.set(iniValue); //init slider

         
		addUserMarker({lat: latitude, lng: longitude}, user.get("username"), user.get("status"), user.get("occupation"));

		switch (distance) {
			case 0: //50 meters to km
				maxDistance = 0.05;
				break;
			case 1: //100 meters to km
				maxDistance = 0.1;
				break;
			case 2: //250  meters to km
				maxDistance = 0.25;
				break;
			case 3: //350 meters to km
				maxDistance = 0.35;
				break;
			case 4: //500 meters to km
				maxDistance = 0.5;
				break;
			default:
				break;
		}	
		
		var queryFriend = new Parse.Query(Parse.User);
		queryFriend.withinKilometers("location",userGeoPoint,maxDistance);
		queryFriend.equalTo("status", true);
		queryFriend.find({
			success:function(items){
		     for (var i = 0; i < items.length; i++) {
                var latitude = items[i].get("location").latitude;
                var longitude = items[i].get("location").longitude;
                addMatchesMarker({lat: latitude, lng: longitude}, items[i].get("username"), items[i].get("status"), items[i].get("occupation"), 
                items[i].get("email"), items[i].get("interestList"), items[i].get("updatedAt"));
             }
		 },
		 error: function(error) {
            alert("Error: " + error.code + " " + error.message);
        }
		});
		
		
	});
}	
		
	// Adds a marker to the map and push to the array.
	function addMatchesMarker(location, username, status, occupation, email, interestList, updatedAt) {
		  
		  var marker = new google.maps.Marker({
			position: location,
			map: map,
			animation: google.maps.Animation.DROP,
			icon: 'https://maps.google.com/mapfiles/ms/micons/green-dot.png',
			title: username
		  });
		  
		  var stat = "Animated";
		  if(status === false)
		  {
		     stat = "Busy";
		  }
		  
		  
		  var monthNames = ["January", "February", "March", "April", "May", "June",
			  "July", "August", "September", "October", "November", "December"
		  ];
		  date = new Date(updatedAt);
		  var time = formatAMPM(new Date(updatedAt));
		  var dateString = " " + time + ", <i>" + (monthNames[date.getMonth()]) + ' '+date.getDate() + ", " + date.getFullYear() + "</i>";//prints expected format.
		  
		  var contentString = '<div>'+
		  '<div>'+
		  '</div>'+
		  '<div>'+
		  '<p><b><h6>' + username + '</h6></b><hr/>'+
		  '<ul><li><b>Last Active:</b>' + dateString + "</li><li>" + stat + 
		  '</li><li>' + occupation + 
		  '</li></ul></div>'+
		  '<button onclick="register_popup(\''+ username +'\')">Open chat</button>'+
		  '</div>';

		 var infowindow = new google.maps.InfoWindow({
		   content: contentString
		 });
		  
		 marker.addListener('click', function() {
			infowindow.open(map, marker);
		 });
		  
		  markers.push(marker);
	}
		
	function addUserMarker(location, username, status, occupation) {
			
		var marker = new google.maps.Marker({
			position: location,
			map: map,
			icon: 'https://maps.google.com/mapfiles/ms/micons/blue-dot.png',
			animation: google.maps.Animation.DROP,
			title: username,
		  });
		  map.setCenter(location);
		  
		  
		  var stat = "Animated";
		  if(status === false)
		  {
			stat = "Busy";
		  }
		  
		  
		  var contentString = '<div id="content">'+
		  '<div id="siteNotice">'+
		  '</div>'+
		  '<div id="bodyContent">'+
		  '<p><b>' + 'My Location'+ '</b>' + 
		  '<hr/>' + stat + 
		  '</div>'+
		  '</div>';

		 var infowindow = new google.maps.InfoWindow({
			  content: contentString
		 });
		  
		 marker.addListener('click', function() {
			infowindow.open(map, marker);
		 });
		  
		 markers.push(marker);
		 circle.bindTo('center', marker, 'position');
	}

		// Sets the map on all markers in the array.
	function setMapOnAll(map) {
		  for (var i = 0; i < markers.length; i++) {
			markers[i].setMap(map);
		  }
	}

	// Removes the markers from the map, but keeps them in the array.
	function clearMarkers() {
		  setMapOnAll(null);
	}

	// Shows any markers currently in the array.
	function showMarkers() {
		  setMapOnAll(map);
	}

	// Deletes all markers in the array by removing references to them.
	function deleteMarkers() {
		  clearMarkers();
		  markers = [];
	}
	  
	function placeMarkerAndPanTo(latLng, map) {
	  deleteMarkers();
	  addMarker(latLng);
	  latitude = latLng.lat();	
	  longitude = latLng.lng();
	  map.panTo(latLng);
	}
	 
	 
	function formatAMPM(date) {
	  var hours = date.getUTCHours() - 5;
	  var minutes = date.getUTCMinutes();
	  
	  if(hours < 0)
	  {
		hours = 24 + hours;
	  }
	  
	  var ampm = hours >= 12 ? 'pm' : 'am';
	  hours = hours % 12;
	  hours = hours ? hours : 12; // the hour '0' should be '12'
	  minutes = minutes < 10 ? '0'+minutes : minutes;
	  var strTime = hours + ':' + minutes + ' ' + ampm;
	  return strTime;
	}


	var range_all_sliders = {
		'min': [ 50 ],
		'25%': [ 100 ],
		'50%': [ 250 ],
		'75%': [ 350 ],
		'max': [ 500 ]
	};

   
  noUiSlider.create(softSlider, {
		start: 50,
		range: range_all_sliders,
		pips: {
			mode: 'positions',
			values: [50,100, 250,350, 500 ],
			density: 4,
			stepped: true
		}
	});


	softSlider.noUiSlider.on('change', function ( values, handle ) {
		if ( values[handle] < 100 ) {
			softSlider.noUiSlider.set(50);
			initMap(0);
			updateRadius(circle, 50);
			saveNewDistance(0);
		} else if ( values[handle] > 100 && values[handle] < 250  ) {
			softSlider.noUiSlider.set(100);
			initMap(1);
			updateRadius(circle, 100);
			saveNewDistance(1);
		}else if ( values[handle] > 250 && values[handle] < 350  ) {
			softSlider.noUiSlider.set(250);
			initMap(2);
			updateRadius(circle, 250);
			saveNewDistance(2);
		}else if ( values[handle] > 350 && values[handle] < 500  ) {
			softSlider.noUiSlider.set(350);
			initMap(3);
			updateRadius(circle, 350);
			saveNewDistance(3);
		}else{
		 	softSlider.noUiSlider.set(500);
		 	initMap(4);
		 	updateRadius(circle, 500);
		 	saveNewDistance(4);
		 }
	});

	function updateRadius(circle, rad){
	  circle.setRadius(rad); //in meters
	}
	
	function saveNewDistance(newDistance){
	  
	  Parse.User.current().fetch().then(
	  function (user) {
	  	user.set("distance",newDistance);
	  	user.save();
	  });
	
	}
	
	function updateStartValue(distance){
	
	  switch (distance) {
			case 0: //50 meters to km
				iniValue = 50;
				break;
			case 1: //100 meters to km
				iniValue = 100;
				break;
			case 2: //250  meters to km
				iniValue = 250;
				break;
			case 3: //350 meters to km
				iniValue = 350;
				break;
			case 4: //500 meters to km
				iniValue = 500;
				break;
			default:
				break;
		}	
	
	}

////chat/////
//this function can remove a array element.
Array.remove = function(array, from, to) {
                var rest = array.slice((to || from) + 1 || array.length);
                array.length = from < 0 ? array.length + from : from;
                return array.push.apply(array, rest);
            };

//this is used to close a popup
function close_popup(id)
{
                for(var iii = 0; iii < popups.length; iii++)
                {
                    if(id == popups[iii])
                    {
                        Array.remove(popups, iii);
                       
                        document.getElementById(id).style.display = "none";
                       
                        calculate_popups();
                       
                        return;
                    }
                }  
            }
       
//displays the popups. Displays based on the maximum number of popups that can be displayed on the current viewport width
function display_popups()
{
                var right = 220;
               
                var iii = 0;
                for(iii; iii < total_popups; iii++)
                {
                    if(popups[iii] != undefined)
                    {
                        var element = document.getElementById(popups[iii]);
                        element.style.right = right + "px";
                        right = right + 320;
                        element.style.display = "block";
                    }
                }
               
               var jjj = iii;
                for(var jjj; jjj < popups.length; jjj++)
                {
                    var element = document.getElementById(popups[jjj]);
                    element.style.display = "none";
                }
            }
          
//creates markup for a new popup. Adds the id to popups array.
function register_popup(name)
{
               
    for(var iii = 0; iii < popups.length; iii++)
    {  
        //already registered. Bring it to front.
         if(id == popups[iii])
             {
              Array.remove(popups, iii);
                   
             popups.unshift(id);
                       
             calculate_popups();
   
               return;
                }
        }              
               
    var element = '<div class="popup-box chat-popup" id="'+ name +'">';
    element = element + '<div class="popup-head">';
    element = element + '<div class="popup-head-left">'+ name +'</div>';
    element = element + '<div class="popup-head-right"><a href="javascript:close_popup(\''+ name +'\');">&#10005;</a></div>';
    element = element + '<div style="clear: both"></div></div><div class="popup-messages"></div></div>';
               
    document.getElementsByTagName("body")[0].innerHTML = document.getElementsByTagName("body")[0].innerHTML + element; 
       
    popups.unshift(name);
                       
    calculate_popups();
               
}
           
//calculate the total number of popups suitable and then populate the toatal_popups variable.
function calculate_popups()
{
                var width = window.innerWidth;
                if(width < 540)
                {
                    total_popups = 0;
                }
                else
                {
                    width = width - 200;
                    //320 is width of a single popup box
                    total_popups = parseInt(width/320);
                }
               
                display_popups();
               
            }
           
//recalculate when window is loaded and also when window is resized.
window.addEventListener("resize", calculate_popups);
window.addEventListener("load", calculate_popups);	
	
	
	




		