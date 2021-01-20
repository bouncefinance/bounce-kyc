import React, { useContext } from 'react'
import { myContext } from '../../../redux'
import { ConfirmStyled } from './styled'
import cancel_img from '../../../assets/images/cancel.svg'
import { Button } from '../../components/Table'

export default function Confirm({ title, desc, tip, cancel, confirm }) {
    const { dispatch } = useContext(myContext)

    const handelCancel = () => {
        dispatch({
            type: 'MODAL',
            value: null
        })
    }

    return (
        <ConfirmStyled>
            <div className="top">
                <h1 className="title">{title}</h1>
                <img src={cancel_img} alt="" onClick={handelCancel} />
            </div>
            <div className="main">
                {desc && <h2>{desc}</h2>}
                {tip && <p>{tip}</p>}
            </div>
            <div className="bottom">
                {cancel && <Button type='white' value={cancel && cancel.text} width='124px' onClick={handelCancel} />}
                <Button type='black' value={confirm && confirm.text} width='124px' onClick={confirm && confirm.callback} />
            </div>
        </ConfirmStyled>
    )
}
