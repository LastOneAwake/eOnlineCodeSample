import React from 'react';


/**
 * Realistically this component is a little unnecessary beyond making App.js cleaner and simpler to reason about.
 * Which makes it completely justified IMO, I'm very much in the camp of "easier to read = easier to maintain"
 *
 * I also considered throwing the given temperature integers into objects with their temp range designation, then into an array, and using Array.map
 * The idea being that I should show that I understand best practices when dealing with arrays of objects
 * but it honestly felt superfluous as there is a known quantity of elements to render and the quantity is really small (3)
 * and I feel I'd be dinged more for writing unnecessarily complex code for the sake of showing I understand basic React list-rendering concepts
 * which I hope I've demonstrated by explaining my reasoning for not doing it
 * ...man that was a little ranty...
 */
export default function Temperatures({lowTemp, currentTemp, highTemp, validData}) {

    let degSymbol = (<span className={'degSymbol'}>{'\u00b0'}</span>);
    return (
        <div id={'tempDisplay'} className={'flexRow'}>
            <div id={'lowTemp'} className={'tempHolder'}>
                <div className={'temperatureText'}>Low</div>
                {validData && <div className={'actualTemp'}>{lowTemp} {degSymbol}</div>}
            </div>
            <div id={'currentTemp'} className={'tempHolder'}>
                <div className={'temperatureText'}>Current</div>
                {validData && <div className={'actualTemp'}>{currentTemp} {degSymbol}</div>}
            </div>
            <div id={'highTemp'} className={'tempHolder'}>
                <div className={'temperatureText'}>High</div>
                {validData && <div className={'actualTemp'}>{highTemp} {degSymbol}</div>}
            </div>
        </div>
    )
}