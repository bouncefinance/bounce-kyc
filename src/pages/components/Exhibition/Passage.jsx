import React from 'react'
import { PassageStyled } from './styled'

export default function Passage({ title, desc, width, marginTop, children, color }) {
    return (
        <PassageStyled width={width} marginTop={marginTop}>
            <p className="title">{title}</p>
            <p className="desc" style={{color:  color}}>{desc}</p>
            {children}
        </PassageStyled>
    )
}
