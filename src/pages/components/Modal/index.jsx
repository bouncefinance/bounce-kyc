import { useContext } from 'react'
import { myContext } from '../../../redux'
import { ModalLayout } from './styled'
import { WalletConnect } from '../../../components/WalletConnect'
import Confirm from './Confirm'
import Support from './Support'

export default function Index() {
    const { state, dispatch } = useContext(myContext)

    const handelCancel = () => {
        dispatch({
            type: 'MODAL',
            value: null
        })
    }

    const renderModal = () => {
        const { showModal, isConnectWallet } = state
        if (isConnectWallet) {
            return <WalletConnect />
        }
        switch (showModal.name) {
            case 'CONFIRM':
                const { title, desc, tip, isCancel, cancel, confirm } = showModal
                // console.log(showModal)
                return <Confirm
                    title={title}
                    desc={desc}
                    tip={tip}
                    isCancel={isCancel}
                    cancel={cancel}
                    confirm={confirm}
                />

            case 'KYC':
                console.log('kYc')
                return <></>

            case 'SUPPORT':
                return <Support cancel={handelCancel} />



            default:
                return <></>
        }

    }

    return ((state.showModal || state.isConnectWallet) &&
        <ModalLayout className='layout' onClick={(e) => {
            e.stopPropagation()
            // if (String(e.target.className).indexOf('layout') !== -1) {
            //     dispatch({
            //         type: 'MODAL',
            //         value: null
            //     })
            // }
        }}>
            {renderModal()}
        </ModalLayout>
    )
}
