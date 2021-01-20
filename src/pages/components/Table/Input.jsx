import React, { useState } from 'react'
import { InputStyled } from './styled'

export const TextInput = ({ defaultVal, placeholder, width, marginTop, label, onChange, onValChange }) => {
    const [val, setVal] = useState(defaultVal || '')

    return (
        <InputStyled
            width={width}
            marginTop={marginTop}
        >
            {label && <p>{label}</p>}
            <input
                type='text'
                value={val}
                placeholder={placeholder}
                onChange={(e) => {

                    onChange && onChange(e)
                    const val = String(e.target.value).trim()
                    setVal(val)
                    onValChange(val)
                }} />
        </InputStyled>
    )
}
