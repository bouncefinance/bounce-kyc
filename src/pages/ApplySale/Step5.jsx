import React, { useEffect, useState } from 'react'
import { Step5Styled } from './styled'
import { TextInput, TimeInput, Radio, Select, Button } from '../components/Table'

const requireList = ['auctiontype', 'amountoftoken', 'pricepertoken', 'allocationperwallet', 'auctiontime', 'teamwallet', 'ifkyc', 'ifwhitelist']

export default function Step5({ setCurStep, setTitle, step5Data, setStep5Data }) {
    const [isNext, setIsNext] = useState(false)

    useEffect(() => {
        setTitle('Auction ')
    }, [])

    useEffect(() => {
        const arr = requireList.filter(item => {
            return !step5Data[item]
        })
        if (arr.length === 0) {
            setIsNext(true)
        } else {
            setIsNext(false)
        }
    }, [step5Data])

    const handelInputChange = (key, value) => {
        const obj = { ...step5Data }
        obj[key] = value
        setStep5Data(obj)
    }

    return (
        <Step5Styled>

            <Select
                label='Auction type'
                width='600px'
                options={[
                    { name: 'Fixed swap auction' }
                ]}
                onChange={(val) => {
                    console.log(val)
                    console.log(val.name)
                    handelInputChange('auctiontype', val.name)
                }}
            />

            <TextInput
                label='Amount of token'
                placeholder='Enter your Total supply'
                width='600px'
                defaultVal={step5Data.amountoftoken}
                isRequire={true}
                onValChange={(val) => {
                    handelInputChange('amountoftoken', val)
                }}
            />

            <TextInput
                label='Price per token'
                placeholder='Enter price per token'
                width='600px'
                defaultVal={step5Data.pricepertoken}
                isRequire={true}
                onValChange={(val) => {
                    handelInputChange('pricepertoken', val)
                }}
            />

            <Radio
                label='Allocation per wallet'
                options={[
                    { name: 'No limits' },
                    { name: 'ETH' },
                ]}
                onChange={(val) => {
                    handelInputChange('allocationperwallet', val.name)
                }}
            />

            <TimeInput
                label='Auction time'
                width='600px'
                onChange={(time) => {
                    handelInputChange('auctiontime', String(time.seconds))
                }}
            />



            <TextInput
                label='Team wallet to receive auction fund'
                placeholder='Enter token lockup schedule'
                width='600px'
                defaultVal={step5Data.teamwallet}
                isRequire={true}
                onValChange={(val) => {
                    handelInputChange('teamwallet', val)
                }}
            />

            <div className="select_group">
                <Select
                    label='KYC'
                    width='294px'
                    options={[
                        { name: 'Yes', value: 1 },
                        { name: 'No', value: 0 },
                    ]}
                    onChange={(val) => {

                        handelInputChange('ifkyc', val.value)
                    }}
                />

                <Select
                    label='Whitelisting'
                    width='294px'
                    options={[
                        { name: 'Yes', value: 1 },
                        { name: 'No', value: 0 },
                    ]}
                    onChange={(val) => {
                        handelInputChange('ifwhitelist', val.value)
                    }}
                />
            </div>


            <div className="btn_group">
                <Button type='white' value='Last Step' width='164px' onClick={() => {
                    setCurStep(4)
                }} />
                <Button type='black' value='Next Step' width='164px' disabled={!isNext} onClick={() => {
                    setCurStep(6)
                    console.log(step5Data)
                }} />
            </div>
        </Step5Styled>
    )
}
