import './App.css';
import React, {useState, useEffect} from 'react';
import InputHolder from './components/InputHolder'
import Temperatures from './components/Temperatures'


function App() {
    const [validZip, updateValidZip] = useState(false);
    const [weatherData, updateWeatherData] = useState({});
    function fetchWeatherData(inputValue) {
        fetch('http://api.openweathermap.org/data/2.5/weather?zip=' + inputValue + '&units=imperial&appid=4f8fd3bf8b9dfe9bfb6125a43f44c012')
            .then(response => response.json())
            .then(data => {
                if (data.cod && data.cod === '404') {
                    updateValidZip(false);
                } else {
                    updateWeatherData(data);
                    updateValidZip(true);
                }
            })
        ;
    }
    let topText = 'Please Enter a for-realsies zip code', weatherDescription = '\u00A0', currentTempInt = '', highTempInt = '', lowTempInt = '';
    if (validZip) {
        [topText, weatherDescription, lowTempInt, currentTempInt, highTempInt] = [weatherData.name, weatherData.weather[0].description, parseInt(weatherData.main.temp_min), parseInt(weatherData.main.temp), parseInt(weatherData.main.temp_max), ];
    }
    return (
        <div id={'weatherApp'}>
            <InputHolder
                fetchWeatherData={fetchWeatherData}
                validZip={validZip}
            />
            <div id={'topText'}>{topText}</div>
            <div id={'desc'} className={'flexRow centeredChildren'}>{weatherDescription}</div>
            <Temperatures
                lowTemp={lowTempInt}
                currentTemp={currentTempInt}
                highTemp={highTempInt}
                validData={validZip}
            />
        </div>
    );
}

export default App;
