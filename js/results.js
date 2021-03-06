$(document).ready(function() {

	var progress = '<div class="progress"><div class="progress-bar progress-bar-info progress-bar-striped" style="width: {perc_completed}%"/></div></div>';
	var row = '<tr class="{success}"> <td><img class="img-responsive img-rounded img-results" src="{img_url}"></td> <td>{title}</td> <td>€ {guess}</td> <td>{progress}</td> </tr>';

	var userId = $.cookie("mp-hackathon-userid");

	var expectedNumberOfVotes = 100;
	var maxDeviation = 5.0;

	$.get("/api/results/" + userId, function(data) {
		// TODO edge case - no results yet!

		$.each(data.items, function(key, item) {
			// create new HTML element for row
			var html = row.replace(/{img_url}/g, item.photo);
			html = html.replace(/{title}/g, item.title);
			html = html.replace(/{guess}/g, item.guess);

			var percent = Math.round(item.numResults / expectedNumberOfVotes * 100) ;

			if (percent >= 100) {
				html = html.replace(/{progress}/g, "€ " + item.avg)
				var deviation = Math.abs(item.guess - item.avg) / item.avg * 100;
				var successClass = deviation <= maxDeviation ? "success" : "";
				html = html.replace(/{success}/g, successClass);
			} else {
				var completion = progress.replace(/{perc_completed}/g, percent)
				html = html.replace(/{progress}/g, completion);
			}

			// append to list
			$("#resultsBody").append(html);
		});
	});
});
