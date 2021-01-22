import React, { useEffect, useState } from 'react'
import { Step6Styled } from './styled'
import { TextInput, TextAreaInput, Button, Upload } from '../components/Table'

const requireList = ['contactemail', 'additionalinfo', 'prologourl']

export default function Step6({ setCurStep, setTitle, step6Data, setStep6Data, handelSubmit }) {
    const [isNext, setIsNext] = useState(false)

    useEffect(() => {
        setTitle('Additional information')
    }, [])

    useEffect(() => {
        const arr = requireList.filter(item => {
            return !step6Data[item]
        })
        if (arr.length === 0) {
            setIsNext(true)
        } else {
            setIsNext(false)
        }
    }, [step6Data])

    const handelInputChange = (key, value) => {
        const obj = { ...step6Data }
        obj[key] = value
        setStep6Data(obj)
    }

    return (
        <Step6Styled>
            <TextInput
                label='Contact email'
                placeholder='Enter your Contact email'
                width='600px'
                defaultVal={step6Data.contactemail}
                isRequire={true}
                onValChange={(val) => {
                    handelInputChange('contactemail', val)
                }}
            />

            <TextAreaInput
                label='Additional information'
                placeholder='Enter amount of token'
                width='600px'
                defaultVal={step6Data.additionalinfo}
                isRequire={true}
                onValChange={(val) => {
                    handelInputChange('additionalinfo', val)
                }}
            />

            <Upload
                name='Project logo'
                width='600px'
                desc='Supports JPG, PNG, JPEG2000, GIF, no more than 100MB, 262*262 Reccomended'
                successCallBack={(path) => {
                    console.log(path)
                    handelInputChange('prologourl', path || null)
                }} />

            <div className="btn_group">
                <Button type='white' value='Last Step' width='164px' onClick={() => {
                    setCurStep(5)
                }} />
                <Button type='black' value='Submit' width='164px' disabled={!isNext} onClick={() => {
                    handelSubmit && handelSubmit()
                }} />
            </div>
        </Step6Styled>
    )
}
