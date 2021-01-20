import { useContext, useState } from 'react'
import { myContext } from '../../../redux'
import { ModalLayout } from './styled'
import Support from './Support'

export default function Index() {
    const { state, dispatch } = useContext(myContext)

    const cancel = () => {
        dispatch({
            type: 'SHOW_MODAL',
            value: null
        })
    }

    const renderModal = () => {
        const { showModal } = state
        switch (showModal) {
            case 'KYC':
                console.log('kYc')
                return <></>

            case 'SUPPORT':
                return <Support cancel={cancel}/>

            default:
                return <></>
        }

    }

    return (state.showModal &&
        <ModalLayout className='layout' onClick={(e) => {
            e.stopPropagation()
            // if (String(e.target.className).indexOf('layout') !== -1) {
            //     dispatch({
            //         type: 'SHOW_MODAL',
            //         value: null
            //     })
            // }
        }}>
            {renderModal()}
        </ModalLayout>
    )
}
