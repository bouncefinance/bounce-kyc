import React, { useState, useEffect, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { TextInput, Form, Button, Upload } from '../components/Table'
import axios from 'axios'
import { useWeb3React } from '@web3-react/core'
import API_HOST from '../../config/request_api'
import { myContext } from '../../redux'
import { BOUNCE_PRO } from "../../web3/address";
import icon_plaint from '../../assets/images/plaint.svg'
import useAxios from '../../hooks/useAxios'
import { getContract } from "../../web3";
import BouncePro from "../../web3/abi/BouncePro.json";
import {
    cancelStatus,
    confirmStatus,
    errorStatus,
    initStatus,
    pendingStatus,
    successVotedStatus,
    TxModal
} from "../../components/common/TXModal";
import { useIsSMDown } from '../../utils/themeHooks';

export default function Step3({ curStep, setCurStep, ReqData, setReqData }) {
    const { sign_Axios } = useAxios()
    const history = useHistory()
    const { dispatch } = useContext(myContext)
    const { active, account, library, chainId } = useWeb3React()
    const [data, setData] = useState({})
    const [isNext, setIsNext] = useState(false)
    const [bidStatus, setBidStatus] = useState(initStatus)

    const isXSDown = useIsSMDown();
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

        // accountaddress: "0x2d3fff58da3346dce601f6db8eec57906cdb17be"
        // bounceid: 14560289
        // emailaddr: ""
        // id: 291
        // ifincontract: 0
        // signaturestr: "0x88a0f3de78661d47e281c6f3c0670d24a2b74588d6bd69be5c187b847336182467a7df36c76c612006524a42887cc31f1537ad6dcc4367fb711ca712f4e775ab1b"
        // status: 1
        // username: "Eqw"



        ReqData.bounceid = 0

        ReqData.accountaddress = account
        ReqData.status = 1
        // const web3 = new Web3(library.provider);
        // const sign = await web3.eth.personal.sign('Welcome to Bounce!', account)
        // console.log('sign', sign)
        sign_Axios.post(API_HOST.sign_addKYC, ReqData).then(res => {
            if (res.status === 200 && res.data.code === 1) {
                const signaturestr = res.data.data.signaturestr

                const BouncePro_CT = getContract(library, BouncePro.abi, BOUNCE_PRO(chainId))
                setBidStatus(confirmStatus);
                try {
                    BouncePro_CT.methods.registerKyc(signaturestr).send({ from: account })
                        .on('transactionHash', hash => {
                            setBidStatus(pendingStatus)
                        })
                        .on('receipt', async (_, receipt) => {
                            console.log('bid fixed swap receipt:', receipt)
                            // setBidStatus(successVotedStatus)
                            const params_2 = {
                                ...res.data.data,
                                ifincontract: 1
                            }
                            const res_2 = await sign_Axios.post(API_HOST.sign_KYC, params_2)
                            if (res_2.status === 200 && res_2.data.code === 1) {
                                dispatch({
                                    type: 'MODAL',
                                    value: {
                                        name: 'CONFIRM',
                                        title: 'Congratulations!',
                                        deputy: 'You have successfully passed the KYC and you name is blue marked in your account',
                                        confirm: {
                                            text: 'Confirm',
                                            callback: () => {
                                                dispatch({
                                                    type: 'MODAL',
                                                    value: null
                                                })
                                                window.location.href = '/'
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
                                        title: 'ERROR MESSAGE',
                                        deputy: res_2.data.msg,
                                        confirm: {
                                            text: 'Confirm',
                                            callback: () => {
                                                dispatch({
                                                    type: 'MODAL',
                                                    value: null
                                                })
                                                window.location.href = '/'
                                                // window.location.reload()
                                            }
                                        }
                                    }
                                })
                            }

                        })
                        .on('error', (err, receipt) => {
                            setBidStatus(errorStatus)
                        })
                } catch (error) {
                    if (error.code === 4001) {
                        setBidStatus(cancelStatus)
                    } else {
                        setBidStatus(errorStatus)
                    }
                }
            }else if(res.status === 200 && res.data.code !== -1){
                dispatch({
                    type: 'MODAL',
                    value: {
                        name: 'CONFIRM',
                        title: 'Warning!',
                        deputy: `code: ${res.data.code}  msg: ${res.data.msg}`,
                        confirm: {
                            text: 'Confirm',
                            callback: () => {
                                dispatch({
                                    type: 'MODAL',
                                    value: null
                                })
                                window.location.href = '/'
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
        <>
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
                    <Button type='white' value='Back' width={isXSDown ? '100%' : '164px'} onClick={() => {
                        setCurStep(curStep - 1)
                    }} />
                    <Button type='black' style={{ marginTop: 20 }} value='Verify' width={isXSDown ? '100%' : '164px'} disabled={!isNext || !active} onClick={handelSubmit} />
                </div>
            </Form>
            <TxModal modalStatus={bidStatus} onDismiss={() => {
                setBidStatus(initStatus)
            }} />
        </>
    )
}
