// store api key in variable
apiKey = '178a897e3808941aa91acb0d5fe8d92b';

// get elements via document.get by id
// form
let searchFormEl = document.getElementById('search-form');
let userInputEl = document.getElementById('user-search');
// current day card
let currentDayCityDateIcon = document.getElementById('current-city-date-icon');
let currentTempEl = document.getElementById('current-temp');
let currentWindEl = document.getElementById('current-wind');
let currentHumidityEl = document.getElementById('current-humidity');
let currentUVEl = document.getElementById('current-uv');


// write function to get uv index from one call api on openweathermaps
function getOneCallApiUV(lon, lat, dt) {
    return fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely&appid=${apiKey}`)
        .then(function (response) {
            return response.json();
        })
    // .then(function(oneCallDataUV){
    // test
    // console.log(oneCallDataUV)
    // let uvIndex = oneCallDataUV.current.uvi;
    // test uv
    // console.log(uvIndex);
};


// write a function to get the weather data from api
// https://openweathermap.org/current#name 
function getWeather(city) {
    return fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`)
        .then(function (response) {
            return response.json();
        })
        .then(function (currentWeather) {
            // test
            // console.log(currentWeather)
            // variables to return
            let lon = currentWeather.coord.lon;
            let lat = currentWeather.coord.lat;
            let dt = currentWeather.dt;

            // test
            // console.log(lon, lat, dt)
            // don't need dt

            // return these parameters so we can get uv index
            // from other api
            return getOneCallApiUV(lon, lat, dt);
        });
};


// get city searched for, when i click the search button
searchFormEl.addEventListener('submit', function (event) {
    event.preventDefault();
    // what is the users city?
    let userInput = userInputEl.value;
    // test
    // console.log(userInput);

    // call openweathermaps api to fetch the weather
    //  data for city searched for
    getWeather(userInput)
        .then(function (weatherData) {
            console.log(weatherData);
            let currentWeatherIconCode = weatherData.current.weather[0].icon;
            // test
            // console.log(currentWeatherIconCode);
        // });            
            
            
            // return a promise and populate the DOM with data from this
            // what do i need? current city, date, icon
            let userInputUpper = userInput.toUpperCase();
            let currentDate = moment().format('DD-MMM-YYYY');
            // example icon
            // let currentWeatherIconCode = currentWeather.current.weather[0].icon
            // console.log(currentWeatherIconCode)
            
            // poppulate current city html
            currentDayCityDateIcon.innerHTML = `${userInputUpper} ${currentDate} <img src="http://openweathermap.org/img/wn/${currentWeatherIconCode}@2x.png">`;
            
            // current day attributes
            currentTempEl.innerText = (weatherData.current.temp - 273.15).toFixed(2);
            currentWindEl.innerText = weatherData.current.wind_speed + ' kms/h';
            currentHumidityEl.innerText = weatherData.current.humidity;
            

            // this right here is what i have contact askBCS for
            let uvIndex = weatherData.current.uvi;
            console.log(uvIndex)

            currentUVEl.innerText = uvIndex;
            
            // if loop for background colour of uv index
            // if (currentUVEl > 7) {
            //     currentUVEl.style.backgroundColor = "red";
            // } else {
                //     currentUVEl.style.backgroundColor = "green";
                // };
                
                
                
                
            });
            // moved this to change scope
    // store the city searched for in local storage and
    // append that to the search bar column
});