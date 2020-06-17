// need a new API for every new city!!
// Create an on click event listener to run the function city search

$("#submit-button").on("click", function () {
  var cityName = $("#search-bar").val();
  console.log("You clicked my button!");
  console.log(cityName);

  // Get the value of my input and console log it

  var queryURL =
    "http://api.openweathermap.org/data/2.5/weather?q=" +
    cityName +
    "&units=imperial&appid=fb0a218354a329c215a0e902f7297dc6";

  // Take the city name to then search within my Atlanta API

  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    console.log(response);
    console.log(response.wind.speed);
    var iconImg = response.weather[0].icon;
    var iconURL = "http://openweathermap.org/img/w/" + iconImg + ".png";

    $("#cityDay").text(response.name);
    $(".img-main").attr("src", iconURL);
    $("#temp-main").text("Temperature: " + response.main.temp);
    $("#humid-main").text("Humidity: " + response.main.humidity + "%");
    $("#windSpeed-main").text("Wind Speed: " + response.wind.speed + " MPH");
    // $("#uvIndex-main").text("UV Index: " + response.main.temp);

    // Get the value of my input and console log it
    // Take the city name to then search within my Atlanta API
  });
});
