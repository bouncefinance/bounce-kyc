import React, { useState, useEffect } from 'react'
import { TextInput, Form, Button, Upload } from '../components/Table'
import axios from 'axios'

export default function Step1({ curStep, setCurStep, ReqData, setReqData }) {
    const [data, setData] = useState({})
    const [isNext, setIsNext] = useState(false)

    useEffect(() => {
        // console.log(data, isNext)
        const requiredList = ['idcardno', 'idcardfronturl', 'idcardbackurl']
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


    const handelSubmit = () => {
        console.log(ReqData)
        ReqData.bounceid = 0
        axios.post('https://account.bounce.finance:16000/api/v1/updateuserinfo', ReqData).then(res => {
            if(res.data.code===1){
                alert('KYC 认证已成功提交')
            }else{
                alert('KYC 认证中，请勿重新提交')
            }
        }).catch(err => {
            console.log(err)
            alert('KYC 认证出现错误')
        })
    }

    return (
        <Form title={'ID confirmation'} marginTop='24px'>
            <TextInput label='Passport Number' placeholder='Enter your email' onValChange={(val) => {
                handelValChange('idcardno', val)
            }} />
            <Upload name='idcardfronturl' successCallBack={(path) => {
                handelValChange('idcardfronturl', path || null)
            }} />
            <Upload name='idcardbackurl' successCallBack={(path) => {
                handelValChange('idcardbackurl', path || null)
            }} />
            <div className="btn_group">
                <Button type='white' value='Back' width='164px' onClick={() => {
                    setCurStep(curStep - 1)
                }} />
                <Button type='black' value='Verify' width='164px' disabled={!isNext} onClick={handelSubmit} />
            </div>
        </Form>
    )
}
