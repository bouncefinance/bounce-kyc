import React from 'react'
import { SupportStyled } from './styled'
import cancel_img from '../../../assets/images/cancel.svg'
import { Button } from '../../components/Table'

export default function Approve({ cancel, onConfirm, amount, symbol, projectName, loading, done }) {
    return (
        <SupportStyled>
            <div className="top">
                <h1 className="title">Approve {symbol} </h1>
                <img src={cancel_img} alt="" onClick={cancel} />
            </div>
            <div className="main">
                <h2>{amount} {symbol}</h2>
                <p>Are you sure you want to approve for {projectName}?</p>
            </div>
            <div className="bottom">
                <Button type='white' value='Not Now' width='124px' onClick={cancel} />
                <Button disabled={loading || done} type='black' value={done? 'approved' : loading? 'approving...' : 'I’m Sure'} width='124px' onClick={onConfirm}/>
            </div>
        </SupportStyled>
    )
}
