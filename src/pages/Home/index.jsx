import React, { useState, useContext, useEffect } from 'react'
import { HomeStyled } from './styled'
import { useWeb3React } from '@web3-react/core'
import { myContext } from '../../redux';
import { queryIsKyc } from '../../config/utils/END_FUN'
import { queryBotBalance } from '../../config/utils/BOT_FUN'
import { useVoteList } from "../CertifiedSales/hooks";
import lattice from '../../assets/images/lattice.svg'
import bule_check from '../../assets/images/bule-check.svg'
import bule_star from '../../assets/images/bule-star.svg'
import bule_people from '../../assets/images/bule-people.svg'
import logo_white from '../../assets/logo/logo-white.svg'
import { useHistory } from 'react-router-dom'

import back1 from '../../assets/images/back1.svg'
import back2 from '../../assets/images/back2.svg'
import back3 from '../../assets/images/back3.svg'
import back4 from '../../assets/images/back4.svg'
import back5 from '../../assets/images/back5.svg'
import back6 from '../../assets/images/back6.svg'

import medium from '../../assets/icons/index-medium.svg'
import twitter from '../../assets/icons/index-twitter.svg'
import telegram from '../../assets/icons/index-telegram.svg'

import video from '../../assets/video/index.mp4'
import { useIsSMDown } from '../../hooks/themeHooks';

const CertifiedSalesSteps = [{
    title: 'Certified sale application',
    desc: 'Submit project information to the voting board to apply for a certified sale'
}, {
    title: 'Community scanning and voting',
    desc: 'The community reviews your project for quality and approves the start of the best token sale'
}, {
    title: 'Multisig governance configuration',
    desc: 'Execution upon multisignature by parties involved'
}, {
    title: 'Token sale activation',
    desc: 'Your certified token sale goes live for verified user'
}]

export default function Index() {
    const [curCertifiedSalesSteps, setCurCertifiedSalesSteps] = useState(0)
    const [stepIsHover, setStepIsHover] = useState(false)
    const { account, chainId, library, active } = useWeb3React()
    const history = useHistory()
    const isSMDown = useIsSMDown();
    const [isKYC, setIsKYC] = useState(false)
    const [balance, setBalance] = useState(0)
    const { state, dispatch } = useContext(myContext);
    const { list } = useVoteList()

    const myProject = list && list.filter(item => {
        return item.status === 'Active' && item.creator && account && item.creator.toLowerCase() === account.toLowerCase()
    })[0]

    useEffect(async () => {
        if (!account || !active) return
        const isKYC = await queryIsKyc(account)
        const balance = await queryBotBalance(library, account, chainId)
        setIsKYC(isKYC)
        setBalance(balance)
    }, [account, active])

    return (
        <HomeStyled>
            <div className="page_wrapper page_one">
                <div className="main">
                    <div className="left">
                        <video
                            width={isSMDown ? '100%' : '525px'}
                            height={isSMDown ? '100%' : '525px'}
                            muted
                            src={video}
                            autoPlay='autoPlay'
                            loop='loop'
                        />
                    </div>

                    <div className="right">
                        <h1>Certified crypto auction curated <span>by the community</span></h1>
                        <p>Bounce Certified empowers the community to curate a select group of high-quality projects to conduct their public sale on the same robust and secure platform behind Bounce Finance.</p>
                        <p><span>KYC checks</span> / <span>White list sales</span> / <span>Decentralized auction managed by community DAO</span></p>

                        <button onClick={() => {
                            if (chainId !== 1 && chainId !== 4) {
                                return dispatch({
                                    type: 'MODAL',
                                    value: {
                                        name: 'CONFIRM',
                                        title: 'Bounce Decentralized',
                                        deputy: 'Please switch to Ethereum Mainnet to apply',
                                        cancel: {
                                            text: 'Not Now'
                                        }
                                    }
                                })
                            }

                            if (!isKYC) {
                                return dispatch({
                                    type: 'MODAL',
                                    value: {
                                        name: 'CONFIRM',
                                        title: 'Bounce Decentralized',
                                        deputy: 'You are not KYC certified, please authenticate before adding the vote',
                                        cancel: {
                                            text: 'Not Now'
                                        },
                                        confirm: {
                                            text: 'Go',
                                            callback: () => {
                                                dispatch({ type: 'MODAL', value: null })
                                                history.push('/kyc')
                                            }
                                        }
                                    }
                                })
                            } else if (balance < 60) {
                                return dispatch({
                                    type: 'MODAL',
                                    value: {
                                        name: 'CONFIRM',
                                        title: 'Bounce Certified Fee',
                                        deputy: `If you want to add a project vote, you must have more than 60 AUCTION. Your current balance is ${Number(balance)}, so you cannot create it`,
                                        cancel: {
                                            text: 'I Know'
                                        }
                                    }
                                })
                            } else if (myProject) {
                                return dispatch({
                                    type: 'MODAL',
                                    value: {
                                        name: 'CONFIRM',
                                        title: 'Bounce Decentralized',
                                        deputy: `You currently have a project running and cannot create two running pools`,
                                        cancel: {
                                            text: 'I Know'
                                        },
                                        confirm: {
                                            text: 'Show My Project',
                                            callback: () => {
                                                return history.push(`/learn-more/${myProject.id}`)
                                            }
                                        }
                                    }
                                })
                            } else {
                                return history.push('/applySale')
                            }
                        }}>Apply for certified sale</button>
                    </div>
                </div>
            </div>

            <div className="page_other">
                <div className="block">
                    <h3>Features</h3>
                    <ul className='Features_list'>
                        <li>
                            <div className='bg'></div>
                            <h4>
                                <img src={bule_check} alt="" />
                                KYC checks
                            </h4>
                            <p>Know-Your-Customer tools identity verification</p>
                        </li>

                        <li>
                            <div className='bg'></div>
                            <h4>
                                <img src={bule_star} alt="" />
                                White list sales
                            </h4>
                            <p>Exclusive customer sign-up for token auction</p>
                        </li>

                        <li>
                            <div className='bg'></div>
                            <h4>
                                <img src={bule_people} alt="" />
                                Decentralized auction
                            </h4>
                            <p>Auction managed by community DAO</p>
                        </li>
                    </ul>
                </div>


                <div className="block Certified">
                    <h3>Certified Sales Steps</h3>
                    <ul className="step_list" >
                        {CertifiedSalesSteps.map((item, index) => {
                            return <li
                                key={index}
                                className={curCertifiedSalesSteps === index && !stepIsHover ? 'active' : ''}
                                onMouseEnter={() => {
                                    setCurCertifiedSalesSteps(index)
                                }}
                            >
                                <h4>
                                    <i>{index + 1}</i>
                                    {item.title}
                                </h4>
                                <p>{item.desc}</p>
                            </li>
                        })}
                    </ul>
                </div>

                <div className="utility">
                    <h3>Token Utility</h3>
                    <ul className='utility_list'>
                        <li>
                            <div>
                                <i>1</i>
                                Application fee
                            </div>

                            <div>
                                <i>3</i>
                                Auction token holder exclusive sales
                            </div>
                        </li>
                        <li>
                            <div>
                                <i>2</i>
                                Project voting power
                            </div>

                            <div>
                                <i>4</i>
                                Transaction fee buy back and burn
                            </div>
                        </li>
                    </ul>
                </div>


            </div>

            <div className="started">
                <div className="started_bg" onClick={() => { return console.log(31) }}></div>
                <div className="started_main">
                    <h3>Get started to apply for certified sale with Bounce</h3>
                    <button onClick={() => { return history.push('/applySale') }}>Get Started</button>
                </div>
            </div>

            <div className="backed">
                <div className="main">
                    <h5>Backed by</h5>
                    <ul>
                        <li>
                            <img src={back1} alt="" />
                        </li>
                        <li>
                            <img src={back2} alt="" />
                        </li>
                        <li>
                            <img src={back3} alt="" />
                        </li>
                        <li>
                            <img src={back4} alt="" />
                        </li>
                        <li>
                            <img src={back5} alt="" />
                        </li>
                        <li>
                            <img src={back6} alt="" />
                        </li>
                    </ul>
                </div>
            </div>

            <div className="footer">
                <div className="main">
                    {!isSMDown && <img src={logo_white} alt="" />}
                    <div className="link">
                        <ul>
                            <li>
                                <a href="https://bouncefinance.medium.com/">
                                    <img src={medium} alt="" />
                                </a>
                            </li>

                            <li>
                                <a href="https://twitter.com/bounce_finance?s=21">
                                    <img src={twitter} alt="" />
                                </a>
                            </li>

                            <li>
                                <a href="https://t.me/bounce_finance">
                                    <img src={telegram} alt="" />
                                </a>
                            </li>
                        </ul>

                        <p>Forum</p>
                    </div>

                </div>
            </div>
        </HomeStyled>
    )
}
