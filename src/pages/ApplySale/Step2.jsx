import React, { useEffect, useState } from 'react'
import { Step2Styled } from './styled'
import { TextInput, Button } from '../components/Table'


const requireList = ['prosummary', 'techhighlight']

export default function Step2 ({ setCurStep, setTitle, step2Data, setStep2Data }) {


    const [isNext, setIsNext] = useState(false)

    const wrapperToUpperCase = (str) => {
        return String(str).toUpperCase()
    }

    useEffect(() => {
        setTitle({
            title: 'Details',
            crumbsList: [{
                name: 'Apply Certified Sales'
            }, {
                name: 'General information',
                onClick: () => { return setCurStep(1) }
            }, {
                name: 'Details',
                active: true
            }]
        })
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

    const handelInputChange = (key, data) => {
        const obj = { ...step2Data }
        if (data.isRequire && !data.isError) {
            obj[key] = data.value
        } else {
            obj[key] = null
        }
        setStep2Data(obj)
    }

    return (
        <Step2Styled>
            <TextInput
                label='Project Summary'
                placeholder='Enter your project Summary (Limit to 100 characters)'
                width='600px'
                marginTop='0px'
                defaultVal={step2Data.prosummary}
                isRequire={true}
                maxLength={100}
                onValueChange={(val) => {
                    handelInputChange('prosummary', val)
                }}
            />

            <TextInput
                label='Technical highlight'
                placeholder='Enter your project Technical highlight(Limit to 500 characters)'
                width='600px'
                maxLength={500}
                defaultVal={step2Data.techhighlight}
                isRequire={true}
                onValueChange={(val) => {
                    handelInputChange('techhighlight', val)
                }}
            />

            <TextInput
                label='Architecture'
                placeholder='Enter your architecture'
                width='600px'
                defaultVal={step2Data.architecture}
                isRequire={false}
                maxLength={500}
                onValueChange={(val) => {
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
