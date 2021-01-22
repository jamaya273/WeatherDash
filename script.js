$("#submit").click(function(event) {
    event.preventDefault();
    var url= "http://api.openweathermap.org/data/2.5/forecast?id=524901&appid=df5e87f9ee23e7154e2a653c6f5aeb16"
 //   var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + term + "&api-key=HAdu94wGwFWyGWotoRGgJ4gspdISqzNS";
$.ajax({
    url: url,
    method: "GET"
}).then(function (response) {
    console.log(response)
    
})
})