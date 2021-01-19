import React from 'react'
import { ButtonStyled } from './styled'

export const Button = ({ name, type, value, width, callback }) => {
    return (
        <ButtonStyled
            name={name}
            className={type === 'white' ? 'white' : type === 'black' ? 'black' : 'default'}
            width={width}
            onClick={(e) => {
                e.preventDefault()
                callback && callback()
            }}
        >
            {value}
        </ButtonStyled>
    )
}
