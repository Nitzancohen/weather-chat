class WeatherBox {
    constructor (cityName, cityID, temp, icon) {
        this.id = cityID;
        this.cityName = cityName;
        this.temp = temp;
        this.icon = icon;
        this.comments = [];
        this.commentsCount = 0;
    }

    addComment (text) {
        let newComment = new Comment(text, this);
        this.comments.push(newComment);
        this.commentsCount++;
    }
}

export default WeatherBox;