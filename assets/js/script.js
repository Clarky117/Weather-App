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
// five day forecast cards
let fiveDayCardsEl = document.getElementById('five-day-cards');
// search history element made with tutor Jain Dixit
let searchHistoryEl = document.querySelector('.search-history');

// write function to get uv index from one call api on openweathermaps
function getOneCallApiUV(lon, lat) {
    return fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&exclude=hourly,minutely&appid=${apiKey}`)
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
            // return these parameters so we can get uv index from other api 
            return getOneCallApiUV(lon, lat);
        });
};

// function for background colour of UV index
function uvBackgroundColour(uvIndex) {
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
};

// trying to generate 5 day cards
// function generateFiveDayCards() {

//     let fiveDayCards = document.createElement('section');
//     fiveDayCards.setAttribute('class', 'card bg-light m-2');

//     let fiveDayCardsBody = document.createElement('section');
//     fiveDayCardsBody.setAttribute('class', 'card-body');

//     let fiveDayh4 = document.createElement('h4');
//     fiveDayh4.setAttribute('class', 'card-title');
//     fiveDayh4.innerText = 'Date'

//     let pTemp = document.createElement('p');
//     pTemp.setAttribute('class', 'card-text');
//     pTemp.innerText = 'Temp'

//     let pWind = document.createElement('p');
//     pWind.setAttribute('class', 'card-text');
//     pWind.innerText = 'Wind'

//     let pHumidity = document.createElement('p');
//     pHumidity.setAttribute('class', 'card-text');
//     pHumidity.innerText = 'Humidity'

//     fiveDayCardsEl.appendChild(fiveDayCards);
//     fiveDayCards.appendChild(fiveDayCardsBody);
//     fiveDayCardsBody.appendChild(fiveDayh4, pTemp, pWind, pHumidity)


{/* <section class="card bg-light m-2"> fiveDayCards
            <section class="card-body"> fiveDayCardsBody
                <h4 id="one-date" class="card-title">13/12/2012</h4> fiveDayh4
                <img src="#" alt="#">
                <p id="one-temp" class="card-text">Temp:</p>
                <p id="one-wind" class="card-text">Wind:</p>
                <p id="one-humidity" class="card-text">Humidity:</p>
            </section>
        </section> */}

// }

// function populateFiveDayCards(weatherData){
// }

// function to populate search history, written with the help of Jain Dixit in my tutoring session
function populateSearchHistory() {
    let searchHistoryItems = JSON.parse(localStorage.getItem('cities'));

    if (searchHistoryItems) {
        for (let index = 0; index < searchHistoryItems.length; index++) {
            const searchHistoryButton = document.createElement('button');
            searchHistoryButton.innerText = searchHistoryItems[index];

            searchHistoryButton.setAttribute('class', 'btn btn-secondary d-flex flex-column my-3 w-100')

            searchHistoryButton.addEventListener('click', getWeatherData);
            searchHistoryEl.appendChild(searchHistoryButton);
        };
    };
};

populateSearchHistory()

function getWeatherData(event) {
    // console.log(event.target.innerText);

    // what is the users city?
    let userInput = userInputEl.value;

    // code for local storage written with the help of tutor Jain Dixit 
    if (event.type === 'submit') {
        event.preventDefault();
        let searchHistoryItems = JSON.parse(localStorage.getItem('cities'));
        if (searchHistoryItems) {
            if (!searchHistoryItems.includes(userInput)) {
                searchHistoryItems.push(userInput);
                localStorage.setItem('cities', JSON.stringify(searchHistoryItems));
            }
        } else {
            let cityArray = [];
            cityArray.push(userInput);
            localStorage.setItem('cities', JSON.stringify(cityArray));
        }
    } else {
        userInput = event.target.innerText;
    };

    // call openweathermaps api to fetch the weather data for city searched for
    getWeather(userInput)
        .then(function (weatherData) {
            console.log(weatherData);
            let currentWeatherIconCode = weatherData.current.weather[0].icon;
            let userInputUpper = userInput.toUpperCase();
            let currentDate = moment().format('DD-MMM-YYYY');
            // poppulate current city html
            currentDayCityDateIcon.innerHTML = `${userInputUpper} ${currentDate} <img src="http://openweathermap.org/img/wn/${currentWeatherIconCode}@2x.png">`;
            // current day attributes
            currentTempEl.innerText = weatherData.current.temp.toFixed(2);
            currentWindEl.innerText = weatherData.current.wind_speed + ' kms/h';
            currentHumidityEl.innerText = weatherData.current.humidity;
            // uv index
            let uvIndex = weatherData.current.uvi;
            // console.log(uvIndex)

            currentUVEl.innerText = uvIndex;

            uvBackgroundColour(uvIndex);

            // write function
            // generateFiveDayCards()

            // write function
            // populateFiveDayCards()

            // populate 5 day forecast
        });
};

// get city searched for, when i click the search button
searchFormEl.addEventListener('submit', getWeatherData);