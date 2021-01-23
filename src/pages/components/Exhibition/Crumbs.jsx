import React from 'react'
import { CrumbsStyled } from './styled'

export default function Crumbs() {
    return (
        <CrumbsStyled>
            <ul>
                <li>Apply Certified Sales</li>
                <li>General information</li>
                <li className='active'>Details</li>
            </ul>
        </CrumbsStyled>
    )
}
