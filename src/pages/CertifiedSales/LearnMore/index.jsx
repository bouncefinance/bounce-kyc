import React, { useState, useEffect } from 'react'
import {useHistory} from 'react-router-dom'
import { LearnMoreStyle } from './styled'
import CardHeader from '../CardHeader'
import { Passage } from '../../components/Exhibition'
import { TextInput, Button } from '../../components/Table'
import Progress from '../Progress'
import { useParams } from 'react-router-dom'
import { useVoteListByPoolId } from '../hooks'
import Crumbs from '../../components/Exhibition/Crumbs'


export default function Index() {
    const history = useHistory()
    const { poolId } = useParams()
    const { proInfo } = useVoteListByPoolId(poolId)
    // const { prosummary, whitepaperlink, protheme, techhighlight, architecture } = useVoteListByPoolId(poolId)
    const [isSupport, setIsSupport] = useState(false)
    const [curTab, setCurTab] = useState(0)
    const tabMenu = ['Project Info', 'Team Info', 'Token Metrics']

    useEffect(() => {
        console.log(proInfo)
    }, [proInfo])

    const renderInfo = (tab) => {
        switch (tab) {
            case 'Project Info':
                return <>
                    <Passage
                        width='480px'
                        title='Technical highlight'
                        desc={proInfo && proInfo.techhighlight} />

                    <Passage
                        width='480px'
                        title='Architecture'
                        desc={proInfo && proInfo.architecture} />
                </>


            case 'Team Info':
                return <>
                    <Passage
                        width='480px'
                        title='Team'
                        desc={proInfo && proInfo.teambio} />
                </>

            case 'Token Metrics':
                return <>
                    <Passage
                        width='480px'
                        title='Total supply'
                        desc={proInfo && proInfo.totalsupply} />

                    <Passage
                        width='480px'
                        title='Initial circulating supply'
                        desc={proInfo && proInfo.circulatingsupply} />

                    <Passage
                        width='480px'
                        title='Token ticketer'
                        desc={proInfo && proInfo.tokenticketer} />

                    <Passage
                        width='480px'
                        title='Token contract address'
                        desc={proInfo && proInfo.tokencontractaddress} />

                    <Passage
                        width='480px'
                        title='Token distribution'
                        desc={proInfo && proInfo.tokendistribution} />

                    <Passage
                        width='480px'
                        title='Token lockup schedule'
                        desc={proInfo && proInfo.tokenlookupschedule} />
                </>
            default:
                return <></>
        }
    }

    return (
        <>
            <Crumbs list={[{
                name: 'Active sales',
                onClick: ()=>{
                    history.push('/certified-sales')
                }
            }, {
                name: 'Bounce Project',
                active: true
            }]} />
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
                            desc={proInfo && proInfo.prosummary} />

                        <a href={proInfo && proInfo.whitepaperlink}>{proInfo && proInfo.whitepaperlink}</a>

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
                            desc={proInfo && proInfo.protheme} />
                        <Passage
                            title='Whitepaper' />
                        <a href={proInfo && proInfo.whitepaperlink}>{proInfo && proInfo.whitepaperlink}</a>
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
        </>
    )
}
