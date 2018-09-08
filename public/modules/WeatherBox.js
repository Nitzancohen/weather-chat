class WeatherBox {
    constructor (cityName, cityID, temp_c, temp_f, icon, date, hour) {
        this.id = cityID;
        this.cityName = cityName;
        this.temp_c = temp_c;
        this.temp_f = temp_f;
        this.icon = icon;
        this.date = date;
        this.hour = hour;
        this.comments = [];
        this.commentsCount = 0;
    }

    addComment (newComment) {
        this.comments.push(newComment);
        this.commentsCount++;
    }
}

export default WeatherBox;