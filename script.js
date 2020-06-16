// need a new API for every new city!!
var cityNameEl = $("#search-bar").val();

function citySearch() {
  cityNameEl;
}

var queryURL =
  "http://api.openweathermap.org/data/2.5/weather?q=Atlanta&appid=fb0a218354a329c215a0e902f7297dc6";

$("#submit-button").on("click", citySearch);

// Get the value of my input and console log it
// Take the city name to then search within my Atlanta API

$.ajax({
  url: queryURL,
  method: "GET",
}).then(function (response) {
  console.log(response);
});

// Get the value of my input and console log it
// Take the city name to then search within my Atlanta API
