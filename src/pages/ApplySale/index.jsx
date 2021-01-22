import React, { useContext, useState } from 'react'
import { ApplySaleStyled } from './styled'
import { Crumbs } from '../components/Exhibition'
import Step1 from './Step1'
import Step2 from './Step2'
import Step3 from './Step3'
import Step4 from './Step4'
import Step5 from './Step5'
import Step6 from './Step6'

import axios from 'axios'
import API from '../../config/request_api'
import { myContext } from '../../redux'

export default function Index() {
    const { dispatch } = useContext(myContext)
    const [curStep, setCurStep] = useState(1)
    const [title, setTitle] = useState('Details')
    const [step1Data, setStep1Data] = useState({})
    const [step2Data, setStep2Data] = useState({})
    const [step3Data, setStep3Data] = useState({})
    const [step4Data, setStep4Data] = useState({})
    const [step5Data, setStep5Data] = useState({
        auctiontype: 'Fixed swap auction',
        ifkyc: 1,
        ifwhitelist: 1,
        allocationperwallet: 'No limits'
    })
    const [step6Data, setStep6Data] = useState({})

    const handelSubmit = () => {
        const params = {
            ...step1Data,
            ...step2Data,
            ...step3Data,
            ...step4Data,
            ...step5Data,
            ...step6Data
        }
        try {
            axios.post(API.applySale, params).then(res => {
                if (res.status === 200 && res.data.code === 1) {
                    dispatch({
                        type: 'MODAL',
                        value: {
                            name: 'CONFIRM',
                            title: 'Message',
                            deputy: 'Form information submitted successfully',
                            confirm: {
                                text: 'Confirm',
                                callback: () => {
                                    dispatch({
                                        type: 'MODAL',
                                        value: null
                                    })
                                }
                            }
                        }
                    })
                } else {
                    console.log(res)
                }
            })
        } catch (error) {
            dispatch({
                type: 'MODAL',
                value: {
                    name: 'CONFIRM',
                    title: 'Message',
                    deputy: 'The request failed. Please check your network or contact your administrator',
                    confirm: {
                        text: 'Confirm',
                        callback: () => {
                            dispatch({
                                type: 'MODAL',
                                value: null
                            })
                        }
                    }
                }
            })
        }
    }

    const renderStep = (curStep) => {
        switch (curStep) {
            case 1:
                return <Step1 setCurStep={setCurStep} setTitle={setTitle} step1Data={step1Data} setStep1Data={setStep1Data} />

            case 2:
                return <Step2 setCurStep={setCurStep} setTitle={setTitle} step2Data={step2Data} setStep2Data={setStep2Data} />

            case 3:
                return <Step3 setCurStep={setCurStep} setTitle={setTitle} step3Data={step3Data} setStep3Data={setStep3Data} />

            case 4:
                return <Step4 setCurStep={setCurStep} setTitle={setTitle} step4Data={step4Data} setStep4Data={setStep4Data} />

            case 5:
                return <Step5 setCurStep={setCurStep} setTitle={setTitle} step5Data={step5Data} setStep5Data={setStep5Data} />

            case 6:
                return <Step6 setCurStep={setCurStep} setTitle={setTitle} step6Data={step6Data} setStep6Data={setStep6Data} handelSubmit={handelSubmit} />
            default:
                return <></>
        }
    }

    return (
        <ApplySaleStyled>
            <Crumbs />
            <div className="main">
                <div className="top">
                    <h1>{title}</h1>
                    <p className="step"><span>{curStep}</span> / 6</p>
                </div>

                {renderStep(curStep)}
            </div>
        </ApplySaleStyled>
    )
}
