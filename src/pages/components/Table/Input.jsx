import React, { useEffect, useState } from 'react'
import { InputStyled, InputAreaStyled, TimeInputStyled } from './styled'

export const TextInput = ({ name, isName, REG_rule, maxLength, disabled, defaultVal, placeholder, width, height, marginTop, label, onChange, onValChange, onValueChange, isRequire = false }) => {
    const [val, setVal] = useState('')
    const [isError, setIsError] = useState(false)
    const [errMsg, setErrMsg] = useState('')

    useEffect(() => {
        if (!defaultVal) return
        setVal(defaultVal)
    }, [defaultVal])

    useEffect(() => {
        onValueChange && onValueChange({
            name: name,
            value: val,
            isError: isError,
            isRequire: isRequire ? isRequire : false
        })


        if (isRequire && val === '') {
            onValChange && onValChange(null)
        } else {
            onValChange && onValChange(val)
        }

    }, [val, isError])

    const regMatch = (val, isRequire) => {
        if (String(val).length === 0) {
            if (isRequire) {
                setErrMsg('This is a mandatory field')
                setIsError(true)
            } else {
                setErrMsg('')
                setIsError(false)
            }
        } else if (REG_rule) {
            REG_rule.forEach((item, _index) => {
                let { msg, reg: rule } = item
                const reg = new RegExp(rule)
                if (!reg.test(val)) {
                    setErrMsg(msg)
                    setIsError(true)
                } else {
                    setErrMsg('')
                    setIsError(false)
                }
            })

        } else {
            setErrMsg('')
            setIsError(false)
        }


    }

    const wrapperName = (str) => {
        // let reg = /[0-9]+ |~ |! |@|#|$|￥|%|^|&|_|\)|\*|\\|\?|-|\+|=|<|>|:|"|{|}|;|'|\[|]|·|~|！|@|￥|%|…|（|）|—|《|》|？|：|“|”|【|】|、|；|‘|'|，|。|、|]/g;
        let reg = /[0-9]+/g;
        let str1 = str.replace(reg, "");
        if (str1 === '') return ''
        let arr = str1.toLowerCase().split(" ");
        for (var i = 0; i < arr.length; i++) {
            arr[i] = arr[i][0].toUpperCase() + arr[i].substring(1, arr[i].length);
        }
        return arr.join(" ");
    }

    return (
        <InputStyled
            width={width}
            height={height}
            marginTop={marginTop}
        >
            {label && <p>
                {label}
                {isRequire && <span className='require'>*</span>}
            </p>}
            <input
                type='text'
                className={`${val !== '' ? 'isComplete' : ''} ${isError ? 'Error' : ''}`}
                value={val}
                placeholder={placeholder}
                disabled={disabled}
                maxLength={maxLength}
                onChange={(e) => {
                    let val = String(e.target.value).trim()
                    if (isName) {
                        val = wrapperName(val)
                    }
                    regMatch(val)
                    setVal(val)
                    onChange && onChange(e)
                }} />
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