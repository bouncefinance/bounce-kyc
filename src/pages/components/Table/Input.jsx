import React, { useEffect, useState } from 'react'
import { InputStyled, AmountStyled, TimeInputStyled } from './styled'
import { useIsSMDown } from '../../../hooks/themeHooks';

export const TextInput = ({ unit, upperCase, name, isNumber, isName, REG_rule, maxLength, disabled, defaultVal, placeholder, width, minHeight, marginTop, label, onChange, onValChange, onValueChange, isRequire = false, bottom }) => {
    const [val, setVal] = useState('')
    const [isError, setIsError] = useState(false)
    const [errMsg, setErrMsg] = useState('')
    const [sHeight, setSHeight] = useState('48px')
    const isSMDown = useIsSMDown();
    useEffect(() => {
        if (!defaultVal) return
        setVal(defaultVal)
    }, [defaultVal])

    useEffect(() => {
        if (String(val).trim() === '' && !isError) return
        onValueChange && onValueChange({
            name: name,
            value: val,
            isError: isError,
            errMsg: errMsg,
            isRequire: isRequire ? isRequire : false
        })


        if (isRequire && val === '') {
            onValChange && onValChange(null)
        } else {
            onValChange && onValChange(val)
        }

    }, [val, isError])

    const regMatch = (val) => {
        if (REG_rule) {
            const reg = new RegExp(REG_rule.reg)
            if (!reg.test(val)) {
                setErrMsg(REG_rule.msg)
                setIsError(true)
            } else {
                setErrMsg('')
                setIsError(false)
            }

        } else {
            setErrMsg('')
            setIsError(false)
        }


    }

    const wrapperName = (str) => {
        let reg = /[0-9]+/g;
        let str1 = str.replace(reg, "");
        // if (str1 === '') return ''
        let arr = str1.toLowerCase().split(" ");
        for (var i = 0; i < arr.length; i++) {
            console.log('wrapperName',arr )
            // if (arr[i][0] !== ' '){
                arr[i] = arr[i][0].toUpperCase() + arr[i].substring(1, arr[i].length);
            // }
        }
        return arr.join(" ");
    }

    const wrapperNumber = (str) => {
        let reg = /[a-zA-Z]+/g;
        let str1 = str.replace(reg, "");
        return str1
    }

    const wrapperUpperCase = (str) => {
        let reg = /[a-zA-Z]+/g;
        let str1 = str.replace(reg, (v) => {
            if (v === ' ') return
            return v.toUpperCase()
        });
        return str1
    }


    return (
        <InputStyled
            width={width}
            height={sHeight}
            marginTop={marginTop}
        >
            {label && <p>
                {label}
                {isRequire && <span className='require'>*</span>}
            </p>}

            <div className="input_area">
                <textarea
                    name={name}
                    style={{ resize: 'none', height: sHeight, minHeight: minHeight, marginBottom: bottom }}
                    className={`${val !== '' ? 'isComplete' : ''} ${isError ? 'Error' : ''}`}
                    value={val}
                    // height
                    placeholder={placeholder}
                    disabled={disabled}
                    maxLength={maxLength || 30}
                    onChange={(e) => {
                        const height = e.target.scrollHeight
                        if ((height - 1) + 'px' !== sHeight) {
                            console.log((height - 1) + 'px')
                            setSHeight((height - 1) + 'px')
                        }

                        let val = e.target.value
                        // if (isName) {
                        //     // val = String(val).trim()
                        //     val = wrapperName(val)
                        // }

                        if (isNumber) {
                            val = String(val).trim()
                            val = wrapperNumber(val)
                        }

                        if (upperCase) {
                            val = wrapperUpperCase(val)
                        }
                        regMatch(val)
                        setVal(val)
                        onChange && onChange(e)
                    }}
                    onBlur={(e) => {
                        let val = e.target.value
                        if (isRequire && String(e.target.value).trim() === '') {
                            setIsError(true)
                            setErrMsg('Please fill in this field')
                        } else if (!isError) {
                            setIsError(false)
                            setErrMsg('')
                        }
                    }}
                ></textarea>

                {unit && <p className='unit'>{unit}</p>}
            </div>
            {isError && <p className="error_msg">{errMsg}</p>}
        </InputStyled>
    )
}

export const TimeInput = ({ label, width, marginTop, onChange, defaultVal }) => {
    const [days, setDays] = useState('')
    const [hours, setHours] = useState('')
    const [minutes, setMinutes] = useState('')
    const [isError, setIsError] = useState(false)

    useEffect(() => {
        if (days === '' && hours === '' && minutes === '') return
        const err = getSeconds(days, hours, minutes) < 60 * 5 ? true : false

        setIsError(err)

        const obj = {
            days: days === '' ? 0 : days,
            hours: hours === '' ? 0 : hours,
            minutes: minutes === '' ? 0 : minutes,
            seconds: getSeconds(days, hours, minutes),
            timestamp: getSeconds(days, hours, minutes) * 1000,
            isRequire: true,
            isError: err,
            value: String(getSeconds(days, hours, minutes))
        }


        onChange && onChange(obj)
    }, [days, hours, minutes])

    useEffect(() => {
        if (!defaultVal) return
        console.log(defaultVal)
        const day = parseInt(defaultVal / (24 * 60 * 60))
        const hour = parseInt((defaultVal / (60 * 60))) % 24
        const minute = parseInt(defaultVal / 60) % 60

        day && setDays(day)
        hour && setHours(hour)
        minute && setMinutes(minute)

    }, [])

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
        {label && <p>
            {label}
            {<span className='require'>*</span>}
        </p>}

        <div className="input_box">
            <input type="number" name='Days' placeholder='Days' value={days} onChange={(e) => {
                let val = String(e.target.value).trim()
                val = parseFloat(val).toString()
                if (val !== 'NaN') {
                    if (val > 6) {
                        val = 6
                    } else if (val < 1) {
                        val = 0
                    }
                    setDays(val)
                } else {
                    setDays(0)
                }
            }} />
            <input type="number" name='Hours' placeholder='Hours' value={hours} onChange={(e) => {
                let val = String(e.target.value).trim()
                val = parseFloat(val).toString()
                if (val !== 'NaN') {
                    if (val > 23) {
                        val = 23
                    } else if (val < 1) {
                        val = 0
                    }
                    setHours(val)
                } else {
                    setHours(0)
                }
            }} />
            <input type="number" name='Minutes' placeholder='Minutes' value={minutes} onChange={(e) => {
                let val = String(e.target.value).trim()
                val = parseFloat(val).toString()
                if (val !== 'NaN') {
                    if (val > 58) {
                        val = 59
                    } else if (val < 1) {
                        val = 0
                    }
                    setMinutes(val)
                } else {
                    setMinutes(0)
                }
            }} />
        </div>

        {isError && <p className="error_msg">5 minutes minimum input</p>}
    </TimeInputStyled>
}

export const AmountInput = ({ placeholder, width, defaultVal, onChange, maxValue }) => {
    const [inputVal, setInputVal] = useState(defaultVal || '')
    const [isError, setIsError] = useState(false)
    const [errMsg, setErrmsg] = useState('')

    useEffect(() => {
        onChange && onChange({
            isRequire: true,
            isError: isError,
            value: inputVal
        })
    }, [inputVal])

    return <AmountStyled
        width={width || '100px'}
    >
        <input
            type="number"
            value={inputVal}
            className={isError ? 'error' : ''}
            placeholder={placeholder}
            onChange={(e) => {
                let val = e.target.value
                if (maxValue && parseFloat(val) > maxValue) {
                    val = maxValue
                }
                setInputVal(val)
            }}

            onBlur={(e) => {
                const val = e.target.value
                if (String(val).trim() === '') {
                    setIsError(true)
                    setErrmsg('Please Enter')
                }
            }}
        />

        {isError && <p className='errMsg'>{errMsg}</p>}
    </AmountStyled>
}