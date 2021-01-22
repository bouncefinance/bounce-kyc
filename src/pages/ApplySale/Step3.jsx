import React, { useEffect, useState } from 'react'
import { Step3Styled } from './styled'
import { TextAreaInput, Button } from '../components/Table'

const requireList = ['teambio']

export default function Step3({ setCurStep, setTitle, step3Data, setStep3Data }) {
    const [isNext, setIsNext] = useState(false)

    useEffect(() => {
        setTitle('Team')
    }, [])

    useEffect(() => {
        const arr = requireList.filter(item => {
            return !step3Data[item]
        })
        if (arr.length === 0) {
            setIsNext(true)
        } else {
            setIsNext(false)
        }
    }, [step3Data])

    const handelInputChange = (key, value) => {
        const obj = { ...step3Data }
        obj[key] = value
        setStep3Data(obj)
    }

    return (
        <Step3Styled>
            <TextAreaInput
                label='Team'
                placeholder='Enter short bio about your team'
                width='600px'
                height='140px'
                marginTop='0px'
                isRequire={true}
                defaultVal={step3Data.teambio}
                onValChange={(val) => {
                    handelInputChange('teambio', val)
                }}
            />

            <div className="btn_group">
                <Button type='white' value='Last Step' width='164px' onClick={() => {
                    setCurStep(2)
                }} />
                <Button type='black' value='Next Step' width='164px' disabled={!isNext} onClick={() => {
                    setCurStep(4)
                    console.log(step3Data)
                }} />
            </div>
        </Step3Styled>
    )
}
