function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(getWeatherData);
    } else {
        $('body').html('<p id="error">Geolocation is not supported by this browser.</p>');
    }
}

function getWeatherData(position) {
  var location = $('.location');
  var currently = $('.currently');
  var forecast = $('.forecast');
  var days = ['SUN','MON','TUE','WEN','THUR','FRI','SAT'];

  $.getJSON("https://maps.googleapis.com/maps/api/geocode/json?latlng="+ position.coords.latitude +","+ position.coords.longitude +"&sensor=true&key=AIzaSyBkvLzyO8xd1VeEKLVU1Gfcx5GeWX0-BvM", function(data){
    var date = new Date();
    location.html('<p><span id="name">'+ data.results[0].address_components[2].long_name +'</span>'+
                  '<br><span id="date">'+ days[date.getDay()] +', '+ date.toLocaleTimeString('en-US', {hour: 'numeric'}) +'</span></p>');

    $.ajax({
      url: "https://api.darksky.net/forecast/5ee811451a7f5b743f687e1228288527/"+ position.coords.latitude +","+ position.coords.longitude +"?exclude=minutely,hourly,alert,flags",
      dataType: "jsonp",
      success: function(data){
        currently.html('<img src="images/'+ data.currently.icon +'.png" alt="'+ data.currently.summary +'">'+
                       '<span id="degrees">'+ +(data.currently.temperature).toFixed() +'</span>');

        // currently.html('<canvas id="'+ data.currently.icon +'-current" data-icon="'+ data.currently.icon +'" width="200" height="200"></canvas>'+
        //                '<span id="degrees">'+ +(data.currently.temperature).toFixed() +'</span>');

        var daily = data.daily.data.slice(1,5);
        $.each(daily, function(k, v){
          var date = new Date(v.time * 1000);
          forecast.append('<div class="daily">'+
                          '<span id="day">'+ days[date.getDay()] +'</span>'+
                          '<canvas id="'+ v.icon +'-'+ k +'" data-icon="'+ v.icon +'" width="35" height="35"></canvas>'+
                          '<span id="degrees">'+ v.temperatureHigh.toFixed() +'° / '+ v.temperatureLow.toFixed() +'°</span></div>');
        });

        $('canvas').each(function(){
          var daily_icons = new Skycons({"color": "#9f9f9f"});
          var icon = $(this).data('icon').toUpperCase().replace(/-/g,"_");
          var id = $(this).attr('id');
          daily_icons.add(id, window["Skycons"][icon]);
          daily_icons.play();
        });

        $('.loader').fadeOut(500, function(){
          $('.location, .currently, .forecast').fadeIn(500);
        });
      }
    });
  }).fail(function(){
    $('.holder').html('<p class="error">Something went wrong. Couldn\'t get your location.<br>Try to refresh the page.</p>');
  });
}

$(function(){
  getLocation();
});
