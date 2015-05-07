$(document).ready(function() {

    if (document.cookie.indexOf("mp-hackathon-user") < 0) {
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
	}
	
});
