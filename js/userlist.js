Parse.initialize("T4lD84ZeLY7615h43jpGlVTG5cXZyXd8ceSGX29e", "KPVDbWy1zWbJD1WPG4HReba5urgHsPVJgh9wX5D1");


var maxDistance;
var currentUsername;
var userGeoPoint;

var intList = [];
var interest = Parse.Object.extend("Interest");
var query2 = new Parse.Query(interest);
query2.find({
    success: function(results) {
       for (var i = 0; i < results.length; i++) { 
           var object = results[i];
               (function($) {
				   intList.push(object);
				   //alert(object.id);
               })(jQuery);
       }
	   userQuery();
	   search();
    },
    error: function(error) {
        alert("Error: " + error.code + " " + error.message);
    }
});


function search() 
{	
    // Write on keyup event of keyword input element
    $("#search").keyup(function(){
        _this = this;
        // Show only matching TR, hide rest of them
        $.each($("#results-table tbody").find("tr"), function() {
            console.log($(this).text());
            if($(this).text().toLowerCase().indexOf($(_this).val().toLowerCase()) == -1)
			{
               $(this).fadeOut();
			 }
            else{
                 $(this).show();  }              
        });
    }); 
}


function userQuery()
{

	Parse.User.current().fetch().then(
	  function (user) {
		 currentUsername = user.get("username");
		 userGeoPoint = user.get("location");
		 distance= user.get("distance");
		 
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
		 
		 var query = new Parse.Query(Parse.User);
		 query.notEqualTo("username", currentUsername);
		 query.withinKilometers("location",userGeoPoint,maxDistance);
		 query.equalTo("status", true);
		 query.find({
    		success: function(results) {
	   			$('#results-table').append("<tbody>");
       			for (var i = 0; i < results.length; i++) { 
					var object = results[i];
		   			var interestNames = [];
					for(var j = 0; j < intList.length; j++)
						{
						for(var k = 0; k < object.get('interestList').length; k++)
							{
							if(intList[j].id === object.get('interestList')[k])
								{
								interestNames.push(intList[j].get('interestName'));
								}
							}
						}
					var interestString = "<ul>";
			
					var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
					var date = new Date(object.get('updatedAt'));
					var time = formatAMPM(new Date(object.get('updatedAt')));
					var dateString = " " + time + "<br/>" + (monthNames[date.getMonth()]) + ' '+date.getDate() + ", " + date.getFullYear() + "";//prints expected format.
					for(var g = 1; g < interestNames.length; g++)
					{
						interestString += "<li>" + interestNames[g] + "</li>";
					}
					if(interestNames.length === 0)
					{
						interestString = "No interests selected";
					}
	
    	           (function($) {
        	           $('#results-table').append('<tr><td>' + object.get('username') + '</td><td>' + status + "</td><td>" + object.get('occupation') + '</td>' + '<td>' + interestString + '</ul></td><td>' + dateString + '</td></tr>');
            	   })(jQuery);
			
    	   	}
	   		$('#results-table').append("</tbody>");
	   		sorter(); 
    		},
    		error: function(error) {
        		alert("Error: " + error.code + " " + error.message);
    		}
	});
  });
	
}

function sorter()
{
	$(document).ready(function() 
    { 
        $("#results-table").tablesorter(); 
    } 
); 

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
