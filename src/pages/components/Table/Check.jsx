import React, { useState, useEffect } from 'react'
import { RadioStyled } from './styled'
import icon_radio from '../../../assets/images/radio.svg'
import icon_radio_sel from '../../../assets/images/radio_sel.svg'

export const Radio = ({ label, width, onChange, options = [], defaultIndex = 0 }) => {
    const [curSel, setCurSel] = useState(defaultIndex)

    useEffect(() => {
        onChange && onChange(options[curSel])
    }, [curSel])

    return (
        <RadioStyled width={width}>
            {label && <p>{label}</p>}

            <ul>
                {options.map((item, index) => {
                    return <li
                        key={index}
                        onClick={() => {
                            setCurSel(index)
                        }}>
                        <img src={curSel === index ? icon_radio_sel : icon_radio} alt="" />
                        <span>{item.name}</span>
                        {item.append && curSel === index && item.append}
                    </li>
                })}
            </ul>
        </RadioStyled>
    )
}
