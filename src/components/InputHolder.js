import React, {useState} from 'react';

export default function InputHolder({fetchWeatherData, validZip}) {
    const [inputValue, updateInputValue] = useState('');

    return (
        <div id={'inputHolder'} className={'centeredChildren'} >
            <form
                className={'flexColumn centeredChildren'}
                onSubmit={e => {
                    //handling for enter press
                    e.preventDefault();
                    e.stopPropagation();
                    fetchWeatherData(inputValue)
                }}>
                <div id={'inputs'}>
                    <input
                        placeholder={'Zip Code'}
                        className={validZip ? '' : 'invalid'}
                        name={'zipInput'}
                        type={'text'}
                        value={inputValue}
                        onChange={e => {
                            if (e.target.value.length > 5) {
                                return;
                            }
                            let val = parseInt(e.target.value);
                            if (val.length > 5) {
                                return
                            }
                            !isNaN(val) ? updateInputValue(val) : (val.length ? updateInputValue(inputValue) : updateInputValue(''));

                        }}
                    />
                    <button
                        onClick={(e) => {
                            //handling for enter press, as this will fire on the form's onSubmit function
                            e.preventDefault();
                            e.stopPropagation();
                            fetchWeatherData(inputValue)
                        }}
                    >
                        Update
                    </button>
                </div>
            </form>
        </div>
    )
}