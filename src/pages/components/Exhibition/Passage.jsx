import React from 'react'
import { PassageStyled } from './styled'

export default function Passage ({ title, desc, whiteLink, width, marginTop, children, color }) {
    return (
        <PassageStyled width={width} marginTop={marginTop}>
            <p className="title">{title}</p>
            <p className="desc" style={{ color: color }}>{desc}
                {whiteLink && <a href={whiteLink} target='_blank' style={{color: 'blue'}}>( Win Whitelist )</a>}
            </p>
            {children}
        </PassageStyled>
    )
}
