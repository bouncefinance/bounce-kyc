import React, { useContext, useEffect, useState } from 'react'
import { PerModalStyled } from './styled'
import { useHistory } from 'react-router-dom'
import { useWeb3React } from '@web3-react/core'
import { CopyToClipboard } from 'react-copy-to-clipboard';
import copy_icon from '../../../assets/icons/copy-black.svg'
import bule_check from '../../../assets/images/bule-check.svg'
import { useVoteList } from "../../CertifiedSales/hooks";
import { queryIsKyc } from '../../../config/utils/END_FUN'
import { queryBotBalance } from '../../../config/utils/BOT_FUN'
import { myContext } from '../../../redux';
import { BOUNCE_PRO } from "../../../web3/address";
import { getContract } from "../../../web3";
import bounceERC20 from "../../../web3/abi/bounceERC20.json";
import { numToWei } from "../../../utils/numberTransform";
import { useIsSMDown } from '../../../hooks/themeHooks';
import logo_sigle from '../../../assets/logo/logo-sigle-black.svg';
import close from '../../../assets/icons/close-black.svg';
import icon_point from '../../../assets/icons/icon_point.svg'
import useAxios from '../../../hooks/useAxios'
import API_HOST from '../../../config/request_api'
import BouncePro from "../../../web3/abi/BouncePro.json";
import {
  cancelStatus,
  confirmStatus,
  errorStatus,
  initStatus,
  pendingStatus,
  successVotedStatus,
  TxModal
} from "../../../components/common/TXModal"


export default function PersonalModal({ show = false, userName, isKYC: CT_KYC }) {
  const history = useHistory()
  const { sign_Axios, Axios } = useAxios()
  const { account, chainId, library } = useWeb3React()
  const KYC_STATUS = window.localStorage.getItem('KYC_STATUS') || 0
  const { state, dispatch } = useContext(myContext);
  const { list } = useVoteList()
  const [isKYC, setIsKYC] = useState(false)
  const [balance, setBalance] = useState(0)
  const [bidStatus, setBidStatus] = useState(initStatus)

  const isSMDown = useIsSMDown();
  const myProject = list && list.filter(item => {
    return item.status === 'Active' && item.creator.toLowerCase() === account.toLowerCase()
  })[0]

  const activeProject = list && list.filter(item => {
    return item.status === 'Success' && !item.approved && item.creator.toLowerCase() === account.toLowerCase()
  })[0]
  // console.log('activeProject', activeProject)

  const onApprove = async (approveAmount, address) => {
    const bounceAddress = BOUNCE_PRO(chainId)
    const tokenContract = getContract(library, bounceERC20.abi, address)
    const amount = numToWei(approveAmount);
    dispatch({
      type: 'MODAL',
      value: {
        name: 'APPROVE',
        amount: activeProject.proInfo.amountoftoken,
        symbol: activeProject.proInfo.tokenticketer,
        projectName: activeProject.proInfo.proname,
        loading: true,
        cancel: {
          text: 'I Know'
        },
        onConfirm: () => {
          onApprove(activeProject.proInfo.amountoftoken, activeProject.proInfo.tokencontractaddress)
        }
      }
    })

    try {
      await tokenContract.methods.approve(
        bounceAddress,
        amount,
      )
        .send({ from: account });
      dispatch({
        type: 'MODAL',
        value: {
          name: 'APPROVE',
          amount: activeProject.proInfo.amountoftoken,
          symbol: activeProject.proInfo.tokenticketer,
          projectName: activeProject.proInfo.proname,
          done: true,
          cancel: {
            text: 'I Know'
          },
          onConfirm: () => {
            onApprove(activeProject.proInfo.amountoftoken, activeProject.proInfo.tokencontractaddress)
          }
        }
      })
    } catch (err) {
      if (err.code === 4001) {
      } else {
      }
      console.log('err', err);
    }
  };


  useEffect(async () => {
    if (!account) return
    const isKYC = await queryIsKyc(account)
    const balance = await queryBotBalance(library, account, chainId)
    setIsKYC(isKYC)
    setBalance(balance)
  }, [account])

  const handelClickLi = (type) => {
    if (!type) return
    switch (type) {
      case 'kyc':
        return history.push('/kyc')
      case 'PersonalInfo':
        return history.push('/PersonalInfo')
      case 'applySale':
        // console.log(isKYC, balance)
        // console.log(state)
        if (!isKYC) {
          return dispatch({
            type: 'MODAL',
            value: {
              name: 'CONFIRM',
              title: 'Bounce Decentralized',
              deputy: 'You are not KYC certified, please authenticate before adding the vote',
              cancel: {
                text: 'Not Now'
              },
              confirm: {
                text: 'Go',
                callback: () => {
                  dispatch({ type: 'MODAL', value: null })
                  history.push('/kyc')
                }
              }
            }
          })
        } else if (balance < 0.3) {
          return dispatch({
            type: 'MODAL',
            value: {
              name: 'CONFIRM',
              title: 'Bounce Certified Fee',
              deputy: `If you want to add a project vote, you must have more than 0.3 BOT. Your current balance is ${Number(balance)}, so you cannot create it`,
              cancel: {
                text: 'I Know'
              }
            }
          })
        } else if (myProject) {
          return dispatch({
            type: 'MODAL',
            value: {
              name: 'CONFIRM',
              title: 'Bounce Decentralized',
              deputy: `You currently have a project running and cannot create two running pools`,
              cancel: {
                text: 'I Know'
              },
              confirm: {
                text: 'Show My Project',
                callback: () => {
                  return history.push(`/learn-more/${myProject.id}`)
                }
              }
            }
          })
        } else {
          return history.push('/applySale')
        }
        break
      default:
        return
    }
  }

  const handelClickPoint = () => {
    if (!account) return
    Axios.post(API_HOST.queryKycByAccount, { accountaddress: account }).then(res => {
      if (res.status === 200 && res.data.code === 1) {
        const signaturestr = res.data.data.signaturestr

        const BouncePro_CT = getContract(library, BouncePro.abi, BOUNCE_PRO(chainId))
        setBidStatus(confirmStatus);
        try {
          BouncePro_CT.methods.registerKyc(signaturestr).send({ from: account })
            .on('transactionHash', hash => {
              setBidStatus(pendingStatus)
            })
            .on('receipt', async (_, receipt) => {
              console.log('bid fixed swap receipt:', receipt)
              // setBidStatus(successVotedStatus)
              const params_2 = {
                ...res.data.data,
                ifincontract: 1
              }
              const res_2 = await sign_Axios.post(API_HOST.sign_KYC, params_2)
              if (res_2.status === 200 && res_2.data.code === 1) {
                dispatch({
                  type: 'MODAL',
                  value: {
                    name: 'CONFIRM',
                    title: 'Message',
                    deputy: 'Supplementary contract certification successful',
                    confirm: {
                      text: 'Confirm',
                      callback: () => {
                        dispatch({
                          type: 'MODAL',
                          value: null
                        })
                        history.push('/')
                        // window.location.reload()
                      }
                    }
                  }
                })
              } else {
                dispatch({
                  type: 'MODAL',
                  value: {
                    name: 'CONFIRM',
                    title: 'ERROR MESSAGE',
                    deputy: res_2.data.msg,
                    confirm: {
                      text: 'Confirm',
                      callback: () => {
                        dispatch({
                          type: 'MODAL',
                          value: null
                        })
                        history.push('/')
                        // window.location.reload()
                      }
                    }
                  }
                })
              }

            })
            .on('error', (err, receipt) => {
              setBidStatus(errorStatus)
            })
        } catch (error) {
          if (error.code === 4001) {
            setBidStatus(cancelStatus)
          } else {
            setBidStatus(errorStatus)
          }
        }
      } else {
        dispatch({
          type: 'MODAL',
          value: {
            name: 'CONFIRM',
            title: 'Message',
            deputy: 'Append contract authentication failed. Please try again later',
            confirm: {
              text: 'Confirm',
              callback: () => {
                dispatch({
                  type: 'MODAL',
                  value: null
                })
                history.push('/')
                // window.location.reload()
              }
            }
          }
        })
      }
    }).catch(err => {
      console.log(err)
    })
  }

  return (
    show && <PerModalStyled>
      {isSMDown &&
        <div>
          <div className="headers">
            <img onClick={() => { return window.location.href = '/' }} src={logo_sigle} alt="bounce logo" />
            <img src={close}
            />
          </div>
          <div className="personalLogo">

          </div>
        </div>
      }

      <div className="account">
        <div className='account_name'>
          <h5>{userName}</h5>
          {KYC_STATUS === '1' && CT_KYC && <img src={bule_check} alt="" />}
          {KYC_STATUS === '1' && !CT_KYC && <img
            onClick={() => {
              handelClickPoint()
            }}
            style={{
              cursor: 'pointer',
            }} src={icon_point} alt="" title={`You have complete the KYC process and
now please interact with Bounce contract
to add your address to contract KYC list.`} />}
        </div>
        <div className="account_address">
          <p>{account || '0x00'} </p>
          <CopyToClipboard
            text={account}
            onCopy={() => {
            }}>
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

        {KYC_STATUS === '1' && !CT_KYC && <li
          onClick={() => {
            handelClickPoint()
          }}
        >
          <i className='kyc'></i>
          <span>KYC interaction</span>
        </li>}

        <li onClick={() => {
          handelClickLi('PersonalInfo')
        }}>
          <i className='pi'></i>
          <span>Personal Info</span>
        </li>


        {!myProject && !activeProject && (
          <li
            onClick={() => {
              handelClickLi('applySale')
            }}
          >
            <i className='acs'></i>
            <span>{'Apply Certified Sale'}</span>
          </li>)}
        {myProject && (
          <li
            onClick={() => {
              handelClickLi('applySale')
            }}
          >
            <i className='acs'></i>
            <span>{'Check Status'}</span>
          </li>
        )}
        {activeProject && (
          <li
            onClick={() => {
              dispatch({
                type: 'MODAL',
                value: {
                  name: 'APPROVE',
                  amount: activeProject.proInfo.amountoftoken,
                  symbol: activeProject.proInfo.tokenticketer,
                  projectName: activeProject.proInfo.proname,
                  cancel: {
                    text: 'I Know'
                  },
                  onConfirm: () => {
                    onApprove(activeProject.proInfo.amountoftoken, activeProject.proInfo.tokencontractaddress)
                  }
                }
              })
            }}
          >
            <i className='acs'></i>
            <span>{'Approve'} {activeProject && activeProject.proInfo.proname}</span>
          </li>
        )}
      </ul>
      {isSMDown &&
        <div className="cancelBtn">
          Close
        </div>
      }

    </PerModalStyled>
  )
}
