/*jshint esversion:6 */

const https = require('https');
const http = require('http');

const apiKey = "ff4d93ace0ddac0f11291de81bd1dd1b";
const cityId = "";

const weather = process.argv.slice(2);
getWeather(weather[0], weather[1]);



//Function for handling error messages throughout the app
function printError(error) {
    console.error(error.message);
}


//Fetching and printing the weather data
function getWeather(city, state) {
    let requestURL = "";
    if (isNaN(city)) {
        if (state != null) {
            requestURL = `https://api.openweathermap.org/data/2.5/weather?q=${city},${state}&appid=${apiKey}`;
        } else {
            requestURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
        }
    } else {
        requestURL = `https://api.openweathermap.org/data/2.5/weather?id=${city}&appid=${apiKey}`;
    }
    try {
        const request = https.get(requestURL, response => {
            if (response.statusCode === 200) {
                let body = "";
                response.on('data', data => {
                    body += data.toString();
                });
                response.on('end', () => {
                    try {
                        const weatherData = JSON.parse(body);
                        console.log(`Current temperature in ${weatherData.name} is ${(weatherData.main.temp - 273.15).toFixed(1)}°C`);
                    } catch (error) {
                        printError(error);
                    }
                });
            } else {
                const message = `There was an error getting the weather data for the id ${city}(${http.STATUS_CODES[response.statusCode]})`;
                const statusCodeError = new Error(message);
                printError(statusCodeError);
            }
        });
        request.on('error', printError);
    } catch (error) {
        printError(error);
    }
}