import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { LearnMoreStyle } from './styled'
import CardHeader from '../CardHeader'
import { Passage } from '../../components/Exhibition'
import { TextInput, Button } from '../../components/Table'
import Progress from '../Progress'
import { useParams } from 'react-router-dom'
import { useVoteListByPoolId } from '../hooks'
import Crumbs from '../../components/Exhibition/Crumbs'
import BigNumber from "bignumber.js";
import { numToWei, weiToNum } from "../../../utils/numberTransform";
import { useTokenBalance } from "../../../hooks/useBalance";
import {
    cancelStatus,
    confirmStatus,
    errorStatus,
    initStatus,
    pendingStatus,
    successStatus, successVotedStatus,
    TxModal
} from "../../../components/common/TXModal";
import { ModalLayout } from "../../components/Modal/styled";
import Support from "../../components/Modal/Support";
import { getContract, useActiveWeb3React } from "../../../web3";
import bounceERC20 from "../../../web3/abi/bounceERC20.json";
import { BOT, BOUNCE_PRO_VOTING } from "../../../web3/address";
import BounceProVoting from "../../../web3/abi/BounceProVoting.json";
import { HOST } from '../../../config/request_api'


export default function Index() {
    const history = useHistory()
    const { poolId } = useParams()
    const pool = useVoteListByPoolId(poolId)
    const proInfo = pool.proInfo
    const { balance } = useTokenBalance()
    const [supporting, setSupporting] = useState(false)
    const [value, setValue] = useState()
    const [bidStatus, setBidStatus] = useState(initStatus)
    const { account, library, chainId, active } = useActiveWeb3React()

    // const { prosummary, whitepaperlink, protheme, techhighlight, architecture } = useVoteListByPoolId(poolId)
    const [isSupport, setIsSupport] = useState(false)
    const [curTab, setCurTab] = useState(0)
    const tabMenu = ['Project Info', 'Team Info', 'Token Metrics']
    console.log('proInfo', proInfo)
    useEffect(() => {
        console.log(proInfo)
    }, [proInfo])

    const onVote = async () => {
        setSupporting(false)
        const tokenContract = getContract(library, bounceERC20.abi, BOT(chainId))
        const bounceContract = getContract(library, BounceProVoting.abi, BOUNCE_PRO_VOTING(chainId))
        const weiAmount = numToWei(value);

        setBidStatus(confirmStatus);
        try {
            await tokenContract.methods.approve(
                BOUNCE_PRO_VOTING(chainId),
                weiAmount,
            )
                .send({ from: account });
            bounceContract.methods.vote(pool.id, weiAmount)
                .send({ from: account })
                .on('transactionHash', hash => {
                    setBidStatus(pendingStatus)
                })
                .on('receipt', (_, receipt) => {
                    console.log('bid fixed swap receipt:', receipt)
                    setBidStatus(successVotedStatus)
                })
                .on('error', (err, receipt) => {
                    setBidStatus(errorStatus)
                })
        } catch (e) {
            console.log('bid---->', e)
            if (e.code === 4001) {
                setBidStatus(cancelStatus)
            } else {
                setBidStatus(errorStatus)
            }
        }

    }


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
                onClick: () => {
                    history.push('/certified-sales')
                }
            }, {
                name: 'Bounce Project',
                active: true
            }]} />
            <LearnMoreStyle>
                {pool.proInfo && <CardHeader title={pool && pool.proInfo && pool.proInfo.proname} logo={HOST + '/' + pool.proInfo.prologourl} socialLink={[
                    { name: 'facebook', link: pool.proInfo.fackbook },
                    { name: 'telegram', link: pool.proInfo.telegram },
                    { name: 'twitter', link: pool.proInfo.twitter },
                    { name: 'github', link: pool.proInfo.githublink },
                    { name: 'medium', link: pool.proInfo.medium }
                ]} />}

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
                                    status={pool && pool.status}
                                    plan={pool && new BigNumber(pool.totalVotes).dividedBy('200000000000000000000').dividedBy('100')}
                                    value={pool && `${weiToNum(pool.totalVotes)} BOT`}
                                    total={pool && pool.total}
                                />
                            </div>
                            <TextInput onValChange={(value) => {
                                console.log('value', value)
                                setValue(value)
                            }} placeholder={`Enter your vote amount ${weiToNum(balance)} BOT`} width='100%' bottom={'10px'} />
                            <Button disabled={new BigNumber(numToWei(value)).isGreaterThan(balance)} type='black'
                                value={new BigNumber(numToWei(value)).isGreaterThan(balance) ? `Insufficient BOT` : 'Support'}
                                width='180px' onClick={() => {
                                    setSupporting(true)
                                }} />
                            <Button type='white' value='Back' width='180px' onClick={() => {
                                setIsSupport(false)
                            }} />

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
                    <Button type='black' value='Support' width='180px' onClick={() => {
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


            <TxModal modalStatus={bidStatus} onDismiss={() => {
                setBidStatus(initStatus)
            }} />

            {supporting && (
                <ModalLayout className='layout' onClick={(e) => {
                    e.stopPropagation()
                }}>
                    <Support onConfirm={onVote} cancel={() => setSupporting(false)} amount={value} />
                </ModalLayout>
            )}
        </>
    )
}
