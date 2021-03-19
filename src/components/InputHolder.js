import React, {useState} from 'react';

/**
 *
 */
export default function InputHolder({fetchWeatherData, validZip}) {
    const [inputValue, updateInputValue] = useState('');

    function onSubmit(e) {
        e.preventDefault();
        e.stopPropagation();
        if (inputValue.length < 5) {
            // We would generally wait for the API to validate the zip code, but if it's less than 5 digits long we know off the bat that it's not a valid zip.
            return;
        }
        fetchWeatherData(inputValue)
    }

    return (
        <div id={'inputHolder'} className={'centeredChildren'}>
            <form
                className={'flexColumn centeredChildren'}
                onSubmit={e => onSubmit(e)}
            >
                <div id={'inputs'}>
                    <input
                        placeholder={'Zip Code'}
                        className={validZip ? '' : 'invalid'}
                        name={'zipInput'}
                        type={'text'}
                        value={inputValue}
                        onChange={e => {
                            let val = e.target.value;
                            if (val.length > 5) {
                                //US Zip Codes are 5 digits in length, so I'm disallowing anything longer than that
                                return;
                            }
                            if (!isNaN(val)) {
                                //we only accept numbers as valid inputs for the zip code
                                updateInputValue(val)
                            } else if (!val.length) {
                                //this is to account for backspaces at a singular digit left, otherwise the user cannot remove the first character
                                updateInputValue('')
                            }

                        }}
                    />
                    <button
                        onClick={e => onSubmit(e)}
                    >
                        Update
                    </button>
                </div>
            </form>
        </div>
    )
}