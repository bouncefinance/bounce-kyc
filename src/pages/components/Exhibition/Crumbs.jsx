import React from 'react'
import { CrumbsStyled } from './styled'

export default function Crumbs({ list, active }) {
    return (
        <CrumbsStyled>
            <ul>
                {list.map((item, index) => {
                    return <li
                        key={index}
                        className={item.active ? 'active' : ''}
                    >{item.name}</li>
                })}
            </ul>
        </CrumbsStyled>
    )
}
