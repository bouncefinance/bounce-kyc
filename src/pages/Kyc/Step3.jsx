import React from 'react'
import { TextInput, Form, Button, Upload } from '../components/Table'

export default function Step1({ curStep, setCurStep }) {

    return (
        <Form title={'ID confirmation'} marginTop='24px'>
            <TextInput label='Passport Number' placeholder='Enter your email' />
            <Upload />
            <Upload />
            <div className="btn_group">
                <Button type='white' value='Back' width='164px' callback={() => {
                    setCurStep(curStep - 1)
                }} />
                <Button type='black' value='Verify' width='164px' />
            </div>
        </Form>
    )
}
