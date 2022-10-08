# Weather-App

A simple Weather App using the Open Weather Maps server-side API.<br><br>

## Key Points

As a traveller on the go it is imperitive to know the weather conditions of a particular place you are thinking of visiting so that you can plan for the future and know what to pack, or even if it is a place worth going to at the current time based on mother nature.
<br><br>

## Skills Used

When creating this app the first element was designing the layout using bootstrap and the relevant classes to create a similar design and style to that of the mock up image.<br><br>

Once this was done it was time to register an account on https://openweathermap.org/ and identify which API out of their numerous listed ones would be best suited. Unfortunately there was not a one size fits all solution, but there indeed was a solution. By initially searching a city in one API we can then store the latitude and longtitude as variable and pass them to another API call which then gives us all the relevant data that we need to populate the DOM.<br><br>

Now that we can search for our city and fetch all the relevant data, it is time to give the nasty little uv index a background colour to distinguish its severity. I simply did this by writing a tidy little function with if/else statements, and pulled the colours from a simple google image search and using the colour dropper from the chrome dev tools to get the hex attribute.<br><br>

When the user searches a city it is stored as a series of secondary buttons underneath the search element, and with the help of my tutor have made it so when you click on the button, you are again presented with the weather data of that city<br><br>

## Site Visual

![weather-app](/assets/images/weather-app.png)<br>

## Links to Repository and Deployed Site

- Repository - https://github.com/Clarky117/Weather-App
- Live URL - https://clarky117.github.io/Weather-App/
