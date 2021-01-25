// Cookie settings for cross-site access
document.cookie = 'cookie1=value1; SameSite=Lax';
document.cookie = 'cookie2=value2; SameSite=None; Secure';
// https://api.airvisual.com/v2/nearest_city?key=40f410cd-9102-4b7b-9aed-cdbbce23a985



var getCurrentAirInfo = function() {
    var apiUrl = "https://api.airvisual.com/v2/nearest_city?key=40f410cd-9102-4b7b-9aed-cdbbce23a985";
    fetch(apiUrl).then(function(response) {

        if (response.ok) {
            response.json().then(function(data) {
                console.log(data);
                getWeather(data);
            });
        } else {
            alert("Error: " + response.statusText);

        }
    });
};

var getWeather = function(results) {
    var contentEl = document.getElementById("content");
    var iconImgLink = "assets\images\01d" + results.data.current.weather.ic + " - Copy.png";
    var imgCode = "<img src='" + iconImgLink + "' alt='icon'>";
    contentEl.innerHTML = "Ahoy, " + results.data.city + "!<br>Temp: " +
        convertToF(results.data.current.weather.tp) + "F" +
        "<br>Current AQI (US): " + results.data.current.pollution.aqius + imgCode;

};

function convertToF(celsius) {
    return celsius * 9 / 5 + 32;
}
getCurrentAirInfo();