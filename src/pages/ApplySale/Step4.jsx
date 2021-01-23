import React, { useEffect, useState } from 'react'
import { Step4Styled } from './styled'
import { TextInput, TextAreaInput, Button } from '../components/Table'

const requireList = ['totalsupply', 'circulatingsupply', 'tokenticketer', 'tokencontractaddress', 'tokendistribution', 'tokenlookupschedule']

export default function Step4({ setCurStep, setTitle,step4Data, setStep4Data }) {
    const [isNext, setIsNext] = useState(false)

    useEffect(() => {
        setTitle('Token metrics')
    }, [])

    useEffect(() => {
        const arr = requireList.filter(item => {
            return !step4Data[item]
        })
        if (arr.length === 0) {
            setIsNext(true)
        } else {
            setIsNext(false)
        }
    }, [step4Data])

    const handelInputChange = (key, value) => {
        const obj = { ...step4Data }
        obj[key] = value
        setStep4Data(obj)
    }

    return (
        <Step4Styled>
            <TextInput
                label='Total supply'
                placeholder='Enter your Total supply'
                width='600px'
                defaultVal={step4Data.totalsupply}
                isRequire={true}
                onValChange={(val) => {
                    handelInputChange('totalsupply', val)
                }}
            />

            <TextInput
                label='Initial circulating supply'
                placeholder='Enter initial circulating supply'
                width='600px'
                defaultVal={step4Data.circulatingsupply}
                isRequire={true}
                onValChange={(val) => {
                    handelInputChange('circulatingsupply', val)
                }}
            />

            <TextInput
                label='Token ticketer'
                placeholder='Enter token ticketer'
                width='600px'
                defaultVal={step4Data.tokenticketer}
                isRequire={true}
                onValChange={(val) => {
                    handelInputChange('tokenticketer', val)
                }}
            />

            <TextInput
                label='Token contract address'
                placeholder='Paste token contract address'
                width='600px'
                defaultVal={step4Data.tokencontractaddress}
                isRequire={true}
                onValChange={(val) => {
                    handelInputChange('tokencontractaddress', val)
                }}
            />


            <TextAreaInput
                label='Token distribution'
                placeholder='Enter token distribution'
                width='600px'
                defaultVal={step4Data.tokendistribution}
                isRequire={true}
                onValChange={(val) => {
                    handelInputChange('tokendistribution', val)
                }}
            />

            <TextAreaInput
                label='Token lockup schedule'
                placeholder='Enter token lockup schedule'
                width='600px'
                defaultVal={step4Data.tokenlookupschedule}
                isRequire={true}
                onValChange={(val) => {
                    handelInputChange('tokenlookupschedule', val)
                }}
            />

            <div className="btn_group">
                <Button type='white' value='Last Step' width='164px' onClick={() => {
                    setCurStep(3)
                }} />
                <Button type='black' value='Next Step' width='164px' disabled={!isNext} onClick={() => {
                    setCurStep(5)
                    console.log(step4Data)
                }} />
            </div>
        </Step4Styled>
    )
}
