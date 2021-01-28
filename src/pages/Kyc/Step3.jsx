import React, { useState, useEffect, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { TextInput, Form, Button, Upload } from '../components/Table'
import axios from 'axios'
import { useWeb3React } from '@web3-react/core'
import API_HOST from '../../config/request_api'
import { myContext } from '../../redux'
import Web3 from "web3";
import icon_plaint from '../../assets/images/plaint.svg'
import useAxios from '../../hooks/useAxios'

export default function Step1({ curStep, setCurStep, ReqData, setReqData }) {
    const {sign_Axios} = useAxios()
    const history = useHistory()
    const { dispatch } = useContext(myContext)
    const { active, account, library } = useWeb3React()
    const [data, setData] = useState({})
    const [isNext, setIsNext] = useState(false)

    useEffect(() => {
        console.log(data, isNext)
        const requiredList = ['idcardno', 'idcardfronturl', 'idcardbackurl']
        const data_2 = requiredList.filter(item => {
            if (!data[item]) {
                return item
            }
        })

        if (data_2.length === 0) {
            setReqData(data)
            return setIsNext(true)
        } else {
            return setIsNext(false)
        }
    }, [data])

    const handelValChange = (key, val, required = false) => {
        const data_2 = data
        if (required && val === '') {
            data_2[key] = null
        } else {
            data_2[key] = val || ''
        }
        setData({ ...ReqData, ...data_2 })
    }


    const handelSubmit = async () => {
        // console.log(ReqData)
        ReqData.bounceid = 0
        ReqData.accountaddress = account
        ReqData.status = 1
        // const web3 = new Web3(library.provider);
        // const sign = await web3.eth.personal.sign('Welcome to Bounce!', account)
        // console.log('sign', sign)
        sign_Axios.post(API_HOST.sign_KYC, ReqData).then(res => {
            if (res.status === 200 && res.data.code === 1) {
                dispatch({
                    type: 'MODAL',
                    value: {
                        name: 'CONFIRM',
                        title: 'Message',
                        deputy: 'The information review has been submitted successfully. Please wait for the approval of the review',
                        confirm: {
                            text: 'Confirm',
                            callback: () => {
                                dispatch({
                                    type: 'MODAL',
                                    value: null
                                })
                                history.push('/')
                                // window.location.reload()
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
                        deputy: 'Your application is under review and will be reviewed within one working day. Please do not submit it twice',
                        confirm: {
                            text: 'Confirm',
                            callback: () => {
                                dispatch({
                                    type: 'MODAL',
                                    value: null
                                })
                                history.push('/')
                                // window.location.reload()
                            }
                        }
                    }
                })
            }
        }).catch(err => {
            console.log(err)
        })
    }

    return (
        <Form title={'ID confirmation'} marginTop='24px'>
            <div className="tip" style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginTop: 8
            }}>
                <img src={icon_plaint} alt="" />
                <p style={{
                    fontSize: 12,
                    marginLeft: 6
                }}>This information is used to identity verification only, and will be kept secure by Bounce</p>
            </div>

            <TextInput
                label='Passport Number'
                placeholder='Enter your passport number'
                isRequire={true}
                onValueChange={(data) => {
                    handelValChange('idcardno', data.value)
                    console.log(data)
                }} />
            <Upload
                title='Passport photo'
                name='idcardfronturl'
                desc='Please upload passport photo of page with ID number '
                successCallBack={(path) => {
                    handelValChange('idcardfronturl', path || null)
                }} />
            <Upload
             title='Selfie'
                name='idcardbackurl'
                desc='Please upload a photo of yourself to match with passport '
                successCallBack={(path) => {
                    handelValChange('idcardbackurl', path || null)
                }} />
            <div className="btn_group">
                <Button type='white' value='Back' width='164px' onClick={() => {
                    setCurStep(curStep - 1)
                }} />
                <Button type='black' value='Verify' width='164px' disabled={!isNext || !active} onClick={handelSubmit} />
            </div>
        </Form>
    )
}
