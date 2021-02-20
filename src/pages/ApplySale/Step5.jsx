import React, { useEffect, useState } from 'react'
import { Step5Styled } from './styled'
import { TextInput, TimeInput, AmountInput, Radio, Select, Button } from '../components/Table'
import {useIsSMDown} from '../../utils/themeHooks';
const requireList = ['auctiontype', 'amountoftoken', 'pricepertoken', 'allocationperwallet', 'auctiontime', 'teamwallet', 'ifkyc', 'ifwhitelist']

export default function Step5({ setCurStep, setTitle, step5Data, setStep5Data }) {
    const [isNext, setIsNext] = useState(false)
    const isXSDown = useIsSMDown();
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
            return step5Data[item] === null || step5Data[item] === undefined
        })

        if (arr.length === 0) {
            setIsNext(true)
        } else {
            setIsNext(false)
        }
    }, [step5Data])

    const handelInputChange = (key, data) => {
        const obj = { ...step5Data }
        if (!data.isError) {
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
                width={isXSDown?'100%':'600px'}
                options={[
                    { name: 'Fixed swap auction' },
                    { name: 'Sealed-bid auction' },
                    { name: 'Dutch auction' },
                    { name: 'ERC20 Lottery' },
                    { name: 'NFT Lottery' },
                ]}

                defaultVal={{
                    name: step5Data.auctiontype
                }}

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
                width={isXSDown?'100%':'600px'}
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
                width={isXSDown?'100%':'600px'}
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
                    {
                        name: 'USDT',
                        append: <AmountInput
                            width={isXSDown?'100%':'100px'}
                            placeholder={'Amount'}
                            defaultVal={
                                step5Data.allocationperwallet !== 'No limits' && parseFloat(step5Data.allocationperwallet)
                            }
                            onChange={(val) => {
                                handelInputChange('allocationperwallet', {
                                    isRequire: true,
                                    isError: false,
                                    value: val.value + ' USDT'
                                })
                            }}
                        />
                    },
                ]}

                defaultIndex={
                    step5Data.allocationperwallet === 'No limits' ? 0 : 1
                }

                onChange={(val) => {
                    if (val.name === 'No limits') {
                        handelInputChange('allocationperwallet', {
                            isRequire: true,
                            isError: false,
                            value: val.name
                        })
                    }
                }}
            />

            <TimeInput
                label='Auction time'
                width={isXSDown?'100%':'600px'}
                defaultVal={step5Data.auctiontime}
                onChange={(time) => {
                    handelInputChange('auctiontime', time)
                }}
            />



            <TextInput
                maxLength={64}
                label='Team wallet to receive auction fund'
                placeholder='Enter team wallet address to receive fund'
                width={isXSDown?'100%':'600px'}
                defaultVal={step5Data.teamwallet}
                isRequire={true}
                REG_rule={{
                    reg: /[0x|0X][\S]{41}/,
                    msg: 'Please enter a positive integer Please enter a valid contract address'
                }}
                onValueChange={(val) => {
                    handelInputChange('teamwallet', val)
                }}
            />

            <div className="select_group">
                <Select
                    label='KYC'
                    width={isXSDown?'100%':'294px'}
                    options={[
                        { name: 'Yes', value: 1 },
                        { name: 'No', value: 0 },
                    ]}

                    defaultVal={{
                        value: step5Data.ifkyc
                    }}

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
                    width={isXSDown?'100%':'294px'}
                    options={[
                        { name: 'Yes', value: 1 },
                        { name: 'No', value: 0 },
                    ]}

                    defaultVal={{
                        value: step5Data.ifwhitelist
                    }}

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
                <Button type='white' value='Last Step' width={isXSDown?'100%':'164px'} onClick={() => {
                    setCurStep(4)
                }} />
                <Button type='black' value='Next Step'  style={{ marginTop: 20}}  width={isXSDown?'100%':'164px'} disabled={!isNext} onClick={() => {
                    setCurStep(6)
                    console.log(step5Data)
                }} />
            </div>
        </Step5Styled>
    )
}
