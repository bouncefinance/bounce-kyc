import React from 'react'
import { useHistory } from 'react-router-dom'
import { CardStyled } from './styled'
import { Button } from '../components/Table'
import CardHeader from './CardHeader'
import Progress from './Progress'
import { Passage } from '../components/Exhibition'

export default function Card({ status, poolId, progress, claimFun }) {

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
                    <Button type='white' value='Learn More' width='168px' callback={() => {
                        history.push(`/learn-more/${poolId}`)
                    }} />
                    <Button type='black' value='Join Auction' width='168px' callback={() => {
                        history.push(`/certified-sales/${poolId}`)
                    }} />
                </>

            case 'Upcoming':
                return <>
                    <Button type='white' value='Learn More' width='168px' callback={() => {
                        history.push(`/learn-more/${poolId}`)
                    }} />
                </>

            case 'Past':
                return <>
                    <Button type='black' value='Visit Project' width='168px' callback={() => {
                        history.push(`/certified-sales/${poolId}`)
                    }} />
                </>

            case 'proList-Active':
                return <>
                    <Button type='white' value='Learn More' width='168px' callback={() => {
                        // history.push(`/learn-more/${poolId}`)
                    }} />
                    <Button type='black' value='Support' width='168px' callback={() => {
                        // history.push(`/certified-sales/${poolId}`)
                    }} />
                </>

            case 'proList-Close':
                return <>
                    <Button type='white' value='Visit Project' width='168px' callback={() => {
                        // history.push(`/learn-more/${poolId}`)
                    }} />
                    {claimFun && <Button type='black' value='Claim support tokens back' width='240px' callback={() => {
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

                <div className="bottom">
                    {renderButton(status)}
                </div>
            </div>
        </CardStyled>
    )
}
