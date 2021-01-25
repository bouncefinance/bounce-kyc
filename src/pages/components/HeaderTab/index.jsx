import React, { useContext, useState, useEffect } from 'react'
import { HeaderTabStyled } from './styled'
import logo_black from '../../../assets/logo/logo-black.svg'
import { headerMenu } from './config'
import { useHistory } from 'react-router-dom'
import PersonalModal from './PersonalModal'
import { myContext } from '../../../redux'
import { Button } from '../Table'
import axios from 'axios'
import HOST_API from '../../../config/request_api'
import { useActiveWeb3React } from "../../../web3";


export default function Index() {
    const { state, dispatch } = useContext(myContext)
    const history = useHistory()
    const [curTab, setCurTab] = useState(history.location.pathname)
    const { active, account } = useActiveWeb3React()
    const [userName, setUserName] = useState('undefined')


    useEffect(() => {
        if (!account) return
        checkKYC(account)
    }, [account])

    const renderConnectBtn = () => {

        return active ? <div
            className="personal ignore"
            onClick={() => {
                dispatch({
                    type: "SHOW_PER",
                    value: !state.isShowPersonal
                })
            }}
        ></div> : <Button
                type='black'
                width='130px'
                height='36px'
                value='Connect Wallet'
                style={{ fontSize: 14, marginLeft: '32px' }}
                onClick={() => {
                    if (active === undefined) return
                    dispatch({
                        type: 'CONNECT_WALLET',
                        value: true
                    })
                }}
            />
    }

    const checkKYC = (account) => {
        const params = {
            "accountaddress": account
        }

        axios.post(HOST_API.queryKycByAccount, params).then(res => {
            // console.log(res)
            if (res.status === 200 && res.data.code === 1) {
                const { status, username } = res.data.data
                window.localStorage.setItem('KYC_STATUS', status)
                setUserName(username)
            } else {
                window.localStorage.setItem('KYC_STATUS', 0)
            }
        }).catch(err => {
            window.localStorage.setItem('KYC_STATUS', 0)
        })
    }

    return (
        <HeaderTabStyled>
            <div className="container">
                <div className="left">
                    <img style={{ cursor: 'pointer' }} onClick={() => { return window.location.href = '/' }} src={logo_black} alt="bounce logo" />
                </div>
                <div className="right">
                    <ul>
                        {headerMenu.map((item, index) => {
                            return <li
                                key={index}
                                className={item.route && curTab && curTab.indexOf(item.route) !== -1 ? 'active' : ''}
                                onClick={() => {
                                    if (item.isConfirm) {
                                        dispatch({
                                            type: 'MODAL',
                                            value: {
                                                name: 'CONFIRM',
                                                title: 'Bounce Decentralized',
                                                deputy: 'You will be directed to Bounce Decentralized platform',
                                                cancel: {
                                                    text: 'Not Now'
                                                },
                                                confirm: {
                                                    text: 'Confirm',
                                                    callback: () => {
                                                        window.open(item.link)
                                                    }
                                                }
                                            }
                                        })
                                    } else if (item.route) {
                                        history.push(item.route)
                                    }
                                    setCurTab(item.route)
                                }}>
                                <h5>{item.name}</h5>
                            </li>
                        })}
                    </ul>
                    {renderConnectBtn()}
                </div>
                <PersonalModal show={state.isShowPersonal} userName={userName} />
            </div>
        </HeaderTabStyled>
    )
}
