import React from 'react'
import { TextStyled } from './styled'

export const Text = ({ label, desc, children, marginTop }) => {
    return (
        <TextStyled marginTop={marginTop}>
            {label && <p className='label'>{label}</p>}
            {desc && <p className='desc'>{desc}</p>}

            {children}
        </TextStyled>
    )
}
