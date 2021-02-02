import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { TextInput, Form, Button } from '../components/Table'
import {useIsSMDown} from '../../utils/themeHooks';

export default function Step1({ curStep, setCurStep, ReqData, setReqData }) {
    const history = useHistory()
    const [isNext, setIsNext] = useState(false)
    const isXSDown = useIsSMDown();
    const requiredList = ['1_username', '3_lastname', '4_birthday']
    const requiredList_json = requiredList
        .sort((a1, a2) => {
            return parseInt(a1) - parseInt(a2)
        }).toString()
    const [checkList, setCheckList] = useState([])


    useEffect(() => {
        const checkList_json = checkList.sort((a1, a2) => {
            return parseInt(a1) - parseInt(a2)
        }).toString()

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
        <Form title={'Basic Info'}>
            <TextInput
                label='First Name'
                width={isXSDown?'100%':'294px'}
                placeholder='Enter first name'
                name='1_username'
                defaultVal={ReqData && ReqData.username}
                onValueChange={(data) => {
                    checkValue(data)
                    handelValChange('username', data.value)
                }}
                isRequire={true}
                isName={true}
            />
            <TextInput
                label='Middle Name (if applicable)'
                width={isXSDown?'100%':'294px'}
                placeholder='Enter middle name'
                name='2_middlename'
                defaultVal={ReqData && ReqData.middlename}
                onValueChange={(data) => {
                    checkValue(data)
                    handelValChange('middlename', data.value)
                }}
                isName={true}
            />
            <TextInput
                label='Last Name'
                placeholder='Enter last name'
                name='3_lastname'
                defaultVal={ReqData && ReqData.lastname}
                onValueChange={(data) => {
                    checkValue(data)
                    handelValChange('lastname', data.value)
                }}
                isRequire={true}
                isName={true}
            />


            <TextInput
                label='Date of Birth'
                placeholder='2021-1-1'
                name='4_birthday'
                isRequire={true}
                defaultVal={ReqData && ReqData.birthday}
                onValueChange={(data) => {
                    checkValue(data)
                    handelValChange('birthday', data.value)
                }}
                REG_rule={{
                    reg: /^((19[2-9]\d{1})|(20((0[0-2])|(1[0-8]))))\-((0?[1-9])|(1[0-2]))\-((0?[1-9])|([1-2][0-9])|30|31)$/,
                    msg: 'Incorrect birth date format (yyyy-mm-dd) Or under the age of 18'
                }}
            />

            <div className="btn_group">
                <Button type='white' value='Cancel'  width={isXSDown?'100%':'164px'}  onClick={() => {
                    history.goBack(-1)
                }} />
                <Button type='black' value='Next Step' style={{ marginTop: 20}}  width={isXSDown?'100%':'164px'}  disabled={!isNext} onClick={() => {
                    setCurStep(curStep + 1)
                }} />
            </div>
        </Form>
    )
}