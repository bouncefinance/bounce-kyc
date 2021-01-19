import React from 'react'
import { useHistory } from 'react-router-dom'
import { TextInput, Form, Button } from '../components/Table'

export default function Step1({ curStep, setCurStep }) {
    const history = useHistory()

    return (
        <Form title={'Basic Info'}>
            <TextInput label='First Name' width='294px' defaultVal='John' />
            <TextInput label='Middle Name (if applicable)' width='294px' placeholder='Enter middle name' />
            <TextInput label='Last Name' placeholder='Enter last name' />
            <TextInput label='Date of Birth' placeholder='01.01.2021' />

            <div className="btn_group">
                <Button type='white' value='Cancel' width='164px' callback={() => {
                    history.goBack(-1)
                }} />
                <Button type='black' value='Next Step' width='164px' callback={() => {
                    setCurStep(curStep + 1)
                }} />
            </div>
        </Form>
    )
}
