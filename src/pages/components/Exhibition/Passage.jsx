import React from 'react'
import { PassageStyled } from './styled'

export default function Passage({ title, desc, width, marginTop, children }) {
    return (
        <PassageStyled width={width} marginTop={marginTop}>
            <p className="title">{title}</p>
            <p className="desc">{desc}</p>
            {children}
        </PassageStyled>
    )
}
