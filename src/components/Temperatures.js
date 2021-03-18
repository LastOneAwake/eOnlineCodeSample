import React, {useState} from 'react';

export default function Temperatures({lowTemp, currentTemp, highTemp, validData}) {

    return (
        <div id={'tempDisplay'} className={'flexRow'}>
            <div id={'lowTemp'} className={'tempHolder'}>
                <div className={'temperatureText'}>Low</div>
                {validData &&
                <div className={'actualTemp'}>{lowTemp} <span className={'degSymbol'}>{'\u00b0'}</span></div>
                }

            </div>
            <div id={'currentTemp'} className={'tempHolder'}>
                <div className={'temperatureText'}>Current</div>
                {validData &&
                <div className={'actualTemp'}>{currentTemp} <span className={'degSymbol'}>{'\u00b0'}</span></div>
                }
            </div>
            <div id={'highTemp'} className={'tempHolder'}>
                <div className={'temperatureText'}>High</div>
                {validData &&
                <div className={'actualTemp'}>{highTemp} <span className={'degSymbol'}>{'\u00b0'}</span></div>
                }
            </div>
        </div>
    )
}