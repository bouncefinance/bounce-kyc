import React from 'react'
import { ButtonStyled } from './styled'

export const Button = ({ name, type, value, width, height, onClick, style, disabled }) => {
    return (
        <ButtonStyled
            name={name}
            disabled={disabled}
            className={`${type === 'white' ? 'white' : type === 'black' ? 'black' : 'default'}
                ${disabled ? 'disabled' : ''}
            `}
            width={width}
            height={height}
            style={style}
            onClick={(e) => {
                e.preventDefault()
                onClick && onClick()
            }}
        >
            {value}
        </ButtonStyled>
    )
}
