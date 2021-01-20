import React, { useContext, useState, useEffect } from 'react'
import { HeaderTabStyled } from './styled'
import { useWeb3React } from "@web3-react/core";
import logo_black from '../../../assets/logo/logo-black.svg'
import { headerMenu } from './config'
import { useHistory } from 'react-router-dom'
import PersonalModal from './PersonalModal'
import { myContext } from '../../../redux'
import { Button } from '../Table'

export default function Index() {
    const { state, dispatch } = useContext(myContext)
    const history = useHistory()
    const [curTab, setCurTab] = useState(history.location.pathname)
    const [isPerModal, setIsPerModal] = useState(false)  // show personal modal
    const { account, active, chainId } = useWeb3React()

    // useEffect(() => {
    //     setIsPerModal(active)
    // }, [account, state])

    const renderConnectBtn = () => {

        return active ? <div
            className="personal"
            onClick={() => { setIsPerModal(!isPerModal) }}
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

    return (
        <HeaderTabStyled>
            <div className="container">
                <div className="left">
                    <img src={logo_black} alt="bounce logo" />
                </div>
                <div className="right">
                    <ul>
                        {headerMenu.map((item, index) => {
                            return <li
                                key={index}
                                className={curTab === item.route ? 'active' : ''}
                                onClick={() => {
                                    if (item.route) {
                                        history.push(item.route)
                                    } else if (item.isConfirm) {
                                        dispatch({
                                            type: 'MODAL',
                                            value: {
                                                name: 'CONFIRM',
                                                title: 'Jump to remind',
                                                desc: 'You will be directed to Bounce decentralized platform.',
                                                tip: item.link,
                                                cancel: {
                                                    text: 'Cancel'
                                                },
                                                confirm: {
                                                    text: 'Confirm',
                                                    callback: () => {
                                                        window.open(item.link)
                                                    }
                                                }
                                            }
                                        })
                                    }
                                    setCurTab(item.route)
                                }}>
                                <h5>{item.name}</h5>
                            </li>
                        })}
                    </ul>
                    {renderConnectBtn()}
                </div>
                <PersonalModal show={isPerModal} />
            </div>
        </HeaderTabStyled>
    )
}
