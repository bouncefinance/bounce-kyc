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
import { useActiveWeb3React, getContract } from "../../../web3";
import { useIsSMDown } from '../../../hooks/themeHooks';
import menu from '../../../assets/mobile/menu.svg';
import logo_white from '../../../assets/logo/logo-sigle-white.svg';
import MenuModal from './MenuModal';
import BouncePro from "../../../web3/abi/BouncePro.json";
import { BOUNCE_PRO } from "../../../web3/address";

export default function Index() {
    const { state, dispatch } = useContext(myContext)
    const history = useHistory()
    const [curTab, setCurTab] = useState(history.location.pathname === '/' ? '/home' : history.location.pathname)
    // console.log(curTab)
    const { active, account, library, chainId } = useActiveWeb3React()
    const [userName, setUserName] = useState('undefined');
    const [mobileMenu, setMobileMenu] = useState(false);
    const [isKYC, setIsKYC] = useState(false)
    const isSMDown = useIsSMDown();

    useEffect(() => {
        // 设置cookie
        const isShowTip = getCookie('isShowTip')
        // console.log(isShowTip)
        if (isShowTip === '') {
            dispatch({
                type: 'MODAL',
                value: {
                    name: 'KYC_TIP',
                    confirm: {
                        text: 'Confirm',
                        callback: () => {
                            window.document.cookie = 'isShowTip = true'
                            dispatch({
                                type: 'MODAL',
                                value: null
                            })
                        }
                    }
                }
            })

        }
    }, [])

    useEffect(() => {
        if (!account || !active) return
        checkKYC(account)
    }, [account, active])

    const renderConnectBtn = () => {
        return active ? <div
            className="personal ignore"
            onClick={() => {
                if (chainId !== 1 && chainId !== 4) {
                    return dispatch({
                        type: 'MODAL',
                        value: {
                            name: 'CONFIRM',
                            title: 'Bounce Certified Warning',
                            deputy: `If the auction requires KYC identification, please switch to Ethereum Mainnet to complete KYC before participating in the auction `,
                            cancel: {
                                text: 'I Know'
                            }
                        }
                    })
                }
                dispatch({
                    type: "SHOW_PER",
                    value: !state.isShowPersonal
                })
            }}
        /> : <Button
                type='black'
                width='130px'
                height='36px'
                value='Connect Wallet'
                style={{ fontSize: 14, marginLeft: '32px' }}
                onClick={() => {
                    // if (active === undefined || (chainId !== 1 && chainId !== 4)) return
                    dispatch({
                        type: 'CONNECT_WALLET',
                        value: true
                    })
                }}
            />
    }

    const checkKYC = async (account) => {
        console.log('tag---->', account, active)
        const params = {
            "accountaddress": account
        }

        axios.post(HOST_API.queryKycByAccount, params).then(res => {
            // console.log(res)
            if (res.status === 200 && res.data.code === 1) {
                // const { status, username, ifincontract } = res.data.data
                const { status, username } = res.data.data
                window.localStorage.setItem('KYC_STATUS', status)
                // window.localStorage.setItem('KYC_IC', ifincontract)
                setUserName(username)
            } else {
                window.localStorage.setItem('KYC_STATUS', 0)
                // window.localStorage.setItem('KYC_IC', 0)
            }
        }).catch(err => {
            window.localStorage.setItem('KYC_STATUS', 0)
            // window.localStorage.setItem('KYC_IC', 0)
        })

        try {
            const BouncePro_CT = getContract(library, BouncePro.abi, BOUNCE_PRO(chainId))
            BouncePro_CT.methods.kyclist(account).call().then(res => {
                console.log('isKYC', res)
                setIsKYC(res)
            })
        } catch (error) {
            console.log('isKYC', error)
        }
    }

    return (
        <HeaderTabStyled>
            <div className="container">
                <div className="left">
                    <img style={{ cursor: 'pointer' }} onClick={() => { return window.location.href = '/' }} src={isSMDown ? logo_white : logo_black} alt="bounce logo" />
                </div>
                {!isSMDown &&
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

                                            if (item.route === '/certified-sales') {
                                                return dispatch({
                                                    type: 'MODAL',
                                                    value: {
                                                        name: 'CONFIRM',
                                                        title: 'Bounce Decentralized',
                                                        deputy: 'This function is being maintained and upgraded, so stay tuned！comming soon...',
                                                        cancel: {
                                                            text: 'I Know'
                                                        }
                                                    }
                                                })
                                            }
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
                }
                {isSMDown &&
                    <>

                        <div className="right">
                            {active && renderConnectBtn()}
                            <img src={menu} alt="" onClick={() => { setMobileMenu(true) }} className="menu" />
                        </div>
                        {mobileMenu && <MenuModal setMobileMenu={setMobileMenu} show={mobileMenu} />}
                    </>
                }
                <PersonalModal show={state.isShowPersonal} userName={userName} isKYC={isKYC} />
            </div>
        </HeaderTabStyled>
    )
}









function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i].trim();
        if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
    }
    return "";
}
