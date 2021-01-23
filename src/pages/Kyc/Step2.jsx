import React, { useState, useEffect } from 'react'
import { TextInput, Form, Button, Select } from '../components/Table'
import country from '../../config/country.json'


export default function Step2({ curStep, setCurStep, ReqData, setReqData }) {

    const [isNext, setIsNext] = useState(false)

    const requiredList = ['1_residentialaddr', '2_countryother']
    const requiredList_json = requiredList
        .sort((a1, a2) => {
            return parseInt(a1) - parseInt(a2)
        }).toString()
    const [checkList, setCheckList] = useState([])

    useEffect(() => {
        const checkList_json = checkList.sort((a1, a2) => {
            return parseInt(a1) - parseInt(a2)
        }).toString()

        console.log(checkList_json, requiredList_json)

        if (checkList_json === requiredList_json) {
            setIsNext(true)
        } else {
            setIsNext(false)
        }
    }, [checkList])

    const handelValChange = (key, val) => {
        const data = { ...ReqData }
        data[key] = val
        setReqData(data)
    }

    const checkValue = (data) => {
        if (!data) return
        if (data.isRequire) {
            const arrList = [...checkList]
            if (!data.isError && data.value !== '') {
                if (!arrList.includes(data.name)) {
                    arrList.push(data.name)
                }
            } else {
                if (arrList.includes(data.name)) {
                    const index = arrList.indexOf(data.name)
                    arrList.splice(index, 1)
                }
            }
            setCheckList(arrList)
        }
    }

    return (
        <Form title={'Residental Address'}>
            {/* <TextInput label='Country / Region'  onValChange={(val) => {
                handelValChange('country', val)
            }} /> */}
            <Select
                label='Country / Region'
                width='600px'
                options={country}
                isRequire={true}

                onChange={(val) => {
                    handelValChange('country', val)
                }}

            />


            <TextInput
                label='Address'
                placeholder='Enter your Address'
                name='1_residentialaddr'
                defaultVal={ReqData && ReqData.residentialaddr}
                onValueChange={(data) => {
                    checkValue(data)
                    handelValChange('residentialaddr', data.value)
                }}
                isRequire={true}
            // REG_rule={[{
            //     reg: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
            //     msg: 'The residential address is incorrect'
            // }]}
            />
            <TextInput
                label='Postal Code'
                placeholder='Enter your Postal Code'
                width='294px'
                name='idtype'
                defaultVal={ReqData && ReqData.idtype}
                onValueChange={(data) => {
                    checkValue(data)
                    handelValChange('idtype', data.value)
                }}
            />
            <TextInput
                label='City'
                placeholder='Enter your city'
                width='294px'
                isRequire={true}
                name='2_countryother'
                defaultVal={ReqData && ReqData.countryother}
                onValueChange={(data) => {
                    checkValue(data)
                    handelValChange('countryother', data.value)
                }}
            />

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
