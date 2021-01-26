import React, { useEffect, useState } from 'react'
import { Step3Styled } from './styled'
import { TextInput, Button } from '../components/Table'

const requireList = ['teambio']

export default function Step3({ setCurStep, setTitle, step3Data, setStep3Data }) {
    const [isNext, setIsNext] = useState(false)

    useEffect(() => {
        setTitle({
            title: 'Team',
            crumbsList: [{
                name: 'Apply Certified Sales'
            }, {
                name: 'General information',
                onClick: () => { return setCurStep(1) }
            }, {
                name: 'Details',
                onClick: () => { return setCurStep(2) }
            }, {
                name: 'Team',
                active: true
            }]
        })
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

    const handelInputChange = (key, data) => {
        const obj = { ...step3Data }
        if (!data.isError) {
            obj[key] = data.value
        } else {
            obj[key] = null
        }
        setStep3Data(obj)
    }

    return (
        <Step3Styled>
            <TextInput
                label='Team'
                placeholder='Enter short bio about your team'
                width='600px'
                minHeight='140px'
                marginTop='0px'
                maxLength={500}
                isRequire={true}
                defaultVal={step3Data.teambio}
                onValueChange={(val) => {
                    handelInputChange('teambio', val)
                }}
            />

            <div className="btn_group">
                <Button type='white' value='Last Step' width='164px' onClick={() => {
                    setCurStep(2)
                }} />
                <Button type='black' value='Next Step' width='164px' disabled={!isNext} onClick={() => {
                    setCurStep(4)
                }} />
            </div>
        </Step3Styled>
    )
}
