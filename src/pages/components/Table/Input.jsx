import React, { useEffect, useState } from 'react'
import { InputStyled, InputAreaStyled, TimeInputStyled } from './styled'

export const TextInput = ({ unit, upperCase, name, isNumber, isName, REG_rule, maxLength, disabled, defaultVal, placeholder, width, minHeight, marginTop, label, onChange, onValChange, onValueChange, isRequire = false }) => {
    const [val, setVal] = useState('')
    const [isError, setIsError] = useState(false)
    const [errMsg, setErrMsg] = useState('')
    const [sHeight, setSHeight] = useState('48px')

    useEffect(() => {
        if (!defaultVal) return
        setVal(defaultVal)
    }, [defaultVal])

    useEffect(() => {
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
        if (str1 === '') return ''
        let arr = str1.toLowerCase().split(" ");
        for (var i = 0; i < arr.length; i++) {
            arr[i] = arr[i][0].toUpperCase() + arr[i].substring(1, arr[i].length);
        }
        return arr.join(" ");
    }

    const wrapperNumber = (str) => {
        let reg = /[\D]+/g;
        let str1 = str.replace(reg, "");
        return str1
    }

    const wrapperUpperCase = (str) => {
        let reg = /[a-zA-Z]+/g;
        let str1 = str.replace(reg, (v) => {
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
                    style={{ resize: 'none', height: sHeight, minHeight: minHeight }}
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
                        if (isName) {
                            val = wrapperName(val)
                        }

                        if (isNumber) {
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

export const TextAreaInput = ({ REG_rule, name, defaultVal, placeholder, width, height, marginTop, label, onChange, onValChange, isRequire }) => {
    const [val, setVal] = useState('')

    useEffect(() => {
        if (!defaultVal) return
        setVal(defaultVal)
    }, [defaultVal])

    const regMatch = (val) => {
        if (REG_rule) {
            console.log(REG_rule)
        }
        return true
    }

    return (
        <InputAreaStyled
            width={width}
            height={height}
            marginTop={marginTop}
        >
            {label && <p>
                {label}
            </p>}
            <textarea
                name={name}
                cols="30"
                rows="10"
                value={val}
                placeholder={placeholder}
                onChange={(e) => {
                    const val = String(e.target.value).trim()
                    if (!regMatch(val)) return
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
            isError: err
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
                        val = 24
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