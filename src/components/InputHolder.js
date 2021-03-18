import React, {useState} from 'react';

export default function InputHolder({fetchWeatherData, validZip}) {
    const [inputValue, updateInputValue] = useState('');

    function onSubmit(e) {
        e.preventDefault();
        e.stopPropagation();
        if (!inputValue.length) {
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
                                return
                            }
                            if (!isNaN(val)) {
                                updateInputValue(val)
                            } else if (!val.length) {
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