import React, { useContext, useEffect, useState } from 'react';
import { MenuModalStyled } from './styled';
import { useHistory } from 'react-router-dom';
import logo_sigle from '../../../assets/logo/logo-sigle.svg';
import close from '../../../assets/icons/close-white.svg';
import { headerMenu } from './config';
import { myContext } from '../../../redux';
import { useActiveWeb3React } from "../../../web3";
import { Button } from '../Table'



export default function MenuModal({ show = false,setMobileMenu }) {
    const history = useHistory()
    const [curTab, setCurTab] = useState(history.location.pathname === '/' ? '/home' : history.location.pathname)
    const { state, dispatch } = useContext(myContext);
    const { active, account } = useActiveWeb3React();

    const handelClickLi = (type) => {
       
    }
    const renderConnectBtn = () => {

        return active ? <div></div> : <Button
                type='black'
                width='130px'
                height='36px'
                value='Connect Wallet'
                className="connect"
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
        show && 
        <MenuModalStyled>
            <div className="account">
                <img onClick={() => { return window.location.href = '/' }}  src={logo_sigle} alt="bounce logo"  />
                <img src={close}  onClick={() => {setMobileMenu(false)}} alt="" />
            </div>
            <div className="right"  id="right">
                <ul>
                    {headerMenu.map((item, index) => {
                        return <li
                            key={index}
                            className={item.route && curTab && curTab.indexOf(item.route) !== -1 ? 'active' : ''}
                            onClick={() => {
                                setMobileMenu(false)
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
                <div  onClick={() => { setMobileMenu(false)}} className="cancel">
                    Close
                </div>
            </div>
        </MenuModalStyled>
    )
}
