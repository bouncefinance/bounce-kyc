import Modal, { ModalContent, ModalIcon, ModalTitle } from "./Modal";
import { Button } from "./Button";
import React, { useState } from "react";
import warning from '../../assets/icons/warning.svg'
import icon_eye_open from "../../assets/icons/icon-eye-open.svg";
import icon_eye_close from "../../assets/icons/icon-eye-closed.svg";

import { Form, Input } from "./Form";


export const PasswordModal = ({ show, onConfirm, onDismiss, onChange, error }) => {

    const [open, setOpen] = useState(false)
    const [password, setPassword] = useState()



    return (
        <Modal closeable isOpen={show} onDismiss={() => {
            onDismiss()
        }}>
            <ModalTitle style={{ textAlign: 'center' }}>Heads Up</ModalTitle>
            <ModalIcon>
                <img src={warning} />
            </ModalIcon>


            <ModalContent>Bounce is decentralized so you need
                to confirm the contract address</ModalContent>

            <Form
                error={error ? error : ''}
                width={'320px'}
                addonAfter={(<img
                    width={15}
                    onClick={() => {
                setOpen(!open)
            }} src={open ? icon_eye_open : icon_eye_close}/>)}
                input={<Input type={open ? '' : 'password'} onChange={(e) => {
                onChange(e.target.value)
            }}
            />} name={'Password'}/>



            <div style={{ width: 320, display: 'flex', justifyContent: 'space-between', marginTop: 38 }}>
                <Button onClick={() => {
                    onDismiss()
                }} width={'154px'}>Cancel</Button>
                <Button onClick={() => {
                    onConfirm(password)
                }} width={'154px'} black>Continue</Button>
            </div>
        </Modal>
    )
}
