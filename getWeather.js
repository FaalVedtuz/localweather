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
        var temp = data.query.results.channel.item.condition.temp + " " + data.query.results.channel.units.temperature;
        var imgIcon = data.query.results.channel.image.url;
        var imgWidth = data.query.results.channel.image.width;
        var imgHeigth = data.query.results.channel.image.height;

        console.log(condition);
        console.log(temp);
           $("#weatherContainer").html("<h5 class='red-text text-lighten-2 center-align'>"+ city + ", " + region + ", "+ country + "</h5>");
           $("#weatherIcon").html("<img class='circle' width='"+ imgWidth +"' heigth='"+ imgHeigth +"' src='"+ imgIcon +"'>");
           $("#currentDayCondition").html("<strong>Weather Condition: </strong>" + condition);
           $("#currentDayTemp").html("<strong>Weather Temperature: </strong>"+ temp);
           // $("#weatherContainer").html("<h5 class='flow-text blue-text text-darken-4'>- " + dta + "</h5>");

        },
        error: function(err) {
            console.log(err);
        },
        beforeSend: function(xhr) {
            xhr.setRequestHeader("X-Mashape-Authorization", "li7CFnVytCmshu5vqwd6FMFiEyoXp1Wv4u2jsnnSx2D8MFAHFF"); // Mashape key
        },


    });
}
