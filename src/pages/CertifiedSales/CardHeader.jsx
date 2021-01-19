import React from 'react'
import { CardHeaderStyled } from './styled'

import facebook from '../../assets/icons/facebook.svg'
import telegram from '../../assets/icons/telegram.svg'
import twitter from '../../assets/icons/twitter.svg'
import github from '../../assets/icons/github.svg'

const iconMap = {
    facebook, telegram, twitter, github
}

export default function CardHeader({ title = 'Untitled', socialLink = [] }) {
    return (
        <CardHeaderStyled>
            <div className="title">
                <div className='head_img'></div>
                <h2>{title}</h2>
            </div>
            <ul>
                {socialLink.map((item, index) => {
                    return <li key={index}>
                        <a href={item.link} key={index}>
                            <img src={iconMap[item.name]} alt="" />
                        </a>
                    </li>
                })}
            </ul>
        </CardHeaderStyled>
    )
}
