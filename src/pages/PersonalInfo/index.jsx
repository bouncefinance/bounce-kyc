import React, { useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { PerInfoStyled } from './styled'
import copy_black from '../../assets/icons/copy-black.svg'
import kyc_img from '../../assets/images/kyc.svg'
import { TextInput, Button, Text } from '../components/Table'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import axios from 'axios'
import API from '../../config/request_api'
import { useWeb3React } from '@web3-react/core'
import { myContext } from '../../redux'

export default function Index() {
    const { dispatch } = useContext(myContext)
    const history = useHistory()
    const { account } = useWeb3React()
    const [showInfo, setShowInfo] = useState({
        username: '',
        emailaddr: '',
        bounceid: '0'
    })

    useEffect(() => {
        if (!account) return
        const params = {
            accountaddress: account
        }

        axios.post(API.queryKycByAccount, params).then(res => {
            if (res.status === 200 && res.data.code === 1) {
                const data = res.data.data
                setShowInfo(data)
            }
        }).catch(err => {
            console.log(err)
        })
    }, [account])


    const handelSubmit = () => {
        const params = showInfo
        if (account && params.bounceid !== 0) {
            axios.post(API.KYC, params).then(res => {
                if (res.status === 200 && res.data.code === 1) {

                    dispatch({
                        type: 'MODAL',
                        value: {
                            name: 'CONFIRM',
                            title: 'Message',
                            deputy: 'Information modified successfully',
                            confirm: {
                                text: 'Confirm',
                                callback: () => {
                                    window.location.reload()
                                }
                            }
                        }
                    })
                } else {
                    dispatch({
                        type: 'MODAL',
                        value: {
                            name: 'CONFIRM',
                            title: 'Message',
                            deputy: 'Please verify your KYC identity first',
                            cancel: {
                                text: 'Not Now'
                            },
                            confirm: {
                                text: 'Go',
                                callback: () => {
                                    window.location.reload()
                                }
                            }
                        }
                    })
                }
            }).catch(err => {
                console.log(err)
            })
        }
    }

    return (
        <PerInfoStyled>
            <div className="main">
                <div className="top">
                    <h1>Personal Info</h1>
                    <div className="address">
                        <CopyToClipboard
                            text={account}
                            onCopy={() => { }}
                        >
                            <div className='copy_address'>
                                <p>{account}</p>
                                <img src={copy_black} alt="" />
                            </div>
                        </CopyToClipboard>
                    </div>
                </div>

                <div className="bottom">
                    <div className="left">
                        <img src={kyc_img} alt="" />
                    </div>

                    <div className="right">
                        <TextInput
                            label='Profile Name'
                            placeholder='Enter Profile Name'
                            marginTop='0px'
                            defaultVal={showInfo.username}
                            onValChange={(val) => {
                                setShowInfo({
                                    ...showInfo,
                                    username: val
                                })
                            }}
                        />
                        <TextInput
                            label='Email'
                            placeholder='Enter your email'
                            defaultVal={showInfo.emailaddr}
                            onValChange={(val) => {
                                setShowInfo({
                                    ...showInfo,
                                    emailaddr: val
                                })
                            }}
                        />
                        <Text label='Bounce Certified ID'>
                            <CopyToClipboard
                                text={showInfo.bounceid}
                                onCopy={() => { }}
                            >
                                <div className='CertifiedId'>
                                    {showInfo.bounceid === '0' ?
                                        <>
                                            <p>Need to have a KYC to get an ID.
                                                <span onClick={() => {
                                                    history.push('/kyc')
                                                }}>Click here to start</span>
                                            </p>
                                        </> :
                                        <>
                                            <p>{showInfo.bounceid}</p>
                                            <img src={copy_black} alt="" />
                                        </>}
                                </div>
                            </CopyToClipboard>
                        </Text>
                        <div className="btn_group">
                            <Button type='white' value='Cancel' width='164px' onClick={() => {
                                history.goBack(-1)
                            }} />
                            <Button type='black' value='Save' width='164px' onClick={handelSubmit} />
                        </div>
                    </div>
                </div>
            </div>
        </PerInfoStyled>
    )
}
