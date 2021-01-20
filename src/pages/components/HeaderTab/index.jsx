import React, { useContext, useState } from 'react'
import { HeaderTabStyled } from './styled'
import logo_black from '../../../assets/logo/logo-black.svg'
import { headerMenu } from './config'
import { useHistory } from 'react-router-dom'
import PersonalModal from './PersonalModal'
import { myContext } from '../../../redux'

export default function Index() {
    const { dispatch } = useContext(myContext)
    const history = useHistory()
    const [curTab, setCurTab] = useState(history.location.pathname)
    const [isPerModal, setIsPerModal] = useState(false)  // show personal modal

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
                                        // window.open(item.link)
                                    }
                                    setCurTab(item.route)
                                }}>
                                <h5>{item.name}</h5>
                            </li>
                        })}
                    </ul>

                    <div
                        className="personal"
                        onClick={() => { setIsPerModal(!isPerModal) }}
                    ></div>
                </div>
                <PersonalModal show={isPerModal} />
            </div>
        </HeaderTabStyled>
    )
}
