# Weather Map App
**Hosted:** https://maggie-weathermap-app.netlify.app

This is a weather map app to show the 5 day weather forecast in the users location. 

## Development Process
I utilize at least 2 different endpoints of the Open Weather Map API, ``Current Weather Data`` as well as ``5 Day / 3 Hour Forecast``. <p>

The forecast is provided in 3 hour blocks, meaning the api sends 8 different temperature forecasts per day, The ``high`` that is displayed is the highest temperature forecasted for that day, while the ``low`` is the lowest temperature forecasted for that day. 
I chose a single time everyday that will be used as the condition for the day. Which is indicated as the 'Current Conditions' as today, and the forecast as the next 5 days.

I got the weather icons provided by the API; you can read more about it [here](https://openweathermap.org/weather-conditions).

All temperatures are provided in Kelvin by default Which required me to pass a parameter to the endpoint to request a different temperature unit. 

## How to Use
You only need to allow your browser to access your location to use this app. The app will then do the rest, displaying the weather in your area.
