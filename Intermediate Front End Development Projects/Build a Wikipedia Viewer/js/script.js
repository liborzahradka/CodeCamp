$(function() {
  var input = $("#search-input");
  var results = $('.results');

  input.keypress(function(event) {
    var search = $(this).val();

    if (event.which == 13) {

      event.preventDefault();
      results.fadeOut(250).empty().fadeIn(250);
      getData(search);
    }
  });

  $(document).click(function(){
    input.val("");
  });
});

function getData(search){
  $.ajax({
    url: "https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=" + search,
    dataType: "jsonp",
    success: function(data){
      $.each(data.query.pages, function(k, v) {
        $('.results').append(
          "<div class='link'>" +
          "<a href='https://wikipedia.org/wiki/" + v.title + "' target= '_blank'>" +
          "<h3>" + v.title + "</h3></a>" +
          "<p = class='extract'>" + v.extract + "</p></div>");
      });
    }
  });
}
