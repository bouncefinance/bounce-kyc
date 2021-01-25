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
        setTitle({
            title: 'General information',
            crumbsList: [{
                name: 'Apply Certified Sales'
            }, {
                name: 'General information',
                active: true
            }]
        })
    }, [])

    useEffect(() => {
        const arr = requireList.filter(item => {
            return step1Data[item] === null || step1Data[item] === ''
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

    const handelInputChange = (key, data) => {
        const obj = { ...step1Data }
        if (!data.isError) {
            obj[key] = data.value
        } else {
            obj[key] = null
        }
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
                onValueChange={(val) => {
                    handelInputChange('proname', val)
                }}
                maxLength={20}
            />

            <TextInput
                label='Project website'
                placeholder='Enter your project website'
                defaultVal={step1Data.prowebsite}
                isRequire={true}
                width='600px'
                onValueChange={(val) => {
                    handelInputChange('prowebsite', val)
                }}
                maxLength={100}
                REG_rule={{
                    reg: /http(s)?:\/\/[\w.]+[\w\/]*[\w.]*\??[\w=&\+\%]*/,
                    msg: 'Please enter a valid website address'
                }}
            />

            <TextInput
                label='Theme'
                placeholder='For Example: Defi , Public Chain'
                defaultVal={step1Data.protheme}
                isRequire={true}
                width='600px'
                onValueChange={(val) => {
                    handelInputChange('protheme', val)
                }}
            />

            <TextInput
                label='Whitepaper link'
                placeholder=' Enter your whitepaper link'
                defaultVal={step1Data.whitepaperlink}
                isRequire={true}
                width='600px'
                REG_rule={{
                    reg: /http(s)?:\/\/[\w.]+[\w\/]*[\w.]*\??[\w=&\+\%]*/,
                    msg: 'Please enter a standard Whitepaper link'
                }}
                maxLength={100}
                onValueChange={(val) => {
                    handelInputChange('whitepaperlink', val)
                }}
            />

            <TextInput
                label='Github link'
                placeholder='Paste github link'
                defaultVal={step1Data.githublink}
                isRequire={true}
                width='600px'
                maxLength={100}
                REG_rule={{
                    reg: /http(s)?:\/\/[\w.]+[\w\/]*[\w.]*\??[\w=&\+\%]*/,
                    msg: 'Please enter a standard GitHub address'
                }}

                onValueChange={(val) => {
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
                    isRequire={false}
                    maxLength={100}
                    REG_rule={{
                        reg: /http(s)?:\/\/[\w.]+[\w\/]*[\w.]*\??[\w=&\+\%]*/,
                        msg: 'Please enter a standard web address'
                    }}
                    onValueChange={(val) => {
                        console.log(val)
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
