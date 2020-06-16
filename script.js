// need a new API for every new city!!
// Create an on click event listener to run the function city search

$("#submit-button").on("click", function () {
  $("#search-bar").val();
  console.log("You clicked my button!");
  console.log($("#search-bar").val());

  var queryURL =
    "http://api.openweathermap.org/data/2.5/weather?q=" +
    $("#search-bar").val() +
    "&appid=fb0a218354a329c215a0e902f7297dc6";

  // Get the value of my input and console log it
  // Take the city name to then search within my Atlanta API

  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    console.log(response);

    // Get the value of my input and console log it
    // Take the city name to then search within my Atlanta API
  });
});
