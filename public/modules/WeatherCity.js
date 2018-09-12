class WeatherCity {
    constructor (cityName, temp_c, temp_f, icon, date, hour) {
        this.id = WeatherCity.currentID++;
        this.cityName = cityName;
        this.temp_c = temp_c;
        this.temp_f = temp_f;
        this.icon = icon;
        this.date = date;
        this.hour = hour;
        this.comments = [];
        this.commentsCount = 0;

        localStorage.setItem(WeatherCity.STORAGE_ID, WeatherCity.currentID);
    }
}

WeatherCity.STORAGE_ID = "cityID";
WeatherCity.currentID = localStorage.getItem(WeatherCity.STORAGE_ID) || 0;

export default WeatherCity;