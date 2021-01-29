import { useContext } from 'react'
import styled from 'styled-components'
import { myContext } from '../../../redux'
import { ModalLayout } from './styled'
import { WalletConnect } from '../../../components/WalletConnect'
import Confirm from './Confirm'
import Support from './Support'
import KYC_TIP from './KYC_TIP'

export const ModalContent = styled.span`
  font-family: IBM Plex Mono;
  font-style: normal;
  font-weight: 500;
  font-size: 13px;
  line-height: 140%;
  width: 320px;
  margin-top: 20px;
  margin-bottom: 27px;
  text-align: left;
`

export const ModalTitle = styled.span`
  font-family: Optima;
  font-style: normal;
  font-weight: bold;
  font-size: 26px;
  line-height: 32px;
  border-bottom: 4px solid #000000;
  width: 320px;
  padding-bottom: 20px;
  padding-top: 14px;
  text-align: left;
`

export default function Index () {
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
                const { title, desc, tip, isCancel, cancel, confirm, deputy } = showModal
                return <Confirm
                    title={title}
                    desc={desc}
                    deputy={deputy}
                    tip={tip}
                    isCancel={isCancel}
                    cancel={cancel}
                    confirm={confirm}
                />

            case 'KYC_TIP':
                const { confirm: confirm_kyc } = showModal
                return <KYC_TIP cancel={handelCancel} confirm={confirm_kyc} />

            case 'SUPPORT':
                return <Support cancel={handelCancel} />



            default:
                return <></>
        }

    }

    return ((state.showModal || state.isConnectWallet) &&
        <ModalLayout className='layout' onClick={(e) => {
            e.stopPropagation()
        }}>
            {renderModal()}
        </ModalLayout>
    )
}
