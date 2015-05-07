$(document).ready(function() {
	// TODO only do this if user is not "logged in"
	$('#login').modal('show') ;

	$('#submitName').click(function(){
		var name = $("#nameTextbox").val();
		if (name ) {
			$.post( "http://localhost:5000/register", {'name': name}, function( data ) {
				$('#login').modal('hide') ;				
			});        
		} else {
			alert("Please enter a username");
		}      
	});	
})
