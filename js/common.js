$(document).ready(function() {

  if ($.cookie("mp-hackathon-username")) {
    $("#username").text($.cookie("mp-hackathon-username")) ;
  }
});
