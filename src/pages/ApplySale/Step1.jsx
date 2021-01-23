import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Step1Styled } from './styled'
import { TextInput, Button } from '../components/Table'

const SocialConfig = ['Twitter', 'Medium', 'Telegram', 'Facebook']
const requireList = ['proname', 'prowebsite', 'protheme', 'whitepaperlink', 'githublink']


export default function Step1({ setCurStep, setTitle, step1Data, setStep1Data }) {
    const history = useHistory()
    const [socialLink, setSocialLink] = useState([])
    const [isNext, setIsNext] = useState(false)

    const wrapperToUpperCase = (str) => {
        return String(str).toUpperCase()
    }

    useEffect(() => {
        setTitle('General information')
    }, [])

    useEffect(() => {
        const arr = requireList.filter(item => {
            return !step1Data[item]
        })
        if (arr.length === 0) {
            setIsNext(true)
        } else {
            setIsNext(false)
        }
    }, [step1Data])

    const handelClickAdd = (item) => {
        const list = [...socialLink]
        if (!list.includes(item)) {
            list.push(item)
        } else {
            const index = socialLink.indexOf(item)
            list.splice(index, 1)
        }
        setSocialLink(list)
    }

    const handelInputChange = (key, value) => {
        const obj = { ...step1Data }
        obj[key] = value
        setStep1Data(obj)
    }

    return (
        <Step1Styled>
            <p className='tip'><span>Please note.</span> The submission fee to apply certified sales is 0.3 BOT tokens</p>

            <TextInput
                label='Project name'
                placeholder='Enter your project name'
                defaultVal={step1Data.proname}
                isRequire={true}
                width='600px'
                onValChange={(val) => {
                    handelInputChange('proname', val)
                }}
            />

            <TextInput
                label='Project website'
                placeholder='Enter your project website'
                defaultVal={step1Data.prowebsite}
                isRequire={true}
                width='600px'
                onValChange={(val) => {
                    handelInputChange('prowebsite', val)
                }}
            />

            <TextInput
                label='Theme'
                placeholder='Enter your project theme'
                defaultVal={step1Data.protheme}
                isRequire={true}
                width='600px'
                onValChange={(val) => {
                    handelInputChange('protheme', val)
                }}
            />

            <TextInput
                label='Whitepaper link'
                placeholder='Paste your project link'
                defaultVal={step1Data.whitepaperlink}
                isRequire={true}
                width='600px'
                onValChange={(val) => {
                    handelInputChange('whitepaperlink', val)
                }}
            />

            <TextInput
                label='Github link'
                placeholder='Paste github link'
                defaultVal={step1Data.githublink}
                isRequire={true}
                width='600px'
                onValChange={(val) => {
                    handelInputChange('githublink', val)
                }}
            />


            {socialLink.map((item, index) => {
                return <TextInput
                    key={index}
                    label={`${item} link`}
                    placeholder={`Paste ${item} link`}
                    defaultVal={step1Data[item]}
                    width='600px'
                    onValChange={(val) => {
                        const name = String(item).toLowerCase()
                        handelInputChange(name, val)
                    }}
                />
            })}


            <ul className='add_append'>
                {SocialConfig.map((item, index) => {
                    return <li
                        className={socialLink.includes(item) ? 'soc_active' : ''}
                        key={index}
                        onClick={() => {
                            handelClickAdd(item)
                        }}
                    >{wrapperToUpperCase(`Add ${item}`)}</li>
                })}
            </ul>

            <div className="btn_group">
                <Button type='white' value='Cancel' width='164px' onClick={() => {
                    history.goBack(-1)
                }} />
                <Button type='black' value='Next Step' width='164px' disabled={!isNext} onClick={() => {
                    setCurStep(2)
                }} />
            </div>
        </Step1Styled>
    )
}
