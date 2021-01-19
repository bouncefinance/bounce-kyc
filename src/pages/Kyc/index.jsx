import React, { useState } from 'react'
import { KycStyled } from './styled'
import image_kyc from '../../assets/images/kyc.svg'
import Step1 from './Step1'
import Step2 from './Step2'
import Step3 from './Step3'

export default function Index() {
    const [curStep, setCurStep] = useState(3)

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
                        {curStep === 1 && <Step1 curStep={curStep} setCurStep={setCurStep} />}
                        {curStep === 2 && <Step2 curStep={curStep} setCurStep={setCurStep} />}
                        {curStep === 3 && <Step3 curStep={curStep} setCurStep={setCurStep} />}
                    </div>
                </div>
            </div>
        </KycStyled>
    )
}
