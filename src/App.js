import './App.css';
import React, {useState} from 'react';
import InputHolder from './components/InputHolder'
import Temperatures from './components/Temperatures'


function App() {
    //a verified zip is one that the API has verified and returned data for.
    // this value is solely used for managing the state of the visual indicator that the zip is invalid
    const [verifiedZip, updateVerifiedZip] = useState(true);
    const [validData, updateValidData] = useState(false);
    const [weatherData, updateWeatherData] = useState({});

    function fetchWeatherData(inputValue) {
        fetch('http://api.openweathermap.org/data/2.5/weather?zip=' + inputValue + '&units=imperial&appid=4f8fd3bf8b9dfe9bfb6125a43f44c012')
            .then(response => response.json())
            .then(data => {
                if (data.cod && data.cod === '404') {
                    updateValidData(false);
                    updateVerifiedZip(false);
                    updateWeatherData({});
                } else {
                    updateWeatherData(data);
                    updateVerifiedZip(true);
                    updateValidData(true);
                }
            });
    }

    //locally used text variables, using \u00A0 for &nbsp; so as to take up the space w/out having to fill it with something.
    let topText = 'Please Enter a for-realsies zip code', weatherDescription = '\u00A0';
    //temp vals passed to the Temperatures component
    let currentTempInt = null, highTempInt = null, lowTempInt = null;
    //a verified zip is our validator, this is because the api will let us know if the zip is verified and if so we'll have all the data available
    if (validData) {
        [topText, weatherDescription, lowTempInt, currentTempInt, highTempInt] = [weatherData.name, weatherData.weather[0].description, parseInt(weatherData.main.temp_min), parseInt(weatherData.main.temp), parseInt(weatherData.main.temp_max),];
    }
    return (
        <div id={'weatherApp'}>
            <InputHolder
                fetchWeatherData={fetchWeatherData}
                verifiedZip={verifiedZip}
            />
            <div id={'topText'}>
                {(!validData) && <span>Please Enter a  <span id={'forRealsies'} className={!verifiedZip ? 'invalid' : ''}>for-realsies</span> zip code </span>}
                {validData && weatherData.name}
            </div>
            <div id={'desc'} className={'flexRow centeredChildren'}>{weatherDescription}</div>
            <Temperatures
                lowTemp={lowTempInt}
                currentTemp={currentTempInt}
                highTemp={highTempInt}
                validData={validData}
            />
        </div>
    );
}

export default App;
