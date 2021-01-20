import React from 'react'
import { ButtonStyled } from './styled'

export const Button = ({ name, type, value, width, onClick }) => {
    return (
        <ButtonStyled
            name={name}
            className={type === 'white' ? 'white' : type === 'black' ? 'black' : 'default'}
            width={width}
            onClick={onClick}
        >
            {value}
        </ButtonStyled>
    )
}
