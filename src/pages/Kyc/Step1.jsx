import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { TextInput, Form, Button } from '../components/Table'

export default function Step1({ curStep, setCurStep, ReqData, setReqData }) {
    const history = useHistory()
    const [data, setData] = useState({})
    const [isNext, setIsNext] = useState(false)


    useEffect(() => {
        // console.log(data, isNext)
        const requiredList = ['birthday', 'lastname', 'middlename', 'username']
        const data_2 = requiredList.filter(item => {
            if (!data[item]) {
                return item
            }
        })

        if (data_2.length === 0) {
            setReqData(data)
            return setIsNext(true)
        } else {
            return setIsNext(false)
        }
    }, [data])

    const handelValChange = (key, val, required = false) => {
        const data_2 = data
        if (required && val === '') {
            data_2[key] = null
        } else {
            data_2[key] = val || ''
        }
        setData({ ...ReqData, ...data_2 })
    }


    return (
        <Form title={'Basic Info'}>
            <TextInput label='First Name' width='294px' defaultVal='John' onValChange={(val) => {
                handelValChange('username', val)
            }} />
            <TextInput label='Middle Name (if applicable)' width='294px' placeholder='Enter middle name' onValChange={(val) => {
                handelValChange('middlename', val)
            }} />
            <TextInput label='Last Name' placeholder='Enter last name' onValChange={(val) => {
                handelValChange('lastname', val)
            }} />
            <TextInput label='Date of Birth' placeholder='01.01.2021' onValChange={(val) => {
                handelValChange('birthday', val)
            }} />

            <div className="btn_group">
                <Button type='white' value='Cancel' width='164px' onClick={() => {
                    history.goBack(-1)
                }} />
                <Button type='black' value='Next Step' width='164px' disabled={!isNext} onClick={() => {
                    setCurStep(curStep + 1)
                }} />
            </div>
        </Form>
    )
}
