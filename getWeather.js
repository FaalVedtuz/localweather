$(document).ready(function () {
    $("#changeTemp").attr('checked', false);
    getLocationFn();
});

function getLocationFn() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(getCoordsFn);
    } else {
        $("#weatherContainer").html("<h3 class='red-text text-darken-2'>Sorry your browser does not support geo location.</h3>");
    }
}

function getCoordsFn(position) {
    var lati = position.coords.latitude;
    var longi = position.coords.longitude;
    getWeatherFn(lati, longi);
    console.log(lati + " " + longi);
}


function getWeatherFn(la, lo) {

    // init global variables
    var bgImg = "";
    var rawTemp = "";
    var temp = "";
    // -------------------------//

    $.ajax({

        url: "https://simple-weather.p.mashape.com/weatherdata?lat=" + la + "&lng=" + lo + "", // The URL to the API.
        type: 'GET',
        //data: {}, // Additional parameters here

        dataType: 'json',
        success: function (data) {

            var city = data.query.results.channel.location.city;
            var country = data.query.results.channel.location.country;
            var region = data.query.results.channel.location.region;
            var condition = data.query.results.channel.item.condition.text;

            var imgIcon = getWeatherCondtion(condition);
            var currentFetchDate = data.query.results.channel.lastBuildDate;
            var getDay = data.query.results.channel.item.forecast;

            var tempType = data.query.results.channel.units.temperature;
            rawTemp = data.query.results.channel.item.condition.temp;
            temp = rawTemp + "&#176; " + tempType;
            var tempFlag = true;

            $("#changeTemp").on('change', function () {
                var status = $(this).prop("checked");
                var tempVal = data.query.results.channel.item.condition.temp;
                if (tempFlag) {
                    if (status === true) { // convert to F
                        rawTemp = (tempVal * (9 / 5)) + 32;
                        tempFlag = false;
                    }
                }
                switch(status){
                    case true:
                        $("#currentDayTemp").html($("refresh-temp").html());
                        $("#currentDayTemp").html(rawTemp.toFixed(1) + "&#176; F");
                        break;
                    default:
                        $("#currentDayTemp").html($("refresh-temp").html());
                        $("#currentDayTemp").html(temp);
                        break;
                }
            });

            $("#weatherContainer").html("<h4 class='center-align'>" + city + ", " + region + ", " + country + "</h4>");
            $("#weatherIcon").html("<img class='weatherImg responsive-img right' alt='" + condition + "' src='" + imgIcon + "'>");
            $("#currentDayCondition").html(condition);
            $("#currentDayTemp").html(temp);
            $("#currentFetchDate").html(currentFetchDate);
            $("body").css('background', 'url(' + bgImg + ')');
            for (var i = 1; i < 5; i++) {
                $("#cardContainer").append("<div class='col s12 m3 l3 '><div class='card-panel blue lighten-2 z-depth-3'><div class='card-content'><span class='card-title white-text flow-text'>" +
                    getDay[i].day + "</span><div class='row'><div class='col s8 m8 18 offset-m2 offset-s2'><img class='weatherCardImg' src='" + getWeatherCondtion(getDay[i].text) + "' alt='" + getDay[i].text + "' /></div></div><div class='row'><div class='col s12 m12 l12'><p class='flow-text white-text center-align'>" + getDay[i].text + "</p></div></div></div></div></div></div>");
            }
        },
        error: function (err) {
            console.log(err);
        },
        beforeSend: function (xhr) {
            xhr.setRequestHeader("X-Mashape-Authorization", "li7CFnVytCmshu5vqwd6FMFiEyoXp1Wv4u2jsnnSx2D8MFAHFF"); // Mashape key
        },

    });

    function getWeatherCondtion(w_condition) {
        switch (w_condition) {
            case 'Cloudy':
                bgImg = 'images/bg-cloudy-day.jpg';
                return 'images/cloudy.png';
            case 'Partly Cloudy':
                bgImg = 'images/bg-cloud-day.jpg';
                return 'images/cloudy.png';
            case 'Mostly Cloudy':
                bgImg = 'images/bg-cloud-day.jpg';
                return 'images/cloudy.png';
            case 'Mostly Sunny':
                bgImg = 'images/bg-clear-day.jpg';
                return 'images/clear-day.png';
            case 'Thunderstorms':
                bgImg = 'images/bg-thunderstorm.jpg';
                return 'images/thunderstorm.png';
            case 'Scattered Thunderstorms':
                bgImg = 'images/bg-thunderstorm.jpg';
                return 'images/thunderstorm.png';
            case 'Showers':
                bgImg = 'images/bg-rainy.jpg';
                return 'images/rain.png';
        }
    }
}