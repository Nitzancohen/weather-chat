import WeatherCity from './modules/WeatherCity.js';
import Comment from './modules/Comment.js';

let cities = [];
const STORAGE_ID = 'weather';

const fetch = function (city) {
    $.get('http://api.apixu.com/v1/current.json?key=4b093923b0274409a5c143509180609&q='+city).then(function (data) {
        let currentData = data.current;
        let time = data.location.localtime.split(' ');
        let date = time[0], hour = time[1];

        addWeatherCity(data.location.name, currentData.temp_c, currentData.temp_f, currentData.condition.icon, date, hour);

        renderView();
        }).catch(function () {
            alert('where exactly?');
        });
};

const addWeatherCity = function (city, temp_c, temp_f, icon, date, hour) {
    let weatherBox = new WeatherCity(city, temp_c, temp_f, icon, date, hour);
    cities.push(weatherBox);
    saveToLocalStorage();
};

const removeWeatherCity = function (id) {
    let city = _getCityById(id);
    cities.splice(cities.indexOf(city), 1);
    saveToLocalStorage();
    renderView();
};

const addComment = function (cityId, commentInput) {
    let city = _getCityById(cityId);
    let comment = new Comment(commentInput, city.commentsCount);
    city.comments.push(comment);
    city.commentsCount++;
    saveToLocalStorage();
    renderView();
};

const renderView = function () {
    $('#show-weather').empty();
    $('#city-input').val('');

    let source = document.getElementById('weather-template').innerHTML;
    let template = Handlebars.compile(source);
    let html = template({cities});
    $('#show-weather').append(html);
};

const _getCityById = function (id) {
    for (let city of cities) {
        if (city.id == id) {
            return city;
        }
    }
};

// ***** EVENTS *****
$('#search-city').on('click', function () {
    let city = $('#city-input').val();
    fetch(city);
});

$('#show-weather').on('click', '.add-comment', function () {
    let commentInput = $(this).closest('.comments-container').find('.comment-input').val();
    let cityId = $(this).closest('.city-container').find('.city').data('id');
    addComment(cityId, commentInput);
});

$('#show-weather').on('click', '.remove-city', function () {
    let cityId = $(this).closest('.city').data('id');
    removeWeatherCity(cityId);
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

// ***** LOCAL STORAGE *****
const saveToLocalStorage = function () {
    localStorage.setItem(STORAGE_ID, JSON.stringify(cities));
}

const getFromLocalStorage = function () {
    return JSON.parse(localStorage.getItem(STORAGE_ID) || '[]');
}

// ***** ON PAGE LOAD *****
cities = getFromLocalStorage();
renderView();