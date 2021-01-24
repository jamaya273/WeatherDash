$(document).ready(function () {
    var histCities = JSON.parse(localStorage.getItem("Cities"));
    if (histCities == undefined) {
        var cityWeather = "";
    }
    else {
        DispCityHistory(histCities);
        var cityWeather = histCities[0];
    };
    var todayDate = moment().format('L');
    callAPIs(cityWeather, todayDate);

});


$("#submit").click(function (event) {
    event.preventDefault();
    var cityWeather = $("#cityWeather").val().trim();
    var todayDate = moment().format('L');
    callAPIs(cityWeather, todayDate);
    AddCitytoHist(cityWeather);
    var histCities = JSON.parse(localStorage.getItem("Cities"));
    DispCityHistory(histCities);
});

$(".list-group-item").click(function () {
    alert("clicked " + JSON.stringify($(this)));
});




function callAPIs(cityWeather, todayDate) {
    var cityName = $("<h2>").text(cityWeather + " " + "(" + todayDate + ")").attr("class", "card-title");
    $("#cityCurrent").empty();
    $("#cityCurrent").append(cityName);

    var url = "https://api.openweathermap.org/data/2.5/weather?q=" + cityWeather + "&appid=df5e87f9ee23e7154e2a653c6f5aeb16&units=imperial"
    $.ajax({
        url: url,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        var tempVal = response.main.temp;
        var humiVal = response.main.humidity;
        var windVal = response.wind.speed;
        var latVal = response.coord.lat;
        var lonVal = response.coord.lon;
        var iconVal = response.weather[0].icon
        var url = "https://api.openweathermap.org/data/2.5/uvi?lat=" + latVal + "&lon=" + lonVal + "&appid=df5e87f9ee23e7154e2a653c6f5aeb16"
        $.ajax({
            url: url,
            method: "GET"
        }).then(function (response) {
            console.log(response);
            var uvinVal = response.value;
            dispCurrent(tempVal, humiVal, windVal, uvinVal, iconVal);
        })
    })

    var url = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityWeather + "&appid=df5e87f9ee23e7154e2a653c6f5aeb16&units=imperial"
    $.ajax({
        url: url,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        var arrFcast = response.list
        dispForecast(arrFcast);
    })
}


function dispCurrent(tempVal, humiVal, windVal, uvinVal, iconVal) {
    // <img class="card-img-bottom" data-src="holder.js/100x180/?text=Image cap" alt="Icon"></img>
    var iconurl = "https://openweathermap.org/img/w/" + iconVal + ".png";
    console.log(iconurl);
    var iconCurr = $("<img>").attr("src", iconurl).attr("alt", "Icon")
    $("#cityCurrent").append(iconCurr);

    $("#weatherCurrent").empty();
    var currTemp = $("<li>").text("Temperature: " + tempVal + " " + String.fromCharCode(176) + "F").attr("class", "list-group-item")
    $("#weatherCurrent").append(currTemp);
    var currHumed = $("<li>").text("Humidity: " + humiVal + " %").attr("class", "list-group-item")
    $("#weatherCurrent").append(currHumed);
    var currWinds = $("<li>").text("Wind Speed: " + windVal + " MPH").attr("class", "list-group-item")
    $("#weatherCurrent").append(currWinds);

    if (uvinVal <= 3) {
        var uvinValb = $("<span>").attr("class", "badge badge-success p-2").text(uvinVal);
    } else if (uvinVal <= 7) {
        var uvinValb = $("<span>").attr("class", "badge badge-warning p-2").text(uvinVal);
    } else {
        var uvinValb = $("<span>").attr("class", "badge badge-danger p-2").text(uvinVal);
    };
    var currUVind = $("<li>").text("UV Index: ").attr("class", "list-group-item").append(uvinValb);
    $("#weatherCurrent").append(currUVind);
}


function dispForecast(arrFcast) {
    $("#weatherForecast").empty();
    for (let i = 1; i < 6; i++) {
        var cardFcast = $("<div>").attr("class", "cardForecast m-2 bg-primary text-white rounded");
        var cardBody = $("<div>").attr("class", "card-body");
        var cardTitle = $("<h5>").text(moment.unix(arrFcast[(8 * i) - 1].dt).format("MM/DD/YYYY")).attr("class", "card-title mb-4");
        var iconurl = "https://openweathermap.org/img/w/" + arrFcast[(8 * i) - 1].weather[0].icon + ".png";
        var iconFcast = $("<img>").attr("src", iconurl).attr("alt", "Icon")
        var cardTemp = $("<p>").text("Temp: " + arrFcast[(8 * i) - 1].main.temp + " " + String.fromCharCode(176) + "F").attr("class", "card-text mb-1 mt-4");
        var cardHumi = $("<p>").text("Humidity: " + arrFcast[(8 * i) - 1].main.humidity + " %").attr("class", "card-text");
        $(cardBody).append(cardTitle).append(iconFcast).append(cardTemp).append(cardHumi);
        $(cardFcast).append(cardBody);
        $("#weatherForecast").append(cardFcast)
    }
}


function DispCityHistory(histCities) {

    var uniqueCities = [];
    $.each(histCities, function (i, elem) {
        if ($.inArray(elem, uniqueCities) === -1) {
            uniqueCities.push(elem);
        }
    })

    len = uniqueCities.length;
    if (len > 10) {
        len = 10;
    };

    $("#cityList").empty();
    for (var i = 0; i < len; i++) {
        var lcty = $("<button>").attr("type", "button").attr("class", "list-group-item list-group-item-action").attr("id", "city" + i).text(uniqueCities[i]);
        $("#cityList").append(lcty);
    }

}






function AddCitytoHist(cityWeather) {
    var cities = JSON.parse(localStorage.getItem("Cities"));
    if (cities == undefined) {
        var cities = [];
    };
    if (cityWeather) {
        cities.unshift(cityWeather);
        localStorage.setItem("Cities", JSON.stringify(cities));
    };

}


