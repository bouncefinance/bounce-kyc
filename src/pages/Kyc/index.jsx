import React, { useState, useEffect, useContext } from 'react'
import { KycStyled } from './styled'
import image_kyc from '../../assets/images/kyc.svg'
import Step1 from './Step1'
import Step2 from './Step2'
import Step3 from './Step3'
import { useWeb3React } from '@web3-react/core'
import { myContext } from '../../redux'

export default function Index() {
    const { active } = useWeb3React()
    const { dispatch } = useContext(myContext)
    const [curStep, setCurStep] = useState(1)
    const [ReqData, setReqData] = useState({
        country: 'china'
    })

    useEffect(() => {
        if (!ReqData || active) {
            return
        }

        dispatch({
            type: 'CONNECT_WALLET',
            value: true
        })

    }, [ReqData])

    return (
        <KycStyled>
            <div className="container">
                <div className="top">
                    <h3>KYC</h3>
                    <p>{curStep} / 3</p>
                </div>
                <div className="bottom">
                    <div className="left">
                        <img src={image_kyc} alt="image_kyc" />
                    </div>
                    <div className="right">
                        {curStep === 1 && <Step1 curStep={curStep} setCurStep={setCurStep} ReqData={ReqData} setReqData={setReqData} />}
                        {curStep === 2 && <Step2 curStep={curStep} setCurStep={setCurStep} ReqData={ReqData} setReqData={setReqData} />}
                        {curStep === 3 && <Step3 curStep={curStep} setCurStep={setCurStep} ReqData={ReqData} setReqData={setReqData} />}
                    </div>
                </div>
            </div>
        </KycStyled>
    )
}
