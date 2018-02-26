function random_rgba(opacity) {
    var o = Math.round, r = Math.random, s = 255;
    return 'rgba(' + o(r()*s) + ',' + o(r()*s) + ',' + o(r()*s) + ',' + opacity + ')';
}

function set_content(){
  var gradient = 'linear-gradient('+ random_rgba(0.6) +', '+ random_rgba(0.6) +')';
  $(".holder").animate({opacity: 0.6}, 250,function(){
    $(this).css("background", gradient).animate({opacity: 1}, 250);
  });
  $(".quote").css("background", gradient);

  $.ajax({
    url: "https://andruxnet-random-famous-quotes.p.mashape.com?cat=famous&count=1",
    dataType: "json",
    headers: {
      'X-Mashape-Key': 'bYrTim50h3mshdH5jBjW02HzmEp2p16rCTIjsnH2nlgkNHGLfP',
      'Accept': 'application/json'
    },
    success: function(data){
      $('.quote').fadeIn(250);
      var author = data.author.split(" ");
      var content = $('.content');
      content.fadeOut(250, function(){
        content.html('<p id="header">QUOTES ABOUT<br><b>LIFE</b></p><p id="text"><span id="symb">“</span>'+ data.quote +'<span id="symb">”</span></p> <p id="author">'+ author[0] +'<br><b>'+ (author[1] ? author[1] : "") +'</b></p>');
        content.fadeIn(250);
      });
    }
  });
}

$(function(){
  set_content();
  setInterval(function(){ set_content()}, 8600);
});
