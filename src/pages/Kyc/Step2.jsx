import React from 'react'
import { TextInput, Form, Button } from '../components/Table'

export default function Step1({ curStep, setCurStep }) {

    return (
        <Form title={'Residental Address'}>
            <TextInput label='Country / Region' defaultVal='United Kingdom' />
            <TextInput label='Address' placeholder='Enter your email' />
            <TextInput label='Postal Code' placeholder='Enter your email' width='294px' />
            <TextInput label='City' placeholder='Enter your city' width='294px' />

            <div className="btn_group">
                <Button type='white' value='Back' width='164px' callback={() => {
                    setCurStep(curStep - 1)
                }} />
                <Button type='black' value='Verify' width='164px' callback={() => {
                    setCurStep(curStep + 1)
                }} />
            </div>
        </Form>
    )
}
