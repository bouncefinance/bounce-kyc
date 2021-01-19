import React from 'react'
import { CsStyled } from './styled'
import Card from './Card'

export default function Index() {
    return (
        <CsStyled>
            <Card status='Active' poolId={1} />
            <Card status='Upcoming' poolId={2} />
            <Card status='Past' poolId={3} />   
            <Card />
        </CsStyled>
    )
}
