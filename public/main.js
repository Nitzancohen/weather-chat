import WeatherBox from './modules/WeatherBox.js';
import Comment from './modules/Comment.js';

let cityID = 0;
let boxes = [];

const fetch = function (city) {
    $.get("http://api.apixu.com/v1/current.json?key=4b093923b0274409a5c143509180609&q="+city, function (data) {
        addWeatherBox(city, data.current.temp_c, data.current.condition.icon);
    });
};

const addWeatherBox = function (city, temp, icon) {
    let weatherBox = new WeatherBox(city, cityID, temp, icon);
    cityID++;
    boxes.push(weatherBox);
    renderView();
};

const renderView = function () {
    $('#show-weather').empty();
    $('#city-input').val("");
    let source = document.getElementById("weather-template").innerHTML;
    let template = Handlebars.compile(source);
    let html = template({weatherbox: boxes});
    $('#show-weather').append(html);
};

$('#search-city').on('click', function () {
    let city = $('#city-input').val();
    fetch(city);
});