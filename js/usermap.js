	$( document ).ready(function() {
		$("#openchat").on('click', function() { openWindow("chat.html",1024,768,this.blur(),false)});
	});

	Parse.initialize("T4lD84ZeLY7615h43jpGlVTG5cXZyXd8ceSGX29e", "KPVDbWy1zWbJD1WPG4HReba5urgHsPVJgh9wX5D1");
		
	var map;
	var circle;
	var markers = [];
	var latitude;
	var longitude;
	var currentUsername;
	var softSlider = document.getElementById('soft');
	var maxDistance;	
		
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
		  initMap();
		},
	   error: function(error) {
		 alert("Error: " + error.code + " " + error.message);
	   }
	});
		
		
	function initMap() {
		
	  map = new google.maps.Map(document.getElementById('map'), {
			center: {lat: 40.799361, lng: -77.862548},
			zoom: 16
	  }); 

	 circle = new google.maps.Circle({
		strokeColor: "#FF0000",
		strokeOpacity: 0.8,
		strokeWeight: 2,
		fillColor: "#FF0000",
		fillOpacity: 0.35,
		map: map,
		radius: 500
	  });
	  
	  

	Parse.User.current().fetch().then(
	  function (user) {
		 currentUsername = user.get('username');
		 latitude = user.get('location').latitude;
		 longitude= user.get('location').longitude;
		 distance= user.get('distance');
		 userGeoPoint = user.get("location");

		addUserMarker({lat: latitude, lng: longitude}, user.get('username'), user.get('status'), user.get('occupation'));

		switch (distance) {
			case 0:
				maxDistance = 50;
				break;
			case 1:
				maxDistance = 100;
				break;
			case 2:
				maxDistance = 250; 
				break;
			case 3:
				maxDistance = 350;
				break;
			case 4:
				maxDistance = 500;
				break;
			default:
				break;
		}	
				
		var q2 = new Parse.Query(Parse.User);
		q2.withinMiles('location',userGeoPoint,maxDistance);
		q2.find({
			success:function(items){
				$.each(items,function(i,item){
					var obj = JSON.parse(JSON.stringify(item));
						try{
							latitude = obj.location.latitude;
							longitude= obj.location.longitude;
						}
						catch(err)
						 {
							}
						if(obj.username === currentUsername)
							{
								}
						else{
						if(obj.status === false)
							{
							}
						else{
							addMatchesMarker({lat: latitude, lng: longitude}, obj.username, obj.status, obj.occupation, obj.email, 
							obj.interestList, obj.updatedAt);
						}
				}
		});
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
			icon: 'http://maps.google.com/mapfiles/ms/micons/red-dot.png',
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
		  '<div>'+
		  '<p><b><h6>Interests:' + interestList + '</h6></b><hr/>'+
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
			icon: 'http://maps.google.com/mapfiles/ms/micons/orange-dot.png',
			animation: google.maps.Animation.DROP,
			title: username,
		  });
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

	function openWindow(url,width,height,options,name) {
				width = width ? width : 800;
				height = height ? height : 600;
				options = options ? options : 'resizable=yes';
				name = name ? name : 'openWindow';
				window.open(
					url,
					name,
					'screenX='+(screen.width-width)/2+',screenY='+(screen.height-height)/2+',width='+width+',height='+height+','+options
				)
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
		} else if ( values[handle] > 100 && values[handle] < 250  ) {
			softSlider.noUiSlider.set(100);
		}else if ( values[handle] > 250 && values[handle] < 350  ) {
			softSlider.noUiSlider.set(250);
		}else if ( values[handle] > 350 && values[handle] < 500  ) {
			softSlider.noUiSlider.set(350);
		}else softSlider.noUiSlider.set(500);
		
		updateRadius(circle, values);
	});

	

	function updateRadius(circle, rad){
	  circle.setRadius(rad);
	}





		