import React, { useState } from 'react'
import { LearnMoreStyle } from './styled'
import CardHeader from '../CardHeader'
import { Passage } from '../../components/Exhibition'
import { TextInput, Button } from '../../components/Table'
import Progress from '../Progress'


export default function Index() {
    const [isSupport, setIsSupport] = useState(false)
    const [curTab, setCurTab] = useState(0)
    const tabMenu = ['Project Info', 'Team Info', 'Token Metrics']

    const renderInfo = (tab) => {
        switch (tab) {
            case 'Project Info':
                return <>
                    <Passage
                        width='480px'
                        title='Technical highlight'
                        desc='Active Project Name is a blockchain project.
                        There should be some description about this active project.
                        4 line maximum for this section.' />

                    <Passage
                        width='480px'
                        title='Architecture'
                        desc='Active Project Name is a blockchain project.
                        There should be some description about this active project.
                        4 line maximum for this section.' />
                </>


            case 'Team Info':
                return <>
                    <Passage
                        width='480px'
                        title='Technical highlight'
                        desc='Active Project Name is a blockchain project. There should be some description about this active project. 4 line maximum for this section. Active Project Name is a blockchain project. There should be some description about this active project. 4 line maximum for this section. Active Project Name is a blockchain project. There should be some description about this active project. 4 line maximum for this section.
                        Active Project Name is a blockchain project. There should be some description about this active project. 4 line maximum for this section. Active Project Name is a blockchain project. There should be some description about this active project. 4 line maximum for this section. Active Project Name is a blockchain project. There should be some description about this active project. 4 line maximum for this section.' />
                </>

            case 'Token Metrics':
                return <>
                    <Passage
                        width='480px'
                        title='Total supply'
                        desc='100' />

                    <Passage
                        width='480px'
                        title='Initial circulating supply'
                        desc='100' />

                    <Passage
                        width='480px'
                        title='Token ticketer'
                        desc='BOT' />

                    <Passage
                        width='480px'
                        title='Token contract address'
                        desc='0x33a9b7ed8c71c6910fb4a9bc41de2391b74c2976' />

                    <Passage
                        width='480px'
                        title='Token distribution'
                        desc='Bounce is a decentralized auction platform, incorporating liquidity mining, decentralized governance and staking mechanisms. The first principle of Bounce is scarcity of resources, which creates a competitive swap environment.
                        Bounce is a decentralized auction platform, incorporating liquidity mining, decentralized governance and staking mechanisms. The first principle of Bounce is scarcity of resources, which creates a competitive swap environment.' />

                    <Passage
                        width='480px'
                        title='Token lockup schedule'
                        desc='Bounce is a decentralized auction platform, incorporating liquidity mining, decentralized governance and staking mechanisms. The first principle of Bounce is scarcity of resources, which creates a competitive swap environment.
                        Bounce is a decentralized auction platform, incorporating liquidity mining, decentralized governance and staking mechanisms. The first principle of Bounce is scarcity of resources, which creates a competitive swap environment.' />
                </>
            default:
                return <></>
        }
    }

    return (
        <LearnMoreStyle>
            <CardHeader title='Bounce Project' socialLink={[
                { name: 'github', link: '#' },
                { name: 'facebook', link: '#' },
                { name: 'telegram', link: '#' },
                { name: 'twitter', link: '#' },
            ]} />

            <div className="main">
                <div className="left">
                    <Passage
                        title='Project summary'
                        desc='Bounce is a decentralized auction platform, incorporating liquidity mining, decentralized governance and staking mechanisms. The first principle of Bounce is scarcity of resources, which creates a competitive swap environment.' />

                    <a href="http://bounceproject.com">bounceproject.com</a>

                    {isSupport && <div className='support'>
                        <div className="progress">
                            <Progress
                                title='Support from community:'
                                status='success'
                                plan={0.7}
                                value='100 BOT'
                                total='200 BOT'
                            />
                        </div>
                        <TextInput placeholder='Enter your vote amount' width='288px' />
                        <Button type='black' value='Support' width='180px' />
                    </div>}
                </div>

                <div className="right">
                    <Passage
                        title='Theme'
                        desc='Auction theme' />
                    <Passage
                        title='Whitepaper' />
                    <a href="http://bounceproject.com">bounceproject.com</a>
                </div>


            </div>
            {!isSupport && <div className='btn_group'>
                <Button type='black' value='Join Auction' width='180px' onClick={() => {
                    setIsSupport(true)
                }} />
            </div>}

            <div className="info_wrapper">
                <ul className='tab_menu'>
                    {tabMenu.map((item, index) => {
                        return <li
                            key={index}
                            className={index === curTab ? 'active' : ''}
                            onClick={() => {
                                setCurTab(index)
                            }}
                        >{item}</li>
                    })}
                </ul>
                <div className="show_info">
                    {renderInfo(tabMenu[curTab])}
                </div>
            </div>
        </LearnMoreStyle>
    )
}
