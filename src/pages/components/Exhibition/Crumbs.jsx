import React from 'react'
import { CrumbsStyled } from './styled'

export default function Crumbs ({ list, onClick }) {
    return (
        <CrumbsStyled>
            <ul>
                {list.map((item, index) => {
                    return <li
                        key={index}
                        className={item.active ? 'active' : ''}
                        onClick={() => {
                            item.onClick && item.onClick()
                        }}
                    >{item.name}</li>
                })}
            </ul>
        </CrumbsStyled>
    )
}
