// store api key in variable
apiKey = '178a897e3808941aa91acb0d5fe8d92b';

// get elements via document.get by id
let searchFormEl = document.getElementById('search-form');
let userInputEl = document.getElementById('user-search');

// write a function to get the weather data from api
// https://openweathermap.org/current#name 
function getWeather(city) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`)
        .then(function (response) {
            return response.json();
        })
        .then(function(currentWeather){
            // test
            console.log(currentWeather)
        });
};

// get city searched for, when i click the search button
searchFormEl.addEventListener('submit', function (event) {
    event.preventDefault();
    // what is the users city?
    let userInput = userInputEl.value;
    // test
    // console.log(userInput);
    getWeather(userInput);

    // call openweathermaps api to fetch the weather
    //  data for city searched for

    // return a promise and populate the DOM with data from this

    // store the city searched for in local storage and
    // append that to the search bar column
});