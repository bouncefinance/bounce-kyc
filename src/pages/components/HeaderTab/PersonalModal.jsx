import React, { useContext, useEffect, useState } from 'react'
import { PerModalStyled } from './styled'
import { useHistory } from 'react-router-dom'
import { useWeb3React } from '@web3-react/core'
import { CopyToClipboard } from 'react-copy-to-clipboard';
import copy_icon from '../../../assets/icons/copy-black.svg'
import bule_check from '../../../assets/images/bule-check.svg'
import { useVoteList } from "../../CertifiedSales/hooks";
import { queryIsKyc } from '../../../config/utils/END_FUN'
import { queryBotBalance } from '../../../config/utils/BOT_FUN'
import { myContext } from '../../../redux';

export default function PersonalModal({ show = false, userName }) {
    const history = useHistory()
    const { account, chainId, library } = useWeb3React()
    const KYC_STATUS = window.localStorage.getItem('KYC_STATUS') || 0
    const { state, dispatch } = useContext(myContext);
    const { list } = useVoteList()
    const [isKYC, setIsKYC] = useState(false)
    const [balance, setBalance] = useState(0)

    const myProject = list && list.filter(item => { return item.status === 'Active' && item.creator.toLowerCase() === account.toLowerCase() })[0]

    useEffect(async () => {
        if (!account) return
        const isKYC = await queryIsKyc(account)
        const balance = await queryBotBalance(library, account, chainId)
        setIsKYC(isKYC)
        setBalance(balance)
    }, [account])

    const handelClickLi = (type) => {
        if (!type) return
        switch (type) {
            case 'kyc':
                return history.push('/kyc')
            case 'PersonalInfo':
                return history.push('/PersonalInfo')
            case 'applySale':
                console.log(isKYC, balance)
                console.log(state)
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
                                    history.push('/kyc')
                                }
                            }
                        }
                    })
                } else if (balance < 0.3) {
                    return dispatch({
                        type: 'MODAL',
                        value: {
                            name: 'CONFIRM',
                            title: 'Bounce Decentralized',
                            deputy: `If you want to add a project vote, you must have more than 0.3 BOT. Your current balance is ${Number(balance)}, so you cannot create it`,
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
                break
            default:
                return
        }
    }


    return (
        show && <PerModalStyled>
            <div className="account">
                <div className='account_name'>
                    <h5>{userName}</h5>
                    {KYC_STATUS === '1' && <img src={bule_check} alt="" />}
                </div>
                <div className="account_address">
                    <p>{account || '0x00'} </p>
                    <CopyToClipboard
                        text={account}
                        onCopy={() => { }}>
                        <img className='ignore' src={copy_icon} alt="" />
                    </CopyToClipboard>
                </div>
            </div>
            <ul>
                {KYC_STATUS !== '1' && <li
                    onClick={() => {
                        handelClickLi('kyc')
                    }}
                >
                    <i className='kyc'></i>
                    <span>KYC</span>
                </li>}

                <li onClick={() => {
                    handelClickLi('PersonalInfo')
                }}>
                    <i className='pi'></i>
                    <span>Personal Info</span>
                </li>

                <li
                    onClick={() => { handelClickLi('applySale') }}
                >
                    <i className='acs'></i>
                    <span>{myProject ? 'Check Status' : 'Apply Certified Sale'}</span>
                </li>
            </ul>
        </PerModalStyled>
    )
}
