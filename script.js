$("#submit").click(function (event) {
    event.preventDefault();
    var cityWeather = $("#cityWeather").val().trim();
    var todayDate = moment().format('L');

    var url = "http://api.openweathermap.org/data/2.5/weather?q=" + cityWeather + "&appid=df5e87f9ee23e7154e2a653c6f5aeb16&units=imperial"
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



        var url = "http://api.openweathermap.org/data/2.5/uvi?lat=" + latVal + "&lon=" + lonVal + "&appid=df5e87f9ee23e7154e2a653c6f5aeb16"
        $.ajax({
            url: url,
            method: "GET"
        }).then(function (response) {
            console.log(response);
            var uvinVal = response.value;

            dispCurrent(tempVal, humiVal, windVal, uvinVal);
        })



    })


    var url = "http://api.openweathermap.org/data/2.5/forecast?q=" + cityWeather + "&appid=df5e87f9ee23e7154e2a653c6f5aeb16"
    $.ajax({
        url: url,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        var arrFcast = response.list

        dispForecast(arrFcast);
    })


    var cityName = $("<h2>").text(cityWeather + " " + "(" + todayDate + ")").attr("class", "card-title");
    // <img class="card-img-bottom" data-src="holder.js/100x180/?text=Image cap" alt="Icon"></img>
    $("#cityCurrent").empty();
    $("#cityCurrent").append(cityName);


})


function dispCurrent(tempVal, humiVal, windVal, uvinVal) {

    $("#weatherCurrent").empty();
    var currTemp = $("<li>").text("Temperature: " + tempVal + " " + String.fromCharCode(176) + "F").attr("class", "list-group-item")
    $("#weatherCurrent").append(currTemp);

    var currHumed = $("<li>").text("Humidity: " + humiVal + " %").attr("class", "list-group-item")
    $("#weatherCurrent").append(currHumed);

    var currWinds = $("<li>").text("Wind Speed: " + windVal + " MPH").attr("class", "list-group-item")
    $("#weatherCurrent").append(currWinds);

    var currUVind = $("<li>").text("UV Index: " + uvinVal).attr("class", "list-group-item")
    $("#weatherCurrent").append(currUVind);
}



function dispForecast(arrFcast){
 // for (let index = 0; index < Math.min (array.length,limit); index++) {
    //     const element = array[index];
    //     var title = element.headline.main;
    //     console.log(title);
    // }

        // <div class="cardForecast m-2 bg-primary text-white rounded">
        //     <div class="card-body">
        //       <h5 class="card-title mb-4">01/22/2021</h5>
        //       <img class="card-img-bottom" data-src="holder.js/100x180/" alt="Icon">
        //       <p class="card-text mb-1 mt-4">Temp: 86.84 F</p>
        //       <p class="card-text">Humidity: 43%</p>
        //     </div>
        // </div>








    $("#weatheForecast").empty();
    var cardFcast = $("<div>").attr("class","cardForecast m-2 bg-primary text-white rounded");
    var cardBody = $("<div>").attr("class","card-body");
    
    var currTemp = $("<li>").text("Temperature: " + tempVal + " " + String.fromCharCode(176) + "F").attr("class", "list-group-item")
    $("#weatherCurrent").append(currTemp);

}



