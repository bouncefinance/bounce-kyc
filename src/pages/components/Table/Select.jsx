import React, { useState, useEffect } from 'react'
import { SelectStyled } from './styled'
import icon_down from '../../../assets/icons/down.svg'

export const Select = ({ isRequire, label, width, options = [], onChange, defaultVal }) => {
    const [isPull, setIsPull] = useState(false)
    const [selOption, setSelOption] = useState(null)

    useEffect(() => {
        if (selOption === null) return
        if (options.length === 0) return
        onChange && onChange(options[selOption])
    }, [selOption])

    useEffect(() => {
        if (options.length === 0 && !defaultVal && selOption) return

        // console.log(options,defaultVal )
        options.forEach((item, index) => {
            if (defaultVal && ((defaultVal.name !== undefined && item.name === defaultVal.name) || (defaultVal.value !== undefined && item.value === defaultVal.value))) {
                return setSelOption(index)
            }
        })
    }, [defaultVal, options])

    return (
        <SelectStyled
            width={width}
        >
            {label && <p>{label}
                {isRequire && <span>*</span>}
            </p>}

            <div className='sel_wrapper'>
                <div className="input" onClick={() => {
                    setIsPull(!isPull)
                }}>
                    <span>{options[selOption] ? options[selOption].name : ''}</span>
                    <img className={isPull ? 'up' : 'down'} src={icon_down} alt="" />
                </div>
                {isPull && <ul className='options'>
                    {options.map((item, index) => {
                        return <li
                            key={index}
                            className={index === selOption ? 'active' : ''}
                            onClick={() => {
                                setSelOption(index)
                                setIsPull(false)
                            }}>
                            {item.name}
                        </li>
                    })}
                </ul>}
            </div>
        </SelectStyled>
    )
}
