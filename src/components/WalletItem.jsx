import React from 'react'
import { WalletItemStyled } from './styled'
import right from '../assets/icons/right.svg'

export default function WalletItem({ name, icon, onClick }) {
    return (
        <WalletItemStyled>
            <ul>
                <li onClick={onClick}>
                    <div className="left">
                        <div>
                            <img src={icon} alt="" />
                        </div>
                        <h5>{name}</h5>
                    </div>
                    <div className="right">
                        <img src={right} alt="" />
                    </div>
                </li>
            </ul>
        </WalletItemStyled>
    )
}
