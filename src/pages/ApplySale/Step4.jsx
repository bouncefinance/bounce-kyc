import React, { useEffect, useState } from 'react'
import { Step4Styled } from './styled'
import { TextInput, Button } from '../components/Table'

const requireList = ['totalsupply', 'circulatingsupply', 'tokenticketer', 'tokencontractaddress', 'tokendistribution', 'tokenlookupschedule']

export default function Step4 ({ setCurStep, setTitle, step4Data, setStep4Data }) {
    const [isNext, setIsNext] = useState(false)

    useEffect(() => {
        setTitle({
            title: 'Token metrics',
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
                onClick: () => { return setCurStep(3) }
            }, {
                name: 'Token metrics',
                active: true
            }]
        })
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

    const handelInputChange = (key, data) => {
        const obj = { ...step4Data }
        if (!data.isError) {
            obj[key] = data.value
        } else {
            obj[key] = null
        }
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
                isNumber={true}
                REG_rule={{
                    reg: /^[1-9]\d*|0$/,
                    mag: 'Please enter a positive integer'
                }}
                onValueChange={(val) => {
                    handelInputChange('totalsupply', val)
                }}
            />

            <TextInput
                label='Initial circulating supply'
                placeholder='Enter initial circulating supply'
                width='600px'
                defaultVal={step4Data.circulatingsupply}
                isRequire={true}
                isNumber={true}
                REG_rule={{
                    reg: /^[1-9]\d*|0$/,
                    mag: 'Please enter a positive integer'
                }}
                onValueChange={(val) => {
                    handelInputChange('circulatingsupply', val)
                }}
            />

            <TextInput
                label='Token ticketer'
                placeholder='Enter token ticketer'
                width='600px'
                defaultVal={step4Data.tokenticketer}
                isRequire={true}
                upperCase={true}
                onValueChange={(val) => {
                    handelInputChange('tokenticketer', val)
                }}
            />

            <TextInput
                label='Token contract address'
                placeholder='Paste token contract address'
                width='600px'
                maxLength={42}
                defaultVal={step4Data.tokencontractaddress}
                isRequire={true}
                REG_rule={{
                    reg: /[0x|0X][\S]{41}/,
                    msg: 'Please enter a positive integer Please enter a valid contract address'
                }}
                onValueChange={(val) => {
                    handelInputChange('tokencontractaddress', val)
                }}
            />


            <TextInput
                label='Token distribution'
                placeholder='describe your token distribution max 300 character'
                width='600px'
                minHeight='80px'
                maxLength={300}
                defaultVal={step4Data.tokendistribution}
                isRequire={true}
                onValueChange={(val) => {
                    handelInputChange('tokendistribution', val)
                }}
            />

            <TextInput
                label='Token lockup schedule'
                placeholder='describe your token lockup schedule max 300 character'
                width='600px'
                minHeight='80px'
                maxLength={300}
                defaultVal={step4Data.tokenlookupschedule}
                isRequire={true}
                onValueChange={(val) => {
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
