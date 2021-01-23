import React, { useEffect, useState } from 'react'
import { InputStyled, InputAreaStyled, TimeInputStyled } from './styled'

export const TextInput = ({ maxLength, disabled, defaultVal, placeholder, width, height, marginTop, label, onChange, onValChange, isRequire = false }) => {
    const [val, setVal] = useState('')
    const [isError, setIsError] = useState(false)

    useEffect(() => {
        if (!defaultVal) return
        setVal(defaultVal)
    }, [defaultVal])

    return (
        <InputStyled
            width={width}
            height={height}
            marginTop={marginTop}
        >
            {label && <p>{label}</p>}
            <input
                type='text'
                className={`${val !== '' ? 'isComplete' : ''} ${isError ? 'Error' : ''}`}
                value={val}
                placeholder={placeholder}
                disabled={disabled}
                maxLength={maxLength}
                onChange={(e) => {
                    const val = String(e.target.value).trim()
                    setVal(val)
                    if (isRequire && val === '') {
                        onValChange && onValChange(null)
                    } else {
                        onValChange && onValChange(val)
                    }

                    onChange && onChange(e)
                }} />
            {isError && <p className="error_msg">incorrectly filled in field.</p>}
        </InputStyled>
    )
}


export const TextAreaInput = ({ name, defaultVal, placeholder, width, height, marginTop, label, onChange, onValChange, isRequire }) => {
    const [val, setVal] = useState('')

    useEffect(() => {
        if (!defaultVal) return
        setVal(defaultVal)
    }, [defaultVal])

    return (
        <InputAreaStyled
            width={width}
            height={height}
            marginTop={marginTop}
        >
            {label && <p>{label}</p>}
            <textarea
                name={name}
                cols="30"
                rows="10"
                value={val}
                placeholder={placeholder}
                onChange={(e) => {
                    const val = String(e.target.value).trim()
                    setVal(val)
                    if (isRequire && val === '') {
                        onValChange && onValChange(null)
                    } else {
                        onValChange && onValChange(val)
                    }

                    onChange && onChange(e)
                }}
            />
        </InputAreaStyled>
    )
}

export const TimeInput = ({ label, width, marginTop, onChange }) => {
    const [days, setDays] = useState('')
    const [hours, setHours] = useState('')
    const [minutes, setMinutes] = useState('')

    useEffect(() => {
        const obj = {
            days: days === '' ? 0 : days,
            hours: hours === '' ? 0 : hours,
            minutes: minutes === '' ? 0 : minutes,
            seconds: getSeconds(days, hours, minutes),
            timestamp: getSeconds(days, hours, minutes) * 1000
        }

        onChange && onChange(obj)
    }, [days, hours, minutes])

    const getSeconds = (days = 0, hours = 0, minutes = 0) => {
        const s1 = days * 24 * 60 * 60
        const s2 = hours * 60 * 60
        const s3 = minutes * 60

        return s1 + s2 + s3
    }

    return <TimeInputStyled
        width={width}
        marginTop={marginTop}
    >
        {label && <p>{label}</p>}

        <div className="input_box">
            <input type="number" name='Days' placeholder='Days' value={days} onChange={(e) => {
                const val = String(e.target.value).trim()
                if (val !== '') {
                    setDays(parseFloat(val))
                } else {
                    setDays(0)
                }
            }} />
            <input type="number" name='Hours' placeholder='Hours' value={hours} onChange={(e) => {
                const val = String(e.target.value).trim()
                if (val !== '') {
                    setHours(parseFloat(val))
                } else {
                    setHours(0)
                }
            }} />
            <input type="number" name='Minutes' placeholder='Minutes' value={minutes} onChange={(e) => {
                const val = String(e.target.value).trim()
                if (val !== '') {
                    setMinutes(parseFloat(val))
                } else {
                    setMinutes(0)
                }
            }} />
        </div>
    </TimeInputStyled>
}