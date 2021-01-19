import React from 'react'
import { CardStyled } from './styled'
import facebook from '../../assets/icons/facebook.svg'
import telegram from '../../assets/icons/telegram.svg'
import twitter from '../../assets/icons/twitter.svg'

export default function Card({ }) {
    return (
        <CardStyled>
            <div className="status">
                <span>Active Sales</span>
            </div>
            <div className="main">
                <div className="top">
                    <div className="title">
                        <div className='head_img'></div>
                        <h2>Active Project Name</h2>
                    </div>
                    <ul>
                        <li>
                            <a href="#">
                                <img src={facebook} alt="" />
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <img src={telegram} alt="" />
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <img src={twitter} alt="" />
                            </a>
                        </li>
                    </ul>
                </div>
           
                <div className="middle">
                    <div className="left">
                        
                    </div>
                </div>
           
           </div>
        </CardStyled>
    )
}
