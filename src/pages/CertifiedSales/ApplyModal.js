import Modal, {ModalContent, ModalTitle} from "../../components/common/Modal";
import styled from 'styled-components'
import Lottie from "react-lottie";
import icon_success from "../../assets/icons/icon-success.svg";
import icon_error from "../../assets/icons/icon-error.svg";
import React from "react";
import bounce_loading from "../../assets/bounce-loading.json";
import {Button} from "../../components/common/Button";

export const FormStatus = styled.div`
  width: 100%;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
`

const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: bounce_loading,
    rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
    }
};

export const approveStatus = {status: 1, title: 'Bounce requests wallet approval', content: 'Please manually interact with your wallet'}
export const confirmStatus = {status: 2, title: 'Bounce requests wallet interaction', content: 'Please open your wallet and confirm in the transaction activity to proceed your order'}
export const pendingStatus = {status: 3, title: 'Bounce waiting for transaction settlement', content: 'Bounce is engaging with blockchain transaction, please wait patiently for on-chain transaction settlement'}
export const successStatus = {status: 4, title: 'Auction successfully published', content: 'Congratulations! Your auction is live and is now listed in designated area. Please find more information about the next steps in the pool page'}
export const predictionSuccessStatus = {status: 4, title: 'Prediction successfully published', content: 'Congratulations! Your predcition is live and is now listed in designated area. Please find more information about the next steps in the pool page'}
export const errorStatus = {status: -1, title: 'Transaction failed on Bounce', content: 'Oops! Your transaction is failed for on-chain approval and settlement. Please initiate another transaction'}
export const cancelStatus = {status: -2, title: 'Transaction canceled on Bounce', content: 'Sorry! Your transaction is canceled. Please try again.'}
export const initStatus = {status: 0, title: '', content: ''}


export const ApplyModal = ({modalStatus, onDismiss, onOK}) =>{

    const {status, title, content}  = modalStatus

    return (
        <Modal isOpen={status !== 0} onDismiss={() => {
            onDismiss()
        }}>
            <ModalTitle style={{textAlign: 'center'}}>{title}</ModalTitle>

            {(status === 1 || status === 2 || status === 3) &&
            <Lottie width={200} height={200} options={defaultOptions}/>}

            {(status === 4 ) &&
            <FormStatus ><img src={icon_success}/></FormStatus>}

            {(status === -1 || status === -2) &&
            <FormStatus><img src={icon_error}/></FormStatus>}

            <ModalContent style={{width: 300, textAlign: 'center'}}>{content}</ModalContent>
            {(status === 1 || status === 2 || status === 3) && <Button width={'320px'} black>Awaiting...</Button>}
            {status === 4 && <Button width={'320px'} black onClick={()=>{
                onOK()
            }}>Close</Button>}
            {status === -1 && <Button onClick={()=>{onDismiss()}} width={'320px'} black>Try again</Button>}
        </Modal>
    )
}
