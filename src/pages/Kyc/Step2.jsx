import React, { useState, useEffect } from 'react'
import { TextInput, Form, Button } from '../components/Table'

export default function Step1({ curStep, setCurStep, ReqData, setReqData }) {

    const [data, setData] = useState({})
    const [isNext, setIsNext] = useState(false)

    useEffect(() => {
        // console.log(data, isNext)
        const requiredList = ['country', 'emailaddr', 'countryother']
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
        <Form title={'Residental Address'}>
            <TextInput label='Country / Region' defaultVal='United Kingdom' onValChange={(val) => {
                handelValChange('country', val)
            }} />
            <TextInput label='Address' placeholder='Enter your email' onValChange={(val) => {
                handelValChange('emailaddr', val)
            }} />
            <TextInput label='Postal Code' placeholder='Enter your Postal Code' width='294px' onValChange={(val) => {
                handelValChange('idtype', val, false)
            }} />
            <TextInput label='City' placeholder='Enter your city' width='294px' onValChange={(val) => {
                handelValChange('countryother', val)
            }} />

            <div className="btn_group">
                <Button type='white' value='Back' width='164px' onClick={() => {
                    setCurStep(curStep - 1)
                }} />
                <Button type='black' value='Verify' width='164px' disabled={!isNext} onClick={() => {
                    setCurStep(curStep + 1)
                }} />
            </div>
        </Form>
    )
}
