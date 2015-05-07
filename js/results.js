$(document).ready(function() {

	var row = "<tr class=\"${success}\">
				<td><img class=\"img-responsive img-rounded img-results\" src=\"${img_url}\"></td>
				<td>${title}</td>
	            <td>€ ${guess}</td>
	            <td><div class=\"progress\"><div class=\"progress-bar progress-bar-info progress-bar-striped\" style=\"width: ${perc_completed}%\"/></div></td>
      		</tr>";

	var userId = $.cookie("mp-hackathon-userid");      		

    $.get("/api/result/" + userId, function(data) {
    	var items = data.items;
    	items.each(function() {

    		// create new HTML element for row
    		var item = $(this);
    		var html = row.replace("${img_url}", item.img);
    		html = html.replace("${title}", item.title);
    		html = html.replace("${guess}", item.guess);
    		var percent = item.numResults <= 100 ? item.numResults : 100;
    		html = html.replace("${perc_completed}", percent);
    		var successClass = item.numResults >= 100 ? "success" : "";
    		html = html.replace("${success}", successClass);
    		// append to list
    		$("#resultsBody").append(html);
    	});
    });  		


});