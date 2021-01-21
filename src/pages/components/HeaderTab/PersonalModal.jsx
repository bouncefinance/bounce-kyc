import React from 'react'
import { PerModalStyled } from './styled'
import { useHistory } from 'react-router-dom'
import { useWeb3React } from '@web3-react/core'
import { CopyToClipboard } from 'react-copy-to-clipboard';
import copy_icon from '../../../assets/icons/copy-black.svg'

export default function PersonalModal({ show = false }) {
    const history = useHistory()
    const { account } = useWeb3React()

    const handelClickLi = (type) => {
        if (!type) return
        switch (type) {
            case 'kyc':
                return history.push('/kyc')
            default:
                return
        }
    }


    return (
        show && <PerModalStyled>
            <div className="account">
                <h5>undefined</h5>
                <div className="account">
                    <p>{account || '0x00'} </p>
                    <CopyToClipboard
                        text={account}
                        onCopy={() => {}}>
                        <img className='ignore' src={copy_icon} alt="" />
                    </CopyToClipboard>
                </div>
            </div>
            <ul>
                <li
                    onClick={() => { handelClickLi('kyc') }}
                >
                    <i className='kyc'></i>
                    <span>KYC</span>
                </li>

                <li>
                    <i className='pi'></i>
                    <span>Personal Info</span>
                </li>

                <li>
                    <i className='acs'></i>
                    <span>Apply Certified Sale</span>
                </li>
            </ul>
        </PerModalStyled>
    )
}
