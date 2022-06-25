// store api key in variable
apiKey = '178a897e3808941aa91acb0d5fe8d92b';
// get elements via document.get by id
// form
let searchFormEl = document.getElementById('search-form');
let userInputEl = document.getElementById('user-search');
let previousSearchEl = document.getElementById('previous-search');
// current day card
let displayNoneEl = document.getElementById('display-none')
let currentDayCityDateIcon = document.getElementById('current-city-date-icon');
let currentTempEl = document.getElementById('current-temp');
let currentWindEl = document.getElementById('current-wind');
let currentHumidityEl = document.getElementById('current-humidity');
let currentUVEl = document.getElementById('current-uv');

// write function to get uv index from one call api on openweathermaps
function getOneCallApiUV(lon, lat) {
    return fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely&appid=${apiKey}`)
        .then(function (response) {
            return response.json();
        })
};


// write a function to get the weather data from api
// https://openweathermap.org/current#name 
function getWeather(city) {
    return fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`)
        .then(function (response) {
            return response.json();
        })
        .then(function (currentWeather) {
            let lon = currentWeather.coord.lon;
            let lat = currentWeather.coord.lat;
            // return these parameters so we can get uv index
            // from other api
            return getOneCallApiUV(lon, lat);
        });
};


// trying something here
function uvBackgroundColour(uvIndex){
    if (uvIndex <= 2) {
        currentUVEl.style.backgroundColor = "#4fb400";
    } else if (uvIndex <= 5 && uvIndex > 2) {
        currentUVEl.style.backgroundColor = "#f8b600";
    } else if (uvIndex <= 7 && uvIndex > 5) {
        currentUVEl.style.backgroundColor = "#f85900";
    } else if (uvIndex <= 10 && uvIndex > 7) {
        currentUVEl.style.backgroundColor = "#d81f1d";
    } else if (uvIndex > 10) {
        currentUVEl.style.backgroundColor = "#998cff";
    };
}


// get city searched for, when i click the search button
searchFormEl.addEventListener('submit', function (event) {
    event.preventDefault();
    // what is the users city?
    let userInput = userInputEl.value;
    // call openweathermaps api to fetch the weather
    //  data for city searched for
    getWeather(userInput)
        .then(function (weatherData) {
            console.log(weatherData);
            let currentWeatherIconCode = weatherData.current.weather[0].icon;
            let userInputUpper = userInput.toUpperCase();
            let currentDate = moment().format('DD-MMM-YYYY');
            // poppulate current city html
            currentDayCityDateIcon.innerHTML = `${userInputUpper} ${currentDate} <img src="http://openweathermap.org/img/wn/${currentWeatherIconCode}@2x.png">`;
            // current day attributes
            currentTempEl.innerText = (weatherData.current.temp - 273.15).toFixed(2);
            currentWindEl.innerText = weatherData.current.wind_speed + ' kms/h';
            currentHumidityEl.innerText = weatherData.current.humidity;
            // uv index
            let uvIndex = weatherData.current.uvi;
            console.log(uvIndex)

            currentUVEl.innerText = uvIndex;

            uvBackgroundColour(uvIndex);

            

            // background color
            // if loop for background colour of uv index
            // write better parameters
            // if (uvIndex <= 2) {
            //     currentUVEl.style.backgroundColor = "#4fb400";
            // } else if (uvIndex <= 5 && uvIndex > 2) {
            //     currentUVEl.style.backgroundColor = "#f8b600";
            // } else if (uvIndex <= 7 && uvIndex > 5) {
            //     currentUVEl.style.backgroundColor = "#f85900";
            // } else if (uvIndex <= 10 && uvIndex > 7) {
            //     currentUVEl.style.backgroundColor = "#d81f1d";
            // } else if (uvIndex > 10) {
            //     currentUVEl.style.backgroundColor = "#998cff";
            // };

            // populate 5 day forecast


            // store the city searched for in local storage and
            // append that to the search bar column
            // localStorage.setItem(, userInput)   

        });
    // moved this to change scope

});