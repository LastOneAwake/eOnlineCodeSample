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

    // I'm using \u00A0 for &nbsp; so as to take up the space w/out having to fill it with something.
    let weatherDescription = '\u00A0';
    //temperature vals passed to the Temperatures component.
    let currentTempInt = null, highTempInt = null, lowTempInt = null, iconURL = null;
    if (validData) {
        [weatherDescription, lowTempInt, currentTempInt, highTempInt] = [weatherData.weather[0].description, parseInt(weatherData.main.temp_min), parseInt(weatherData.main.temp), parseInt(weatherData.main.temp_max),];
        console.log(weatherData.weather[0].icon);
        iconURL = 'http://openweathermap.org/img/wn/' + weatherData.weather[0].icon + '@2x.png';
    }
    return (
        <div id={'weatherApp'}>
            <div id={'weatherHeader'} className={'flexColumn centeredChildren'}>
                <div>Weather {iconURL && <img src={iconURL} alt={'icon displaying ' + weatherDescription}/>} </div>
                <div id={'headerSubtitle'}>no matter the weather we'll weather together {'<3'}</div>
            </div>
            <InputHolder
                fetchWeatherData={fetchWeatherData}
                verifiedZip={verifiedZip}
            />
            <div id={'topText'}>
                {(!validData) && <span>Please enter a <span id={'forRealsies'} className={!verifiedZip ? 'invalid' : ''}>for-realsies</span> zip code </span>}
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
