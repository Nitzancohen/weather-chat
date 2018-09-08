import WeatherBox from './modules/WeatherBox.js';
import Comment from './modules/Comment.js';

let CITY_ID = 0;
let boxes = [];

const addWeatherBox = function (city, render) {
    $.get({url: "http://api.apixu.com/v1/current.json?key=4b093923b0274409a5c143509180609&q="+city,
        success: function (data) {
            let currentData = data.current;
            let time = data.location.localtime.split(' ');
            let date = time[0], hour = time[1];
            let weatherBox = new WeatherBox(city, CITY_ID, currentData.temp_c, currentData.temp_f, currentData.condition.icon, date, hour);
            boxes.push(weatherBox);
            CITY_ID++;
            render();
        }
    });
};

const removeWeatherBox = function (id) {
    let city = getCityById(id);
    boxes.splice(boxes.indexOf(city), 1);
    // renderView();
};

const addComment = function (cityId, commentInput) {
    let city = getCityById(cityId);
    let comment = new Comment(commentInput, city.commentsCount);
    city.addComment(comment);
    city.commentsCount++;
    // renderView();
};

const renderView = function () {
    $('#show-weather').empty();
    $('#city-input').val("");
    let html = createWeatherTemplate();
    $('#show-weather').append(html);
};

const createWeatherTemplate = function () {
    let source = document.getElementById("weather-template").innerHTML;
    let template = Handlebars.compile(source);
    return template({weatherbox: boxes});
};

const getCityById = function (id) {
    for (let box of boxes) {
        if (box.id == id) {
            return box;
        }
    }
};

const capitalize = function (text) {
    let words = text.split(' ');
    let capitalText = '';
    for (let word of words) {
        capitalText += ' ' + word[0].toUpperCase().concat(word.slice(1).toLowerCase());
    }
    return capitalText.slice(1);
}


// ***** EVENTS *****
$('#search-city').on('click', function () {
    let cityInput = $('#city-input').val();
    let city = capitalize(cityInput);
    addWeatherBox(city, renderView);
});

$('#show-weather').on('click', '.add-comment', function () {
    let commentInput = $(this).closest('.comments-container').find('.comment-input').val();
    let cityId = $(this).closest('.city-container').find('.city').data('id');
    addComment(cityId, commentInput);
    renderView();
});

$('#show-weather').on('click', '.remove-city', function () {
    let cityId = $(this).closest('.city').data('id');
    removeWeatherBox(cityId);
    renderView();
});


// ***** SUBMIT ON 'ENTER' *****
$('#city-input').on('keyup', function (event) {
    event.preventDefault();
    if (event.keyCode === 13) {
        $('#search-city').click();
    }
});

$('#show-weather').on('keyup', '.comment-input', function (event) {
    event.preventDefault();
    if (event.keyCode === 13) {
        $(this).closest('.comments-container').find('.add-comment').click()
    }
});