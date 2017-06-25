$(document).ready(function(){
 getLocationFn();
});

function getLocationFn(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(getCoordsFn);
    }else{
        $("#weatherContainer").html("<h3 class='red-text text-darken-2'>Sorry your browser does not support geo location.</h3>");
    }
}

function getCoordsFn(position){
    var lati = position.coords.latitude;
    var longi = position.coords.longitude;
    getWeatherFn(lati,longi);
    console.log(lati + " " + longi);
}


function getWeatherFn(la,lo) {
    $.ajax({

        url: "https://simple-weather.p.mashape.com/weatherdata?lat="+la+"&lng="+lo+"", // The URL to the API.
        type: 'GET',
        //data: {}, // Additional parameters here

        dataType: 'json',
        success: function(data) {
        var city = data.query.results.channel.location.city;
        var country = data.query.results.channel.location.country;
        var region = data.query.results.channel.location.region;
        var condition = data.query.results.channel.item.condition.text;
        var tempType = data.query.results.channel.units.temperature;
        var temp = data.query.results.channel.item.condition.temp + "&#176; "+ tempType;
        var imgIcon = getWeatherIcon(condition);
        var currentFetchDate = data.query.results.channel.lastBuildDate;

        console.log(condition);
        console.log(temp);
           $("#weatherContainer").html("<h4 class='red-text text-lighten-2 center-align'>"+ city + ", " + region + ", "+ country + "</h4>");
           $("#weatherIcon").html("<img class='weatherImg responsive-img right' alt='"+ condition +"' src='"+ imgIcon +"'>");
           $("#currentDayCondition").html(condition);
           $("#currentDayTemp").html(temp);
           $("#currentFetchDate").html(currentFetchDate);
           // $("#weatherContainer").html("<h5 class='flow-text blue-text text-darken-4'>- " + dta + "</h5>");

        },
        error: function(err) {
            console.log(err);
        },
        beforeSend: function(xhr) {
            xhr.setRequestHeader("X-Mashape-Authorization", "li7CFnVytCmshu5vqwd6FMFiEyoXp1Wv4u2jsnnSx2D8MFAHFF"); // Mashape key
        },

        

    });

    function getWeatherIcon(w_condition){
            switch (w_condition){
                case 'Cloudy':
                    return 'images/cloud.png';
                case 'Partly Cloudy':
                    return'images/partly-cloudy.png';
                case 'Mostly Sunny':
                    return'images/partly-cloudy.png';
            }
        }
}
