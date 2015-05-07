$(document).ready(function() {

  if ($.cookie("mp-hackathon-username") !== undefined) {
    $("#username").text($.cookie("mp-hackathon-username")) ;
  }
});
