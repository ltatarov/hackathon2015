$(document).ready(function() {

  $('#guess-form').submit(function() {
    return false;
  });

  $('#login-form').submit(function() {
    return false;
  });

  // registration flow
  if (! $.cookie("mp-hackathon-userid")) {
    $('#header').hide();
    $('#main').hide();
    $('#login').modal('show') ;

    $('#submitName').click(function(){
      var name = $("#nameTextbox").val();
      if (name ) {
        $.post( "/api/register", {'name': name}, function( data ) {
          $('#login').modal('hide');
        });
        $('#header').show();
        $('#main').show();
        $("#username").text(name) ;
        getNextItem();
      } else {
        window.location.href = "done.html"
      }
    });
  } else {
    getNextItem();
  }

  function getNextItem() {
    $.ajax({
      type: 'GET',
      url: '/api/item',
      success: function(data){
        $("#image").attr("src", data.photo);
        $("#title").text(data.title);
        $("#description").text(data.description);
        $("#itemId").val(data.id);
        $("#answerText").val("");
      },
      statusCode: {
        404: function() {
          window.location.href = "done.html"
        }
      }
    });

  }

  $("#submitAnswer").click(function() {
    var answer = $("#answerText").val();
    console.log(answer);
    if (answer && !isNaN(answer)) {
      $.post("/api/answer", {"id": $("#itemId").val(), "price": answer});
      getNextItem();
    } else {
      alert("please enter a guess (or skip)");
    }
  });

  $("#skipItem").click(function() {
    getNextItem();
  });

});
