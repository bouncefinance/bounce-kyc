import React, { useEffect, useState } from 'react'
import { Step6Styled } from './styled'
import { TextInput, Button, Upload } from '../components/Table'
import {useIsSMDown} from '../../utils/themeHooks';
const requireList = ['contactemail', 'prologourl']

export default function Step6 ({ setCurStep, setTitle, step6Data, setStep6Data, handelSubmit }) {
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
                onClick: () => { return setCurStep(5) }
            }, {
                name: 'Additional information',
                active: true
            }]
        })
    }, [])

    useEffect(() => {
        const arr = requireList.filter(item => {
            return !step6Data[item]
        })
        // console.log('arr',arr, requireList)
        if (arr.length === 0) {
            setIsNext(true)
        } else {
            setIsNext(false)
        }
    }, [step6Data])

    const handelInputChange = (key, data) => {
        const obj = { ...step6Data }
        if (!data.isError) {
            obj[key] = data.value
        } else {
            obj[key] = null
        }
        setStep6Data(obj)
    }

    return (
        <Step6Styled>
            <TextInput
                label='Contact email'
                placeholder='Enter your Contact email'
                width={isXSDown?'100%':'600px'}
                defaultVal={step6Data.contactemail}
                isRequire={true}
                REG_rule={{
                    reg: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
                    msg: 'Please enter a valid email address'
                }}
                onValueChange={(val) => {
                    handelInputChange('contactemail', val)
                }}
            />

            <TextInput
                label='Additional information'
                placeholder='Enter additional information '
                width={isXSDown?'100%':'600px'}
                defaultVal={step6Data.additionalinfo}
                maxLength={200}
                onValueChange={(val) => {
                    handelInputChange('additionalinfo', val)
                }}
            />

            <Upload
                name='Project logo'
                width={isXSDown?'100%':'600px'}
                desc='Supports JPG, PNG, JPEG2000, GIF, no more than 100MB, 262*262 Reccomended'
                successCallBack={(path) => {
                    handelInputChange('prologourl', {
                        isRequire: true,
                        isError: false,
                        value: path
                    })
                }} />

            <div className="btn_group">
                <Button type='white' value='Last Step' width={isXSDown?'100%':'164px'} onClick={() => {
                    setCurStep(5)
                }} />
                <Button type='black' value='Submit' style={{ marginTop: 20}} width={isXSDown?'100%':'164px'} disabled={!isNext} onClick={() => {
                    handelSubmit && handelSubmit()
                }} />
            </div>
        </Step6Styled>
    )
}
