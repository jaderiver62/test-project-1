// https://api.airvisual.com/v2/nearest_city?key=40f410cd-9102-4b7b-9aed-cdbbce23a985
// 40f410cd-9102-4b7b-9aed-cdbbce23a985

var aqiArray = [];


var getCurrentAirInfo = function() {
    var apiUrl = "https://api.airvisual.com/v2/nearest_city?key=40f410cd-9102-4b7b-9aed-cdbbce23a985";
    fetch(apiUrl).then(function(response) {
        if (response.ok) {
            response.json().then(function(dataResult) {
                console.log(dataResult);
                createAPIObject(dataResult);

            });
        } else {
            alert("Error: " + response.statusText);
        }
    });
};


// searchAQIResult is the function to call from script-search taking in latitude and longitude parameters

var searchAQIResult = function(lat, lng) {

    var url = "http://api.airvisual.com/v2/nearest_city?lat=" +
        lat + "&lon=" + lng + "&key=40f410cd-9102-4b7b-9aed-cdbbce23a985";

    fetch(url).then(function(response) {

        if (response.ok) {
            response.json().then(function(thisData) {
                console.log(thisData);
                createAPIObject(thisData);
                console.log(aqiArray);

            });
        } else {
            alert("Error: " + response.statusText);

        }
    });
}

var createAPIObject = function(results) {
    // This will work with HTML and CSS to display the variables
    var cityFormatted = results.data.city + ", " + results.data.state + ", " + results.data.country;
    var iconIdEl = results.data.current.weather.ic;
    var link = "https://openweathermap.org/img/wn/" + iconIdEl + "@2x.png";
    var imgCode = "<img src='" + link + "' alt='icon'>";
    var aqi = results.data.current.pollution.aqius;
    var pollutantName = getPollutant(results);
    var myObj = {
        name: cityFormatted,
        aqi: aqi,
        pollutant: pollutantName,
        img: imgCode
    };
    console.log(myObj);
    aqiArray.push(myObj);
    console.log(aqiArray);

};



function convertToF(celsius) {
    return Math.trunc(celsius * 9 / 5 + 32);
};


var getPollutant = function(result) {
    // Turn pollutant code into a human readable string
    var pollutantCode = result.data.current.pollution.mainus;
    var pollutantName = "";
    if (pollutantCode === "p2") {
        pollutantName = "PM2.5";
    } else if (pollutantCode === "p1") {
        pollutantName = "PM10";
    } else if (pollutantCode === "o3") {
        pollutantName = "Ozone O3";
    } else if (pollutantCode === "n2") {
        pollutantName = "Nitrogen dioxide NO2";
    } else if (pollutantCode === "s2") {
        pollutantName = "Sulfur dioxide SO2";
    } else if (pollutantCode === "co") {
        pollutantName = "Carbon monoxide CO";
    } else {
        pollutantName = "ERROR - invalid pollutant code";
    }

    return pollutantName;
};
/* Test Code:
 searchAQIResult(1, 2);
getCurrentAirInfo();*/
/*  This is potentially not needed, but keeping this working code in case we do

            function saveSearch() {
                localStorage.setItem("cityArray", JSON.stringify(cityArray));
                console.log("search recorded");
                console.log(cityArray);
            };

            function loadSearch() {
                var savedSearches = JSON.parse(localStorage.getItem("cityArray"));

                if (savedSearches) {
                    cityArray = savedSearches;
                } else { return false; }
                console.log("Search History Found...");

                cityArray = JSON.parse(JSON.stringify(savedSearches));
                console.log(cityArray);
                /* createHistory(); - a future function to build the search history panel 
};

// Calls loadSearch() to load the saved entries up as the page loads


getCurrentAirInfo();

loadSearch();


/* Adjusting this area in the future to suit our needs - for now it's got the

var createBadge = function(aqiValue) {
    var badgeCode = "<h3><a class='btn-floating btn-large waves-effect waves-light";

    if (aqiValue <= 50) {
        badgeCode += "green";
    } else if (aqiValue <= 100) {
        badgeCode += "yellow";
    } else if (aqiValue <= 150) {
        badgeCode += "orange";
    } else if (aqiValue <= 200) {
        badgeCode += "red";
    } else if (aqiValue <= 300) {
        badgeCode += "violet";
    } else if (aqiValue > 301) {
        badgeCode += "maroon";
    }
    badgeCode += "'>" + aqiValue + "</a></h3>";
    return badgeCode;
};

    <script src="assets\aqi-covid\script-covid.js"></script>
    <script src="assets\aqi-covid\script-aqi.js"></script>
 */

// The API uses Celsius - so we want to convert this to Fahrenheit/