// if item in searchHistory, then parse the items;
// otherwise, return an empty array.

var searchHistory = localStorage.getItem("searchHistory")
  ? JSON.parse(localStorage.getItem("searchHistory"))
  : [];

// on button click generate a new button
// give new attr
// and append to the li
function renderCities() {
  $(".cityButtons").empty();
  for (var i = 0; i < searchHistory.length; i++) {
    var button = $("<button>").text(searchHistory[i]);
    $(button).attr("class", "btn-block newCityButton");
    var listItem = $("<li>").append(button);
    $(".cityButtons").append(listItem);
  }
}
// on click pull previously search city's weather info
function recallCityData() {
  console.log("You clicked me!");
  console.log(this.innerHTML);
  searchEl(this.innerHTML);
}

// type into search bar, and then pull city weather info on click
function searchEl(cityName) {
  // console.log(cityName);

  var queryURL =
    "http://api.openweathermap.org/data/2.5/weather?q=" +
    cityName +
    "&units=imperial&appid=fb0a218354a329c215a0e902f7297dc6";

  var fiveDayURL =
    "http://api.openweathermap.org/data/2.5/forecast?q=" +
    cityName +
    "&units=imperial&appid=fb0a218354a329c215a0e902f7297dc6";

  // using the moment CDN, determine the correct date

  var todaysDate = moment().format("(M/D/YYYY)");

  // add days for 5 day forecast, IMO easier that using the dt from within response

  var dayOneEl = moment().add(1, "days");
  dayOneEl = dayOneEl.format("M/D/YYYY");

  var dayTwoEl = moment().add(2, "days");
  dayTwoEl = dayTwoEl.format("M/D/YYYY");

  var dayThreeEl = moment().add(3, "days");
  dayThreeEl = dayThreeEl.format("M/D/YYYY");

  var dayFourEl = moment().add(4, "days");
  dayFourEl = dayFourEl.format("M/D/YYYY");

  var dayFiveEl = moment().add(5, "days");
  dayFiveEl = dayFiveEl.format("M/D/YYYY");

  // ajax for main weather

  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    // grab icon img and place within the iconURL to generate weather icons

    var iconImg = response.weather[0].icon;
    var iconURL = "http://openweathermap.org/img/w/" + iconImg + ".png";

    // jumbotron info below

    $("#cityDay").text(response.name + " " + todaysDate);
    $(".img-main").attr("src", iconURL);
    $("#temp-main").text("Temperature: " + response.main.temp);
    $("#humid-main").text("Humidity: " + response.main.humidity + "%");
    $("#windSpeed-main").text("Wind Speed: " + response.wind.speed + " MPH");

    // grab lat/lon to plug into UV API

    var latEl = response.coord.lat;
    var lonEl = response.coord.lon;

    var uvURL =
      "http://api.openweathermap.org/data/2.5/uvi?appid=fb0a218354a329c215a0e902f7297dc6&lat=" +
      latEl +
      "&lon=" +
      lonEl;

    // UV ajax goes within main weather ajax, because you have
    // lat and lon defined to query new UV url

    $.ajax({
      url: uvURL,
      method: "GET",
    }).then(function (response) {
      uvIndexEl = response.value;
      // console.log(uvIndexEl);

      // determine color for UV index
      // below 4 is favorable
      // 4-7 is moderate
      // else is severe

      if (uvIndexEl < 4) {
        $("#uvIndex-main").attr("class", "favorable");
      } else if (uvIndexEl > 4 && uvIndexEl < 7) {
        $("#uvIndex-main").attr("class", "moderate");
      } else {
        $("#uvIndex-main").attr("class", "severe");
      }
      $("#uvIndexStats").attr("style", "display:block");
      $("#uvIndex-main").text(uvIndexEl);

      $(".newCityButton").on("click", recallCityData);
    });
  });

  $.ajax({
    url: fiveDayURL,
    method: "GET",
  }).then(function (response) {
    var dayOneIcon = response.list[3].weather[0].icon;
    var dayTwoIcon = response.list[11].weather[0].icon;
    var dayThreeIcon = response.list[19].weather[0].icon;
    var dayFourIcon = response.list[27].weather[0].icon;
    var dayFiveIcon = response.list[35].weather[0].icon;

    // The above dayNumberIcons are pulling weather infor for 12noon on each day
    // below add in icons for each day
    var dayOneIconURL =
      "http://openweathermap.org/img/w/" + dayOneIcon + ".png";
    var dayTwoIconURL =
      "http://openweathermap.org/img/w/" + dayTwoIcon + ".png";
    var dayThreeIconURL =
      "http://openweathermap.org/img/w/" + dayThreeIcon + ".png";
    var dayFourIconURL =
      "http://openweathermap.org/img/w/" + dayFourIcon + ".png";
    var dayFiveIconURL =
      "http://openweathermap.org/img/w/" + dayFiveIcon + ".png";

    // dates live below

    $("#dayOne").text(dayOneEl);
    $("#dayTwo").text(dayTwoEl);
    $("#dayThree").text(dayThreeEl);
    $("#dayFour").text(dayFourEl);
    $("#dayFive").text(dayFiveEl);

    // attach icon URL to img src

    $("#dayOneImg").attr("src", dayOneIconURL);
    $("#dayTwoImg").attr("src", dayTwoIconURL);
    $("#dayThreeImg").attr("src", dayThreeIconURL);
    $("#dayFourImg").attr("src", dayFourIconURL);
    $("#dayFiveImg").attr("src", dayFiveIconURL);

    // find temp and append to correct day card

    $("#dayOneTemp").text("Temp: " + response.list[3].main.temp);
    $("#dayTwoTemp").text("Temp: " + response.list[11].main.temp);
    $("#dayThreeTemp").text("Temp: " + response.list[19].main.temp);
    $("#dayFourTemp").text("Temp: " + response.list[27].main.temp);
    $("#dayFiveTemp").text("Temp: " + response.list[35].main.temp);

    // find humidity and append to correct day card

    $("#dayOneHumidity").text(
      "Humidity: " + response.list[3].main.humidity + "%"
    );
    $("#dayTwoHumidity").text(
      "Humidity: " + response.list[11].main.humidity + "%"
    );
    $("#dayThreeHumidity").text(
      "Humidity: " + response.list[19].main.humidity + "%"
    );
    $("#dayFourHumidity").text(
      "Humidity: " + response.list[27].main.humidity + "%"
    );
    $("#dayFiveHumidity").text(
      "Humidity: " + response.list[35].main.humidity + "%"
    );
  });
}
// on click take the search val
// store into local storage as string
// run both main search functions and render buttons
$("#submit-button").on("click", function () {
  var cityName = $("#search-bar").val();
  searchHistory.push(cityName);
  localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
  searchEl(cityName);
  renderCities();
});

// render buttons and then take the last searched city
// and run weather infor for that city
renderCities();
var lastCity = searchHistory[searchHistory.length - 1];
searchEl(lastCity);
