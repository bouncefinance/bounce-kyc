import React, { useEffect, useState } from 'react'
import { Step5Styled } from './styled'
import { TextInput, TimeInput, Radio, Select, Button } from '../components/Table'

const requireList = ['auctiontype', 'amountoftoken', 'pricepertoken', 'allocationperwallet', 'auctiontime', 'teamwallet', 'ifkyc', 'ifwhitelist']

export default function Step5 ({ setCurStep, setTitle, step5Data, setStep5Data }) {
    const [isNext, setIsNext] = useState(false)

    useEffect(() => {
        setTitle({
            title: 'Auction',
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
                onClick: () => { return setCurStep(4) }
            }, {
                name: 'Auction',
                active: true
            }]
        })
    }, [])

    useEffect(() => {
        const arr = requireList.filter(item => {
            return step5Data[item] === null
        })
        if (arr.length === 0) {
            setIsNext(true)
        } else {
            setIsNext(false)
        }
    }, [step5Data])

    const handelInputChange = (key, data) => {
        const obj = { ...step5Data }
        if (data.isRequire && !data.isError) {
            obj[key] = data.value
        } else {
            obj[key] = null
        }
        setStep5Data(obj)
    }

    return (
        <Step5Styled>

            <Select
                label='Auction type'
                width='600px'
                options={[
                    { name: 'Fixed swap auction' },
                    { name: 'Sealed-bid auction' },
                    { name: 'Dutch auction' },
                ]}
                onChange={(val) => {
                    handelInputChange('auctiontype', {
                        isRequire: true,
                        isError: false,
                        value: val.name
                    })
                }}
            />

            <TextInput
                label='Amount of tokens for auction'
                placeholder='Enter the amount of token you want to auction'
                width='600px'
                defaultVal={step5Data.amountoftoken}
                isRequire={true}
                isNumber={true}
                onValueChange={(val) => {
                    handelInputChange('amountoftoken', {
                        isRequire: true,
                        isError: false,
                        value: val.value
                    })
                }}
            />

            <TextInput
                label='Price per token'
                placeholder='Enter price per token'
                width='600px'
                defaultVal={step5Data.pricepertoken}
                isRequire={true}
                isNumber={true}
                unit='USDT'
                onValueChange={(val) => {
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
                    handelInputChange('allocationperwallet', {
                        isRequire: true,
                        isError: false,
                        value: val.name
                    })
                }}
            />

            <TimeInput
                label='Auction time'
                width='600px'
                onChange={(time) => {
                    handelInputChange('auctiontime', {
                        isRequire: true,
                        isError: false,
                        value: String(time.seconds)
                    })
                }}
            />



            <TextInput
                label='Team wallet to receive auction fund'
                placeholder='Enter team wallet address to receive fund'
                width='600px'
                defaultVal={step5Data.teamwallet}
                isRequire={true}
                onValueChange={(val) => {
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
                        handelInputChange('ifkyc', {
                            isRequire: true,
                            isError: false,
                            value: val.value
                        })
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
                        handelInputChange('ifwhitelist', {
                            isRequire: true,
                            isError: false,
                            value: val.value
                        })
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
