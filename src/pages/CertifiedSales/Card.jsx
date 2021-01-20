import React, { useContext, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { CardStyled } from './styled'
import { TextInput } from '../components/Table'
import { Button } from '../components/Table'
import CardHeader from './CardHeader'
import Progress from './Progress'
import { Passage } from '../components/Exhibition'
import { myContext } from '../../redux'

export default function Card({ status, poolId = 0, progress, claimFun, isVote }) {
    const [isSupport, setIsSupport] = useState(false)
    const { dispatch } = useContext(myContext)
    const history = useHistory()

    const renderStatus = (status) => {
        switch (status) {
            case 'Active':
                return <span className='Active'>Active Sales</span>

            case 'Upcoming':
                return <span className='Upcoming'>Upcoming Sales</span>

            case 'Past':
                return <span className='Past'>Past Sales</span>
            default:
                return <></>
        }
    }

    const renderButton = (status) => {
        switch (status) {
            case 'Active':
                return <>
                    <Button type='white' value='Learn More' width='168px' onClick={() => {
                        history.push(`/learn-more/${poolId}`)
                    }} />
                    <Button type='black' value='Join Auction' width='168px' onClick={() => {
                        setIsSupport(true)
                    }} />
                </>

            case 'Upcoming':
                return <>
                    <Button type='white' value='Learn More' width='168px' onClick={() => {
                        history.push(`/learn-more/${poolId}`)
                    }} />
                </>

            case 'Past':
                return <>
                    <Button type='black' value='Visit Project' width='168px' onClick={() => {
                        history.push(`/certified-sales/${poolId}`)
                    }} />
                </>

            case 'proList-Active':
                return <>
                    <Button type='white' value='Learn More' width='168px' onClick={() => {
                        history.push(`/learn-more/${poolId}`)
                    }} />
                    <Button type='black' value='Support' width='168px' onClick={() => {
                        setIsSupport(true)
                    }} />
                </>

            case 'proList-Close':
                return <>
                    <Button type='white' value='Visit Project' width='168px' onClick={() => {
                        // history.push(`/learn-more/${poolId}`)
                    }} />
                    {claimFun && <Button type='black' value='Claim support tokens back' width='240px' onClick={() => {
                        // history.push(`/certified-sales/${poolId}`)
                    }} />}
                </>

            default:
                return <></>
        }
    }

    return (
        <CardStyled>
            <div className="status">
                {renderStatus(status)}
                {/* <span>Active Sales</span> */}
            </div>
            <div className="main">
                <CardHeader title='Active Project Name' socialLink={[
                    { name: 'facebook', link: '#' },
                    { name: 'telegram', link: '#' },
                    { name: 'twitter', link: '#' },
                ]} />

                <div className="middle">
                    <div className="left">
                        {isVote && <span className='vote'>You Voted</span>}
                        <Passage
                            title='Project details'
                            desc='Active Project Name is a blockchain project.
                            There should be some description about this active project.
                            4 line maximum for this section.'/>

                        <a href="http://activeprojectname.com">activeprojectname.com</a>

                        <Passage
                            title='Time Left'
                            desc='0d : 32h : 12m : 10s' />

                        {progress && <Progress
                            width='480px'
                            status={progress.status}
                            plan={progress.plan}
                            value={progress.value}
                            total={progress.total}
                        />}

                        {isSupport && status !== 'proList-Close' && <div className='support'>
                            <TextInput placeholder='Enter your vote amount' width='288px' />
                            <Button type='black' value='Support' width='180px' onClick={() => {
                                dispatch({
                                    type: 'MODAL',
                                    value: {
                                        name: 'SUPPORT'
                                    }
                                })
                            }} />
                        </div>}
                    </div>

                    <div className="right">
                        <Passage
                            title='Auction Type'
                            desc='Fixed-swap auction' />

                        <Passage
                            title='Participant'
                            desc='Public' />

                        <Passage
                            title='Requirement'
                            desc='KYC' />
                    </div>
                </div>

                {!isSupport && <div className="bottom">
                    {renderButton(status)}
                </div>}
            </div>
        </CardStyled>
    )
}
