import Modal, {ModalContent, ModalTitle} from "./Modal";
import Lottie from "react-lottie";
import {FormStatus} from "./Form";
import icon_success from "../../assets/icons/icon-success.svg";
import icon_error from "../../assets/icons/icon-error.svg";
import {Button} from "./Button";
import React from "react";
import bounce_loading from "../../assets/bounce-loading.json";

export const confirmStatus = {status: 1, title: 'Bounce requests wallet interaction', content: 'Please open your wallet and confirm in the transaction activity to proceed your order'}
export const pendingStatus = {status: 2, title: 'Bounce waiting for transaction settlement', content: 'Bounce is engaging with blockchain transaction, please wait patiently for on-chain transaction settlement'}
export const claimSuccessStatus = {status: 3, title: 'Settlement', content: 'You have successfully claimed back your voted tokens.'}
export const voteSuccessStatus = {status: 3, title: 'Congratulations!', content: 'You have successfully participated in this prediction. Please come back to check results when the prediction pool is closed'}
export const successStatus = {status: 3, title: 'Congratulations!', content: 'You have successfully participated in this auction. To proceed to next step, please read more instructions on auction in the bounce documentation'}
export const errorStatus = {status: -1, title: 'Transaction failed on Bounce', content: 'Oops! Your transaction is failed for on-chain approval and settlement. Please initiate another transaction'}
export const cancelStatus = {status: -2, title: 'Transaction canceled on Bounce', content: 'Sorry! Your transaction is canceled. Please try again'}
export const initStatus = {status: 0, title: '', content: ''}


const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: bounce_loading,
    rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
    }
};

export const BidModal = ({modalStatus, onDismiss}) =>{

    const {status, title, content} = modalStatus
    return (
        <Modal isOpen={status !== 0} onDismiss={() => {
            onDismiss()
        }}>
            <ModalTitle style={{textAlign: 'center'}}>{title}</ModalTitle>

            {(status === 1 || status === 2) &&
            <Lottie width={200} height={200} options={defaultOptions}/>}

            {(status === 3 ) &&
            <FormStatus ><img src={icon_success}/></FormStatus>}

            {(status === -1 || status === -2) &&
            <FormStatus><img src={icon_error}/></FormStatus>}

            <ModalContent style={{width: 300, textAlign: 'center'}}>{content}</ModalContent>
            {(status === 1 || status === 2) && <Button width={'320px'} black>Awaiting...</Button>}
            {status === 3 && <Button width={'320px'} black onClick={()=>{
              window.location.reload()
            }}>Close</Button>}
            {status === -1 && <Button onClick={()=>{onDismiss()}} width={'320px'} black>Try again</Button>}
        </Modal>
    )
}
