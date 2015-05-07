$(document).ready(function() {

  // registration flow
  if (document.cookie.indexOf("mp-hackathon-user") < 0) {
    $('#mainContainer').hide();
    $('#login').modal('show') ;

    $('#submitName').click(function(){
      var name = $("#nameTextbox").val();
      if (name ) {
        $.post( "/api/register", {'name': name}, function( data ) {
          $('#login').modal('hide');
        });
        $('#mainContainer').show();
        getNextItem();
      } else {
        alert("Please enter a username");
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
          // handle 404
          $('#mainContainer').hide();
          alert("No more items available, thanks for playing :)");
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
