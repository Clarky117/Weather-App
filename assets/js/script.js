// store api key in variable
apiKey = '178a897e3808941aa91acb0d5fe8d92b'

// get elements via document.get by id
let searchFormEl = document.getElementById('search-form');
let userInputEl = document.getElementById('user-search');

// get city searched for, when i click the search button
searchFormEl.addEventListener('submit', function(event){
    event.preventDefault(); 
    // what is the users city?
    let userInput = userInputEl.value;
    // test
    console.log(userInput);
    
    // call openweathermaps api to fetch the weather
    //  data for city searched for
    
    // return a promise and populate the DOM with data from this
    
    // store the city searched for in local storage and
    // append that to the search bar column
});