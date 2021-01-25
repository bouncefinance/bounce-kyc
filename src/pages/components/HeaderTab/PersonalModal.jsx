import React, {useContext, useEffect} from 'react'
import { PerModalStyled } from './styled'
import { useHistory } from 'react-router-dom'
import { useWeb3React } from '@web3-react/core'
import { CopyToClipboard } from 'react-copy-to-clipboard';
import copy_icon from '../../../assets/icons/copy-black.svg'
import bule_check from '../../../assets/images/bule-check.svg'
import {mainContext} from "../../../reducer";
import {useVoteList} from "../../CertifiedSales/hooks";

export default function PersonalModal({ show = false, userName }) {
    const history = useHistory()
    const { account } = useWeb3React()
    const KYC_STATUS = window.localStorage.getItem('KYC_STATUS') || 0
    const { state } = useContext(mainContext);

    const {list} = useVoteList()

    const myProject = list && list.filter(item => { return  item.creator.toLowerCase() === account.toLowerCase()})[0]
    console.log('myProject',myProject)

    const { authToken } = state;
    useEffect(() => {
        // console.log(KYC_STATUS)
    }, [account])

    const handelClickLi = (type) => {
        if (!type) return
        switch (type) {
            case 'kyc':
                return history.push('/kyc')
            case 'PersonalInfo':
                return history.push('/PersonalInfo')
            case 'applySale':
                if(myProject){
                    return history.push(`/learn-more/${myProject.id}`)
                }else {
                    return history.push('/applySale')
                }
            default:
                return
        }
    }


    return (
        show && <PerModalStyled>
            <div className="account">
                <div className='account_name'>
                    <h5>{userName}</h5>
                    {KYC_STATUS === '1' && <img src={bule_check} alt="" />}
                </div>
                <div className="account_address">
                    <p>{account || '0x00'} </p>
                    <CopyToClipboard
                        text={account}
                        onCopy={() => { }}>
                        <img className='ignore' src={copy_icon} alt="" />
                    </CopyToClipboard>
                </div>
            </div>
            <ul>
                {KYC_STATUS !== '1' && <li
                    onClick={() => {
                        handelClickLi('kyc')
                    }}
                >
                    <i className='kyc'></i>
                    <span>KYC</span>
                </li>}

                <li onClick={() => {
                    handelClickLi('PersonalInfo')
                }}>
                    <i className='pi'></i>
                    <span>Personal Info</span>
                </li>

                <li
                    onClick={() => { handelClickLi('applySale') }}
                >
                    <i className='acs'></i>
                    <span>{myProject? 'Check Status': 'Apply Certified Sale'}</span>
                </li>
            </ul>
        </PerModalStyled>
    )
}
