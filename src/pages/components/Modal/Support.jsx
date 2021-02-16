import React from 'react'
import { SupportStyled } from './styled'
import cancel_img from '../../../assets/images/cancel.svg'
import { Button } from '../../components/Table'

export default function Support({ cancel, onConfirm, amount }) {
    return (
        <SupportStyled>
            <div className="top">
                <h1 className="title">Stake to support</h1>
                <img src={cancel_img} alt="" onClick={cancel} />
            </div>
            <div className="main">
                <h2>{amount} Auction</h2>
                <p>Are you sure you want to support for Bounce Project?</p>
            </div>
            <div className="bottom">
                <Button type='white' value='Not Now' width='124px' onClick={cancel} />
                <Button type='black' value='I’m Sure' width='124px' onClick={onConfirm}/>
            </div>
        </SupportStyled>
    )
}
