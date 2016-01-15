
	Parse.initialize("T4lD84ZeLY7615h43jpGlVTG5cXZyXd8ceSGX29e", "KPVDbWy1zWbJD1WPG4HReba5urgHsPVJgh9wX5D1");
	
	var map;
	var markers = [];
	var latitude;
	var longitude;
	
	
	function initMap() {
		map = new google.maps.Map(document.getElementById('map'), {
		center: {lat: 40.799361, lng: -77.862548},
		zoom: 16,
		//mapTypeId: google.maps.MapTypeId.HYBRID
	});
  
		Parse.User.current().fetch().then(function (user) {
		latitude = user.get('location').latitude;
		longitude= user.get('location').longitude;
		addOldMarker({lat: latitude, lng: longitude});
		map.panTo({lat: latitude, lng: longitude});
		});
		
		map.addListener('click', function(e) {
		placeMarkerAndPanTo(e.latLng, map);
	});
  
   // This event listener will call addMarker() when the map is clicked.
	map.addListener('click', function(event) {
    addMarker(event.latLng);
  });
  
  // Adds a marker to the map and push to the array.
	function addMarker(location) {
	  var marker = new google.maps.Marker({
		position: location,
		map: map,
		icon: 'http://maps.google.com/mapfiles/ms/micons/orange-dot.png',
	  });
	  markers.push(marker);
	}
	
	  // Adds a marker to the map and push to the array.
	function addOldMarker(location) {
	  var marker = new google.maps.Marker({
		position: location,
		map: map,
		animation: google.maps.Animation.DROP,
		icon: 'http://maps.google.com/mapfiles/ms/micons/orange-dot.png',
		title:"Previous Location"
	  });
	  markers.push(marker);
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
}
	function updateLocation(){
		
		var user = Parse.User.current();
		Materialize.toast("Location Updated!", 4000) // 4000 is the duration of the toast
		user.set("location", new Parse.GeoPoint({latitude: latitude, longitude: longitude}));
		return user.save();
		
	}
   