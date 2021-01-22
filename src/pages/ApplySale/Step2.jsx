import React, { useEffect, useState } from 'react'
import { Step2Styled } from './styled'
import { TextInput, Button } from '../components/Table'


const requireList = ['prosummary', 'techhighlight', 'architecture']

export default function Step2({ setCurStep, setTitle, step2Data, setStep2Data }) {


    const [isNext, setIsNext] = useState(false)

    const wrapperToUpperCase = (str) => {
        return String(str).toUpperCase()
    }

    useEffect(() => {
        setTitle('Details')
    }, [])

    useEffect(() => {
        const arr = requireList.filter(item => {
            return !step2Data[item]
        })
        if (arr.length === 0) {
            setIsNext(true)
        } else {
            setIsNext(false)
        }
    }, [step2Data])

    const handelInputChange = (key, value) => {
        const obj = { ...step2Data }
        obj[key] = value
        setStep2Data(obj)
    }

    return (
        <Step2Styled>
            <TextInput
                label='Project Summary'
                placeholder='Enter your project Summary'
                width='600px'
                marginTop='0px'
                defaultVal={step2Data.prosummary}
                isRequire={true}
                onValChange={(val) => {
                    handelInputChange('prosummary', val)
                }}
            />

            <TextInput
                label='Technical highlight'
                placeholder='Enter your project Technical highlight'
                width='600px'
                defaultVal={step2Data.techhighlight}
                isRequire={true}
                onValChange={(val) => {
                    handelInputChange('techhighlight', val)
                }}
            />

            <TextInput
                label='Architecture'
                placeholder='Enter your architecture'
                width='600px'
                defaultVal={step2Data.architecture}
                isRequire={true}
                onValChange={(val) => {
                    handelInputChange('architecture', val)
                }}
            />

            <ul className='add_append'>
                {/* 添加附件 */}
                <li>{wrapperToUpperCase('Add attachments')}</li>
            </ul>

            <div className="btn_group">
                <Button type='white' value='Last Step' width='164px' onClick={() => {
                    setCurStep(1)
                }} />
                <Button type='black' value='Next Step' width='164px' disabled={!isNext} onClick={() => {
                    setCurStep(3)
                }} />
            </div>
        </Step2Styled>
    )
}
