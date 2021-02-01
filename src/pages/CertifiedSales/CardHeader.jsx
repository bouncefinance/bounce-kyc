import React from 'react'
import { CardHeaderStyled } from './styled'

import facebook from '../../assets/icons/facebook.svg'
import telegram from '../../assets/icons/telegram.svg'
import twitter from '../../assets/icons/twitter.svg'
import github from '../../assets/icons/github.svg'
import medium from '../../assets/icons/medium.svg'
import {useIsSMDown} from '../../utils/themeHooks';

const iconMap = {
    facebook, telegram, twitter, github, medium
}

export default function CardHeader({ title = 'Untitled', socialLink = [], logo }) {
    const isXSDown = useIsSMDown();
    console.log(logo)
    return (
        <CardHeaderStyled>
            <div className="title">
                <img src={logo} className='head_img'></img>
                <h2>{title}</h2>
            </div>
            {!isXSDown && 
                <ul>
                    {socialLink.filter(item => { return (item.link && item.link !== '') }).map((item, index) => {
                        return <li key={index}>
                            <a href={item.link} key={index}>
                                <img src={iconMap[item.name]} alt="" />
                            </a>
                        </li>
                    })}
                </ul>
                }
        </CardHeaderStyled>
    )
}
